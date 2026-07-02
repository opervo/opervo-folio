'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type LedgerEntry = {
  type: 'earn' | 'redeem'
  amount_cents: number
  description: string | null
  date: string
}

type GearItem = {
  id: string
  title: string
  description: string
  image_url: string | null
  credit_cost: number
  category: string
}

type Redemption = {
  id: string
  items: { id: string; title: string; credit_cost: number; qty: number }[]
  total_credits: number
  status: string
  date: string
}

type CreditsData = {
  business_name: string
  code: string
  balance_cents: number
  earned_cents: number
  redeemed_cents: number
  referral_count: number
  ledger: LedgerEntry[]
  gear_items: GearItem[]
  redemptions: Redemption[]
}

type CartItem = { item: GearItem; qty: number }

function formatCredits(cents: number) {
  return `${(cents / 100).toFixed(0)}`
}

/* ─── Login Form ─── */
function LoginForm({ onLogin }: { onLogin: (code: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError || !authData.user) {
      setError(authError?.message || 'Could not sign in.')
      setLoading(false)
      return
    }

    const userEmail = authData.user.email?.toLowerCase()
    if (!userEmail) {
      setError('No email on account.')
      setLoading(false)
      return
    }

    const { data: codeRow } = await supabase
      .from('apprentice_referral_codes')
      .select('code')
      .eq('email', userEmail)
      .maybeSingle()

    if (!codeRow) {
      setError('No Apprentice account found for this email.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    onLogin(codeRow.code)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F0F', fontFamily: "'Barlow', sans-serif" }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '80px 20px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#F7F5F2' }}>
            Opervo<span style={{ color: '#F5620F' }}>.</span>
          </span>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginTop: 8 }}>
            Gear Store
          </p>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '32px 24px' }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', textTransform: 'uppercase', margin: '0 0 4px', textAlign: 'center' }}>
            Sign in
          </h1>
          <p style={{ fontSize: 14, color: '#6B6B6B', textAlign: 'center', margin: '0 0 24px', lineHeight: 1.5 }}>
            Use your Opervo login to access the gear store.
          </p>

          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '11px 14px', fontSize: 15, border: '1px solid #2a2a2a', borderRadius: 10, background: '#0F0F0F', color: '#F7F5F2', marginBottom: 16, boxSizing: 'border-box', fontFamily: "'Barlow', sans-serif", outline: 'none' }}
            />
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{ width: '100%', padding: '11px 14px', fontSize: 15, border: '1px solid #2a2a2a', borderRadius: 10, background: '#0F0F0F', color: '#F7F5F2', marginBottom: 20, boxSizing: 'border-box', fontFamily: "'Barlow', sans-serif", outline: 'none' }}
            />
            {error && <p style={{ fontSize: 13, color: '#ef4444', margin: '0 0 16px', textAlign: 'center' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '13px', background: loading ? '#6B6B6B' : '#F5620F', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing in...' : 'Enter the store'}
            </button>
          </form>
        </div>

        <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 20 }}>
          Not an apprentice? <a href="/apprentice" style={{ color: '#F5620F', textDecoration: 'none' }}>Learn about the program</a>
        </p>
      </div>
    </div>
  )
}

/* ─── Progress Ring ─── */
function ProgressRing({ current, goal, size = 100 }: { current: number; goal: number; size?: number }) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(current / Math.max(goal, 1), 1)
  const offset = circumference * (1 - pct)

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#2a2a2a" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F5620F" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  )
}

/* ─── Stat Pill ─── */
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '14px 16px', flex: 1, minWidth: 0 }}>
      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', margin: 0, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 11, color: '#6B6B6B', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>{label}</p>
    </div>
  )
}

/* ─── Gear Card ─── */
function GearCard({ item, balance, inCart, onAdd, onRemove }: { item: GearItem; balance: number; inCart: number; onAdd: () => void; onRemove: () => void }) {
  const canAfford = balance >= item.credit_cost
  const costStr = formatCredits(item.credit_cost)

  return (
    <div style={{
      background: '#1a1a1a',
      border: inCart > 0 ? '2px solid #F5620F' : '1px solid #2a2a2a',
      borderRadius: 14,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image placeholder / image */}
      <div style={{
        height: 140,
        background: item.image_url ? `url(${item.image_url}) center/cover` : 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {!item.image_url && (
          <span style={{ fontSize: 32, opacity: 0.3 }}>
            {item.category === 'swag' ? '\u{1F3AF}' : item.category === 'gift cards' ? '\u{1F3C6}' : item.category === 'tools' ? '\u{1F527}' : '\u{26A1}'}
          </span>
        )}
        {/* Credit cost badge */}
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#F5620F',
          color: '#fff',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 13,
          padding: '4px 10px',
          borderRadius: 20,
        }}>
          {costStr} cr
        </div>
        {inCart > 0 && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: '#fff',
            color: '#0F0F0F',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 12,
            padding: '3px 9px',
            borderRadius: 20,
          }}>
            In cart
          </div>
        )}
      </div>

      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#F7F5F2', margin: '0 0 4px', textTransform: 'uppercase', lineHeight: 1.2 }}>
          {item.title}
        </p>
        <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5, margin: '0 0 14px', flex: 1 }}>
          {item.description}
        </p>

        {inCart > 0 ? (
          <button
            onClick={onRemove}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: '1px solid #F5620F',
              borderRadius: 10,
              color: '#F5620F',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={onAdd}
            disabled={!canAfford}
            style={{
              width: '100%',
              padding: '10px',
              background: canAfford ? '#F5620F' : '#2a2a2a',
              border: 'none',
              borderRadius: 10,
              color: canAfford ? '#fff' : '#6B6B6B',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: canAfford ? 'pointer' : 'not-allowed',
            }}
          >
            {canAfford ? 'Add to cart' : `Need ${costStr} cr`}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Cart Drawer ─── */
function CartDrawer({ cart, balance, onRemove, onCheckout, checking }: {
  cart: CartItem[]
  balance: number
  onRemove: (id: string) => void
  onCheckout: () => void
  checking: boolean
}) {
  const total = cart.reduce((s, c) => s + c.item.credit_cost * c.qty, 0)
  const canCheckout = total > 0 && total <= balance

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#1a1a1a',
      borderTop: '2px solid #F5620F',
      padding: '16px 20px',
      zIndex: 50,
      maxWidth: 680,
      margin: '0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cart.length > 0 ? 12 : 0 }}>
        <div>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F7F5F2', textTransform: 'uppercase', margin: 0 }}>
            Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})
          </p>
          <p style={{ fontSize: 12, color: '#6B6B6B', margin: '2px 0 0' }}>
            {formatCredits(total)} of {formatCredits(balance)} credits
          </p>
        </div>
        <button
          onClick={onCheckout}
          disabled={!canCheckout || checking}
          style={{
            padding: '10px 24px',
            background: canCheckout && !checking ? '#F5620F' : '#2a2a2a',
            border: 'none',
            borderRadius: 10,
            color: canCheckout && !checking ? '#fff' : '#6B6B6B',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            cursor: canCheckout && !checking ? 'pointer' : 'not-allowed',
          }}
        >
          {checking ? 'Submitting...' : 'Redeem'}
        </button>
      </div>
      {cart.map((c) => (
        <div key={c.item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
          <span style={{ fontSize: 13, color: '#F7F5F2' }}>{c.item.title}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{formatCredits(c.item.credit_cost)} cr</span>
            <button onClick={() => onRemove(c.item.id)} style={{ background: 'none', border: 'none', color: '#6B6B6B', fontSize: 16, cursor: 'pointer', padding: '0 4px' }}>&times;</button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Main Component ─── */
export default function CreditsClient() {
  const params = useSearchParams()
  const codeFromUrl = params.get('code') || ''
  const [code, setCode] = useState(codeFromUrl)
  const [data, setData] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(!!codeFromUrl)
  const [error, setError] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(!codeFromUrl)
  const [cart, setCart] = useState<CartItem[]>([])
  const [copied, setCopied] = useState(false)
  const [redeeming, setRedeeming] = useState(false)
  const [redeemSuccess, setRedeemSuccess] = useState(false)

  const fetchCredits = useCallback((c: string) => {
    setLoading(true)
    setError(null)
    fetch(`/api/apprentice-credits?code=${encodeURIComponent(c)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Referral code not found.' : 'Something went wrong.')
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (codeFromUrl) { fetchCredits(codeFromUrl); return }
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email) {
        const { data: codeRow } = await supabase
          .from('apprentice_referral_codes')
          .select('code')
          .eq('email', session.user.email.toLowerCase())
          .maybeSingle()
        if (codeRow) {
          setCode(codeRow.code)
          fetchCredits(codeRow.code)
          setCheckingSession(false)
          return
        }
      }
      setCheckingSession(false)
    })()
  }, [codeFromUrl, fetchCredits])

  const handleLogin = (loginCode: string) => {
    setCode(loginCode)
    setCheckingSession(false)
    fetchCredits(loginCode)
  }

  const addToCart = (item: GearItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id)
      if (existing) return prev
      return [...prev, { item, qty: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id))
  }

  const handleRedeem = async () => {
    if (!data || cart.length === 0) return
    const total = cart.reduce((s, c) => s + c.item.credit_cost * c.qty, 0)
    if (total > data.balance_cents) return

    setRedeeming(true)
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    if (!accessToken) { setRedeeming(false); return }

    try {
      // Server verifies the token, derives the apprentice from the session, and
      // recomputes the cost from gear_items. Only item ids + quantities matter.
      const res = await fetch('/api/apprentice-redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          items: cart.map((c) => ({ id: c.item.id, qty: c.qty })),
        }),
      })
      if (!res.ok) { setRedeeming(false); return }
    } catch {
      setRedeeming(false)
      return
    }

    setCart([])
    setRedeemSuccess(true)
    setRedeeming(false)
    fetchCredits(code)
  }

  if (!code && !checkingSession && !loading) {
    return <LoginForm onLogin={handleLogin} />
  }

  if (loading || checkingSession) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '3px solid #2a2a2a', borderTopColor: '#F5620F', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ fontFamily: "'Barlow', sans-serif", color: '#6B6B6B', fontSize: 14 }}>Loading your store...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '40px 32px', textAlign: 'center', maxWidth: 440 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#F7F5F2', textTransform: 'uppercase', marginBottom: 12 }}>Hmm.</p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: '#6B6B6B', lineHeight: 1.6 }}>{error || 'Could not load credits.'}</p>
          <a href="/apprentice" style={{ display: 'inline-block', marginTop: 16, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5620F', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Back to Apprentice</a>
        </div>
      </div>
    )
  }

  const balanceCredits = formatCredits(data.balance_cents)
  const nextTierCost = data.gear_items.length > 0
    ? data.gear_items.find((g) => g.credit_cost > data.balance_cents)?.credit_cost ?? data.gear_items[data.gear_items.length - 1].credit_cost
    : 1500
  const referralLink = `https://opervo.io/r/${code}`
  const cartTotal = cart.reduce((s, c) => s + c.item.credit_cost * c.qty, 0)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F0F', fontFamily: "'Barlow', sans-serif", paddingBottom: cart.length > 0 ? 120 : 0 }}>
      {/* Header */}
      <div style={{ background: '#0F0F0F', borderBottom: '1px solid #1a1a1a', padding: '16px 0', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2' }}>
              Opervo<span style={{ color: '#F5620F' }}>.</span>
            </span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.12)', padding: '3px 8px', borderRadius: 4 }}>
              Gear Store
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 20, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5620F' }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#F7F5F2' }}>{balanceCredits} cr</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 20px 40px' }}>
        {/* Dashboard */}
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Progress ring */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <ProgressRing current={data.balance_cents} goal={nextTierCost} size={90} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#F7F5F2', lineHeight: 1 }}>{balanceCredits}</span>
                <span style={{ fontSize: 9, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>credits</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#F7F5F2', textTransform: 'uppercase', margin: '0 0 2px', lineHeight: 1.2 }}>
                {data.business_name}
              </p>
              <p style={{ fontSize: 12, color: '#6B6B6B', margin: '0 0 12px' }}>
                {data.balance_cents === 0
                  ? 'Share your code to start earning'
                  : `${formatCredits(nextTierCost - data.balance_cents)} more to next reward`}
              </p>
              {/* Progress bar */}
              <div style={{ height: 6, background: '#2a2a2a', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#F5620F', borderRadius: 3, width: `${Math.min((data.balance_cents / nextTierCost) * 100, 100)}%`, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <StatPill value={String(data.referral_count)} label="Referrals" />
            <StatPill value={`${formatCredits(data.earned_cents)}`} label="Earned" />
            <StatPill value={`${formatCredits(data.redeemed_cents)}`} label="Redeemed" />
          </div>
        </div>

        {/* Referral code strip */}
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '14px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Your code</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#F5620F', margin: '2px 0 0', textTransform: 'uppercase' }}>{code}</p>
          </div>
          <button
            onClick={handleCopy}
            style={{ padding: '8px 16px', background: copied ? '#F7F5F2' : '#F5620F', color: copied ? '#0F0F0F' : '#fff', border: 'none', borderRadius: 8, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>

        {/* Redeem success banner */}
        {redeemSuccess && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 20, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, color: '#22c55e', textTransform: 'uppercase', margin: '0 0 4px' }}>Order submitted</p>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Max will reach out to get your gear shipped.</p>
          </div>
        )}

        {/* Gear Store Grid */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 4px' }}>
            Gear Store
          </p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#F7F5F2', textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 1.1 }}>
            Spend your credits
          </p>

          {data.gear_items.length === 0 ? (
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#F7F5F2', textTransform: 'uppercase', margin: '0 0 8px' }}>Coming soon</p>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Gear items are being added. Keep earning credits.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {data.gear_items.map((item) => (
                <GearCard
                  key={item.id}
                  item={item}
                  balance={data.balance_cents - cartTotal + (cart.find((c) => c.item.id === item.id) ? item.credit_cost : 0)}
                  inCart={cart.find((c) => c.item.id === item.id)?.qty || 0}
                  onAdd={() => addToCart(item)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Past orders */}
        {data.redemptions.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>Past orders</p>
            {data.redemptions.map((r) => (
              <div key={r.id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '14px 16px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#6B6B6B' }}>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: r.status === 'shipped' ? 'rgba(34,197,94,0.15)' : r.status === 'pending' ? 'rgba(245,98,15,0.15)' : 'rgba(107,107,107,0.15)',
                    color: r.status === 'shipped' ? '#22c55e' : r.status === 'pending' ? '#F5620F' : '#6B6B6B',
                  }}>{r.status}</span>
                </div>
                {r.items.map((ri: { id: string; title: string; credit_cost: number }, i: number) => (
                  <p key={i} style={{ fontSize: 13, color: '#F7F5F2', margin: '2px 0' }}>{ri.title}, {formatCredits(ri.credit_cost)} cr</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <p style={{ fontSize: 12, color: '#6B6B6B' }}>
            Questions? Email <a href="mailto:help@opervo.io" style={{ color: '#F5620F', textDecoration: 'none' }}>help@opervo.io</a>
          </p>
        </div>
      </div>

      {/* Cart drawer */}
      {cart.length > 0 && (
        <CartDrawer
          cart={cart}
          balance={data.balance_cents}
          onRemove={removeFromCart}
          onCheckout={handleRedeem}
          checking={redeeming}
        />
      )}
    </div>
  )
}
