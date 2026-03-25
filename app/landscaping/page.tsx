import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landscaping Software for Small Business — Scheduling, Invoicing & CRM | Opervo',
  description: 'The #1 app for landscaping and lawn care businesses. Schedule mowing routes, send professional estimates, invoice clients, and showcase your work — all from your phone. $24.99/mo. Try free for 30 days.',
  alternates: { canonical: 'https://opervo.io/landscaping' },
  openGraph: {
    title: 'Landscaping Software — Opervo',
    description: 'Run your landscaping business like a pro. Scheduling, estimates, invoices, client portal & portfolio — $24.99/mo.',
    url: 'https://opervo.io/landscaping',
    type: 'website',
  },
}

const features = [
  { title: 'Smart Scheduling', desc: 'Drag-and-drop calendar built for mowing routes and service days. Syncs with Google Calendar. Auto-text "on my way" to clients.' },
  { title: 'Estimates & Invoicing', desc: 'Price by yard size, service type, or seasonal package. Send branded estimates in 60 seconds. Convert to invoices with one tap.' },
  { title: 'Client Management', desc: 'Track property details, seasonal services, gate codes, and pet notes. Full job history for every client.' },
  { title: 'Portfolio Page', desc: 'Your own professional page at opervo.io/p/your-name. Showcase lawn transformations, hardscaping, and seasonal work.' },
  { title: 'Automated Texts', desc: 'Appointment reminders, on-my-way alerts, and review requests. Keep clients in the loop without lifting a finger.' },
  { title: 'Recurring Jobs', desc: 'Weekly mowing, monthly maintenance, seasonal cleanups. Auto-schedule and auto-invoice — never chase a rebooking.' },
]

const steps = [
  { num: '1', title: 'Sign up free', desc: 'Create your account in 60 seconds. No credit card required.' },
  { num: '2', title: 'Add your services', desc: 'Set up your landscaping packages — mowing, edging, mulching, seasonal cleanups, hardscaping.' },
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
    q: 'What is the best software for a small landscaping business?',
    a: 'Opervo is built specifically for solo operators and small crews in the landscaping and lawn care industry. It includes scheduling, estimates, invoicing, a client portal, automated texts, and a portfolio page — all for $24.99/mo. Other options like Jobber ($39/mo) and Housecall Pro ($79/mo) cost more and are built for larger operations.',
  },
  {
    q: 'How much does landscaping business software cost?',
    a: 'Landscaping software ranges from $24.99 to $79+ per month. Opervo starts at $24.99/mo for solo operators and $54.99/mo for teams — the most affordable full-featured option on the market. All features are included with no hidden fees.',
  },
  {
    q: 'Can I manage recurring mowing schedules?',
    a: 'Yes. Opervo makes recurring jobs effortless. Set up weekly mowing, bi-weekly maintenance, or seasonal cleanups — they auto-schedule on your calendar and auto-invoice your clients. No manual rebooking needed.',
  },
  {
    q: 'Does Opervo work for solo landscapers?',
    a: 'Opervo was built for solo operators. The Solo plan ($24.99/mo) gives you everything you need — scheduling, estimates, invoicing, client management, automated texts, and a portfolio page. When you\'re ready to add crew members, the Team plan ($54.99/mo) adds permissions and team management.',
  },
]

const benefits = [
  { title: 'Look professional from day one', desc: 'Branded estimates, invoices, and your own portfolio page make a one-person landscaping operation look like an established business.' },
  { title: 'Win more jobs', desc: 'Clients can see your lawn transformations and hardscaping work on your portfolio page and request quotes directly. No more phone tag.' },
  { title: 'Get paid faster', desc: 'Send invoices the moment you finish a job. Clients pay online. No more chasing checks at the end of the month.' },
]

export default function Landscaping() {
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

      {/* NAV */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E8E4DE', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="https://opervo.io" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Opervo<span style={{ color: '#F5620F' }}>.</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#features" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' }}>Pricing</a>
          <a href="https://app.opervo.io" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' }}>Sign In</a>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>Try Free</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 64px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 480px', minWidth: 280 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
            Landscaping &amp; Lawn Care
          </span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.05, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 20 }}>
            Run Your Landscaping Business Like a Pro.
          </h1>
          <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, marginBottom: 28 }}>
            Scheduling, estimates, invoicing, client texts, and your own portfolio page — all from your phone. Built for solo landscapers and small crews.
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
                  <a href="/compare/opervo-vs-jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber</a>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>
                  <a href="/compare/opervo-vs-housecall-pro" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Housecall Pro</a>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>
                  <a href="/compare/opervo-vs-gorilladesk" style={{ color: '#6B6B6B', textDecoration: 'none' }}>GorillaDesk</a>
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
      </section>

      {/* WHY LANDSCAPERS CHOOSE OPERVO */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why Landscapers Choose Opervo
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

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Ready to Level Up Your Landscaping Business?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free — 30 days, no credit card.</p>
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
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Industries</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/solar-panel-cleaning" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Solar Panel Cleaning</a>
                  <a href="/window-cleaning" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Window Cleaning</a>
                  <a href="/pressure-washing" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Pressure Washing</a>
                  <a href="/landscaping" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>Landscaping</a>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Compare</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/compare/opervo-vs-jobber" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs Jobber</a>
                  <a href="/compare/opervo-vs-housecall-pro" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs Housecall Pro</a>
                  <a href="/compare/opervo-vs-gorilladesk" style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}>vs GorillaDesk</a>
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
