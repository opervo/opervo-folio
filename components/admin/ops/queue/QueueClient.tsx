'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { opsApi, type QueueItem } from '@/lib/admin/api-client';

interface QueueClientProps {
  initialItems: QueueItem[];
}

interface SideEffect {
  kind: string;
  to?: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  channel?: string;
  ticket_id?: string;
  tags?: string[];
  note?: string;
}

export default function QueueClient({ initialItems }: QueueClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<'all' | 'customer_facing' | 'internal'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = items.filter(i => {
    if (filter === 'all') return true;
    if (filter === 'customer_facing') return i.is_customer_facing;
    return !i.is_customer_facing;
  });

  function removeFromList(approvalId: string) {
    setItems(prev => prev.filter(i => i.id !== approvalId));
  }

  if (items.length === 0) {
    return (
      <div style={{
        background: '#FFFFFF', border: '1px dashed #E8E4DE', borderRadius: 12,
        padding: 60, textAlign: 'center', color: '#6B6B6B',
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 22, color: '#1a1a1a', textTransform: 'uppercase' }}>
          All caught up
        </div>
        <div style={{ fontSize: 14, marginTop: 8 }}>Nothing waiting for you.</div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: 12, borderRadius: 8, fontSize: 13 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 13 }}>
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({items.length})
        </FilterChip>
        <FilterChip active={filter === 'customer_facing'} onClick={() => setFilter('customer_facing')}>
          Customer-facing ({items.filter(i => i.is_customer_facing).length})
        </FilterChip>
        <FilterChip active={filter === 'internal'} onClick={() => setFilter('internal')}>
          Internal ({items.filter(i => !i.is_customer_facing).length})
        </FilterChip>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(item => (
          <ApprovalCard
            key={item.id}
            item={item}
            onApproved={() => { removeFromList(item.id); router.refresh(); }}
            onEdit={() => setEditingId(item.id)}
            onReject={() => setRejectingId(item.id)}
            onError={setError}
          />
        ))}
      </div>

      {editingId && (
        <EditModal
          item={items.find(i => i.id === editingId)!}
          onClose={() => setEditingId(null)}
          onApproved={() => { removeFromList(editingId); setEditingId(null); router.refresh(); }}
          onError={setError}
        />
      )}

      {rejectingId && (
        <RejectModal
          item={items.find(i => i.id === rejectingId)!}
          onClose={() => setRejectingId(null)}
          onRejected={() => { removeFromList(rejectingId); setRejectingId(null); router.refresh(); }}
          onError={setError}
        />
      )}
    </>
  );
}

// --- ApprovalCard ---

function ApprovalCard({
  item, onApproved, onEdit, onReject, onError,
}: {
  item: QueueItem;
  onApproved: () => void;
  onEdit: () => void;
  onReject: () => void;
  onError: (e: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [hoverStart, setHoverStart] = useState<number | null>(null);
  const [readyToApprove, setReadyToApprove] = useState(!item.is_customer_facing);

  const sideEffects = (item.proposed_action.side_effects ?? []) as SideEffect[];
  const emailEffect = sideEffects.find(e => e.kind === 'send_email');
  const slackEffect = sideEffects.find(e => e.kind === 'post_slack');

  function approve() {
    if (!readyToApprove) return;
    startTransition(async () => {
      try {
        await opsApi('/api/queue/approve', { method: 'POST', body: { approval_id: item.id } });
        onApproved();
      } catch (e) {
        onError((e as Error).message);
      }
    });
  }

  // Customer-facing 30-second mandatory dwell: hovering Approve button
  function handleHoverEnter() {
    if (item.is_customer_facing && !readyToApprove) {
      setHoverStart(Date.now());
      setTimeout(() => {
        setReadyToApprove(true);
      }, 30_000);
    }
  }

  return (
    <Card emphasis={item.is_customer_facing}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
          fontSize: 18, textTransform: 'uppercase', letterSpacing: 0.5,
          margin: 0, color: '#0F0F0F',
        }}>
          {item.task.role_slug} · {item.task.task_type}
        </h3>
        <Badge color={item.is_customer_facing ? 'orange' : 'gray'} size="small">
          {item.is_customer_facing ? 'Customer-facing' : 'Internal'}
        </Badge>
      </div>

      {emailEffect && (
        <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 12 }}>
          to: {emailEffect.to} · from: {emailEffect.from}
        </div>
      )}

      {emailEffect && (
        <div style={{
          background: '#F7F5F2',
          border: '1px solid #E8E4DE',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          fontSize: 13,
        }}>
          {emailEffect.subject && (
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Subject: {emailEffect.subject}
            </div>
          )}
          <div style={{ fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap', maxHeight: 240, overflow: 'auto' }}>
            {emailEffect.text}
          </div>
        </div>
      )}

      {slackEffect && (
        <div style={{ background: '#F7F5F2', padding: 12, borderRadius: 6, marginBottom: 12, fontSize: 13 }}>
          <div style={{ fontSize: 11, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 4 }}>
            Slack post
          </div>
          {slackEffect.text}
        </div>
      )}

      {item.rationale && (
        <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16, lineHeight: 1.5 }}>
          <span style={{ fontWeight: 600 }}>Why:</span> {item.rationale}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={approve}
          onMouseEnter={handleHoverEnter}
          disabled={isPending || !readyToApprove}
          style={{
            background: readyToApprove ? '#1F8C4A' : '#9DC1AB',
            color: '#FFFFFF', border: 'none', borderRadius: 6,
            padding: '10px 18px', fontWeight: 600, fontSize: 13,
            cursor: isPending || !readyToApprove ? 'wait' : 'pointer',
          }}
        >
          {isPending ? 'Sending…' : readyToApprove ? '✓ Approve' : '⏳ Read first…'}
        </button>
        <button
          onClick={onEdit}
          disabled={isPending}
          style={{
            background: '#0F0F0F', color: '#FFFFFF', border: 'none',
            borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          ✎ Edit
        </button>
        <button
          onClick={onReject}
          disabled={isPending}
          style={{
            background: 'none', color: '#d94e08', border: '1px solid #E8E4DE',
            borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          ✗ Reject
        </button>

        {item.is_customer_facing && !readyToApprove && hoverStart !== null && (
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6B6B6B', alignSelf: 'center' }}>
            30s read pause active
          </span>
        )}
      </div>
    </Card>
  );
}

// --- EditModal ---

function EditModal({
  item, onClose, onApproved, onError,
}: {
  item: QueueItem;
  onClose: () => void;
  onApproved: () => void;
  onError: (e: string) => void;
}) {
  const sideEffects = (item.proposed_action.side_effects ?? []) as SideEffect[];
  const emailEffect = sideEffects.find(e => e.kind === 'send_email');

  const [subject, setSubject] = useState(emailEffect?.subject ?? '');
  const [text, setText] = useState(emailEffect?.text ?? '');
  const [isPending, startTransition] = useTransition();

  function approveEdited() {
    startTransition(async () => {
      try {
        const editedEffects = sideEffects.map(e => {
          if (e.kind === 'send_email') {
            return { ...e, subject, text, html: `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!))}</pre>` };
          }
          return e;
        });

        await opsApi('/api/queue/approve', {
          method: 'POST',
          body: { approval_id: item.id, edited_action: { side_effects: editedEffects } },
        });
        onApproved();
      } catch (e) {
        onError((e as Error).message);
      }
    });
  }

  return (
    <ModalShell title="Edit & approve" onClose={onClose}>
      <div style={{ marginBottom: 16 }}>
        <Label>Subject</Label>
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Label>Body</Label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={16}
          style={{ ...inputStyle, fontFamily: 'ui-monospace, monospace', fontSize: 13 }}
          autoFocus
        />
      </div>
      <div style={{ fontSize: 11, color: '#6B6B6B', marginBottom: 16 }}>
        Changes are captured to ops.lessons for the weekly review.
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={onClose} disabled={isPending} style={cancelButton}>Cancel</button>
        <button onClick={approveEdited} disabled={isPending} style={approveButton}>
          {isPending ? 'Sending…' : 'Approve & send'}
        </button>
      </div>
    </ModalShell>
  );
}

// --- RejectModal ---

function RejectModal({
  item, onClose, onRejected, onError,
}: {
  item: QueueItem;
  onClose: () => void;
  onRejected: () => void;
  onError: (e: string) => void;
}) {
  const [reason, setReason] = useState('');
  const [isPending, startTransition] = useTransition();
  const [pauseSuggestion, setPauseSuggestion] = useState<string | null>(null);

  function reject() {
    startTransition(async () => {
      try {
        const result = await opsApi<{ suggest_pause: boolean; message: string | null }>(
          '/api/queue/reject',
          { method: 'POST', body: { approval_id: item.id, reason } }
        );
        if (result.suggest_pause && result.message) {
          setPauseSuggestion(result.message);
          // Stay open for the user to read; remove from list still
          setTimeout(onRejected, 4_000);
          return;
        }
        onRejected();
      } catch (e) {
        onError((e as Error).message);
      }
    });
  }

  return (
    <ModalShell title="Reject" onClose={onClose}>
      <Label>Reason (optional but useful for the lessons review)</Label>
      <textarea
        value={reason}
        onChange={e => setReason(e.target.value)}
        rows={4}
        style={inputStyle}
        placeholder="What's wrong with this draft?"
        autoFocus
      />
      {pauseSuggestion && (
        <div style={{
          background: '#FEE7DA', border: '1px solid #F5620F',
          borderRadius: 8, padding: 12, marginTop: 12, fontSize: 13,
        }}>
          {pauseSuggestion}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
        <button onClick={onClose} disabled={isPending} style={cancelButton}>Cancel</button>
        <button onClick={reject} disabled={isPending} style={{ ...approveButton, background: '#d94e08' }}>
          {isPending ? 'Rejecting…' : 'Reject'}
        </button>
      </div>
    </ModalShell>
  );
}

// --- Shared ---

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'grid', placeItems: 'center', zIndex: 100,
    }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: '#FFFFFF', borderRadius: 12, padding: 32,
        maxWidth: 720, width: '90%', maxHeight: '90vh', overflow: 'auto',
      }}>
        <h2 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 24,
          margin: '0 0 16px', textTransform: 'uppercase',
        }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      background: active ? '#0F0F0F' : '#FFFFFF',
      color: active ? '#FFFFFF' : '#1a1a1a',
      border: `1px solid ${active ? '#0F0F0F' : '#E8E4DE'}`,
      borderRadius: 999, padding: '6px 14px',
      fontSize: 13, fontWeight: 500, cursor: 'pointer',
    }}>{children}</button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{
    fontSize: 11, fontWeight: 600, color: '#6B6B6B',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6,
  }}>{children}</div>;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: 10, border: '1px solid #E8E4DE',
  borderRadius: 6, fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box',
};
const approveButton: React.CSSProperties = {
  background: '#1F8C4A', color: '#FFFFFF', border: 'none',
  borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 14, cursor: 'pointer',
};
const cancelButton: React.CSSProperties = {
  background: 'none', border: '1px solid #E8E4DE',
  borderRadius: 6, padding: '10px 18px', fontWeight: 600, fontSize: 14, cursor: 'pointer',
};
