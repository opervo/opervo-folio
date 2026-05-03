// Single source of truth for /cost-calculator and the homepage compact widget.
// Pricing verified May 2026 — re-check before paid ads.

export type Addon = {
  id: string
  label: string
  price: number
  opervoIncluded: boolean
}

export type TieredFeature = {
  id: string
  label: string
  tierId: string
  opervoIncluded: boolean
}

export type Tier = { id: string; name: string; price: number; includedUsers: number }

export type MarkateConfig = {
  type: 'addon'
  id: 'markate'
  name: string
  base: number
  baseLabel: string
  perUserFee: number
  addons: Addon[]
  note: string
}

export type TieredConfig = {
  type: 'tiered' | 'tiered_per_user'
  id: 'jobber' | 'housecall' | 'quoteiq'
  name: string
  tiers: Tier[]
  extraUserFee: number
  features: TieredFeature[]
  note: string
}

export type CompetitorConfig = MarkateConfig | TieredConfig
export type CompetitorId = 'markate' | 'jobber' | 'housecall' | 'quoteiq'

export const COMPETITORS: Record<CompetitorId, CompetitorConfig> = {
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
  quoteiq: {
    type: 'tiered',
    id: 'quoteiq',
    name: 'QuoteIQ',
    tiers: [
      { id: 'standard', name: 'Standard', price: 29.99, includedUsers: 1 },
      { id: 'elite', name: 'Elite', price: 299, includedUsers: 5 },
    ],
    extraUserFee: 20,
    features: [
      { id: 'invoicing', label: 'Invoicing & Estimates', tierId: 'standard', opervoIncluded: true },
      { id: 'portal', label: 'Customer Portal', tierId: 'standard', opervoIncluded: true },
      { id: 'booking', label: 'Online Booking', tierId: 'standard', opervoIncluded: true },
      { id: 'ai-basic', label: 'AI Assistant (credit-capped)', tierId: 'standard', opervoIncluded: true },
      { id: 'recurring', label: 'Recurring Service Plans', tierId: 'elite', opervoIncluded: true },
      { id: 'route', label: 'Route Optimization', tierId: 'elite', opervoIncluded: true },
      { id: 'ai-elite', label: 'Higher AI credits', tierId: 'elite', opervoIncluded: true },
    ],
    note: "QuoteIQ's AI is credit-capped per tier. Elite ($299/mo) unlocks route optimization and higher AI limits. Annual billing assumed.",
  },
}

export const OPERVO = {
  solo: { name: 'Solo', price: 24.99, users: 2 },
  team: { name: 'Team', price: 54.99, users: 10 },
}

export const COMPETITOR_TABS: Array<{ id: CompetitorId; label: string }> = [
  { id: 'markate', label: 'Markate' },
  { id: 'jobber', label: 'Jobber' },
  { id: 'housecall', label: 'Housecall Pro' },
  { id: 'quoteiq', label: 'QuoteIQ' },
]

export const TEAM_SIZES = [1, 2, 3, 5, 8, 10]

export const DEFAULTS: Record<CompetitorId, string[]> = {
  markate: ['portal', 'booking', 'lead', 'review', 'proposal'],
  jobber: ['portal', 'invoicing', 'booking', 'review', 'twoway'],
  housecall: ['invoicing', 'portal', 'booking', 'review', 'twoway'],
  quoteiq: ['invoicing', 'portal', 'booking', 'ai-basic', 'route'],
}

export type CostBreakdown = {
  total: number
  base: number
  addonsTotal: number
  userFee: number
  tier: Tier | null
  extraUsers: number
}

export function computeMarkate(c: MarkateConfig, selected: Set<string>, teamSize: number): CostBreakdown {
  const addonsTotal = c.addons.filter((a) => selected.has(a.id)).reduce((s, a) => s + a.price, 0)
  const userFee = Math.max(0, teamSize - 1) * c.perUserFee
  const total = c.base + addonsTotal + userFee
  return { total, base: c.base, addonsTotal, userFee, tier: null, extraUsers: Math.max(0, teamSize - 1) }
}

export function computeTiered(c: TieredConfig, selected: Set<string>, teamSize: number): CostBreakdown {
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

export function computeCost(c: CompetitorConfig, selected: Set<string>, teamSize: number): CostBreakdown {
  if (c.type === 'addon') return computeMarkate(c, selected, teamSize)
  return computeTiered(c, selected, teamSize)
}

export function pickOpervoPlan(teamSize: number) {
  return teamSize <= 2 ? OPERVO.solo : OPERVO.team
}
