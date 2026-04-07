import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const KEY = process.env.STRIPE_SECRET_KEY!;
const SOLO = process.env.STRIPE_SOLO_PRICE_ID!;
const TEAM = process.env.STRIPE_TEAM_PRICE_ID!;

async function sg(path: string) {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${KEY}` },
    next: { revalidate: 120 },
  });
  return r.json();
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [active, trialing, charges] = await Promise.all([
      sg("subscriptions?status=active&limit=100&expand[]=data.items"),
      sg("subscriptions?status=trialing&limit=100"),
      sg("charges?limit=20&expand[]=data.billing_details"),
    ]);

    let mrr = 0, soloCount = 0, teamCount = 0;
    for (const sub of active.data ?? []) {
      const item = sub.items?.data?.[0];
      const pid = item?.price?.id;
      const amt = item?.price?.unit_amount ?? 0;
      mrr += amt;
      if (pid === SOLO) soloCount++;
      else if (pid === TEAM) teamCount++;
    }

    const recentCharges = (charges.data ?? []).map((c: Record<string, unknown>) => ({
      id: c.id as string,
      amount: c.amount as number,
      email: ((c.billing_details as Record<string, unknown>)?.email as string) ?? "—",
      created: c.created as number,
    }));

    return NextResponse.json({
      mrr,
      activeCount: (active.data ?? []).length,
      trialCount: (trialing.data ?? []).length,
      soloCount,
      teamCount,
      recentCharges,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
