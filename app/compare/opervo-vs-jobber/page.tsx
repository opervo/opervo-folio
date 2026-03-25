import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opervo vs Jobber — Which Is Better for Solo Contractors? | Opervo',
  description: 'Compare Opervo and Jobber side by side. Opervo starts at $24.99/mo vs Jobber at $39+/mo. See which field service app is better for solo operators and small crews.',
  alternates: { canonical: 'https://opervo.io/compare/opervo-vs-jobber' },
  openGraph: {
    title: 'Opervo vs Jobber — Honest Comparison',
    description: 'Opervo starts at $24.99/mo. Jobber starts at $39/mo. See the full feature-by-feature breakdown.',
    url: 'https://opervo.io/compare/opervo-vs-jobber',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', jobber: '$39/mo' },
  { feature: 'Team plan', opervo: '$54.99/mo', jobber: '$119/mo (Connect)' },
  { feature: 'Free trial', opervo: '30 days', jobber: '14 days' },
  { feature: 'Scheduling', opervo: '✓', jobber: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', jobber: '✓' },
  { feature: 'Client portal', opervo: '✓', jobber: '✓' },
  { feature: 'Google Calendar sync', opervo: '✓', jobber: '✓' },
  { feature: 'Automated text notifications', opervo: '✓ (included)', jobber: 'Add-on' },
  { feature: 'Portfolio page (Folio)', opervo: '✓', jobber: '✗' },
  { feature: 'Quote request from portfolio', opervo: '✓', jobber: '✗' },
  { feature: 'Recurring jobs', opervo: '✓', jobber: '✓' },
  { feature: 'Team permissions', opervo: '✓ (Team plan)', jobber: '✓ (Connect+)' },
  { feature: 'Route optimization', opervo: '✗', jobber: '✓ (Grow plan)' },
  { feature: 'Mobile-first PWA', opervo: '✓', jobber: 'Native app' },
  { feature: 'Built for solo operators', opervo: '✓', jobber: 'Built for teams' },
]

const switchReasons = [
  { title: 'Save $170+/year', desc: 'Opervo Solo is $24.99/mo vs Jobber Core at $39/mo. That\'s $168/year back in your pocket — and you get more features included.' },
  { title: 'Portfolio page included', desc: 'Jobber doesn\'t offer a public portfolio page. With Opervo, every operator gets a shareable Folio page where clients can see your work and request quotes.' },
  { title: 'Texts included, not an add-on', desc: 'Opervo includes automated appointment reminders, on-my-way alerts, and review request texts. Jobber charges extra for similar functionality.' },
  { title: 'Longer free trial', desc: '30 days to try everything vs Jobber\'s 14 days. Enough time to actually run your business on it before committing.' },
]

const faqs = [
  {
    q: 'Is Opervo a good alternative to Jobber?',
    a: 'Yes. Opervo includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. Jobber starts at $39/mo and charges extra for text notifications. Opervo is built specifically for solo operators and small crews, while Jobber is designed for larger teams.',
  },
  {
    q: 'Is Jobber worth $39 per month?',
    a: 'Jobber is a solid product for established teams that need route optimization and advanced reporting. But if you\'re a solo operator or small crew, you\'re paying for features you don\'t use. Opervo gives you everything you need at $24.99/mo.',
  },
  {
    q: 'Can I switch from Jobber to Opervo?',
    a: 'Yes. You can export your client list from Jobber as a CSV and import it into Opervo. Most operators are fully set up within an hour. Your Opervo 30-day free trial gives you time to migrate without paying for both.',
  },
  {
    q: 'What does Jobber have that Opervo doesn\'t?',
    a: 'Jobber offers route optimization (on their Grow plan at $199/mo), a native mobile app, and deeper integrations with tools like Mailchimp and Zapier. If you need those specific features, Jobber may be a better fit. For most solo operators and small crews, Opervo covers everything you need at a fraction of the price.',
  },
]

export default function OpervoVsJobber() {
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

      {/* NAV */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E8E4DE', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="https://opervo.io" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Opervo<span style={{ color: '#F5620F' }}>.</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="https://app.opervo.io" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' }}>Sign In</a>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>Try Free</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Comparison
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Opervo vs Jobber
        </h1>
        <p style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 12px' }}>
          Which is better for solo contractors and small crews?
        </p>
        <p style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>
          <span style={{ color: '#F5620F' }}>$24.99/mo</span> vs $39/mo — save $168/year with Opervo
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Jobber</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.opervo === '✓' || row.opervo === '✓ (included)' || row.opervo === '✓ (Team plan)' ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.jobber === '✗' ? '#ccc' : '#6B6B6B' }}>{row.jobber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHY PEOPLE SWITCH */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why People Switch from Jobber
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

      {/* WHEN JOBBER MIGHT BE BETTER */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
          When Jobber Might Be Better
        </h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          Jobber is a great product for larger teams that need route optimization, advanced reporting, and deep integrations with tools like QuickBooks, Mailchimp, and Zapier. If you have 10+ employees and need enterprise-level scheduling, Jobber&apos;s Grow plan ($199/mo) may be worth the investment. For solo operators and small crews who need a professional, affordable tool — Opervo is the better fit.
        </p>
      </section>

      {/* FAQ */}
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

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Try the Jobber Alternative Built for Solos?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free — 30 days, no credit card. $24.99/mo after.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0F0F0F', borderTop: '1px solid #222', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 40 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', letterSpacing: '-0.5px' }}>
                Opervo<span style={{ color: '#F5620F' }}>.</span>
              </span>
              <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>Built for the trades.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Compare</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/compare/opervo-vs-jobber" style={{ fontSize: 13, color: '#F5620F', textDecoration: 'none' }}>vs Jobber</a>
                  <a href="/compare/opervo-vs-housecall-pro" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs Housecall Pro</a>
                  <a href="/compare/opervo-vs-gorilladesk" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs GorillaDesk</a>
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
          <p style={{ fontSize: 12, color: '#6B6B6B', borderTop: '1px solid #222', paddingTop: 24, textAlign: 'center' }}>
            &copy; 2026 Opervo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
