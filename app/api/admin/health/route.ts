import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;

interface ProbeResult {
  service: string;
  status: "healthy" | "degraded" | "down" | "unknown";
  detail?: string;
  latencyMs?: number;
}

async function probe(
  service: string,
  fn: () => Promise<{ ok: boolean; detail?: string }>
): Promise<ProbeResult> {
  const start = Date.now();
  try {
    const r = await Promise.race([
      fn(),
      new Promise<{ ok: false; detail: string }>((resolve) =>
        setTimeout(() => resolve({ ok: false, detail: "timeout (5s)" }), 5000)
      ),
    ]);
    return {
      service,
      status: r.ok ? "healthy" : "degraded",
      detail: r.detail,
      latencyMs: Date.now() - start,
    };
  } catch (e) {
    return {
      service,
      status: "down",
      detail: e instanceof Error ? e.message : String(e),
      latencyMs: Date.now() - start,
    };
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const probes = await Promise.all([
    probe("Supabase", async () => {
      if (!SUPABASE_URL) return { ok: false, detail: "URL not set" };
      const r = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        cache: "no-store",
      });
      return { ok: r.status < 500, detail: `HTTP ${r.status}` };
    }),
    probe("Stripe", async () => {
      if (!STRIPE_KEY) return { ok: false, detail: "key not set" };
      const r = await fetch("https://api.stripe.com/v1/balance", {
        headers: { Authorization: `Bearer ${STRIPE_KEY}` },
        cache: "no-store",
      });
      return { ok: r.ok, detail: r.ok ? "Live mode" : `HTTP ${r.status}` };
    }),
    probe("Resend", async () => {
      if (!RESEND_KEY) return { ok: false, detail: "key not set" };
      const r = await fetch("https://api.resend.com/domains", {
        headers: { Authorization: `Bearer ${RESEND_KEY}` },
        cache: "no-store",
      });
      return { ok: r.ok, detail: r.ok ? "Delivering" : `HTTP ${r.status}` };
    }),
    probe("Vercel (folio)", async () => {
      const r = await fetch("https://www.opervo.io", { cache: "no-store" });
      return { ok: r.ok, detail: `HTTP ${r.status}` };
    }),
    probe("Netlify (app)", async () => {
      const r = await fetch("https://app.opervo.io", { cache: "no-store" });
      return { ok: r.ok, detail: `HTTP ${r.status}` };
    }),
  ]);

  return NextResponse.json({ probes, checkedAt: new Date().toISOString() });
}
