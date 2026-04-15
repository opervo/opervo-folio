import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

// Uses the same Google OAuth client as Google Calendar integration.
// Requires a one-time refresh token for the help@opervo.io Gmail account
// stored as GMAIL_REFRESH_TOKEN in Vercel env vars.

// All three must be set as Vercel env vars:
// GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_REFRESH_TOKEN
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

  if (!res.ok) {
    console.error("[admin/support] Token refresh failed:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.access_token || null;
}

interface GmailMessage {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  gmailUrl: string;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_REFRESH_TOKEN) {
    return NextResponse.json({
      configured: false,
      error: "GMAIL_REFRESH_TOKEN not set. See admin/HANDOFF.md for setup instructions.",
      emails: [],
      unreadCount: 0,
    });
  }

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({
        configured: false,
        error: "Failed to refresh Gmail access token",
        emails: [],
        unreadCount: 0,
      });
    }

    // Fetch recent inbox messages (last 30, excluding promotions/social)
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?" +
        new URLSearchParams({
          maxResults: "30",
          q: "in:inbox -category:promotions -category:social",
        }),
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!listRes.ok) {
      const err = await listRes.text();
      console.error("[admin/support] Gmail list error:", err);
      return NextResponse.json({ configured: true, error: "Gmail API error", emails: [], unreadCount: 0 });
    }

    const listData = await listRes.json();
    const messageIds: { id: string }[] = listData.messages || [];

    // Fetch details for each message (batch of up to 20 for speed)
    const emails: GmailMessage[] = [];
    const batch = messageIds.slice(0, 20);

    const details = await Promise.allSettled(
      batch.map(async ({ id }) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!msgRes.ok) return null;
        return msgRes.json();
      })
    );

    for (const result of details) {
      if (result.status !== "fulfilled" || !result.value) continue;
      const msg = result.value;

      const headers = msg.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find((h: { name: string; value: string }) =>
          h.name.toLowerCase() === name.toLowerCase()
        )?.value || "";

      const from = getHeader("From");
      const subject = getHeader("Subject");
      const date = getHeader("Date");
      const unread = (msg.labelIds || []).includes("UNREAD");

      emails.push({
        id: msg.id,
        from: from.replace(/<[^>]+>/g, "").trim() || from,
        subject: subject || "(no subject)",
        snippet: msg.snippet || "",
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        unread,
        gmailUrl: `https://mail.google.com/mail/u/3/#inbox/${msg.id}`,
      });
    }

    const unreadCount = emails.filter((e) => e.unread).length;

    return NextResponse.json({ configured: true, emails, unreadCount });
  } catch (err) {
    console.error("[admin/support] Error:", err);
    return NextResponse.json(
      { configured: false, error: String(err), emails: [], unreadCount: 0 },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_REFRESH_TOKEN) {
    return NextResponse.json({ error: "Gmail not configured" }, { status: 400 });
  }

  try {
    const { action, messageId } = await req.json();
    if (!messageId || !["resolve", "escalate"].includes(action)) {
      return NextResponse.json({ error: "Invalid action or messageId" }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Failed to refresh Gmail token" }, { status: 500 });
    }

    if (action === "resolve") {
      // Archive: remove INBOX label
      await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ removeLabelIds: ["INBOX"] }),
        }
      );
    } else if (action === "escalate") {
      // Star the message
      await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addLabelIds: ["STARRED"] }),
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/support] POST error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
