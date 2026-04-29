import { requireAdmin } from '@/lib/admin/auth';
import { adminSupabase } from '@/lib/admin/supabase';
import QueueClient from '@/components/admin/ops/queue/QueueClient';
import type { QueueItem } from '@/lib/admin/api-client';

export const dynamic = 'force-dynamic';

export default async function QueuePage() {
  await requireAdmin();
  const sb = adminSupabase();

  // Mirror what /api/queue/list does, but server-side directly via Supabase
  // (skips the fetch hop on the initial render). Client-side mutations
  // still go through the orchestrator's /api/queue/* endpoints.
  const { data: approvals } = await sb.schema('ops').from('approvals')
    .select(`
      id, task_id, proposed_action, rationale, decision, created_at, expires_at,
      task:tasks!inner ( id, role_slug, task_type, inputs, outputs, status, created_at )
    `)
    .eq('decision', 'pending')
    .order('created_at', { ascending: true })
    ;

  // Permission tier lookup
  const taskTypePairs = Array.from(new Set((approvals ?? [])
    .map(a => {
      const t = Array.isArray(a.task) ? a.task[0] : a.task;
      return t ? `${t.role_slug}:${t.task_type}` : null;
    })
    .filter(Boolean) as string[]));

  const { data: taskTypeRows } = await sb.schema('ops').from('task_types')
    .select('role_slug, task_type, permission_tier')
    ;

  const tierMap = new Map<string, string>();
  for (const r of taskTypeRows ?? []) {
    tierMap.set(`${r.role_slug}:${r.task_type}`, r.permission_tier as string);
  }

  const items: QueueItem[] = (approvals ?? []).map(a => {
    const task = Array.isArray(a.task) ? a.task[0]! : a.task!;
    const proposedAction = a.proposed_action as { side_effects?: Array<{ kind: string; to?: string }> } | null;
    const isCustomerFacing = !!proposedAction?.side_effects?.some(
      e => e.kind === 'send_email' && e.to && !e.to.endsWith('@opervo.io')
    );

    return {
      id: a.id,
      task_id: a.task_id,
      proposed_action: (a.proposed_action ?? { side_effects: [] }) as { side_effects: unknown[] },
      rationale: a.rationale,
      created_at: a.created_at,
      expires_at: a.expires_at,
      permission_tier: tierMap.get(`${task.role_slug}:${task.task_type}`) ?? 'approval_required',
      is_customer_facing: isCustomerFacing,
      task: {
        id: task.id, role_slug: task.role_slug, task_type: task.task_type,
        inputs: task.inputs, outputs: task.outputs,
      },
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
          fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
          margin: 0, lineHeight: 1.1,
        }}>
          Queue
        </h1>
        <div style={{ marginTop: 4, color: '#6B6B6B', fontSize: 14 }}>
          {items.length === 0 ? 'Nothing waiting' : `${items.length} ${items.length === 1 ? 'item' : 'items'} waiting`}
        </div>
      </div>

      <QueueClient initialItems={items} />
    </div>
  );
}
