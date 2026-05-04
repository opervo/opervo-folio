import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import MoreComparisons from '@/components/MoreComparisons'
import TradesMention from '@/components/TradesMention'

export const metadata: Metadata = {
  title: 'Opervo vs Jobber — Solo Contractor Comparison',
  description: 'Compare Opervo and Jobber side by side. Opervo starts at $24.99/mo vs Jobber at $39+/mo. See which field service app is better for solo operators and small crews.',
  alternates: { canonical: 'https://www.opervo.io/compare/opervo-vs-jobber' },
  openGraph: {
    title: 'Opervo vs Jobber — Honest Comparison',
    description: 'Opervo starts at $24.99/mo. Jobber starts at $39/mo. See the full feature-by-feature breakdown.',
    url: 'https://www.opervo.io/compare/opervo-vs-jobber',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', jobber: '$39/mo' },
  { feature: 'Team plan', opervo: '$54.99/mo', jobber: '$119/mo (Connect)' },
  { feature: 'Free trial', opervo: '14 days', jobber: '14 days' },
  { feature: 'Scheduling', opervo: '✓', jobber: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', jobber: '✓' },
  { feature: 'Client portal', opervo: '✓', jobber: '✓' },
  { feature: 'Google Calendar sync', opervo: '✓', jobber: '✓' },
  { feature: 'Automated text notifications', opervo: '✓ (included)', jobber: 'Add-on' },
  { feature: 'Portfolio page (Folio)', opervo: '✓', jobber: '✗' },
  { feature: 'Quote request from portfolio', opervo: '✓', jobber: '✗' },
  { feature: 'Recurring jobs', opervo: '✓', jobber: '✓' },
  { feature: 'Team permissions', opervo: '✓ (Team plan)', jobber: '✓ (Connect+)' },
  { feature: 'Route optimization', opervo: '✓', jobber: '✓ (Grow plan only)' },
  { feature: 'QuickBooks Online sync', opervo: '✓', jobber: '✓' },
  { feature: 'Native iOS app', opervo: '✓ (App Store)', jobber: '✓' },
  { feature: 'Built for solo operators', opervo: '✓', jobber: 'Built for teams' },
]

const switchReasons = [
  { title: 'Save $170+/year', desc: 'Opervo Solo is $24.99/mo vs Jobber Core at $39/mo. That\'s $168/year back in your pocket — and you get more features included.' },
  { title: 'Portfolio page included', desc: 'Jobber doesn\'t offer a public portfolio page. With Opervo, every operator gets a shareable Folio page where clients can see your work and request quotes.' },
  { title: 'Texts included, not an add-on', desc: 'Opervo includes automated appointment reminders, on-my-way alerts, and review request texts. Jobber charges extra for similar functionality.' },
  { title: 'Everything unlocked, no upsells', desc: 'Every feature is included on every plan — folio, AI assistant, automated texts, canvassing. Jobber locks core features behind higher tiers.' },
]

const faqs = [
  {
    q: 'Is Opervo a good alternative to Jobber?',
    a: 'Yes. Opervo includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. Jobber starts at $39/mo and charges extra for text notifications. Opervo is built specifically for solo operators and small crews, while Jobber is designed for larger teams.',
  },
  {
    q: 'Is Jobber worth $39 per month?',
    a: 'Jobber is a solid product for established teams that need advanced reporting and deeper integrations. But if you\'re a solo operator or small crew, you\'re paying for features you don\'t use. Opervo gives you everything you need at $24.99/mo — including route optimization and QuickBooks sync, no upgrade required.',
  },
  {
    q: 'Can I switch from Jobber to Opervo?',
    a: 'Yes. You can export your client list from Jobber as a CSV and import it into Opervo. Most operators are fully set up within an hour. Run your free trial in parallel with Jobber so you can migrate without missing a beat.',
  },
  {
    q: 'What does Jobber have that Opervo doesn\'t?',
    a: 'Jobber offers advanced reporting and deeper third-party integrations (Mailchimp, Zapier, etc.). If your business depends on those specific tools, Jobber may be a better fit. For most solo operators and small crews, Opervo covers everything you need — including route optimization and QuickBooks sync — at a fraction of the price.',
  },
  {
    q: 'Does Opervo have route optimization like Jobber?',
    a: 'Yes. Opervo\'s Route My Day feature is included on every plan. Tap one button: it geolocates you, geocodes today\'s stops, orders them shortest-path, and shows total miles and ETA. Jobber\'s route optimization is locked behind their Grow plan ($199/mo). Opervo Solo at $24.99/mo gets the same one-tap experience.',
  },
  {
    q: 'Is Opervo cheaper than Jobber for a 2-person team?',
    a: 'Yes by a wide margin. Opervo Team is $54.99/mo for up to 10 team members. Jobber Connect — the closest equivalent — is $119/mo and only covers 5 users. For a 2-person operation that\'s $780/year in your pocket, with the same scheduling, dispatch, and reporting features.',
  },
  {
    q: 'Does Opervo support recurring jobs and service agreements?',
    a: 'Yes. Build a recurring service plan (weekly, biweekly, monthly, quarterly), send a magic-link agreement to the client, they e-sign with their finger, and jobs auto-generate 30 days out. Pause for vacations, resume on a date. Jobber supports recurring jobs but doesn\'t do e-signed agreements with auto-renewal — that\'s an Opervo-only feature.',
  },
  {
    q: 'Can I send invoices from my phone with Opervo?',
    a: 'Yes. Every action in Opervo is mobile-first. Create the invoice, add line items by voice, attach photos, send via SMS or email — all from a phone with one hand. The same applies to estimates, scheduling, and client management. Jobber\'s mobile app is functional but the experience is built around an office worker on a desktop dispatching field techs; Opervo is built for the operator who IS the field tech.',
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

      <SiteNav />

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
          Jobber is a great product for larger teams that need advanced reporting and deep third-party integrations (Mailchimp, Zapier, and more). If you have 10+ employees and need enterprise-level scheduling, Jobber&apos;s Grow plan ($199/mo) may be worth the investment. For solo operators and small crews who need a professional, affordable tool — including route optimization and QuickBooks sync out of the box — Opervo is the better fit.
        </p>
        <div style={{ marginTop: 24 }}>
          <TradesMention />
        </div>
      </section>

      {/* THE KILLER DIFFERENTIATOR — folio screenshot */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '-0.5px' }}>
            What Jobber operators don&apos;t have
          </h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            Every Opervo operator gets a public Folio page at <strong style={{ color: '#0F0F0F' }}>opervo.io/p/your-slug</strong> — auto-published before/after photos, services, reviews, and a built-in quote form. New leads land here from a Google search and request a quote without you ever picking up the phone.
          </p>
          <img src="/screenshots/hero-folio-2.jpg" alt="Opervo Folio page with before/after slider and customer reviews — the public portfolio every operator gets included with the $24.99/mo plan" loading="lazy" decoding="async" style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, border: '1px solid #E8E4DE' }} />
        </div>
      </section>

      {/* FAQ */}
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

      <MoreComparisons exclude="/compare/opervo-vs-jobber" />

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Try the Jobber Alternative Built for Solos?
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
