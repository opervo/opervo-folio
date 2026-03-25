import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import OtherTrades from '@/components/OtherTrades'
import ComparisonLinks from '@/components/ComparisonLinks'

export const metadata: Metadata = {
  title: 'Solar Panel Cleaning Software — Scheduling, Invoicing & CRM | Opervo',
  description: 'The #1 app for solar panel cleaning businesses. Schedule jobs, send professional estimates, invoice clients, and showcase your work — all from your phone. $24.99/mo. Try free for 30 days.',
  alternates: { canonical: 'https://opervo.io/solar-panel-cleaning' },
  openGraph: {
    title: 'Solar Panel Cleaning Software — Opervo',
    description: 'Run your solar panel cleaning business like a pro. Scheduling, estimates, invoices, client portal & portfolio — $24.99/mo.',
    url: 'https://opervo.io/solar-panel-cleaning',
    type: 'website',
  },
}

const features = [
  { title: 'Smart Scheduling', desc: 'Drag-and-drop calendar. Syncs with Google Calendar. Auto-text "on my way" to clients.' },
  { title: 'Estimates & Invoicing', desc: 'Send branded estimates in 60 seconds. Convert to invoices with one tap. Clients pay online.' },
  { title: 'Client Management', desc: 'Client profiles with full job history, addresses, notes. No more digging through texts.' },
  { title: 'Portfolio Page', desc: 'Your own professional page at opervo.io/p/your-name. Share it everywhere — Instagram, Google, texts.' },
  { title: 'Automated Texts', desc: 'Appointment reminders, on-my-way alerts, review requests. Powered by Twilio.' },
  { title: 'Recurring Jobs', desc: 'Set it and forget it. Monthly panel cleanings auto-schedule and auto-invoice.' },
]

const steps = [
  { num: '1', title: 'Sign up free', desc: 'Create your account in 60 seconds. No credit card required.' },
  { num: '2', title: 'Add your services', desc: 'Set up your solar panel cleaning packages and pricing.' },
  { num: '3', title: 'Send your first estimate', desc: 'Your client gets a branded, professional estimate with a "Book Now" button.' },
]

const comparisonRows = [
  { feature: 'Monthly price', opervo: '$24.99', jobber: '$39+', housecall: '$79+', gorilla: '$49+' },
  { feature: 'Scheduling', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓' },
  { feature: 'Estimates & Invoicing', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓' },
  { feature: 'Client portal', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✗' },
  { feature: 'Portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗' },
  { feature: 'Auto-text notifications', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓' },
  { feature: '30-day free trial', opervo: '✓', jobber: '14 days', housecall: '14 days', gorilla: '14 days' },
]

const faqs = [
  {
    q: 'What is the best software for a solar panel cleaning business?',
    a: 'Opervo is built specifically for solo operators and small crews in the solar panel cleaning industry. It includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. Other options like Jobber ($39/mo) and Housecall Pro ($79/mo) are more expensive and not tailored to solar panel cleaning.',
  },
  {
    q: 'How much does solar panel cleaning software cost?',
    a: 'Solar panel cleaning software ranges from $24.99 to $79+ per month. Opervo starts at $24.99/mo for solo operators and $54.99/mo for teams — the most affordable full-featured option on the market. All features are included with no hidden fees.',
  },
  {
    q: 'Can I send estimates and invoices from my phone?',
    a: 'Yes. Opervo is a mobile-first app (PWA) that lets you create and send branded estimates and invoices directly from your phone in under 60 seconds. Clients receive a professional estimate with your business name and can book directly through your client portal.',
  },
  {
    q: 'Does Opervo work for solo solar panel cleaners?',
    a: 'Opervo was built for solo operators. The Solo plan ($24.99/mo) gives you everything you need — scheduling, estimates, invoicing, client management, automated texts, and a portfolio page. When you\'re ready to grow, the Team plan ($54.99/mo) adds crew management and permissions.',
  },
]

const benefits = [
  { title: 'Look professional from day one', desc: 'Your own branded portfolio, estimates, and invoices make a one-person operation look like an established business.' },
  { title: 'Win more jobs', desc: 'Clients can request quotes and book directly from your portfolio page. No more missed leads from phone tag.' },
  { title: 'Get paid faster', desc: 'Send invoices the second a job is done. Clients pay online. No chasing checks.' },
]

export default function SolarPanelCleaning() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Opervo',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '24.99',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
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
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 64px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 480px', minWidth: 280 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
            Solar Panel Cleaning
          </span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.05, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 20 }}>
            Run Your Solar Panel Cleaning Business Like a Pro.
          </h1>
          <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, marginBottom: 28 }}>
            Scheduling, estimates, invoicing, client texts, and your own portfolio page — all from your phone. Built for solo operators and small crews.
          </p>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Start Free — 30 Days, No Card
          </a>
          <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 10 }}>Solo plan: $24.99/mo after trial</p>
        </div>
        <div style={{ flex: '1 1 400px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 420, aspectRatio: '4/3', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B6B6B', fontSize: 14, fontWeight: 500 }}>
            [ App Screenshot ]
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
          Everything You Need to Run Your Business
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '28px 24px' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: '50%', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  {s.num}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55, maxWidth: 320, margin: '0 auto' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE COMPARISON */}
      <section id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
          How Opervo Compares
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>
                  <Link href="/compare/opervo-vs-jobber" title="Compare Opervo vs Jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>
                  <Link href="/compare/opervo-vs-housecall-pro" title="Compare Opervo vs Housecall Pro" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Housecall Pro</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>
                  <Link href="/compare/opervo-vs-gorilladesk" title="Compare Opervo vs GorillaDesk" style={{ color: '#6B6B6B', textDecoration: 'none' }}>GorillaDesk</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.opervo === '✓' ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.jobber === '✗' ? '#ccc' : '#6B6B6B' }}>{row.jobber}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.housecall === '✗' ? '#ccc' : '#6B6B6B' }}>{row.housecall}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.gorilla === '✗' ? '#ccc' : '#6B6B6B' }}>{row.gorilla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ComparisonLinks />
      </section>

      {/* WHY SOLAR CLEANERS CHOOSE OPERVO */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why Solar Panel Cleaners Choose Opervo
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {benefits.map((b) => (
              <div key={b.title} style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
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

      <OtherTrades exclude="/solar-panel-cleaning" />

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Level Up Your Solar Panel Cleaning Business?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free — 30 days, no credit card.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
