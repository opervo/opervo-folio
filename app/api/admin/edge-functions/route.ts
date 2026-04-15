import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const SUPABASE_PROJECT_REF = "sbnykmxckfwkkxvhrkot";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({
      configured: false,
      error: "SUPABASE_ACCESS_TOKEN not set. Get one from supabase.com/dashboard/account/tokens.",
      functions: [],
    });
  }

  try {
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/functions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({
        configured: true,
        error: `Supabase API ${res.status}: ${text}`,
        functions: [],
      });
    }

    const functions = await res.json();
    return NextResponse.json({
      configured: true,
      functions: (functions || []).map((f: Record<string, unknown>) => ({
        id: f.id,
        slug: f.slug,
        name: f.name || f.slug,
        status: f.status || "active",
        version: f.version || 1,
        created_at: f.created_at,
        updated_at: f.updated_at,
      })),
    });
  } catch (e) {
    return NextResponse.json({ configured: true, error: String(e), functions: [] }, { status: 500 });
  }
}
