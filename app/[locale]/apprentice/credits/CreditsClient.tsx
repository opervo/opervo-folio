'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type LedgerEntry = {
  type: 'earn' | 'redeem'
  amount_cents: number
  description: string | null
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
}

const GEAR_TIERS = [
  { credits: 1500, label: '$15', title: 'Sticker pack + business cards', description: 'Branded Opervo stickers and a set of professional NFC business cards for your service business.' },
  { credits: 3000, label: '$30', title: "Lowe's / Home Depot gift card", description: 'Put it toward supplies, tools, or whatever your business needs next.' },
  { credits: 4500, label: '$45', title: 'Pro squeegee kit or tool upgrade', description: 'Professional-grade squeegee set, extension pole, or equivalent tool for your trade.' },
  { credits: 7500, label: '$75', title: 'Pressure washer gear', description: 'Entry-level pressure washer, surface cleaner attachment, or equivalent big-ticket tool.' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDollars(cents: number) {
  return `$${(cents / 100).toFixed(0)}`
}

export default function CreditsClient() {
  const params = useSearchParams()
  const code = params.get('code') || ''
  const [data, setData] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!code) {
      setError('No referral code provided. Check the link from your application confirmation.')
      setLoading(false)
      return
    }
    fetch(`/api/apprentice-credits?code=${encodeURIComponent(code)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Referral code not found.' : 'Something went wrong.')
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [code])

  const referralLink = `https://opervo.io/r/${code}`

  function handleCopy() {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleShare() {
    if (typeof navigator.share !== 'function') return
    navigator.share({
      title: 'Try Opervo',
      text: 'I use Opervo to run my service business. Sign up with my link and I earn gear credits.',
      url: referralLink,
    }).catch(() => {})
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", color: '#6B6B6B', fontSize: 16 }}>Loading your credits...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: '100vh', background: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '40px 32px', textAlign: 'center', maxWidth: 440 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 12 }}>
            Hmm.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: '#1a1a1a', lineHeight: 1.6 }}>
            {error || 'Could not load credits.'}
          </p>
          <a href="/apprentice" style={{ display: 'inline-block', marginTop: 16, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5620F', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Back to Apprentice
          </a>
        </div>
      </div>
    )
  }

  const balanceDollars = formatDollars(data.balance_cents)

  return (
    <div style={{ minHeight: '100vh', background: '#F7F5F2', fontFamily: "'Barlow', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#0F0F0F', padding: '24px 0' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 20px' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2' }}>
              Opervo<span style={{ color: '#F5620F' }}>.</span>
            </span>
          </a>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9CA3AF' }}>Apprentice Gear Credits</p>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 20px 60px' }}>
        {/* Balance card */}
        <div style={{
          background: '#fff',
          border: '1px solid #E8E4DE',
          borderRadius: 12,
          padding: '28px 24px',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4, fontFamily: "'Barlow Condensed', sans-serif" }}>
            {data.business_name}
          </p>
          <p style={{ fontSize: 56, fontWeight: 900, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1, marginBottom: 4 }}>
            {balanceDollars}
          </p>
          <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 0 }}>
            gear credits available
          </p>
          {data.referral_count > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, paddingTop: 16, borderTop: '1px solid #E8E4DE' }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>{data.referral_count}</p>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>referral{data.referral_count !== 1 ? 's' : ''} earned</p>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>{formatDollars(data.earned_cents)}</p>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>total earned</p>
              </div>
              {data.redeemed_cents > 0 && (
                <div>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>{formatDollars(data.redeemed_cents)}</p>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>redeemed</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Referral link */}
        <div style={{
          background: '#fff',
          border: '1px solid #E8E4DE',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" }}>
            Your referral link
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#F7F5F2',
            border: '1px solid #E8E4DE',
            borderRadius: 8,
            padding: '10px 12px',
            marginBottom: 10,
          }}>
            <span style={{
              flex: 1,
              fontSize: 14,
              color: '#0F0F0F',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {referralLink}
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? '#0F0F0F' : '#F5620F',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Barlow Condensed', sans-serif",
                textTransform: 'uppercase',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
              }}
            >
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleShare}
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid #E8E4DE',
                borderRadius: 6,
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Barlow Condensed', sans-serif",
                textTransform: 'uppercase',
                color: '#0F0F0F',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              SHARE
            </button>
          </div>
          <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12, marginBottom: 0 }}>
            When someone signs up with your link and pays for 2 months, you earn $15 in gear credits.
          </p>
        </div>

        {/* Gear store */}
        <div style={{
          background: '#fff',
          border: '1px solid #E8E4DE',
          borderRadius: 12,
          padding: '24px',
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4, fontFamily: "'Barlow Condensed', sans-serif" }}>
            GEAR STORE
          </p>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#0F0F0F', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 20, lineHeight: 1.15 }}>
            WHAT YOUR CREDITS UNLOCK
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GEAR_TIERS.map((tier) => {
              const canRedeem = data.balance_cents >= tier.credits
              return (
                <div key={tier.credits} style={{
                  background: '#F7F5F2',
                  borderRadius: 10,
                  padding: '18px 20px',
                  border: canRedeem ? '2px solid #F5620F' : '1px solid #E8E4DE',
                  opacity: canRedeem ? 1 : 0.7,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#F5620F', fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {tier.label}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 700, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {tier.title}
                      </p>
                    </div>
                    {canRedeem && (
                      <a
                        href={`mailto:help@opervo.io?subject=Gear%20Credit%20Redemption%20%E2%80%94%20${encodeURIComponent(data.business_name)}&body=Hi%20Max%2C%0A%0AI%E2%80%99d%20like%20to%20redeem%20my%20gear%20credits%20for%3A%20${encodeURIComponent(tier.title)}%0A%0AReferral%20code%3A%20${code}%0ABusiness%3A%20${encodeURIComponent(data.business_name)}%0A%0AThanks!`}
                        style={{
                          background: '#F5620F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        REDEEM
                      </a>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>
                    {tier.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity log */}
        {data.ledger.length > 0 && (
          <div style={{
            background: '#fff',
            border: '1px solid #E8E4DE',
            borderRadius: 12,
            padding: '24px',
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
              ACTIVITY
            </p>
            {data.ledger.map((entry, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: i > 0 ? '1px solid #E8E4DE' : 'none',
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0F0F0F' }}>
                    {entry.description || (entry.type === 'earn' ? 'Referral credit' : 'Redemption')}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6B6B6B' }}>{formatDate(entry.date)}</p>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 900,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: entry.type === 'earn' ? '#16a34a' : '#0F0F0F',
                }}>
                  {entry.type === 'earn' ? '+' : '-'}{formatDollars(Math.abs(entry.amount_cents))}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {data.ledger.length === 0 && (
          <div style={{
            background: '#fff',
            border: '1px solid #E8E4DE',
            borderRadius: 12,
            padding: '28px 24px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#0F0F0F', fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase', marginBottom: 8 }}>
              NO CREDITS YET
            </p>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
              Share your referral link above. When someone signs up and sticks around for 2 paid months, you'll see $15 appear here.
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 12, color: '#9CA3AF' }}>
            Questions? Email <a href="mailto:help@opervo.io" style={{ color: '#6B6B6B' }}>help@opervo.io</a>
          </p>
        </div>
      </div>
    </div>
  )
}
