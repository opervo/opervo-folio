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

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GMAIL_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Gmail not configured" },
      { status: 500 }
    );
  }

  try {
    const { to, subject, body, threadId, inReplyTo } = await req.json();

    if (!to || !body) {
      return NextResponse.json(
        { error: "to and body required" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to refresh Gmail token" },
        { status: 500 }
      );
    }

    // Build RFC 2822 email
    const headers = [
      `To: ${to}`,
      `Subject: ${subject || "Re: (no subject)"}`,
      `Content-Type: text/plain; charset=utf-8`,
    ];

    if (inReplyTo) {
      headers.push(`In-Reply-To: ${inReplyTo}`);
      headers.push(`References: ${inReplyTo}`);
    }

    const rawEmail = headers.join("\r\n") + "\r\n\r\n" + body;

    const encoded = Buffer.from(rawEmail)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const sendBody: { raw: string; threadId?: string } = { raw: encoded };
    if (threadId) sendBody.threadId = threadId;

    const sendRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendBody),
      }
    );

    if (!sendRes.ok) {
      const err = await sendRes.text();
      console.error("[admin/gmail/send] Error:", err);
      return NextResponse.json(
        { error: "Failed to send" },
        { status: 500 }
      );
    }

    const result = await sendRes.json();
    return NextResponse.json({ ok: true, messageId: result.id });
  } catch (err) {
    console.error("[admin/gmail/send] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
