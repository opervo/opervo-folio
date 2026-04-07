import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

interface ProfileRow {
  user_id: string;
  owner_name: string | null;
  business_name: string | null;
  business_slug: string | null;
  subscription_status: string | null;
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
      .select("user_id, owner_name, business_name, business_slug, subscription_status, created_at, email")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    // Fall back to auth.users for any profile missing an email
    const { data: authData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    const emailMap: Record<string, string> = {};
    for (const u of authData?.users ?? []) emailMap[u.id] = u.email ?? "";

    const users = ((profiles ?? []) as ProfileRow[]).map((p) => ({
      id: p.user_id,
      first_name: p.owner_name ?? "",
      business_name: p.business_name ?? "",
      slug: p.business_slug ?? "",
      plan: p.subscription_status ?? "trialing",
      created_at: p.created_at,
      email: p.email || emailMap[p.user_id] || "—",
    }));

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
