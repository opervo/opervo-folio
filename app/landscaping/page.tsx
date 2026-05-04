import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Landscaping Software — Mow-Day Routes, Maintenance Agreements, Mulch Cost | Opervo',
  description: 'The app for solo landscapers and small crews. Mow-day route optimization for 25+ stops, e-signed maintenance agreements that auto-bill, mulch and fuel cost on every job. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://www.opervo.io/landscaping' },
  openGraph: {
    title: 'Landscaping Software — Opervo',
    description: 'Mow-day route optimization, e-signed maintenance agreements, supplies cost on every job. Built for crews who\'d rather mow than do paperwork.',
    url: 'https://www.opervo.io/landscaping',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'landscaping',
  trade: 'Landscaping',
  metaTitle: 'Landscaping Software',
  metaDescription: 'The app for solo landscapers and small crews.',
  schemaName: 'Opervo for Landscaping',
  h1: 'The app for solo landscapers and small crews.',
  heroSub: 'Mow-day route optimization for 25+ stops. E-signed maintenance agreements that auto-bill weekly or biweekly. Mulch, fuel, and fertilizer cost on every job. Built for crews who\'d rather mow than do paperwork.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.',
  heroImage: '/screenshots/hero-route.png',
  heroImageAlt: 'Opervo Route My Day showing optimized landscaping mow-day route on Google Maps',
  stats: [
    { stat: '25+', label: 'Typical stops on a mow day for a single solo landscaper or small crew.' },
    { stat: '60%', label: 'Average share of landscaping revenue from maintenance contracts (industry avg).' },
    { stat: '40 min', label: 'Daily time saved by route optimization on a 6-stop+ mow day.' },
  ],
  featuresHeading: 'What landscapers actually need',
  featuresSub: 'You make money on routes and recurring maintenance. Generic field-service tools weren\'t built for that.',
  features: [
    { icon: '🚜', title: 'Mow-day route optimization, one tap', desc: 'Hit the button: we geolocate you, geocode 25 stops, order them shortest-path, show miles and ETA. Opens Google Maps as a multi-leg trip. Saves 40+ min on a typical mow day.' },
    { icon: '📝', title: 'Recurring maintenance agreements', desc: 'Build a weekly mow plan, biweekly hedge trim, monthly fertilizer. Client e-signs the agreement once. Jobs auto-generate 30 days out and auto-bill. Vacation pause + auto-resume.' },
    { icon: '🌱', title: 'Mulch, fuel, fertilizer cost per job', desc: 'Log yards of mulch, gallons of fuel, pounds of fertilizer as you use them. Revenue − Supplies = Profit, live on every job. Auto-deducted as a tax expense.' },
    { icon: '📐', title: 'Sketch a lawn, auto-price the bid', desc: 'Drop points around the property on a Google Maps satellite view. Square footage and perimeter compute live. Auto-prices the estimate at your $/sq ft rate.' },
    { icon: '📸', title: 'Property photos auto-publish to your folio', desc: 'Snap before/after on every property — they auto-publish to your folio at opervo.io/p/your-slug. Drag-and-drop reorder, gallery up to 20 photos. Built-in quote form for new leads.' },
    { icon: '💬', title: 'Client texts that close the loop', desc: 'On my way → photos delivered → invoice sent → "Pay now" → tip → Google review. All automated. Property owners think you have a back office. You don\'t.' },
  ],
  mathHeading: 'Why landscapers move from Jobber<br />and Markate',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no supplies tracking' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80–110/mo', sub: '$39.95 base + $10/mo each for Customer Portal, Online Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A mow day on Opervo: 25 stops auto-routed, every property texted automatically, every yard photographed to your folio, every weekly agreement billing itself. Zero spreadsheets. Zero double-entry.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Mulch / fuel / fertilizer tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Sketch & auto-price by sq ft', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'Does Opervo optimize my mow-day route?', a: 'Yes. On the Schedule page, tap Route My Day: we geolocate you, geocode every stop, order them shortest-path, and show total miles + ETA. Tap "Start Route" to launch Google Maps as a multi-leg trip with all stops as waypoints. Saves 40+ minutes on a typical mow day.' },
    { q: 'Can clients sign weekly or biweekly mow agreements electronically?', a: 'Yes. Build a Service Plan (weekly, biweekly, monthly, quarterly, or custom). Send the client a magic-link agreement they e-sign once. Jobs auto-generate 30 days out, auto-bill on completion. Vacation pause + auto-resume baked in.' },
    { q: 'Can I track mulch, fuel, and fertilizer cost per job?', a: 'Yes. Build a catalog of supplies in your own units (yards of mulch, gallons of fuel, pounds of fertilizer) and log usage per job in seconds. Unit costs are snapshotted at the moment of logging so historical jobs don\'t change when you re-buy at a different price. Every job shows live profit math: Revenue − Supplies = Profit.' },
    { q: 'How does Opervo compare to Jobber, Housecall Pro, or Markate for landscaping?', a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Markate starts at $39.95 but Customer Portal, Online Booking, Lead Form, Reviews, and Proposals are each separate $10/mo add-ons — a realistic Markate stack is $80–110/mo. Opervo Solo is $24.99/mo all-in. None of those competitors track mulch/fuel/fertilizer cost per job or auto-publish a portfolio page.' },
    { q: 'Does Opervo handle commercial landscaping accounts?', a: 'Yes. Build commercial maintenance plans with weekly or biweekly cadence, route days that pack multi-property stops, recurring auto-billing, and a portfolio page that signals legitimacy to commercial property managers. The Folio quote widget can be embedded on your existing site for B2B lead capture.' },
    { q: 'Can I switch from Jobber, Housecall Pro, or Markate?', a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. Run your 14-day Opervo trial in parallel with your current tool — no credit card required.' },
    { q: 'Does it work on iPhone?', a: 'Yes — Opervo is on the App Store, and the same login works on Android (via PWA install) and any browser. Updates push to your phone within 24 hours.' },
  ],
  finalCtaH2: 'Stop juggling apps.<br />Start mowing.',
}

export default function Landscaping() {
  return <TradeLandingPage config={config} />
}
