import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import KillSwitchCard from '@/components/admin/ops/system/KillSwitchCard';
import BudgetCard from '@/components/admin/ops/system/BudgetCard';
import AuditLogTable from '@/components/admin/ops/system/AuditLogTable';
import LessonsCard from '@/components/admin/ops/system/LessonsCard';
import SettingsCard from '@/components/admin/ops/system/SettingsCard';

export const dynamic = 'force-dynamic';

export default async function SystemPage() {
  const { uid, email } = await requireAdmin();
  const sb = adminSupabase();
  const today = new Date().toISOString().slice(0, 10);
  const weekStart = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const monthStart = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);

  const [
    stateRes,
    rolesRes,
    spendTodayRes,
    spendWeekRes,
    spendMonthRes,
    auditCountRes,
    auditRowsRes,
    lessonsThisWeekRes,
    lessonsProposedRes,
    lessonsMergedRes,
    lessonsRejectedRes,
  ] = await Promise.all([
    sb.schema('ops').from('system_state').select('*').eq('id', 'global').single(),
    sb.schema('ops').from('role_registry').select('slug, display_name, enabled, daily_budget_usd'),
    sb.schema('ops').from('budget_ledger').select('cost_usd, role_slug').eq('date', today),
    sb.schema('ops').from('budget_ledger').select('cost_usd').gte('date', weekStart),
    sb.schema('ops').from('budget_ledger').select('cost_usd').gte('date', monthStart),
    sb.schema('ops').from('audit_log').select('id', { count: 'exact', head: true }).gte('created_at', `${monthStart}T00:00:00Z`),
    sb.schema('ops').from('audit_log').select('id, task_id, role_slug, phase, rationale, outcome, cost_usd, duration_ms, created_at').order('created_at', { ascending: false }).limit(100),
    sb.schema('ops').from('lessons').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    sb.schema('ops').from('lessons').select('id', { count: 'exact', head: true }).eq('status', 'proposed'),
    sb.schema('ops').from('lessons').select('id', { count: 'exact', head: true }).eq('status', 'merged').gte('created_at', `${monthStart}T00:00:00Z`),
    sb.schema('ops').from('lessons').select('id', { count: 'exact', head: true }).eq('status', 'rejected').gte('created_at', `${monthStart}T00:00:00Z`),
  ]);

  const state = stateRes.data;
  const roles = rolesRes.data ?? [];
  const spendTodayRows = spendTodayRes.data ?? [];
  const spendToday = spendTodayRows.reduce((s, r) => s + Number(r.cost_usd), 0);
  const spendWeek = (spendWeekRes.data ?? []).reduce((s, r) => s + Number(r.cost_usd), 0);
  const spendMonth = (spendMonthRes.data ?? []).reduce((s, r) => s + Number(r.cost_usd), 0);

  const perRole = roles.map(r => {
    const row = spendTodayRows.find(s => s.role_slug === r.slug);
    return {
      role_slug: r.slug,
      display_name: r.display_name,
      enabled: r.enabled,
      spent_today: row ? Number(row.cost_usd) : 0,
      daily_budget: Number(r.daily_budget_usd),
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{
        fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
        fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
        margin: 0, lineHeight: 1.1,
      }}>
        System
      </h1>

      <KillSwitchCard
        initialEnabled={state?.automation_enabled ?? false}
        lastTripReason={state?.last_trip_reason ?? null}
        lastTripAt={state?.last_trip_at ?? null}
        lastResumeReason={state?.last_resume_reason ?? null}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        <BudgetCard
          spendToday={spendToday}
          budgetToday={Number(state?.global_daily_budget_usd ?? 50)}
          spendThisWeek={spendWeek}
          spendThisMonth={spendMonth}
          perRole={perRole}
        />
        <LessonsCard
          capturedThisWeek={lessonsThisWeekRes.count ?? 0}
          proposedInQueue={lessonsProposedRes.count ?? 0}
          mergedLast30d={lessonsMergedRes.count ?? 0}
          rejectedLast30d={lessonsRejectedRes.count ?? 0}
        />
      </div>

      <AuditLogTable
        initialRows={(auditRowsRes.data ?? []) as never}
        totalCount={auditCountRes.count ?? 0}
      />

      <SettingsCard
        adminUid={uid}
        adminEmail={email}
        slackWebhooksConfigured={3}
        anthropicConfigured={true}
      />
    </div>
  );
}
