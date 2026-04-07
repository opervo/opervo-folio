import { cookies } from "next/headers";

export const ADMIN_COOKIE = "opervo_admin_session";

export async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === secret;
}
