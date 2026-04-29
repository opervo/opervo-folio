import { adminSupabase } from '@/lib/admin/supabase';
import YesterdayCard from '@/components/admin/ops/today/YesterdayCard';
import QueueSummaryCard from '@/components/admin/ops/today/QueueSummaryCard';
import StuckListCard from '@/components/admin/ops/today/StuckListCard';
import SystemCard from '@/components/admin/ops/today/SystemCard';
import PersonalTasksCard from '@/components/admin/ops/today/PersonalTasksCard';
import { requireAdmin } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export default async function TodayPage() {
  const { uid } = await requireAdmin();
  const sb = adminSupabase();
  const today = new Date().toISOString().slice(0, 10);
  const sixAm = `${today}T11:00:00Z`;       // ~06:00 CT

  // Pull everything in parallel; degrade gracefully if any sub-query fails
  const [
    latestDigestRes,
    latestStuckRes,
    stateRes,
    rolesRes,
    approvalsRes,
    approvalsRecentRes,
    spendRes,
    personalTasksRes,
  ] = await Promise.allSettled([
    sb.schema('ops').from('tasks').select('id, outputs, finished_at')
      .eq('role_slug', 'reporter').eq('task_type', 'daily_digest').eq('status', 'completed')
      .order('finished_at', { ascending: false }).limit(1).maybeSingle(),
    sb.schema('ops').from('tasks').select('id, outputs, finished_at')
      .eq('role_slug', 'stuck-list').eq('task_type', 'morning_scan').eq('status', 'completed')
      .order('finished_at', { ascending: false }).limit(1).maybeSingle(),
    sb.schema('ops').from('system_state').select('*').eq('id', 'global').single(),
    sb.schema('ops').from('role_registry').select('slug, enabled'),
    sb.schema('ops').from('approvals').select('id, created_at, task:tasks(role_slug, task_type)').eq('decision', 'pending'),
    sb.schema('ops').from('approvals').select('id', { count: 'exact', head: true }).eq('decision', 'pending').gte('created_at', sixAm),
    sb.schema('ops').from('budget_ledger').select('cost_usd').eq('date', today),
    sb.schema('ops').from('personal_tasks').select('*').eq('owner', uid).neq('status', 'done').order('created_at', { ascending: false }).limit(20),
  ]);

  // Unwrap with defaults
  const digestOutputs = (latestDigestRes.status === 'fulfilled' ? (latestDigestRes.value.data as { outputs: { metrics?: unknown; deltas?: unknown; anomalies?: unknown[]; date?: string } | null })?.outputs : null) ?? null;
  const stuckOutputs = (latestStuckRes.status === 'fulfilled' ? (latestStuckRes.value.data as { outputs: { items?: unknown[]; scanned_at?: string } | null })?.outputs : null) ?? null;
  const state = stateRes.status === 'fulfilled' ? stateRes.value.data : null;
  const roles = rolesRes.status === 'fulfilled' ? (rolesRes.value.data ?? []) : [];
  const approvals = approvalsRes.status === 'fulfilled' ? (approvalsRes.value.data ?? []) : [];
  const newSinceMorning = approvalsRecentRes.status === 'fulfilled' ? (approvalsRecentRes.value.count ?? 0) : 0;
  const spendToday = spendRes.status === 'fulfilled'
    ? (spendRes.value.data ?? []).reduce((s, r: { cost_usd: number }) => s + Number(r.cost_usd), 0) : 0;
  const personalTasks = personalTasksRes.status === 'fulfilled' ? (personalTasksRes.value.data ?? []) : [];

  // Derive metric for cards
  const yesterdayMetrics = (digestOutputs as { metrics?: { signups: number; paying: number; revenue_usd: number; jobs_created: number; jobs_completed: number; invoices_sent: number; invoices_paid: number } } | null)?.metrics ?? {
    signups: 0, paying: 0, revenue_usd: 0, jobs_created: 0, jobs_completed: 0, invoices_sent: 0, invoices_paid: 0,
  };
  const yesterdayDate = (digestOutputs as { date?: string } | null)?.date ?? new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const anomalies = ((digestOutputs as { anomalies?: Array<{ metric: string; observed: number; baseline: number; delta_pct: number }> } | null)?.anomalies ?? []);

  // Customer-facing detection in queue
  const customerFacingApprovals = (approvals as unknown as Array<{ task?: { role_slug: string } }>).filter(a => {
    const role = a.task?.role_slug;
    return role === 'support-triage' || role === 'onboarding';
  }).length;
  const internalApprovals = approvals.length - customerFacingApprovals;

  const stuckItems = ((stuckOutputs as { items?: Array<{
    stuck_kind: string; severity: 'info' | 'flag' | 'urgent'; account_id: string; account_label: string;
    object_id: string; object_kind: string; object_summary: string; age_days: number; dollar_value: number | null;
    next_step_hint: string; first_surfaced: string | null;
  }> } | null)?.items ?? []);

  const greeting = greetByHour();
  const todayDateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
          fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
          margin: 0, lineHeight: 1.1,
        }}>
          {greeting}, MAX<span style={{ color: '#F5620F' }}>.</span>
        </h1>
        <div style={{ marginTop: 4, color: '#6B6B6B', fontSize: 14 }}>{todayDateStr}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        <YesterdayCard
          date={yesterdayDate}
          metrics={yesterdayMetrics}
          anomalies={anomalies}
        />
        <QueueSummaryCard
          total={approvals.length}
          newSinceMorning={newSinceMorning}
          customerFacing={customerFacingApprovals}
          internal={internalApprovals}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        <StuckListCard
          items={stuckItems}
          scanned_at={(stuckOutputs as { scanned_at?: string } | null)?.scanned_at ?? null}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SystemCard
            automationOn={state?.automation_enabled ?? false}
            spendToday={spendToday}
            budgetToday={Number(state?.global_daily_budget_usd ?? 50)}
            rolesEnabled={roles.filter(r => r.enabled).length}
            rolesTotal={roles.length}
            lastTripAt={state?.last_trip_at ?? null}
          />
          <PersonalTasksCard initialTasks={personalTasks as never} />
        </div>
      </div>
    </div>
  );
}

function greetByHour(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
