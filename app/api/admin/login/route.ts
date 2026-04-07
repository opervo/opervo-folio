import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!expected || !secret) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
    if (typeof password !== "string" || password !== expected) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const c = await cookies();
    c.set(ADMIN_COOKIE, secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
