import Link from 'next/link'

const allComparisons = [
  { name: 'Opervo vs Jobber', href: '/compare/opervo-vs-jobber', price: '$24.99/mo vs $39/mo' },
  { name: 'Opervo vs Housecall Pro', href: '/compare/opervo-vs-housecall-pro', price: '$24.99/mo vs $79/mo' },
  { name: 'Opervo vs GorillaDesk', href: '/compare/opervo-vs-gorilladesk', price: '$24.99/mo vs $49/mo' },
]

export default function MoreComparisons({ exclude }: { exclude: string }) {
  const comparisons = allComparisons.filter((c) => c.href !== exclude)

  return (
    <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
        More Comparisons
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {comparisons.map((c) => (
          <Link key={c.href} href={c.href} title={c.name} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '20px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 6 }}>{c.name}</p>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 8 }}>{c.price}. See the full breakdown.</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#F5620F' }}>Compare →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
