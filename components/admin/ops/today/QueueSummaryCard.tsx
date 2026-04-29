import Link from 'next/link';
import Card from '../ui/Card';
import Stat from '../ui/Stat';

interface QueueSummaryCardProps {
  total: number;
  newSinceMorning: number;
  customerFacing: number;
  internal: number;
}

export default function QueueSummaryCard({ total, newSinceMorning, customerFacing, internal }: QueueSummaryCardProps) {
  return (
    <Card title="Your Queue" emphasis={total > 0}>
      <div style={{ marginBottom: 12 }}>
        <Stat label={total === 1 ? 'Item waiting' : 'Items waiting'} value={total} size="large" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        <Stat label="New since 6am" value={newSinceMorning} size="small" />
        <Stat label="Customer-facing" value={customerFacing} size="small" />
        <Stat label="Internal" value={internal} size="small" />
      </div>

      <Link
        href="/admin/ops/queue"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: total > 0 ? '#F5620F' : '#0F0F0F',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {total > 0 ? `Process queue →` : 'No items — open queue →'}
      </Link>
    </Card>
  );
}
