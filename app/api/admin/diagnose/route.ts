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
    const { title, metadata } = await req.json();
    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const safeTitle = title.slice(0, 2000);
    const safeMeta = typeof metadata === "string" ? metadata.slice(0, 4000) : "";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 600,
        system: `You are a senior software engineer diagnosing errors in Opervo, a React SPA (Vite + Supabase) for field service management. Given a Sentry error, explain the likely root cause in 2-3 sentences and suggest a specific fix. Be concise and practical. Format your response as two sections: first the diagnosis, then after "FIX:" the specific code change needed.`,
        messages: [{
          role: "user",
          content: `Error: ${safeTitle}${safeMeta ? `\n\nMetadata: ${safeMeta}` : ""}`,
        }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: data?.error?.message ?? "AI request failed" }, { status: 500 });
    }

    const text = data.content?.[0]?.text ?? "";
    const fixIdx = text.indexOf("FIX:");
    const diagnosis = fixIdx > 0 ? text.slice(0, fixIdx).trim() : text;
    const suggestedFix = fixIdx > 0 ? text.slice(fixIdx + 4).trim() : "";

    return NextResponse.json({ diagnosis, suggestedFix });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
