import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import RoleCard from '@/components/admin/ops/roles/RoleCard';

export const dynamic = 'force-dynamic';

const ROLE_DESCRIPTIONS: Record<string, { description: string; customer_facing: boolean }> = {
  'reporter': {
    description: 'Daily/weekly digests, lessons review, monthly performance evals. Read-only. Internal-only outputs.',
    customer_facing: false,
  },
  'stuck-list': {
    description: 'Daily passive scan for items losing money to time. Read-only. No drafts.',
    customer_facing: false,
  },
  'engineering-ops': {
    description: 'Hourly health scan, daily error digest, Sentry triage, log explanation. Read-only API integrations.',
    customer_facing: false,
  },
  'support-triage': {
    description: 'First read of every help@opervo.io message. Drafts customer replies for approval. Never graduates.',
    customer_facing: true,
  },
  'billing-watch': {
    description: 'Stripe reconciliation, payment-failure investigation, anomaly scans. Read-only Stripe.',
    customer_facing: false,
  },
  'onboarding': {
    description: 'New signup intake, milestone touches, activation pulse. Drafts customer touches for approval.',
    customer_facing: true,
  },
};

export default async function RolesPage() {
  await requireAdmin();
  const sb = adminSupabase();
  const today = new Date().toISOString().slice(0, 10);
  const todayIso = `${today}T00:00:00Z`;

  const [{ data: roles }, { data: tasksToday }, { data: spendToday }, { data: approvalsToday }] = await Promise.all([
    sb.schema('ops').from('role_registry').select('*').order('slug'),
    sb.schema('ops').from('tasks').select('id, role_slug, status').gte('created_at', todayIso),
    sb.schema('ops').from('budget_ledger').select('cost_usd, role_slug').eq('date', today),
    sb.schema('ops').from('approvals').select('id, decision, task:tasks(role_slug)').gte('created_at', todayIso),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
          fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
          margin: 0, lineHeight: 1.1,
        }}>
          Your Team
        </h1>
        <div style={{ marginTop: 4, color: '#6B6B6B', fontSize: 14 }}>
          {roles?.length ?? 0} roles · {(roles ?? []).filter(r => r.enabled).length} enabled
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 24 }}>
        {(roles ?? []).map(role => {
          const meta = ROLE_DESCRIPTIONS[role.slug] ?? { description: '', customer_facing: false };
          const todaysTasks = (tasksToday ?? []).filter(t => t.role_slug === role.slug);
          const todaysApproved = ((approvalsToday ?? []) as Array<{ decision: string; task?: { role_slug: string } | { role_slug: string }[] }>)
            .filter(a => {
              const t = Array.isArray(a.task) ? a.task[0] : a.task;
              return t?.role_slug === role.slug && (a.decision === 'approved' || a.decision === 'edited_and_approved');
            }).length;
          const spend = Number((spendToday ?? []).find(s => s.role_slug === role.slug)?.cost_usd ?? 0);
          const total = todaysTasks.length;
          const approveRate = total > 0 ? todaysApproved / total : null;

          return (
            <RoleCard
              key={role.slug}
              slug={role.slug}
              display_name={role.display_name}
              enabled={role.enabled}
              spec_version={role.spec_version}
              description={meta.description}
              customer_facing={meta.customer_facing}
              todays_runs={total}
              todays_approved={todaysApproved}
              approve_rate_pct={approveRate}
              spend_today={spend}
              budget_today={Number(role.daily_budget_usd)}
              burn_in_remaining={role.burn_in_remaining}
              graduation_eligible={role.graduation_eligible}
            />
          );
        })}
      </div>
    </div>
  );
}
