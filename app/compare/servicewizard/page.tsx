import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opervo vs ServiceWizard — Comparison for Field Service Operators',
  description:
    'Compare Opervo and ServiceWizard side by side. See which field service app gives you invoicing, scheduling, a live portfolio, and review automation — all for $24.99/mo.',
  alternates: { canonical: 'https://www.opervo.io/compare/servicewizard' },
}

/* ───────────────────────────────────────────
   Feature comparison data
   ─────────────────────────────────────────── */
const features: { name: string; opervo: string; opervoOk: 'yes' | 'no' | 'partial'; sw: string; swOk: 'yes' | 'no' | 'partial' }[] = [
  { name: 'Invoicing & payments', opervo: 'Unlimited, 60-second creation', opervoOk: 'yes', sw: 'Included (limited on free)', swOk: 'yes' },
  { name: 'Quoting / estimates', opervo: 'Built-in', opervoOk: 'yes', sw: 'AI-powered quotes', swOk: 'yes' },
  { name: 'CRM / client management', opervo: 'Full history, notes, one-tap', opervoOk: 'yes', sw: '5 free / unlimited Pro', swOk: 'yes' },
  { name: 'Job scheduling', opervo: 'Calendar + Google Cal sync', opervoOk: 'yes', sw: 'Color-coded calendar', swOk: 'yes' },
  { name: 'Live portfolio page (Folio)', opervo: 'Auto-builds from your work', opervoOk: 'yes', sw: 'Not available', swOk: 'no' },
  { name: 'Before / after photos', opervo: 'Auto-feeds into Folio', opervoOk: 'yes', sw: 'Photo tracking', swOk: 'yes' },
  { name: 'Review automation', opervo: 'Auto-requests Google reviews', opervoOk: 'yes', sw: 'Not available', swOk: 'no' },
  { name: 'Profit / expense tracking', opervo: 'Mileage, expenses, monthly P&L', opervoOk: 'yes', sw: 'Not available', swOk: 'no' },
  { name: 'Recurring jobs', opervo: 'Supported', opervoOk: 'yes', sw: 'Not available', swOk: 'no' },
  { name: 'Team features', opervo: 'Up to 20 members, role-based', opervoOk: 'yes', sw: 'Solo only', swOk: 'no' },
  { name: 'CSV import (from Jobber, etc.)', opervo: '2-minute client import', opervoOk: 'yes', sw: 'Not available', swOk: 'no' },
  { name: 'SMS messaging', opervo: 'Coming soon', opervoOk: 'no', sw: 'Built-in (10 free/mo)', swOk: 'yes' },
  { name: 'AI pricing analysis', opervo: 'Not a feature', opervoOk: 'no', sw: 'AI job sizing & quoting', swOk: 'yes' },
  { name: 'Free business website', opervo: 'Folio page serves as website', opervoOk: 'partial', sw: 'Included with Pro', swOk: 'yes' },
  { name: 'Academy / training', opervo: 'User guide', opervoOk: 'no', sw: 'Academy with Pro', swOk: 'yes' },
]

const testimonials = [
  { quote: 'Replaced Jobber and CompanyCam both. My Folio page brought in 3 new clients this month.', name: 'Mike P.', trade: 'Pressure Washing', city: 'Austin, TX' },
  { quote: 'Set up in 2 minutes. First invoice sent before I left the app.', name: 'Jamie R.', trade: 'Window Cleaning', city: 'Denver, CO' },
  { quote: 'My Folio page gets more quote requests than my Google listing.', name: 'Taylor K.', trade: 'Lawn Care', city: 'Nashville, TN' },
]

function StatusIcon({ status }: { status: 'yes' | 'no' | 'partial' }) {
  if (status === 'yes') return <span style={{ color: '#22c55e', fontWeight: 700 }}>&#10003;</span>
  if (status === 'no') return <span style={{ color: '#ef4444', fontWeight: 700 }}>&#10007;</span>
  return <span style={{ color: '#f59e0b', fontWeight: 700 }}>~</span>
}

export default function CompareServiceWizardPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --orange: #F5620F;
          --orange-dim: #d94e08;
          --orange-glow: rgba(245,98,15,0.30);
          --orange-pale: rgba(245,98,15,0.08);
          --black: #0F0F0F;
          --ink: #1a1a1a;
          --off: #F7F5F2;
          --warm: #EDE9E3;
          --rule: #E0DBD4;
          --muted: #7a7269;
          --white: #ffffff;
          --surface: #ffffff;
          --border: #E8E4DE;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Barlow', sans-serif;
          background: var(--off);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: .025; pointer-events: none; z-index: 9999;
        }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 58px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 28px;
          background: rgba(247,245,242,0.92);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--rule);
        }
        .nav-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 900;
          letter-spacing: -0.02em; color: var(--black);
          text-decoration: none;
        }
        .nav-logo span { color: var(--orange); }
        .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
        .nav-links a {
          font-size: 13px; font-weight: 600; color: var(--muted);
          text-decoration: none; letter-spacing: 0.01em; transition: color .15s;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-cta {
          background: var(--orange); color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          padding: 9px 22px; border-radius: 8px; border: none;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px var(--orange-glow);
          transition: transform .15s, box-shadow .15s, background .15s;
          display: inline-flex; align-items: center; gap: 7px;
        }
        .nav-cta:hover {
          background: var(--orange-dim);
          transform: translateY(-1px);
          box-shadow: 0 6px 22px var(--orange-glow);
        }
        @media (max-width: 640px) { .nav-links { display: none; } }

        /* ── HERO ── */
        .c-hero {
          background: var(--black);
          padding: 130px 28px 80px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .c-hero::before {
          content: '';
          position: absolute; top: -200px; right: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(245,98,15,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .c-hero-inner { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; }
        .c-hero .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500;
          color: var(--orange);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 22px;
        }
        .c-hero .eyebrow::before {
          content: ''; width: 6px; height: 6px;
          background: var(--orange); border-radius: 50%;
        }
        .c-hero h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 900; line-height: .95;
          text-transform: uppercase; letter-spacing: -0.02em;
          color: var(--off); margin-bottom: 20px;
        }
        .c-hero h1 em {
          font-style: normal; color: var(--orange);
        }
        .c-hero .sub {
          font-size: 17px; color: var(--muted); line-height: 1.6;
          max-width: 540px; margin: 0 auto 32px;
        }
        .c-hero .cta-row { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          background: var(--orange); color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          padding: 14px 32px; border-radius: 8px; border: none;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px var(--orange-glow);
          transition: transform .15s, background .15s;
        }
        .btn-primary:hover { background: var(--orange-dim); transform: translateY(-1px); }
        .btn-ghost {
          color: var(--muted); font-size: 14px; font-weight: 500;
          text-decoration: none; padding: 14px 20px;
          transition: color .15s;
        }
        .btn-ghost:hover { color: var(--off); }

        /* ── SECTIONS ── */
        .section { max-width: 960px; margin: 0 auto; padding: 80px 28px; }
        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500;
          color: var(--orange);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-eyebrow::before {
          content: ''; width: 6px; height: 6px;
          background: var(--orange); border-radius: 50%;
        }
        .section h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: clamp(32px, 4vw, 44px);
          text-transform: uppercase; letter-spacing: -0.02em;
          color: var(--black); margin-bottom: 32px; line-height: 1;
        }

        /* ── GLANCE GRID ── */
        .glance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        @media (max-width: 700px) { .glance-grid { grid-template-columns: 1fr; } }
        .glance-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .glance-card.op { border-top: 4px solid var(--orange); }
        .glance-card.sw { border-top: 4px solid #6366f1; }
        .glance-card h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 24px; text-transform: uppercase;
          color: var(--black); margin-bottom: 4px;
        }
        .glance-card .tagline {
          font-size: 14px; color: var(--muted); font-style: italic; margin-bottom: 16px;
        }
        .glance-card .detail { font-size: 14px; margin-bottom: 6px; }
        .glance-card .detail strong { font-weight: 600; color: var(--black); }

        /* ── COMPARISON TABLE ── */
        .comp-wrap { overflow-x: auto; margin-bottom: 20px; }
        .comp-table {
          width: 100%; border-collapse: separate; border-spacing: 0;
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--border); background: var(--surface);
          min-width: 620px;
        }
        .comp-table thead th {
          background: var(--black); color: var(--off);
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 13px;
          text-transform: uppercase; letter-spacing: 2px;
          padding: 14px 18px; text-align: left;
        }
        .comp-table thead th:nth-child(2) { color: var(--orange); }
        .comp-table thead th:nth-child(3) { color: #a5b4fc; }
        .comp-table tbody td {
          padding: 12px 18px; border-bottom: 1px solid var(--border);
          font-size: 14px; vertical-align: top;
        }
        .comp-table tbody tr:last-child td { border-bottom: none; }
        .comp-table tbody tr:nth-child(even) td { background: rgba(247,245,242,0.5); }
        .comp-table .fname { font-weight: 600; color: var(--black); }
        .comp-table .desc { color: var(--muted); font-size: 13px; margin-left: 6px; }

        /* ── FOLIO SECTION ── */
        .folio-section {
          background: var(--black); border-radius: 16px;
          padding: 60px 48px; margin-bottom: 20px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        @media (max-width: 700px) {
          .folio-section { grid-template-columns: 1fr; padding: 40px 24px; gap: 32px; }
        }
        .folio-text .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500; color: var(--orange);
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px;
        }
        .folio-text h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 36px; text-transform: uppercase;
          color: var(--off); line-height: 1; margin-bottom: 16px;
        }
        .folio-text p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
        .folio-bullets { list-style: none; margin-bottom: 24px; }
        .folio-bullets li {
          font-size: 14px; color: var(--off); padding: 6px 0 6px 20px;
          position: relative;
        }
        .folio-bullets li::before {
          content: ''; position: absolute; left: 0; top: 13px;
          width: 8px; height: 8px; border-radius: 50%; background: var(--orange);
        }
        .folio-mock {
          background: var(--surface); border-radius: 12px; padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .folio-mock-header {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 20px; color: var(--black);
          text-transform: uppercase; margin-bottom: 4px;
        }
        .folio-mock-sub { font-size: 12px; color: var(--muted); margin-bottom: 16px; }
        .folio-mock-img {
          background: var(--warm); border-radius: 8px; height: 120px;
          display: flex; align-items: center; justify-content: center;
          color: var(--muted); font-size: 13px; margin-bottom: 12px;
        }
        .folio-mock-review {
          display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
        }
        .folio-mock-stars { color: #f59e0b; font-size: 14px; letter-spacing: 2px; }
        .folio-mock-review-text { font-size: 13px; color: var(--muted); font-style: italic; }
        .folio-mock-cta {
          display: block; width: 100%; text-align: center;
          background: var(--orange); color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800; font-size: 14px; text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 12px; border-radius: 8px; text-decoration: none;
          box-shadow: 0 4px 16px var(--orange-glow);
        }

        /* ── PRICING ── */
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 700px) { .pricing-grid { grid-template-columns: 1fr; } }
        .price-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 32px; text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .price-card.op { border-top: 4px solid var(--orange); }
        .price-card.sw { border-top: 4px solid #6366f1; }
        .price-card .plan-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 13px; text-transform: uppercase;
          letter-spacing: 2px; color: var(--muted); margin-bottom: 4px;
        }
        .price-card .price {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 48px; color: var(--black);
        }
        .price-card .price-sub { font-size: 14px; color: var(--muted); margin-bottom: 20px; }
        .price-card ul { list-style: none; text-align: left; }
        .price-card li { font-size: 14px; padding: 5px 0 5px 20px; position: relative; }
        .price-card li::before {
          content: ''; position: absolute; left: 0; top: 12px;
          width: 6px; height: 6px; border-radius: 50%; background: var(--orange);
        }
        .price-card li.miss {
          text-decoration: line-through; color: var(--muted);
        }
        .price-card li.miss::before { background: #ef4444; }
        .price-callout {
          background: var(--warm); border-radius: 12px; padding: 28px;
          margin-top: 20px;
        }
        .price-callout strong { font-weight: 700; color: var(--black); }

        /* ── TESTIMONIALS ── */
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 700px) { .test-grid { grid-template-columns: 1fr; } }
        .test-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .test-card .qt {
          font-size: 15px; line-height: 1.6; color: var(--ink); margin-bottom: 16px;
        }
        .test-card .who { font-weight: 700; font-size: 14px; color: var(--black); }
        .test-card .where { font-size: 13px; color: var(--muted); }

        /* ── FINAL CTA ── */
        .final-cta {
          background: linear-gradient(135deg, var(--orange) 0%, var(--orange-dim) 100%);
          border-radius: 16px; padding: 64px 28px; text-align: center;
        }
        .final-cta h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: clamp(36px, 5vw, 52px);
          text-transform: uppercase; color: var(--white);
          margin-bottom: 12px; line-height: 1;
        }
        .final-cta .sub { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 28px; }
        .btn-white {
          background: var(--white); color: var(--orange);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          padding: 14px 36px; border-radius: 8px; border: none;
          cursor: pointer; text-decoration: none;
          transition: transform .15s;
        }
        .btn-white:hover { transform: translateY(-1px); }
        .final-badges {
          display: flex; justify-content: center; gap: 20px;
          margin-top: 20px; flex-wrap: wrap;
        }
        .final-badges span {
          font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 500;
        }

        /* ── FOOTER ── */
        footer {
          max-width: 960px; margin: 0 auto;
          padding: 40px 28px 60px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px; font-weight: 900;
          color: var(--black); text-decoration: none;
        }
        .footer-logo span { color: var(--orange); }
        .footer-links { display: flex; gap: 20px; }
        .footer-link {
          font-size: 13px; color: var(--muted);
          text-decoration: none; transition: color .15s;
        }
        .footer-link:hover { color: var(--ink); }
        .footer-copy { font-size: 12px; color: var(--muted); width: 100%; text-align: center; margin-top: 8px; }
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <a href="/" className="nav-logo">Opervo<span>.</span></a>
        <ul className="nav-links">
          <li><a href="/#features">Features</a></li>
          <li><a href="/#folio">Folio</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="https://app.opervo.io">Demo</a></li>
          <li><a href="/guide">Guide</a></li>
        </ul>
        <a href="https://app.opervo.io" className="nav-cta">
          Start free trial
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="c-hero">
        <div className="c-hero-inner">
          <div className="eyebrow">The honest comparison</div>
          <h1>Opervo vs <em>ServiceWizard</em></h1>
          <p className="sub">
            Both built for field service operators. One gives you a portfolio that wins clients. Here&apos;s how they stack up.
          </p>
          <div className="cta-row">
            <a href="https://app.opervo.io" className="btn-primary">Start free &mdash; 14 days</a>
            <a href="https://www.opervo.io/p/solarwashatx" className="btn-ghost">See a Folio page live &rarr;</a>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ── */}
      <section className="section">
        <div className="section-eyebrow">At a glance</div>
        <h2>Two apps. Different bets.</h2>
        <div className="glance-grid">
          <div className="glance-card op">
            <h3>Opervo</h3>
            <div className="tagline">Built by someone who was on the truck. For the ones still on it.</div>
            <div className="detail"><strong>Platform:</strong> PWA (mobile-first web app)</div>
            <div className="detail"><strong>Target:</strong> Solo operators &amp; small crews</div>
            <div className="detail"><strong>Verticals:</strong> Pressure washing, window cleaning, lawn care, detailing, gutter cleaning</div>
            <div className="detail"><strong>Pricing:</strong> $24.99/mo Solo &middot; $54.99/mo Team</div>
            <div className="detail"><strong>Trial:</strong> 14-day free trial, no credit card</div>
            <div className="detail"><strong>Unique:</strong> Folio &mdash; live portfolio page that wins you clients</div>
          </div>
          <div className="glance-card sw">
            <h3>ServiceWizard</h3>
            <div className="tagline">Run your service business from your phone &mdash; like the pros you follow.</div>
            <div className="detail"><strong>Platform:</strong> Native iOS &amp; Android apps</div>
            <div className="detail"><strong>Target:</strong> Contractors following social media influencers</div>
            <div className="detail"><strong>Verticals:</strong> Pressure washing, junk removal, mobile detailing</div>
            <div className="detail"><strong>Pricing:</strong> Free tier &middot; $14.99/mo Pro</div>
            <div className="detail"><strong>Trial:</strong> Free forever tier (very limited)</div>
            <div className="detail"><strong>Unique:</strong> AI-powered quoting</div>
          </div>
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Feature breakdown</div>
        <h2>Head to head.</h2>
        <div className="comp-wrap">
          <table className="comp-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Opervo</th>
                <th>ServiceWizard</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name}>
                  <td className="fname">{f.name}</td>
                  <td><StatusIcon status={f.opervoOk} /> <span className="desc">{f.opervo}</span></td>
                  <td><StatusIcon status={f.swOk} /> <span className="desc">{f.sw}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FOLIO DIFFERENTIATOR ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="folio-section">
          <div className="folio-text">
            <div className="eyebrow">Only on Opervo</div>
            <h3>Your work sells your next job.</h3>
            <p>
              Folio is a live public page that auto-builds every time you finish a job. Before/after photos,
              client reviews, and a quote button &mdash; all in one link you drop in your Instagram bio,
              Google Business profile, or truck wrap QR code.
            </p>
            <ul className="folio-bullets">
              <li>Auto-updates with every completed job &mdash; zero extra steps</li>
              <li>Clients see your proof of work before they even call</li>
              <li>No competitor has anything like this</li>
            </ul>
            <a href="https://www.opervo.io/p/solarwashatx" className="btn-primary">See a real Folio page &rarr;</a>
          </div>
          <div className="folio-mock">
            <div className="folio-mock-header">Solar Wash ATX</div>
            <div className="folio-mock-sub">Pressure Washing &middot; Austin, TX</div>
            <div className="folio-mock-img">Before / After Gallery</div>
            <div className="folio-mock-review">
              <span className="folio-mock-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="folio-mock-review-text">&ldquo;Amazing work as always!&rdquo;</span>
            </div>
            <a href="https://www.opervo.io/p/solarwashatx" className="folio-mock-cta">Request a Quote</a>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">Pricing</div>
        <h2>What you actually get for the money.</h2>
        <div className="pricing-grid">
          <div className="price-card op">
            <div className="plan-label">Opervo Solo</div>
            <div className="price">$24.99</div>
            <div className="price-sub">/month &middot; 14 days free</div>
            <ul>
              <li>Unlimited jobs &amp; invoices</li>
              <li>Live Folio portfolio page</li>
              <li>Client management</li>
              <li>Google Calendar sync</li>
              <li>Review automation</li>
              <li>Recurring jobs</li>
              <li>Profit tracking</li>
            </ul>
          </div>
          <div className="price-card sw">
            <div className="plan-label">ServiceWizard Pro</div>
            <div className="price">$14.99</div>
            <div className="price-sub">/month &middot; Free tier also available (very limited)</div>
            <ul>
              <li>Unlimited AI analyses</li>
              <li>Unlimited CRM &amp; quotes</li>
              <li>Unlimited jobs &amp; receipts</li>
              <li>Free business website</li>
              <li>SMS messages</li>
              <li className="miss">Live portfolio page</li>
              <li className="miss">Review automation</li>
              <li className="miss">Profit tracking</li>
              <li className="miss">Team features</li>
            </ul>
          </div>
        </div>
        <div className="price-callout">
          <strong>The $10/mo difference?</strong>{' '}
          For $10 more per month, you get a live portfolio that brings in clients, automatic Google reviews,
          profit tracking, recurring job support, and room to grow into a team plan. ServiceWizard gives you
          AI quoting and SMS &mdash; but no way to turn your work into new business.
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow">From real operators</div>
        <h2>Why they switched.</h2>
        <div className="test-grid">
          {testimonials.map((t) => (
            <div className="test-card" key={t.name}>
              <div className="qt">&ldquo;{t.quote}&rdquo;</div>
              <div className="who">{t.name}</div>
              <div className="where">{t.trade} &middot; {t.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="final-cta">
          <h2>Try Opervo free for 14 days.</h2>
          <p className="sub">No credit card. No demo call. Live in 90 seconds.</p>
          <a href="https://app.opervo.io" className="btn-white">Start free trial</a>
          <div className="final-badges">
            <span>No credit card</span>
            <span>&middot;</span>
            <span>No demo call</span>
            <span>&middot;</span>
            <span>14 days free</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <a href="/" className="footer-logo">Opervo<span>.</span></a>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/tos" className="footer-link">Terms</a>
          <a href="/guide" className="footer-link">User Guide</a>
          <a href="mailto:help@opervo.io" className="footer-link">Contact</a>
        </div>
        <div className="footer-copy">&copy; 2026 Opervo. Built for the trades.</div>
      </footer>
    </>
  )
}
