import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ComparisonLinks from '@/components/ComparisonLinks'
import PricingCards from './PricingCards'

export const metadata: Metadata = {
  title: 'Pricing — Opervo | Solo $24.99/mo or $249/yr, Team $54.99/mo or $549/yr',
  description: 'Simple, transparent pricing. Solo $24.99/mo or $249/yr (save $51). Team $54.99/mo or $549/yr (save $111). All features included. 14-day free trial, no credit card required.',
  alternates: { canonical: 'https://opervo.io/pricing' },
  openGraph: {
    title: 'Opervo Pricing — From $24.99/mo or $249/yr',
    description: 'Simple pricing. Annual saves 17%. All features included. 14-day free trial, no credit card.',
    url: 'https://opervo.io/pricing',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Price', oSolo: '$24.99/mo or $249/yr', oTeam: '$54.99/mo or $549/yr', jLite: '$39/mo', jConnect: '$119/mo', hcp: '$79/mo', gd: '$49/mo', mk: '$39.95 + add-ons' },
  { feature: 'Free trial', oSolo: '14 days', oTeam: '14 days', jLite: '14 days', jConnect: '14 days', hcp: '14 days', gd: '14 days', mk: '14 days' },
  { feature: 'Scheduling', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓', mk: '✓' },
  { feature: 'Estimates & Invoicing', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓', mk: '✓' },
  { feature: 'Client portal', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✗', mk: '+$10/mo' },
  { feature: 'Portfolio page', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Auto-text (SMS)', oSolo: 'Included', oTeam: 'Included', jLite: 'Add-on', jConnect: 'Add-on', hcp: '✓', gd: '✓', mk: '+$10/mo' },
  { feature: 'Google Calendar sync', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓', mk: '✓' },
  { feature: 'Recurring jobs', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓', mk: '✓' },
  { feature: 'Service plans (e-signed agreements)', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Team management', oSolo: 'Up to 1', oTeam: 'Up to 10', jLite: '✗', jConnect: '✓', hcp: '✓', gd: '✓', mk: '+$5/user/mo' },
  { feature: 'Route optimization', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✓', hcp: '✗', gd: '✓', mk: '✗' },
  { feature: 'Door-to-door canvassing', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Measurement tool (sq ft / linear ft)', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Supplies & materials tracking', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Public portfolio page (Folio)', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Embeddable quote widget', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '+$10/mo' },
  { feature: 'AI Assistant (data-aware)', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: 'Estimator only' },
  { feature: 'Tipping + post-pay review prompt', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '+$10/mo' },
  { feature: 'Mileage + tax reports', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗', mk: '✗' },
  { feature: 'Payments — your processor, no markup', oSolo: 'Square or Stripe', oTeam: 'Square or Stripe', jLite: 'Jobber Payments', jConnect: 'Jobber Payments', hcp: 'HCP Pay', gd: 'GD Pay', mk: 'Markate Payments' },
]

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes, 14 days. No credit card required. You get full access to every feature.' },
  { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay. SMS, client portal, portfolio page, estimates, invoicing — all included.' },
  { q: 'Can I switch between Solo and Team?', a: 'Yes, upgrade or downgrade anytime from your account settings.' },
  { q: 'What payment methods do you accept?', a: 'For your subscription, all major credit and debit cards via Stripe. We don\'t store your card info. For payments from your clients, you connect your own Square or Stripe account — funds go straight to your bank, and Opervo takes zero markup.' },
  { q: 'Does Opervo take a cut of my client payments?', a: 'No. Zero platform fee, ever. You connect Square (recommended for new operators) or Stripe to your account, and your clients\' payments go directly from them to you. We never touch the money.' },
  { q: 'What happens after the trial?', a: 'Your account stays active on the plan you choose. If you don\'t subscribe, your data is saved for 30 days so you can come back anytime.' },
  { q: 'Do you offer annual pricing?', a: 'Yes. Solo Annual is $249/yr (saves $51 vs monthly), Team Annual is $549/yr (saves $111). Toggle Monthly or Annual on the pricing cards above, or pick Annual at checkout. Cancel anytime.' },
  { q: 'What\'s the Growth plan?', a: 'For teams with more than 10 members. Custom pricing and onboarding — email help@opervo.io and we\'ll set you up.' },
]

export default function Pricing() {
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
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>Pricing</span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Every Feature. Every Plan.
        </h1>
        <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
          No features locked behind higher tiers. No per-user fees. Start free for 14 days — no credit card required.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 72px' }}>
        <PricingCards />

        {/* FOUNDING 50 strip — limited founder pricing */}
        <div style={{ marginTop: 24, background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)', borderRadius: 12, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0, position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>Founding 50 · Limited Spots</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, color: '#F7F5F2', fontWeight: 800, marginBottom: 6, textTransform: 'uppercase', lineHeight: 1.15 }}>Lock <span style={{ color: '#F5620F' }}>$15/mo Solo</span> for life</p>
            <p style={{ fontSize: 13, color: '#B8B8B8', lineHeight: 1.55, marginBottom: 12 }}>40% off forever in exchange for honest feedback — a survey here, a quick call there. Capped at 50 operators.</p>
            <div style={{ maxWidth: 320 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>
                <span style={{ color: '#F7F5F2' }}>17 of 50 claimed</span>
                <span style={{ color: '#F5620F' }}>33 remaining</span>
              </div>
              <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '34%', background: 'linear-gradient(90deg, #F5620F 0%, #FF8A3D 100%)', borderRadius: 999, boxShadow: '0 0 10px rgba(245,98,15,0.5)' }} />
              </div>
            </div>
          </div>
          <a href="mailto:help@opervo.io?subject=Founding%2050%20application&body=Hi%20Max%2C%0A%0AI%27d%20like%20to%20be%20a%20Founding%20Operator.%0A%0AMy%20business%3A%20%0AMy%20trade%3A%20%0AHow%20I%20heard%20about%20Opervo%3A%20%0A%0A--%20A%20few%20quick%20questions%20--%0A%0AWhat%20I%27m%20currently%20using%20to%20run%20my%20business%3A%20%0AWhat%20I%20like%20about%20it%3A%20%0AWhat%20frustrates%20me%20about%20it%3A%20%0A%0ATop%20features%20I%20look%20for%20in%20field-service%20software%20%28in%20priority%20order%29%3A%0A1.%20%0A2.%20%0A3.%20%0A%0AThanks%21" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', position: 'relative', zIndex: 1 }}>
            Apply →
          </a>
        </div>

        {/* GROWTH strip — secondary to Solo/Team, for 10+ teams */}
        <div style={{ marginTop: 16, background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Growth · For 10+ teams</p>
            <p style={{ fontSize: 15, color: '#0F0F0F', fontWeight: 600, marginBottom: 4 }}>Same full feature access. Unlimited team members.</p>
            <p style={{ fontSize: 13, color: '#6B6B6B' }}>Priority support, custom onboarding, dedicated account manager.</p>
          </div>
          <a href="mailto:help@opervo.io?subject=Opervo%20Growth%20plan%20inquiry" style={{ display: 'inline-block', background: '#0F0F0F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
            Contact us →
          </a>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
          How We Compare
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 11, background: 'rgba(245,98,15,0.06)' }}>Opervo Solo</th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 11, background: 'rgba(245,98,15,0.06)' }}>Opervo Team</th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-jobber" title="Compare Opervo vs Jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber Lite</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-jobber" title="Compare Opervo vs Jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber Connect</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-housecall-pro" title="Compare Opervo vs Housecall Pro" style={{ color: '#6B6B6B', textDecoration: 'none' }}>HCP Basic</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-gorilladesk" title="Compare Opervo vs GorillaDesk" style={{ color: '#6B6B6B', textDecoration: 'none' }}>GorillaDesk</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-markate" title="Compare Opervo vs Markate" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Markate</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500, color: '#1a1a1a', fontSize: 13 }}>{row.feature}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: row.oSolo === '✓' || row.oSolo === 'Included' ? '#F5620F' : row.oSolo === '✗' ? '#ccc' : '#0F0F0F', background: 'rgba(245,98,15,0.06)', fontSize: 13 }}>{row.oSolo}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: row.oTeam === '✓' || row.oTeam === 'Included' ? '#F5620F' : row.oTeam === '✗' ? '#ccc' : '#0F0F0F', background: 'rgba(245,98,15,0.06)', fontSize: 13 }}>{row.oTeam}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: row.jLite === '✗' ? '#ccc' : '#6B6B6B', fontSize: 13 }}>{row.jLite}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: row.jConnect === '✗' ? '#ccc' : '#6B6B6B', fontSize: 13 }}>{row.jConnect}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: row.hcp === '✗' ? '#ccc' : '#6B6B6B', fontSize: 13 }}>{row.hcp}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: row.gd === '✗' ? '#ccc' : '#6B6B6B', fontSize: 13 }}>{row.gd}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: row.mk === '✗' ? '#ccc' : '#6B6B6B', fontSize: 13 }}>{row.mk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ComparisonLinks />
        <p style={{ fontSize: 13, color: '#6B6B6B', textAlign: 'center', marginTop: 12 }}>
          <Link href="/blog/field-service-software-pricing-guide" title="Field Service Software Pricing Guide" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 500 }}>Read our full pricing guide →</Link>
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
          Start Running Your Business Like a Pro.
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>14 days free. All features. No credit card.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
