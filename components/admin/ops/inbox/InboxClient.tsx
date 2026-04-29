'use client';

import { useState, useEffect, useTransition, useRef } from 'react';
import { opsApi } from '@/lib/admin/api-client';

export interface Thread {
  id: string;
  title: string;
  pinned_role_slug: string | null;
  created_at: string;
  updated_at: string;
  last_message_snippet: string | null;
  last_message_role: string | null;
  last_message_at: string | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  metadata: { routed_to?: string; tools_used?: string } | null;
  created_at: string;
  cost_usd: number | null;
}

const ROUTING_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'reporter', label: 'Reporter' },
  { value: 'stuck-list', label: 'Stuck List' },
  { value: 'engineering-ops', label: 'Engineering Ops' },
  { value: 'support-triage', label: 'Support Triage' },
  { value: 'billing-watch', label: 'Billing Watch' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'none', label: 'None (system meta)' },
];

const TOOL_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'operators', label: 'Operators' },
  { value: 'none', label: 'None' },
];

export default function InboxClient({ initialThreads }: { initialThreads: Thread[] }) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState<string | null>(initialThreads[0]?.id ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [composer, setComposer] = useState('');
  const [routing, setRouting] = useState<string>('auto');
  const [tools, setTools] = useState<string>('system');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages whenever active thread changes
  useEffect(() => {
    if (!activeId) { setMessages([]); return; }
    let cancelled = false;
    (async () => {
      try {
        const data = await opsApi<{ items: Message[] }>(`/api/inbox/messages?thread_id=${activeId}`);
        if (!cancelled) setMessages(data.items);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    })();
    return () => { cancelled = true; };
  }, [activeId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isPending]);

  function send() {
    const content = composer.trim();
    if (!content || !activeId) return;
    setError(null);
    setComposer('');

    // Optimistic user-message append
    const tempUserMsg: Message = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content,
      metadata: null,
      created_at: new Date().toISOString(),
      cost_usd: null,
    };
    setMessages(prev => [...prev, tempUserMsg]);

    startTransition(async () => {
      try {
        const result = await opsApi<{ user_message: Message; assistant_message: Message; routed_to: string }>(
          '/api/inbox/messages',
          {
            method: 'POST',
            body: { thread_id: activeId, content, routing, tools },
          }
        );
        // Replace optimistic with real, append assistant
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== tempUserMsg.id);
          return [...filtered, result.user_message, result.assistant_message];
        });
        // Refresh threads list (updated_at sort + last snippet changed)
        const t = await opsApi<{ items: Thread[] }>('/api/inbox/threads');
        setThreads(t.items);
      } catch (e) {
        setError((e as Error).message);
        setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id));
        setComposer(content);
      }
    });
  }

  async function newThread() {
    try {
      const created = await opsApi<Thread>('/api/inbox/threads', { method: 'POST', body: { title: 'New thread' } });
      setThreads(prev => [{ ...created, last_message_snippet: null, last_message_role: null, last_message_at: null }, ...prev]);
      setActiveId(created.id);
      setMessages([]);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function archive(threadId: string) {
    if (!confirm('Archive this thread?')) return;
    try {
      await opsApi('/api/inbox/threads', { method: 'PATCH', body: { id: threadId, archived: true } });
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (activeId === threadId) setActiveId(threads[0]?.id ?? null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 0,
      height: 'calc(100vh - 180px)',
      background: '#FFFFFF',
      border: '1px solid #E8E4DE',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Threads sidebar */}
      <aside style={{ borderRight: '1px solid #E8E4DE', overflowY: 'auto', background: '#F7F5F2' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #E8E4DE' }}>
          <button onClick={newThread} style={{
            width: '100%', background: '#F5620F', color: '#FFFFFF', border: 'none', borderRadius: 6,
            padding: '10px 14px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            + New thread
          </button>
        </div>

        {threads.length === 0 ? (
          <div style={{ padding: 16, color: '#6B6B6B', fontSize: 13, textAlign: 'center' }}>
            No threads yet.
          </div>
        ) : threads.map(t => (
          <div
            key={t.id}
            onClick={() => setActiveId(t.id)}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #E8E4DE',
              cursor: 'pointer',
              background: activeId === t.id ? '#FFFFFF' : 'transparent',
              borderLeft: activeId === t.id ? '3px solid #F5620F' : '3px solid transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                {t.title}
              </span>
              <button
                onClick={e => { e.stopPropagation(); archive(t.id); }}
                style={{ background: 'none', border: 'none', color: '#9A9A9A', cursor: 'pointer', fontSize: 14, padding: '2px 4px' }}
                title="Archive"
              >
                ×
              </button>
            </div>
            {t.last_message_snippet && (
              <div style={{ color: '#6B6B6B', fontSize: 11, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.last_message_role === 'user' ? '> ' : ''}{t.last_message_snippet}
              </div>
            )}
            {t.last_message_at && (
              <div style={{ color: '#9A9A9A', fontSize: 10, marginTop: 2 }}>
                {relativeTime(t.last_message_at)}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Main message panel */}
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {!activeId ? (
          <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: '#6B6B6B', fontSize: 14 }}>
            Select a thread or create a new one to start.
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#F7F5F2' }}>
              {messages.length === 0 && !isPending && (
                <div style={{ color: '#6B6B6B', fontSize: 13, textAlign: 'center', padding: 40 }}>
                  Empty thread. Try: <em>"morning brief"</em> or <em>"what's stuck right now"</em>
                </div>
              )}
              {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              {isPending && (
                <div style={{
                  background: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 12,
                  color: '#6B6B6B', fontStyle: 'italic', fontSize: 13,
                }}>
                  Routing to {routing === 'auto' ? 'auto' : routing}...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div style={{ padding: 12, background: '#FEE2E2', color: '#B91C1C', fontSize: 13 }}>
                {error}
                <button onClick={() => setError(null)} style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </div>
            )}

            <div style={{ borderTop: '1px solid #E8E4DE', padding: 16, background: '#FFFFFF' }}>
              <textarea
                value={composer}
                onChange={e => setComposer(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); }
                }}
                placeholder="Type a message... (⌘+Enter to send)"
                rows={3}
                disabled={isPending}
                style={{
                  width: '100%', padding: 10, border: '1px solid #E8E4DE',
                  borderRadius: 6, fontFamily: 'inherit', fontSize: 14, resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}>
                <select value={routing} onChange={e => setRouting(e.target.value)} style={selectStyle} disabled={isPending}>
                  {ROUTING_OPTIONS.map(o => <option key={o.value} value={o.value}>Route: {o.label}</option>)}
                </select>
                <select value={tools} onChange={e => setTools(e.target.value)} style={selectStyle} disabled={isPending}>
                  {TOOL_OPTIONS.map(o => <option key={o.value} value={o.value}>Tools: {o.label}</option>)}
                </select>
                <button
                  onClick={send}
                  disabled={isPending || !composer.trim()}
                  style={{
                    marginLeft: 'auto',
                    background: isPending || !composer.trim() ? '#9A9A9A' : '#F5620F',
                    color: '#FFFFFF', border: 'none', borderRadius: 6,
                    padding: '8px 18px', fontWeight: 600, fontSize: 13,
                    cursor: isPending || !composer.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isPending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 12,
    }}>
      <div style={{
        maxWidth: '75%',
        background: isUser ? '#0F0F0F' : '#FFFFFF',
        color: isUser ? '#F7F5F2' : '#1a1a1a',
        padding: '12px 16px',
        borderRadius: 12,
        fontSize: 14,
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        border: isUser ? 'none' : '1px solid #E8E4DE',
      }}>
        {msg.content}
      </div>
      <div style={{ fontSize: 10, color: '#9A9A9A', marginTop: 4, padding: '0 4px' }}>
        {!isUser && msg.metadata?.routed_to && (
          <span style={{ marginRight: 8 }}>routed → {msg.metadata.routed_to}</span>
        )}
        <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
        {msg.cost_usd !== null && msg.cost_usd > 0 && (
          <span style={{ marginLeft: 8 }}>${Number(msg.cost_usd).toFixed(4)}</span>
        )}
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid #E8E4DE',
  borderRadius: 6,
  background: '#FFFFFF',
  fontSize: 12,
  cursor: 'pointer',
};

function relativeTime(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (60 * 24))}d ago`;
}
