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
    const { data: authData } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    });
    const allUsers = authData?.users ?? [];

    const { data: profiles } = await supabase
      .from("profiles")
      .select(
        "user_id, business_name, subscription_status, subscription_plan, trial_start_date, created_at, business_slug, stripe_account_id, square_merchant_id"
      )
      .limit(1000);

    const profileMap = new Map<string, (typeof profiles extends (infer T)[] | null ? T : never)>();
    for (const p of profiles || []) {
      profileMap.set(p.user_id, p);
    }

    const [jobsRes, invoicesRes, clientsRes, paidRes] = await Promise.allSettled([
      supabase.from("jobs").select("user_id").limit(5000),
      supabase.from("invoices").select("user_id").limit(5000),
      supabase.from("clients").select("user_id").limit(5000),
      supabase
        .from("invoices")
        .select("user_id")
        .eq("status", "paid")
        .limit(5000),
    ]);

    const usersWithJobs = new Set<string>();
    const usersWithInvoices = new Set<string>();
    const usersWithClients = new Set<string>();
    const usersWithPayments = new Set<string>();

    if (jobsRes.status === "fulfilled")
      for (const r of jobsRes.value.data || []) usersWithJobs.add(r.user_id);
    if (invoicesRes.status === "fulfilled")
      for (const r of invoicesRes.value.data || [])
        usersWithInvoices.add(r.user_id);
    if (clientsRes.status === "fulfilled")
      for (const r of clientsRes.value.data || [])
        usersWithClients.add(r.user_id);
    if (paidRes.status === "fulfilled")
      for (const r of paidRes.value.data || [])
        usersWithPayments.add(r.user_id);

    // Build per-user step completion
    type UserFunnel = {
      id: string;
      email: string;
      created_at: string;
      week: string;
      steps: {
        signed_up: boolean;
        profile_set: boolean;
        first_client: boolean;
        first_job: boolean;
        first_invoice: boolean;
        first_payment: boolean;
        paid_subscription: boolean;
      };
    };

    const funnelUsers: UserFunnel[] = allUsers.map((u) => {
      const p = profileMap.get(u.id);
      const hasProfile = !!(p?.business_name && p.business_name.trim());
      const isPaid =
        p?.subscription_status === "active" ||
        p?.subscription_plan === "solo" ||
        p?.subscription_plan === "team";

      const createdAt = new Date(u.created_at);
      const weekStart = new Date(createdAt);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const week = weekStart.toISOString().slice(0, 10);

      return {
        id: u.id,
        email: u.email || "",
        created_at: u.created_at,
        week,
        steps: {
          signed_up: true,
          profile_set: hasProfile,
          first_client: usersWithClients.has(u.id),
          first_job: usersWithJobs.has(u.id),
          first_invoice: usersWithInvoices.has(u.id),
          first_payment: usersWithPayments.has(u.id),
          paid_subscription: isPaid,
        },
      };
    });

    // Aggregate funnel
    const stepNames = [
      "signed_up",
      "profile_set",
      "first_client",
      "first_job",
      "first_invoice",
      "first_payment",
      "paid_subscription",
    ] as const;

    const funnel = stepNames.map((step) => ({
      step,
      count: funnelUsers.filter((u) => u.steps[step]).length,
      total: funnelUsers.length,
    }));

    // Cohort aggregation by week
    const cohortMap = new Map<
      string,
      { week: string; total: number; steps: Record<string, number> }
    >();
    for (const u of funnelUsers) {
      let cohort = cohortMap.get(u.week);
      if (!cohort) {
        cohort = {
          week: u.week,
          total: 0,
          steps: Object.fromEntries(stepNames.map((s) => [s, 0])),
        };
        cohortMap.set(u.week, cohort);
      }
      cohort.total++;
      for (const s of stepNames) {
        if (u.steps[s]) cohort.steps[s]++;
      }
    }

    const cohorts = Array.from(cohortMap.values())
      .sort((a, b) => b.week.localeCompare(a.week))
      .slice(0, 12);

    return NextResponse.json({ funnel, cohorts, totalUsers: funnelUsers.length });
  } catch (err) {
    console.error("[admin/funnel] Error:", err);
    return NextResponse.json(
      { error: "Failed to build funnel" },
      { status: 500 }
    );
  }
}
