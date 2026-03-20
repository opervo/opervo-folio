'use client'

import { useState } from 'react'

export default function GuidePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')

      // Auto-trigger download
      const link = document.createElement('a')
      link.href = '/Opervo_User_Guide.pdf'
      link.download = 'Opervo_User_Guide.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --primary: #F5620F;
          --primary-hover: #d94e08;
          --black: #0F0F0F;
          --ink: #1a1a1a;
          --muted: #6B6B6B;
          --bg: #F7F5F2;
          --surface: #FFFFFF;
          --border: #E8E4DE;
          --font-heading: 'Barlow Condensed', sans-serif;
          --font-body: 'Barlow', sans-serif;
        }

        body {
          font-family: var(--font-body);
          background: var(--black);
          color: var(--bg);
          min-height: 100vh;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 48px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          background: rgba(15,15,15,0.8);
        }
        .nav-wordmark {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 26px;
          color: #F7F5F2;
          letter-spacing: -1px;
          text-decoration: none;
        }
        .nav-wordmark span { color: var(--primary); }
        .nav-link {
          font-size: 13px;
          color: #555;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #888; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 48px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(245,98,15,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,98,15,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 80px;
          position: relative;
          z-index: 1;
        }

        .hero-left { flex: 1; }

        .hero-eyebrow {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--primary);
        }

        .hero-headline {
          font-family: var(--font-heading);
          font-size: clamp(60px, 7vw, 90px);
          font-weight: 900;
          color: #F7F5F2;
          text-transform: uppercase;
          letter-spacing: -3px;
          line-height: 0.92;
          margin-bottom: 28px;
        }
        .hero-headline span { color: var(--primary); }

        .hero-desc {
          font-size: 16px;
          color: #666;
          font-weight: 300;
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 44px;
        }

        /* FORM */
        .form-wrap {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
          max-width: 420px;
        }
        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: #444;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }
        .form-row {
          display: flex;
          gap: 10px;
        }
        .form-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 18px;
          font-family: var(--font-body);
          font-size: 14px;
          color: #F7F5F2;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .form-input::placeholder { color: #333; }
        .form-input:focus {
          border-color: rgba(245,98,15,0.4);
          background: rgba(255,255,255,0.07);
        }
        .form-btn {
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(245,98,15,0.3);
        }
        .form-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }
        .form-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .form-note {
          font-size: 11px;
          color: #333;
          margin-top: 12px;
          line-height: 1.6;
        }
        .form-error {
          font-size: 12px;
          color: #ff6b6b;
          margin-top: 10px;
        }

        /* SUCCESS STATE */
        .success-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
        .success-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 13px;
          color: #4ade80;
          font-weight: 500;
        }
        .success-title {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 900;
          color: #F7F5F2;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        .success-sub {
          font-size: 14px;
          color: #555;
          line-height: 1.7;
        }
        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(245,98,15,0.3);
          transition: background 0.2s;
        }
        .download-btn:hover { background: var(--primary-hover); }

        /* GUIDE MOCKUP */
        .hero-right {
          width: 320px;
          flex-shrink: 0;
          position: relative;
        }
        .guide-mockup {
          width: 260px;
          background: var(--black);
          border-radius: 12px;
          border: 1px solid #1a1a1a;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04);
          overflow: hidden;
          transform: rotate(3deg) translateY(-10px);
          position: relative;
          z-index: 2;
        }
        .mockup-cover {
          background: #0F0F0F;
          padding: 32px 28px;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
          overflow: hidden;
        }
        .mockup-cover::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(245,98,15,0.2) 0%, transparent 70%);
        }
        .mockup-logo {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 900;
          color: #F7F5F2;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .mockup-logo span { color: var(--primary); }
        .mockup-title {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 900;
          color: #F7F5F2;
          text-transform: uppercase;
          letter-spacing: -1.5px;
          line-height: 0.95;
          position: relative;
          z-index: 1;
        }
        .mockup-title span { color: var(--primary); }
        .mockup-body {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mockup-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          border-bottom: 1px solid #111;
        }
        .mockup-num {
          font-family: var(--font-heading);
          font-size: 10px;
          font-weight: 900;
          color: var(--primary);
          width: 20px;
        }
        .mockup-item {
          font-size: 10px;
          color: #333;
          font-family: var(--font-heading);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .guide-shadow {
          width: 240px;
          height: 20px;
          background: radial-gradient(ellipse, rgba(245,98,15,0.2) 0%, transparent 70%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* FEATURES STRIP */
        .features-strip {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.04);
          padding: 48px;
        }
        .features-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 0;
        }
        .feature-item {
          flex: 1;
          padding: 0 32px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .feature-item:first-child { padding-left: 0; }
        .feature-item:last-child {
          border-right: none;
          padding-right: 0;
        }
        .feature-num {
          font-family: var(--font-heading);
          font-size: 36px;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .feature-label {
          font-size: 13px;
          color: #444;
          font-weight: 300;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero { padding: 100px 24px 60px; }
          .hero-inner { flex-direction: column; gap: 48px; }
          .hero-right { width: 100%; display: flex; justify-content: center; }
          .nav { padding: 0 24px; }
          .features-strip { padding: 32px 24px; }
          .features-inner { flex-direction: column; gap: 24px; }
          .feature-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0 0 24px; }
          .feature-item:last-child { border-bottom: none; padding-bottom: 0; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-wordmark">Opervo<span>.</span></a>
        <a href="/" className="nav-link">← Back to site</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">Free Download</div>
            <h1 className="hero-headline">
              The Complete<br />
              <span>Opervo</span><br />
              User Guide
            </h1>
            <p className="hero-desc">
              13 sections covering every feature — from adding your first client to sending branded invoices and building your public Folio page. Drop your email and it's yours instantly.
            </p>

            {status === 'success' ? (
              <div className="success-wrap">
                <div className="success-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download started
                </div>
                <div className="success-title">You're all set.</div>
                <p className="success-sub">The PDF should be downloading now. If it didn't start automatically, tap the button below.</p>
                <a href="/Opervo_User_Guide.pdf" download className="download-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download PDF
                </a>
              </div>
            ) : (
              <div className="form-wrap">
                <label className="form-label">Enter your email to download</label>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="form-btn"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? '...' : 'Get PDF'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="form-error">{errorMsg}</p>
                  )}
                  <p className="form-note">
                    No spam. Just the guide. We'll occasionally send product updates if that's cool.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* GUIDE MOCKUP */}
          <div className="hero-right">
            <div className="guide-mockup">
              <div className="mockup-cover">
                <div className="mockup-logo">Opervo<span>.</span></div>
                <div className="mockup-title">User<br /><span>Guide.</span></div>
              </div>
              <div className="mockup-body">
                {[
                  ['00', 'Add to Home Screen'],
                  ['01', 'Dashboard'],
                  ['02', 'Schedule'],
                  ['03', 'Job Management'],
                  ['04', 'Job Detail'],
                  ['05', 'Client CRM'],
                  ['06', 'Invoicing'],
                  ['07', 'Estimates'],
                  ['08', 'Portfolio'],
                ].map(([num, label]) => (
                  <div key={num} className="mockup-row">
                    <span className="mockup-num">{num}</span>
                    <span className="mockup-item">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="guide-shadow" />
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="features-strip">
        <div className="features-inner">
          {[
            ['13', 'Sections covered'],
            ['30+', 'Features explained'],
            ['9', 'Real screenshots'],
            ['Free', 'Always'],
          ].map(([num, label]) => (
            <div key={num} className="feature-item">
              <div className="feature-num">{num}</div>
              <div className="feature-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
