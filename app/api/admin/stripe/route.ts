import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const KEY = process.env.STRIPE_SECRET_KEY!;
const SOLO = process.env.STRIPE_SOLO_PRICE_ID!;
const TEAM = process.env.STRIPE_TEAM_PRICE_ID!;

interface StripePrice {
  id: string;
  unit_amount?: number;
  recurring?: { interval?: string; interval_count?: number };
}
interface StripeSubItem {
  price?: StripePrice;
  quantity?: number;
}
interface StripeSub {
  id: string;
  items?: { data?: StripeSubItem[] };
  status?: string;
  canceled_at?: number;
}

async function sg(path: string) {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${KEY}` },
    next: { revalidate: 120 },
  });
  return r.json();
}

/**
 * Convert any subscription item (yearly, weekly, multi-quantity, multi-item)
 * into its monthly recurring revenue equivalent in cents.
 */
function itemToMonthlyCents(item: StripeSubItem): number {
  const unit = item.price?.unit_amount ?? 0;
  const qty = item.quantity ?? 1;
  const interval = item.price?.recurring?.interval ?? "month";
  const count = item.price?.recurring?.interval_count ?? 1;
  const total = unit * qty;
  // Normalize to monthly
  switch (interval) {
    case "day":   return Math.round((total * 30) / count);
    case "week":  return Math.round((total * 4.345) / count);
    case "month": return Math.round(total / count);
    case "year":  return Math.round(total / (12 * count));
    default:      return total;
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [active, trialing, canceled, charges] = await Promise.all([
      sg("subscriptions?status=active&limit=100&expand[]=data.items.data.price"),
      sg("subscriptions?status=trialing&limit=100"),
      sg("subscriptions?status=canceled&limit=100"),
      sg("charges?limit=20&expand[]=data.billing_details"),
    ]);

    let mrr = 0, soloCount = 0, teamCount = 0;
    for (const sub of (active.data ?? []) as StripeSub[]) {
      for (const item of sub.items?.data ?? []) {
        mrr += itemToMonthlyCents(item);
        const pid = item.price?.id;
        if (pid === SOLO) soloCount++;
        else if (pid === TEAM) teamCount++;
      }
    }

    // Churn = subs canceled in the last 30 days
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 86400;
    const churnedLast30 = ((canceled.data ?? []) as StripeSub[]).filter(
      (s) => (s.canceled_at ?? 0) >= thirtyDaysAgo
    ).length;

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
      churnedLast30,
      recentCharges,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
