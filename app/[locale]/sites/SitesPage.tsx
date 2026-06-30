'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const ORANGE = '#F5620F'
const ORANGE_HOVER = '#d94e08'
const BLACK = '#0F0F0F'
const INK = '#1a1a1a'
const MUTED = '#6B6B6B'
const BG = '#F7F5F2'
const SURFACE = '#FFFFFF'
const BORDER = '#E8E4DE'
const WARM = '#EDE9E3'

// Small inline-SVG icon helpers, no emoji, no icon lib dependency
function Icon({ d, size = 22, color = ORANGE, stroke = 2 }: { d: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  search: 'M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM21 21l-4.35-4.35',
  smartphone: 'M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
  image: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  mail: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 6l10 7 10-7',
  shield: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z',
  bolt: 'M13 2L3 14h8l-1 8 10-12h-8z',
  key: 'M21 2l-2 2M15 7l4-4 2 2-4 4-2-2zM3 21a4 4 0 0 0 4-4l8-8 2 2-8 8a4 4 0 0 0-4 4z',
  check: 'M20 6L9 17l-5-5',
  arrow: 'M5 12h14M13 5l7 7-7 7',
  spark: 'M12 2v6m0 8v6M2 12h6m8 0h6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.7-2.6-1.8-3.4-2.5-1.8-4.2-4.6-4.2-7.6 0 0 8 4 8 12 0 5-4 8-8 8s-8-3-8-8c0-1.5.4-2.9 1.1-4.1',
  chevron: 'M9 18l6-6-6-6',
  chevronDown: 'M6 9l6 6 6-6',
}

// Hand-drawn marker highlight that sits behind text, like a real highlighter
// swipe. Slightly irregular path mimics a brush stroke. Pass `dark` for darker
// surface backgrounds where higher opacity is needed.
function Highlight({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      <svg
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-4%',
          right: '-4%',
          width: '108%',
          top: '32%',
          height: '72%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <path
          d="M4,18 Q40,12 80,16 Q140,20 200,14 Q260,18 296,17 Q298,22 295,30 Q230,34 170,30 Q110,27 50,32 Q12,33 5,30 Q1,24 4,18 Z"
          fill={ORANGE}
          opacity={dark ? 0.7 : 0.42}
        />
        <path
          d="M10,22 Q60,18 130,20 Q200,23 285,21"
          stroke={ORANGE}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          opacity={dark ? 0.5 : 0.35}
        />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  )
}

// Comparison cell with a green check, red X, or neutral text, same vibe as the
// 180sites comparison rows but inline next to the cell value for context.
function Verdict({ ok, children }: { ok?: boolean; children: React.ReactNode }) {
  if (ok === undefined) return <span>{children}</span>
  const bg = ok ? '#dcfce7' : '#fee2e2'
  const fg = ok ? '#16a34a' : '#dc2626'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {ok ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={3.5} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        )}
      </span>
      <span>{children}</span>
    </span>
  )
}

// Hero laptop mockup. Renders the live Code 3 Cleaning site
// (www.codethreecleaning.com) inside a laptop frame: real oval logo,
// real pressure-wash hero photo, Anton headline, crimson #E22400.
// The whole laptop links out to the live customer site so the hero
// doubles as proof — anyone clicking through lands on Terren's actual
// production page. The mini composition mirrors Code3CleaningShowcase
// for the portfolio grid so the same design appears in both places.
function LaptopMockup() {
  const C3_RED = '#E22400'
  return (
    <a
      href="https://www.codethreecleaning.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Open the live Code 3 Cleaning site in a new tab"
      style={{ display: 'block', width: '100%', maxWidth: 560, margin: '0 auto', position: 'relative', textDecoration: 'none', color: 'inherit' }}
    >
      {/* Laptop frame */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '14px 14px 4px 4px',
        padding: '14px 14px 10px',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35), 0 18px 36px -18px rgba(0,0,0,0.25)',
        position: 'relative',
      }}>
        {/* Webcam dot */}
        <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#3a3a3a' }} />
        {/* Screen */}
        <div style={{
          background: '#0F0F10',
          borderRadius: 6,
          overflow: 'hidden',
          aspectRatio: '16 / 10',
          position: 'relative',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Browser chrome bar */}
          <div style={{ background: '#0a0a0a', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ flex: 1, background: '#1a1a1a', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#8a8580', textAlign: 'center', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
              www.codethreecleaning.com
            </span>
          </div>

          {/* Page content — real Code 3 hero composition */}
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Real pressure-wash hero photo */}
            <Image
              src="/portfolio/code-3-cleaning/hero.jpg"
              alt="Terren of Code 3 Cleaning running a rotary surface cleaner on a driveway in Silverton, OR"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              priority
              style={{ objectFit: 'cover', objectPosition: '38% 26%', filter: 'brightness(1.07) saturate(1.1)' }}
            />
            {/* Dark scrim — mirrors the live page */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(360px 240px at 75% 18%, rgba(226,36,0,0.28), transparent 60%), ' +
                  'radial-gradient(520px 360px at 50% 45%, rgba(15,15,16,0.66), transparent 72%), ' +
                  'linear-gradient(180deg, rgba(15,15,16,0.78) 0%, rgba(15,15,16,0.55) 38%, rgba(15,15,16,0.45) 68%, rgba(15,15,16,0.72) 100%)',
              }}
            />

            {/* Nav strip — real Code 3 header */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', flexShrink: 0 }}>
              <Image
                src="/portfolio/code-3-cleaning/logo.png"
                alt="Code 3 Cleaning logo"
                width={210}
                height={138}
                style={{ width: 64, height: 'auto', display: 'block', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  <span>Services</span>
                  <span>About</span>
                  <span>Service Area</span>
                  <span>Reviews</span>
                </span>
                <span style={{ background: C3_RED, color: '#fff', padding: '5px 11px', borderRadius: 4, fontSize: 10, fontWeight: 800, fontFamily: "'Inter', system-ui, sans-serif", whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(226,36,0,0.4)' }}>
                  Get a Free Quote
                </span>
              </div>
            </div>

            {/* Centered hero text */}
            <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4px 24px 18px' }}>
              {/* Lead chip */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C3_RED, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 999, boxShadow: '0 6px 16px rgba(226,36,0,0.4)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                Serving the Willamette Valley
              </span>

              {/* Headline — Anton, "FAST. THOROUGH. SPOTLESS." */}
              <span
                style={{
                  fontFamily: "'Anton', 'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(34px, 5.4vw, 56px)',
                  lineHeight: 0.94,
                  letterSpacing: '0.005em',
                  textTransform: 'uppercase',
                  marginTop: 12,
                  textShadow: '0 2px 18px rgba(0,0,0,0.6)',
                  fontWeight: 400,
                }}
              >
                Fast. Thorough.<br />
                <span style={{ color: C3_RED }}>Spotless.</span>
              </span>

              {/* Subhead */}
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 10.5, color: 'rgba(255,255,255,0.92)', marginTop: 10, maxWidth: '78%', lineHeight: 1.5, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                Window cleaning, pressure washing, carpet, and mobile screen repair. Owner-operated by Terren Harrington.
              </span>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ background: C3_RED, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 10, fontWeight: 800, padding: '6px 14px', borderRadius: 4, boxShadow: '0 6px 14px rgba(226,36,0,0.4)' }}>
                  Get a Free Quote
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 10, fontWeight: 700, padding: '6px 14px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.3)' }}>
                  (503) 983-0126
                </span>
              </div>
            </div>
          </div>

          {/* "Live customer" corner badge */}
          <div style={{ position: 'absolute', top: 40, right: 12, background: '#16a34a', color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 3, fontFamily: "'Barlow Condensed', sans-serif", zIndex: 3 }}>
            Live customer
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div style={{
        background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
        height: 10,
        margin: '0 -14px',
        borderRadius: '0 0 18px 18px',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '14%', height: 4, background: '#0a0a0a', borderRadius: '0 0 8px 8px' }} />
      </div>

      {/* Floating "live" badge below the laptop */}
      <div style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', background: '#F7F5F2', border: `1px solid ${BORDER}`, color: BLACK, fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', whiteSpace: 'nowrap', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#16a34a', marginRight: 7, verticalAlign: 'middle' }} />
        Code 3 Cleaning . live at codethreecleaning.com
      </div>
    </a>
  )
}

// Single portfolio card, compact version of the laptop mockup composition.
// Each card represents a trade slot. `status: 'real'` = real customer (Code 3),
// 'open' = founding slot still available.
type PortfolioEntry = {
  brand: string
  brandSuffix?: string
  domain: string
  trade: string
  location: string
  headline: string
  headlineAccent: string
  tagline: string
  stats: [{ n: string; l: string }, { n: string; l: string }, { n: string; l: string }]
  status: 'real' | 'open'
  // Slug into /preview/[slug] for shareable previews. Only real entries set this.
  slug?: string
}

// Special-case card for JC Air Pro. Renders a faithful mini of the actual
// JC Air Pro homepage hero (real logo, real Emilio photo, real navy/red
// brand) instead of the generic dark+orange Opervo-styled template.
// The point: the portfolio should preview what the operator's site
// actually looks like, not a template of itself.
function JcAirProShowcase({ entry }: { entry: PortfolioEntry }) {
  const isReal = entry.status === 'real'
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 12px 30px -12px rgba(0,26,74,0.35), 0 4px 10px -4px rgba(0,0,0,0.12)',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="portfolio-card"
    >
      {/* Browser chrome */}
      <div style={{ background: '#f1f3f5', padding: '6px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #e1e4e8' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, background: '#fff', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#5f6368', textAlign: 'center', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em', border: '1px solid #e1e4e8' }}>
          {entry.domain}
        </span>
      </div>

      {/* Page composition, actual JC Air Pro hero in miniature */}
      <div style={{ position: 'relative', aspectRatio: '4 / 3', display: 'flex', flexDirection: 'column', background: '#fff', color: '#0a0a0a' }}>
        {/* Utility strip (navy) */}
        <div style={{ background: '#001a4a', color: 'rgba(255,255,255,0.9)', fontSize: 6.5, padding: '3px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, letterSpacing: '0.02em' }}>
          <span>(214) 909-5338 · airprojulio@gmail.com</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>TACLA97287E</span>
            <span style={{ background: '#c8102e', color: '#fff', padding: '1px 5px', borderRadius: 999, fontSize: 6, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Español</span>
          </span>
        </div>

        {/* Header strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px', borderBottom: '1px solid #f3f3f0', flexShrink: 0 }}>
          <Image
            src="/portfolio/jc-air-pro/logo.jpg"
            alt="JC Air Pro logo"
            width={210}
            height={70}
            style={{ height: 'auto', width: 64, display: 'block' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 7, fontWeight: 600, color: '#1f1f1f' }}>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <span style={{ background: '#c8102e', color: '#fff', padding: '3px 7px', borderRadius: 999, fontSize: 7, fontWeight: 800, whiteSpace: 'nowrap' }}>
            ☎ (214) 909-5338
          </span>
        </div>

        {/* 3px brand-bar gradient strip */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #002f87 0%, #002f87 35%, #6b2150 50%, #c8102e 65%, #c8102e 100%)', flexShrink: 0 }} />

        {/* Hero body, sky-pale gradient + headline left, Emilio photo right */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(180deg, #f4faff 0%, #eaf4fb 100%)',
            padding: '10px 12px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 10,
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Soft brand glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(40% 50% at 92% 12%, rgba(251,198,58,0.18) 0%, transparent 60%), radial-gradient(35% 40% at 6% 90%, rgba(0,47,135,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 6, fontWeight: 800, color: '#002f87', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#c8102e' }} />
              DFW · The Colony, TX
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: 'clamp(14px, 1.9vw, 22px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: '#001a4a',
                marginTop: 4,
              }}
            >
              Air conditioning <br />
              done the <span style={{ color: '#c8102e' }}>honest</span> way.
            </span>
            <span style={{ fontSize: 7, color: 'rgba(15,15,15,0.65)', marginTop: 4, maxWidth: '94%', lineHeight: 1.35 }}>
              Family-owned, bilingual HVAC. 15+ years on Texas systems.
            </span>
            <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ background: '#c8102e', color: '#fff', padding: '3px 8px', borderRadius: 999, fontSize: 7, fontWeight: 800 }}>Call now</span>
              <span style={{ background: '#fbc63a', color: '#001a4a', padding: '3px 8px', borderRadius: 999, fontSize: 7, fontWeight: 800 }}>Free estimate</span>
            </div>
          </div>

          {/* Real Emilio photo */}
          <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: '0 6px 14px -6px rgba(0,26,74,0.4)' }}>
            <Image
              src="/portfolio/jc-air-pro/emilio-jobsite.png"
              alt="Emilio of JC Air Pro next to a new AC condenser at a DFW home"
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 55%, rgba(0,26,74,0.35) 100%)',
              }}
            />
            {/* Floating 5★ badge */}
            <div style={{ position: 'absolute', bottom: 3, left: 3, right: 3, background: '#fff', borderRadius: 4, padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
              <span style={{ fontSize: 6, fontWeight: 800, color: '#001a4a' }}>15+ yrs · DFW</span>
              <span style={{ fontSize: 6, color: '#fbc63a', letterSpacing: 0.5 }}>★★★★★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status footer, same as PortfolioCard */}
      <div
        style={{
          background: isReal ? 'rgba(22,163,74,0.08)' : 'rgba(245,98,15,0.08)',
          borderTop: `1px solid ${isReal ? 'rgba(22,163,74,0.25)' : 'rgba(245,98,15,0.25)'}`,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: isReal ? '#16a34a' : ORANGE, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: isReal ? '#16a34a' : ORANGE }}>
          {isReal ? 'Launching this month' : 'Founding slot · open'}
        </span>
      </div>
    </div>
  )
}

// Special-case card for Breezy Detailing. Renders a faithful mini of the
// actual Breezy homepage hero (real logo, real chrome silver + electric
// blue brand on carbon black) instead of the generic dark+orange
// Opervo template. Same reason as JcAirProShowcase, the portfolio
// should preview what the operator's site actually looks like.
function BreezyDetailingShowcase({ entry }: { entry: PortfolioEntry }) {
  const isReal = entry.status === 'real'
  const CHROME_GRADIENT =
    'linear-gradient(180deg, #ffffff 0%, #ffffff 22%, #c8ccd1 52%, #8a8e93 78%, #c8ccd1 100%)'
  return (
    <div
      style={{
        background: '#0a0a0c',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 12px 30px -12px rgba(0,0,0,0.45), 0 4px 10px -4px rgba(0,0,0,0.2)',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="portfolio-card"
    >
      {/* Browser chrome */}
      <div style={{ background: '#0a0a0a', padding: '6px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #1a1b1f' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, background: '#1a1b1f', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#8a8e93', textAlign: 'center', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
          {entry.domain}
        </span>
      </div>

      {/* Page composition, Breezy hero in miniature */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0c',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* Electric blue glow + subtle grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(55% 60% at 92% 0%, rgba(0,176,255,0.30) 0%, transparent 60%), radial-gradient(45% 50% at 5% 100%, rgba(0,145,234,0.10) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        {/* Header strip */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 10px 5px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                background: CHROME_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 900,
                fontSize: 11,
                letterSpacing: '-0.02em',
              }}
            >
              BREEZY
            </span>
            <span
              style={{
                color: '#00b0ff',
                fontWeight: 800,
                fontSize: 4.5,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                marginTop: 1,
              }}
            >
              Detailing
            </span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            <span>Services</span>
            <span>About</span>
            <span>Service Area</span>
          </div>
          <span
            style={{
              background: '#0091ea',
              color: '#fff',
              padding: '3px 7px',
              borderRadius: 999,
              fontSize: 7,
              fontWeight: 800,
              boxShadow: '0 4px 10px -4px rgba(0,145,234,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            ☎ (972) 697-5531
          </span>
        </div>

        {/* Hero body, chrome headline left, logo lockup right */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            padding: '10px 12px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 10,
            alignItems: 'center',
          }}
        >
          {/* Left: eyebrow + chrome headline */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span
              style={{
                fontSize: 5.5,
                fontWeight: 800,
                color: '#00b0ff',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#00b0ff', boxShadow: '0 0 6px rgba(0,176,255,0.8)' }} />
              The Colony, TX · DFW Mobile
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: 'clamp(14px, 2vw, 22px)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  background: CHROME_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Showroom finish.
              </span>
              <span style={{ color: '#fff' }}>Every drive,</span>
              <span style={{ color: '#00b0ff' }}>no compromise.</span>
            </span>
            <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', marginTop: 5, maxWidth: '94%', lineHeight: 1.35 }}>
              Lexus-trained · Mobile + in-shop · DFW-wide
            </span>
            <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ background: '#0091ea', color: '#fff', padding: '3px 8px', borderRadius: 999, fontSize: 7, fontWeight: 800, boxShadow: '0 4px 10px -4px rgba(0,145,234,0.6)' }}>
                Call now
              </span>
              <span style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '3px 8px', borderRadius: 999, fontSize: 7, fontWeight: 800, border: '1px solid rgba(200,204,209,0.35)' }}>
                Text Ricardo
              </span>
            </div>
          </div>

          {/* Right: glassy logo card */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
              display: 'grid',
              placeItems: 'center',
              padding: 8,
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(0,176,255,0.18) 0%, transparent 35%, transparent 65%, rgba(200,204,209,0.12) 100%)',
              }}
            />
            <Image
              src="/portfolio/breezy-detailing/logo.png"
              alt="Breezy Detailing logo"
              width={220}
              height={220}
              style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Status footer, match other cards */}
      <div
        style={{
          background: isReal ? 'rgba(22,163,74,0.08)' : 'rgba(245,98,15,0.08)',
          borderTop: `1px solid ${isReal ? 'rgba(22,163,74,0.25)' : 'rgba(245,98,15,0.25)'}`,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: isReal ? '#16a34a' : ORANGE, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: isReal ? '#16a34a' : ORANGE }}>
          {isReal ? 'Launching this month' : 'Founding slot · open'}
        </span>
      </div>
    </div>
  )
}

// Special-case card for Code 3 Cleaning. Renders a faithful mini of the
// live www.codethreecleaning.com homepage hero: real oval logo badge,
// the real pressure-wash photo, Anton heavy caps, brand crimson #E22400,
// the real "FAST. THOROUGH. SPOTLESS." headline, service chips, CTAs.
// Same pattern as JcAirProShowcase and BreezyDetailingShowcase: the
// portfolio should preview the operator's actual live site, not a
// template of itself.
function Code3CleaningShowcase({ entry }: { entry: PortfolioEntry }) {
  const isReal = entry.status === 'real'
  const C3_RED = '#E22400'
  const C3_DARK = '#0F0F10'
  return (
    <div
      style={{
        background: C3_DARK,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 12px 30px -12px rgba(0,0,0,0.45), 0 4px 10px -4px rgba(0,0,0,0.2)',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="portfolio-card"
    >
      {/* Browser chrome */}
      <div style={{ background: '#0a0a0a', padding: '6px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #1a1a1a' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, background: '#1a1a1a', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#8a8580', textAlign: 'center', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
          {entry.domain}
        </span>
      </div>

      {/* Hero composition — full-bleed photo with scrim, centered content */}
      <div style={{ position: 'relative', aspectRatio: '4 / 3', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: '#fff' }}>
        {/* Real pressure-wash hero photo */}
        <Image
          src="/portfolio/code-3-cleaning/hero.jpg"
          alt="Terren of Code 3 Cleaning running a rotary surface cleaner on a driveway in Silverton, OR"
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          style={{ objectFit: 'cover', objectPosition: '38% 26%', filter: 'brightness(1.07) saturate(1.1)' }}
        />
        {/* Dark scrim — mirrors the live page (red glow top-right, dark center, edge fade) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(220px 150px at 75% 18%, rgba(226,36,0,0.28), transparent 60%), ' +
              'radial-gradient(300px 220px at 50% 45%, rgba(15,15,16,0.66), transparent 72%), ' +
              'linear-gradient(180deg, rgba(15,15,16,0.78) 0%, rgba(15,15,16,0.55) 38%, rgba(15,15,16,0.45) 68%, rgba(15,15,16,0.72) 100%)',
          }}
        />

        {/* Tiny utility/nav strip across the top */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', flexShrink: 0 }}>
          <Image
            src="/portfolio/code-3-cleaning/logo.png"
            alt="Code 3 Cleaning logo"
            width={140}
            height={92}
            style={{ width: 42, height: 'auto', display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 6.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
              <span>Services</span>
              <span>About</span>
              <span>Service Area</span>
              <span>Reviews</span>
            </span>
            <span style={{ background: C3_RED, color: '#fff', padding: '3px 7px', borderRadius: 4, fontSize: 7, fontWeight: 800, fontFamily: "'Inter', system-ui, sans-serif", whiteSpace: 'nowrap', boxShadow: '0 2px 6px rgba(226,36,0,0.4)' }}>
              Get a Free Quote
            </span>
          </div>
        </div>

        {/* Centered hero text — mirrors live single-column composition */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4px 16px 12px' }}>
          {/* Lead chip: the differentiator */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: C3_RED, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 6, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, boxShadow: '0 4px 12px rgba(226,36,0,0.38)' }}>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#fff' }} />
            Serving the Willamette Valley
          </span>

          {/* Headline — Anton, "FAST. THOROUGH. SPOTLESS." on two lines */}
          <span
            style={{
              fontFamily: "'Anton', 'Barlow Condensed', sans-serif",
              fontSize: 'clamp(24px, 3.4vw, 38px)',
              lineHeight: 0.94,
              letterSpacing: '0.005em',
              textTransform: 'uppercase',
              marginTop: 8,
              textShadow: '0 2px 14px rgba(0,0,0,0.55)',
              fontWeight: 400,
            }}
          >
            Fast. Thorough.<br />
            <span style={{ color: C3_RED }}>Spotless.</span>
          </span>

          {/* Subhead */}
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, color: 'rgba(255,255,255,0.92)', marginTop: 6, maxWidth: '88%', lineHeight: 1.45, textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}>
            Window cleaning, pressure washing, carpet, and mobile screen repair. Owner-operated by Terren Harrington.
          </span>

          {/* Service chips */}
          <div style={{ display: 'flex', gap: 3, marginTop: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Window cleaning', 'Pressure washing', 'Carpet', 'Screen repair'].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 5.5,
                  fontWeight: 600,
                  color: '#fff',
                  padding: '2px 6px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.22)',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 4, marginTop: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ background: C3_RED, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, fontWeight: 800, padding: '4px 10px', borderRadius: 4, boxShadow: '0 4px 10px rgba(226,36,0,0.38)' }}>
              Get a Free Quote
            </span>
            <span style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, fontWeight: 700, padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.3)' }}>
              (503) 983-0126
            </span>
          </div>
        </div>
      </div>

      {/* Trust strip below the hero (matches the live page bar under fold) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '7px 10px', background: '#0a0a0b', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, fontWeight: 700, color: '#fff' }}>
          <span style={{ color: '#FBBF24', fontSize: 8, letterSpacing: 0.5 }}>★★★★★</span>
          5.0
        </span>
        <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>136+ jobs done</span>
        <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 7, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>Insured + bonded</span>
      </div>

      {/* Status footer, matches other showcase cards */}
      <div
        style={{
          background: isReal ? 'rgba(22,163,74,0.08)' : 'rgba(245,98,15,0.08)',
          borderTop: `1px solid ${isReal ? 'rgba(22,163,74,0.25)' : 'rgba(245,98,15,0.25)'}`,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: isReal ? '#16a34a' : ORANGE, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: isReal ? '#16a34a' : ORANGE }}>
          {isReal ? 'Live now' : 'Founding slot · open'}
        </span>
      </div>
    </div>
  )
}

function PortfolioCard({ entry }: { entry: PortfolioEntry }) {
  const isReal = entry.status === 'real'
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 12px 30px -12px rgba(0,0,0,0.25), 0 4px 10px -4px rgba(0,0,0,0.12)',
      position: 'relative',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }} className="portfolio-card">
      {/* Browser chrome */}
      <div style={{ background: '#0a0a0a', padding: '6px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, background: '#1a1a1a', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#8a8580', textAlign: 'center', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
          {entry.domain}
        </span>
      </div>

      {/* Page composition */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 55%, #3a2a18 100%)',
        padding: '14px 16px 16px',
        position: 'relative',
        aspectRatio: '4 / 3',
        display: 'flex',
        flexDirection: 'column',
        color: '#F7F5F2',
      }}>
        {/* Top nav strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {entry.brand}{entry.brandSuffix && <span style={{ fontWeight: 600 }}> {entry.brandSuffix}</span>}<span style={{ color: ORANGE }}>.</span>
          </span>
          <span style={{ background: ORANGE, color: '#fff', padding: '3px 7px', borderRadius: 3, fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Book
          </span>
        </div>

        {/* Eyebrow */}
        <span style={{ fontSize: 7, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>
          {entry.location} · {entry.trade}
        </span>

        {/* Headline */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 2.4vw, 28px)', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#F7F5F2' }}>
            {entry.headline}<br />
            <span style={{ color: ORANGE }}>{entry.headlineAccent}</span>
          </span>
          <span style={{ fontSize: 9, color: '#a8a39e', marginTop: 6, fontWeight: 500, maxWidth: '88%', lineHeight: 1.35 }}>
            {entry.tagline}
          </span>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10, padding: '6px 0 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {entry.stats.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, color: ORANGE, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 6.5, color: '#8a8580', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status footer */}
      <div style={{
        background: isReal ? 'rgba(22,163,74,0.08)' : 'rgba(245,98,15,0.08)',
        borderTop: `1px solid ${isReal ? 'rgba(22,163,74,0.25)' : 'rgba(245,98,15,0.25)'}`,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}>
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: isReal ? '#16a34a' : ORANGE, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: isReal ? '#16a34a' : ORANGE }}>
          {isReal ? 'Launching this month' : 'Founding slot · open'}
        </span>
      </div>
    </div>
  )
}

const PORTFOLIO_ENTRIES: PortfolioEntry[] = [
  {
    brand: 'JC Air Pro',
    domain: 'jcairpro.com',
    trade: 'AC · Heating · Commercial HVAC',
    location: 'DFW · Texas',
    headline: 'Honest AC',
    headlineAccent: 'done right.',
    tagline: 'Family-owned, bilingual HVAC. Texas Class A licensed. 15+ years on Dallas systems.',
    stats: [{ n: '15+', l: 'Years' }, { n: '5★', l: 'Google' }, { n: '16', l: 'DFW cities' }],
    status: 'real',
    slug: 'jc-air-pro',
  },
  {
    brand: 'Code 3',
    brandSuffix: 'Cleaning',
    domain: 'codethreecleaning.com',
    trade: 'Windows · Pressure · Carpet · Screens',
    location: 'Willamette Valley · OR',
    headline: 'Fast. Thorough.',
    headlineAccent: 'Spotless.',
    tagline: 'Window cleaning, pressure washing, carpet & mobile screen repair. Owner-operated by Terren Harrington.',
    stats: [{ n: '136+', l: 'Jobs done' }, { n: '5★', l: 'Rating' }, { n: 'Same', l: 'Day quotes' }],
    status: 'real',
    slug: 'code-3-cleaning',
  },
  {
    brand: 'BrightPath',
    brandSuffix: 'Pressure',
    domain: 'brightpathpressure.com',
    trade: 'Pressure Washing',
    location: 'Texas',
    headline: 'House washes',
    headlineAccent: 'without streaks.',
    tagline: 'Soft wash, driveway, fleet, commercial. Soap-soft. Surface-safe.',
    stats: [{ n: '2k psi', l: 'Soft wash' }, { n: '48hr', l: 'Quote turn' }, { n: '$2M', l: 'Insured' }],
    status: 'open',
  },
  {
    brand: 'Greenrow',
    brandSuffix: 'Lawn',
    domain: 'greenrowlawn.com',
    trade: 'Landscaping · Lawn',
    location: 'Georgia',
    headline: 'Curb appeal',
    headlineAccent: 'every visit.',
    tagline: 'Lawn maintenance, edging, mulch, seasonal cleanups. Weekly plans available.',
    stats: [{ n: '200+', l: 'Properties' }, { n: '4.9★', l: 'Google' }, { n: 'Weekly', l: 'Plans' }],
    status: 'open',
  },
  {
    brand: 'Sunbeam',
    brandSuffix: 'Solar',
    domain: 'sunbeamsolar.io',
    trade: 'Solar Panel Cleaning',
    location: 'Arizona',
    headline: 'Restore your',
    headlineAccent: 'panel output.',
    tagline: 'Solar panel washing with deionized water. No streaks. No scratches. More kWh.',
    stats: [{ n: '+30%', l: 'Avg gain' }, { n: 'DI', l: 'Water only' }, { n: '24hr', l: 'Booking' }],
    status: 'open',
  },
  {
    brand: 'Breezy',
    brandSuffix: 'Detailing',
    domain: 'breezydetailing.com',
    trade: 'Auto Detailing · Ceramic · Mobile',
    location: 'DFW · Texas',
    headline: 'Showroom finish.',
    headlineAccent: 'Every drive.',
    tagline: 'Premium auto detailing. Lexus-trained correction. Mobile + in-shop across DFW.',
    stats: [{ n: '5★', l: 'Detail work' }, { n: 'DFW', l: 'Coverage' }, { n: '16', l: 'Cities' }],
    status: 'real',
    slug: 'breezy-detailing',
  },
  {
    brand: 'Apex',
    brandSuffix: 'Roof & Concrete',
    domain: 'apexroofco.com',
    trade: 'Roof · Concrete',
    location: 'Colorado',
    headline: 'Roof restore',
    headlineAccent: 'and seal it.',
    tagline: 'Soft-wash roof cleaning, concrete sealing, paver restoration. Built for the truck.',
    stats: [{ n: '10yr', l: 'Seal life' }, { n: 'Soft', l: 'Wash only' }, { n: 'Free', l: 'Estimates' }],
    status: 'open',
  },
]

export default function SitesPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  // ROI calculator state
  const [avgJob, setAvgJob] = useState<number>(350)
  const [leadsPerMo, setLeadsPerMo] = useState<number>(20)
  // Industry-typical conversion uplifts (we publish these as conservative).
  // Markate quotes +212% inquiries, we use a more credible +50% on lead volume
  // from a real Pro Site vs no site. Customer can override mentally.
  const incrementalLeadsPerMo = Math.round(leadsPerMo * 0.5)
  const closeRate = 0.30
  const newJobsPerMo = Math.round(incrementalLeadsPerMo * closeRate)
  const newRevenuePerMo = newJobsPerMo * avgJob
  const breakEvenJobs = Math.max(1, Math.ceil(39.99 / avgJob))
  const opervoCost24mo = 39.99 * 24
  const markateCost24mo = 89 * 24
  const opervoOwnCost24mo = 499 // one-time, no renewal in 24mo window
  const savings24moVsMarkate = markateCost24mo - opervoCost24mo
  const savings24moVsMarkateOwn = markateCost24mo - opervoOwnCost24mo

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: "'Barlow', sans-serif", color: INK }}>
      <SiteNav />

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px 80px' }}>
        <div
          style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)', gap: 64, alignItems: 'center' }}
          className="hero-grid"
        >
          {/* Left, text + CTAs */}
          <div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', color: ORANGE, textTransform: 'uppercase', margin: '0 0 20px' }}>
              Opervo Sites
            </p>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(44px, 7vw, 86px)', lineHeight: 0.95, textTransform: 'uppercase', color: BLACK, margin: 0, letterSpacing: '-0.02em' }}>
              Look pro. <Highlight>Win jobs.</Highlight><br />
              <span style={{ color: ORANGE }}>Online too.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.5, color: MUTED, maxWidth: 540, margin: '28px 0 0' }}>
              Done-for-you SEO websites built specifically for home service operators. Real local SEO, your domain, 30-day delivery, and <Highlight>you own it</Highlight>.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <a
                href="https://opervo-pro-sites.vercel.app/intake"
                target="_blank"
                rel="noreferrer"
                style={primaryBtn}
              >
                Start your questionnaire
              </a>
              <a href="#pricing" style={secondaryBtn}>See pricing</a>
            </div>
            <p style={{ fontSize: 13, color: MUTED, marginTop: 24 }}>
              $39.99/mo or $499 to own · custom domain included · 30-day delivery · 60-day money back
            </p>
          </div>

          {/* Right, laptop mockup */}
          <div>
            <LaptopMockup />
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 24px 88px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', color: ORANGE, textTransform: 'uppercase', margin: '0 0 12px' }}>
                The portfolio
              </p>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, textTransform: 'uppercase', color: BLACK, lineHeight: 0.95, margin: 0, letterSpacing: '-0.01em', maxWidth: 720 }}>
                Seven trades. <Highlight>One slot each.</Highlight>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: MUTED, margin: '14px 0 0', maxWidth: 560 }}>
                JC Air Pro, Breezy Detailing, and Code 3 are the first three builds, launching now. The other four are Founding slots: free Pro Site Ownership ($499 value) + free Opervo CRM for 12 months ($299 value) + priority queue + Founding Customer placement. One per trade.
              </p>
            </div>
            <a href="#founding-5" style={{ ...secondaryBtn, whiteSpace: 'nowrap' }}>
              Apply for a slot
            </a>
          </div>

          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
            {PORTFOLIO_ENTRIES.map((entry, i) => {
              const Card =
                entry.slug === 'jc-air-pro'
                  ? JcAirProShowcase
                  : entry.slug === 'breezy-detailing'
                  ? BreezyDetailingShowcase
                  : entry.slug === 'code-3-cleaning'
                  ? Code3CleaningShowcase
                  : PortfolioCard
              return entry.slug ? (
                <Link
                  key={i}
                  href={`/preview/${entry.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  aria-label={`Preview the ${entry.brand} site`}
                >
                  <Card entry={entry} />
                </Link>
              ) : (
                <Card key={i} entry={entry} />
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM STRIP ─────────────────────────────────────────────── */}
      <section style={{ background: WARM, padding: '56px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>The website problem</p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: 40 }}>Three ways operators lose right now.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { title: 'DIY tools eat your weekends.', body: 'Wix and Squarespace look fine, until you spend 40 hours building one yourself and it still looks like a template.' },
              { title: 'Agencies charge $5,000+.', body: 'Real agencies want enterprise contracts. They quote $5K-$15K, lock you into multi-year retainers, and never call you back.' },
              { title: 'CRM booking pages aren’t websites.', body: 'Jobber and HCP give you a booking link with their logo on it. That’s not the site customers Google before they call you.' },
            ].map((p, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, textTransform: 'uppercase', color: BLACK, margin: '0 0 12px', lineHeight: 1.15 }}>{p.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: MUTED, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>What you get</p>
          <h2 style={{ ...sectionH2, textAlign: 'center' }}>A real website. Built for your trade.</h2>
          <p style={{ ...sectionSub, textAlign: 'center', maxWidth: 600, margin: '12px auto 48px' }}>
            Not a template. Not a booking page. A custom-built marketing site that works as hard as you do.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: ICONS.search, title: 'Real local SEO', body: 'Service pages by trade. Schema markup. Google Business Profile integration. We optimize for the searches your customers actually type.' },
              { icon: ICONS.globe, title: 'Your custom domain', body: 'Bring your own or we register one at cost. No subdomain. No co-branding. Just yours.' },
              { icon: ICONS.smartphone, title: 'Mobile-first design', body: 'Most of your customers will see your site on a phone. Built mobile-first, tested on real devices.' },
              { icon: ICONS.image, title: 'Photo galleries', body: 'Before/after grids built from your work. Drag-and-drop replacement so you can refresh anytime.' },
              { icon: ICONS.mail, title: 'Quote forms that work', body: 'Lead capture routes to your email, or directly into your Opervo CRM if you’re using it.' },
              { icon: ICONS.shield, title: 'Hosting + SSL + security', body: 'Included. Forever. No GoDaddy upcharges, no plugin chaos, no "your SSL expired" emails.' },
              { icon: ICONS.bolt, title: '30-day delivery', body: 'From order to live, in 30 days. Schedule a 60-min intake call within 72 hours. First draft by day 21.' },
              { icon: ICONS.key, title: 'You own it. Always.', body: 'Leave anytime. We hand you a static export and transfer your domain. No hostage CMS, no exit penalty.' },
            ].map((f, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(245,98,15,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon d={f.icon} size={22} color={ORANGE} />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, textTransform: 'uppercase', color: BLACK, margin: '0 0 8px', lineHeight: 1.2 }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: MUTED, margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRO SITE LIVE, THE MOAT ──────────────────────────────────── */}
      <section style={{ background: BLACK, color: '#F7F5F2', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="live-grid">
          <div>
            <p style={{ ...eyebrow, color: ORANGE }}>The Opervo difference</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
              Already on Opervo?<br />
              <Highlight dark><span style={{ color: '#F7F5F2' }}>Your site comes alive.</span></Highlight>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#c8c4be', margin: '0 0 28px' }}>
              Connect your Opervo CRM and your Pro Site stops being a brochure. Services, photos, reviews, hours, service areas, all pull from the app in real time. Quote forms route straight into your pipeline.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'New service added in Opervo → appears on your site',
                'Job completed with photos → gallery updates',
                'New 5-star review → shows on your homepage',
                'Quote form submission → lead in your Opervo inbox',
              ].map((line, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Icon d={ICONS.check} size={14} color="#fff" stroke={3} />
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.4, color: '#F7F5F2' }}>{line}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 14, color: '#8a8580', margin: '28px 0 0' }}>
              Not on Opervo yet? The site works perfectly standalone, connect anytime later.
            </p>
          </div>

          <div style={{ background: '#1a1a1a', border: `1px solid #2a2a2a`, borderRadius: 16, padding: 32, position: 'relative' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.25em', color: ORANGE, textTransform: 'uppercase', margin: '0 0 18px' }}>
              The flow
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Opervo App', sub: 'You add a new service, complete a job, get a review' },
                { label: 'Pro Site Live', sub: 'Site auto-updates within minutes, no copy/paste' },
                { label: 'Customer Visit', sub: 'They see fresh photos, real reviews, accurate pricing' },
                { label: 'Quote Submitted', sub: 'Lead lands in your Opervo inbox with full context' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18 }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: '#F7F5F2', margin: 0, letterSpacing: '0.02em' }}>{step.label}</p>
                    <p style={{ fontSize: 13, color: '#8a8580', margin: '2px 0 0' }}>{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>Pricing</p>
          <h2 style={{ ...sectionH2, textAlign: 'center' }}>Two on-ramps. Both published. No sales calls.</h2>
          <p style={{ ...sectionSub, textAlign: 'center', maxWidth: 640, margin: '12px auto 14px' }}>
            Markate charges $89/mo for a website. We do it for $39.99/mo with custom domain included, or $499 to own forever.
            Every Opervo customer already gets a free <a href="/" style={{ color: ORANGE, fontWeight: 700 }}>Folio</a> with their CRM, this is for operators who want more.
          </p>
          <p style={{ fontSize: 13, color: MUTED, textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            All tiers include 60-day money back. No contracts. Cancel any time.
          </p>

          {/* Two pricing cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32, maxWidth: 820, margin: '0 auto 32px' }}>
            {/* Tier 1: Monthly (most popular) */}
            <div style={{ ...pricingCard, borderColor: ORANGE, borderWidth: 2, position: 'relative', padding: 32 }}>
              <div style={{ position: 'absolute', top: -12, left: 24, background: ORANGE, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4 }}>
                Most popular
              </div>
              <p style={pricingTier}>Pro Site · Monthly</p>
              <p style={pricingPrice}>
                <span style={{ fontSize: 56 }}>$39.99</span>
                <span style={pricingMo}>/mo</span>
              </p>
              <p style={pricingSubLine}>Hosted, maintained, custom domain included.</p>
              <ul style={pricingList}>
                {[
                  'Full multi-page site, your trade',
                  'Service + location SEO pages',
                  'Custom domain included',
                  'Hosting + SSL + renewals',
                  'Unlimited minor edits',
                  '30-day delivery',
                  '60-day money back',
                ].map((item, i) => (
                  <li key={i} style={pricingLi}>
                    <Icon d={ICONS.check} size={16} color={ORANGE} stroke={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://opervo-pro-sites.vercel.app/intake"
                target="_blank"
                rel="noreferrer"
                style={{ ...primaryBtn, display: 'block', textAlign: 'center', marginTop: 24, padding: '14px 22px', fontSize: 15 }}
              >
                Start your questionnaire
              </a>
              <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', margin: '12px 0 0' }}>
                Markate Growth: <strong style={{ color: BLACK }}>$89/mo</strong>. You save $49/mo.
              </p>
            </div>

            {/* Tier 2: Ownership */}
            <div style={{ ...pricingCard, padding: 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: 24, background: BLACK, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4 }}>
                Own it
              </div>
              <p style={pricingTier}>Pro Site · Ownership</p>
              <p style={pricingPrice}>
                <span style={{ fontSize: 56 }}>$499</span>
                <span style={pricingMo}>once</span>
              </p>
              <p style={pricingSubLine}>Hand me the keys. I&apos;ll take it from here.</p>
              <ul style={pricingList}>
                {[
                  'Everything in Monthly, plus:',
                  'Static export, fully yours',
                  'Domain transferred to your name',
                  'Netlify Drop hosting instructions',
                  'No ongoing fee. Walk away clean.',
                  'Re-engage anytime (we don’t lock you out)',
                ].map((item, i) => (
                  <li key={i} style={pricingLi}>
                    <Icon d={ICONS.check} size={16} color={ORANGE} stroke={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://opervo-pro-sites.vercel.app/intake"
                target="_blank"
                rel="noreferrer"
                style={{ ...secondaryBtn, display: 'block', textAlign: 'center', marginTop: 24, padding: '14px 22px', fontSize: 15 }}
              >
                Start your questionnaire
              </a>
              <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', margin: '12px 0 0' }}>
                $39.99 × 12 = $479. Buy it out after year 1 if you stay.
              </p>
            </div>

          </div>

          {/* Pro Site customer loyalty perk on CRM */}
          <div style={{ background: SURFACE, border: `1.5px solid ${ORANGE}`, borderRadius: 10, padding: '16px 22px', margin: '0 auto 24px', maxWidth: 720, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: INK, margin: 0, lineHeight: 1.55 }}>
              <strong style={{ color: ORANGE, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block', marginRight: 8 }}>
                Loyalty perk
              </strong>
              Pro Site customers get <strong style={{ color: BLACK }}>20% off Opervo CRM</strong> for life. Solo <strong>$19.99/mo</strong>, Team <strong>$44.99/mo</strong>. Discount runs as long as your Pro Site is active.
            </p>
          </div>

          {/* Domain policy callout */}
          <div style={{ background: WARM, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginTop: 8 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: BLACK, margin: '0 0 12px', letterSpacing: '0.02em' }}>
              How domains work, honest version
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, fontSize: 14, color: INK, lineHeight: 1.55 }}>
              <div>
                <strong>Standard TLDs included.</strong> .com, .net, .org, .co. We register in <em>your</em> name, no markup. Renewal baked into your tier.
              </div>
              <div>
                <strong>Premium TLDs at cost.</strong> .io, .ai, .pro, .plumber, etc. We pass through what the registrar charges. No surprise.
              </div>
              <div>
                <strong>Already have a domain?</strong> Keep it. We&apos;ll point DNS at the site. No fee to bring your own.
              </div>
            </div>
            <p style={{ fontSize: 12, color: MUTED, margin: '14px 0 0', fontStyle: 'italic' }}>
              Domain registration is always in your name, we never own your URL. Markate registers in theirs. That&apos;s the gatekeeping we don&apos;t do.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ROI CALCULATOR ────────────────────────────────────────────── */}
      <section style={{ background: WARM, padding: '80px 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={eyebrow}>Run the math</p>
          <h2 style={{ ...sectionH2, textAlign: 'center' }}>How many jobs to pay for the site?</h2>
          <p style={{ ...sectionSub, textAlign: 'center', maxWidth: 580, margin: '12px auto 40px' }}>
            Plug in your numbers. We&apos;ll show you the break-even, the realistic new revenue, and what 24 months looks like vs Markate.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', gap: 28 }} className="roi-grid">
            {/* Inputs */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 28 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', color: MUTED, margin: '0 0 18px' }}>
                Your business
              </p>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>
                Average job value
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: BLACK }}>$</span>
                <input
                  type="number"
                  value={avgJob}
                  min={0}
                  step={25}
                  onChange={(e) => setAvgJob(Math.max(0, parseInt(e.target.value || '0', 10)))}
                  style={{ flex: 1, fontFamily: 'inherit', fontSize: 22, fontWeight: 800, color: BLACK, border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: '8px 12px', outline: 'none' }}
                />
              </div>
              <input
                type="range"
                min={50}
                max={2500}
                step={25}
                value={avgJob}
                onChange={(e) => setAvgJob(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: ORANGE, marginBottom: 24 }}
              />

              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>
                Leads per month (today)
              </label>
              <input
                type="number"
                value={leadsPerMo}
                min={0}
                step={1}
                onChange={(e) => setLeadsPerMo(Math.max(0, parseInt(e.target.value || '0', 10)))}
                style={{ width: '100%', fontFamily: 'inherit', fontSize: 22, fontWeight: 800, color: BLACK, border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: '8px 12px', outline: 'none', marginBottom: 6, boxSizing: 'border-box' }}
              />
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={leadsPerMo}
                onChange={(e) => setLeadsPerMo(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: ORANGE, marginBottom: 12 }}
              />
              <p style={{ fontSize: 11, color: MUTED, margin: 0, fontStyle: 'italic' }}>
                Our math assumes +50% leads from having a real site, 30% close rate. Conservative.
              </p>
            </div>

            {/* Outputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: BLACK, color: '#F7F5F2', borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', color: ORANGE, margin: '0 0 6px' }}>
                  Break-even on Pro Site Monthly
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 48px)', lineHeight: 1, margin: '0 0 6px', color: '#F7F5F2' }}>
                  {breakEvenJobs} job{breakEvenJobs === 1 ? '' : 's'}/mo
                </p>
                <p style={{ fontSize: 14, color: '#c8c4be', margin: 0 }}>
                  At ${avgJob} average, you pay back $39.99/mo with just {breakEvenJobs} extra job per month.
                </p>
              </div>

              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', color: MUTED, margin: '0 0 6px' }}>
                  Realistic new revenue
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1, margin: '0 0 4px', color: BLACK }}>
                  +${newRevenuePerMo.toLocaleString()}/mo
                </p>
                <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
                  {incrementalLeadsPerMo} more leads × {Math.round(closeRate * 100)}% close × ${avgJob}.
                  That&apos;s <strong style={{ color: BLACK }}>${(newRevenuePerMo * 12).toLocaleString()}/yr</strong>.
                </p>
              </div>

              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', color: MUTED, margin: '0 0 12px' }}>
                  24-month total cost
                </p>
                <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: INK }}>Opervo Pro Site Monthly</span>
                    <strong style={{ color: ORANGE }}>${opervoCost24mo.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: INK }}>Opervo Pro Site Ownership</span>
                    <strong style={{ color: ORANGE }}>${opervoOwnCost24mo.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: MUTED }}>Markate Growth ($89/mo)</span>
                    <strong style={{ color: MUTED, textDecoration: 'line-through' }}>${markateCost24mo.toLocaleString()}</strong>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: INK, margin: '14px 0 0', borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
                  You save <strong style={{ color: ORANGE }}>${savings24moVsMarkate.toLocaleString()}</strong> over 2 years on Monthly,
                  or <strong style={{ color: ORANGE }}>${savings24moVsMarkateOwn.toLocaleString()}</strong> on Ownership.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: MUTED, margin: '24px auto 0', maxWidth: 720, textAlign: 'center', fontStyle: 'italic' }}>
            Honest disclosure: +50% lead lift and 30% close rate are reasonable midpoints, not guarantees.
            Your business will perform better or worse depending on your offer, market, and reviews.
            We picked numbers we believe we can defend in court if a competitor challenges them.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section style={{ background: WARM, padding: '80px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>How it works</p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: 48 }}>From order to live in 30 days.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { n: '01', title: 'Questionnaire', body: 'Self-serve form, ~20 minutes, auto-saves in your browser. No sales call.' },
              { n: '02', title: 'Pick a tier', body: '$39.99/mo (we host + edit) or $499 to own outright. You decide after we review the questionnaire.' },
              { n: '03', title: 'Build', body: 'First draft by day 21. Review, revise, finalize. Live by day 30.' },
              { n: '04', title: 'Yours forever', body: 'Custom domain in your name. Static export on exit. No lock-in either way.' },
            ].map((step) => (
              <div key={step.n} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: ORANGE, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{step.n}</p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, textTransform: 'uppercase', color: BLACK, margin: '0 0 8px', lineHeight: 1.15 }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: MUTED, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDING 5 ────────────────────────────────────────────────── */}
      <section id="founding-5" style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ background: BLACK, color: '#F7F5F2', borderRadius: 20, padding: 'clamp(32px, 5vw, 56px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, background: ORANGE, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 4 }}>
              Limited
            </div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', color: ORANGE, textTransform: 'uppercase', margin: '0 0 16px' }}>
              Founding 5
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
              Free Pro Site. <Highlight dark>One slot per trade.</Highlight>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#c8c4be', margin: '0 0 28px', maxWidth: 680 }}>
              Our first 5 paid CRM customers get the <strong style={{ color: '#F7F5F2' }}>$499 Ownership tier free</strong>, plus <strong style={{ color: '#F7F5F2' }}>free Opervo CRM for 12 months</strong> ($299 value), <strong style={{ color: '#F7F5F2' }}>priority queue</strong> (built first), public Founding Customer placement on this page, and an on-camera testimonial we shoot together. Total value: <strong style={{ color: '#F7F5F2' }}>$798</strong>. One slot per trade.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
              {[
                { trade: 'Pressure washing', taken: false },
                { trade: 'Landscaping / lawn', taken: false },
                { trade: 'Solar panel cleaning', taken: false },
                { trade: 'Mobile detailing', taken: false },
                { trade: 'Roof / concrete', taken: false },
              ].map((slot, i) => (
                <div key={i} style={{ background: slot.taken ? 'transparent' : 'rgba(245,98,15,0.12)', border: `1px solid ${slot.taken ? '#3a3a3a' : ORANGE}`, color: slot.taken ? '#6a6560' : '#F7F5F2', padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: slot.taken ? 'line-through' : 'none' }}>
                  {slot.trade}{slot.taken ? ', taken' : ', open'}
                </div>
              ))}
            </div>
            <a
              href="https://opervo-pro-sites.vercel.app/intake"
              target="_blank"
              rel="noreferrer"
              style={{ ...primaryBtn, display: 'inline-block' }}
            >
              Apply for Founding 5
            </a>
            <p style={{ fontSize: 13, color: '#8a8580', margin: '20px 0 0' }}>
              Applications reviewed personally. Reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ────────────────────────────────────────────────── */}
      <section style={{ background: WARM, padding: '80px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>How we compare</p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: 12 }}>The only player <Highlight>publishing real prices</Highlight>.</h2>
          <p style={{ ...sectionSub, textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
            We researched everyone. Most hide pricing. We don’t.
          </p>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'auto' }}>
            <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: WARM, borderBottom: `1px solid ${BORDER}` }}>
                  <th style={thStyle}> </th>
                  <th style={{ ...thStyle, background: 'rgba(245,98,15,0.06)', color: ORANGE }}>Opervo Sites</th>
                  <th style={thStyle}>180Sites</th>
                  <th style={thStyle}>HCP Websites</th>
                  <th style={thStyle}>Hibu / Scorpion</th>
                  <th style={thStyle}>Wix / Squarespace</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { row: 'Total cost', opervo: '$39.99/mo or $499 to own', s180: '$4,680 over 24mo (locked)', hcp: '~$3,000+/yr (hidden)', hibu: '$13,200+/yr (sales call)', diy: '$300–$900/yr + your time' },
                  { row: 'Contract', opervo: <Verdict ok>None, cancel anytime</Verdict>, s180: <Verdict ok={false}>24 months</Verdict>, hcp: <Verdict ok={false}>Bundled with CRM</Verdict>, hibu: <Verdict ok={false}>12–24 months</Verdict>, diy: <Verdict ok={false}>Annual subscription</Verdict> },
                  { row: 'Ownership on exit', opervo: <Verdict ok>Yes, static export + domain</Verdict>, s180: <Verdict ok={false}>After 24mo</Verdict>, hcp: <Verdict ok={false}>Locked to HCP</Verdict>, hibu: <Verdict ok={false}>Proprietary CMS</Verdict>, diy: <Verdict ok>Yes</Verdict> },
                  { row: 'Turnaround', opervo: '30 days', s180: '30 days', hcp: 'Weeks (varies)', hibu: 'Not published', diy: 'Your weekends' },
                  { row: 'CRM-stitched data', opervo: <Verdict ok>Yes (Pro Site Live)</Verdict>, s180: <Verdict ok={false}>No</Verdict>, hcp: <Verdict ok={false}>Booking only</Verdict>, hibu: <Verdict ok={false}>No</Verdict>, diy: <Verdict ok={false}>No</Verdict> },
                  { row: 'Published pricing', opervo: <Verdict ok>Yes</Verdict>, s180: <Verdict ok>Yes</Verdict>, hcp: <Verdict ok={false}>No</Verdict>, hibu: <Verdict ok={false}>No</Verdict>, diy: <Verdict ok>Yes</Verdict> },
                ] as Array<{ row: string; opervo: React.ReactNode; s180: React.ReactNode; hcp: React.ReactNode; hibu: React.ReactNode; diy: React.ReactNode }>).map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 5 ? `1px solid ${BORDER}` : 'none' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: BLACK }}>{r.row}</td>
                    <td style={{ ...tdStyle, background: 'rgba(245,98,15,0.04)', fontWeight: 600, color: BLACK }}>{r.opervo}</td>
                    <td style={tdStyle}>{r.s180}</td>
                    <td style={tdStyle}>{r.hcp}</td>
                    <td style={tdStyle}>{r.hibu}</td>
                    <td style={tdStyle}>{r.diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', marginTop: 16 }}>
            Pricing verified May 2026. Sources on request.
          </p>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={eyebrow}>Questions</p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: 40 }}>You probably want to ask.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { q: 'Do I own my website?', a: 'Yes. The build is yours. Your domain is yours. If you ever leave, we hand you a static export of the site and transfer your domain. No proprietary CMS, no hostage situation.' },
              { q: 'Do I need to use the Opervo CRM?', a: 'No. Opervo Sites is a standalone product. Your site works on its own, quote forms email you, the contact info routes wherever you want. Connect the Opervo CRM later if you want your services, photos, and reviews to update themselves on the site.' },
              { q: 'How long does the build take?', a: '30 days from kickoff. We schedule a 60-minute intake call within 72 hours of order, send a first draft by day 21, finalize revisions, and ship live by day 30.' },
              { q: 'Is there an ongoing fee?', a: 'Depends on the tier you pick. Pro Site Monthly is $39.99/mo, hosting, edits, custom domain all included. Pro Site Ownership is $499 one-time and you walk away with everything. No tier locks you in: 60-day money-back guarantee, cancel any time, we hand you the static export and your domain.' },
              { q: 'What trades do you build for?', a: 'Window cleaning, pressure washing, soft washing, gutter cleaning, solar panel cleaning, landscaping, lawn care, junk removal, mobile detailing, roof cleaning, concrete sealing, and most other home service trades. If you serve homes or commercial properties on a route, we build for you.' },
              { q: 'What about my existing domain?', a: 'We work with whatever you have. Keep your existing domain, we point it to the new site. Or we register a new one for you at cost. No upcharge.' },
              { q: 'Who writes the copy?', a: 'We do. We extract your voice during the intake call and write trade-specific SEO copy that ranks. You review and approve every page before it goes live.' },
              { q: 'Is there a money-back guarantee?', a: '60 days. If you’re not happy with the launched site, we’ll refund the build fee in full. Better than the industry standard 30 days.' },
            ].map((item, i) => {
              const open = faqOpen === i
              return (
                <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden' }}>
                  <button
                    onClick={() => setFaqOpen(open ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontFamily: "'Barlow', sans-serif" }}
                  >
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: BLACK, textTransform: 'uppercase', letterSpacing: '0.01em' }}>{item.q}</span>
                    <Icon d={ICONS.chevronDown} size={18} color={MUTED} stroke={2.5} />
                  </button>
                  {open && (
                    <div style={{ padding: '0 20px 20px', fontSize: 15, lineHeight: 1.6, color: MUTED }}>
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: BLACK, color: '#F7F5F2', padding: '88px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', color: ORANGE, textTransform: 'uppercase', margin: '0 0 20px' }}>
            Ready when you are
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.98, margin: 0, letterSpacing: '-0.02em' }}>
            Your business deserves<br /> <Highlight dark>a real website</Highlight>.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: '#c8c4be', margin: '24px auto 36px', maxWidth: 540 }}>
            $39.99/mo or $499 to own. 30 days from order to live. Custom domain included.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" style={primaryBtn}>See pricing</a>
            <a href="https://calendar.app.google/2KuCvGVUmv9cEcvo8" target="_blank" rel="noreferrer" style={{ ...secondaryBtn, background: 'transparent', color: '#F7F5F2', borderColor: '#3a3a3a' }}>
              Talk to the founder
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          :global(.portfolio-grid) {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 580px) {
          :global(.portfolio-grid) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          :global(.live-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.roi-grid) {
            grid-template-columns: 1fr !important;
          }
        }
        :global(.portfolio-card):hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px -14px rgba(0,0,0,0.32), 0 6px 14px -4px rgba(0,0,0,0.16);
        }
      `}</style>
    </div>
  )
}

// ── shared style objects ────────────────────────────────────────────────
const primaryBtn: React.CSSProperties = {
  background: ORANGE,
  color: '#fff',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '14px 28px',
  borderRadius: 8,
  textDecoration: 'none',
  boxShadow: '0 6px 20px rgba(245,98,15,0.25)',
  letterSpacing: '0.02em',
}

const secondaryBtn: React.CSSProperties = {
  background: SURFACE,
  color: BLACK,
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  padding: '14px 28px',
  borderRadius: 8,
  textDecoration: 'none',
  border: `1px solid ${BORDER}`,
  letterSpacing: '0.02em',
}

const eyebrow: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '0.25em',
  color: ORANGE,
  textTransform: 'uppercase',
  margin: '0 0 16px',
  textAlign: 'center',
}

const sectionH2: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 'clamp(32px, 5vw, 52px)',
  fontWeight: 900,
  textTransform: 'uppercase',
  color: BLACK,
  lineHeight: 1,
  margin: 0,
  letterSpacing: '-0.01em',
}

const sectionSub: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.5,
  color: MUTED,
  margin: 0,
}

const pricingCard: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  padding: 32,
}

const pricingTier: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '0.25em',
  color: ORANGE,
  textTransform: 'uppercase',
  margin: '0 0 8px',
}

const pricingPrice: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  color: BLACK,
  margin: '0 0 4px',
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  letterSpacing: '-0.02em',
  lineHeight: 1,
}

const pricingMo: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: MUTED,
}

const pricingSubLine: React.CSSProperties = {
  fontSize: 13,
  color: MUTED,
  margin: '0 0 24px',
}

const pricingList: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}

const pricingLi: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  fontSize: 15,
  color: INK,
  lineHeight: 1.45,
}

const thStyle: React.CSSProperties = {
  padding: '14px 16px',
  textAlign: 'left',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 12,
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: BLACK,
  borderBottom: `1px solid ${BORDER}`,
}

const tdStyle: React.CSSProperties = {
  padding: '14px 16px',
  color: MUTED,
  fontSize: 13,
  lineHeight: 1.4,
}
