import Link from 'next/link'

const allTrades = [
  { name: 'Solar Panel Cleaning', href: '/solar-panel-cleaning', desc: 'Scheduling, invoicing & CRM for solar panel cleaning businesses.' },
  { name: 'Window Cleaning', href: '/window-cleaning', desc: 'Route planning, invoicing & client management for window cleaners.' },
  { name: 'Pressure Washing', href: '/pressure-washing', desc: 'Job tracking, before-and-after photos & fast invoicing for pressure washers.' },
  { name: 'Landscaping', href: '/landscaping', desc: 'Recurring schedules, seasonal services & property notes for landscapers.' },
]

export default function OtherTrades({ exclude }: { exclude: string }) {
  const trades = allTrades.filter((t) => t.href !== exclude)

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12, letterSpacing: '-0.5px' }}>
        Software for Every Trade
      </h2>
      <p style={{ fontSize: 15, color: '#6B6B6B', textAlign: 'center', marginBottom: 40 }}>
        Opervo works for solo operators and small crews in home services.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {trades.map((t) => (
          <Link key={t.href} href={t.href} title={`${t.name} Software — Opervo`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '24px 20px', height: '100%' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{t.name}</p>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55, marginBottom: 12 }}>{t.desc}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#F5620F' }}>Learn more →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
