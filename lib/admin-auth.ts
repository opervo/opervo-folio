import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "opervo_admin_session";

// Token format: base64url(payload).hex(hmac)
// payload is `{iat,exp}` JSON. The cookie no longer contains the raw secret —
// previously a leaked Set-Cookie header would have given an attacker permanent
// admin access with no rotation path.
const TOKEN_LIFETIME_MS = 60 * 60 * 8 * 1000; // 8 hours

function b64url(data: string): string {
  return Buffer.from(data, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64").toString("utf8");
}

export function signAdminToken(secret: string, now = Date.now()): string {
  const payload = JSON.stringify({ iat: now, exp: now + TOKEN_LIFETIME_MS });
  const encoded = b64url(payload);
  const sig = createHmac("sha256", secret).update(encoded).digest("hex");
  return `${encoded}.${sig}`;
}

export function verifyAdminToken(secret: string, token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encoded, sig] = parts;
  const expected = createHmac("sha256", secret).update(encoded).digest("hex");
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || a.length === 0) return false;
  if (!timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(b64urlDecode(encoded)) as { iat: number; exp: number };
    if (typeof payload.exp !== "number") return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const c = await cookies();
  const token = c.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(secret, token);
}
