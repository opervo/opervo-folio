// API client for talking to the opervo-ops-server orchestrator from the
// admin UI. Forwards the user's Supabase JWT as a Bearer token so the
// orchestrator's requireAdminFromRequest can verify and check the allowlist.
//
// Two flavors:
//   - opsApi() — fetch wrapper for direct orchestrator calls (queue, system,
//     personal-tasks, etc). Used in client components.
//   - serverOpsApi() — same shape, used in server components where we have
//     the Supabase session via cookies(). Both end up sending the same JWT.

import { createBrowserClient, createServerClient } from '@supabase/ssr';

const OPS_SERVER_URL = process.env.NEXT_PUBLIC_OPS_SERVER_URL ?? 'https://ops-server.opervo.io';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

// --- client-side ---
async function getClientJwt(): Promise<string | null> {
  const sb = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data } = await sb.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function opsApi<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const jwt = await getClientJwt();
  if (!jwt) throw new Error('not authenticated');
  return fetchOps<T>(jwt, path, options);
}

// --- server-side ---
export async function serverOpsApi<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const sb = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(_) { /* no-op in server component */ },
      },
    }
  );
  const { data } = await sb.auth.getSession();
  const jwt = data.session?.access_token;
  if (!jwt) throw new Error('not authenticated');
  return fetchOps<T>(jwt, path, options);
}

// --- shared ---
async function fetchOps<T>(jwt: string, path: string, options: ApiOptions): Promise<T> {
  const url = new URL(path, OPS_SERVER_URL);
  if (options.query) {
    for (const [k, v] of Object.entries(options.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    method: options.method ?? 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`ops api ${res.status}: ${error}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// --- typed helpers for common surfaces ---

export interface QueueItem {
  id: string;
  task_id: string;
  rationale: string | null;
  proposed_action: { side_effects: unknown[] };
  created_at: string;
  expires_at: string;
  permission_tier: string;
  is_customer_facing: boolean;
  task: { id: string; role_slug: string; task_type: string; inputs: unknown; outputs: unknown };
}

export interface SystemState {
  automation_enabled: boolean;
  global_daily_budget_usd: number;
  last_trip_reason: string | null;
  last_trip_at: string | null;
  last_resume_reason: string | null;
  last_resume_at: string | null;
}

export interface PersonalTask {
  id: string;
  title: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: string | null;
  status: 'open' | 'in_progress' | 'done' | 'cancelled';
  notes: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface RoleRow {
  slug: string;
  display_name: string;
  enabled: boolean;
  spec_version: string;
  daily_budget_usd: number;
  burn_in_remaining: number;
  graduation_eligible: boolean;
}
