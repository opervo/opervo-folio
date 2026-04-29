import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import InboxClient, { type Thread } from '@/components/admin/ops/inbox/InboxClient';

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  await requireAdmin();
  const sb = adminSupabase();

  const { data: threads } = await sb.schema('ops').from('conversations')
    .select('id, title, pinned_role_slug, created_at, updated_at, archived')
    .eq('archived', false)
    .order('updated_at', { ascending: false })
    .limit(100);

  // Last message snippet per thread (single query, then group client-side)
  const ids = (threads ?? []).map(t => t.id);
  let snippetByConv = new Map<string, { content: string; role: string; created_at: string }>();
  if (ids.length > 0) {
    const { data: lastMessages } = await sb.schema('ops').from('messages')
      .select('conversation_id, role, content, created_at')
      .in('conversation_id', ids)
      .order('created_at', { ascending: false });

    for (const m of lastMessages ?? []) {
      if (!snippetByConv.has(m.conversation_id)) {
        snippetByConv.set(m.conversation_id, { content: m.content, role: m.role, created_at: m.created_at });
      }
    }
  }

  const items: Thread[] = (threads ?? []).map(t => {
    const last = snippetByConv.get(t.id);
    return {
      id: t.id,
      title: t.title,
      pinned_role_slug: t.pinned_role_slug,
      created_at: t.created_at,
      updated_at: t.updated_at,
      last_message_snippet: last ? last.content.slice(0, 80) : null,
      last_message_role: last?.role ?? null,
      last_message_at: last?.created_at ?? null,
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
          Inbox
        </h1>
        <div style={{ marginTop: 4, color: '#6B6B6B', fontSize: 14 }}>
          Conversational threads with the system. Routing auto-picks the right role; you can pin a specific one if you prefer.
        </div>
      </div>

      <InboxClient initialThreads={items} />
    </div>
  );
}
