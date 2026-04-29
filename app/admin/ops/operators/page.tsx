import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import OperatorsClient, { type OperatorRow } from '@/components/admin/ops/operators/OperatorsClient';

export const dynamic = 'force-dynamic';

const TRIAL_LENGTH_DAYS = 30;
const STALE_LOGIN_DAYS = 10;
const CHURN_LOOKBACK_DAYS = 30;

export default async function OperatorsPage() {
  await requireAdmin();
  const sb = adminSupabase();

  // Pull profiles + auth.users for emails + per-operator counts.
  // Limit to 500 for sanity in early-beta scale; beyond that we'd paginate.
  const { data: profiles } = await sb.from('profiles')
    .select('id, business_name, location, subscription_plan, has_completed_tour, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(500);

  const profileIds = (profiles ?? []).map(p => p.id as string);

  // Parallel reads for emails + activity counts + stuck context counts
  const [usersRes, jobsRes, invoicesRes, stuckRes] = await Promise.all([
    sb.auth.admin.listUsers({ perPage: 500 }),
    sb.from('jobs').select('user_id').in('user_id', profileIds.length ? profileIds : ['00000000-0000-0000-0000-000000000000']),
    sb.from('invoices').select('user_id, total, status, paid_at')
      .in('user_id', profileIds.length ? profileIds : ['00000000-0000-0000-0000-000000000000']),
    sb.schema('ops').from('account_context')
      .select('account_id')
      .in('account_id', profileIds.length ? profileIds : ['00000000-0000-0000-0000-000000000000'])
      .eq('account_kind', 'operator')
      .or(`ttl_at.is.null,ttl_at.gt.${new Date().toISOString()}`)
      ,
  ]);

  const emailsByUid = new Map<string, { email: string; last_sign_in_at: string | null }>();
  for (const u of usersRes.data?.users ?? []) {
    emailsByUid.set(u.id, { email: u.email ?? '', last_sign_in_at: u.last_sign_in_at ?? null });
  }

  const jobCounts = new Map<string, number>();
  for (const j of jobsRes.data ?? []) {
    jobCounts.set(j.user_id, (jobCounts.get(j.user_id) ?? 0) + 1);
  }

  const revenueByProfile = new Map<string, number>();
  for (const inv of invoicesRes.data ?? []) {
    if (inv.status === 'paid' && inv.total) {
      revenueByProfile.set(inv.user_id, (revenueByProfile.get(inv.user_id) ?? 0) + Number(inv.total));
    }
  }

  const stuckByProfile = new Map<string, number>();
  for (const r of stuckRes.data ?? []) {
    stuckByProfile.set(r.account_id, (stuckByProfile.get(r.account_id) ?? 0) + 1);
  }

  const operators: OperatorRow[] = (profiles ?? []).map(p => {
    const auth = emailsByUid.get(p.id as string);
    const created = new Date(p.created_at as string);
    const ageDays = Math.floor((Date.now() - created.getTime()) / (24 * 60 * 60 * 1000));
    const isTrial = !p.subscription_plan && ageDays <= TRIAL_LENGTH_DAYS;
    const isChurned = !p.subscription_plan && ageDays > TRIAL_LENGTH_DAYS;     // simplified — real def needs Stripe canceled_at
    const lastLogin = auth?.last_sign_in_at ? new Date(auth.last_sign_in_at) : null;
    const staleLogin = lastLogin && (Date.now() - lastLogin.getTime()) > STALE_LOGIN_DAYS * 24 * 60 * 60 * 1000;
    const status: OperatorRow['status'] = isChurned ? 'churned'
      : isTrial ? 'trial'
      : staleLogin ? 'at_risk'
      : 'active';

    return {
      id: p.id as string,
      business_name: p.business_name as string | null,
      email: auth?.email ?? '',
      location: p.location as string | null,
      subscription_plan: (p.subscription_plan ?? null) as 'solo' | 'team' | null,
      has_completed_tour: !!p.has_completed_tour,
      created_at: p.created_at as string,
      last_login_at: auth?.last_sign_in_at ?? null,
      jobs_count: jobCounts.get(p.id as string) ?? 0,
      revenue_total: revenueByProfile.get(p.id as string) ?? 0,
      stuck_count: stuckByProfile.get(p.id as string) ?? 0,
      trial_days_left: isTrial ? Math.max(0, TRIAL_LENGTH_DAYS - ageDays) : null,
      status,
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
          fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
          margin: 0, lineHeight: 1.1,
        }}>
          Operators
        </h1>
        <div style={{ marginTop: 4, color: '#6B6B6B', fontSize: 14 }}>
          {operators.length} total · {operators.filter(o => o.subscription_plan).length} paying
        </div>
      </div>

      <OperatorsClient operators={operators} />
    </div>
  );
}
