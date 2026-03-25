import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opervo vs GorillaDesk — Which Is Better for Solo Contractors? | Opervo',
  description: 'Compare Opervo and GorillaDesk side by side. Opervo starts at $24.99/mo vs GorillaDesk at $49+/mo. See which field service app is better for solo operators and small crews.',
  alternates: { canonical: 'https://opervo.io/compare/opervo-vs-gorilladesk' },
  openGraph: {
    title: 'Opervo vs GorillaDesk — Honest Comparison',
    description: 'Opervo starts at $24.99/mo. GorillaDesk starts at $49/mo. See the full feature-by-feature breakdown.',
    url: 'https://opervo.io/compare/opervo-vs-gorilladesk',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', gd: '$49/mo' },
  { feature: 'Team plan', opervo: '$54.99/mo', gd: '$99/mo (Pro)' },
  { feature: 'Free trial', opervo: '30 days', gd: '14 days' },
  { feature: 'Scheduling', opervo: '✓', gd: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', gd: '✓' },
  { feature: 'Client portal', opervo: '✓', gd: '✗' },
  { feature: 'Google Calendar sync', opervo: '✓', gd: '✓' },
  { feature: 'Automated text notifications', opervo: '✓ (included)', gd: '✓' },
  { feature: 'Portfolio page (Folio)', opervo: '✓', gd: '✗' },
  { feature: 'Quote request from portfolio', opervo: '✓', gd: '✗' },
  { feature: 'Recurring jobs', opervo: '✓', gd: '✓' },
  { feature: 'Route optimization', opervo: '✗', gd: '✓ (Pro plan)' },
  { feature: 'FIFRA chemical tracking', opervo: '✗', gd: '✓' },
  { feature: 'Team permissions', opervo: '✓ (Team plan)', gd: '✓ (Pro plan)' },
  { feature: 'Mobile-first PWA', opervo: '✓', gd: 'Native app' },
  { feature: 'Built for solo operators', opervo: '✓', gd: 'Pest control focus' },
]

const switchReasons = [
  { title: 'Save $288+/year', desc: 'Opervo Solo is $24.99/mo vs GorillaDesk Basic at $49/mo. That\'s $288/year you keep — enough to cover a month of gas or new equipment.' },
  { title: 'Portfolio page included', desc: 'GorillaDesk doesn\'t offer a public portfolio page or client portal. With Opervo, you get both — clients see your work, request quotes, and access their job history.' },
  { title: 'Client portal included', desc: 'GorillaDesk doesn\'t have a client portal on any plan. Opervo includes one on every plan — clients can view jobs, pay invoices, and request new service.' },
  { title: 'Longer free trial', desc: '30 days to try everything vs GorillaDesk\'s 14 days. Enough time to actually run your business on it before deciding.' },
]

const faqs = [
  {
    q: 'Is Opervo a good alternative to GorillaDesk?',
    a: 'Yes. Opervo includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. GorillaDesk starts at $49/mo and doesn\'t include a client portal or portfolio page. Opervo is built for solo operators and small crews across all home service trades.',
  },
  {
    q: 'Is GorillaDesk worth $49 per month?',
    a: 'GorillaDesk has excellent reviews and is a strong choice for pest control operators who need FIFRA chemical tracking and compliance features. If you\'re in pest control, GorillaDesk may be worth the investment. For window cleaners, pressure washers, solar panel cleaners, and landscapers, Opervo offers more relevant features at half the price.',
  },
  {
    q: 'Can I switch from GorillaDesk to Opervo?',
    a: 'Yes. You can export your client list from GorillaDesk and import it into Opervo. Most operators are fully set up within an hour. Your Opervo 30-day free trial gives you time to migrate without paying for both.',
  },
  {
    q: 'What does GorillaDesk have that Opervo doesn\'t?',
    a: 'GorillaDesk offers FIFRA chemical tracking for pest control operators, route optimization (on their Pro plan at $99/mo), and a native mobile app. If you\'re in pest control and need regulatory compliance features, GorillaDesk is purpose-built for that. For most other home service trades, Opervo covers everything you need at a lower price.',
  },
]

export default function OpervoVsGorillaDesk() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header style={{ background: '#fff', borderBottom: '1px solid #E8E4DE', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="https://opervo.io" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Opervo<span style={{ color: '#F5620F' }}>.</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="https://app.opervo.io" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' }}>Sign In</a>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>Try Free</a>
        </div>
      </header>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Comparison
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Opervo vs GorillaDesk
        </h1>
        <p style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 12px' }}>
          Which is better for solo contractors and small crews?
        </p>
        <p style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>
          <span style={{ color: '#F5620F' }}>$24.99/mo</span> vs $49/mo — save $288/year with Opervo
        </p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>GorillaDesk</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.opervo.startsWith('✓') ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.gd === '✗' ? '#ccc' : '#6B6B6B' }}>{row.gd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why People Switch from GorillaDesk
          </h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {switchReasons.map((r) => (
              <div key={r.title} style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
          When GorillaDesk Might Be Better
        </h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          GorillaDesk is purpose-built for pest control operators. If you need FIFRA chemical tracking, regulatory compliance tools, and pest-specific workflows, GorillaDesk is one of the best options on the market. It also offers route optimization on its Pro plan ($99/mo). For window cleaners, pressure washers, solar panel cleaners, landscapers, and other home service trades — Opervo is the more affordable, better-fit option.
        </p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '24px 0' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#0F0F0F', marginBottom: 10 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{f.a}</p>
          </div>
        ))}
      </section>

      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Try the GorillaDesk Alternative Built for Solos?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free — 30 days, no credit card. $24.99/mo after.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <footer style={{ background: '#0F0F0F', borderTop: '1px solid #222', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 40 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', letterSpacing: '-0.5px' }}>Opervo<span style={{ color: '#F5620F' }}>.</span></span>
              <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>Built for the trades.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Compare</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/compare/opervo-vs-jobber" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs Jobber</a>
                  <a href="/compare/opervo-vs-housecall-pro" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs Housecall Pro</a>
                  <a href="/compare/opervo-vs-gorilladesk" style={{ fontSize: 13, color: '#F5620F', textDecoration: 'none' }}>vs GorillaDesk</a>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Industries</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/solar-panel-cleaning" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Solar Panel Cleaning</a>
                  <a href="/window-cleaning" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Window Cleaning</a>
                  <a href="/pressure-washing" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Pressure Washing</a>
                  <a href="/landscaping" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Landscaping</a>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Legal</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/privacy" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
                  <a href="/tos" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
                  <a href="https://app.opervo.io" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Sign In</a>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#6B6B6B', borderTop: '1px solid #222', paddingTop: 24, textAlign: 'center' }}>&copy; 2026 Opervo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
