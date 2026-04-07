import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

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
      .select("id, first_name, business_name, slug, plan, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    const { data: authData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    const emailMap: Record<string, string> = {};
    for (const u of authData?.users ?? []) emailMap[u.id] = u.email ?? "";

    const users = (profiles ?? []).map(p => ({ ...p, email: emailMap[p.id] ?? "—" }));
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
