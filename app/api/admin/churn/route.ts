import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 1. Trial expiring (within 5 days)
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, first_name, business_name, trial_start_date, created_at")
      .not("trial_start_date", "is", null)
      .limit(200);

    const trialExpiring = (profiles || [])
      .map((p) => {
        const start = new Date(p.trial_start_date).getTime();
        const expiry = start + 30 * 86400000;
        const daysLeft = Math.max(0, Math.ceil((expiry - Date.now()) / 86400000));
        return { ...p, daysLeft };
      })
      .filter((p) => p.daysLeft <= 5 && p.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .map((p) => ({
        id: p.user_id,
        email: "",
        first_name: p.first_name,
        business_name: p.business_name,
        plan: "trialing",
        reason: "Trial expiring",
        detail: p.daysLeft === 0 ? "Trial expired today" : `${p.daysLeft} day${p.daysLeft === 1 ? "" : "s"} left`,
        trialDaysLeft: p.daysLeft,
      }));

    // 2. Get emails for trial users
    const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 500 });
    const emailMap: Record<string, string> = {};
    for (const u of authData?.users || []) {
      if (u.email) emailMap[u.id] = u.email;
    }
    for (const u of trialExpiring) {
      u.email = emailMap[u.id] || "";
    }

    // 3. Payment failed — check Stripe for past_due subscriptions
    const paymentFailed: { id: string; email: string; first_name?: string; business_name?: string; plan: string; reason: string; detail: string; trialDaysLeft?: number; daysInactive?: number }[] = [];
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (stripeKey) {
        const res = await fetch(
          "https://api.stripe.com/v1/subscriptions?status=past_due&limit=20",
          { headers: { Authorization: `Bearer ${stripeKey}` } }
        );
        if (res.ok) {
          const data = await res.json();
          for (const sub of data.data || []) {
            const email = sub.customer_email || sub.metadata?.email || "";
            paymentFailed.push({
              id: sub.customer || sub.id,
              email,
              first_name: undefined,
              business_name: undefined,
              plan: "past_due",
              reason: "Payment failed",
              detail: `Since ${new Date(sub.current_period_start * 1000).toLocaleDateString()}`,
            });
          }
        }
      }
    } catch {
      // Stripe call failed — don't block the rest
    }

    // 4. Inactive users (signed up 7+ days ago, never created a job)
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const { data: allProfiles } = await supabase
      .from("profiles")
      .select("user_id, first_name, business_name, created_at")
      .lt("created_at", sevenDaysAgo)
      .limit(200);

    // Check which users have jobs
    const { data: jobUsers } = await supabase
      .from("jobs")
      .select("user_id")
      .limit(1000);

    const usersWithJobs = new Set((jobUsers || []).map((j) => j.user_id));

    const inactive = (allProfiles || [])
      .filter((p) => !usersWithJobs.has(p.user_id))
      .map((p) => {
        const daysSince = Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000);
        return {
          id: p.user_id,
          email: emailMap[p.user_id] || "",
          first_name: p.first_name,
          business_name: p.business_name,
          plan: "unknown",
          reason: "No activity",
          detail: `Signed up ${daysSince}d ago, no jobs created`,
          daysInactive: daysSince,
        };
      })
      .sort((a, b) => (b.daysInactive || 0) - (a.daysInactive || 0))
      .slice(0, 20);

    return NextResponse.json({ trialExpiring, inactive, paymentFailed });
  } catch (err) {
    console.error("[admin/churn] Error:", err);
    return NextResponse.json({ error: "Failed to fetch churn data" }, { status: 500 });
  }
}
