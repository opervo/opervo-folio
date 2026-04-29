import Card from '../ui/Card';
import Stat from '../ui/Stat';

interface RoleSpend {
  role_slug: string;
  display_name: string;
  enabled: boolean;
  spent_today: number;
  daily_budget: number;
}

interface BudgetCardProps {
  spendToday: number;
  budgetToday: number;
  spendThisWeek: number;
  spendThisMonth: number;
  perRole: RoleSpend[];
}

export default function BudgetCard({ spendToday, budgetToday, spendThisWeek, spendThisMonth, perRole }: BudgetCardProps) {
  const pct = budgetToday > 0 ? Math.min(100, (spendToday / budgetToday) * 100) : 0;
  const barColor = pct < 50 ? '#1F8C4A' : pct < 80 ? '#F5620F' : '#d94e08';

  return (
    <Card title="Budget">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
        <Stat label="Today" value={`$${spendToday.toFixed(2)} / $${budgetToday.toFixed(2)}`} delta={`${pct.toFixed(0)}% used`} />
        <Stat label="This week" value={`$${spendThisWeek.toFixed(2)}`} size="small" />
        <Stat label="This month" value={`$${spendThisMonth.toFixed(2)}`} size="small" />
      </div>

      <div style={{ height: 6, background: '#E8E4DE', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor }} />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#6B6B6B', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>
          Per role (today)
        </div>
        {perRole.map(r => (
          <div key={r.role_slug} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 0', fontSize: 13, borderBottom: '1px solid #F0EDE8',
          }}>
            <span style={{ color: r.enabled ? '#1a1a1a' : '#9A9A9A' }}>
              {r.display_name}{!r.enabled && <span style={{ fontSize: 10, marginLeft: 6, color: '#9A9A9A' }}>disabled</span>}
            </span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#6B6B6B' }}>
              ${r.spent_today.toFixed(2)} / ${r.daily_budget.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
