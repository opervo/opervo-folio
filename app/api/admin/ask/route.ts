import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { question, context } = await req.json();
    if (typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    // Cap input sizes to prevent a leaked admin cookie from draining Anthropic budget
    const MAX_QUESTION = 2000;
    const MAX_CONTEXT = 4000;
    if (question.length > MAX_QUESTION) {
      return NextResponse.json({ error: `Question too long (max ${MAX_QUESTION} chars)` }, { status: 400 });
    }
    const safeContext = typeof context === "string" ? context.slice(0, MAX_CONTEXT) : "none";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 500,
        system: `You are a concise business intelligence assistant for Opervo, a field service management SaaS for solo home service operators (Solo $24.99/mo, Team $54.99/mo). Answer the founder's questions directly using the data provided. Be specific and practical. No fluff. Live data: ${safeContext}`,
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: data?.error?.message ?? "AI request failed" }, { status: 500 });
    }
    return NextResponse.json({ answer: data.content?.[0]?.text ?? "No response." });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
