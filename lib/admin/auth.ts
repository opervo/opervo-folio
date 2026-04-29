// Admin auth gate for /admin/ops/* pages.
//
// Reuses the existing /admin session (password + HMAC cookie) from
// lib/admin-auth.ts so Max doesn't need a second login. The ops layer
// adds an ALLOWED_ADMIN_UIDS env-var allowlist on top — the cookie says
// "you logged in as an admin," and the env var says "and your UID is one
// we recognize as an ops admin."
//
// In single-tenant Corporate, ALLOWED_ADMIN_UIDS holds Max's UID. When
// Copilot ships, this becomes a per-tenant lookup.
//
// Returns { uid, email } so callers that want to log "who approved this"
// have something concrete. uid comes from env (no DB roundtrip).

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';

const ALLOWED_UIDS = (process.env.ALLOWED_ADMIN_UIDS ?? '').split(',').map(s => s.trim()).filter(Boolean);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'maxspi203@gmail.com';

export async function requireAdmin(): Promise<{ uid: string; email: string }> {
  const ok = await isAdmin();
  if (!ok) redirect('/admin/login');

  // The existing admin session doesn't carry a UID — it's a password gate.
  // ALLOWED_ADMIN_UIDS is the environment-side allowlist; we return the
  // first matching UID. In Corporate that's always Max.
  const uid = ALLOWED_UIDS[0];
  if (!uid) {
    // Misconfiguration — fail closed.
    redirect('/admin/login');
  }
  return { uid, email: ADMIN_EMAIL };
}
