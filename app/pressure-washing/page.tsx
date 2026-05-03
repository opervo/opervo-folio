import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import OtherTrades from '@/components/OtherTrades'
import ComparisonLinks from '@/components/ComparisonLinks'

export const metadata: Metadata = {
  title: 'Pressure Washing Software — Track Chem Cost, Auto-Publish Before/After, Route Your Day | Opervo',
  description: 'Built for solo pressure washers. Track SH/surfactant cost per job, sketch and price driveways on Google Maps, auto-publish before/after photos to your folio, optimize your route in one tap. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://opervo.io/pressure-washing' },
  openGraph: {
    title: 'Pressure Washing Software — Opervo',
    description: 'Track chem cost, sketch driveways, auto-publish before/after photos, optimize routes. $24.99/mo. Built for the operator who pulls the wand.',
    url: 'https://opervo.io/pressure-washing',
    type: 'website',
  },
}

const features = [
  {
    icon: '💧',
    title: 'Profit on every wash',
    desc: 'Log SH, surfactant, and fuel as you use them. Every job shows Revenue − Supplies = Profit, live. That $400 driveway you "made $300 on"? Now you know if it actually paid.',
  },
  {
    icon: '📸',
    title: 'Before/after auto-publish',
    desc: 'Snap before and after photos on the job. They auto-publish to your folio at opervo.io/p/your-slug. The transformation IS the sale — and Instagram doesn\'t even need to be open.',
  },
  {
    icon: '📐',
    title: 'Sketch a driveway in 30 seconds',
    desc: 'Drop points around the concrete on the satellite map. Square footage and perimeter compute live as you draw. Auto-prices the estimate at your $/sq ft rate. Right-angle snap keeps shapes clean.',
  },
  {
    icon: '🗺️',
    title: 'Route My Day, one tap',
    desc: 'Hit the button: we geolocate you, geocode today\'s stops, order them shortest-path, show miles and ETA. "Start Route" opens Google Maps as a multi-leg trip. Saves 40+ min on a 6-stop day.',
  },
  {
    icon: '🔁',
    title: 'Recurring house washes that auto-bill',
    desc: 'Build a quarterly house wash plan, send a magic-link agreement, client e-signs. Jobs auto-generate 30 days out. Going on vacation? Pause it. Comes back the day they\'re back. No renewal calls.',
  },
  {
    icon: '💬',
    title: 'Client texts that close the loop',
    desc: 'On my way → photos delivered → invoice sent → "Pay now" → tip prompt → Google review request. All automated. Your client thinks you have a back office. You don\'t.',
  },
]

const comparisonRows = [
  { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
  { feature: 'Chem & supplies tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
  { feature: 'Before/after auto-publish to portfolio', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
  { feature: 'Sketch & price by square foot', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
  { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
  { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
  { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
  { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
  { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
  { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
  { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
  { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
]

const faqs = [
  {
    q: 'Does Opervo track SH, surfactant, and fuel cost per pressure washing job?',
    a: 'Yes. Build a catalog of what you actually use — gallons of SH, ounces of surfactant, gallons of fuel — and log usage per job in seconds. Unit costs are snapshotted at the moment of logging so historical jobs don\'t change when you re-buy at a different price. Every job shows live profit math: Revenue − Supplies = Profit (green if positive, red if negative).',
  },
  {
    q: 'Can I sketch a driveway and auto-price an estimate by square footage?',
    a: 'Yes. The Measurement Tool lets you drop points around the concrete on a Google Maps satellite view. Square footage and perimeter compute live. Right-angle snap keeps shapes clean. Set a $/sq ft rate per service and the area pushes straight into the estimate line item — no calculator.',
  },
  {
    q: 'Where do my before-and-after photos go?',
    a: 'They auto-publish to your portfolio page at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery grid up to 20 photos. Up to 10 service areas per folio. Embeddable quote widget so you can drop the form on your existing site or social bio.',
  },
  {
    q: 'How does Opervo compare to Jobber or Housecall Pro for pressure washing?',
    a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Opervo Solo is $24.99/mo all-in, with zero markup on payments — your client pays through your own Square or Stripe and the money goes straight to your bank. None of those competitors track chemical cost per job, sketch driveways, or auto-publish a portfolio page.',
  },
  {
    q: 'Does it work on iPhone? Is there an app?',
    a: 'Yes — Opervo is on the App Store, and the same login works on Android (via PWA install) and any browser. Updates push to your phone automatically — no waiting on App Store review when we ship a fix.',
  },
  {
    q: 'Is there really no credit card required for the trial?',
    a: 'Correct. 14 days, full feature access, no card. If you don\'t subscribe, your data is held for 30 days so you can come back anytime.',
  },
  {
    q: 'I\'m on Jobber/Housecall Pro now. How hard is the switch?',
    a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. You\'re live by lunch.',
  },
]

export default function PressureWashing() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Opervo for Pressure Washing',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: { '@type': 'Offer', price: '24.99', priceCurrency: 'USD' },
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
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 56px', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: '1 1 480px', minWidth: 280 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
            Pressure Washing
          </span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 52px)', lineHeight: 1.02, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 18 }}>
            Built for the ones still on the rig<span style={{ color: '#F5620F' }}>.</span>
          </h1>
          <p style={{ fontSize: 17, color: '#3a3a3a', lineHeight: 1.55, maxWidth: 560, marginBottom: 14, fontWeight: 500 }}>
            Track chem cost on every job. Sketch driveways and auto-price by square foot. Auto-publish before/after photos to your portfolio. Optimize your route in one tap.
          </p>
          <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55, maxWidth: 560, marginBottom: 26 }}>
            All in one app. <strong style={{ color: '#0F0F0F' }}>$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Start Free — 14 Days, No Card
            </a>
            <a href="/p/solar-wash-atx" style={{ display: 'inline-block', background: '#fff', color: '#0F0F0F', border: '1px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, padding: '14px 24px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              See a Live Folio
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#6B6B6B', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
              14 days free · No credit card
            </span>
            <a href="https://apps.apple.com/us/app/opervo/id6763399255" target="_blank" rel="noopener" aria-label="Download Opervo on the App Store" style={{ display: 'inline-flex' }}>
              <img src="/app-store-badge.svg" alt="Download on the App Store" style={{ height: 36 }} />
            </a>
          </div>
          <a href="sms:+15127616054" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#F5620F', textDecoration: 'none', borderBottom: '1px dashed rgba(245,98,15,0.4)', paddingBottom: 2 }}>
            💬 Got a question? Text Max → (512) 761-6054
          </a>
        </div>
        <div style={{ flex: '1 1 380px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
          <img src="/screenshots/hero-folio-1.jpg" alt="Opervo folio for a pressure washing operator showing before/after photos and services" style={{ width: '100%', maxWidth: 380, borderRadius: 16, boxShadow: '0 20px 60px rgba(15,15,15,0.18)' }} />
        </div>
      </section>

      {/* WHAT THEY ACTUALLY NEED hook strip */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { stat: '~$60', label: 'Average chem + fuel cost on a 1-hr commercial wash. Most operators don\'t track it.' },
            { stat: '40 min', label: 'Average daily time saved by route optimization on a 6-stop day.' },
            { stat: '$1,128', label: 'Yearly savings vs Jobber Connect — all features included, no upsells.' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5620F', lineHeight: 1, marginBottom: 6 }}>{s.stat}</p>
              <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5, maxWidth: 320, margin: '0 auto' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID — pressure-washing-specific killers */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
            What pressure washers actually need
          </h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', maxWidth: 600, margin: '0 auto' }}>
            Generic field-service tools were built for plumbers and HVAC. These are the things that move the needle on a wash day.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '24px 22px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '-0.2px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE MATH callout */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>The Real Math</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.05 }}>
              Why operators move from Jobber<br />and Housecall Pro
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no chem tracking' },
              { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every payment you take' },
              { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
            ].map((c) => (
              <div key={c.name} style={{ background: c.highlight ? 'rgba(245,98,15,0.12)' : 'rgba(255,255,255,0.04)', border: c.highlight ? '1px solid rgba(245,98,15,0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '20px 22px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: c.highlight ? '#F5620F' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{c.name}</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: '#F7F5F2', lineHeight: 1, marginBottom: 8 }}>{c.price}</p>
                <p style={{ fontSize: 12, color: c.highlight ? '#FFB37D' : '#9CA3AF', lineHeight: 1.5 }}>{c.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#B8B8B8', textAlign: 'center', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            A 6-stop wash day on Opervo: every chem cost logged, every photo on your folio, every client texted automatically, route saved 40 minutes. Zero spreadsheets. Zero double-entry.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="compare" style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 32, letterSpacing: '-0.5px' }}>
          Feature-for-feature
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 11, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-jobber" title="Compare Opervo vs Jobber" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Jobber</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-housecall-pro" title="Compare Opervo vs Housecall Pro" style={{ color: '#6B6B6B', textDecoration: 'none' }}>HCP</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-gorilladesk" title="Compare Opervo vs GorillaDesk" style={{ color: '#6B6B6B', textDecoration: 'none' }}>GorillaDesk</Link>
                </th>
                <th style={{ textAlign: 'center', padding: '12px 14px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 11 }}>
                  <Link href="/compare/opervo-vs-markate" title="Compare Opervo vs Markate" style={{ color: '#6B6B6B', textDecoration: 'none' }}>Markate</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, color: row.opervo === '✓' || row.opervo === '0%' ? '#F5620F' : row.opervo === '✗' ? '#ccc' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.jobber === '✗' ? '#ccc' : '#6B6B6B' }}>{row.jobber}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.housecall === '✗' ? '#ccc' : '#6B6B6B' }}>{row.housecall}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.gorilla === '✗' ? '#ccc' : '#6B6B6B' }}>{row.gorilla}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: row.markate === '✗' ? '#ccc' : '#6B6B6B' }}>{row.markate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ComparisonLinks />
      </section>

      {/* FOUNDING 50 mini-strip */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 56px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)', borderRadius: 12, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>Founding 50 · 17 of 50 claimed</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, color: '#F7F5F2', fontWeight: 800, marginBottom: 6, textTransform: 'uppercase', lineHeight: 1.15 }}>Lock <span style={{ color: '#F5620F' }}>$15/mo Solo</span> for life</p>
            <p style={{ fontSize: 13, color: '#B8B8B8', lineHeight: 1.55 }}>40% off forever in exchange for honest feedback. 33 spots remain.</p>
          </div>
          <a href="/#founding-50" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            Apply →
          </a>
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

      <OtherTrades exclude="/pressure-washing" />

      {/* FINAL CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12, lineHeight: 1.1 }}>
          Stop juggling apps.<br />Start running washes.
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>14 days free. All features. No credit card.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
