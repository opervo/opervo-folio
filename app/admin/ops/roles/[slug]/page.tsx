import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import Card from '@/components/admin/ops/ui/Card';
import Badge from '@/components/admin/ops/ui/Badge';
import Stat from '@/components/admin/ops/ui/Stat';
import RoleEnableToggle from '@/components/admin/ops/roles/RoleEnableToggle';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoleDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { slug } = await params;
  const sb = adminSupabase();

  const { data: role } = await sb.schema('ops').from('role_registry').select('*').eq('slug', slug).maybeSingle();
  if (!role) notFound();

  const monthStart = new Date(Date.now() - 30 * 86400000).toISOString();

  const [
    { data: taskTypes },
    { data: monthTasks },
    { data: monthApprovals },
    { data: monthLessons },
    { data: monthSpend },
    { count: autoTripCount },
  ] = await Promise.all([
    sb.schema('ops').from('task_types').select('task_type, permission_tier, graduation_eligible').eq('role_slug', slug),
    sb.schema('ops').from('tasks').select('id, task_type, status, created_at').eq('role_slug', slug).gte('created_at', monthStart),
    sb.schema('ops').from('approvals').select('decision, decided_at, created_at, task:tasks!inner(task_type)').gte('created_at', monthStart).eq('task.role_slug', slug),
    sb.schema('ops').from('lessons').select('id, task_type, status, diff_summary, created_at').eq('role_slug', slug).gte('created_at', monthStart),
    sb.schema('ops').from('budget_ledger').select('cost_usd, task_count, date').eq('role_slug', slug).gte('date', monthStart.slice(0, 10)),
    sb.schema('ops').from('audit_log').select('id', { count: 'exact', head: true }).eq('role_slug', slug).eq('phase', 'auto_trip').gte('created_at', monthStart),
  ]);

  const taskTypeStats = (taskTypes ?? []).map(tt => {
    const tasks = (monthTasks ?? []).filter(t => t.task_type === tt.task_type);
    const taskIds = tasks.map(t => t.id);
    const approvals = ((monthApprovals ?? []) as Array<{ decision: string; task?: { task_type: string } | { task_type: string }[] }>).filter(a => {
      const t = Array.isArray(a.task) ? a.task[0] : a.task;
      return t?.task_type === tt.task_type;
    });
    const approved = approvals.filter(a => a.decision === 'approved').length;
    const edited = approvals.filter(a => a.decision === 'edited_and_approved').length;
    const rejected = approvals.filter(a => a.decision === 'rejected').length;
    return {
      task_type: tt.task_type,
      permission_tier: tt.permission_tier,
      graduation_eligible: tt.graduation_eligible,
      total: tasks.length,
      approved, edited, rejected,
      approve_pct: tasks.length > 0 ? approved / tasks.length : 0,
    };
  });

  const monthSpendTotal = (monthSpend ?? []).reduce((s, r) => s + Number(r.cost_usd), 0);
  const monthRunsTotal = (monthSpend ?? []).reduce((s, r) => s + (r.task_count as number), 0);
  const recentLessons = (monthLessons ?? []).slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Link href="/admin/ops/roles" style={{ color: '#6B6B6B', fontSize: 13, textDecoration: 'none' }}>
          ← Back to roles
        </Link>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
            margin: 0, lineHeight: 1.1,
          }}>
            {role.display_name}
          </h1>
          <Badge color={role.enabled ? 'green' : 'gray'}>
            {role.enabled ? 'Enabled' : 'Disabled'}
          </Badge>
          <span style={{ color: '#6B6B6B', fontSize: 13 }}>v{role.spec_version}</span>
        </div>
      </div>

      <Card title="Performance — last 30 days">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <Stat label="Total runs" value={monthRunsTotal} />
          <Stat label="Spend" value={`$${monthSpendTotal.toFixed(2)}`} />
          <Stat label="Auto-trips" value={autoTripCount ?? 0} delta={autoTripCount && autoTripCount > 0 ? 'investigate' : 'clean'} deltaColor={autoTripCount && autoTripCount > 0 ? 'negative' : 'positive'} />
          <Stat label="Lessons captured" value={(monthLessons ?? []).length} />
        </div>

        <div style={{ fontSize: 11, color: '#6B6B6B', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>
          Per task type
        </div>
        {taskTypeStats.map(s => (
          <div key={s.task_type} style={{
            display: 'grid', gridTemplateColumns: '1fr auto auto auto auto auto',
            gap: 16, padding: '10px 0', borderBottom: '1px solid #F0EDE8',
            fontSize: 13, alignItems: 'center',
          }}>
            <div>
              <span style={{ fontWeight: 600 }}>{s.task_type}</span>
              <div style={{ marginTop: 4, display: 'flex', gap: 6 }}>
                <Badge size="small" color={s.permission_tier === 'autonomous' ? 'blue' : 'gray'}>
                  {s.permission_tier}
                </Badge>
                {s.graduation_eligible && <Badge size="small" color="yellow">Eligible</Badge>}
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#6B6B6B' }}>{s.total} runs</span>
            <span style={{ fontSize: 12, color: '#1F8C4A' }}>{s.approved} approved</span>
            <span style={{ fontSize: 12, color: '#F5620F' }}>{s.edited} edited</span>
            <span style={{ fontSize: 12, color: '#d94e08' }}>{s.rejected} rejected</span>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, minWidth: 50, textAlign: 'right' }}>
              {s.total > 0 ? `${(s.approve_pct * 100).toFixed(0)}%` : '—'}
            </span>
          </div>
        ))}
      </Card>

      {recentLessons.length > 0 && (
        <Card title="Recent lessons">
          {recentLessons.map(l => (
            <div key={l.id} style={{
              padding: '8px 0', fontSize: 13, borderBottom: '1px solid #F0EDE8',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600 }}>{l.task_type}</span>
                <span style={{ marginLeft: 8, color: '#6B6B6B' }}>{l.diff_summary}</span>
              </div>
              <Badge size="small" color={l.status === 'merged' ? 'green' : l.status === 'proposed' ? 'orange' : l.status === 'rejected' ? 'red' : 'gray'}>
                {l.status}
              </Badge>
            </div>
          ))}
        </Card>
      )}

      <Card title="Settings">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Role enabled</div>
            <div style={{ color: '#6B6B6B', fontSize: 12, marginTop: 2 }}>
              When disabled, queued tasks for this role are cancelled and no new tasks are accepted.
            </div>
          </div>
          <RoleEnableToggle slug={role.slug} initialEnabled={role.enabled} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #F0EDE8' }}>
          <span style={{ color: '#6B6B6B', fontSize: 13 }}>Daily budget</span>
          <span style={{ fontWeight: 600 }}>${role.daily_budget_usd}/day</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #F0EDE8' }}>
          <span style={{ color: '#6B6B6B', fontSize: 13 }}>Burn-in remaining</span>
          <span>{role.burn_in_remaining} forced-approval tasks</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #F0EDE8' }}>
          <span style={{ color: '#6B6B6B', fontSize: 13 }}>Spec source</span>
          <a
            href={`https://github.com/opervo/opervo-ops/blob/main/roles/${role.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#F5620F', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
          >
            opervo-ops/roles/{role.slug}.md →
          </a>
        </div>
      </Card>
    </div>
  );
}
