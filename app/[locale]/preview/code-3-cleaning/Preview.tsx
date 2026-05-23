'use client'

// Code 3 Cleaning Pro Site preview — v2.
// Rebuilt to match home-services-website conventions studied across 40+
// sites in 180Sites' portfolio (Triangle Home Detailing, Pinky's, Super
// Clean, NW Softwash, Florida Pro Wash, ProLine Garage Doors, etc.).
//
// Key changes from v1:
//   - Geographic + trade headline format ("OREGON'S MOST TRUSTED...")
//   - Photo-overlay hero instead of monolithic dark gradient
//   - Inline quote form right in the hero (Name / Phone / Service)
//   - Phone + "GET A FAST QUOTE" both in nav top-right
//   - 4 trust bullets in hero (not buried below)
//   - Section backgrounds alternate (dark hero → orange trust band →
//     cream services → cream Why Choose Us → cream about → dark gallery →
//     cream reviews → cream service area → dark final CTA). No more
//     monolithic black throughout.
//   - Shrunken typography — headlines max ~60px not 128px.
//   - Dropped sticky orange "PREVIEW" banner up top; replaced with a
//     discrete bottom-right floating chip so the page reads as the
//     operator's site, not an Opervo product page.
//   - Footer credit shrunken to 9pt muted.

const ORANGE = '#F5620F'
const ORANGE_HOVER = '#d94e08'
const BLACK = '#0F0F0F'
const INK = '#1a1a1a'
const MUTED = '#6B6B6B'
const CREAM = '#F7F5F2'
const WARM = '#EDE9E3'
const SURFACE = '#FFFFFF'
const BORDER = '#E8E4DE'
const BORDER_DARK = 'rgba(255,255,255,0.10)'
const F7 = '#F7F5F2'
const C8 = '#c8c4be'
const GREEN = '#16a34a'

function Icon({ d, size = 22, color = ORANGE, stroke = 2, fill = 'none' }: { d: string; size?: number; color?: string; stroke?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  checkCircle: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
  pin: 'M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z',
  shield: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z',
  bolt: 'M13 2L3 14h8l-1 8 10-12h-8z',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.7-2.6-1.8-3.4-2.5-1.8-4.2-4.6-4.2-7.6 0 0 8 4 8 12 0 5-4 8-8 8s-8-3-8-8c0-1.5.4-2.9 1.1-4.1',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  award: 'M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM8.21 13.89L7 22l5-3 5 3-1.21-8.12',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM18.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
  arrow: 'M5 12h14M13 5l7 7-7 7',
  arrowRight: 'M9 18l6-6-6-6',
  thumbs: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  calendar: 'M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 2v4M16 2v4',
  mail: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 6l10 7 10-7',
}

const SERVICES = [
  { icon: ICONS.window, title: 'Window Cleaning', desc: 'Interior, exterior, hard-water spot removal. Streak-free finish guaranteed. We get the spots other crews leave behind.' },
  { icon: ICONS.gutter, title: 'Gutter Cleaning', desc: 'Full clear of gutters and downspouts. Water-flush test on every section. We send before/after photos with every job.' },
  { icon: ICONS.carpet, title: 'Carpet Cleaning', desc: 'Hot-water extraction by the room. Pet stains, traffic lanes, high-traffic entries. Furniture moved on request.' },
  { icon: ICONS.screen, title: 'Screen Repair', desc: 'Rescreen on-site or pickup. Window screens, sliding doors, custom dimensions. $0.35/sq in · $60 min.' },
]

const WHY_CHOOSE = [
  { icon: ICONS.flame, title: 'Run by a working firefighter', desc: 'Code 3 means lights and sirens — the urgency we bring to the firehouse is the standard we bring to every job.' },
  { icon: ICONS.bolt, title: 'Same-day quote response', desc: 'Quote requests in by 5pm get a full estimate by end of day. No "we\'ll get back to you next week."' },
  { icon: ICONS.shield, title: 'Fully licensed & insured', desc: 'Full Oregon licensing, $2M general liability coverage. We send proof of insurance with every quote.' },
  { icon: ICONS.thumbs, title: '5.0 stars · 136+ jobs done', desc: 'Every single Facebook review is 5 stars. Most cleaning crews can\'t say that. We work hard to keep it that way.' },
]

const SERVICE_AREAS = [
  'Canby', 'Oregon City', 'Wilsonville', 'Aurora', 'Molalla', 'Woodburn',
  'Newberg', 'Beavercreek', 'Mulino', 'Estacada', 'Sandy', 'Boring',
]

export default function Preview() {
  return (
    <div style={{ background: CREAM, color: INK, fontFamily: "'Barlow', sans-serif", minHeight: '100vh' }}>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(15,15,15,0.96) 0%, rgba(36,28,18,0.92) 60%, rgba(58,38,18,0.88) 100%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(245,98,15,0.22) 0%, transparent 70%)',
        color: F7,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: BLACK,
      }}>
        {/* Subtle texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 2px, transparent 2px 8px)`, pointerEvents: 'none' }} />

        {/* ── NAV BAR ── */}
        <nav style={{ position: 'relative', padding: '18px 24px', borderBottom: `1px solid ${BORDER_DARK}`, zIndex: 2 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: '-0.02em' }}>
              Code 3<span style={{ color: ORANGE }}>.</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
              <a href="#services" style={navLink}>Services</a>
              <a href="#about" style={navLink}>About</a>
              <a href="#area" style={navLink}>Service Area</a>
              <a href="#gallery" style={navLink}>Gallery</a>
              <a href="#reviews" style={navLink}>Reviews</a>
              <a href="tel:5039830126" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: F7, textDecoration: 'none' }}>
                <Icon d={ICONS.phone} size={16} color={ORANGE} stroke={2.5} />
                (503) 983-0126
              </a>
              <a href="#quote" style={navCta}>Get A Fast Quote</a>
            </div>
          </div>
        </nav>

        {/* ── HERO CONTENT ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 88px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="hero-grid">
            {/* LEFT — text + trust + CTAs */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,98,15,0.12)', border: `1px solid rgba(245,98,15,0.32)`, color: F7, padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
                Now booking · Oregon · Willamette Valley
              </div>

              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 5.2vw, 60px)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                textTransform: 'uppercase',
                margin: '0 0 22px',
                color: F7,
              }}>
                Oregon's most trusted<br />
                <span style={{ color: ORANGE }}>window, gutter & carpet</span><br />
                cleaning team.
              </h1>

              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#d8d4ce', margin: '0 0 28px', maxWidth: 560 }}>
                Same speed we bring to the firehouse. Spotless work, same-day quotes, fully insured — across the entire Willamette Valley.
              </p>

              {/* Trust bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px 18px', maxWidth: 540 }}>
                {[
                  { icon: ICONS.shield, t: 'Fully Licensed & Insured' },
                  { icon: ICONS.star, t: '5.0★ on Facebook' },
                  { icon: ICONS.bolt, t: 'Same-Day Quotes' },
                  { icon: ICONS.flame, t: 'Run by a Firefighter' },
                ].map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14.5, fontWeight: 500, color: F7 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon d={ICONS.check} size={12} color="#4ade80" stroke={3.5} />
                    </span>
                    {b.t}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#quote" style={primaryCta}>
                  Get a Free Quote
                  <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
                </a>
                <a href="tel:5039830126" style={phoneOutlineCta}>
                  <Icon d={ICONS.phone} size={16} color={F7} stroke={2.5} />
                  (503) 983-0126
                </a>
              </div>
            </div>

            {/* RIGHT — inline quote form */}
            <div id="quote">
              <div style={{
                background: SURFACE,
                color: INK,
                borderRadius: 12,
                padding: 28,
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), 0 12px 28px -8px rgba(0,0,0,0.18)',
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: ORANGE, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                  <Icon d={ICONS.bolt} size={14} color={ORANGE} stroke={2.5} />
                  Get a fast quote
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: BLACK, margin: '0 0 4px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                  Quote in your inbox today.
                </h3>
                <p style={{ fontSize: 13, color: MUTED, margin: '0 0 22px' }}>
                  Takes 30 seconds. Same-day response guaranteed.
                </p>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input placeholder="First name" style={formInput} />
                    <input placeholder="Phone" style={formInput} />
                  </div>
                  <input placeholder="Email" type="email" style={formInput} />
                  <select style={{ ...formInput, cursor: 'pointer' }} defaultValue="">
                    <option value="" disabled>Service needed…</option>
                    <option>Window Cleaning</option>
                    <option>Gutter Cleaning</option>
                    <option>Carpet Cleaning</option>
                    <option>Screen Repair</option>
                    <option>Multiple services</option>
                  </select>
                  <button type="submit" style={{ ...primaryCta, justifyContent: 'center', width: '100%', marginTop: 4, padding: '15px 24px' }}>
                    Get My Free Quote
                    <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
                  </button>
                  <p style={{ fontSize: 11, color: MUTED, textAlign: 'center', margin: '6px 0 0' }}>
                    By submitting, you agree to our terms. No spam — just your quote.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: ORANGE, color: '#fff', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          {[
            { icon: ICONS.shield, t: 'Fully Licensed & Insured' },
            { icon: ICONS.star, t: '5.0★ · 136+ Reviews' },
            { icon: ICONS.bolt, t: 'Same-Day Quotes' },
            { icon: ICONS.flame, t: 'Firefighter-Owned & Operated' },
            { icon: ICONS.check, t: '100% Satisfaction Guarantee' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, letterSpacing: '0.01em' }}>
              <Icon d={b.icon} size={18} color="#fff" stroke={2.5} />
              {b.t}
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICE ICONS ROW ────────────────────────────────────────────── */}
      <section style={{ background: SURFACE, padding: '36px 24px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }} className="service-icons">
          {SERVICES.map((s, i) => (
            <a key={i} href="#services" style={{ textDecoration: 'none', color: INK, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, transition: 'background 0.2s' }} className="service-icon-link">
              <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 8, background: 'rgba(245,98,15,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon d={s.icon} size={18} color={ORANGE} stroke={2.2} />
              </span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{s.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ─── SERVICES (LIGHT BG) ──────────────────────────────────────────── */}
      <section id="services" style={{ background: CREAM, padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={eyebrow}>Our services</p>
            <h2 style={sectionH2}>
              What we do, done right<br />the first time.
            </h2>
            <p style={{ ...sectionSub, maxWidth: 600, margin: '16px auto 0' }}>
              Every job done by the Code 3 crew. No subcontractors. Insured. Quotes back to you in under 24 hours.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={serviceCardLight}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: 'rgba(245,98,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon d={s.icon} size={24} color={ORANGE} stroke={2.2} />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', color: BLACK, margin: '0 0 10px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: MUTED, margin: '0 0 18px' }}>{s.desc}</p>
                <a href="#quote" style={{ color: ORANGE, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.02em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Get a quote
                  <Icon d={ICONS.arrowRight} size={12} color={ORANGE} stroke={2.5} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section style={{ background: SURFACE, padding: '88px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={eyebrow}>Why Code 3</p>
            <h2 style={sectionH2}>
              Four reasons people<br />
              <span style={{ color: ORANGE }}>keep calling us back.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {WHY_CHOOSE.map((w, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 18px rgba(245,98,15,0.28)' }}>
                  <Icon d={w.icon} size={26} color="#fff" stroke={2.2} />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 19, textTransform: 'uppercase', color: BLACK, margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{w.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / FIREFIGHTER STORY ────────────────────────────────────── */}
      <section id="about" style={{ background: CREAM, padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="about-grid">
          <div>
            {/* Owner photo card placeholder */}
            <div style={{
              background: 'linear-gradient(135deg, #2a2520 0%, #3a2a18 100%)',
              borderRadius: 14,
              aspectRatio: '4 / 5',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.18)',
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ position: 'absolute', inset: 24, border: `1px dashed rgba(255,255,255,0.18)`, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#5a5550' }}>
                <Icon d={ICONS.flame} size={40} color="#5a5550" stroke={1.6} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Owner photo</span>
                <span style={{ fontSize: 11, color: '#3a3530', fontStyle: 'italic' }}>Placeholder · you send during intake</span>
              </div>
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <p style={{ fontSize: 11, color: ORANGE, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>Owner · operator</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: F7, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05 }}>[Your name]</p>
                <p style={{ fontSize: 13, color: '#a8a39e', margin: '4px 0 0' }}>Firefighter / EMT</p>
              </div>
            </div>
          </div>

          <div>
            <p style={eyebrow}>Meet the owner</p>
            <h2 style={{ ...sectionH2, textAlign: 'left' }}>
              Same speed.<br />
              <span style={{ color: ORANGE }}>Different uniform.</span>
            </h2>
            <p style={aboutP}>
              Code 3 means lights and sirens — emergency response, top priority. It's how I answer the call at the firehouse, and it's the standard I bring to every cleaning job.
            </p>
            <p style={aboutP}>
              I started Code 3 Cleaning between 24-hour shifts at the firehouse. Folks in the Willamette Valley deserve the same urgency from their service providers that they expect when they dial 911. Same-day quotes. Show up on time. Work done right the first pass.
            </p>
            <p style={aboutP}>
              136+ jobs completed since launch. 5.0 stars on Facebook. Fully insured and licensed in Oregon. If something's not perfect, we come back same week.
            </p>
            <p style={{ ...aboutP, fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 28 }}>
              [Final about-page copy will be written from a 60-min recorded interview during intake.]
            </p>
          </div>
        </div>
      </section>

      {/* ─── GALLERY (DARK BG, PHOTO-HEAVY) ────────────────────────────────── */}
      <section id="gallery" style={{ background: BLACK, color: F7, padding: '88px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <p style={{ ...eyebrow, color: ORANGE }}>Recent work</p>
              <h2 style={{ ...sectionH2, color: F7, textAlign: 'left' }}>
                Real jobs.<br />
                <span style={{ color: ORANGE }}>Real Willamette Valley homes.</span>
              </h2>
            </div>
            <p style={{ fontSize: 12, color: '#5a5550', fontStyle: 'italic', maxWidth: 280 }}>
              [Gallery will be populated from your Folio photos + the 15-20 new ones you send during intake.]
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Hard-water removal · Canby',
              'Gutter clear · Oregon City',
              'Carpet extraction · Wilsonville',
              'Window detail · Canby Main St',
              'Screen rebuild · Aurora',
              'Full exterior · Molalla',
              'Storefront windows · Canby',
              'Move-out clean · Wilsonville',
            ].map((label, i) => (
              <div key={i} style={{
                aspectRatio: '4 / 3',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)',
                borderRadius: 10,
                border: `1px dashed rgba(255,255,255,0.10)`,
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
                <Icon d={ICONS.bolt} size={26} color="#3a3530" stroke={1.5} />
                <span style={{ fontSize: 11, color: '#8a8580', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS (LIGHT BG) ───────────────────────────────────────────── */}
      <section id="reviews" style={{ background: SURFACE, padding: '88px 24px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={eyebrow}>What people say</p>
            <h2 style={sectionH2}>
              <span style={{ color: ORANGE }}>5.0 stars.</span> 136+ jobs.<br />
              Every review counts.
            </h2>
            <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic', margin: '14px 0 0' }}>
              [Real Facebook reviews will be pulled and inserted here during intake.]
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 26, position: 'relative' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} d={ICONS.star} size={14} color="#febc2e" stroke={0} fill="#febc2e" />
                  ))}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: INK, margin: '0 0 20px', minHeight: 80, fontStyle: 'italic' }}>
                  <span style={{ color: '#999' }}>"Real 5-star Facebook review · pulled before launch · placeholder for preview"</span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(245,98,15,0.12)', border: `1px solid rgba(245,98,15,0.3)` }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: BLACK, margin: 0 }}>Verified Customer</p>
                    <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>Willamette Valley · Facebook</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" style={{ color: ORANGE, fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.02em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Read all 136+ reviews on Facebook
              <Icon d={ICONS.arrowRight} size={12} color={ORANGE} stroke={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ──────────────────────────────────────────────────── */}
      <section id="area" style={{ background: CREAM, padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: 48, alignItems: 'center' }} className="area-grid">
          <div>
            <p style={eyebrow}>Where we serve</p>
            <h2 style={{ ...sectionH2, textAlign: 'left' }}>
              Based in Canby.<br />
              <span style={{ color: ORANGE }}>Serving the whole Valley.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: MUTED, margin: '18px 0 28px' }}>
              We cover north to Wilsonville, south to Salem-adjacent towns, east into Estacada and Sandy. Don't see your town? Just ask — we travel for the right job.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SERVICE_AREAS.map((a) => (
                <span key={a} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  color: INK,
                  padding: '8px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  <Icon d={ICONS.pin} size={11} color={ORANGE} stroke={2.5} />
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{
            aspectRatio: '4 / 3',
            background: 'linear-gradient(135deg, #e8e4de 0%, #ede9e3 100%)',
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} aria-hidden="true">
              <defs>
                <pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#c8c4be" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid2)" />
            </svg>

            {[
              { top: '38%', left: '45%', label: 'Canby', size: 16, big: true },
              { top: '24%', left: '52%', label: 'Oregon City', size: 12 },
              { top: '32%', left: '36%', label: 'Wilsonville', size: 12 },
              { top: '50%', left: '50%', label: 'Aurora', size: 12 },
              { top: '60%', left: '40%', label: 'Molalla', size: 12 },
              { top: '62%', left: '60%', label: 'Woodburn', size: 12 },
            ].map((p, i) => (
              <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
                <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: ORANGE, boxShadow: `0 0 0 5px rgba(245,98,15,0.22)`, border: '2px solid #fff' }} />
                <span style={{ position: 'absolute', top: p.size + 5, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: BLACK, whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            ))}

            <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 10, color: '#999', fontStyle: 'italic', letterSpacing: '0.02em' }}>
              [Embedded Google Map at launch]
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA (DARK + FORM) ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 55%, #4a2010 100%)',
        color: F7,
        padding: '88px 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="cta-grid">
          <div>
            <p style={{ ...eyebrow, color: ORANGE }}>Ready when you are</p>
            <h2 style={{ ...sectionH2, color: F7, textAlign: 'left' }}>
              Quote in your<br />
              <span style={{ color: ORANGE }}>inbox today.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#d8d4ce', margin: '18px 0 28px', maxWidth: 460 }}>
              Tell us the property, the service, your timeline. We send back a full quote with photos of what we'll do — same day, every day.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: F7 }}>
                <Icon d={ICONS.phone} size={16} color={ORANGE} stroke={2.5} />
                <strong style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em' }}>(503) 983-0126</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#c8c4be' }}>
                <Icon d={ICONS.clock} size={16} color={ORANGE} stroke={2.5} />
                Mon–Sat · 7am–7pm · Same-day response
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#c8c4be' }}>
                <Icon d={ICONS.pin} size={16} color={ORANGE} stroke={2.5} />
                Canby, OR · Whole Willamette Valley
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: SURFACE, color: INK, borderRadius: 12, padding: 28, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), 0 12px 28px -8px rgba(0,0,0,0.18)' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', color: BLACK, margin: '0 0 18px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Get a free quote in 30 seconds.
              </h3>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input placeholder="First name" style={formInput} />
                  <input placeholder="Phone" style={formInput} />
                </div>
                <input placeholder="Email" type="email" style={formInput} />
                <select style={{ ...formInput, cursor: 'pointer' }} defaultValue="">
                  <option value="" disabled>Service needed…</option>
                  <option>Window Cleaning</option>
                  <option>Gutter Cleaning</option>
                  <option>Carpet Cleaning</option>
                  <option>Screen Repair</option>
                  <option>Multiple services</option>
                </select>
                <button type="submit" style={{ ...primaryCta, justifyContent: 'center', width: '100%', marginTop: 4, padding: '15px 24px' }}>
                  Get My Free Quote
                  <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0a0a0a', color: '#8a8580', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em', color: F7 }}>
              Code 3<span style={{ color: ORANGE }}>.</span>
            </span>
            <p style={{ fontSize: 13, color: '#8a8580', margin: '6px 0 0', lineHeight: 1.5 }}>
              Window, gutter, carpet & screen — done same-day across the Willamette Valley. Fully licensed and insured in Oregon.
            </p>
          </div>
          <div>
            <p style={footerH}>Services</p>
            <a href="#services" style={footerLink}>Window Cleaning</a>
            <a href="#services" style={footerLink}>Gutter Cleaning</a>
            <a href="#services" style={footerLink}>Carpet Cleaning</a>
            <a href="#services" style={footerLink}>Screen Repair</a>
          </div>
          <div>
            <p style={footerH}>Service Area</p>
            <p style={{ fontSize: 13, color: '#8a8580', margin: '0 0 6px' }}>Canby · Oregon City · Wilsonville · Aurora · Molalla · Woodburn · Newberg · Beavercreek · Mulino · Estacada · Sandy · Boring</p>
          </div>
          <div>
            <p style={footerH}>Contact</p>
            <a href="tel:5039830126" style={footerLink}>(503) 983-0126</a>
            <a href="sms:5039830126" style={footerLink}>Text us</a>
            <p style={{ fontSize: 13, color: '#8a8580', margin: '6px 0 0' }}>Mon–Sat · 7am–7pm</p>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 20, borderTop: `1px solid #1a1a1a`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, color: '#5a5550' }}>
          <span>© 2026 Code 3 Cleaning. Licensed & insured in Oregon. All rights reserved.</span>
          <span style={{ color: '#3a3530' }}>Built by Opervo</span>
        </div>
      </footer>

      {/* ─── DISCRETE PREVIEW CHIP (bottom-right floating) ──────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        background: ORANGE,
        color: '#fff',
        padding: '10px 16px',
        borderRadius: 999,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
        Preview · Final at code3cleaning.com
        <a href="/sites" style={{ marginLeft: 6, color: '#fff', textDecoration: 'underline', fontWeight: 700 }}>← Back</a>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-grid),
          :global(.about-grid),
          :global(.area-grid),
          :global(.cta-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.service-icons) {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 700px) {
          :global(.desktop-nav a:nth-child(-n+5)) {
            display: none;
          }
        }
        :global(.service-icon-link:hover) {
          background: rgba(245,98,15,0.06);
        }
      `}</style>
    </div>
  )
}

// ─── Style objects ─────────────────────────────────────────────────────
const navLink: React.CSSProperties = {
  color: '#c8c4be',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.02em',
}

const navCta: React.CSSProperties = {
  background: ORANGE,
  color: '#fff',
  textDecoration: 'none',
  padding: '10px 18px',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 14,
  fontFamily: "'Barlow Condensed', sans-serif",
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  boxShadow: '0 4px 14px rgba(245,98,15,0.32)',
}

const primaryCta: React.CSSProperties = {
  background: ORANGE,
  color: '#fff',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '14px 26px',
  borderRadius: 8,
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(245,98,15,0.32)',
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
}

const phoneOutlineCta: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  color: F7,
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '13px 22px',
  borderRadius: 8,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.22)',
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
}

const formInput: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: 7,
  padding: '12px 14px',
  fontSize: 14.5,
  color: INK,
  fontFamily: "'Barlow', sans-serif",
  width: '100%',
  outline: 'none',
  fontWeight: 500,
}

const eyebrow: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '0.25em',
  color: ORANGE,
  textTransform: 'uppercase',
  margin: '0 0 14px',
  textAlign: 'center',
}

const sectionH2: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 'clamp(30px, 4.2vw, 48px)',
  fontWeight: 900,
  textTransform: 'uppercase',
  color: BLACK,
  lineHeight: 1.02,
  margin: 0,
  letterSpacing: '-0.015em',
  textAlign: 'center',
}

const sectionSub: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.55,
  color: MUTED,
  margin: 0,
}

const serviceCardLight: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: 12,
  padding: 26,
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
}

const aboutP: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.65,
  color: INK,
  margin: '0 0 18px',
}

const footerH: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 12,
  fontWeight: 800,
  color: F7,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  margin: '0 0 12px',
}

const footerLink: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  color: '#8a8580',
  textDecoration: 'none',
  margin: '0 0 6px',
  lineHeight: 1.4,
}
