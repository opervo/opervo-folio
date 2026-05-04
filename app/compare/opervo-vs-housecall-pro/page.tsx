import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import MoreComparisons from '@/components/MoreComparisons'
import TradesMention from '@/components/TradesMention'

export const metadata: Metadata = {
  title: 'Opervo vs Housecall Pro — Solo Contractor Comparison',
  description: 'Compare Opervo and Housecall Pro side by side. Opervo starts at $24.99/mo vs Housecall Pro at $79+/mo. See which field service app is better for solo operators and small crews.',
  alternates: { canonical: 'https://www.opervo.io/compare/opervo-vs-housecall-pro' },
  openGraph: {
    title: 'Opervo vs Housecall Pro — Honest Comparison',
    description: 'Opervo starts at $24.99/mo. Housecall Pro starts at $79/mo. See the full feature-by-feature breakdown.',
    url: 'https://www.opervo.io/compare/opervo-vs-housecall-pro',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', hcp: '$79/mo' },
  { feature: 'Team plan', opervo: '$54.99/mo', hcp: '$189/mo (Essentials)' },
  { feature: 'Free trial', opervo: '14 days', hcp: '14 days' },
  { feature: 'Scheduling', opervo: '✓', hcp: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', hcp: '✓' },
  { feature: 'Client portal', opervo: '✓', hcp: '✓' },
  { feature: 'Google Calendar sync', opervo: '✓', hcp: '✓' },
  { feature: 'Automated text notifications', opervo: '✓ (included)', hcp: '✓' },
  { feature: 'Portfolio page (Folio)', opervo: '✓', hcp: '✗' },
  { feature: 'Quote request from portfolio', opervo: '✓', hcp: '✗' },
  { feature: 'Recurring jobs', opervo: '✓', hcp: '✓' },
  { feature: 'Online booking', opervo: 'Via Folio page', hcp: '✓' },
  { feature: 'Team permissions', opervo: '✓ (Team plan)', hcp: '✓' },
  { feature: 'Route optimization', opervo: '✓', hcp: '✓' },
  { feature: 'QuickBooks Online sync', opervo: '✓', hcp: '✓' },
  { feature: 'Native iOS app', opervo: '✓ (App Store)', hcp: '✓' },
  { feature: 'Built for solo operators', opervo: '✓', hcp: 'Built for teams' },
]

const switchReasons = [
  { title: 'Save $648+/year', desc: 'Opervo Solo is $24.99/mo vs Housecall Pro Basic at $79/mo. That\'s $648/year — enough to cover your insurance or buy new equipment.' },
  { title: 'Portfolio page included', desc: 'Housecall Pro doesn\'t offer a public portfolio page. With Opervo, you get a shareable Folio page where clients see your work and request quotes directly.' },
  { title: 'No feature gating', desc: 'Opervo includes all features on every plan. Housecall Pro locks key features behind their Essentials ($189/mo) and MAX tiers.' },
  { title: 'Built for the operator on the truck', desc: 'Opervo is mobile-first, voice-input everywhere, fast on a phone with one hand. Housecall Pro is built for office staff to run techs in the field.' },
]

const faqs = [
  {
    q: 'Is Opervo a good alternative to Housecall Pro?',
    a: 'Yes. Opervo includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. Housecall Pro starts at $79/mo. Opervo is built specifically for solo operators and small crews who need professional tools without the enterprise price tag.',
  },
  {
    q: 'Is Housecall Pro worth $79 per month?',
    a: 'Housecall Pro is a mature product with a built-in online booking widget and Google Local Services Ads integration. For larger teams with 5+ employees, the feature set can justify the cost. But for solo operators and small crews, you\'re paying for features and scale you don\'t need. Opervo gives you everything essential — including a native iOS app, route optimization, and QuickBooks sync — at $24.99/mo.',
  },
  {
    q: 'Can I switch from Housecall Pro to Opervo?',
    a: 'Yes. You can export your client list from Housecall Pro and import it into Opervo. Most operators are fully set up within an hour. Run your free trial in parallel with Housecall Pro so you can migrate without missing a beat.',
  },
  {
    q: 'What does Housecall Pro have that Opervo doesn\'t?',
    a: 'Housecall Pro offers a built-in online booking widget and a Google Local Services Ads integration. If you rely heavily on those specific tools, Housecall Pro may be a better fit. For most solo operators, Opervo covers everything you need — native iOS app, route optimization, QuickBooks sync — at a third of the price.',
  },
]

export default function OpervoVsHousecallPro() {
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

      <SiteNav />

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Comparison
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Opervo vs Housecall Pro
        </h1>
        <p style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 12px' }}>
          Which is better for solo contractors and small crews?
        </p>
        <p style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>
          <span style={{ color: '#F5620F' }}>$24.99/mo</span> vs $79/mo — save $648/year with Opervo
        </p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Housecall Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.opervo.startsWith('✓') ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.hcp === '✗' ? '#ccc' : '#6B6B6B' }}>{row.hcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why People Switch from Housecall Pro
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
          When Housecall Pro Might Be Better
        </h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          Housecall Pro is a strong choice for established businesses with larger teams that need a built-in online booking widget and Google Local Services Ads integration. If those specific features are critical to your workflow, Housecall Pro may justify the higher price. For solo operators and small crews who want professional tools — including a native iOS app, route optimization, and QuickBooks sync — without paying $79+/mo, Opervo is the better fit.
        </p>
        <div style={{ marginTop: 24 }}>
          <TradesMention />
        </div>
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

      <MoreComparisons exclude="/compare/opervo-vs-housecall-pro" />

      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Try the Housecall Pro Alternative Built for Solos?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free — 14 days, no credit card. $24.99/mo after.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
