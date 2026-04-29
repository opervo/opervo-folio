import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface RoleCardProps {
  slug: string;
  display_name: string;
  enabled: boolean;
  spec_version: string;
  description: string;
  customer_facing: boolean;
  todays_runs: number;
  todays_approved: number;
  approve_rate_pct: number | null;     // null when no data yet
  spend_today: number;
  budget_today: number;
  burn_in_remaining: number;
  graduation_eligible: boolean;
}

export default function RoleCard({
  slug, display_name, enabled, spec_version, description, customer_facing,
  todays_runs, todays_approved, approve_rate_pct, spend_today, budget_today,
  burn_in_remaining, graduation_eligible,
}: RoleCardProps) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 900,
          fontSize: 20,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          margin: 0,
          color: '#0F0F0F',
        }}>
          {display_name}
        </h3>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {customer_facing && <Badge color="orange" size="small">Customer-facing</Badge>}
          <Badge color={enabled ? 'green' : 'gray'} size="small">
            {enabled ? 'Enabled' : 'Disabled'}
          </Badge>
          <span style={{ fontSize: 11, color: '#9A9A9A' }}>v{spec_version}</span>
        </div>
      </div>

      <p style={{ color: '#6B6B6B', fontSize: 13, margin: 0, marginBottom: 16, lineHeight: 1.5 }}>
        {description}
      </p>

      {enabled ? (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12, marginBottom: 16, fontSize: 12,
        }}>
          <Metric label="Today's runs" value={todays_runs} />
          <Metric label="Approved" value={todays_approved} />
          <Metric
            label="Approve-as-is"
            value={approve_rate_pct === null ? '—' : `${(approve_rate_pct * 100).toFixed(0)}%`}
          />
          <Metric label="Spend today" value={`$${spend_today.toFixed(2)}/$${budget_today}`} />
        </div>
      ) : (
        <div style={{
          color: '#9A9A9A', fontSize: 12, fontStyle: 'italic', marginBottom: 16,
        }}>
          Awaiting activation. Enable to begin.
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#6B6B6B' }}>
        {burn_in_remaining > 0 ? (
          <Badge color="yellow" size="small">Burn-in: {burn_in_remaining} left</Badge>
        ) : (
          <Badge color="gray" size="small">Past burn-in</Badge>
        )}
        <Badge color={graduation_eligible ? 'blue' : 'gray'} size="small">
          {graduation_eligible ? 'Graduation eligible' : 'Never auto'}
        </Badge>
        <Link
          href={`/admin/ops/roles/${slug}`}
          style={{
            marginLeft: 'auto',
            color: '#F5620F',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Open →
        </Link>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: 0.3, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18 }}>
        {value}
      </div>
    </div>
  );
}
