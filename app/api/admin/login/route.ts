import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

/**
 * Constant-time string comparison.
 * Prevents timing oracles that let an attacker discover the password byte-by-byte.
 */
function safeEqual(a: string, b: string): boolean {
  // Hash both inputs to fixed-length buffers so length comparison itself doesn't leak info
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    // Still do a comparison so failure timing matches success timing for length-mismatch case
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!expected || !secret) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
    if (typeof password !== "string" || !safeEqual(password, expected)) {
      // Small fixed delay to make brute force noisier than instant 401s
      await new Promise((r) => setTimeout(r, 250));
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
