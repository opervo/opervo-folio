import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import MoreComparisons from '@/components/MoreComparisons'
import TradesMention from '@/components/TradesMention'

export const metadata: Metadata = {
  title: 'Opervo vs Markate — The Real Cost After Add-Ons | Opervo',
  description: 'Markate starts at $39.95/mo but most features (Customer Portal, Online Booking, Lead Form, Reviews, Proposals) are $10/mo add-ons. A realistic Markate stack is $80-110/mo. Opervo includes all of it for $24.99/mo.',
  alternates: { canonical: 'https://www.opervo.io/compare/opervo-vs-markate' },
  openGraph: {
    title: 'Opervo vs Markate — Honest Comparison',
    description: 'Markate stacks $10/mo add-ons on top of the base plan. Opervo includes everything at $24.99/mo. See the real math.',
    url: 'https://www.opervo.io/compare/opervo-vs-markate',
    type: 'website',
  },
}

const addOns = [
  { name: 'Customer Portal', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Online Booking', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Lead Contact Form', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Ask for Review (Google/Yelp)', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Proposal Kit', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Photo documentation (CompanyCam)', markate: '$10/mo', opervo: 'Included', commonStack: true },
  { name: 'Virtual Number', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'Call Forwarding', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'Virtual Video Estimate', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'NiceJob (review autopilot)', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'ResponsiBid', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'Zapier', markate: '$10/mo', opervo: '—', commonStack: false },
  { name: 'Kate AI Estimator', markate: 'Free', opervo: 'Included (no caps)', commonStack: false },
  { name: 'Kate AI Receptionist', markate: '$1/mo', opervo: '—', commonStack: false },
  { name: 'QuickBooks sync', markate: 'Free', opervo: 'Free', commonStack: false },
  { name: 'Google Calendar sync', markate: 'Free', opervo: 'Free', commonStack: false },
  { name: 'Per-employee fee', markate: '$5/mo each', opervo: 'Up to 10 included on Team', commonStack: false },
]

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', markate: '$39.95/mo' },
  { feature: 'Pricing model', opervo: 'All-in. Every feature included.', markate: 'Base plan + $10/mo per add-on' },
  { feature: 'Customer Portal', opervo: '✓ Included', markate: '+$10/mo add-on' },
  { feature: 'Online Booking / Quote Form', opervo: '✓ Included', markate: '+$10/mo add-on (each)' },
  { feature: 'Ask for Review (Google/Yelp)', opervo: '✓ Included', markate: '+$10/mo add-on' },
  { feature: 'Proposal Kit', opervo: '✓ Included', markate: '+$10/mo add-on' },
  { feature: 'Photo documentation', opervo: '✓ Included', markate: '+$10/mo (CompanyCam)' },
  { feature: 'Public portfolio (Folio) page', opervo: '✓ Included', markate: '✗ Not available' },
  { feature: 'Embeddable quote widget', opervo: '✓ Included', markate: '+$10/mo (Lead Form)' },
  { feature: 'AI assistant (data-aware)', opervo: '✓ No caps', markate: 'Kate AI (estimator only)' },
  { feature: 'Route optimization', opervo: '✓ Included', markate: '✗ Not available' },
  { feature: 'Door-to-door canvassing', opervo: '✓ Included', markate: '✗ Not available' },
  { feature: 'Measurement tool (sq ft)', opervo: '✓ Included', markate: '✗ Not available' },
  { feature: 'Supplies / chemical cost tracking', opervo: '✓ Included', markate: '✗ Not available' },
  { feature: 'Recurring service plans (e-signed)', opervo: '✓ Included', markate: '✓ (base plan)' },
  { feature: 'Per-employee fee', opervo: 'Up to 10 on Team ($54.99 flat)', markate: '$5/mo per additional user' },
  { feature: 'Payment processor markup', opervo: '0% — your Square or Stripe', markate: 'Markate Payments' },
  { feature: 'Free trial', opervo: '14 days, no card', markate: '14 days' },
]

const switchReasons = [
  {
    title: 'Pay $25, not $90',
    desc: 'A typical Markate solo stack — base plan + Customer Portal + Online Booking + Lead Form + Ask for Review + Proposal Kit + photo docs — runs $89.95/mo. Opervo gives you all of that for $24.99/mo. That\'s $780/year back in your pocket.',
  },
  {
    title: 'No nickel-and-diming',
    desc: 'Markate sells you a base plan and then upcharges the things every operator actually uses. Opervo\'s pricing is one number. Every feature on every plan. No "Pro tier" gates, no per-feature add-ons.',
  },
  {
    title: 'Features Markate doesn\'t have at any price',
    desc: 'Public portfolio page (Folio), one-tap route optimization, door-to-door canvassing, square-footage measurement, chemical/supplies cost tracking — none of these are sold as Markate add-ons because they don\'t exist in Markate at all.',
  },
  {
    title: 'Your money, your processor',
    desc: 'Opervo connects to your own Square or Stripe account. Funds go straight from your client to your bank. Zero platform markup, ever. Markate routes you through Markate Payments.',
  },
]

const faqs = [
  {
    q: 'How much does Markate actually cost per month?',
    a: 'Markate\'s lowest published plan starts at $39.95/mo for one user, plus $5/mo for each additional user. The base plan does not include features like Customer Portal, Online Booking, Lead Contact Form, Ask for Review, Proposal Kit, or photo documentation — those are $10/mo add-ons each. A realistic stack for a solo operator who actually wants to take leads online and request reviews lands between $80 and $110/mo.',
  },
  {
    q: 'Is Opervo cheaper than Markate?',
    a: 'Yes. Opervo Solo is $24.99/mo all-in. Every feature is included on every plan. Markate\'s starting price ($39.95) is misleading because it excludes the features most operators consider essential. To match Opervo\'s feature set on Markate, you\'re paying ~$80-110/mo. Annual savings: $660-1,020.',
  },
  {
    q: 'Does Markate have a portfolio page or live folio?',
    a: 'No. Markate doesn\'t offer a public-facing portfolio page where you can showcase before/after photos and capture leads at a shareable URL. Opervo includes Folio on every plan — every operator gets opervo.io/p/your-slug with up to 10 service areas, a built-in quote form, and an embeddable widget for your existing site or social bio.',
  },
  {
    q: 'Does Markate have route optimization?',
    a: 'No, Markate does not offer route optimization. Opervo includes Route My Day on every plan — one tap geolocates you, geocodes your day\'s stops, orders them shortest-path, and opens Google Maps as a multi-leg trip. Saves ~40 minutes on a typical 6-stop day.',
  },
  {
    q: 'Can I switch from Markate to Opervo?',
    a: 'Yes. Export your client list from Markate as a CSV and import it into Opervo. Auto-column mapping and duplicate detection mean most operators are fully set up within an hour. Run your 14-day Opervo trial in parallel so you don\'t miss a beat — no credit card required to start.',
  },
  {
    q: 'When might Markate be the better choice?',
    a: 'Markate has been around for a while and has a deep set of integrations like ResponsiBid, NiceJob, and Zapier (each as paid add-ons). If your existing workflow heavily depends on those specific third-party tools and you don\'t mind the per-feature pricing, Markate may fit better. For most solo operators and small crews who want one app at one price, Opervo wins on cost and feature breadth.',
  },
]

export default function OpervoVsMarkate() {
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
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.05, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Opervo vs Markate
        </h1>
        <p style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 12px' }}>
          The real cost of Markate after the $10/mo add-ons stack up.
        </p>
        <p style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>
          Opervo <span style={{ color: '#F5620F' }}>$24.99/mo all-in</span> · Markate $39.95 + $10/mo per add-on
        </p>
      </section>

      {/* THE STACK MATH — sucker punch */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ background: '#0F0F0F', borderRadius: 16, padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, background: 'radial-gradient(circle, rgba(245,98,15,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14, textAlign: 'center' }}>The Real Math</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 3.6vw, 30px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', textAlign: 'center', marginBottom: 28, lineHeight: 1.1 }}>
              A realistic Markate solo stack vs Opervo Solo
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '24px 22px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Markate Stack</p>
                <div style={{ fontSize: 13, color: '#B8B8B8', lineHeight: 1.9 }}>
                  Base plan · <strong style={{ color: '#F7F5F2' }}>$39.95</strong><br />
                  + Customer Portal · <strong style={{ color: '#F7F5F2' }}>$10</strong><br />
                  + Online Booking · <strong style={{ color: '#F7F5F2' }}>$10</strong><br />
                  + Lead Contact Form · <strong style={{ color: '#F7F5F2' }}>$10</strong><br />
                  + Ask for Review · <strong style={{ color: '#F7F5F2' }}>$10</strong><br />
                  + Proposal Kit · <strong style={{ color: '#F7F5F2' }}>$10</strong>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 14, paddingTop: 12 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F7F5F2' }}>$89.95</span>
                  <span style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 6 }}>/mo</span>
                </div>
              </div>
              <div style={{ background: 'rgba(245,98,15,0.12)', border: '1px solid rgba(245,98,15,0.4)', borderRadius: 12, padding: '24px 22px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Opervo Solo</p>
                <div style={{ fontSize: 13, color: '#FFB37D', lineHeight: 1.9 }}>
                  Customer Portal · <strong style={{ color: '#F7F5F2' }}>included</strong><br />
                  Online Booking · <strong style={{ color: '#F7F5F2' }}>included</strong><br />
                  Quote widget · <strong style={{ color: '#F7F5F2' }}>included</strong><br />
                  Review request · <strong style={{ color: '#F7F5F2' }}>included</strong><br />
                  Estimates / proposals · <strong style={{ color: '#F7F5F2' }}>included</strong><br />
                  + Folio, Routes, AI, Canvassing, Measure, Supplies
                </div>
                <div style={{ borderTop: '1px solid rgba(245,98,15,0.25)', marginTop: 14, paddingTop: 12 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F7F5F2' }}>$24.99</span>
                  <span style={{ fontSize: 13, color: '#FFB37D', marginLeft: 6 }}>/mo · all-in</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#FFB37D', textAlign: 'center', fontWeight: 600 }}>
              Same essential features. Save <strong style={{ color: '#F5620F' }}>$65/mo · $780/year</strong>. And Opervo throws in features Markate doesn&rsquo;t sell at any price.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
          Feature-for-feature
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Markate</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: row.opervo.startsWith('✓') ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.markate.startsWith('✗') ? '#ccc' : '#6B6B6B' }}>{row.markate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD-ON LEDGER */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '56px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>
              The Markate Add-On Ledger
            </h2>
            <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 580, margin: '0 auto' }}>
              Every feature Markate sells as a separate $10/mo add-on. Highlighted rows are the ones a typical solo operator will actually buy.
            </p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>Markate</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 11, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((a) => (
                  <tr key={a.name} style={{ background: a.commonStack ? 'rgba(245,98,15,0.03)' : '#fff' }}>
                    <td style={{ padding: '9px 14px', fontWeight: a.commonStack ? 700 : 500, color: '#1a1a1a' }}>
                      {a.commonStack && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#F5620F', marginRight: 8, verticalAlign: 'middle' }} />}
                      {a.name}
                    </td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', color: a.markate === 'Free' ? '#10B981' : '#6B6B6B', fontWeight: a.markate.startsWith('$10') ? 600 : 400 }}>{a.markate}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', fontWeight: 700, color: a.opervo === 'Included' || a.opervo.startsWith('Included') ? '#F5620F' : '#6B6B6B', background: 'rgba(245,98,15,0.06)' }}>{a.opervo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 16 }}>
            Pricing reflects Markate&rsquo;s in-app pricing options page (verified May 2026).
          </p>
        </div>
      </section>

      {/* WHY PEOPLE SWITCH */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.5px' }}>
          Why operators switch from Markate
        </h2>
        <div style={{ display: 'grid', gap: 24 }}>
          {switchReasons.map((r) => (
            <div key={r.title} style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <TradesMention />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.5px' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '22px 0' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: '#0F0F0F', marginBottom: 10 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.65 }}>{f.a}</p>
          </div>
        ))}
      </section>

      <MoreComparisons exclude="/compare/opervo-vs-markate" />

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12, lineHeight: 1.1 }}>
          Stop paying $10/mo<br />for what should be in the box.
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>14 days free. All features. No credit card. $24.99/mo after.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
