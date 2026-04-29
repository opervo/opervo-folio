// Server-side service-role Supabase client for the admin pages.
// USE WITH CARE: this client bypasses RLS. Only invoke from server components
// or route handlers that have already passed `requireAdmin()`.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

// Untyped SupabaseClient — admin pages query `ops.*` schema which isn't
// in the generated `Database` type for opervo-folio. Untyped lets `.schema('ops')`
// compile cleanly. Runtime safety is the GRANTs + the requireAdmin() gate.
export function adminSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Admin Supabase not configured: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY');
  _client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { 'x-client-info': 'opervo-folio/admin' } },
  });
  return _client;
}
