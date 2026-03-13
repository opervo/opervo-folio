'use client'
import { useEffect, useState } from 'react'

const FEATURES = [
  { icon: '📋', title: 'Jobs & Scheduling', desc: 'Create jobs, assign dates, track status from new to complete. Everything in one place — no spreadsheets.' },
  { icon: '💰', title: 'Estimates & Invoices', desc: 'Send professional estimates in seconds. Convert to invoices with one tap. Get paid faster.' },
  { icon: '🌐', title: 'Public Portfolio', desc: 'Your own branded folio at opervo.io/p/you — show your work, collect quote requests, build trust.' },
  { icon: '👥', title: 'Client Management', desc: 'Full client history, notes, and a portal with magic links so clients can check their own jobs.' },
  { icon: '🔄', title: 'Recurring Jobs', desc: 'Set weekly, bi-weekly, or monthly schedules. Opervo auto-generates jobs so nothing slips.' },
  { icon: '📅', title: 'Google Calendar Sync', desc: 'Two-way sync keeps your phone calendar and Opervo in perfect lockstep, always.' },
  { icon: '⭐', title: 'Review Automation', desc: 'Auto-send review requests when a job completes. Build your reputation on autopilot.' },
  { icon: '👷', title: 'Team Accounts', desc: 'Add crew members with role-based permissions. Scale from solo to squad without the chaos.' },
]

const PRICING = [
  {
    name: 'Solo', price: '$24.99', highlight: false,
    desc: 'Everything you need to run your operation solo.',
    features: ['Unlimited jobs & invoices', 'Public portfolio page', 'Client portal', 'Google Calendar sync', 'Review automation', 'Recurring jobs', 'CSV export'],
  },
  {
    name: 'Team', price: '$54.99', highlight: true,
    desc: 'For operators with crew. Full control, full visibility.',
    features: ['Everything in Solo', 'Up to 5 team members', 'Role-based permissions', 'Team scheduling view', 'Job completion emails', 'Priority support'],
  },
]

const STEPS = [
  {n:'01',t:'Sign up free',d:'Create your account on any device. No credit card needed. Your dashboard is live immediately.'},
  {n:'02',t:'Add your first job',d:'Enter a client, service, and date. Track everything from quote to payment in one place.'},
  {n:'03',t:'Share your portfolio',d:'Your public folio is live at opervo.io/p/your-slug. Share the link and start getting quote requests.'},
  {n:'04',t:'Get paid',d:'Send invoices from the field. Clients get a clean portal. You get paid faster.'},
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
        :root{
          --blue:#1A6BF0;--blue-dim:#1255c4;--blue-glow:rgba(26,107,240,0.35);
          --navy:#0D1B3E;--navy-light:#132247;
          --white:#ffffff;--muted:rgba(255,255,255,0.5);
          --border:rgba(255,255,255,0.08);--card:rgba(255,255,255,0.04);
        }
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 48px;display:flex;align-items:center;justify-content:space-between;transition:background 0.3s}
        nav.scrolled{background:rgba(13,27,62,0.93);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
        .logo{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:var(--white);text-decoration:none;letter-spacing:-0.5px}
        .logo span{color:var(--blue)}
        .nav-btn{background:var(--blue);color:var(--white);font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;padding:10px 24px;border-radius:8px;text-decoration:none;transition:background 0.2s,transform 0.15s}
        .nav-btn:hover{background:var(--blue-dim);transform:translateY(-1px)}
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden}
        .hero-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(26,107,240,0.18) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 80% 80%,rgba(26,107,240,0.08) 0%,transparent 60%)}
        .hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)}
        .hero-inner{position:relative;z-index:1;max-width:800px}
        .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(26,107,240,0.15);border:1px solid rgba(26,107,240,0.3);color:#6fa8ff;font-size:13px;font-weight:500;padding:6px 16px;border-radius:100px;margin-bottom:32px;animation:fadeUp 0.6s ease both}
        .badge-dot{width:6px;height:6px;border-radius:50%;background:#6fa8ff;animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(40px,7vw,82px);line-height:1.04;letter-spacing:-2px;margin-bottom:24px;animation:fadeUp 0.6s 0.1s ease both}
        h1 em{font-style:normal;color:var(--blue)}
        .hero-sub{font-size:clamp(16px,2vw,20px);font-weight:300;color:rgba(255,255,255,0.65);line-height:1.65;max-width:560px;margin:0 auto 44px;animation:fadeUp 0.6s 0.2s ease both}
        .hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;animation:fadeUp 0.6s 0.3s ease both}
        .btn-primary{background:var(--blue);color:var(--white);font-family:'DM Sans',sans-serif;font-weight:600;font-size:16px;padding:16px 36px;border-radius:10px;text-decoration:none;box-shadow:0 0 40px var(--blue-glow);transition:background 0.2s,transform 0.15s,box-shadow 0.2s;display:inline-flex;align-items:center;gap:10px}
        .btn-primary:hover{background:var(--blue-dim);transform:translateY(-2px);box-shadow:0 0 64px var(--blue-glow)}
        .btn-ghost{background:transparent;color:rgba(255,255,255,0.75);font-family:'DM Sans',sans-serif;font-weight:500;font-size:16px;padding:16px 36px;border-radius:10px;border:1px solid rgba(255,255,255,0.14);text-decoration:none;transition:border-color 0.2s,color 0.2s,transform 0.15s}
        .btn-ghost:hover{border-color:rgba(255,255,255,0.35);color:var(--white);transform:translateY(-2px)}
        .hero-note{margin-top:20px;font-size:13px;color:var(--muted);animation:fadeUp 0.6s 0.4s ease both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .stats-bar{display:flex;justify-content:center;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:rgba(255,255,255,0.02)}
        .stat{flex:1;max-width:240px;padding:28px 24px;text-align:center;border-right:1px solid var(--border)}
        .stat:last-child{border-right:none}
        .stat-num{font-family:'Syne',sans-serif;font-weight:800;font-size:30px;letter-spacing:-1px}
        .stat-label{font-size:13px;color:var(--muted);margin-top:4px}
        .ticker{overflow:hidden;padding:12px 0;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.015)}
        .ticker-track{display:flex;gap:48px;width:max-content;animation:ticker 22s linear infinite}
        .ticker-item{font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap;display:flex;align-items:center;gap:12px}
        .ticker-item::before{content:'—';color:var(--blue)}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .section{padding:100px 24px}
        .inner{max-width:1100px;margin:0 auto}
        .sec-label{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--blue);margin-bottom:14px}
        h2{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(30px,4.5vw,52px);letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .sec-sub{font-size:18px;font-weight:300;color:rgba(255,255,255,0.55);max-width:480px;line-height:1.6;margin-bottom:60px}
        .features-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden}
        .feat{background:var(--navy);padding:32px 28px;transition:background 0.2s}
        .feat:hover{background:var(--navy-light)}
        .feat-icon{font-size:26px;margin-bottom:16px}
        .feat-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;margin-bottom:10px}
        .feat-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65}
        .how-section{background:rgba(255,255,255,0.015);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:48px}
        .step-n{font-family:'Syne',sans-serif;font-weight:800;font-size:52px;color:rgba(26,107,240,0.2);line-height:1;margin-bottom:16px}
        .step-title{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;margin-bottom:10px}
        .step-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65}
        .pricing-section{background:rgba(26,107,240,0.03);border-top:1px solid var(--border)}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px;max-width:740px}
        .pc{border:1px solid var(--border);border-radius:20px;padding:40px 36px;background:var(--card);position:relative;overflow:hidden}
        .pc.hi{border-color:var(--blue);background:rgba(26,107,240,0.09);box-shadow:0 0 60px rgba(26,107,240,0.18)}
        .pc-badge{position:absolute;top:20px;right:20px;background:var(--blue);color:var(--white);font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 12px;border-radius:100px}
        .pc-name{font-family:'Syne',sans-serif;font-weight:800;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
        .pc-price{font-family:'Syne',sans-serif;font-weight:800;font-size:54px;letter-spacing:-2px;line-height:1;margin-bottom:4px}
        .pc-mo{font-size:14px;color:var(--muted);margin-bottom:16px}
        .pc-desc{font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:28px;line-height:1.55}
        .pc-feats{list-style:none;margin-bottom:32px;display:flex;flex-direction:column;gap:10px}
        .pc-feats li{font-size:13px;color:rgba(255,255,255,0.7);display:flex;align-items:flex-start;gap:10px}
        .pc-feats li::before{content:'✓';color:var(--blue);font-weight:700;flex-shrink:0;margin-top:1px}
        .pc-btn{display:block;text-align:center;text-decoration:none;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;padding:14px;border-radius:10px;transition:transform 0.15s,box-shadow 0.2s}
        .pc.hi .pc-btn{background:var(--blue);color:var(--white);box-shadow:0 0 28px var(--blue-glow)}
        .pc:not(.hi) .pc-btn{border:1px solid var(--border);color:var(--white);background:rgba(255,255,255,0.05)}
        .pc-btn:hover{transform:translateY(-2px)}
        .bottom-cta{text-align:center;padding:120px 24px;background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(26,107,240,0.18) 0%,transparent 70%);border-top:1px solid var(--border)}
        .bottom-cta h2{margin-bottom:20px}
        .bottom-cta p{font-size:18px;color:rgba(255,255,255,0.55);margin-bottom:44px;max-width:420px;margin-left:auto;margin-right:auto;line-height:1.6}
        footer{padding:40px 48px 36px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
        .footer-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:var(--white);text-decoration:none}
        .footer-logo span{color:var(--blue)}
        .footer-links{display:flex;gap:28px}
        .footer-links a{font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.2s}
        .footer-links a:hover{color:var(--white)}
        .footer-copy{font-size:12px;color:rgba(255,255,255,0.22);width:100%}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.6s ease,transform 0.6s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}
        @media(max-width:640px){
          nav{padding:16px 20px}
          .section{padding:72px 20px}
          footer{padding:36px 20px 28px;flex-direction:column;align-items:flex-start}
          h1{letter-spacing:-1px}
          .stats-bar{flex-wrap:wrap}
          .stat{flex:1 1 45%;border-right:none;border-bottom:1px solid var(--border)}
        }
      `}</style>

      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="logo">Opervo<span>.</span></a>
        <a href="https://app.opervo.io" className="nav-btn">Start free trial</a>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="badge"><span className="badge-dot" />Now in beta — limited spots open</div>
          <h1>Run your trades business<br /><em>like a pro.</em></h1>
          <p className="hero-sub">Jobs, estimates, invoices, scheduling, client portal, and a public portfolio that wins you clients — built mobile-first for solo operators and small crews.</p>
          <div className="hero-btns">
            <a href="https://app.opervo.io" className="btn-primary">
              Start free trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/p/demo" className="btn-ghost">See a live folio →</a>
          </div>
          <p className="hero-note">No credit card required · 14-day free trial</p>
        </div>
      </section>

      <div className="stats-bar">
        {[['2 min','to send first invoice'],['100%','mobile-first PWA'],['Free','14-day trial'],['$0','to get started']].map(([n,l]) => (
          <div key={l} className="stat"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {['Window Cleaning','Solar Panel Cleaning','Pressure Washing','Lawn Care','Pool Service','Gutter Cleaning','Exterior Detailing','Roof Washing','Window Cleaning','Solar Panel Cleaning','Pressure Washing','Lawn Care','Pool Service','Gutter Cleaning','Exterior Detailing','Roof Washing'].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      <section className="section" id="features">
        <div className="inner">
          <p className="sec-label reveal">Everything you need</p>
          <h2 className="reveal d1">One app.<br />Your whole operation.</h2>
          <p className="sec-sub reveal d2">Stop duct-taping together Google Sheets, texts, and paper invoices. Opervo replaces all of it.</p>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feat reveal d${(i % 3) + 1}`}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="how">
        <div className="inner">
          <p className="sec-label reveal">How it works</p>
          <h2 className="reveal d1">Up and running<br />in 5 minutes.</h2>
          <p className="sec-sub reveal d2">No training. No onboarding call. Just sign up and go.</p>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`reveal d${(i % 3) + 1}`}>
                <div className="step-n">{s.n}</div>
                <div className="step-title">{s.t}</div>
                <div className="step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="inner">
          <p className="sec-label reveal">Pricing</p>
          <h2 className="reveal d1">Simple, honest pricing.</h2>
          <p className="sec-sub reveal d2">No hidden fees. No per-job charges. Cancel any time.</p>
          <div className="pricing-grid">
            {PRICING.map((plan, i) => (
              <div key={i} className={`pc reveal d${i + 1}${plan.highlight ? ' hi' : ''}`}>
                {plan.highlight && <span className="pc-badge">Most Popular</span>}
                <div className="pc-name">{plan.name}</div>
                <div className="pc-price">{plan.price}</div>
                <div className="pc-mo">/month</div>
                <div className="pc-desc">{plan.desc}</div>
                <ul className="pc-feats">{plan.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
                <a href="https://app.opervo.io" className="pc-btn">Start free trial</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <h2 className="reveal">Ready to run a<br />tighter operation?</h2>
        <p className="reveal d1">Join operators using Opervo to win more jobs, get paid faster, and look like a pro.</p>
        <a href="https://app.opervo.io" className="btn-primary reveal d2" style={{display:'inline-flex'}}>
          Start free trial — no card needed
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </section>

      <footer>
        <a href="/" className="footer-logo">Opervo<span>.</span></a>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/p/demo">Demo Folio</a>
          <a href="https://app.opervo.io">Sign in</a>
          <a href="/privacy">Privacy</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Opervo. Built for the trades.</p>
      </footer>
    </>
  )
}
