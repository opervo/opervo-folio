import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const [
      profileRes,
      authRes,
      jobsRes,
      invoicesRes,
      estimatesRes,
      clientsRes,
      servicesRes,
      teamRes,
      suppliesRes,
      mileageRes,
      expensesRes,
      calendarRes,
    ] = await Promise.allSettled([
      supabase.from("profiles").select("*").eq("user_id", id).single(),
      supabase.auth.admin.getUserById(id),
      supabase
        .from("jobs")
        .select("id, client_name, status, service_type, date, created_at, price")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("invoices")
        .select("id, client_name, status, total, created_at, paid_at")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("estimates")
        .select("id, status, total, created_at")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("clients")
        .select("id, name, email, created_at")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("services")
        .select("id, name, price, created_at")
        .eq("user_id", id),
      supabase
        .from("team_members")
        .select("id, name, email, status")
        .eq("owner_user_id", id),
      supabase
        .from("supplies")
        .select("id, name, category, current_stock, low_stock_threshold")
        .eq("user_id", id),
      supabase
        .from("mileage_trips")
        .select("id, created_at")
        .eq("user_id", id)
        .limit(1),
      supabase
        .from("expenses")
        .select("id, amount, category, date, created_at")
        .eq("user_id", id)
        .limit(1),
      supabase
        .from("google_calendar_sync")
        .select("id, sync_enabled")
        .eq("user_id", id)
        .limit(1),
    ]);

    const profile =
      profileRes.status === "fulfilled" ? profileRes.value.data : null;
    const authUser =
      authRes.status === "fulfilled" ? authRes.value.data?.user : null;
    const jobs =
      jobsRes.status === "fulfilled" ? jobsRes.value.data || [] : [];
    const invoices =
      invoicesRes.status === "fulfilled" ? invoicesRes.value.data || [] : [];
    const estimates =
      estimatesRes.status === "fulfilled" ? estimatesRes.value.data || [] : [];
    const clients =
      clientsRes.status === "fulfilled" ? clientsRes.value.data || [] : [];
    const services =
      servicesRes.status === "fulfilled" ? servicesRes.value.data || [] : [];
    const team =
      teamRes.status === "fulfilled" ? teamRes.value.data || [] : [];
    const supplies =
      suppliesRes.status === "fulfilled" ? suppliesRes.value.data || [] : [];
    const hasMileage =
      mileageRes.status === "fulfilled" &&
      (mileageRes.value.data || []).length > 0;
    const hasExpenses =
      expensesRes.status === "fulfilled" &&
      (expensesRes.value.data || []).length > 0;
    const hasCalendar =
      calendarRes.status === "fulfilled" &&
      (calendarRes.value.data || []).length > 0;

    const paidInvoices = invoices.filter(
      (i: { status: string }) => i.status === "paid"
    );
    const totalRevenue = paidInvoices.reduce(
      (sum: number, i: { total: number | null }) => sum + (Number(i.total) || 0),
      0
    );

    const completedJobs = jobs.filter(
      (j: { status: string }) =>
        j.status === "completed" || j.status === "paid"
    );

    const features = {
      hasProfile: !!(profile?.business_name && profile.business_name.trim()),
      hasJobs: jobs.length > 0,
      hasInvoices: invoices.length > 0,
      hasClients: clients.length > 0,
      hasEstimates: estimates.length > 0,
      hasServices: services.length > 0,
      hasTeam: team.length > 0,
      hasSupplies: supplies.length > 0,
      hasMileage,
      hasExpenses,
      hasFolio: !!profile?.business_slug,
      hasCalendar,
      hasStripe: !!profile?.stripe_account_id,
      hasSquare: !!profile?.square_merchant_id,
    };

    const featureCount = Object.values(features).filter(Boolean).length;

    type TimelineEvent = {
      type: string;
      date: string;
      title: string;
      detail?: string;
    };
    const timeline: TimelineEvent[] = [];

    for (const j of jobs.slice(0, 20)) {
      timeline.push({
        type: "job",
        date: j.created_at,
        title: j.service_type || j.client_name || "Job",
        detail: j.status,
      });
    }
    for (const inv of invoices.slice(0, 15)) {
      timeline.push({
        type: inv.status === "paid" ? "payment" : "invoice",
        date: inv.paid_at || inv.created_at,
        title: `Invoice ${inv.client_name || ""}`.trim(),
        detail: inv.status,
      });
    }
    for (const est of estimates.slice(0, 10)) {
      timeline.push({
        type: "estimate",
        date: est.created_at,
        title: "Estimate",
        detail: est.status,
      });
    }

    timeline.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json({
      profile: {
        id,
        email: authUser?.email || profile?.email || "",
        business_name: profile?.business_name || "",
        owner_name: profile?.owner_name || "",
        slug: profile?.business_slug || "",
        phone: profile?.business_phone || profile?.phone_number || "",
        industry: profile?.trade_type || "",
        subscription_status: profile?.subscription_status || "trialing",
        subscription_plan: profile?.subscription_plan || "",
        trial_start_date: profile?.trial_start_date || profile?.created_at,
        created_at: profile?.created_at || authUser?.created_at || "",
        last_sign_in: authUser?.last_sign_in_at || null,
        service_areas: profile?.service_areas || [],
      },
      stats: {
        totalJobs: jobs.length,
        completedJobs: completedJobs.length,
        totalInvoices: invoices.length,
        paidInvoices: paidInvoices.length,
        totalRevenue,
        totalClients: clients.length,
        totalEstimates: estimates.length,
        totalServices: services.length,
        teamSize: team.length,
      },
      features,
      featureCount,
      timeline: timeline.slice(0, 30),
      recentJobs: jobs.slice(0, 10).map((j) => ({
        id: j.id,
        title: j.client_name || j.service_type || "Untitled",
        status: j.status,
        service_type: j.service_type || "",
        scheduled_date: j.date || j.created_at,
        created_at: j.created_at,
        total_price: Number(j.price) || 0,
      })),
      recentInvoices: invoices.slice(0, 10).map((inv) => ({
        id: inv.id,
        invoice_number: inv.id.slice(0, 8),
        status: inv.status,
        total: Number(inv.total) || 0,
        created_at: inv.created_at,
        paid_at: inv.paid_at,
      })),
      clients: clients.slice(0, 20).map((c) => ({
        id: c.id,
        first_name: (c.name || "").split(" ")[0] || "",
        last_name: (c.name || "").split(" ").slice(1).join(" "),
        email: c.email || "",
        created_at: c.created_at,
      })),
      team: team.map((m) => ({
        id: m.id,
        name: m.name || m.email || "Member",
        email: m.email || "",
        role: "member",
        status: m.status || "active",
      })),
      services: services.map((svc) => ({
        id: svc.id,
        name: svc.name,
        base_price: Number(svc.price) || 0,
        created_at: svc.created_at,
      })),
    });
  } catch (err) {
    console.error("[admin/operator] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch operator data" },
      { status: 500 }
    );
  }
}
