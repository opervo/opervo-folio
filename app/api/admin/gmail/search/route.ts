import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN || "";

async function getAccessToken(): Promise<string | null> {
  if (!GMAIL_REFRESH_TOKEN) return null;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token || null;
}

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Gmail not configured" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const label = url.searchParams.get("label") || "INBOX";
  const maxResults = url.searchParams.get("max") || "30";

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to refresh Gmail token" },
        { status: 500 }
      );
    }

    const query = q
      ? q
      : `in:${label.toLowerCase()} -category:promotions -category:social`;

    const listRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/threads?` +
        new URLSearchParams({
          maxResults,
          q: query,
        }),
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!listRes.ok) {
      return NextResponse.json(
        { error: `Gmail API: ${listRes.status}` },
        { status: 500 }
      );
    }

    const listData = await listRes.json();
    const threadIds: { id: string }[] = listData.threads || [];

    // Fetch metadata for each thread
    const threads = await Promise.allSettled(
      threadIds.slice(0, 30).map(async ({ id }) => {
        const tRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!tRes.ok) return null;
        return tRes.json();
      })
    );

    const results = [];
    for (const r of threads) {
      if (r.status !== "fulfilled" || !r.value) continue;
      const thread = r.value;
      const firstMsg = thread.messages?.[0];
      const lastMsg = thread.messages?.[thread.messages.length - 1];
      if (!firstMsg) continue;

      const headers = firstMsg.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find(
          (h: { name: string; value: string }) =>
            h.name.toLowerCase() === name.toLowerCase()
        )?.value || "";

      const from = getHeader("From");
      const subject = getHeader("Subject");
      const date = getHeader("Date");

      const hasUnread = thread.messages?.some(
        (m: { labelIds?: string[] }) =>
          (m.labelIds || []).includes("UNREAD")
      );

      results.push({
        id: thread.id,
        messageCount: thread.messages?.length || 1,
        from: from.replace(/<[^>]+>/g, "").trim() || from,
        subject: subject || "(no subject)",
        snippet: lastMsg?.snippet || firstMsg.snippet || "",
        date: date ? new Date(date).toISOString() : "",
        unread: !!hasUnread,
        labels: firstMsg.labelIds || [],
        gmailUrl: `https://mail.google.com/mail/u/3/#inbox/${thread.id}`,
      });
    }

    return NextResponse.json({ threads: results, total: listData.resultSizeEstimate || 0 });
  } catch (err) {
    console.error("[admin/gmail/search] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
