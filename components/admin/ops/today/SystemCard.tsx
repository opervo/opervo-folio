import Link from 'next/link';
import Card from '../ui/Card';

interface SystemCardProps {
  automationOn: boolean;
  spendToday: number;
  budgetToday: number;
  rolesEnabled: number;
  rolesTotal: number;
  lastTripAt: string | null;
}

export default function SystemCard({ automationOn, spendToday, budgetToday, rolesEnabled, rolesTotal, lastTripAt }: SystemCardProps) {
  const spendPct = budgetToday > 0 ? Math.min(100, (spendToday / budgetToday) * 100) : 0;

  return (
    <Card title="System">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Status">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: automationOn ? '#1F8C4A' : '#d94e08' }} />
            {automationOn ? 'Automation ON' : 'Halted'}
          </span>
        </Row>
        <Row label="Spend today">
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 16 }}>
            ${spendToday.toFixed(2)} / ${budgetToday.toFixed(2)}
          </span>
        </Row>
        <div style={{ height: 4, background: '#E8E4DE', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${spendPct}%`,
            background: spendPct < 50 ? '#1F8C4A' : spendPct < 80 ? '#F5620F' : '#d94e08',
          }} />
        </div>
        <Row label="Roles">{rolesEnabled} / {rolesTotal} enabled</Row>
        <Row label="Last trip">{lastTripAt ? new Date(lastTripAt).toLocaleDateString() : 'never'}</Row>
      </div>

      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E8E4DE' }}>
        <Link href="/admin/ops/system" style={{ fontSize: 13, color: '#F5620F', fontWeight: 600, textDecoration: 'none' }}>
          Open system →
        </Link>
      </div>
    </Card>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
      <span style={{ color: '#6B6B6B' }}>{label}</span>
      <span>{children}</span>
    </div>
  );
}
