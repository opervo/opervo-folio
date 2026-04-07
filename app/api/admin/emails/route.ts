import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const r = await fetch("https://api.resend.com/emails?limit=40", {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      next: { revalidate: 120 },
    });
    const d = await r.json();
    return NextResponse.json(d.data ?? []);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
