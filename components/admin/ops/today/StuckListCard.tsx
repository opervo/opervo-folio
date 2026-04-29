import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface StuckItem {
  stuck_kind: string;
  severity: 'info' | 'flag' | 'urgent';
  account_id: string;
  account_label: string;
  object_id: string;
  object_kind: string;
  object_summary: string;
  age_days: number;
  dollar_value: number | null;
  next_step_hint: string;
  first_surfaced: string | null;
}

interface StuckListCardProps {
  items: StuckItem[];
  scanned_at: string | null;
}

const SEVERITY_DOT: Record<StuckItem['severity'], string> = {
  urgent: '🔴',
  flag: '🟡',
  info: '⚪',
};

export default function StuckListCard({ items, scanned_at }: StuckListCardProps) {
  if (items.length === 0) {
    return (
      <Card title="Stuck List" badge="0 items" badgeColor="#1F8C4A">
        <div style={{ padding: '20px 0', textAlign: 'center', color: '#6B6B6B', fontSize: 14 }}>
          Nothing stuck. Good morning.
        </div>
      </Card>
    );
  }

  return (
    <Card title="Stuck List" badge={`${items.length} ${items.length === 1 ? 'item' : 'items'}`} badgeColor="#d94e08">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.slice(0, 8).map((item, i) => (
          <div
            key={`${item.object_kind}:${item.object_id}:${i}`}
            style={{
              display: 'flex',
              gap: 12,
              padding: '8px 12px',
              background: '#F7F5F2',
              borderRadius: 6,
              alignItems: 'center',
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 12 }}>{SEVERITY_DOT[item.severity]}</span>
            <div style={{ minWidth: 80, fontWeight: 600, fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16 }}>
              {item.dollar_value !== null ? `$${item.dollar_value.toFixed(0)}` : '—'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, color: '#1a1a1a' }}>{item.object_summary}</div>
              <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>
                {item.account_label}
                {item.first_surfaced && ` · first surfaced ${item.first_surfaced.slice(0, 10)}`}
              </div>
            </div>
            <Badge size="small" color={item.severity === 'urgent' ? 'red' : item.severity === 'flag' ? 'orange' : 'gray'}>
              {item.age_days}d
            </Badge>
          </div>
        ))}
      </div>

      {items.length > 8 && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#6B6B6B', textAlign: 'right' }}>
          +{items.length - 8} more
        </div>
      )}

      {scanned_at && (
        <div style={{ marginTop: 12, fontSize: 11, color: '#6B6B6B', textAlign: 'right' }}>
          Last scan: {new Date(scanned_at).toLocaleTimeString()}
        </div>
      )}
    </Card>
  );
}
