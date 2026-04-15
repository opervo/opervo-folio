import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 15;
const hits: number[] = [];

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  while (hits.length && now - hits[0] > RATE_WINDOW_MS) hits.shift();
  if (hits.length >= RATE_MAX) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  hits.push(now);

  try {
    const { from, subject, snippet } = await req.json();
    if (!subject && !snippet) {
      return NextResponse.json({ error: "Missing subject or snippet" }, { status: 400 });
    }

    const safeFrom = typeof from === "string" ? from.slice(0, 200) : "Unknown";
    const safeSubject = typeof subject === "string" ? subject.slice(0, 500) : "";
    const safeSnippet = typeof snippet === "string" ? snippet.slice(0, 2000) : "";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 400,
        system: `You are a helpful, friendly customer support agent for Opervo — a field service management SaaS for solo operators and small crews in home service trades (window cleaners, pressure washers, landscapers, etc.). Plans: Solo $24.99/mo, Team $54.99/mo. It's a Progressive Web App (works on all devices via browser, installable on home screen). Draft a concise, warm reply to this support email. Use the customer's first name if visible. Keep it under 100 words. No signatures — just the message body.`,
        messages: [{
          role: "user",
          content: `From: ${safeFrom}\nSubject: ${safeSubject}\nMessage: ${safeSnippet}`,
        }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: data?.error?.message ?? "AI request failed" }, { status: 500 });
    }

    return NextResponse.json({ draft: data.content?.[0]?.text ?? "Unable to generate draft." });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
