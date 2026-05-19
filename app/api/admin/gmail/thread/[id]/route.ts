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

function decodeBody(part: {
  mimeType?: string;
  body?: { data?: string; size?: number };
  parts?: typeof part[];
}): string {
  if (part.body?.data) {
    return Buffer.from(part.body.data, "base64url").toString("utf-8");
  }
  if (part.parts) {
    // Prefer text/html, fall back to text/plain
    const htmlPart = part.parts.find(
      (p: { mimeType?: string }) => p.mimeType === "text/html"
    );
    if (htmlPart) return decodeBody(htmlPart);
    const textPart = part.parts.find(
      (p: { mimeType?: string }) => p.mimeType === "text/plain"
    );
    if (textPart) return decodeBody(textPart);
    if (part.parts[0]) return decodeBody(part.parts[0]);
  }
  return "";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Gmail not configured" },
      { status: 500 }
    );
  }

  const { id } = await params;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to refresh Gmail token" },
        { status: 500 }
      );
    }

    // Get the thread (all messages)
    const threadRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}?format=full`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!threadRes.ok) {
      return NextResponse.json(
        { error: `Gmail API error: ${threadRes.status}` },
        { status: 500 }
      );
    }

    const thread = await threadRes.json();

    const messages = (thread.messages || []).map(
      (msg: {
        id: string;
        threadId: string;
        labelIds?: string[];
        snippet?: string;
        payload?: {
          headers?: { name: string; value: string }[];
          mimeType?: string;
          body?: { data?: string };
          parts?: { mimeType?: string; body?: { data?: string }; parts?: unknown[] }[];
        };
      }) => {
        const headers = msg.payload?.headers || [];
        const getHeader = (name: string) =>
          headers.find(
            (h: { name: string; value: string }) =>
              h.name.toLowerCase() === name.toLowerCase()
          )?.value || "";

        const body = msg.payload ? decodeBody(msg.payload as Parameters<typeof decodeBody>[0]) : "";

        return {
          id: msg.id,
          threadId: msg.threadId,
          from: getHeader("From"),
          to: getHeader("To"),
          cc: getHeader("Cc"),
          subject: getHeader("Subject"),
          date: getHeader("Date"),
          snippet: msg.snippet || "",
          body,
          unread: (msg.labelIds || []).includes("UNREAD"),
          labels: msg.labelIds || [],
        };
      }
    );

    return NextResponse.json({ threadId: id, messages });
  } catch (err) {
    console.error("[admin/gmail/thread] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
