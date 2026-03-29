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
]

type Tier = typeof PRODUCTS[0]['tiers'][0]
type Product = typeof PRODUCTS[0]

export default function PrintPage() {
  const [selected, setSelected] = useState<{ product: Product; tier: Tier } | null>(null)
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

      {/* HERO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
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
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { step: '1', title: 'Choose Your Product', desc: 'Pick your material and quantity.' },
            { step: '2', title: 'Enter Your Info', desc: 'Business name, trade, phone, and website.' },
            { step: '3', title: 'We Design It', desc: 'You get a proof within 24 hours.' },
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
        <section key={product.type} style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 64px' }}>
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

      <SiteFooter />

      {/* ORDER MODAL */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto', padding: '28px 24px 40px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
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

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Business Name', key: 'businessName', type: 'text', placeholder: 'e.g. Solar Wash ATX', required: true },
                  { label: 'Your Name', key: 'ownerName', type: 'text', placeholder: 'First & last name', required: true },
                  { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '(555) 000-0000', required: true },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@yourbusiness.com', required: true },
                  { label: 'Website', key: 'website', type: 'url', placeholder: 'https://yourbusiness.com', required: false },
                ].map(({ label, key, type, placeholder, required }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {label}{required && <span style={{ color: '#F5620F' }}> *</span>}
                    </label>
                    <input
                      type={type}
                      required={required}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      style={{ width: '100%', height: 44, padding: '0 14px', border: '1px solid #E8E4DE', borderRadius: 8, fontSize: 14, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Trade <span style={{ color: '#F5620F' }}>*</span>
                  </label>
                  <select
                    required
                    value={form.trade}
                    onChange={(e) => setForm((prev) => ({ ...prev, trade: e.target.value }))}
                    style={{ width: '100%', height: 44, padding: '0 14px', border: '1px solid #E8E4DE', borderRadius: 8, fontSize: 14, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}
                  >
                    <option value="">Select your trade…</option>
                    {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Notes for Designer
                  </label>
                  <textarea
                    placeholder="Any specific requests, colors, or taglines…"
                    value={form.notes}
                    onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E8E4DE', borderRadius: 8, fontSize: 14, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
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
                  style={{ background: loading ? '#ccc' : '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 4 }}
                >
                  {loading ? 'Redirecting to checkout…' : `Pay $${selected.tier.price.toFixed(2)} →`}
                </button>

                <p style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center', margin: 0 }}>
                  Secure checkout via Stripe · You'll receive a design proof before printing
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
