'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

// ────────────────────────────────────────────────────────────────────
// Pricing data — reconciled with /pricing, /compare/*, homepage table.
// "Verified May 2026" — re-check before paid ads.
// ────────────────────────────────────────────────────────────────────

type Addon = {
  id: string
  label: string
  price: number
  opervoIncluded: boolean
}

type TieredFeature = {
  id: string
  label: string
  tierId: string // tier required to unlock
  opervoIncluded: boolean
}

type Tier = { id: string; name: string; price: number; includedUsers: number }

type MarkateConfig = {
  type: 'addon'
  id: 'markate'
  name: string
  base: number
  baseLabel: string
  perUserFee: number
  addons: Addon[]
  note: string
}
type TieredConfig = {
  type: 'tiered' | 'tiered_per_user'
  id: 'jobber' | 'housecall'
  name: string
  tiers: Tier[]
  extraUserFee: number
  features: TieredFeature[]
  note: string
}
type CompetitorConfig = MarkateConfig | TieredConfig

const COMPETITORS: Record<'markate' | 'jobber' | 'housecall', CompetitorConfig> = {
  markate: {
    type: 'addon',
    id: 'markate',
    name: 'Markate',
    base: 39.95,
    baseLabel: 'Markate base plan',
    perUserFee: 5,
    addons: [
      { id: 'portal', label: 'Customer Portal', price: 10, opervoIncluded: true },
      { id: 'booking', label: 'Online Booking', price: 10, opervoIncluded: true },
      { id: 'lead', label: 'Lead Contact Form', price: 10, opervoIncluded: true },
      { id: 'review', label: 'Ask for Review', price: 10, opervoIncluded: true },
      { id: 'proposal', label: 'Proposal Kit', price: 10, opervoIncluded: true },
      { id: 'vn', label: 'Virtual SMS Number', price: 10, opervoIncluded: true },
      { id: 'companycam', label: 'CompanyCam (photo docs)', price: 10, opervoIncluded: true },
      { id: 'callfwd', label: 'Call Forwarding', price: 10, opervoIncluded: false },
      { id: 'byovn', label: 'Bring Your Own Number', price: 10, opervoIncluded: false },
      { id: 'video', label: 'Virtual Video Estimate', price: 10, opervoIncluded: false },
      { id: 'nicejob', label: 'NiceJob (review autopilot)', price: 10, opervoIncluded: false },
      { id: 'responsibid', label: 'ResponsiBid', price: 10, opervoIncluded: false },
      { id: 'zapier', label: 'Zapier', price: 10, opervoIncluded: false },
    ],
    note: 'Markate base plan is $39.95/mo for the first user. Add-ons stack on top at $10/mo each. Each operator past the first is $5/mo.',
  },
  jobber: {
    type: 'tiered',
    id: 'jobber',
    name: 'Jobber',
    tiers: [
      { id: 'core', name: 'Core', price: 39, includedUsers: 1 },
      { id: 'connect', name: 'Connect', price: 119, includedUsers: 5 },
      { id: 'grow', name: 'Grow', price: 249, includedUsers: 15 },
    ],
    extraUserFee: 29,
    features: [
      { id: 'portal', label: 'Customer Portal', tierId: 'core', opervoIncluded: true },
      { id: 'invoicing', label: 'Invoicing & Estimates', tierId: 'core', opervoIncluded: true },
      { id: 'booking', label: 'Online Booking', tierId: 'connect', opervoIncluded: true },
      { id: 'review', label: 'Automated Review Requests', tierId: 'connect', opervoIncluded: true },
      { id: 'twoway', label: 'Two-way Text Messaging', tierId: 'connect', opervoIncluded: true },
      { id: 'reminders', label: 'Automated Appointment Reminders', tierId: 'connect', opervoIncluded: true },
      { id: 'route', label: 'Route Optimization', tierId: 'connect', opervoIncluded: true },
      { id: 'quotes', label: 'Quote Follow-ups', tierId: 'grow', opervoIncluded: true },
      { id: 'autopay', label: 'Automatic Payments', tierId: 'grow', opervoIncluded: true },
    ],
    note: "Jobber's tiers gate features. The lowest tier covering all selected features is auto-applied. Annual billing assumed.",
  },
  housecall: {
    type: 'tiered_per_user',
    id: 'housecall',
    name: 'Housecall Pro',
    tiers: [
      { id: 'basic', name: 'Basic', price: 65, includedUsers: 1 },
      { id: 'essentials', name: 'Essentials', price: 169, includedUsers: 5 },
    ],
    extraUserFee: 35,
    features: [
      { id: 'invoicing', label: 'Invoicing & Estimates', tierId: 'basic', opervoIncluded: true },
      { id: 'portal', label: 'Customer Portal', tierId: 'basic', opervoIncluded: true },
      { id: 'booking', label: 'Online Booking', tierId: 'basic', opervoIncluded: true },
      { id: 'review', label: 'Review Generation', tierId: 'essentials', opervoIncluded: true },
      { id: 'twoway', label: 'Two-way Text & Chat', tierId: 'essentials', opervoIncluded: true },
      { id: 'route', label: 'Route Optimization', tierId: 'essentials', opervoIncluded: true },
      { id: 'recurring', label: 'Recurring Service Plans', tierId: 'essentials', opervoIncluded: true },
    ],
    note: "Housecall Pro's pricing scales per user — every user pays the tier rate. Annual billing assumed.",
  },
}

const OPERVO = {
  solo: { name: 'Solo', price: 24.99, users: 2 },
  team: { name: 'Team', price: 54.99, users: 10 },
}

// ────────────────────────────────────────────────────────────────────

const $ = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const $f = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function computeMarkate(c: MarkateConfig, selected: Set<string>, teamSize: number) {
  const addonsTotal = c.addons.filter((a) => selected.has(a.id)).reduce((s, a) => s + a.price, 0)
  const userFee = Math.max(0, teamSize - 1) * c.perUserFee
  const total = c.base + addonsTotal + userFee
  return { total, base: c.base, addonsTotal, userFee, tier: null as Tier | null, extraUsers: Math.max(0, teamSize - 1) }
}

function computeTiered(c: TieredConfig, selected: Set<string>, teamSize: number) {
  // Determine required tier from selected features
  let highestIdx = 0
  for (const f of c.features) {
    if (selected.has(f.id)) {
      const idx = c.tiers.findIndex((t) => t.id === f.tierId)
      if (idx > highestIdx) highestIdx = idx
    }
  }
  const tier = c.tiers[highestIdx]
  let total = 0
  let userFee = 0
  if (c.type === 'tiered_per_user') {
    total = tier.price * teamSize
    userFee = tier.price * Math.max(0, teamSize - 1)
  } else {
    const extraUsers = Math.max(0, teamSize - tier.includedUsers)
    userFee = extraUsers * c.extraUserFee
    total = tier.price + userFee
  }
  return { total, base: tier.price, addonsTotal: 0, userFee, tier, extraUsers: Math.max(0, teamSize - tier.includedUsers) }
}

const COMPETITOR_TABS: Array<{ id: 'markate' | 'jobber' | 'housecall'; label: string }> = [
  { id: 'markate', label: 'Markate' },
  { id: 'jobber', label: 'Jobber' },
  { id: 'housecall', label: 'Housecall Pro' },
]

const TEAM_SIZES = [1, 2, 3, 5, 8, 10]

// Default selected features per competitor — what most operators actually need
const DEFAULTS: Record<string, string[]> = {
  markate: ['portal', 'booking', 'lead', 'review', 'proposal'],
  jobber: ['portal', 'invoicing', 'booking', 'review', 'twoway'],
  housecall: ['invoicing', 'portal', 'booking', 'review', 'twoway'],
}

export default function CostCalculatorPage() {
  const [competitorId, setCompetitorId] = useState<'markate' | 'jobber' | 'housecall'>('markate')
  const [teamSize, setTeamSize] = useState(2)
  const [selected, setSelected] = useState<Record<string, Set<string>>>({
    markate: new Set(DEFAULTS.markate),
    jobber: new Set(DEFAULTS.jobber),
    housecall: new Set(DEFAULTS.housecall),
  })

  const c = COMPETITORS[competitorId]
  const sel = selected[competitorId]

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev[competitorId])
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { ...prev, [competitorId]: next }
    })
  }

  const cost = useMemo(() => {
    if (c.type === 'addon') return computeMarkate(c, sel, teamSize)
    return computeTiered(c, sel, teamSize)
  }, [c, sel, teamSize])

  const opervoPlan = teamSize <= 2 ? OPERVO.solo : OPERVO.team
  const monthlyDiff = cost.total - opervoPlan.price
  const yearlyDiff = monthlyDiff * 12
  const fiveYearDiff = yearlyDiff * 5

  // List of items to render in the feature column
  const featureItems = c.type === 'addon' ? c.addons : c.features

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Opervo True Cost Calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://opervo.io/cost-calculator',
        description: 'Interactive cost calculator comparing Opervo to Markate, Jobber, and Housecall Pro. See your real monthly, yearly, and 5-year cost based on the features you actually need.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />

      <SiteNav />

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 24px' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          The Real Math · Free tool
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.0, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 18 }}>
          See what you&rsquo;d <em style={{ fontStyle: 'italic', color: '#F5620F' }}>actually</em> pay<span style={{ color: '#F5620F' }}>.</span>
        </h1>
        <p style={{ fontSize: 17, color: '#3a3a3a', maxWidth: 680, lineHeight: 1.55, marginBottom: 12, fontWeight: 500 }}>
          Most field-service software hides the real cost behind add-ons, tier upgrades, and per-user fees. Pick what you need — we&rsquo;ll do the math.
        </p>
      </section>

      {/* CONTROLS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {COMPETITOR_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setCompetitorId(t.id)}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '11px 20px',
                background: competitorId === t.id ? '#0F0F0F' : '#fff',
                color: competitorId === t.id ? '#F7F5F2' : '#6B6B6B',
                border: `1px solid ${competitorId === t.id ? '#0F0F0F' : '#E8E4DE'}`,
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              vs {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>How many people on your team?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {TEAM_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => setTeamSize(n)}
                style={{
                  width: 40,
                  height: 40,
                  border: `1px solid ${teamSize === n ? '#F5620F' : '#E8E4DE'}`,
                  background: teamSize === n ? '#F5620F' : '#F7F5F2',
                  color: teamSize === n ? '#fff' : '#6B6B6B',
                  borderRadius: 8,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: teamSize === n ? '0 4px 12px rgba(245,98,15,0.25)' : 'none',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px' }}>
        <div className="cost-grid" style={{ display: 'grid', gap: 20 }}>
          {/* LEFT — feature checklist */}
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 16, padding: 24 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 14 }}>
              {c.type === 'addon' ? 'Pick the add-ons you need' : 'Pick the features you need'}
            </p>
            {c.type === 'tiered' || c.type === 'tiered_per_user' ? (
              <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 12, lineHeight: 1.5 }}>
                Selecting a feature auto-upgrades you to the lowest tier that includes it.
              </p>
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {featureItems.map((item) => {
                const isSelected = sel.has(item.id)
                const tieredItem = c.type !== 'addon' ? (item as TieredFeature) : null
                const tier = tieredItem ? c.tiers.find((t) => t.id === tieredItem.tierId) : null
                const addonItem = c.type === 'addon' ? (item as Addon) : null
                return (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '11px 14px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.12s ease',
                      border: '1px solid transparent',
                      background: isSelected ? 'rgba(245,98,15,0.06)' : 'transparent',
                      borderColor: isSelected ? 'rgba(245,98,15,0.25)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggle(item.id)}
                        style={{ width: 18, height: 18, accentColor: '#F5620F', flexShrink: 0, cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>{item.label}</span>
                      {item.opervoIncluded && (
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                          Opervo includes
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: '#6B6B6B', whiteSpace: 'nowrap', marginLeft: 8 }}>
                      {addonItem ? `+$${addonItem.price}/mo` : tier ? tier.name : ''}
                    </div>
                  </label>
                )
              })}
            </div>
            <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 16, lineHeight: 1.55, fontStyle: 'italic' }}>
              {c.note}
            </p>
          </div>

          {/* RIGHT — live comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Competitor card */}
            <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: '#0F0F0F' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 500 }}>Your monthly cost</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#6B6B6B' }}>$</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 64, fontWeight: 900, color: '#0F0F0F', lineHeight: 1, letterSpacing: '-1px' }}>
                  {Math.round(cost.total).toLocaleString('en-US')}
                </span>
                <span style={{ fontSize: 16, color: '#6B6B6B', fontWeight: 500 }}>/mo</span>
              </div>
              <div style={{ paddingTop: 14, borderTop: '1px solid #E8E4DE', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#6B6B6B' }}>
                {c.type === 'addon' ? (
                  <>
                    <Row label="Markate base plan" value={$f(cost.base)} />
                    {cost.addonsTotal > 0 && <Row label={`Add-ons (${sel.size} selected)`} value={`+$${cost.addonsTotal}`} />}
                    {cost.userFee > 0 && <Row label={`${cost.extraUsers} extra ${cost.extraUsers === 1 ? 'user' : 'users'}`} value={`+$${cost.userFee}`} />}
                  </>
                ) : (
                  <>
                    <Row label={`${c.name} ${cost.tier!.name} tier`} value={c.type === 'tiered_per_user' ? `${$f(cost.tier!.price)} × ${teamSize} users` : $f(cost.tier!.price)} />
                    {cost.userFee > 0 && c.type === 'tiered' && <Row label={`${cost.extraUsers} extra ${cost.extraUsers === 1 ? 'user' : 'users'}`} value={`+$${cost.userFee}`} />}
                  </>
                )}
              </div>
            </div>

            {/* VS divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#E8E4DE' }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: '#6B6B6B' }}>VS</div>
              <div style={{ flex: 1, height: 1, background: '#E8E4DE' }} />
            </div>

            {/* Opervo card */}
            <div style={{ background: '#0F0F0F', borderRadius: 16, padding: 24, color: '#F7F5F2', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,98,15,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: '#F7F5F2', letterSpacing: '-0.5px' }}>
                    Opervo<span style={{ color: '#F5620F' }}>.</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(247,245,242,0.6)', fontWeight: 500 }}>{opervoPlan.name} plan · flat</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: 'rgba(247,245,242,0.6)' }}>$</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 64, fontWeight: 900, color: '#F7F5F2', lineHeight: 1, letterSpacing: '-1px' }}>{Math.floor(opervoPlan.price)}</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F7F5F2' }}>.{((opervoPlan.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                  <span style={{ fontSize: 16, color: 'rgba(247,245,242,0.6)', fontWeight: 500, marginLeft: 4 }}>/mo</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(247,245,242,0.8)', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(247,245,242,0.1)', lineHeight: 1.55 }}>
                  Up to {opervoPlan.users} users · all features included · 0% payment markup · Founding 50: $15/mo for life
                </p>
              </div>
            </div>

            {/* Savings */}
            {monthlyDiff > 0 && (
              <div style={{ background: 'linear-gradient(135deg, #F5620F 0%, #d94e08 100%)', borderRadius: 16, padding: 22, color: '#fff', boxShadow: '0 8px 24px rgba(245,98,15,0.25)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.9, marginBottom: 12 }}>You&rsquo;d save</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <SavingsBlock value={$(monthlyDiff)} unit="/month" />
                  <SavingsBlock value={$(yearlyDiff)} unit="/year" />
                  <SavingsBlock value={`${(fiveYearDiff / 1000).toFixed(1)}k`} prefix="$" unit="over 5 years" />
                </div>
              </div>
            )}

            <a href="https://app.opervo.io" style={{ display: 'block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, padding: '15px 24px', borderRadius: 8, textAlign: 'center', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 6px 20px rgba(245,98,15,0.25)' }}>
              Start your 14-day trial →
            </a>
            <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', margin: 0 }}>
              No card required · Cancel anytime · <Link href="/#founding-50" style={{ color: '#F5620F', textDecoration: 'none' }}>Founding 50 still open</Link>
            </p>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 32, lineHeight: 1.6, maxWidth: 800, fontStyle: 'italic' }}>
          Pricing pulled from public competitor pages, verified May 2026. Annual-billing rates shown where each vendor offers them.
          Opervo &ldquo;includes&rdquo; flag is conservative — features Opervo doesn&rsquo;t natively replicate (Bring Your Own Number, Call Forwarding, Virtual Video Estimate, NiceJob, ResponsiBid, Zapier integrations) are not counted toward your savings.
        </p>

        {/* Cross-link to other tools */}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          <Link href="/profit-calculator" style={{ display: 'block', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '18px 20px', textDecoration: 'none' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>More free tools</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>Job Profit Calculator</p>
            <p style={{ fontSize: 13, color: '#6B6B6B' }}>Did that last job actually pay? Run the numbers →</p>
          </Link>
          <Link href="/multi-job-tracker" style={{ display: 'block', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '18px 20px', textDecoration: 'none' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Track over time</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>Multi-Job Profit Tracker</p>
            <p style={{ fontSize: 13, color: '#6B6B6B' }}>Log 5+ jobs, find which work actually pays best →</p>
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* Responsive grid */}
      <style>{`
        @media (min-width: 880px) {
          .cost-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function SavingsBlock({ value, unit, prefix }: { value: string; unit: string; prefix?: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 900, lineHeight: 1, whiteSpace: 'nowrap' }}>
        {prefix}{value}
      </div>
      <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4, fontWeight: 500 }}>{unit}</div>
    </div>
  )
}
