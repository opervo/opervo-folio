'use client';

import { useState, useTransition } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Card from '../ui/Card';

interface Props {
  initialEnabled: boolean;
  lastTripReason: string | null;
  lastTripAt: string | null;
  lastResumeReason: string | null;
}

export default function KillSwitchCard({ initialEnabled, lastTripReason, lastTripAt }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sb = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const action = enabled ? 'Halt' : 'Resume';
  const isResume = !enabled;
  const tripped = !enabled && lastTripReason;

  async function flip() {
    setError(null);
    if (!reason.trim()) {
      setError('Reason is required.');
      return;
    }
    if (isResume && tripped && reason.trim().length < 10) {
      setError('Resume after auto-trip requires a clear reason (≥10 chars).');
      return;
    }

    startTransition(async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        setError('Not authenticated.');
        return;
      }

      const next = !enabled;
      const updates = next
        ? { automation_enabled: true, last_resume_reason: reason, last_resume_at: new Date().toISOString(), updated_by: user.id }
        : { automation_enabled: false, last_trip_reason: `manual: ${reason}`, last_trip_at: new Date().toISOString(), updated_by: user.id };

      const { error: updateError } = await sb.schema('ops').from('system_state')
        .update(updates)
        .eq('id', 'global')
        ;

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setEnabled(next);
      setShowModal(false);
      setReason('');
      // Force a reload so the layout re-runs and propagates the new state
      // to the sidebar killSwitch indicator.
      window.location.reload();
    });
  }

  const buttonColor = enabled ? '#d94e08' : '#1A6BF0';
  const buttonLabel = enabled ? 'HALT ALL AUTOMATION' : 'RESUME AUTOMATION';

  return (
    <>
      <Card title="Kill Switch" emphasis={!enabled}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: enabled ? '#1F8C4A' : '#d94e08', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: enabled ? '#1F8C4A' : '#d94e08' }} />
              {enabled ? 'Automation ON' : 'Halted'}
            </div>
            <div style={{ color: '#6B6B6B', fontSize: 13, marginTop: 6 }}>
              {enabled
                ? 'All tasks pull through the orchestrator.'
                : tripped
                ? `Auto-tripped ${lastTripAt ? new Date(lastTripAt).toLocaleString() : ''} — ${lastTripReason}`
                : 'Manually halted. No tasks will execute.'}
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={isPending}
            style={{
              background: buttonColor, color: '#FFFFFF', border: 'none', borderRadius: 8,
              padding: '14px 24px', fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 14, letterSpacing: 0.5, textTransform: 'uppercase',
              cursor: isPending ? 'wait' : 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {buttonLabel}
          </button>
        </div>
      </Card>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 100 }}>
          <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 32, maxWidth: 480, width: '90%' }}>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 24,
              margin: 0, textTransform: 'uppercase',
            }}>
              {action} automation?
            </h2>
            {tripped && isResume && (
              <div style={{ background: '#FEE7DA', border: '1px solid #F5620F', borderRadius: 8, padding: 12, fontSize: 13, marginTop: 12 }}>
                <strong>Last trip reason:</strong> {lastTripReason}
                <br />
                Type a clear acknowledgement of what was fixed (≥10 chars). This is recorded.
              </div>
            )}
            <label style={{ display: 'block', marginTop: 16, fontSize: 13, color: '#6B6B6B', fontWeight: 600 }}>
              Reason (required)
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              style={{ width: '100%', marginTop: 4, padding: 10, border: '1px solid #E8E4DE', borderRadius: 6, fontFamily: 'inherit', fontSize: 14 }}
              placeholder={isResume ? 'e.g. fixed budget cap; verified Reporter handler' : 'e.g. testing rollback path'}
              autoFocus
            />
            {error && <div style={{ color: '#d94e08', fontSize: 13, marginTop: 8 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowModal(false); setReason(''); setError(null); }} disabled={isPending}
                style={{ background: 'none', border: '1px solid #E8E4DE', borderRadius: 8, padding: '10px 18px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={flip} disabled={isPending}
                style={{ background: buttonColor, color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, cursor: 'pointer' }}>
                {isPending ? 'Working...' : `Confirm ${action}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
