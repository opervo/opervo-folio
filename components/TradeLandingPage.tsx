import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import OtherTrades from '@/components/OtherTrades'
import ComparisonLinks from '@/components/ComparisonLinks'

export type TradeFeature = { icon: string; title: string; desc: string }
export type TradeStat = { stat: string; label: string }
export type TradeRow = { feature: string; opervo: string; jobber: string; housecall: string; gorilla: string; markate: string }
export type TradeFAQ = { q: string; a: string }
export type TradePricingCard = { name: string; price: string; sub: string; highlight?: boolean }

export type TradePageConfig = {
  slug: string // e.g. "pressure-washing"
  trade: string // breadcrumb eyebrow e.g. "Pressure Washing"
  metaTitle: string
  metaDescription: string
  // Hero
  h1: string // e.g. "Built for the ones still on the rig."
  heroSub: string // first paragraph
  heroSubExtra: string // second paragraph (the "all-in $24.99" line)
  heroImage: string // path under /screenshots/
  heroImageAlt: string
  // Hook strip
  stats: TradeStat[]
  // Feature grid
  featuresHeading: string
  featuresSub: string
  features: TradeFeature[]
  // The Real Math
  mathHeading: string
  pricingCards: TradePricingCard[]
  mathTakeaway: string
  // Comparison table
  comparisonRows: TradeRow[]
  // FAQ
  faqs: TradeFAQ[]
  // Final CTA
  finalCtaH2: string // e.g. "Stop juggling apps.\nStart running washes."
  // Schema
  schemaName: string // e.g. "Opervo for Pressure Washing"
}

export default function TradeLandingPage({ config }: { config: TradePageConfig }) {
  const c = config
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: c.schemaName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: { '@type': 'Offer', price: '24.99', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <SiteNav />

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 56px', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: '1 1 480px', minWidth: 280 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
            {c.trade}
          </span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 52px)', lineHeight: 1.02, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 18 }}>
            {c.h1.endsWith('.') ? c.h1.slice(0, -1) : c.h1}<span style={{ color: '#F5620F' }}>.</span>
          </h1>
          <p style={{ fontSize: 17, color: '#3a3a3a', lineHeight: 1.55, maxWidth: 560, marginBottom: 14, fontWeight: 500 }}>
            {c.heroSub}
          </p>
          <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55, maxWidth: 560, marginBottom: 26 }} dangerouslySetInnerHTML={{ __html: c.heroSubExtra }} />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Start Free — 14 Days, No Card
            </a>
            <a href="/p/solar-wash-atx" style={{ display: 'inline-block', background: '#fff', color: '#0F0F0F', border: '1px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, padding: '14px 24px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              See a Live Folio
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#6B6B6B', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
              14 days free · No credit card
            </span>
            <a href="https://apps.apple.com/us/app/opervo/id6763399255" target="_blank" rel="noopener" aria-label="Download Opervo on the App Store" style={{ display: 'inline-flex' }}>
              <img src="/app-store-badge.svg" alt="Download on the App Store" style={{ height: 36 }} />
            </a>
          </div>
          <a href="sms:+15127616054" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#F5620F', textDecoration: 'none', borderBottom: '1px dashed rgba(245,98,15,0.4)', paddingBottom: 2 }}>
            💬 Got a question? Text Max → (512) 761-6054
          </a>
        </div>
        <div style={{ flex: '1 1 380px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
          <img src={c.heroImage} alt={c.heroImageAlt} style={{ width: '100%', maxWidth: 380, borderRadius: 16, boxShadow: '0 20px 60px rgba(15,15,15,0.18)' }} />
        </div>
      </section>

      {/* HOOK STAT STRIP */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {c.stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5620F', lineHeight: 1, marginBottom: 6 }}>{s.stat}</p>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5, maxWidth: 320, margin: '0 auto' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
            {c.featuresHeading}
          </h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', maxWidth: 600, margin: '0 auto' }}>
            {c.featuresSub}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {c.features.map((f) => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '24px 22px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '-0.2px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE MATH */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>The Real Math</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.05 }} dangerouslySetInnerHTML={{ __html: c.mathHeading }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
            {c.pricingCards.map((p) => (
              <div key={p.name} style={{ background: p.highlight ? 'rgba(245,98,15,0.12)' : 'rgba(255,255,255,0.04)', border: p.highlight ? '1px solid rgba(245,98,15,0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '20px 22px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: p.highlight ? '#F5620F' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{p.name}</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: '#F7F5F2', lineHeight: 1, marginBottom: 8 }}>{p.price}</p>
                <p style={{ fontSize: 12, color: p.highlight ? '#FFB37D' : '#9CA3AF', lineHeight: 1.5 }}>{p.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#B8B8B8', textAlign: 'center', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            {c.mathTakeaway}
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 32, letterSpacing: '-0.5px' }}>
          Feature-for-feature
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 11, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-jobber" title="Compare Opervo vs Jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-housecall-pro" title="Compare Opervo vs Housecall Pro" style={{ color: '#6B6B6B', textDecoration: 'none' }}>HCP</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-gorilladesk" title="Compare Opervo vs GorillaDesk" style={{ color: '#6B6B6B', textDecoration: 'none' }}>GorillaDesk</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-markate" title="Compare Opervo vs Markate" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Markate</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: row.opervo === '✓' || row.opervo === '0%' ? '#F5620F' : row.opervo === '✗' ? '#ccc' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.jobber === '✗' ? '#ccc' : '#6B6B6B' }}>{row.jobber}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.housecall === '✗' ? '#ccc' : '#6B6B6B' }}>{row.housecall}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.gorilla === '✗' ? '#ccc' : '#6B6B6B' }}>{row.gorilla}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.markate === '✗' ? '#ccc' : '#6B6B6B' }}>{row.markate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ComparisonLinks />
      </section>

      {/* PROFIT CALCULATOR CTA */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px' }}>
        <a href="/profit-calculator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', background: 'rgba(245,98,15,0.06)', border: '1px solid rgba(245,98,15,0.25)', borderRadius: 12, padding: '20px 24px', textDecoration: 'none' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>Free tool · No login</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, color: '#0F0F0F', fontWeight: 800, marginBottom: 4, textTransform: 'uppercase', lineHeight: 1.15 }}>Wonder if your jobs are actually paying<span style={{ color: '#F5620F' }}>?</span></p>
            <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.55 }}>Run your numbers through the Job Profit Calculator — see profit, hourly, and margin live. ~30 seconds.</p>
          </div>
          <span style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, padding: '10px 22px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Try it →</span>
        </a>
      </section>

      {/* FOUNDING 50 */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 56px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)', borderRadius: 12, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>Founding 50 · 17 of 50 claimed</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, color: '#F7F5F2', fontWeight: 800, marginBottom: 6, textTransform: 'uppercase', lineHeight: 1.15 }}>Lock <span style={{ color: '#F5620F' }}>$15/mo Solo</span> for life</p>
            <p style={{ fontSize: 13, color: '#B8B8B8', lineHeight: 1.55 }}>40% off forever in exchange for honest feedback. 33 spots remain.</p>
          </div>
          <a href="/#founding-50" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            Apply →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.5px' }}>
          Frequently Asked Questions
        </h2>
        {c.faqs.map((f) => (
          <div key={f.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '22px 0' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: '#0F0F0F', marginBottom: 10 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.65 }}>{f.a}</p>
          </div>
        ))}
      </section>

      <OtherTrades exclude={`/${c.slug}`} />

      {/* FINAL CTA */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: c.finalCtaH2 }} />
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>14 days free. All features. No credit card.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
