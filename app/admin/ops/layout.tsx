import { ReactNode } from 'react';
import { requireAdmin } from '@/lib/admin/auth';
import { adminSupabase } from '@/lib/admin/supabase';
import Sidebar from '@/components/admin/ops/Sidebar';

export const dynamic = 'force-dynamic';

export default async function OpsLayout({ children }: { children: ReactNode }) {
  const { email } = await requireAdmin();

  // Lightweight reads to seed sidebar badges/state. These run server-side on
  // every nav so we keep them cheap (no Anthropic call, simple Supabase counts).
  const sb = adminSupabase();
  const [{ data: state }, { count: approvalsCount }] = await Promise.all([
    sb.schema('ops').from('system_state').select('automation_enabled').eq('id', 'global').single(),
    sb.schema('ops').from('approvals').select('id', { count: 'exact', head: true }).eq('decision', 'pending'),
  ]);

  const killSwitchOn = state?.automation_enabled ?? false;

  return (
    <div style={{ minHeight: '100vh', background: '#F7F5F2', color: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid #2A2A2A', padding: '14px 32px', background: '#0F0F0F', color: '#F7F5F2' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 0.5,
          }}>
            OPERVO OPS<span style={{ color: '#F5620F' }}>.</span>
          </div>
          <div style={{ fontSize: 13, color: '#A0A0A0' }}>{email}</div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, maxWidth: 1400, width: '100%', margin: '0 auto' }}>
        <Sidebar approvalsCount={approvalsCount ?? 0} killSwitchOn={killSwitchOn} />
        <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
