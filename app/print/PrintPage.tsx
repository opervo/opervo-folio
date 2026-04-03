'use client'

import { useState } from 'react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const TRADES = [
  'Window Cleaning', 'Pressure Washing', 'Solar Panel Cleaning',
  'Lawn Care', 'Landscaping', 'Gutter Cleaning', 'Roof Cleaning',
  'House Cleaning', 'Pool Service', 'Pest Control', 'HVAC', 'Other',
]

const PRODUCTS = [
  {
    type: 'business-cards',
    title: 'Business Cards',
    specs: '3.5" × 2" · 16pt stock · Full color · Double-sided',
    tiers: [
      { qty: 250,   label: '250 cards',   price: 24.99, priceId: 'price_1TGBOL3zYC4dB5Z5QIlblqqQ', badge: null },
      { qty: 500,   label: '500 cards',   price: 34.99, priceId: 'price_1TGBOM3zYC4dB5Z5tsptpAxs', badge: 'Save 30%' },
      { qty: 1000,  label: '1,000 cards', price: 49.99, priceId: 'price_1TGBON3zYC4dB5Z51quPhgv4', badge: 'Best Value' },
    ],
  },
  {
    type: 'door-hangers',
    title: 'Door Hangers',
    specs: '3.5" × 8.5" · 14pt stock · Full color · Double-sided',
    tiers: [
      { qty: 250,   label: '250 hangers',   price: 59.99,  priceId: 'price_1TGBOO3zYC4dB5Z59lbUWP3j', badge: null },
      { qty: 500,   label: '500 hangers',   price: 89.99,  priceId: 'price_1TGBOP3zYC4dB5Z5eqoco7SZ', badge: 'Save 25%' },
      { qty: 1000,  label: '1,000 hangers', price: 129.99, priceId: 'price_1TGBOQ3zYC4dB5Z5AbCHqutx', badge: 'Best Value' },
    ],
  },
  {
    type: 'yard-signs',
    title: 'Yard Signs',
    specs: '18" × 24" · Corrugated plastic · Full color · Double-sided · H-stake included',
    tiers: [
      { qty: 10,  label: '10 signs',  price: 49.99,  priceId: 'price_1TGC153zYC4dB5Z5fgba2sYL', badge: null },
      { qty: 25,  label: '25 signs',  price: 89.99,  priceId: 'price_1TGC193zYC4dB5Z5MPLlSWVB', badge: 'Save 20%' },
      { qty: 50,  label: '50 signs',  price: 149.99, priceId: 'price_1TGC1C3zYC4dB5Z55qX5euA8', badge: 'Best Value' },
    ],
  },
]

// Color themes — contractor picks their vibe
const THEMES = [
  { id: 'navy',    label: 'Navy',    accent: '#1A3A6B', bg: '#FFFFFF', text: '#0F0F0F', backBg: '#1A3A6B' },
  { id: 'slate',   label: 'Slate',   accent: '#374151', bg: '#FFFFFF', text: '#0F0F0F', backBg: '#374151' },
  { id: 'forest',  label: 'Forest',  accent: '#1A5C3A', bg: '#FFFFFF', text: '#0F0F0F', backBg: '#1A5C3A' },
  { id: 'rust',    label: 'Rust',    accent: '#C0392B', bg: '#FFFFFF', text: '#0F0F0F', backBg: '#C0392B' },
  { id: 'gold',    label: 'Gold',    accent: '#92400E', bg: '#FFFBEB', text: '#1a1a1a', backBg: '#92400E' },
  { id: 'black',   label: 'Black',   accent: '#0F0F0F', bg: '#FFFFFF', text: '#0F0F0F', backBg: '#0F0F0F' },
]

type Theme = typeof THEMES[0]
type Tier = typeof PRODUCTS[0]['tiers'][0]
type Product = typeof PRODUCTS[0]

// ─── Business Card Preview ───────────────────────────────────────────────────
function BusinessCardPreview({ form, theme }: {
  form: { businessName: string; trade: string; phone: string; website: string }
  theme: Theme
}) {
  const name = form.businessName || 'Your Business Name'
  const trade = form.trade || 'Your Trade'
  const phone = form.phone || '(555) 000-0000'
  const website = form.website?.replace(/^https?:\/\//, '') || 'yourwebsite.com'

  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Front</p>
      <div style={{
        width: '100%', maxWidth: 280, margin: '0 auto',
        aspectRatio: '3.5 / 2',
        background: theme.bg,
        borderRadius: 8,
        padding: '14px 18px',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        boxShadow: '0 6px 20px rgba(0,0,0,0.14)',
        position: 'relative', overflow: 'hidden',
        border: '1px solid #E8E4DE',
      }}>
        {/* Left accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: theme.accent }} />
        <div style={{ paddingLeft: 10 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: theme.text, margin: 0, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.1 }}>{name}</p>
          <p style={{ fontSize: 9, color: theme.accent, fontWeight: 700, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{trade}</p>
        </div>
        <div style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <p style={{ fontSize: 9, color: '#4B5563', margin: 0 }}>✆ {phone}</p>
          <p style={{ fontSize: 9, color: '#4B5563', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🌐 {website}</p>
        </div>
      </div>

      <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', margin: '14px 0 8px' }}>Back</p>
      <div style={{
        width: '100%', maxWidth: 280, margin: '0 auto',
        aspectRatio: '3.5 / 2',
        background: theme.backBg,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0, textAlign: 'center', padding: '0 16px', lineHeight: 1.1 }}>
          {name}
        </p>
        <div style={{ width: 32, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 99 }} />
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{trade}</p>
      </div>

      <p style={{ fontSize: 10, color: '#6B6B6B', textAlign: 'center', marginTop: 10 }}>
        Mockup only — final proof sent in 24hrs
      </p>
    </div>
  )
}

// ─── Door Hanger Preview ─────────────────────────────────────────────────────
function DoorHangerPreview({ form, theme }: {
  form: { businessName: string; trade: string; phone: string; website: string }
  theme: Theme
}) {
  const name = form.businessName || 'Your Business Name'
  const trade = form.trade || 'Your Trade'
  const phone = form.phone || '(555) 000-0000'
  const website = form.website?.replace(/^https?:\/\//, '') || 'yourwebsite.com'

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Front */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Front</p>
          <div style={{
            width: 110,
            aspectRatio: '3.5 / 8.5',
            background: theme.bg,
            border: '1px solid #E8E4DE',
            borderRadius: 8,
            padding: '20px 10px 14px',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}>
            {/* Hole punch */}
            <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 13, height: 13, borderRadius: '50%', background: '#F7F5F2', border: '1.5px solid #D1D5DB', zIndex: 2 }} />
            {/* Top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: theme.accent }} />

            <div style={{ marginTop: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: theme.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px', fontSize: 16,
              }}>
                🏠
              </div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 9, color: theme.text, margin: 0, textTransform: 'uppercase', lineHeight: 1.2 }}>{name}</p>
              <p style={{ fontSize: 7, color: theme.accent, fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{trade}</p>
            </div>

            <div style={{ width: '100%' }}>
              <div style={{ height: 1, background: '#E8E4DE', marginBottom: 8 }} />
              <p style={{ fontSize: 7, color: '#374151', margin: '0 0 3px', fontWeight: 700 }}>{phone}</p>
              <p style={{ fontSize: 6, color: '#6B6B6B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{website}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Back</p>
          <div style={{
            width: 110,
            aspectRatio: '3.5 / 8.5',
            background: theme.backBg,
            borderRadius: 8,
            padding: '20px 10px 14px',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}>
            <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 13, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)', zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: -16, right: -16, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

            <div style={{ marginTop: 14 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 10, color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 1.1 }}>Free<br />Estimate</p>
              <div style={{ width: 24, height: 1.5, background: 'rgba(255,255,255,0.4)', margin: '7px auto' }} />
              <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.4 }}>Call or text<br />anytime</p>
            </div>

            <div style={{ width: '100%' }}>
              <p style={{ fontSize: 8, color: '#fff', margin: '0 0 2px', fontWeight: 700 }}>{phone}</p>
              <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{name}</p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 10, color: '#6B6B6B', textAlign: 'center', marginTop: 10 }}>
        Mockup only — final proof sent in 24hrs
      </p>
    </div>
  )
}

// ─── Yard Sign Preview (18"×24" ratio = 0.75) ───────────────────────────────
function YardSignPreview({ form, theme }: {
  form: { businessName: string; trade: string; phone: string; website: string }
  theme: Theme
}) {
  const name = form.businessName || 'Your Business Name'
  const trade = form.trade || 'Your Trade'
  const phone = form.phone || '(555) 000-0000'
  const website = form.website?.replace(/^https?:\/\//, '') || 'yourwebsite.com'

  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Front</p>
      <div style={{
        width: '100%', maxWidth: 280, margin: '0 auto',
        aspectRatio: '18 / 24',
        background: theme.backBg,
        borderRadius: 8,
        padding: '20px 18px',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 6px 20px rgba(0,0,0,0.14)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: '0 0 8px', lineHeight: 1.1 }}>{name}</p>
        <div style={{ width: 40, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 99, marginBottom: 8 }} />
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>{trade}</p>
        <p style={{ fontSize: 16, color: '#fff', fontWeight: 700, margin: '0 0 4px' }}>{phone}</p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{website}</p>
      </div>

      {/* H-stake indicator */}
      <div style={{ width: '100%', maxWidth: 280, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 8, height: 28, background: '#D1D5DB', borderRadius: '0 0 3px 3px' }} />
      </div>

      <p style={{ fontSize: 10, color: '#6B6B6B', textAlign: 'center', marginTop: 8 }}>
        Mockup only — final proof sent in 24hrs
      </p>
    </div>
  )
}

// ─── Theme Picker ────────────────────────────────────────────────────────────
function ThemePicker({ selected, onChange }: { selected: Theme; onChange: (t: Theme) => void }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>Color Theme</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t)}
            title={t.label}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: t.backBg,
              border: selected.id === t.id ? '2.5px solid #1a1a1a' : '2px solid transparent',
              outline: selected.id === t.id ? '2px solid #1a1a1a' : 'none',
              outlineOffset: 2,
              cursor: 'pointer',
              padding: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function PrintPage() {
  const [selected, setSelected] = useState<{ product: Product; tier: Tier } | null>(null)
  const [theme, setTheme] = useState<Theme>(THEMES[0])
  const [form, setForm] = useState({
    businessName: '', ownerName: '', trade: '', phone: '', email: '', website: '', notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOrder = (product: Product, tier: Tier) => {
    setSelected({ product, tier })
    setError('')
  }

  const handleClose = () => {
    setSelected(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/print-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: selected.tier.priceId,
          productTitle: selected.product.title,
          qty: selected.tier.qty,
          colorTheme: theme.label,
          ...form,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <SiteNav />

      {/* COMING SOON BANNER */}
      <div style={{ background: '#0F0F0F', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.12)', padding: '6px 14px', borderRadius: 4, marginBottom: 16 }}>
            Coming Soon
          </span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.15, color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
            Print Materials Are Almost Here
          </h2>
          <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.6 }}>
            We are finalizing vendor approval. Check back soon — business cards, door hangers, and yard signs will be available to order shortly.
          </p>
        </div>
      </div>

      {/* HERO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center', opacity: 0.45, pointerEvents: 'none' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Marketing Materials
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Pro Print Materials.<br />Built for Your Trade.
        </h1>
        <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 12px' }}>
          Business cards and door hangers branded with your info — designed, printed, and shipped to your door.
        </p>
        <p style={{ fontSize: 13, color: '#6B6B6B' }}>
          Free shipping · 5–7 business day turnaround · Proof sent before printing
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px', opacity: 0.45, pointerEvents: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { step: '1', title: 'Choose Your Product', desc: 'Pick your material and quantity.' },
            { step: '2', title: 'Preview Your Design', desc: 'Pick a color theme, see it live.' },
            { step: '3', title: 'We Refine & Print', desc: 'Proof sent within 24 hours.' },
            { step: '4', title: 'Ships to Your Door', desc: 'Free shipping, 5–7 business days.' },
          ].map((s) => (
            <div key={s.step} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>{s.step}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F0F0F', margin: '0 0 4px' }}>{s.title}</p>
              <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      {PRODUCTS.map((product) => (
        <section key={product.type} style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 64px', opacity: 0.45, pointerEvents: 'none' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 4 }}>
            {product.title}
          </h2>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>{product.specs}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {product.tiers.map((tier) => (
              <div key={tier.qty} style={{ background: '#fff', border: tier.badge === 'Best Value' ? '2px solid #F5620F' : '1px solid #E8E4DE', borderRadius: 12, padding: '28px 24px', position: 'relative' }}>
                {tier.badge && (
                  <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: tier.badge === 'Best Value' ? '#F5620F' : '#0F0F0F', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                    {tier.badge}
                  </span>
                )}
                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B6B6B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tier.label}</p>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 42, color: '#0F0F0F' }}>${tier.price.toFixed(0)}</span>
                  <span style={{ fontSize: 14, color: '#6B6B6B' }}>.{String(tier.price.toFixed(2).split('.')[1])}</span>
                </div>
                <p style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 20 }}>
                  ${(tier.price / tier.qty).toFixed(3)} per piece · Free shipping included
                </p>
                <button
                  onClick={() => handleOrder(product, tier)}
                  style={{ display: 'block', width: '100%', textAlign: 'center', background: tier.badge === 'Best Value' ? '#F5620F' : '#0F0F0F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '13px', borderRadius: 6, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  Order Now →
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* TRUST STRIP */}
      <section style={{ background: '#0F0F0F', padding: '40px 24px', textAlign: 'center', marginBottom: 0 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px 48px' }}>
          {['✓ Free shipping on all orders', '✓ Proof sent within 24hrs', '✓ 5–7 day turnaround', '✓ 100% satisfaction guarantee'].map((t) => (
            <span key={t} style={{ fontSize: 13, color: '#F7F5F2', fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Explore More */}
      <section style={{ background: '#F7F5F2', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#F5620F', letterSpacing: '0.14em', marginBottom: 16 }}>
            Explore More
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { title: 'All Features', desc: 'See everything Opervo can do for your business', href: '/features' },
              { title: 'Pricing', desc: 'Plans starting at $24.99/mo', href: '/pricing' },
              { title: 'Blog', desc: 'Tips to grow your home service business', href: '/blog' },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ display: 'block', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '16px 14px', textDecoration: 'none' }}>
                <strong style={{ display: 'block', fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</strong>
                <span style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif" }}>{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ORDER MODAL */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 860, maxHeight: '94vh', overflowY: 'auto' }}>

            {/* Modal header */}
            <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Your Order</p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', margin: 0, textTransform: 'uppercase' }}>
                  {selected.tier.qty.toLocaleString()} {selected.product.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: '4px 0 0' }}>
                  ${selected.tier.price.toFixed(2)} · Free shipping included
                </p>
              </div>
              <button onClick={handleClose} style={{ background: '#F7F5F2', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#6B6B6B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
            </div>

            {/* Two-column: preview | form */}
            <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 0 }}>

              {/* LEFT — Live Preview */}
              <div style={{ padding: '20px 24px 28px', borderRight: '1px solid #E8E4DE', background: '#F7F5F2' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                  Live Preview
                </p>

                <ThemePicker selected={theme} onChange={setTheme} />

                {selected.product.type === 'business-cards' ? (
                  <BusinessCardPreview form={form} theme={theme} />
                ) : selected.product.type === 'door-hangers' ? (
                  <DoorHangerPreview form={form} theme={theme} />
                ) : (
                  <YardSignPreview form={form} theme={theme} />
                )}
              </div>

              {/* RIGHT — Form */}
              <div style={{ padding: '20px 24px 28px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                  Your Details
                </p>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { label: 'Business Name', key: 'businessName', type: 'text', placeholder: 'e.g. Solar Wash ATX', required: true },
                      { label: 'Your Name', key: 'ownerName', type: 'text', placeholder: 'First & last name', required: true },
                      { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '(555) 000-0000', required: true },
                      { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@yourbusiness.com', required: true },
                      { label: 'Website', key: 'website', type: 'url', placeholder: 'https://yourbusiness.com', required: false },
                    ].map(({ label, key, type, placeholder, required }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                          {label}{required && <span style={{ color: '#F5620F' }}> *</span>}
                        </label>
                        <input
                          type={type}
                          required={required}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                          style={{ width: '100%', height: 40, padding: '0 12px', border: '1px solid #E8E4DE', borderRadius: 7, fontSize: 13, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                        Trade <span style={{ color: '#F5620F' }}>*</span>
                      </label>
                      <select
                        required
                        value={form.trade}
                        onChange={(e) => setForm((prev) => ({ ...prev, trade: e.target.value }))}
                        style={{ width: '100%', height: 40, padding: '0 12px', border: '1px solid #E8E4DE', borderRadius: 7, fontSize: 13, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}
                      >
                        <option value="">Select your trade…</option>
                        {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                        Notes for Designer
                      </label>
                      <textarea
                        placeholder="Any specific requests, colors, or taglines…"
                        value={form.notes}
                        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                        rows={2}
                        style={{ width: '100%', padding: '8px 12px', border: '1px solid #E8E4DE', borderRadius: 7, fontSize: 13, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    {error && (
                      <p style={{ fontSize: 13, color: '#dc2626', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 8, padding: '10px 14px', margin: 0 }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ background: loading ? '#ccc' : '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '14px', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                    >
                      {loading ? 'Redirecting to checkout…' : `Pay $${selected.tier.price.toFixed(2)} →`}
                    </button>

                    <p style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center', margin: 0 }}>
                      Secure checkout via Stripe · Proof sent before printing
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 620px) {
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
        }
      `}</style>
    </div>
  )
}
