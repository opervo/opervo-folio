'use client'

// Code 3 Cleaning Pro Site preview. Single-page composition meant to be
// shared via direct URL with the operator ahead of the intake Zoom.
// Replaces vague "imagine what we'd build" pitch with a real artifact
// the operator can scroll on their phone. Final live site will be
// multi-page (home + about + service pages + areas + contact); this
// preview compresses that into a single rich page.
//
// Where copy is interim, it's marked with the [INTERIM] inline note so the
// operator sees the placeholder clearly without being misled. Once intake
// is complete (60-min Zoom + photo dump + real testimonial pulls), this
// preview gets ripped out and replaced with the actual production build
// on code3cleaning.com.

const ORANGE = '#F5620F'
const BLACK = '#0F0F0F'
const INK = '#1a1a1a'
const F7 = '#F7F5F2'
const C8 = '#c8c4be'
const BORDER_DARK = 'rgba(255,255,255,0.10)'

// Inline SVG icon helper — kept minimal since this page imports nothing
function Icon({ d, size = 22, color = ORANGE, stroke = 2 }: { d: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  window: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 12h18M12 3v18',
  gutter: 'M3 7l18-4v18l-18-4zM3 7v10M21 3v18',
  carpet: 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 9h16M4 14h16M9 4v16M15 4v16',
  screen: 'M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM7 22h10M12 18v4',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  check: 'M20 6L9 17l-5-5',
  pin: 'M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z',
  shield: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z',
  bolt: 'M13 2L3 14h8l-1 8 10-12h-8z',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.7-2.6-1.8-3.4-2.5-1.8-4.2-4.6-4.2-7.6 0 0 8 4 8 12 0 5-4 8-8 8s-8-3-8-8c0-1.5.4-2.9 1.1-4.1',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM18.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
  arrow: 'M5 12h14M13 5l7 7-7 7',
}

const SERVICES = [
  {
    icon: ICONS.window,
    title: 'Window Cleaning',
    line: 'Interior, exterior, hard-water remediation.',
    body: 'Streak-free residential and commercial windows. We get the spots other crews leave behind, including hard-water etching on shower glass and storefronts.',
    price: 'Quote in under 24 hrs',
  },
  {
    icon: ICONS.gutter,
    title: 'Gutter Cleaning',
    line: 'Clear, flush, photo-document the line.',
    body: 'Full clear of gutters and downspouts, water-flush test on every section, and we send you photos of the completed work so you can see the line is clean.',
    price: 'Quote in under 24 hrs',
  },
  {
    icon: ICONS.carpet,
    title: 'Carpet Cleaning',
    line: 'Hot-water extraction by the room.',
    body: 'Whole-room carpet extraction with treatment for pet stains, traffic lanes and high-trafficked entries. Furniture moved and reset on request.',
    price: 'Per-room pricing',
  },
  {
    icon: ICONS.screen,
    title: 'Screen Repair',
    line: 'Rescreen on-site or pickup.',
    body: 'Window screens, sliding-door screens, custom dimensions. We can rescreen at your property or pick up frames and return them complete.',
    price: '$0.35/sq in · $60 minimum',
  },
]

const SERVICE_AREAS = [
  'Canby',
  'Oregon City',
  'Wilsonville',
  'Aurora',
  'Molalla',
  'Woodburn',
  'Newberg',
  'Beavercreek',
  'Mulino',
  'Estacada',
  'Sandy',
  'Boring',
]

export default function Preview() {
  return (
    <div style={{ background: BLACK, color: F7, fontFamily: "'Barlow', sans-serif", minHeight: '100vh' }}>
      {/* ─── PREVIEW BANNER (sticky thin top strip) ─────────────────────── */}
      <div style={{
        background: ORANGE,
        color: '#fff',
        padding: '8px 16px',
        textAlign: 'center',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        Preview · Final site lives at code3cleaning.com · 30 days from kickoff ·{' '}
        <a href="/sites" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 800 }}>
          ← Back to Opervo Sites
        </a>
      </div>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 55%, #3a2a18 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 24px',
        minHeight: 'calc(100vh - 36px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Background atmosphere — fades behind text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(245,98,15,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Top bar */}
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>
            Code 3<span style={{ color: ORANGE }}>.</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, fontWeight: 600, color: C8, letterSpacing: '0.04em', textTransform: 'uppercase' }} className="hero-nav">
            <a href="#services" style={navLink}>Services</a>
            <a href="#about" style={navLink}>About</a>
            <a href="#gallery" style={navLink}>Work</a>
            <a href="#area" style={navLink}>Area</a>
            <a href="tel:5039830126" style={navCta}>
              <Icon d={ICONS.phone} size={14} color="#fff" stroke={2.5} />
              <span>(503) 983-0126</span>
            </a>
          </div>
        </div>

        {/* Main hero */}
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', width: '100%', padding: '60px 0 100px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
            <span style={pillBadge}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              Accepting Clients
            </span>
            <span style={pillBadgeMuted}>
              <Icon d={ICONS.star} size={12} color="#febc2e" stroke={0} />
              <span style={{ fontWeight: 800 }}>5.0</span>
              <span style={{ color: C8 }}>· 136+ Facebook reviews</span>
            </span>
            <span style={pillBadgeMuted}>
              <Icon d={ICONS.pin} size={12} color={ORANGE} stroke={2.5} />
              Oregon · Willamette Valley
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            margin: 0,
            color: F7,
          }}>
            Spotless.<br />
            <span style={{ color: ORANGE }}>Code-3 fast.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2vw, 22px)',
            color: C8,
            margin: '28px 0 0',
            maxWidth: 640,
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            Windows, gutters, carpet and screens — done same-day across the Willamette Valley. Same speed we bring to the truck. Fully insured. Quote in under 24 hours.
          </p>

          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
            <a href="#quote" style={primaryCta}>
              Get an instant quote
              <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
            </a>
            <a href="tel:5039830126" style={secondaryCta}>
              <Icon d={ICONS.phone} size={16} color={F7} stroke={2.5} />
              (503) 983-0126
            </a>
            <a href="sms:5039830126" style={textCta}>Text us</a>
          </div>

          {/* Stat strip */}
          <div style={{ display: 'flex', gap: 0, marginTop: 64, paddingTop: 28, borderTop: `1px solid ${BORDER_DARK}`, flexWrap: 'wrap' }}>
            {[
              { n: '136+', l: 'Jobs completed' },
              { n: '5.0★', l: 'Facebook rating' },
              { n: 'Same', l: 'Day quotes' },
              { n: 'Fully', l: 'Insured · licensed' },
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 140px', padding: '0 8px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 4vw, 44px)', color: ORANGE, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#8a8580', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', padding: '24px', borderTop: `1px solid ${BORDER_DARK}`, borderBottom: `1px solid ${BORDER_DARK}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: ICONS.shield, text: 'Fully insured + licensed' },
            { icon: ICONS.bolt, text: 'Quote in < 24 hrs' },
            { icon: ICONS.star, text: '5.0 ★ on Facebook' },
            { icon: ICONS.flame, text: 'Run by a working firefighter' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: F7, fontSize: 14, fontWeight: 500 }}>
              <Icon d={t.icon} size={18} color={ORANGE} stroke={2.5} />
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '96px 24px', background: BLACK }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={eyebrow}>What we do</p>
          <h2 style={{ ...sectionH2, marginBottom: 16 }}>
            Four services.<br />
            <span style={{ color: ORANGE }}>One same-day promise.</span>
          </h2>
          <p style={{ fontSize: 18, color: C8, maxWidth: 580, lineHeight: 1.5, margin: '0 0 56px' }}>
            We don't subcontract. Every job is done by the Code 3 crew. Fully insured. Quotes back to you in under 24 hours, work scheduled the next available day in your area.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={serviceCard}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(245,98,15,0.12)', border: `1px solid rgba(245,98,15,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                  <Icon d={s.icon} size={24} color={ORANGE} stroke={2} />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, textTransform: 'uppercase', color: F7, margin: '0 0 8px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 700, color: ORANGE, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.line}</p>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: C8, margin: '0 0 22px' }}>{s.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, borderTop: `1px solid ${BORDER_DARK}` }}>
                  <span style={{ fontSize: 12, color: '#8a8580', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.price}</span>
                  <a href="#quote" style={{ color: ORANGE, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Quote
                    <Icon d={ICONS.arrow} size={12} color={ORANGE} stroke={2.5} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE FIREFIGHTER STORY ────────────────────────────────────────── */}
      <section id="about" style={{ padding: '96px 24px', background: '#0a0a0a', borderTop: `1px solid ${BORDER_DARK}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 64, alignItems: 'center' }} className="about-grid">
          <div>
            <p style={eyebrow}>Why Code 3</p>
            <h2 style={{ ...sectionH2, marginBottom: 28 }}>
              Same speed.<br />
              <span style={{ color: ORANGE }}>Different uniform.</span>
            </h2>
            <p style={aboutP}>
              Code 3 means lights and sirens — the highest-priority emergency response. It's how I answer the call at the firehouse, and it's the standard I bring to every cleaning job I take on the side.
            </p>
            <p style={aboutP}>
              Started Code 3 Cleaning because folks in the Willamette Valley deserve the same urgency from their service providers that they expect from us when they dial 911. Same-day quotes. Show up on time. Do the work right the first pass. If something's not perfect, we come back same week.
            </p>
            <p style={aboutP}>
              136+ jobs completed since launch. 5.0 stars on Facebook. Fully insured and licensed in Oregon. Built between 24-hour shifts at the firehouse — which means we work weekends and evenings, when most cleaning crews won't.
            </p>
            <p style={{ ...aboutP, fontSize: 13, color: '#5a5550', fontStyle: 'italic', marginTop: 32 }}>
              [INTERIM copy — final about page will be written from a 60-min recorded interview with you.]
            </p>
          </div>

          <div>
            {/* Owner photo placeholder card */}
            <div style={{
              background: 'linear-gradient(135deg, #2a2520 0%, #3a2a18 100%)',
              borderRadius: 16,
              padding: 28,
              border: `1px solid ${BORDER_DARK}`,
              position: 'relative',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
              {/* Photo area */}
              <div style={{
                position: 'absolute',
                inset: 0,
                margin: 28,
                marginBottom: 120,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(245,98,15,0.1) 100%)',
                borderRadius: 8,
                border: `1px dashed rgba(255,255,255,0.18)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                color: '#5a5550',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                <Icon d={ICONS.flame} size={32} color="#5a5550" stroke={1.5} />
                <span>Owner photo</span>
                <span style={{ fontSize: 10, color: '#3a3530', fontStyle: 'italic', textTransform: 'none', letterSpacing: '0.02em' }}>[Placeholder — you send during intake]</span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: 12, color: ORANGE, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                  Code 3 Cleaning · Owner
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: F7, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>
                  [Your name here]
                </p>
                <p style={{ fontSize: 14, color: C8, margin: '6px 0 0' }}>
                  Firefighter / EMT · Side business owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ───────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ padding: '96px 24px', background: BLACK }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <p style={eyebrow}>Recent work</p>
              <h2 style={{ ...sectionH2 }}>
                Before / after.<br />
                <span style={{ color: ORANGE }}>Real jobs, real photos.</span>
              </h2>
            </div>
            <p style={{ fontSize: 13, color: '#5a5550', fontStyle: 'italic', maxWidth: 280, textAlign: 'right' }}>
              [Gallery will be populated from your existing Folio photos + the 15-20 new ones you send during intake.]
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { label: 'Hard-water removal · Canby storefront' },
              { label: 'Gutter clear + flush · Oregon City' },
              { label: 'Carpet extraction · Wilsonville home' },
              { label: 'Window detail · downtown Canby' },
              { label: 'Screen rebuild · Aurora property' },
              { label: 'Full exterior package · Molalla home' },
              { label: 'Storefront windows · Canby Main St' },
              { label: 'Move-out clean · Wilsonville' },
            ].map((g, i) => (
              <div key={i} style={{
                aspectRatio: '4 / 3',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)',
                borderRadius: 10,
                border: `1px dashed rgba(255,255,255,0.12)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 14,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'rgba(245,98,15,0.18)',
                  border: `1px solid rgba(245,98,15,0.35)`,
                  color: ORANGE,
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '3px 7px',
                  borderRadius: 3,
                }}>
                  Before / After
                </div>
                <Icon d={ICONS.bolt} size={28} color="#3a3530" stroke={1.5} />
                <span style={{ fontSize: 12, color: '#8a8580', fontWeight: 500, lineHeight: 1.3 }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#0a0a0a', borderTop: `1px solid ${BORDER_DARK}`, borderBottom: `1px solid ${BORDER_DARK}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>What people say</p>
          <h2 style={{ ...sectionH2, marginBottom: 12 }}>
            5.0 ★ on Facebook.<br />
            <span style={{ color: ORANGE }}>136+ jobs and counting.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#5a5550', fontStyle: 'italic', margin: '0 0 48px' }}>
            [INTERIM — 5-8 real reviews will be pulled from your Facebook page during intake and inserted here.]
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                background: '#1a1a1a',
                border: `1px solid ${BORDER_DARK}`,
                borderRadius: 14,
                padding: 28,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} d={ICONS.star} size={14} color="#febc2e" stroke={0} />
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C8, margin: '0 0 22px', minHeight: 95 }}>
                  <span style={{ color: '#5a5550', fontStyle: 'italic' }}>
                    Real Facebook review · pulled before launch · placeholder for preview
                  </span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,98,15,0.15)', border: `1px solid rgba(245,98,15,0.3)` }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: F7, margin: 0 }}>Verified customer</p>
                    <p style={{ fontSize: 11, color: '#5a5550', margin: 0 }}>Willamette Valley · 5★ Facebook</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ──────────────────────────────────────────────────── */}
      <section id="area" style={{ padding: '96px 24px', background: BLACK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: 56, alignItems: 'center' }} className="area-grid">
          <div>
            <p style={eyebrow}>Where we serve</p>
            <h2 style={{ ...sectionH2, marginBottom: 24 }}>
              The whole<br />
              <span style={{ color: ORANGE }}>Willamette Valley.</span>
            </h2>
            <p style={{ fontSize: 17, color: C8, lineHeight: 1.55, margin: '0 0 32px' }}>
              Based in Canby. We cover everything north to Wilsonville, south to Salem-adjacent towns, and east into Estacada and Sandy. Don't see your town? Just ask — we travel for the right job.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SERVICE_AREAS.map((a) => (
                <span key={a} style={{
                  background: 'rgba(245,98,15,0.08)',
                  border: `1px solid rgba(245,98,15,0.3)`,
                  color: F7,
                  padding: '8px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  <Icon d={ICONS.pin} size={11} color={ORANGE} stroke={2.5} />
                  <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>{a}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{
            aspectRatio: '4 / 3',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 50%, #3a2a18 100%)',
            borderRadius: 14,
            border: `1px solid ${BORDER_DARK}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Faint grid */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} aria-hidden="true">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Pins */}
            {[
              { top: '38%', left: '45%', label: 'Canby', size: 14 },
              { top: '24%', left: '52%', label: 'Oregon City', size: 11 },
              { top: '32%', left: '36%', label: 'Wilsonville', size: 11 },
              { top: '50%', left: '50%', label: 'Aurora', size: 11 },
              { top: '60%', left: '40%', label: 'Molalla', size: 11 },
              { top: '62%', left: '60%', label: 'Woodburn', size: 11 },
            ].map((p, i) => (
              <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
                <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: ORANGE, boxShadow: `0 0 0 4px rgba(245,98,15,0.18)` }} />
                <span style={{ position: 'absolute', top: p.size + 4, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: F7, whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            ))}

            <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 10, color: '#5a5550', fontStyle: 'italic', letterSpacing: '0.02em' }}>
              [Embedded Google Map at launch]
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section id="quote" style={{ padding: '120px 24px', background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 50%, #4a2010 100%)', borderTop: `1px solid ${BORDER_DARK}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={eyebrow}>Ready when you are</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(44px, 7vw, 80px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            Quote in your<br />
            <span style={{ color: ORANGE }}>inbox today.</span>
          </h2>
          <p style={{ fontSize: 19, color: C8, lineHeight: 1.5, margin: '28px auto 44px', maxWidth: 560 }}>
            Tell us the property, the service, your timeline. We send back a full quote with photos of what we'll do — same day, every day.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={primaryCta}>
              Request a quote
              <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
            </a>
            <a href="tel:5039830126" style={secondaryCta}>
              <Icon d={ICONS.phone} size={16} color={F7} stroke={2.5} />
              (503) 983-0126
            </a>
          </div>
          <p style={{ fontSize: 13, color: '#8a8580', marginTop: 36 }}>
            Mon–Sat · 7am–7pm · Same-day response guaranteed
          </p>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0a0a0a', padding: '40px 24px', borderTop: `1px solid ${BORDER_DARK}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>
              Code 3<span style={{ color: ORANGE }}>.</span>
            </span>
            <p style={{ fontSize: 13, color: '#5a5550', margin: '6px 0 0' }}>
              Cleaning · Oregon · Willamette Valley · Fully insured + licensed
            </p>
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 13, color: '#8a8580' }}>
            <a href="tel:5039830126" style={{ color: '#8a8580', textDecoration: 'none' }}>(503) 983-0126</a>
            <a href="#services" style={{ color: '#8a8580', textDecoration: 'none' }}>Services</a>
            <a href="#area" style={{ color: '#8a8580', textDecoration: 'none' }}>Service Area</a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 20, borderTop: `1px solid ${BORDER_DARK}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, color: '#5a5550', letterSpacing: '0.04em' }}>
          <span>© 2026 Code 3 Cleaning. All rights reserved.</span>
          <span>
            Built by{' '}
            <a href="https://www.opervo.io/sites" style={{ color: ORANGE, textDecoration: 'none', fontWeight: 700 }}>
              Opervo Sites
            </a>
          </span>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 800px) {
          :global(.hero-nav a:not(:last-child)) {
            display: none;
          }
        }
        @media (max-width: 700px) {
          :global(.about-grid),
          :global(.area-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

// ─── Inline style objects ───────────────────────────────────────────────
const navLink: React.CSSProperties = {
  color: '#c8c4be',
  textDecoration: 'none',
  fontWeight: 600,
  letterSpacing: '0.04em',
}

const navCta: React.CSSProperties = {
  background: ORANGE,
  color: '#fff',
  textDecoration: 'none',
  padding: '8px 14px',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: "'Barlow', sans-serif",
}

const pillBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#F7F5F2',
  padding: '6px 12px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.04em',
}

const pillBadgeMuted: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#c8c4be',
  padding: '6px 12px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 500,
}

const primaryCta: React.CSSProperties = {
  background: ORANGE,
  color: '#fff',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '16px 28px',
  borderRadius: 8,
  textDecoration: 'none',
  boxShadow: '0 8px 24px rgba(245,98,15,0.35)',
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
}

const secondaryCta: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  color: '#F7F5F2',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '16px 24px',
  borderRadius: 8,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.18)',
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
}

const textCta: React.CSSProperties = {
  background: 'transparent',
  color: '#c8c4be',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 600,
  fontSize: 14,
  padding: '16px 8px',
  textDecoration: 'underline',
  letterSpacing: '0.02em',
  alignSelf: 'center',
}

const eyebrow: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: '0.25em',
  color: ORANGE,
  textTransform: 'uppercase',
  margin: '0 0 18px',
}

const sectionH2: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 'clamp(36px, 5vw, 60px)',
  fontWeight: 900,
  textTransform: 'uppercase',
  color: F7,
  lineHeight: 0.95,
  margin: 0,
  letterSpacing: '-0.02em',
}

const aboutP: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.65,
  color: C8,
  margin: '0 0 18px',
}

const serviceCard: React.CSSProperties = {
  background: '#0f0f0f',
  border: `1px solid ${BORDER_DARK}`,
  borderRadius: 14,
  padding: 30,
  transition: 'transform 0.2s ease, border-color 0.2s ease',
}
