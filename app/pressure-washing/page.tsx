import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Pressure Washing Software — Track Chem Cost, Auto-Publish Before/After, Route Your Day | Opervo',
  description: 'Built for solo pressure washers. Track SH/surfactant cost per job, sketch and price driveways on Google Maps, auto-publish before/after photos to your folio, optimize your route in one tap. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://www.opervo.io/pressure-washing' },
  openGraph: {
    title: 'Pressure Washing Software — Opervo',
    description: 'Track chem cost, sketch driveways, auto-publish before/after photos, optimize routes. $24.99/mo. Built for the operator on the rig.',
    url: 'https://www.opervo.io/pressure-washing',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'pressure-washing',
  trade: 'Pressure Washing',
  metaTitle: 'Pressure Washing Software',
  metaDescription: 'Built for solo pressure washers.',
  schemaName: 'Opervo for Pressure Washing',
  h1: 'Built for the ones still on the rig.',
  heroSub: 'Track chem cost on every job. Sketch driveways and auto-price by square foot. Auto-publish before/after photos to your portfolio. Optimize your route in one tap.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.',
  heroImage: '/screenshots/hero-folio-1.jpg',
  heroImageAlt: 'Opervo folio for a pressure washing operator showing before/after photos and services',
  stats: [
    { stat: '~$60', label: 'Average chem + fuel cost on a 1-hr commercial wash. Most operators don\'t track it.' },
    { stat: '40 min', label: 'Average daily time saved by route optimization on a 6-stop day.' },
    { stat: '$1,128', label: 'Yearly savings vs Jobber Connect — all features included, no upsells.' },
  ],
  featuresHeading: 'What pressure washers actually need',
  featuresSub: 'Generic field-service tools were built for plumbers and HVAC. These are the things that move the needle on a wash day.',
  features: [
    { icon: '💧', title: 'Profit on every wash', desc: 'Log SH, surfactant, and fuel as you use them. Every job shows Revenue − Supplies = Profit, live. That $400 driveway you "made $300 on"? Now you know if it actually paid.' },
    { icon: '📸', title: 'Before/after auto-publish', desc: 'Snap before and after photos on the job. They auto-publish to your folio at opervo.io/p/your-slug. The transformation IS the sale — and Instagram doesn\'t even need to be open.' },
    { icon: '📐', title: 'Sketch a driveway in 30 seconds', desc: 'Drop points around the concrete on the satellite map. Square footage and perimeter compute live as you draw. Auto-prices the estimate at your $/sq ft rate. Right-angle snap keeps shapes clean.' },
    { icon: '🗺️', title: 'Route My Day, one tap', desc: 'Hit the button: we geolocate you, geocode today\'s stops, order them shortest-path, show miles and ETA. "Start Route" opens Google Maps as a multi-leg trip. Saves 40+ min on a 6-stop day.' },
    { icon: '🔁', title: 'Recurring house washes that auto-bill', desc: 'Build a quarterly house wash plan, send a magic-link agreement, client e-signs. Jobs auto-generate 30 days out. Going on vacation? Pause it. Comes back the day they\'re back. No renewal calls.' },
    { icon: '💬', title: 'Client texts that close the loop', desc: 'On my way → photos delivered → invoice sent → "Pay now" → tip prompt → Google review request. All automated. Your client thinks you have a back office. You don\'t.' },
  ],
  mathHeading: 'Why operators move from Jobber<br />and Housecall Pro',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no chem tracking' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every payment you take' },
    { name: 'Markate (real stack)', price: '$80–110/mo', sub: '$39.95 base + $10/mo each for Customer Portal, Online Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A 6-stop wash day on Opervo: every chem cost logged, every photo on your folio, every client texted automatically, route saved 40 minutes. Zero spreadsheets. Zero double-entry.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Chem & supplies tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Before/after auto-publish to portfolio', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Sketch & price by square foot', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'Does Opervo track SH, surfactant, and fuel cost per pressure washing job?', a: 'Yes. Build a catalog of what you actually use — gallons of SH, ounces of surfactant, gallons of fuel — and log usage per job in seconds. Unit costs are snapshotted at the moment of logging so historical jobs don\'t change when you re-buy at a different price. Every job shows live profit math: Revenue − Supplies = Profit (green if positive, red if negative).' },
    { q: 'Can I sketch a driveway and auto-price an estimate by square footage?', a: 'Yes. The Measurement Tool lets you drop points around the concrete on a Google Maps satellite view. Square footage and perimeter compute live. Right-angle snap keeps shapes clean. Set a $/sq ft rate per service and the area pushes straight into the estimate line item — no calculator.' },
    { q: 'Where do my before-and-after photos go?', a: 'They auto-publish to your portfolio page at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery grid up to 20 photos. Up to 10 service areas per folio. Embeddable quote widget so you can drop the form on your existing site or social bio.' },
    { q: 'How does Opervo compare to Jobber, Housecall Pro, or Markate for pressure washing?', a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Markate starts at $39.95 but Customer Portal, Online Booking, Lead Form, Reviews, and Proposals are each separate $10/mo add-ons — a realistic Markate stack runs $80–110/mo. Opervo Solo is $24.99/mo all-in, zero markup on payments. None of those competitors track chemical cost per job, sketch driveways, or auto-publish a portfolio page.' },
    { q: 'Does it work on iPhone? Is there an app?', a: 'Yes — Opervo is on the App Store, and the same login works on Android (via PWA install) and any browser. Updates push to your phone automatically — no waiting on App Store review when we ship a fix.' },
    { q: 'Is there really no credit card required for the trial?', a: 'Correct. 14 days, full feature access, no card. If you don\'t subscribe, your data is held for 30 days so you can come back anytime.' },
    { q: 'I\'m on Jobber/Housecall Pro/Markate now. How hard is the switch?', a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. You\'re live by lunch.' },
  ],
  finalCtaH2: 'Stop juggling apps.<br />Start running washes.',
}

export default function PressureWashing() {
  return <TradeLandingPage config={config} />
}
