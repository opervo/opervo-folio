import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ComparisonLinks from '@/components/ComparisonLinks'

export const metadata: Metadata = {
  title: 'Pricing — Opervo | Solo $24.99/mo, Team $54.99/mo',
  description: 'Simple, transparent pricing for field service software. Solo plan $24.99/mo, Team plan $54.99/mo. All features included. 30-day free trial, no credit card required.',
  alternates: { canonical: 'https://opervo.io/pricing' },
  openGraph: {
    title: 'Opervo Pricing — From $24.99/mo',
    description: 'Simple pricing. All features included. 30-day free trial, no credit card.',
    url: 'https://opervo.io/pricing',
    type: 'website',
  },
}

const soloFeatures = [
  'Unlimited clients',
  'Scheduling + Google Calendar sync',
  'Estimates & invoicing',
  'Client portal with magic links',
  'Portfolio page (opervo.io/p/your-name)',
  'Automated texts (confirmations, on-my-way, reviews)',
  'Recurring jobs',
  'CSV export',
  'Push notifications',
  'Lead management',
]

const teamFeatures = [
  'Everything in Solo, plus:',
  'Team member accounts',
  'Role-based permissions',
  'Assign jobs to crew members',
  'Team scheduling view',
  'All features included — no per-user fees',
]

const comparisonRows = [
  { feature: 'Price', oSolo: '$24.99/mo', oTeam: '$54.99/mo', jLite: '$39/mo', jConnect: '$119/mo', hcp: '$79/mo', gd: '$49/mo' },
  { feature: 'Free trial', oSolo: '30 days', oTeam: '30 days', jLite: '14 days', jConnect: '14 days', hcp: '14 days', gd: '14 days' },
  { feature: 'Scheduling', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓' },
  { feature: 'Estimates & Invoicing', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓' },
  { feature: 'Client portal', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✗' },
  { feature: 'Portfolio page', oSolo: '✓', oTeam: '✓', jLite: '✗', jConnect: '✗', hcp: '✗', gd: '✗' },
  { feature: 'Auto-text (SMS)', oSolo: 'Included', oTeam: 'Included', jLite: 'Add-on', jConnect: 'Add-on', hcp: '✓', gd: '✓' },
  { feature: 'Google Calendar sync', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓' },
  { feature: 'Recurring jobs', oSolo: '✓', oTeam: '✓', jLite: '✓', jConnect: '✓', hcp: '✓', gd: '✓' },
  { feature: 'Team management', oSolo: '✗', oTeam: '✓', jLite: '✗', jConnect: '✓', hcp: '✓', gd: '✓' },
  { feature: 'Route optimization', oSolo: 'Coming soon', oTeam: 'Coming soon', jLite: '✗', jConnect: '✓', hcp: '✗', gd: '✓' },
]

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes, 30 days. No credit card required. You get full access to every feature.' },
  { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay. SMS, client portal, portfolio page, estimates, invoicing — all included.' },
  { q: 'Can I switch between Solo and Team?', a: 'Yes, upgrade or downgrade anytime from your account settings.' },
  { q: 'What payment methods do you accept?', a: 'All major credit and debit cards via Stripe. We don\'t store your card info.' },
  { q: 'What happens after the trial?', a: 'Your account stays active on the plan you choose. If you don\'t subscribe, your data is saved for 30 days so you can come back anytime.' },
  { q: 'Do you offer annual pricing?', a: 'Not yet, but it\'s coming. Monthly pricing keeps things flexible — cancel anytime.' },
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
          Simple Pricing. No Hidden Fees.
        </h1>
        <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
          Everything you need to run your service business. Start free for 30 days — no credit card required.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {/* SOLO */}
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '36px 28px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Solo</p>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>$24.99</span>
              <span style={{ fontSize: 16, color: '#6B6B6B' }}>/mo</span>
            </div>
            <p style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 24 }}>Everything one operator needs.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {soloFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#F5620F', fontWeight: 700, fontSize: 14, lineHeight: '20px' }}>✓</span>
                  <span style={{ fontSize: 14, color: '#1a1a1a', lineHeight: '20px' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://app.opervo.io" style={{ display: 'block', textAlign: 'center', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Start Free Trial
            </a>
            <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 8 }}>30 days free. No credit card.</p>
          </div>

          {/* TEAM */}
          <div style={{ background: '#fff', border: '2px solid #F5620F', borderRadius: 12, padding: '36px 28px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#F5620F', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Most Popular</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Team</p>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>$54.99</span>
              <span style={{ fontSize: 16, color: '#6B6B6B' }}>/mo</span>
            </div>
            <p style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 24 }}>For growing crews.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {teamFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#F5620F', fontWeight: 700, fontSize: 14, lineHeight: '20px' }}>✓</span>
                  <span style={{ fontSize: 14, color: '#1a1a1a', lineHeight: '20px', fontWeight: f.startsWith('Everything') ? 600 : 400 }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://app.opervo.io" style={{ display: 'block', textAlign: 'center', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Start Free Trial
            </a>
            <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 8 }}>30 days free. No credit card.</p>
          </div>
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
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>30 days free. All features. No credit card.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
