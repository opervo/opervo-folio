import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import MoreComparisons from '@/components/MoreComparisons'
import TradesMention from '@/components/TradesMention'

export const metadata: Metadata = {
  title: 'Opervo vs GorillaDesk — Solo Contractor Comparison',
  description: 'Compare Opervo and GorillaDesk side by side. Opervo starts at $24.99/mo vs GorillaDesk at $49+/mo. See which field service app is better for solo operators and small crews.',
  alternates: { canonical: 'https://www.opervo.io/compare/opervo-vs-gorilladesk' },
  openGraph: {
    title: 'Opervo vs GorillaDesk — Honest Comparison',
    description: 'Opervo starts at $24.99/mo. GorillaDesk starts at $49/mo. See the full feature-by-feature breakdown.',
    url: 'https://www.opervo.io/compare/opervo-vs-gorilladesk',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', gd: '$49/mo' },
  { feature: 'Team plan', opervo: '$54.99/mo', gd: '$99/mo (Pro)' },
  { feature: 'Free trial', opervo: '14 days', gd: '14 days' },
  { feature: 'Scheduling', opervo: '✓', gd: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', gd: '✓' },
  { feature: 'Client portal', opervo: '✓', gd: '✗' },
  { feature: 'Google Calendar sync', opervo: '✓', gd: '✓' },
  { feature: 'Automated text notifications', opervo: '✓ (included)', gd: '✓' },
  { feature: 'Portfolio page (Folio)', opervo: '✓', gd: '✗' },
  { feature: 'Quote request from portfolio', opervo: '✓', gd: '✗' },
  { feature: 'Recurring jobs', opervo: '✓', gd: '✓' },
  { feature: 'Route optimization', opervo: '✓', gd: '✓ (Pro plan only)' },
  { feature: 'QuickBooks Online sync', opervo: '✓', gd: '✓' },
  { feature: 'FIFRA chemical tracking', opervo: '✗', gd: '✓' },
  { feature: 'Team permissions', opervo: '✓ (Team plan)', gd: '✓ (Pro plan)' },
  { feature: 'Native iOS app', opervo: '✓ (App Store)', gd: '✓' },
  { feature: 'Built for solo operators', opervo: '✓', gd: 'Pest control focus' },
]

const switchReasons = [
  { title: 'Save $288+/year', desc: 'Opervo Solo is $24.99/mo vs GorillaDesk Basic at $49/mo. That\'s $288/year you keep — enough to cover a month of gas or new equipment.' },
  { title: 'Portfolio page included', desc: 'GorillaDesk doesn\'t offer a public portfolio page or client portal. With Opervo, you get both — clients see your work, request quotes, and access their job history.' },
  { title: 'Client portal included', desc: 'GorillaDesk doesn\'t have a client portal on any plan. Opervo includes one on every plan — clients can view jobs, pay invoices, and request new service.' },
  { title: 'Built for any home-service trade', desc: 'Window cleaning, pressure washing, landscaping, solar — Opervo fits any field service. GorillaDesk leans hard on pest control and the rest of the product follows that bias.' },
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
    a: 'Yes. You can export your client list from GorillaDesk and import it into Opervo. Most operators are fully set up within an hour. Run your free trial in parallel with GorillaDesk so you can migrate without missing a beat.',
  },
  {
    q: 'What does GorillaDesk have that Opervo doesn\'t?',
    a: 'GorillaDesk offers FIFRA chemical tracking for pest control operators and pest-specific regulatory compliance tools. If you\'re in pest control and need those features, GorillaDesk is purpose-built for that. For most other home service trades, Opervo covers everything you need — including route optimization, QuickBooks sync, and a native iOS app — at a lower price.',
  },
  {
    q: 'Does Opervo have route optimization like GorillaDesk?',
    a: 'Yes. Opervo\'s Route My Day is included on every plan — one tap geolocates you, geocodes today\'s stops, orders them shortest-path, and shows total miles and ETA before opening Google Maps as a multi-leg trip. Saves 40+ minutes on a 6-stop day. GorillaDesk has route optimization too; the difference is the $24/mo price gap and Opervo\'s public folio page on top.',
  },
  {
    q: 'Is Opervo or GorillaDesk better for solo operators?',
    a: 'Opervo, in most cases. GorillaDesk\'s feature depth is built around dispatching multiple techs from a central office. As a solo operator you\'re paying for back-office complexity you don\'t need. Opervo is mobile-first, voice-input everywhere, designed for the operator who IS the field tech — and is $24.99/mo vs GorillaDesk\'s $49.',
  },
  {
    q: 'Does Opervo have a customer portal like GorillaDesk?',
    a: 'Yes — and Opervo\'s is included while GorillaDesk\'s requires a higher-tier plan. The Opervo Client Portal sends a magic link (no password), so the client can view job history, invoices, and estimates, and submit a service request. No login wall, mobile-first, branded with the operator\'s logo and colors.',
  },
  {
    q: 'Can I switch from GorillaDesk to Opervo without losing client data?',
    a: 'Yes. Export your client list from GorillaDesk as a CSV and import it into Opervo — auto-column mapping handles GorillaDesk\'s export format. Duplicate detection prevents double-imports. Most operators are fully set up within an hour. Photos and historical job notes need to be re-uploaded manually since GorillaDesk doesn\'t export those.',
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

      <SiteNav />

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
          GorillaDesk is purpose-built for pest control operators. If you need FIFRA chemical tracking, regulatory compliance tools, and pest-specific workflows, GorillaDesk is one of the best options on the market. For window cleaners, pressure washers, solar panel cleaners, landscapers, and other home service trades — Opervo is the more affordable, better-fit option, with route optimization, QuickBooks sync, and a native iOS app included on every plan.
        </p>
        <div style={{ marginTop: 24 }}>
          <TradesMention />
        </div>
      </section>

      {/* THE KILLER DIFFERENTIATOR — folio screenshot */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '-0.5px' }}>
            What GorillaDesk operators don&apos;t have
          </h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            Every Opervo operator gets a public Folio page at <strong style={{ color: '#0F0F0F' }}>opervo.io/p/your-slug</strong> — auto-published before/after photos, services, reviews, and a built-in quote form. New leads land here from a Google search and request a quote without you ever picking up the phone. GorillaDesk has no equivalent.
          </p>
          <img src="/screenshots/hero-folio-2.jpg" alt="Opervo Folio page with before/after slider and customer reviews — the public portfolio every operator gets included with the $24.99/mo plan" loading="lazy" decoding="async" style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, border: '1px solid #E8E4DE' }} />
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 72px' }}>
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

      <MoreComparisons exclude="/compare/opervo-vs-gorilladesk" />

      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Try the GorillaDesk Alternative Built for Solos?
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
