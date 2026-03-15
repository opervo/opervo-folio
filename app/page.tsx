'use client'
import { useEffect, useState } from 'react'

const FEATURES = [
  { icon: '📋', title: 'Jobs & Scheduling', desc: 'Create jobs, assign dates, track status from new to complete. No spreadsheets.' },
  { icon: '💰', title: 'Estimates & Invoices', desc: 'Send professional estimates in seconds. Convert to invoices with one tap.' },
  { icon: '🌐', title: 'Public Portfolio', desc: 'Your own branded folio page. Show your work, collect quote requests, build trust.' },
  { icon: '👥', title: 'Client Management', desc: 'Full client history, notes, and a portal with magic links for your clients.' },
  { icon: '🔄', title: 'Recurring Jobs', desc: 'Set weekly, bi-weekly, or monthly schedules. Nothing slips.' },
  { icon: '📅', title: 'Calendar Sync', desc: 'Two-way Google Calendar sync. Your schedule, always in lockstep.' },
  { icon: '⭐', title: 'Review Automation', desc: 'Auto-send review requests when a job completes. Build your rep on autopilot.' },
  { icon: '👷', title: 'Team Accounts', desc: 'Add crew with role-based permissions. Scale from solo to squad.' },
]

const COMPETITORS = [
  { name: 'Jobber', price: '$49', perMonth: true },
  { name: 'Housecall Pro', price: '$65', perMonth: true },
  { name: 'ServiceTitan', price: '$125', perMonth: true },
  { name: 'Opervo', price: '$24.99', perMonth: true, highlight: true },
]

const FOLIO_FEATURES = [
  { icon: '📸', text: 'Before & after photo slider' },
  { icon: '⭐', text: 'Live Google rating badge' },
  { icon: '🗂️', text: 'Your services & pricing' },
  { icon: '📬', text: 'Quote request form built in' },
  { icon: '📍', text: 'Google Maps address autocomplete' },
  { icon: '🔗', text: 'One link. Share anywhere.' },
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
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
        :root{
          --orange:#F5620F;--orange-dim:#d94e08;--orange-glow:rgba(245,98,15,0.25);
          --black:#0F0F0F;--ink:#1a1a1a;--ink-2:#2d2d2d;
          --white:#ffffff;--off:#F7F5F2;--warm:#EDE9E3;
          --muted:#6B6B6B;--rule:#E0DBD4;
          --blue:#1A6BF0;
        }
        html{scroll-behavior:smooth}
        body{font-family:'Barlow',sans-serif;background:var(--white);color:var(--ink);overflow-x:hidden}

        /* NAV */
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 48px;display:flex;align-items:center;justify-content:space-between;transition:background 0.3s,box-shadow 0.3s;background:rgba(255,255,255,0.95)}
        nav.scrolled{box-shadow:0 1px 0 var(--rule);backdrop-filter:blur(12px)}
        .logo{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:26px;color:var(--black);text-decoration:none;letter-spacing:-0.5px}
        .logo span{color:var(--orange)}
        .nav-links{display:flex;align-items:center;gap:32px}
        .nav-links a{font-size:14px;font-weight:500;color:var(--muted);text-decoration:none;transition:color 0.2s}
        .nav-links a:hover{color:var(--ink)}
        .nav-cta{background:var(--orange);color:var(--white);font-family:'Barlow',sans-serif;font-weight:600;font-size:14px;padding:10px 24px;border-radius:6px;text-decoration:none;transition:background 0.2s,transform 0.15s}
        .nav-cta:hover{background:var(--orange-dim);transform:translateY(-1px)}

        /* HERO */
        .hero{min-height:100vh;display:flex;align-items:center;padding:120px 48px 80px;background:var(--off);position:relative;overflow:hidden}
        .hero-bg-lines{position:absolute;inset:0;opacity:0.04;background-image:repeating-linear-gradient(0deg,var(--black) 0,var(--black) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,var(--black) 0,var(--black) 1px,transparent 1px,transparent 60px)}
        .hero-accent{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(245,98,15,0.08) 0%,transparent 70%)}
        .hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1}
        .hero-left{}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:var(--white);font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;padding:6px 14px;border-radius:4px;margin-bottom:24px;animation:fadeUp 0.5s ease both}
        h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(52px,6vw,86px);line-height:0.95;letter-spacing:-1px;color:var(--black);margin-bottom:24px;animation:fadeUp 0.5s 0.1s ease both;text-transform:uppercase}
        h1 em{font-style:normal;color:var(--orange)}
        h1 .small{font-size:0.55em;display:block;letter-spacing:0.05em;color:var(--muted);font-weight:600;text-transform:none;margin-bottom:4px}
        h1 .tagline{font-size:0.38em;display:block;letter-spacing:0.14em;color:var(--orange);font-weight:700;text-transform:uppercase;margin-top:8px}
        .hero-sub{font-size:18px;font-weight:300;color:var(--muted);line-height:1.65;max-width:480px;margin-bottom:36px;animation:fadeUp 0.5s 0.2s ease both}
        .hero-btns{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp 0.5s 0.3s ease both}
        .btn-primary{background:var(--orange);color:var(--white);font-family:'Barlow',sans-serif;font-weight:700;font-size:16px;padding:16px 36px;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;box-shadow:0 4px 24px var(--orange-glow);transition:background 0.2s,transform 0.15s,box-shadow 0.2s}
        .btn-primary:hover{background:var(--orange-dim);transform:translateY(-2px);box-shadow:0 8px 32px var(--orange-glow)}
        .btn-ghost{background:transparent;color:var(--ink);font-family:'Barlow',sans-serif;font-weight:600;font-size:16px;padding:16px 36px;border-radius:6px;border:2px solid var(--rule);text-decoration:none;transition:border-color 0.2s,transform 0.15s}
        .btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
        .hero-note{margin-top:16px;font-size:13px;color:var(--muted);animation:fadeUp 0.5s 0.4s ease both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

        /* PHONE MOCKUP */
        .hero-right{display:flex;justify-content:center;align-items:center;position:relative;animation:fadeUp 0.6s 0.2s ease both}
        .phone-wrap{position:relative;width:280px}
        .phone-frame{background:var(--black);border-radius:44px;padding:12px;box-shadow:0 40px 80px rgba(0,0,0,0.25),0 0 0 1px rgba(255,255,255,0.1);position:relative}
        .phone-notch{width:100px;height:28px;background:var(--black);border-radius:0 0 18px 18px;position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:2}
        .phone-screen{border-radius:34px;overflow:hidden;background:#f0f0f0;aspect-ratio:9/19.5}
        .phone-screen img{width:100%;height:100%;object-fit:cover;object-position:top}
        .phone-float{position:absolute;right:-60px;top:40px;background:var(--white);border-radius:12px;padding:12px 16px;box-shadow:0 8px 32px rgba(0,0,0,0.12);min-width:160px;animation:float 3s ease-in-out infinite}
        .phone-float-2{position:absolute;left:-50px;bottom:60px;background:var(--white);border-radius:12px;padding:12px 16px;box-shadow:0 8px 32px rgba(0,0,0,0.12);animation:float 3.5s 0.5s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .float-label{font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
        .float-value{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:22px;color:var(--ink)}
        .float-sub{font-size:11px;color:var(--muted);margin-top:2px}
        .float-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;margin-right:6px}

        /* PROOF BAR */
        .proof-bar{background:var(--black);padding:20px 48px;display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
        .proof-item{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase}
        .proof-item strong{color:var(--white)}
        .proof-divider{width:1px;height:24px;background:rgba(255,255,255,0.15)}

        /* PRICE CALLOUT */
        .price-section{background:var(--orange);padding:80px 48px;position:relative;overflow:hidden}
        .price-bg{position:absolute;inset:0;opacity:0.08;background-image:repeating-linear-gradient(45deg,var(--white) 0,var(--white) 1px,transparent 1px,transparent 20px)}
        .price-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1}
        .price-left h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(36px,5vw,64px);text-transform:uppercase;color:var(--white);line-height:0.95;letter-spacing:-1px;margin-bottom:16px}
        .price-left p{font-size:18px;color:rgba(255,255,255,0.8);line-height:1.6;max-width:400px}
        .comp-table{background:rgba(0,0,0,0.2);border-radius:16px;overflow:hidden}
        .comp-row{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.1)}
        .comp-row:last-child{border-bottom:none}
        .comp-row.highlight{background:rgba(255,255,255,0.15)}
        .comp-name{font-size:15px;font-weight:600;color:rgba(255,255,255,0.7)}
        .comp-row.highlight .comp-name{color:var(--white);font-weight:700}
        .comp-price{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:22px;color:rgba(255,255,255,0.6)}
        .comp-row.highlight .comp-price{color:var(--white);font-size:28px}
        .comp-badge{background:var(--white);color:var(--orange);font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:3px 10px;border-radius:100px}

        /* FOLIO SECTION */
        .folio-section{padding:100px 48px;background:var(--off)}
        .folio-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .folio-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:16px}
        .folio-inner h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(36px,4.5vw,58px);line-height:0.95;letter-spacing:-1px;text-transform:uppercase;color:var(--black);margin-bottom:16px}
        .folio-inner h2 em{font-style:normal;color:var(--orange)}
        .folio-sub{font-size:17px;font-weight:300;color:var(--muted);line-height:1.65;margin-bottom:36px;max-width:460px}
        .folio-feats{display:flex;flex-direction:column;gap:12px;margin-bottom:36px}
        .folio-feat{display:flex;align-items:center;gap:12px;font-size:15px;font-weight:500;color:var(--ink)}
        .folio-feat-icon{width:36px;height:36px;background:var(--warm);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
        .folio-screens{position:relative}
        .folio-phone-main{background:var(--black);border-radius:40px;padding:10px;box-shadow:0 40px 80px rgba(0,0,0,0.2);position:relative;z-index:2;width:260px;margin:0 auto}
        .folio-phone-screen{border-radius:32px;overflow:hidden;background:#111;aspect-ratio:9/19.5}
        .folio-phone-screen img{width:100%;height:100%;object-fit:cover;object-position:top}
        .folio-phone-back{background:var(--black);border-radius:40px;padding:10px;box-shadow:0 20px 60px rgba(0,0,0,0.15);position:absolute;top:30px;right:-40px;z-index:1;width:220px;opacity:0.7}
        .folio-phone-back-screen{border-radius:32px;overflow:hidden;background:#111;aspect-ratio:9/19.5}
        .folio-phone-back-screen img{width:100%;height:100%;object-fit:cover;object-position:top}

        /* CLIENT IMPORT */
        .import-section{padding:100px 48px;background:var(--white);border-top:1px solid rgba(0,0,0,0.06)}
        .section-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .import-steps{display:flex;flex-direction:column;gap:14px;margin-top:28px}
        .import-step{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:var(--ink)}
        .step-num{width:28px;height:28px;border-radius:50%;background:var(--orange);color:white;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .import-visual{background:var(--off);border-radius:16px;padding:24px;border:1px solid rgba(0,0,0,0.08)}
        .import-label-top{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
        .csv-row{display:flex;align-items:center;justify-content:space-between;background:var(--white);border-radius:8px;padding:10px 14px;margin-bottom:8px;border:1px solid rgba(0,0,0,0.06)}
        .csv-name{font-size:13px;font-weight:600;color:var(--ink)}
        .csv-detail{font-size:11px;color:var(--muted);margin-top:2px}
        .csv-check{width:20px;height:20px;border-radius:50%;background:#22c55e;color:white;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
        .csv-more{font-size:11px;color:var(--muted);text-align:center;padding:4px 0}
        .import-arrow{text-align:center;font-size:22px;color:var(--orange);font-weight:900;margin:10px 0}
        .import-count{background:var(--orange);color:white;border-radius:10px;padding:12px 16px;text-align:center}
        .import-count strong{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:22px;display:block;letter-spacing:-0.5px}
        .import-count span{font-size:12px;opacity:0.85}
        @media(max-width:768px){.section-inner{grid-template-columns:1fr;gap:40px}.import-section{padding:72px 20px}}
        /* FEATURES */
        .features-section{padding:100px 48px;background:var(--white)}
        .features-inner{max-width:1100px;margin:0 auto}
        .sec-eyebrow{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:16px}
        .features-inner h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(36px,4.5vw,58px);line-height:0.95;letter-spacing:-1px;text-transform:uppercase;color:var(--black);margin-bottom:16px}
        .sec-sub{font-size:18px;font-weight:300;color:var(--muted);max-width:480px;line-height:1.6;margin-bottom:60px}
        .feats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:2px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden}
        .feat-card{background:var(--white);padding:28px 24px;transition:background 0.2s}
        .feat-card:hover{background:var(--off)}
        .feat-icon{font-size:24px;margin-bottom:14px}
        .feat-title{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:18px;letter-spacing:-0.3px;margin-bottom:8px;color:var(--black)}
        .feat-desc{font-size:13px;color:var(--muted);line-height:1.6}

        /* PRICING */
        .pricing-section{padding:100px 48px;background:var(--off)}
        .pricing-inner{max-width:1100px;margin:0 auto}
        .pricing-inner h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(36px,4.5vw,58px);line-height:0.95;letter-spacing:-1px;text-transform:uppercase;color:var(--black);margin-bottom:16px}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:700px;margin-top:48px}
        .plan-card{background:var(--white);border:2px solid var(--rule);border-radius:16px;padding:36px 32px;position:relative}
        .plan-card.hi{border-color:var(--orange);background:var(--white);box-shadow:0 0 0 4px var(--orange-glow)}
        .plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--orange);color:var(--white);font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:4px 14px;border-radius:100px;white-space:nowrap}
        .plan-name{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
        .plan-price{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:56px;letter-spacing:-2px;line-height:1;color:var(--black);margin-bottom:4px}
        .plan-mo{font-size:14px;color:var(--muted);margin-bottom:16px}
        .plan-desc{font-size:14px;color:var(--muted);margin-bottom:24px;line-height:1.55}
        .plan-feats{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
        .plan-feats li{font-size:14px;color:var(--ink);display:flex;align-items:flex-start;gap:10px}
        .plan-feats li::before{content:'✓';color:var(--orange);font-weight:800;flex-shrink:0;margin-top:1px}
        .plan-btn{display:block;text-align:center;text-decoration:none;font-family:'Barlow',sans-serif;font-weight:700;font-size:15px;padding:14px;border-radius:8px;transition:transform 0.15s}
        .plan-card.hi .plan-btn{background:var(--orange);color:var(--white);box-shadow:0 4px 20px var(--orange-glow)}
        .plan-card:not(.hi) .plan-btn{border:2px solid var(--rule);color:var(--ink)}
        .plan-btn:hover{transform:translateY(-2px)}

        /* BOTTOM CTA */
        .bottom-cta{background:var(--black);padding:120px 48px;text-align:center;position:relative;overflow:hidden}
        .bottom-cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 100%,rgba(245,98,15,0.15) 0%,transparent 70%)}
        .bottom-cta h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(40px,6vw,80px);text-transform:uppercase;letter-spacing:-1px;color:var(--white);line-height:0.95;margin-bottom:20px;position:relative;z-index:1}
        .bottom-cta h2 em{font-style:normal;color:var(--orange)}
        .bottom-cta p{font-size:18px;color:rgba(255,255,255,0.55);margin-bottom:44px;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.6;position:relative;z-index:1}

        /* FOOTER */
        footer{padding:36px 48px;border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:var(--white)}
        .footer-logo{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:22px;color:var(--black);text-decoration:none}
        .footer-logo span{color:var(--orange)}
        .footer-links{display:flex;gap:28px}
        .footer-links a{font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.2s}
        .footer-links a:hover{color:var(--ink)}
        .footer-copy{font-size:12px;color:rgba(0,0,0,0.3);width:100%}

        /* REVEAL */
        .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}

        @media(max-width:768px){
          nav{padding:14px 20px}
          .nav-links{display:none}
          .hero{padding:100px 20px 60px}
          .hero-inner{grid-template-columns:1fr;gap:48px}
          .hero-right{order:-1}
          .phone-float,.phone-float-2{display:none}
          .price-inner,.folio-inner{grid-template-columns:1fr;gap:48px}
          .price-section,.folio-section,.features-section,.pricing-section,.bottom-cta{padding:72px 20px}
          .proof-bar{padding:16px 20px;gap:24px}
          footer{padding:32px 20px;flex-direction:column;align-items:flex-start}
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="logo">Opervo<span>.</span></a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#folio">Folio</a>
          <a href="#pricing">Pricing</a>
          <a href="/p/demo">Demo</a>
        </div>
        <a href="https://app.opervo.io" className="nav-cta">Start free trial</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-lines" />
        <div className="hero-accent" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">🔧 Built for the trades</div>
            <h1>
              <span className="small">The field service app</span>
              Run a tight<br />operation.<br /><em>Look pro.</em>
            </h1>
            <p className="hero-sub">
              Jobs, estimates, invoices, scheduling, and a public portfolio that wins you clients. Built by a solo operator — for solo operators and small crews.
            </p>
            <div className="hero-btns">
              <a href="https://app.opervo.io" className="btn-primary">
                Start free trial →
              </a>
              <a href="/p/demo" className="btn-ghost">See a live folio</a>
            </div>
            <p className="hero-note">No credit card required · 14-day free trial · Cancel any time</p>
          </div>
          <div className="hero-right">
            <div className="phone-wrap">
              <div className="phone-float">
                <div className="float-label">New lead 🔔</div>
                <div className="float-value">Quote Req.</div>
                <div className="float-sub">Window Cleaning · 2 min ago</div>
              </div>
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <img src="/screenshots/dashboard.png" alt="Opervo dashboard — jobs, revenue, quick actions" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
                </div>
              </div>
              <div className="phone-float-2">
                <div className="float-label"><span className="float-dot"/>Live folio</div>
                <div className="float-value">4.9 ★</div>
                <div className="float-sub">opervo.io/p/you</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="proof-bar">
        <div className="proof-item"><strong>$24.99</strong>/mo — less than half the competition</div>
        <div className="proof-divider" />
        <div className="proof-item"><strong>100%</strong> mobile-first PWA</div>
        <div className="proof-divider" />
        <div className="proof-item"><strong>Free</strong> 14-day trial</div>
        <div className="proof-divider" />
        <div className="proof-item">Built <strong>by the little guy</strong>, for the little guy</div>
      </div>

      {/* PRICE CALLOUT */}
      <section className="price-section">
        <div className="price-bg" />
        <div className="price-inner">
          <div className="price-left reveal">
            <h2>Half the price.<br />All the power.</h2>
            <p style={{marginTop:'16px'}}>The big guys charge $50–$125/month for the same features. We charge $24.99. No investor markup. No enterprise bloat. Just a tool that works.</p>
          </div>
          <div className="comp-table reveal d1">
            {COMPETITORS.map((c, i) => (
              <div key={i} className={`comp-row${c.highlight ? ' highlight' : ''}`}>
                <div className="comp-name">{c.name}{c.highlight && <span style={{marginLeft:'8px',fontSize:'12px',opacity:0.7}}>← you</span>}</div>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div className="comp-price">{c.price}<span style={{fontSize:'13px',fontWeight:400,opacity:0.6}}>/mo</span></div>
                  {c.highlight && <span className="comp-badge">Best value</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLIO SECTION */}
      <section className="folio-section" id="folio">
        <div className="folio-inner">
          <div className="reveal">
            <p className="folio-label">The feature that sets us apart</p>
            <h2>Your own<br /><em>public folio.</em><br />No one else<br />has this.</h2>
            <p className="folio-sub">Every Opervo operator gets a branded public page at <strong>opervo.io/p/you</strong>. Share it on Instagram, put it in your bio, text it to leads. Clients can see your work and request a quote in 60 seconds.</p>
            <div className="folio-feats">
              {FOLIO_FEATURES.map((f, i) => (
                <div key={i} className="folio-feat">
                  <div className="folio-feat-icon">{f.icon}</div>
                  {f.text}
                </div>
              ))}
            </div>
            <a href="/p/demo" className="btn-primary" style={{display:'inline-flex'}}>See a live folio →</a>
          </div>
          <div className="folio-screens reveal d2">
            <div style={{position:'relative',height:'520px',display:'flex',justifyContent:'center'}}>
              <div className="folio-phone-back" style={{top:'40px',right:'20px'}}>
                <div className="folio-phone-back-screen">
                  <img src="/screenshots/folio-quote.jpg" alt="Opervo folio quote request form" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
                </div>
              </div>
              <div className="folio-phone-main" style={{position:'absolute',left:'20px',top:'0'}}>
                <div className="folio-phone-screen">
                  <img src="/screenshots/folio-hero.jpg" alt="Opervo public folio page — Solar Wash ATX" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CLIENT IMPORT */}
      <section className="import-section">
        <div className="section-inner">
          <div className="reveal">
            <p className="sec-eyebrow">Switching is painless</p>
            <h2>Bring your<br /><em>existing clients.</em><br />Zero hassle.</h2>
            <p className="sec-sub" style={{maxWidth:'440px'}}>Already running a client list in a spreadsheet, Google Contacts, or another app? Import your entire client base in minutes. No manual re-entry. No starting from scratch.</p>
            <div className="import-steps">
              {[
                {n:'1',t:'Export from anywhere',d:'Google Contacts, Jobber, Housecall Pro, or any spreadsheet'},
                {n:'2',t:'Upload your CSV',d:'Opervo maps your columns automatically'},
                {n:'3',t:'Done.',d:'Your full client list is live and ready to schedule'},
              ].map((s,i) => (
                <div key={i} className="import-step">
                  <div className="step-num">{s.n}</div>
                  <div><strong>{s.t}</strong> — {s.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="import-visual reveal d2">
            <div className="import-label-top">clients.csv</div>
            {['Sarah Mitchell','Marcus Johnson','Elena Rodriguez'].map((n,i) => (
              <div key={i} className="csv-row">
                <div>
                  <div className="csv-name">{n}</div>
                  <div className="csv-detail">{['sarah','marcus','elena'][i]}@email.com</div>
                </div>
                <div className="csv-check">✓</div>
              </div>
            ))}
            <div className="csv-more">+ 47 more clients...</div>
            <div className="import-arrow">↓</div>
            <div className="import-count">
              <strong>50 clients imported</strong>
              <span>Ready to schedule in Opervo</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <p className="sec-eyebrow reveal">Everything you need</p>
          <h2 className="reveal d1">One app.<br />Your whole operation.</h2>
          <p className="sec-sub reveal d2">Stop duct-taping together Google Sheets, texts, and paper invoices. Opervo replaces all of it.</p>
          <div className="feats-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feat-card reveal d${(i % 3) + 1}`}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <p className="sec-eyebrow reveal">Pricing</p>
          <h2 className="reveal d1">Simple, honest pricing.</h2>
          <p className="sec-sub reveal d2">No hidden fees. No per-job charges. Cancel any time.</p>
          <div className="pricing-grid">
            {[
              {name:'Solo',price:'$24.99',desc:'Everything you need to run your operation solo.',highlight:false,
                feats:['Unlimited jobs & invoices','Public portfolio page','Client portal','Google Calendar sync','Review automation','Recurring jobs','CSV export']},
              {name:'Team',price:'$54.99',desc:'For operators with crew. Full control, full visibility.',highlight:true,
                feats:['Everything in Solo','Up to 5 team members','Role-based permissions','Team scheduling view','Job completion emails','Priority support']},
            ].map((plan, i) => (
              <div key={i} className={`plan-card reveal d${i+1}${plan.highlight ? ' hi' : ''}`}>
                {plan.highlight && <span className="plan-badge">Most Popular</span>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">{plan.price}</div>
                <div className="plan-mo">/month</div>
                <div className="plan-desc">{plan.desc}</div>
                <ul className="plan-feats">{plan.feats.map((f,j) => <li key={j}>{f}</li>)}</ul>
                <a href="https://app.opervo.io" className="plan-btn">Start free trial</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <div className="bottom-cta-bg" />
        <h2 className="reveal">Ready to run a<br /><em>tighter operation?</em></h2>
        <p className="reveal d1">Join operators using Opervo to win more jobs, get paid faster, and look like a pro. First 14 days free.</p>
        <a href="https://app.opervo.io" className="btn-primary reveal d2" style={{display:'inline-flex',fontSize:'18px',padding:'18px 44px'}}>
          Start free trial — no card needed →
        </a>
      </section>

      {/* FOOTER */}
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
