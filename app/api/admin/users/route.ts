import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

interface ProfileRow {
  user_id: string;
  owner_name: string | null;
  business_name: string | null;
  business_slug: string | null;
  subscription_status: string | null;
  trial_start_date: string | null;
  created_at: string;
  email: string | null;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("user_id, owner_name, business_name, business_slug, subscription_status, trial_start_date, created_at, email")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    // Fall back to auth.users for any profile missing an email
    const { data: authData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    const emailMap: Record<string, string> = {};
    for (const u of authData?.users ?? []) emailMap[u.id] = u.email ?? "";

    // Fetch onboarding step data in parallel
    const userIds = (profiles ?? []).map((p) => (p as ProfileRow).user_id);

    const [jobsRes, invoicesRes] = await Promise.allSettled([
      supabase.from("jobs").select("user_id").in("user_id", userIds),
      supabase.from("invoices").select("user_id").in("user_id", userIds),
    ]);

    const usersWithJobs = new Set<string>();
    if (jobsRes.status === "fulfilled" && jobsRes.value.data) {
      for (const j of jobsRes.value.data) usersWithJobs.add(j.user_id);
    }

    const usersWithInvoices = new Set<string>();
    if (invoicesRes.status === "fulfilled" && invoicesRes.value.data) {
      for (const inv of invoicesRes.value.data) usersWithInvoices.add(inv.user_id);
    }

    const users = ((profiles ?? []) as ProfileRow[]).map((p) => {
      const hasProfile = !!(p.business_name && p.business_name.trim());
      const hasFirstJob = usersWithJobs.has(p.user_id);
      const hasSentInvoice = usersWithInvoices.has(p.user_id);
      const hasCalendar = false; // Would need to check google_calendar token — default false for now

      // Calculate stalled days: days since signup if not progressing
      const daysSinceSignup = Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000);
      const steps = [hasProfile, hasFirstJob, hasSentInvoice, hasCalendar];
      const completed = steps.filter(Boolean).length;
      const stalledDays = completed < steps.length ? daysSinceSignup : 0;

      return {
        id: p.user_id,
        first_name: p.owner_name ?? "",
        business_name: p.business_name ?? "",
        slug: p.business_slug ?? "",
        plan: p.subscription_status ?? "trialing",
        trial_start_date: p.trial_start_date ?? p.created_at,
        created_at: p.created_at,
        email: p.email || emailMap[p.user_id] || "—",
        onboarding: {
          hasProfile,
          hasFirstJob,
          hasSentInvoice,
          hasCalendar,
          stalledDays,
        },
      };
    });

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
