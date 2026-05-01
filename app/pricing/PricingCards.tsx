'use client'

import { useState } from 'react'

const soloFeatures = [
  '2 users (operator + 1 helper)',
  'Unlimited clients',
  'Scheduling + Google Calendar sync',
  'Estimates & invoicing',
  'Client portal with magic links',
  'Portfolio page (opervo.io/p/your-name)',
  'Automated texts (confirmations, on-my-way, reviews)',
  'Recurring jobs',
  'CSV export',
  'Push notifications',
  'Lead management',
]

const teamFeatures = [
  'Up to 10 team members',
  'Everything in Solo, plus:',
  'Role-based permissions',
  'Assign jobs to crew members',
  'Team scheduling view',
  'All features included — no per-user fees',
]

const SOLO_MO = 24.99
const TEAM_MO = 54.99
const SOLO_YR = 249
const TEAM_YR = 549
const SOLO_SAVINGS = (SOLO_MO * 12 - SOLO_YR).toFixed(0)
const TEAM_SAVINGS = (TEAM_MO * 12 - TEAM_YR).toFixed(0)
const SOLO_YR_EQUIV = (SOLO_YR / 12).toFixed(2)
const TEAM_YR_EQUIV = (TEAM_YR / 12).toFixed(2)

export default function PricingCards() {
  const [interval, setInterval] = useState<'month' | 'year'>('month')

  const toggleBtn = (label: string, value: 'month' | 'year', extra?: React.ReactNode) => {
    const active = interval === value
    return (
      <button
        onClick={() => setInterval(value)}
        style={{
          flex: 1,
          height: 44,
          background: active ? '#fff' : 'transparent',
          color: active ? '#0F0F0F' : '#6B6B6B',
          border: 'none',
          borderRadius: 8,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'all 0.15s ease',
        }}
      >
        {label}
        {extra}
      </button>
    )
  }

  return (
    <>
      {/* Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 320,
          margin: '0 auto 32px',
          padding: 4,
          background: '#fff',
          border: '1px solid #E8E4DE',
          borderRadius: 12,
          gap: 4,
        }}
      >
        {toggleBtn('Monthly', 'month')}
        {toggleBtn(
          'Annual',
          'year',
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              padding: '3px 7px',
              borderRadius: 999,
              background: interval === 'year' ? '#F5620F' : 'rgba(245,98,15,0.15)',
              color: interval === 'year' ? '#fff' : '#F5620F',
              letterSpacing: '0.06em',
            }}
          >
            SAVE 17%
          </span>,
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* SOLO */}
        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '36px 28px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Solo</p>
          <div style={{ marginBottom: 8 }}>
            {interval === 'month' ? (
              <>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>${SOLO_MO}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/mo</span>
              </>
            ) : (
              <>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>${SOLO_YR}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/yr</span>
              </>
            )}
          </div>
          <p style={{ fontSize: 13, color: interval === 'year' ? '#F5620F' : '#6B6B6B', marginBottom: 24, fontWeight: interval === 'year' ? 600 : 400 }}>
            {interval === 'year'
              ? `Just $${SOLO_YR_EQUIV}/mo · save $${SOLO_SAVINGS} vs monthly`
              : 'Full feature access · 2 users'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {soloFeatures.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: '#F5620F', fontWeight: 700, fontSize: 14, lineHeight: '20px' }}>✓</span>
                <span style={{ fontSize: 14, color: '#1a1a1a', lineHeight: '20px' }}>{f}</span>
              </div>
            ))}
          </div>
          <a
            href="https://app.opervo.io"
            style={{
              display: 'block',
              textAlign: 'center',
              background: '#F5620F',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: '14px',
              borderRadius: 6,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Start Free Trial
          </a>
          <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 8 }}>30 days free. No credit card.</p>
        </div>

        {/* TEAM */}
        <div style={{ background: '#fff', border: '2px solid #F5620F', borderRadius: 12, padding: '36px 28px', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#F5620F',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Most Popular
          </span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Team</p>
          <div style={{ marginBottom: 8 }}>
            {interval === 'month' ? (
              <>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>${TEAM_MO}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/mo</span>
              </>
            ) : (
              <>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: '#0F0F0F' }}>${TEAM_YR}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/yr</span>
              </>
            )}
          </div>
          <p style={{ fontSize: 13, color: interval === 'year' ? '#F5620F' : '#6B6B6B', marginBottom: 24, fontWeight: interval === 'year' ? 600 : 400 }}>
            {interval === 'year'
              ? `Just $${TEAM_YR_EQUIV}/mo · save $${TEAM_SAVINGS} vs monthly`
              : 'Full feature access · No per-user fees'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {teamFeatures.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: '#F5620F', fontWeight: 700, fontSize: 14, lineHeight: '20px' }}>✓</span>
                <span style={{ fontSize: 14, color: '#1a1a1a', lineHeight: '20px', fontWeight: f.startsWith('Everything') ? 600 : 400 }}>{f}</span>
              </div>
            ))}
          </div>
          <a
            href="https://app.opervo.io"
            style={{
              display: 'block',
              textAlign: 'center',
              background: '#F5620F',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: '14px',
              borderRadius: 6,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Start Free Trial
          </a>
          <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 8 }}>30 days free. No credit card.</p>
        </div>
      </div>
    </>
  )
}
