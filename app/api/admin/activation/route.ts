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
    // All queries scoped to last 30 days for relevance
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [
      signupsRes,
      onboardedRes,
      createdClientRes,
      createdJobRes,
      sentInvoiceRes,
      gotPaidRes,
    ] = await Promise.all([
      // Signed up (auth.users)
      supabase.auth.admin.listUsers({ perPage: 1000 }),

      // Onboarded (profiles with business_name set)
      supabase
        .from("profiles")
        .select("user_id", { count: "exact", head: true })
        .neq("business_name", "")
        .gte("created_at", thirtyDaysAgo),

      // Created at least one client
      supabase.rpc("count_distinct_users_with_clients", { since: thirtyDaysAgo }).single(),

      // Created at least one job
      supabase.rpc("count_distinct_users_with_jobs", { since: thirtyDaysAgo }).single(),

      // Sent at least one invoice
      supabase.rpc("count_distinct_users_with_invoices", { since: thirtyDaysAgo }).single(),

      // Got at least one invoice paid
      supabase.rpc("count_distinct_users_with_paid_invoices", { since: thirtyDaysAgo }).single(),
    ]);

    // Count signups in last 30 days from auth.users
    const allUsers = signupsRes.data?.users ?? [];
    const recentSignups = allUsers.filter(
      (u) => new Date(u.created_at).getTime() > Date.now() - 30 * 86400000
    ).length;

    // For the RPC-based counts, fall back to direct queries if RPCs don't exist yet
    const onboarded = onboardedRes.count ?? 0;

    // Try RPC results, fall back to 0 if RPCs aren't created yet
    const createdClient = typeof createdClientRes.data === "number" ? createdClientRes.data : 0;
    const createdJob = typeof createdJobRes.data === "number" ? createdJobRes.data : 0;
    const sentInvoice = typeof sentInvoiceRes.data === "number" ? sentInvoiceRes.data : 0;
    const gotPaid = typeof gotPaidRes.data === "number" ? gotPaidRes.data : 0;

    return NextResponse.json({
      signedUp: recentSignups,
      onboarded,
      createdClient,
      createdJob,
      sentInvoice,
      gotPaid,
      period: "30d",
    });
  } catch (err) {
    console.error("[admin/activation] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch activation data" },
      { status: 500 }
    );
  }
}
