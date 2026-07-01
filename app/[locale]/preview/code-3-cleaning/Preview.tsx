'use client'

import { useState, useRef, useEffect } from 'react'

// Code 3 Cleaning Pro Site preview, v3.
//
// v3 throws out Opervo's design system entirely and copies what
// 180Sites actually ships for home service operators. Direction from
// Max: "really throw out the opervo design theme book for the sites we
// create. keep the opervo look for our site but for the operators
// sites we need to hone the look 180 sites makes, that's the industry
// standard."
//
// Concrete shifts vs v2:
//   - Poppins Black 800/900 for headlines (the wide bold grotesk used
//     across Triangle, Pinky's, Super Clean, NW Softwash). Barlow
//     Condensed retained ONLY for the "Code 3." wordmark logo.
//   - Adds fire-engine red #dc2626 as secondary accent for trust
//     badges and emergency-response signaling (Code 3 = lights/sirens).
//   - Drops the eyebrow-caps section pattern entirely. Plain H2s.
//   - Adds BBB-style award badges row in hero (faux BBB A+, Google
//     Guaranteed, Veteran-friendly, Insured).
//   - Highlight scribbles under key phrases (180's signature move).
//   - Standalone stat badges, not stat strips.
//   - Salesy copy patterns: "We'll INSTANTLY..." / "You'll be amazed..."
//   - Brighter colors overall, less black, more white/cream.

// Code 3 palette, red + yellow + navy. Fire truck colors. Drops orange
// entirely (orange reads as Opervo brand DNA, not firefighter brand).
const RED = '#DC2626' // primary brand, fire engine red
const RED_DARK = '#991B1B' // hover state, deeper trust
const YELLOW = '#FBBF24' // highlights, stars, attention pops
const YELLOW_DEEP = '#F59E0B' // alternate accent
const NAVY = '#0E1B2C' // dark sections, professional secondary
const NAVY_LIGHT = '#1a2030'
const BLACK = '#0F0F0F'
const INK = '#1a1a1a'
const MUTED = '#525252'
const CREAM = '#FAF8F4'
const WHITE = '#FFFFFF'
const BORDER = '#E8E4DE'
const GREEN = '#16a34a'
const LIME = '#84cc16'
// alias kept for transition, every "ORANGE" usage is actually red now
const ORANGE = RED

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
  pin: 'M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z',
  shield: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z',
  bolt: 'M13 2L3 14h8l-1 8 10-12h-8z',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.7-2.6-1.8-3.4-2.5-1.8-4.2-4.6-4.2-7.6 0 0 8 4 8 12 0 5-4 8-8 8s-8-3-8-8c0-1.5.4-2.9 1.1-4.1',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  badge: 'M5 12l-3-3 7-7 3 3-7 7zM5 12l3 3 7-7-3-3-7 7zM12 12l5-5 4 4-5 5z',
  award: 'M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM8.21 13.89L7 22l5-3 5 3-1.21-8.12',
  thumbs: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3',
  arrow: 'M5 12h14M13 5l7 7-7 7',
  arrowRight: 'M9 18l6-6-6-6',
  arrowDown: 'M6 9l6 6 6-6',
  mail: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 6l10 7 10-7',
  zap: 'M13 2L3 14h8l-1 8 10-12h-8z',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM18.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
  plus: 'M12 5v14M5 12h14',
}

// ─── Custom Code 3 emblem/crest, circular badge with fire helmet +
// squeegee crossed, "C3" monogram center, "EST. 2024 · OREGON" outer ring.
// Designed in pure SVG so it scales cleanly. Replaces the v3 "C3" square
// with a real branded mark, vintage firefighter-patch aesthetic.
function Emblem({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Code 3 Cleaning emblem">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill={NAVY} stroke={YELLOW} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={YELLOW} strokeWidth="0.6" opacity="0.5" />

      {/* Curved text, top: CODE 3 CLEANING, bottom: EST. 2024 · OREGON */}
      <defs>
        <path id="topArc" d="M 12 50 A 38 38 0 0 1 88 50" />
        <path id="bottomArc" d="M 12 50 A 38 38 0 0 0 88 50" />
      </defs>
      <text fill={YELLOW} fontSize="7.5" fontWeight="800" letterSpacing="2" fontFamily="'Barlow Condensed', sans-serif">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">CODE 3 CLEANING</textPath>
      </text>
      <text fill={YELLOW} fontSize="5.5" fontWeight="600" letterSpacing="1.8" fontFamily="'Barlow Condensed', sans-serif">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">EST. 2024 · OREGON</textPath>
      </text>

      {/* Center inner field with red disk */}
      <circle cx="50" cy="50" r="28" fill={RED} />
      <circle cx="50" cy="50" r="26" fill="none" stroke={YELLOW} strokeWidth="0.5" opacity="0.6" />

      {/* Crossed fire helmet (left) and squeegee (right) */}
      {/* Fire helmet, stylized: dome + brim + front shield */}
      <g transform="translate(38 42) rotate(-22)">
        <path d="M -8 4 Q -8 -3 0 -3 Q 8 -3 8 4 L 10 6 L -10 6 Z" fill="#fff" stroke={NAVY} strokeWidth="0.4" />
        <rect x="-3" y="-3" width="6" height="3" fill={YELLOW} stroke={NAVY} strokeWidth="0.3" />
      </g>
      {/* Squeegee, handle + rubber blade */}
      <g transform="translate(62 42) rotate(22)">
        <rect x="-1" y="-8" width="2" height="14" fill={YELLOW} stroke={NAVY} strokeWidth="0.3" />
        <rect x="-6" y="-9" width="12" height="2" fill="#fff" stroke={NAVY} strokeWidth="0.3" />
        <rect x="-7" y="-7" width="14" height="1.5" fill={NAVY} />
      </g>

      {/* C3 monogram below the crossed icons */}
      <text x="50" y="68" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="-0.5">C3</text>

      {/* Star pips on outer ring */}
      <circle cx="50" cy="6" r="1.6" fill={YELLOW} />
      <circle cx="50" cy="94" r="1.6" fill={YELLOW} />
      <circle cx="6" cy="50" r="1.6" fill={YELLOW} />
      <circle cx="94" cy="50" r="1.6" fill={YELLOW} />
    </svg>
  )
}

// Real photo hero, replaces the v4 CSS composite. Photo of a window
// cleaner shot from below w/ sky background (Unsplash, Rom T,
// aCgJ5imLMHw, free license). Dark gradient overlay keeps the hero
// text legible on top.
function HeroPhoto() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base photo background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('/preview/code-3/hero-window-cleaning.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        backgroundColor: NAVY,
      }} />
      {/* Dark navy overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(14,27,44,0.85) 0%, rgba(14,27,44,0.6) 50%, rgba(14,27,44,0.92) 100%)',
      }} />
      {/* Red atmospheric glow upper-right (firefighter signal cue) */}
      <div style={{ position: 'absolute', top: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.28) 0%, rgba(220,38,38,0.06) 50%, transparent 70%)', filter: 'blur(40px)' }} />
      {/* Bottom dark fade for content separation */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,27,44,0.0) 60%, rgba(14,27,44,0.4) 100%)' }} />
      {/* Photo credit / placeholder note */}
      <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' }}>
        [Stock photo · replaced with your photos at launch]
      </div>
    </div>
  )
}

// Legacy CSS composite, kept here as reference for the v4 approach.
// Replaced by HeroPhoto in v5 Phase 2.
function HeroComposite() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base sky gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0a1320 0%, #0E1B2C 40%, #1a1820 80%, #2a1410 100%)' }} />

      {/* Atmospheric red glow upper-right (emergency lights) */}
      <div style={{ position: 'absolute', top: -120, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.08) 40%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Secondary yellow atmospheric, like firetruck warning */}
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.05) 50%, transparent 75%)', filter: 'blur(50px)' }} />

      {/* Noise texture */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `repeating-radial-gradient(circle at 25% 25%, #fff 0 1px, transparent 1px 60px), repeating-radial-gradient(circle at 75% 75%, #fff 0 1px, transparent 1px 80px)` }} />

      {/* SVG skyline + fire engine silhouettes */}
      <svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Distant city skyline, silhouette */}
        <g opacity="0.7">
          <rect x="0" y="540" width="80" height="260" fill="#050a14" />
          <rect x="60" y="500" width="50" height="300" fill="#050a14" />
          <rect x="100" y="560" width="70" height="240" fill="#080d18" />
          <rect x="160" y="520" width="100" height="280" fill="#050a14" />
          <rect x="250" y="580" width="60" height="220" fill="#080d18" />
          <rect x="300" y="540" width="80" height="260" fill="#050a14" />
          <rect x="370" y="500" width="90" height="300" fill="#080d18" />
          <rect x="450" y="560" width="70" height="240" fill="#050a14" />
          <rect x="510" y="540" width="100" height="260" fill="#080d18" />
          {/* Firehouse with tower in middle */}
          <rect x="600" y="480" width="160" height="320" fill="#0a0f1a" />
          <rect x="660" y="420" width="40" height="60" fill="#0a0f1a" />
          <polygon points="650,420 710,400 710,420" fill="#0a0f1a" />
          {/* Antenna */}
          <line x1="680" y1="380" x2="680" y2="420" stroke="#1a1f2a" strokeWidth="2" />
          <circle cx="680" cy="380" r="3" fill={RED} opacity="0.7" />

          <rect x="760" y="540" width="80" height="260" fill="#080d18" />
          <rect x="830" y="510" width="100" height="290" fill="#050a14" />
          <rect x="920" y="560" width="70" height="240" fill="#080d18" />
          <rect x="980" y="530" width="90" height="270" fill="#050a14" />
          <rect x="1060" y="500" width="60" height="300" fill="#080d18" />
          <rect x="1110" y="560" width="80" height="240" fill="#050a14" />
          <rect x="1180" y="520" width="100" height="280" fill="#080d18" />
          <rect x="1270" y="550" width="70" height="250" fill="#050a14" />
          <rect x="1330" y="500" width="80" height="300" fill="#080d18" />
        </g>

        {/* Tiny lit windows scattered */}
        <g fill={YELLOW} opacity="0.5">
          <rect x="18" y="560" width="3" height="4" />
          <rect x="28" y="580" width="3" height="4" />
          <rect x="68" y="540" width="3" height="4" />
          <rect x="78" y="560" width="3" height="4" />
          <rect x="180" y="560" width="3" height="4" />
          <rect x="220" y="580" width="3" height="4" />
          <rect x="620" y="520" width="3" height="4" />
          <rect x="640" y="540" width="3" height="4" />
          <rect x="700" y="520" width="3" height="4" />
          <rect x="720" y="560" width="3" height="4" />
          <rect x="850" y="540" width="3" height="4" />
          <rect x="900" y="560" width="3" height="4" />
          <rect x="1000" y="560" width="3" height="4" />
          <rect x="1080" y="540" width="3" height="4" />
          <rect x="1200" y="550" width="3" height="4" />
          <rect x="1340" y="530" width="3" height="4" />
        </g>

        {/* Distant fire engine silhouette, right side */}
        <g transform="translate(1050 660)" opacity="0.9">
          {/* Cab */}
          <rect x="0" y="0" width="40" height="50" fill="#1a0a08" rx="3" />
          {/* Body */}
          <rect x="35" y="-10" width="120" height="60" fill="#1a0a08" rx="2" />
          {/* Ladder on top */}
          <rect x="50" y="-22" width="100" height="6" fill="#0a0508" />
          {/* Light bar */}
          <rect x="5" y="-8" width="35" height="6" fill={RED} opacity="0.7" />
          <rect x="6" y="-7" width="6" height="4" fill={YELLOW} opacity="0.9" />
          <rect x="18" y="-7" width="6" height="4" fill={RED} />
          <rect x="30" y="-7" width="6" height="4" fill={YELLOW} opacity="0.9" />
          {/* Wheels */}
          <circle cx="15" cy="50" r="9" fill="#0a0508" />
          <circle cx="15" cy="50" r="5" fill="#1a1010" />
          <circle cx="120" cy="50" r="9" fill="#0a0508" />
          <circle cx="120" cy="50" r="5" fill="#1a1010" />
          <circle cx="145" cy="50" r="9" fill="#0a0508" />
          <circle cx="145" cy="50" r="5" fill="#1a1010" />
        </g>

        {/* Light beam coming off fire engine */}
        <polygon points="1050,660 1100,660 1080,800 1050,800" fill={YELLOW} opacity="0.04" />

        {/* Foreground silhouette, figure with equipment (left, faint) */}
        <g transform="translate(80 580)" opacity="0.55">
          {/* Head */}
          <circle cx="20" cy="-5" r="10" fill="#000" />
          {/* Body */}
          <path d="M 5 5 L 5 100 L 35 100 L 35 5 Q 35 -2 20 -2 Q 5 -2 5 5 Z" fill="#000" />
          {/* Arm holding squeegee */}
          <rect x="35" y="20" width="40" height="6" fill="#000" rx="2" transform="rotate(-15 55 23)" />
          {/* Squeegee */}
          <rect x="70" y="-2" width="3" height="14" fill={YELLOW} transform="rotate(-15 71 5)" />
          <rect x="60" y="-2" width="20" height="3" fill="#fff" transform="rotate(-15 70 0)" />
        </g>

        {/* Particles / dust */}
        <g opacity="0.4">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i} cx={200 + i * 60} cy={300 + (i % 3) * 80} r={1.2} fill="#fff" />
          ))}
        </g>

        {/* Bottom gradient overlay to push silhouettes deeper */}
        <rect x="0" y="0" width="1400" height="800" fill="url(#bottomFade)" />
        <defs>
          <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(14,27,44,0)" />
            <stop offset="60%" stopColor="rgba(14,27,44,0)" />
            <stop offset="100%" stopColor="rgba(14,27,44,0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top dark gradient for text legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,27,44,0.4) 0%, rgba(14,27,44,0.0) 30%, rgba(14,27,44,0.0) 70%, rgba(14,27,44,0.6) 100%)' }} />
    </div>
  )
}

// Interactive Before/After slider, drag the handle to reveal "after"
// (clean) over "before" (dirty). Memorable, tactile, shows quality.
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromX = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))
    setPos(pct)
  }
  const onDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromX(e.clientX)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    updateFromX(e.clientX)
  }
  const onUp = () => { draggingRef.current = false }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: 16,
        overflow: 'hidden',
        userSelect: 'none',
        cursor: 'ew-resize',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.32), 0 12px 28px -8px rgba(0,0,0,0.18)',
        border: `4px solid ${WHITE}`,
        outline: `1px solid ${BORDER}`,
        touchAction: 'none',
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {/* BEFORE, dirty window, stained */}
      <div style={{ position: 'absolute', inset: 0, background: `
        linear-gradient(135deg, rgba(180,170,140,0.35) 0%, rgba(120,110,90,0.5) 60%, rgba(60,55,45,0.6) 100%),
        radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 60%),
        repeating-linear-gradient(135deg, rgba(150,130,100,0.18) 0 4px, transparent 4px 14px),
        repeating-linear-gradient(45deg, rgba(80,70,60,0.12) 0 6px, transparent 6px 22px),
        linear-gradient(180deg, #6a5a44 0%, #4a3a2a 100%)`,
      }}>
        {/* Hard water spots */}
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[...Array(24)].map((_, i) => (
            <circle key={i} cx={(i * 7.3) % 100} cy={(i * 4.7) % 60} r={1 + (i % 3) * 0.5} fill="rgba(255,255,255,0.18)" />
          ))}
          {[...Array(8)].map((_, i) => (
            <ellipse key={`s${i}`} cx={(i * 13 + 5) % 100} cy={(i * 9 + 4) % 60} rx="3" ry="1" fill="rgba(220,200,160,0.22)" transform={`rotate(${i * 23} ${(i * 13 + 5) % 100} ${(i * 9 + 4) % 60})`} />
          ))}
        </svg>
        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 12px', borderRadius: 5, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Before
        </div>
      </div>

      {/* AFTER, clean window, crisp glass with reflection */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, background: `
        linear-gradient(135deg, rgba(180,220,255,0.5) 0%, rgba(140,180,230,0.3) 50%, rgba(100,140,200,0.4) 100%),
        radial-gradient(ellipse at 25% 30%, rgba(255,255,255,0.6) 0%, transparent 45%),
        radial-gradient(ellipse at 75% 65%, rgba(255,255,255,0.3) 0%, transparent 50%),
        linear-gradient(180deg, #6fa8d4 0%, #4a82b8 100%)`,
      }}>
        {/* Streak-free shine lines */}
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <line x1="20" y1="0" x2="30" y2="60" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          <line x1="55" y1="0" x2="65" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <line x1="80" y1="0" x2="90" y2="60" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
        </svg>
        <div style={{ position: 'absolute', top: 16, right: 16, background: GREEN, color: '#fff', padding: '6px 12px', borderRadius: 5, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          After
        </div>
      </div>

      {/* Divider handle */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${pos}%`,
        width: 4,
        background: '#fff',
        boxShadow: '0 0 0 2px rgba(0,0,0,0.18), 0 0 24px rgba(255,255,255,0.4)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 0 0 4px rgba(255,255,255,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          color: RED,
          fontWeight: 900,
          fontSize: 18,
        }}>
          ‹›
        </div>
      </div>
    </div>
  )
}

// 180-style highlighter scribble under a phrase. Uses a hand-drawn SVG
// path positioned BEHIND the text. The text reads on top.
function Mark({ children, color = ORANGE, opacity = 0.45, rotate = -1 }: { children: React.ReactNode; color?: string; opacity?: number; rotate?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      <svg
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-3%',
          right: '-3%',
          width: '106%',
          top: '40%',
          height: '70%',
          zIndex: 0,
          pointerEvents: 'none',
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <path
          d="M6,15 Q50,8 130,14 Q210,20 295,12 Q298,18 293,32 Q220,38 140,32 Q60,28 8,33 Q2,24 6,15 Z"
          fill={color}
          opacity={opacity}
        />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  )
}

const SERVICES = [
  { icon: ICONS.window, title: 'Window Cleaning', desc: 'Interior, exterior, hard-water spot removal. Streak-free finish guaranteed.' },
  { icon: ICONS.gutter, title: 'Gutter Cleaning', desc: 'Full clear of gutters and downspouts. Water-flush test. Before/after photos sent.' },
  { icon: ICONS.carpet, title: 'Carpet Cleaning', desc: 'Hot-water extraction per room. Pet stains, traffic lanes. Furniture moved on request.' },
  { icon: ICONS.screen, title: 'Screen Repair', desc: 'Rescreen on-site or pickup. Window screens, sliding doors. $0.35/sq in · $60 min.' },
]

const WHY = [
  { icon: ICONS.flame, title: 'Run by a Firefighter', body: 'Code 3 means lights & sirens. We bring firehouse-level urgency to every job.' },
  { icon: ICONS.bolt, title: 'Same-Day Quotes', body: 'Request before 5pm, get a full estimate the same day. No follow-up calls needed.' },
  { icon: ICONS.shield, title: 'Licensed & Insured', body: 'Full Oregon licensing, $2M general liability. Proof of insurance with every quote.' },
  { icon: ICONS.thumbs, title: '5.0★ · 136+ Jobs', body: 'Every single Facebook review is 5 stars. We work hard to keep it that way.' },
]

const AREAS = [
  'Canby', 'Oregon City', 'Wilsonville', 'Aurora', 'Molalla', 'Woodburn',
  'Newberg', 'Beavercreek', 'Mulino', 'Estacada', 'Sandy', 'Boring',
]

const FAQS = [
  { q: 'How fast do you respond to quote requests?', a: "We send a full quote, with photos of what we'll do and a firm price, within 24 hours, every time. Requests in by 5pm get same-day response." },
  { q: "Are you actually licensed and insured?", a: "Yes. Fully licensed in Oregon and carrying $2M general liability coverage. We send proof of insurance with every single quote, no exceptions." },
  { q: "What if I'm not happy with the work?", a: "We come back same week and re-do it. Period. The 5.0 rating on Facebook says it all, we don't leave a job until it's right." },
  { q: "Do you do residential and commercial?", a: "Both. Window cleaning, gutter clearing, carpet extraction, and screen repair on homes, storefronts, and small offices throughout the Willamette Valley." },
  { q: "Do you actually work weekends?", a: "Yes, that's part of why we exist. Between 24-hour firehouse shifts, we work evenings and weekends. Most cleaning crews don't." },
]

export default function Preview() {
  return (
    <>
      {/* v5 Phase 1, Anton (display, headlines) + Inter (body). Matches the
          industrial-trade-business aesthetic of Haro Electric / FL Pro Wash /
          Volt Vikings. Drops Poppins, which read too "tech startup".
          Barlow Condensed retained ONLY for the "Code 3." wordmark. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style jsx global>{`
        .c3-page * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .c3-page h1,
        .c3-page h2,
        .c3-page h3 {
          font-family: 'Anton', 'Inter', sans-serif !important;
          font-weight: 400 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.01em !important;
          line-height: 1.05 !important;
        }
        .c3-page .c3-mark,
        .c3-page .c3-mark * {
          font-family: 'Barlow Condensed', sans-serif !important;
        }
        @media (max-width: 900px) {
          .c3-page .hero-grid,
          .c3-page .about-grid,
          .c3-page .area-grid,
          .c3-page .cta-grid,
          .c3-page .ba-grid {
            grid-template-columns: 1fr !important;
          }
          .c3-page .hide-md {
            display: none !important;
          }
          .c3-page .process-arrow {
            display: none !important;
          }
        }
        @media (max-width: 700px) {
          .c3-page .desktop-nav a:nth-child(-n+6) {
            display: none;
          }
          .c3-page .hide-sm {
            display: none !important;
          }
        }
        .c3-page .svc-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .c3-page .svc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(0,0,0,0.08);
        }
        .c3-page details > summary::-webkit-details-marker {
          display: none;
        }
        .c3-page details > summary {
          list-style: none;
        }
      `}</style>

      <div className="c3-page" style={{ background: WHITE, color: INK, minHeight: '100vh', overflowX: 'hidden' }}>
        {/* ─── TOP UTILITY BAR (red, emergency response signal) ───────── */}
        <div style={{ background: RED, color: '#fff', padding: '7px 16px', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
          <span style={{ marginRight: 14 }}>
            <Icon d={ICONS.bolt} size={14} color="#fff" stroke={2.5} />{' '}
            <span style={{ verticalAlign: 'middle', marginLeft: 4 }}>Same-day quotes, get yours in 30 seconds</span>
          </span>
          <span style={{ opacity: 0.7, marginRight: 14, display: 'inline-block' }} className="hide-sm">·</span>
          <a href="tel:5039830126" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }} className="hide-sm">
            <Icon d={ICONS.phone} size={13} color="#fff" stroke={2.5} />{' '}
            <span style={{ verticalAlign: 'middle', marginLeft: 4 }}>(503) 983-0126</span>
          </a>
        </div>

        {/* ─── NAV ─────────────────────────────────────────────────────── */}
        <nav style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '16px 24px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Emblem size={56} />
              <span className="c3-mark" style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em', color: INK, lineHeight: 1 }}>
                Code 3<span style={{ color: RED }}>.</span> <span style={{ fontWeight: 400, color: MUTED, fontSize: 14, letterSpacing: '0.02em' }}>Cleaning</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }} className="desktop-nav">
              <a href="#services" style={navLink}>Services</a>
              <a href="#about" style={navLink}>About</a>
              <a href="#area" style={navLink}>Service Area</a>
              <a href="#gallery" style={navLink}>Gallery</a>
              <a href="#reviews" style={navLink}>Reviews</a>
              <a href="#faq" style={navLink}>FAQ</a>
              <a href="tel:5039830126" style={{ fontSize: 15, fontWeight: 700, color: INK, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon d={ICONS.phone} size={15} color={RED} stroke={2.5} />
                (503) 983-0126
              </a>
              <a href="#quote" style={ctaButton(ORANGE)}>Get a Fast Quote</a>
            </div>
          </div>
        </nav>

        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section style={{
          backgroundColor: NAVY,
          color: '#fff',
          padding: '64px 24px 88px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <HeroPhoto />
          {/* Award badges floating top */}
          <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 10, opacity: 0.95 }} className="hide-md">
            {[
              { t: 'BBB', s: 'A+ Rated', c: '#003366' },
              { t: 'Google', s: '5★ Guaranteed', c: '#4285F4' },
              { t: 'Nextdoor', s: 'Best of 2026', c: '#00b246' },
              { t: 'Veteran', s: 'Friendly', c: RED },
            ].map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.97)', color: INK, borderRadius: 8, padding: '8px 12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.16)', minWidth: 78 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: b.c, textTransform: 'uppercase' }}>{b.t}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: MUTED, marginTop: 2 }}>{b.s}</div>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.95fr)', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1, marginTop: 32 }} className="hero-grid">
            {/* LEFT: headline + bullets + CTAs */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: RED, color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 22, boxShadow: '0 4px 12px rgba(220,38,38,0.28)' }}>
                <Icon d={ICONS.flame} size={12} color="#fff" stroke={2.5} />
                Run by a working firefighter
              </div>

              <h1 style={{
                fontWeight: 900,
                fontSize: 'clamp(38px, 5.4vw, 64px)',
                lineHeight: 1.03,
                letterSpacing: '-0.025em',
                margin: '0 0 22px',
                color: '#fff',
              }}>
                Oregon's <Mark color={YELLOW} opacity={0.7}>most trusted</Mark><br />
                window, gutter & carpet<br />
                <span style={{ color: RED }}>cleaning team.</span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.55, color: '#c8d1dc', margin: '0 0 28px', maxWidth: 540, fontWeight: 400 }}>
                We'll <strong style={{ color: '#fff' }}>INSTANTLY</strong> get back to you with a full quote, same day, every day. Spotless work. Fully insured. Across the entire Willamette Valley.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px 18px', maxWidth: 520 }}>
                {[
                  'Fully Licensed & Insured',
                  '5.0★ on Facebook · 136+ Reviews',
                  'Same-Day Quotes Guaranteed',
                  'Spotless or We Come Back Free',
                ].map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 14.5, fontWeight: 500, color: '#fff', lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}>
                      <Icon d={ICONS.check} size={16} color={LIME} stroke={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#quote" style={ctaButtonBig(ORANGE)}>
                  Get a Free Quote
                  <Icon d={ICONS.arrow} size={17} color="#fff" stroke={2.5} />
                </a>
                <a href="tel:5039830126" style={{
                  background: 'transparent',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  padding: '15px 24px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.45)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                }}>
                  <Icon d={ICONS.phone} size={16} color="#fff" stroke={2.5} />
                  (503) 983-0126
                </a>
              </div>

              <p style={{ fontSize: 13, color: '#a8b3c1', margin: '18px 0 0' }}>
                Or <a href="sms:5039830126" style={{ color: ORANGE, textDecoration: 'underline', fontWeight: 600 }}>text us</a>, same-day response, every day.
              </p>
            </div>

            {/* RIGHT: floating quote form card */}
            <div id="quote" style={{ position: 'relative' }}>
              <div style={{
                background: WHITE,
                color: INK,
                borderRadius: 14,
                padding: 28,
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45), 0 12px 28px -8px rgba(0,0,0,0.22)',
                border: `4px solid ${ORANGE}`,
                position: 'relative',
              }}>
                {/* Top badge */}
                <div style={{ position: 'absolute', top: -16, left: 24, background: RED, color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(220,38,38,0.32)' }}>
                  Free · Takes 30 sec
                </div>

                <h3 style={{ fontWeight: 900, fontSize: 24, color: INK, margin: '8px 0 4px', lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                  Get Your Free Quote Today.
                </h3>
                <p style={{ fontSize: 14, color: MUTED, margin: '0 0 20px' }}>
                  We'll INSTANTLY get back to you, same-day, guaranteed.
                </p>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                    <input placeholder="First name" style={formInput} />
                    <input placeholder="Last name" style={formInput} />
                  </div>
                  <input placeholder="Phone" type="tel" style={formInput} />
                  <input placeholder="Email" type="email" style={formInput} />
                  <select style={{ ...formInput, cursor: 'pointer' }} defaultValue="">
                    <option value="" disabled>Service needed…</option>
                    <option>Window Cleaning</option>
                    <option>Gutter Cleaning</option>
                    <option>Carpet Cleaning</option>
                    <option>Screen Repair</option>
                    <option>Multiple services</option>
                  </select>
                  <button type="submit" style={{ ...ctaButtonBig(ORANGE), width: '100%', justifyContent: 'center', marginTop: 6, padding: '16px 24px', fontSize: 16 }}>
                    Get My Free Quote
                    <Icon d={ICONS.arrow} size={17} color="#fff" stroke={2.5} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 8, fontSize: 12, color: MUTED }}>
                    <span><Icon d={ICONS.shield} size={12} color={GREEN} stroke={2.5} /> No spam</span>
                    <span><Icon d={ICONS.bolt} size={12} color={ORANGE} stroke={2.5} /> Same-day reply</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST BADGES BAND ──────────────────────────────────────── */}
        <section style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '28px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'center', opacity: 0.9 }}>
            {[
              { l: 'BBB', s: 'Accredited · A+', c: '#003366' },
              { l: 'Google', s: 'Guaranteed · 5.0★', c: '#4285F4' },
              { l: 'Nextdoor', s: 'Neighborhood Fave', c: '#00b246' },
              { l: 'Angi', s: 'Top Rated 2026', c: '#FF6B00' },
              { l: 'Veteran', s: 'First-Responder Friendly', c: RED },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: b.c, color: '#fff', fontWeight: 900, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em' }}>
                  {b.l.slice(0, 1)}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK, lineHeight: 1.1 }}>{b.l}</div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.1, marginTop: 2 }}>{b.s}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── STATS STRIP ────────────────────────────────────────────── */}
        <section style={{ background: CREAM, padding: '36px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { n: '136+', l: 'Jobs Completed' },
              { n: '5.0', l: 'Stars on Facebook', sub: '★★★★★' },
              { n: '24hr', l: 'Quote Response' },
              { n: '$2M', l: 'Insurance Coverage' },
            ].map((s, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 18px', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 38px)', color: ORANGE, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</div>
                {s.sub && <div style={{ color: YELLOW, fontSize: 14, marginTop: 4, letterSpacing: '0.05em' }}>{s.sub}</div>}
                <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRESS STRIP ────────────────────────────────────────────── */}
        <section style={{ background: WHITE, padding: '36px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.28em', color: MUTED, textTransform: 'uppercase', margin: '0 0 18px' }}>
              As featured in
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, opacity: 0.6 }}>
              {[
                { name: 'OREGON LIVE', font: 'serif' },
                { name: 'Canby Herald', font: 'serif' },
                { name: 'WILLAMETTE WEEK', font: 'sans' },
                { name: 'Best of OREGON 2026', font: 'sans' },
                { name: 'KGW · NBC', font: 'sans' },
                { name: 'Nextdoor Fav', font: 'sans' },
              ].map((p, i) => (
                <span key={i} style={{
                  fontFamily: p.font === 'serif' ? "'Times New Roman', serif" : "'Poppins', sans-serif",
                  fontWeight: p.font === 'serif' ? 700 : 800,
                  fontSize: p.font === 'serif' ? 18 : 13,
                  letterSpacing: p.font === 'sans' ? '0.12em' : '0',
                  color: '#666',
                  textTransform: p.font === 'sans' ? 'uppercase' : 'none',
                  fontStyle: p.font === 'serif' ? 'italic' : 'normal',
                }}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ───────────────────────────────────────────────── */}
        <section id="services" style={{ background: WHITE, padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={h2Style}>
                What we do, <Mark color={YELLOW} opacity={0.6}>done right</Mark><br />
                the first time.
              </h2>
              <p style={{ ...h2Sub, maxWidth: 600, margin: '18px auto 0' }}>
                Every job done by the Code 3 crew. No subcontractors. Insured. Quotes back to you in under 24 hours.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
              {SERVICES.map((s, i) => (
                <div key={i} style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 26, position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s' }} className="svc-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(245,98,15,0.32)' }}>
                      <Icon d={s.icon} size={24} color="#fff" stroke={2.2} />
                    </div>
                    <span style={{ background: '#fff', border: `1px solid ${BORDER}`, color: ORANGE, fontWeight: 700, fontSize: 11, padding: '5px 9px', borderRadius: 5, letterSpacing: '0.05em' }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 19, color: INK, margin: '0 0 9px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: MUTED, margin: '0 0 18px' }}>{s.desc}</p>
                  <a href="#quote" style={{ color: RED, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    Get a fast quote <Icon d={ICONS.arrowRight} size={12} color={RED} stroke={2.5} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR PROCESS ────────────────────────────────────────────── */}
        <section style={{ background: CREAM, padding: '88px 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.28em', color: RED, textTransform: 'uppercase', margin: '0 0 14px' }}>
                How it works
              </p>
              <h2 style={h2Style}>
                Four steps from <Mark color={YELLOW} opacity={0.6}>call to clean.</Mark>
              </h2>
              <p style={{ ...h2Sub, maxWidth: 600, margin: '16px auto 0' }}>
                No fluff. Same process every single job, same crew, same standards.
              </p>
            </div>

            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }} className="process-grid">
              {[
                { n: '01', t: 'Request a Quote', d: 'Submit the form or call. Takes 30 seconds. Same-day response, guaranteed.', icon: ICONS.phone },
                { n: '02', t: 'We Schedule', d: 'We send you photos of past work + a firm price. You pick the day.', icon: ICONS.bolt },
                { n: '03', t: 'Code 3 Crew Arrives', d: 'On time, in uniform, fully insured. Real equipment. No subcontractors, ever.', icon: ICONS.truck },
                { n: '04', t: 'You Approve', d: 'We walk the job with you. Send before/after photos. You don\'t pay until you\'re happy.', icon: ICONS.check },
              ].map((s, i) => (
                <div key={s.n} style={{ position: 'relative', background: WHITE, border: `2px solid ${BORDER}`, borderRadius: 14, padding: 26, paddingTop: 36, boxShadow: '0 6px 16px rgba(0,0,0,0.05)' }}>
                  {/* Step number badge */}
                  <div style={{ position: 'absolute', top: -22, left: 24, width: 44, height: 44, borderRadius: '50%', background: RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, boxShadow: '0 6px 16px rgba(220,38,38,0.4)', border: `3px solid ${WHITE}` }}>
                    {s.n}
                  </div>
                  {/* Icon */}
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginLeft: 'auto', marginRight: 0 }}>
                    <Icon d={s.icon} size={22} color={RED} stroke={2.3} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: INK, margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{s.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: MUTED, margin: 0 }}>{s.d}</p>
                  {/* Arrow connector (visual only, hidden on smallest screens) */}
                  {i < 3 && (
                    <div style={{ position: 'absolute', top: '50%', right: -16, transform: 'translateY(-50%)', zIndex: 1 }} className="process-arrow">
                      <Icon d={ICONS.arrowRight} size={18} color={RED} stroke={2.5} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE ─────────────────────────────────────────────── */}
        <section style={{ background: NAVY, color: '#fff', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ ...h2Style, color: '#fff' }}>
                Four reasons people<br />
                <Mark color={YELLOW} opacity={0.7}>keep calling us back.</Mark>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {WHY.map((w, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: '0 8px 20px rgba(220,38,38,0.32)' }}>
                    <Icon d={w.icon} size={26} color="#fff" stroke={2.3} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: '#fff', margin: '0 0 8px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{w.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#c8d1dc', margin: 0 }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ABOUT / FIREFIGHTER STORY ──────────────────────────────── */}
        <section id="about" style={{ background: CREAM, padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)', gap: 56, alignItems: 'center' }} className="about-grid">
            {/* Owner photo card with realistic photo-frame styling */}
            <div>
              <div style={{
                background: 'linear-gradient(180deg, #1a2030 0%, #0E1B2C 50%, #2a1810 100%)',
                borderRadius: 14,
                aspectRatio: '4 / 5',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 24px 50px -16px rgba(0,0,0,0.32), 0 10px 24px -8px rgba(0,0,0,0.18)',
                border: `5px solid #fff`,
                outline: `1px solid ${BORDER}`,
              }}>
                {/* Simulated photo "props": firefighter outline + cleaning equipment shadow */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: 'rgba(255,255,255,0.16)' }}>
                  <Icon d={ICONS.flame} size={88} color="rgba(245,98,15,0.45)" stroke={1.5} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a8090' }}>Owner photo</span>
                  <span style={{ fontSize: 10, color: '#5a6068', fontStyle: 'italic' }}>Placeholder · you send during intake</span>
                </div>
                {/* Name plate at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px', background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: RED, color: '#fff', padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                    <Icon d={ICONS.flame} size={11} color="#fff" stroke={2.5} />
                    Firefighter · EMT
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 24, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}>[Your Name]</div>
                  <div style={{ fontSize: 13, color: '#c8d1dc', marginTop: 4 }}>Owner & operator · Code 3 Cleaning</div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ ...h2Style, textAlign: 'left' }}>
                Same speed.<br />
                <Mark color={RED} opacity={0.4}>Different uniform.</Mark>
              </h2>
              <p style={aboutP}>
                Code 3 means lights and sirens, emergency response, top priority. It's how I answer the call at the firehouse, and it's the standard I bring to every cleaning job.
              </p>
              <p style={aboutP}>
                I started Code 3 Cleaning between 24-hour shifts. Folks in the Willamette Valley deserve the same urgency from their service providers that they expect when they dial 911. <strong>Same-day quotes. Show up on time. Work done right the first pass.</strong>
              </p>
              <p style={aboutP}>
                136+ jobs completed. 5.0 stars on Facebook. Fully insured. If something's not perfect, we come back same week, no charge.
              </p>
              <a href="#quote" style={{ ...ctaButtonBig(ORANGE), display: 'inline-flex', marginTop: 16 }}>
                Get a free quote
                <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
              </a>
              <p style={{ fontSize: 11, color: '#999', fontStyle: 'italic', marginTop: 24 }}>
                [Final about-page copy will be written from a 60-min recorded interview during intake.]
              </p>
            </div>
          </div>
        </section>

        {/* ─── GALLERY ────────────────────────────────────────────────── */}
        <section id="gallery" style={{ background: WHITE, padding: '88px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
              <h2 style={{ ...h2Style, textAlign: 'left', maxWidth: 720 }}>
                Recent jobs.<br />
                <Mark color={YELLOW} opacity={0.6}>Real Willamette Valley homes.</Mark>
              </h2>
              <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic', maxWidth: 280, textAlign: 'right' }}>
                [Gallery populated from your Folio photos + 15-20 new ones during intake.]
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {[
                { label: 'Hard-water removal', loc: 'Canby storefront' },
                { label: 'Gutter clear + flush', loc: 'Oregon City' },
                { label: 'Carpet extraction', loc: 'Wilsonville' },
                { label: 'Window detail', loc: 'Canby Main St' },
                { label: 'Screen rebuild', loc: 'Aurora' },
                { label: 'Full exterior', loc: 'Molalla home' },
                { label: 'Storefront windows', loc: 'Canby Main' },
                { label: 'Move-out clean', loc: 'Wilsonville' },
              ].map((g, i) => (
                <div key={i} style={{
                  aspectRatio: '4 / 3',
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? '#1a2030' : '#2a1810'} 0%, ${i % 2 === 0 ? '#0E1B2C' : '#1a0a04'} 100%)`,
                  borderRadius: 10,
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${BORDER}`,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: RED,
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    borderRadius: 3,
                  }}>
                    Before / After
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{g.label}</div>
                    <div style={{ fontSize: 11, color: '#a8b3c1', marginTop: 2 }}>{g.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BEFORE / AFTER SLIDER ──────────────────────────────────── */}
        <section style={{ background: WHITE, padding: '88px 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 56, alignItems: 'center' }} className="ba-grid">
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.28em', color: RED, textTransform: 'uppercase', margin: '0 0 14px' }}>
                Quality you can see
              </p>
              <h2 style={{ ...h2Style, textAlign: 'left' }}>
                Drag the slider.<br />
                See the <Mark color={YELLOW} opacity={0.7}>Code 3 difference.</Mark>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: MUTED, margin: '20px 0 24px' }}>
                Hard-water etching, mineral buildup, exterior film, most crews can't get it off. We can. This is a real Canby storefront before and after a single Code 3 service call.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  'Streak-free guaranteed, or we come back free',
                  'Hard-water spots removed in one visit',
                  'Photo report sent on every completed job',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 14.5, color: INK, fontWeight: 500 }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}>
                      <Icon d={ICONS.check} size={16} color={GREEN} stroke={3.5} />
                    </span>
                    {t}
                  </div>
                ))}
              </div>
              <a href="#quote" style={ctaButtonBig(RED)}>
                Book your free quote
                <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
              </a>
              <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 16 }}>
                [Real before/after photos load here at launch. Currently rendered for preview.]
              </p>
            </div>
            <div>
              <BeforeAfterSlider />
              <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', margin: '14px 0 0', fontWeight: 500, letterSpacing: '0.04em' }}>
                ← Drag the handle to compare →
              </p>
            </div>
          </div>
        </section>

        {/* ─── REVIEWS ───────────────────────────────────────────────── */}
        <section id="reviews" style={{ background: CREAM, padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={h2Style}>
                <Mark color={YELLOW} opacity={0.6}>5.0 stars on Facebook.</Mark><br />
                Every review counts.
              </h2>
              <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic', margin: '14px 0 0' }}>
                [Real Facebook reviews pulled and inserted during intake.]
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 26, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} d={ICONS.star} size={16} color={YELLOW} stroke={0} fill={YELLOW} />
                    ))}
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: INK, margin: '0 0 18px', minHeight: 90, fontStyle: 'italic' }}>
                    <span style={{ color: '#999' }}>"Real 5-star Facebook review · pulled before launch · placeholder for preview"</span>
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${ORANGE} 0%, ${RED} 100%)`, color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ★
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Verified Customer</div>
                      <div style={{ fontSize: 11, color: MUTED }}>Willamette Valley · Facebook</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" style={{ color: RED, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: `2px solid ${RED}`, paddingBottom: 2 }}>
                Read all 136+ reviews on Facebook
                <Icon d={ICONS.arrowRight} size={13} color={RED} stroke={2.5} />
              </a>
            </div>
          </div>
        </section>

        {/* ─── SERVICE AREA ───────────────────────────────────────────── */}
        <section id="area" style={{ background: WHITE, padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)', gap: 48, alignItems: 'center' }} className="area-grid">
            <div>
              <h2 style={{ ...h2Style, textAlign: 'left' }}>
                Based in Canby.<br />
                <Mark color={YELLOW} opacity={0.6}>Serving the whole Valley.</Mark>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: MUTED, margin: '20px 0 28px' }}>
                We cover north to Wilsonville, south to Salem-adjacent towns, east into Estacada and Sandy. Don't see your town? Just ask, we travel for the right job.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {AREAS.map((a) => (
                  <span key={a} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: CREAM,
                    border: `1px solid ${BORDER}`,
                    color: INK,
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                  }}>
                    <Icon d={ICONS.pin} size={11} color={RED} stroke={2.5} />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              aspectRatio: '4 / 3',
              background: `linear-gradient(135deg, #e8e4de 0%, #ede9e3 50%, #e0dcd6 100%)`,
              borderRadius: 14,
              border: `1px solid ${BORDER}`,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -8px rgba(0,0,0,0.12)',
            }}>
              {/* faux topo + roads */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.55 }} aria-hidden="true">
                <defs>
                  <pattern id="g3" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8c4be" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#g3)" />
                <path d="M 0 320 Q 200 280 400 340 T 800 360" fill="none" stroke="#b8b4ae" strokeWidth="2" opacity="0.6" />
                <path d="M 480 0 Q 460 200 520 400 T 480 800" fill="none" stroke="#b8b4ae" strokeWidth="2" opacity="0.6" />
              </svg>

              {/* Service radius ring */}
              <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', aspectRatio: '1 / 1', borderRadius: '50%', border: `2px dashed rgba(245,98,15,0.4)`, background: 'rgba(245,98,15,0.05)' }} />

              {[
                { top: '40%', left: '50%', label: 'Canby', big: true },
                { top: '24%', left: '58%', label: 'Oregon City' },
                { top: '32%', left: '36%', label: 'Wilsonville' },
                { top: '52%', left: '55%', label: 'Aurora' },
                { top: '62%', left: '42%', label: 'Molalla' },
                { top: '64%', left: '62%', label: 'Woodburn' },
              ].map((p, i) => (
                <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: p.big ? 18 : 13, height: p.big ? 18 : 13, borderRadius: '50%', background: p.big ? RED : ORANGE, boxShadow: `0 0 0 5px rgba(${p.big ? '220,38,38' : '245,98,15'},0.22)`, border: '2px solid #fff' }} />
                  <span style={{ position: 'absolute', top: (p.big ? 18 : 13) + 6, left: '50%', transform: 'translateX(-50%)', fontSize: p.big ? 12 : 11, fontWeight: 700, color: INK, whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.label}</span>
                </div>
              ))}

              <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 10, color: '#999', fontStyle: 'italic' }}>
                [Live Google Map at launch]
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────────────── */}
        <section id="faq" style={{ background: CREAM, padding: '88px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={h2Style}>
                You probably <Mark color={YELLOW} opacity={0.6}>want to know.</Mark>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQS.map((f, i) => (
                <details key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '18px 22px', cursor: 'pointer' }}>
                  <summary style={{ fontWeight: 700, fontSize: 16, color: INK, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    {f.q}
                    <Icon d={ICONS.plus} size={18} color={ORANGE} stroke={2.5} />
                  </summary>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: '14px 0 0' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ──────────────────────────────────────────────── */}
        <section style={{ background: NAVY, color: '#fff', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
          {/* big diagonal accent */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '140%', background: `linear-gradient(135deg, rgba(220,38,38,0.18) 0%, rgba(245,98,15,0.12) 100%)`, transform: 'rotate(12deg)', borderRadius: 60, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1 }} className="cta-grid">
            <div>
              <h2 style={{ ...h2Style, color: '#fff', textAlign: 'left' }}>
                Quote in your<br />
                <Mark color={YELLOW} opacity={0.75}>inbox today.</Mark>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#c8d1dc', margin: '20px 0 32px', maxWidth: 460 }}>
                Tell us the property, the service, your timeline. We'll INSTANTLY get back to you with a full quote, same day, every day, guaranteed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a href="tel:5039830126" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: '#fff', textDecoration: 'none', fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
                  <Icon d={ICONS.phone} size={20} color={ORANGE} stroke={2.5} />
                  (503) 983-0126
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#c8d1dc' }}>
                  <Icon d={ICONS.clock} size={15} color={ORANGE} stroke={2.5} />
                  Mon–Sat · 7am–7pm · Same-day response
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#c8d1dc' }}>
                  <Icon d={ICONS.pin} size={15} color={ORANGE} stroke={2.5} />
                  Canby, OR · Serving the Willamette Valley
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#c8d1dc' }}>
                  <Icon d={ICONS.shield} size={15} color={ORANGE} stroke={2.5} />
                  Oregon License #[INTAKE] · $2M insured
                </div>
              </div>
            </div>

            <div>
              <div style={{ background: WHITE, color: INK, borderRadius: 14, padding: 28, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), 0 12px 28px -8px rgba(0,0,0,0.25)' }}>
                <h3 style={{ fontWeight: 900, fontSize: 22, color: INK, margin: '0 0 4px', lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                  Free quote · 30 seconds
                </h3>
                <p style={{ fontSize: 13.5, color: MUTED, margin: '0 0 18px' }}>
                  We'll INSTANTLY get back to you. Same-day guaranteed.
                </p>
                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
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
                  <button type="submit" style={{ ...ctaButtonBig(ORANGE), width: '100%', justifyContent: 'center', marginTop: 6, padding: '15px 24px', fontSize: 16 }}>
                    Get My Free Quote
                    <Icon d={ICONS.arrow} size={16} color="#fff" stroke={2.5} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─────────────────────────────────────────────────── */}
        <footer style={{ background: '#0a1320', color: '#8a96a8', padding: '40px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Emblem size={48} />
                <span className="c3-mark" style={{ fontWeight: 900, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
                  Code 3<span style={{ color: RED }}>.</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#8a96a8', lineHeight: 1.55, margin: 0 }}>
                Window, gutter, carpet & screen, done same-day across the Willamette Valley. Fully licensed and insured in Oregon.
              </p>
            </div>
            <div>
              <p style={footerH}>Services</p>
              {SERVICES.map(s => <a key={s.title} href="#services" style={footerLink}>{s.title}</a>)}
            </div>
            <div>
              <p style={footerH}>Service Area</p>
              <p style={{ fontSize: 13, color: '#8a96a8', margin: 0, lineHeight: 1.6 }}>
                {AREAS.join(' · ')}
              </p>
            </div>
            <div>
              <p style={footerH}>Contact</p>
              <a href="tel:5039830126" style={footerLink}>(503) 983-0126</a>
              <a href="sms:5039830126" style={footerLink}>Text us</a>
              <p style={{ fontSize: 13, color: '#8a96a8', margin: '8px 0 0' }}>Mon–Sat · 7am–7pm</p>
            </div>
          </div>
          <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 18, borderTop: `1px solid #1a2030`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, color: '#5a6068' }}>
            <span>© 2026 Code 3 Cleaning · Licensed & insured in Oregon</span>
            <span style={{ color: '#3a4048' }}>Built by Opervo</span>
          </div>
        </footer>

        {/* ─── DISCRETE PREVIEW CHIP ──────────────────────────────────── */}
        <div style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: ORANGE,
          color: '#fff',
          padding: '10px 16px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          Preview · Final at code3cleaning.com
          <a href="/sites" style={{ marginLeft: 6, color: '#fff', textDecoration: 'underline', fontWeight: 700 }}>← Back</a>
        </div>

      </div>
    </>
  )
}

// ─── helpers / style objects ────────────────────────────────────────
const navLink: React.CSSProperties = {
  color: INK,
  textDecoration: 'none',
  fontSize: 14.5,
  fontWeight: 600,
  letterSpacing: '0.01em',
}

function ctaButton(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: '#fff',
    fontWeight: 700,
    fontSize: 13.5,
    padding: '10px 18px',
    borderRadius: 7,
    textDecoration: 'none',
    boxShadow: `0 4px 12px ${bg}3d`,
    letterSpacing: '0.01em',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  }
}

function ctaButtonBig(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: '#fff',
    fontWeight: 700,
    fontSize: 15.5,
    padding: '15px 26px',
    borderRadius: 8,
    textDecoration: 'none',
    boxShadow: `0 8px 22px ${bg}55`,
    letterSpacing: '0.01em',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
  }
}

const formInput: React.CSSProperties = {
  background: WHITE,
  border: `1.5px solid ${BORDER}`,
  borderRadius: 7,
  padding: '12px 14px',
  fontSize: 14,
  color: INK,
  fontFamily: "'Poppins', sans-serif",
  width: '100%',
  outline: 'none',
  fontWeight: 500,
}

const h2Style: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 'clamp(30px, 4.2vw, 48px)',
  lineHeight: 1.05,
  letterSpacing: '-0.022em',
  color: INK,
  margin: 0,
  textAlign: 'center',
}

const h2Sub: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.55,
  color: MUTED,
  margin: 0,
}

const aboutP: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: INK,
  margin: '0 0 16px',
}

const footerH: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 12,
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  margin: '0 0 12px',
}

const footerLink: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  color: '#8a96a8',
  textDecoration: 'none',
  margin: '0 0 6px',
}
