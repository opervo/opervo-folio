'use client'

import { useState } from 'react'
import Link from 'next/link'

const STATUS_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  paid:               { label: 'Payment Confirmed',    color: '#1A6BF0', desc: 'Your proof is being prepared.' },
  proof_sent:         { label: 'Proof Sent',           color: '#F5620F', desc: 'Review your mockup below and approve or request changes.' },
  approved:           { label: 'Approved — Printing',  color: '#12a05c', desc: 'Your order has been sent to print. Ships in 5–7 business days.' },
  changes_requested:  { label: 'Changes Requested',    color: '#f59e0b', desc: "We received your feedback and we're working on a revision." },
  ordered:            { label: 'Ordered — Printing',   color: '#12a05c', desc: 'In production. Ships in 5–7 business days.' },
  shipped:            { label: 'Shipped',              color: '#12a05c', desc: 'Your order is on its way!' },
}

const THEME_COLORS: Record<string, { accent: string; backBg: string }> = {
  Navy:   { accent: '#1A3A6B', backBg: '#1A3A6B' },
  Slate:  { accent: '#374151', backBg: '#374151' },
  Forest: { accent: '#1A5C3A', backBg: '#1A5C3A' },
  Rust:   { accent: '#C0392B', backBg: '#C0392B' },
  Gold:   { accent: '#92400E', backBg: '#92400E' },
  Black:  { accent: '#0F0F0F', backBg: '#0F0F0F' },
}

function CardMockup({ order }: { order: { businessName: string; trade: string; phone: string; website: string; colorTheme: string; productTitle: string } }) {
  const t = THEME_COLORS[order.colorTheme] || THEME_COLORS['Navy']
  const website = order.website?.replace(/^https?:\/\//, '') || ''
  const productLower = order.productTitle.toLowerCase()

  if (productLower.includes('business')) {
    return (
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Front</p>
        <div style={{ width: '100%', maxWidth: 280, margin: '0 auto', aspectRatio: '3.5 / 2', background: '#fff', borderRadius: 8, padding: '14px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 6px 20px rgba(0,0,0,0.12)', border: '1px solid #E8E4DE', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: t.accent }} />
          <div style={{ paddingLeft: 10 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#0F0F0F', margin: 0, textTransform: 'uppercase' }}>{order.businessName}</p>
            <p style={{ fontSize: 9, color: t.accent, fontWeight: 700, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{order.trade}</p>
          </div>
          <div style={{ paddingLeft: 10 }}>
            <p style={{ fontSize: 9, color: '#4B5563', margin: '0 0 3px' }}>✆ {order.phone}</p>
            {website && <p style={{ fontSize: 9, color: '#4B5563', margin: 0 }}>🌐 {website}</p>}
          </div>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', margin: '14px 0 8px' }}>Back</p>
        <div style={{ width: '100%', maxWidth: 280, margin: '0 auto', aspectRatio: '3.5 / 2', background: t.backBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0, textAlign: 'center' }}>{order.businessName}</p>
          <div style={{ width: 32, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 99 }} />
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{order.trade}</p>
        </div>
      </div>
    )
  }

  if (productLower.includes('door')) {
    return (
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Front</p>
          <div style={{ width: 120, aspectRatio: '3.5 / 8.5', background: '#fff', border: '1px solid #E8E4DE', borderTop: `4px solid ${t.accent}`, borderRadius: 8, padding: '22px 10px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: '#F7F5F2', border: '1.5px solid #D1D5DB' }} />
            <div style={{ marginTop: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 18 }}>🏠</div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 10, color: '#0F0F0F', margin: 0, textTransform: 'uppercase' }}>{order.businessName}</p>
              <p style={{ fontSize: 7, color: t.accent, fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase' }}>{order.trade}</p>
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ height: 1, background: '#E8E4DE', marginBottom: 8 }} />
              <p style={{ fontSize: 8, color: '#374151', margin: 0, fontWeight: 700 }}>{order.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Back</p>
          <div style={{ width: 120, aspectRatio: '3.5 / 8.5', background: t.backBg, borderRadius: 8, padding: '22px 10px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 11, color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 1.1 }}>Free<br />Estimate</p>
              <div style={{ width: 24, height: 1.5, background: 'rgba(255,255,255,0.4)', margin: '8px auto' }} />
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Call or text anytime</p>
            </div>
            <p style={{ fontSize: 9, color: '#fff', margin: 0, fontWeight: 700 }}>{order.phone}</p>
          </div>
        </div>
      </div>
    )
  }

  // Yard sign
  return (
    <div style={{ width: '100%', maxWidth: 320, margin: '0 auto', background: t.backBg, borderRadius: 10, padding: '28px 24px', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.14)' }}>
      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: '0 0 8px' }}>{order.businessName}</p>
      <div style={{ width: 40, height: 2, background: 'rgba(255,255,255,0.4)', margin: '0 auto 10px', borderRadius: 99 }} />
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>{order.trade}</p>
      <p style={{ fontSize: 18, color: '#fff', fontWeight: 700, margin: '0 0 4px' }}>{order.phone}</p>
      {website && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{website}</p>}
    </div>
  )
}

type Order = {
  id: string
  approval_token: string
  status: string
  product_title: string
  qty: number
  price_paid: number
  color_theme: string
  business_name: string
  owner_name: string
  trade: string
  phone: string
  email: string
  website: string
  notes: string
  approved_at: string | null
  changes_requested: string | null
  created_at: string
}

export default function ApprovalClient({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status)
  const [showChanges, setShowChanges] = useState(false)
  const [changes, setChanges] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const statusInfo = STATUS_LABELS[status] || STATUS_LABELS['paid']
  const canAct = status === 'proof_sent' || status === 'paid' || status === 'changes_requested'

  const handleApprove = async () => {
    setLoading(true)
    const res = await fetch('/api/print-approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: order.approval_token, action: 'approve' }),
    })
    if (res.ok) {
      setStatus('approved')
      setDone(true)
    }
    setLoading(false)
  }

  const handleChanges = async () => {
    if (!changes.trim()) return
    setLoading(true)
    const res = await fetch('/api/print-approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: order.approval_token, action: 'changes', changes }),
    })
    if (res.ok) {
      setStatus('changes_requested')
      setDone(true)
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <div style={{ background: '#0F0F0F', padding: '20px 24px' }}>
        <Link href="/print" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, color: '#F7F5F2', textTransform: 'uppercase' }}>
            Opervo<span style={{ color: '#F5620F' }}>.</span>
          </span>
        </Link>
      </div>

      <section style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px' }}>

        {/* Status badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '8px 14px', marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusInfo.color }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: statusInfo.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{statusInfo.label}</span>
        </div>

        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: '0 0 8px' }}>
          {order.qty.toLocaleString()} {order.product_title}
        </h1>
        <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 28 }}>{statusInfo.desc}</p>

        {/* Order details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: '#E8E4DE', border: '1px solid #E8E4DE', borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
          {[
            { label: 'Business', value: order.business_name },
            { label: 'Color Theme', value: order.color_theme || 'Navy' },
            { label: 'Amount Paid', value: `$${order.price_paid?.toFixed(2)}` },
          ].map((item) => (
            <div key={item.label} style={{ background: '#fff', padding: '12px 16px' }}>
              <p style={{ fontSize: 10, color: '#6B6B6B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 3px' }}>{item.label}</p>
              <p style={{ fontSize: 13, color: '#0F0F0F', fontWeight: 600, margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Mockup */}
        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '28px 20px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20, textAlign: 'center' }}>
            Design Mockup
          </p>
          <CardMockup order={{
            businessName: order.business_name,
            trade: order.trade,
            phone: order.phone,
            website: order.website,
            colorTheme: order.color_theme || 'Navy',
            productTitle: order.product_title,
          }} />
          <p style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center', marginTop: 16 }}>
            This is a layout mockup — your final printed piece will be professionally designed at print quality.
          </p>
        </div>

        {order.notes && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Your Notes</p>
            <p style={{ fontSize: 13, color: '#1a1a1a', margin: 0 }}>{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        {done ? (
          <div style={{ background: status === 'approved' ? 'rgba(18,160,92,0.08)' : 'rgba(245,158,11,0.08)', border: `1px solid ${status === 'approved' ? 'rgba(18,160,92,0.2)' : 'rgba(245,158,11,0.2)'}`, borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 20, margin: '0 0 6px' }}>{status === 'approved' ? '✅' : '📬'}</p>
            <p style={{ fontWeight: 700, color: '#0F0F0F', margin: '0 0 4px' }}>
              {status === 'approved' ? "You're all set!" : 'Changes received!'}
            </p>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
              {status === 'approved'
                ? 'Your order is heading to print. Expect delivery in 5–7 business days.'
                : "We'll revise your design and send a new proof shortly."}
            </p>
          </div>
        ) : canAct ? (
          <div>
            {!showChanges ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  style={{ background: '#12a05c', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px', borderRadius: 8, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  {loading ? '...' : '✓ Approve Design'}
                </button>
                <button
                  onClick={() => setShowChanges(true)}
                  style={{ background: '#F7F5F2', color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px', borderRadius: 8, border: '1px solid #E8E4DE', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  Request Changes
                </button>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  What would you like changed?
                </label>
                <textarea
                  value={changes}
                  onChange={(e) => setChanges(e.target.value)}
                  placeholder="e.g. Change the tagline to 'Licensed & Insured', add my email address…"
                  rows={4}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E8E4DE', borderRadius: 8, fontSize: 14, color: '#1a1a1a', background: '#F7F5F2', outline: 'none', resize: 'none', boxSizing: 'border-box', marginBottom: 12 }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button
                    onClick={handleChanges}
                    disabled={loading || !changes.trim()}
                    style={{ background: loading || !changes.trim() ? '#ccc' : '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    {loading ? '...' : 'Submit Changes'}
                  </button>
                  <button
                    onClick={() => setShowChanges(false)}
                    style={{ background: '#F7F5F2', color: '#6B6B6B', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, padding: '13px', borderRadius: 8, border: '1px solid #E8E4DE', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <p style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center', marginTop: 14 }}>
              Questions? <a href="mailto:help@opervo.io" style={{ color: '#F5620F' }}>help@opervo.io</a>
            </p>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
              Questions about your order? <a href="mailto:help@opervo.io" style={{ color: '#F5620F' }}>help@opervo.io</a>
            </p>
          </div>
        )}

      </section>
    </div>
  )
}
