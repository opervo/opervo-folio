import Card from '../ui/Card';
import Stat from '../ui/Stat';

interface DayMetrics {
  signups: number;
  paying: number;
  revenue_usd: number;
  jobs_created: number;
  jobs_completed: number;
  invoices_sent: number;
  invoices_paid: number;
}

interface Anomaly {
  metric: string;
  observed: number;
  baseline: number;
  delta_pct: number;
}

interface YesterdayCardProps {
  date: string;
  metrics: DayMetrics;
  prior?: DayMetrics;
  anomalies: Anomaly[];
}

export default function YesterdayCard({ date, metrics, prior, anomalies }: YesterdayCardProps) {
  const delta = (cur: number, p?: number): { text: string; color: 'positive' | 'negative' | 'neutral' } | undefined => {
    if (p === undefined) return undefined;
    const d = cur - p;
    if (d === 0) return { text: '—', color: 'neutral' };
    return {
      text: `${d > 0 ? '+' : ''}${d} vs prior week`,
      color: d > 0 ? 'positive' : 'negative',
    };
  };

  return (
    <Card title={`Yesterday — ${date}`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <Stat label="Signups" value={metrics.signups} delta={delta(metrics.signups, prior?.signups)?.text} deltaColor={delta(metrics.signups, prior?.signups)?.color} />
        <Stat label="Paying" value={metrics.paying} delta={delta(metrics.paying, prior?.paying)?.text} deltaColor={delta(metrics.paying, prior?.paying)?.color} />
        <Stat label="Revenue" value={`$${metrics.revenue_usd.toFixed(2)}`} delta={prior ? `prior $${prior.revenue_usd.toFixed(2)}` : undefined} />
        <Stat label="Jobs done" value={metrics.jobs_completed} delta={delta(metrics.jobs_completed, prior?.jobs_completed)?.text} deltaColor={delta(metrics.jobs_completed, prior?.jobs_completed)?.color} />
        <Stat label="Jobs created" value={metrics.jobs_created} size="small" />
        <Stat label="Invoices sent" value={metrics.invoices_sent} size="small" />
        <Stat label="Invoices paid" value={metrics.invoices_paid} size="small" />
        <Stat label="" value="" size="small" />
      </div>

      {anomalies.length > 0 ? (
        <div style={{
          background: '#FEE7DA',
          border: '1px solid #F5620F',
          borderRadius: 8,
          padding: 12,
          fontSize: 13,
        }}>
          <div style={{
            fontWeight: 700, fontSize: 11, textTransform: 'uppercase',
            color: '#d94e08', marginBottom: 6, letterSpacing: 0.5,
          }}>
            ⚠ {anomalies.length} {anomalies.length === 1 ? 'anomaly' : 'anomalies'}
          </div>
          {anomalies.map((a, i) => (
            <div key={i} style={{ marginTop: i > 0 ? 4 : 0 }}>
              <strong>{a.metric}</strong> {a.delta_pct > 0 ? '+' : ''}{(a.delta_pct * 100).toFixed(0)}% ({a.baseline} → {a.observed})
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 13, color: '#6B6B6B' }}>No anomalies.</div>
      )}
    </Card>
  );
}
