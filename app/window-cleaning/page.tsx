import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Window Cleaning Software — Routes, Recurring Agreements, Folio | Opervo',
  description: 'Run your window cleaning routes from your phone. Recurring monthly/quarterly agreements that auto-bill, before/after photos that auto-publish to your folio, route optimization for 12+ daily stops. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://www.opervo.io/window-cleaning' },
  openGraph: {
    title: 'Window Cleaning Software — Opervo',
    description: 'Recurring routes, e-signed agreements, before/after photos to your folio, one-tap route optimization. $24.99/mo all-in.',
    url: 'https://www.opervo.io/window-cleaning',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'window-cleaning',
  trade: 'Window Cleaning',
  metaTitle: 'Window Cleaning Software',
  metaDescription: 'Run your window cleaning routes from your phone.',
  schemaName: 'Opervo for Window Cleaning',
  h1: 'Run your window cleaning routes from your phone.',
  heroSub: 'Recurring monthly and quarterly agreements that auto-bill. One-tap route optimization for 12+ daily stops. Before/after photos that auto-publish to your folio. Soap, blades, and fuel cost on every job.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.',
  heroImage: '/screenshots/hero-folio-3.jpg',
  heroImageAlt: 'Opervo folio for a window cleaning operator with services and review count',
  stats: [
    { stat: '70%', label: 'Average share of window cleaning revenue from recurring customers (industry avg).' },
    { stat: '12+', label: 'Typical stops on a residential window cleaning route day.' },
    { stat: '$1,128', label: 'Yearly savings vs Jobber Connect — same features, no upsells.' },
  ],
  featuresHeading: 'What window cleaners actually need',
  featuresSub: 'You make money on routes, recurring customers, and clean handoffs. These features are built around that loop.',
  features: [
    { icon: '🔁', title: 'Auto-recurring monthly & quarterly routes', desc: 'Build a residential quarterly or storefront monthly plan. Client e-signs the agreement once. Jobs auto-generate 30 days out, auto-bill on completion. Vacation pause + auto-resume baked in.' },
    { icon: '🗺️', title: 'Route My Day for 12+ stops', desc: 'One tap: geolocate, geocode every stop, order by shortest path, total miles + ETA. Opens Google Maps as a multi-leg trip. Saves 40+ min on a typical route day.' },
    { icon: '📸', title: 'Before/after auto-publish', desc: 'Snap before/after on the job — they auto-publish to your folio at opervo.io/p/your-slug. Drag-and-drop reorder, gallery up to 20 photos. The transformation IS the marketing.' },
    { icon: '💧', title: 'Profit on every clean', desc: 'Track soap, squeegee blades, mops, fuel per job. Revenue − Supplies = Profit, live on every job. Find out which storefronts and resi accounts actually pay you well.' },
    { icon: '📐', title: 'Sketch a building, count panes', desc: 'Drop points on a Google Maps satellite view to measure facades and floors. Auto-price by square foot or pane count. Right-angle snap keeps shapes clean.' },
    { icon: '💬', title: 'Client texts that close the loop', desc: 'On my way → photos delivered → invoice sent → "Pay now" → tip → Google review. All automated. Your residential customers think you have an office. You don\'t.' },
  ],
  mathHeading: 'Why window cleaners move from Jobber<br />and Markate',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no chem tracking' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80–110/mo', sub: '$39.95 base + $10/mo each for Customer Portal, Online Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A residential route day on Opervo: 12 stops auto-routed, every customer texted automatically, every wash photographed to your folio, every recurring agreement billing itself on schedule. Zero double-entry.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Before/after auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Soap & supplies tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'Can I run recurring monthly and quarterly window cleaning routes in Opervo?', a: 'Yes. Build a Service Plan (weekly, biweekly, monthly, quarterly, or custom). Send the client a magic-link agreement they e-sign once. Jobs auto-generate 30 days out, land on your Schedule with a "Plan" badge, and auto-bill on completion. Pause for client vacation; comes back the day they\'re back.' },
    { q: 'Does Opervo optimize my route for a 12-stop day?', a: 'Yes. On the Schedule page, tap Route My Day: we geolocate you, geocode every stop, order them shortest-path using nearest-neighbor TSP, and show total miles + ETA. Tap "Start Route" to launch Google Maps as a multi-leg trip with all stops as waypoints.' },
    { q: 'Where do my before/after window cleaning photos go?', a: 'They auto-publish to your portfolio at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery up to 20 photos. Up to 10 service areas per folio. Embeddable quote widget so you can drop the form on your existing site or Instagram bio link.' },
    { q: 'How does Opervo compare to Jobber, Housecall Pro, or Markate for window cleaning?', a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Markate starts at $39.95 but Customer Portal, Online Booking, Lead Form, Reviews, and Proposals are each separate $10/mo add-ons — a realistic Markate stack is $80–110/mo. Opervo Solo is $24.99/mo all-in, zero payment markup. None of those competitors auto-publish before/after photos to a public folio or track soap/blade cost per job.' },
    { q: 'Does Opervo work for storefront / commercial window cleaning routes?', a: 'Yes. Build storefront monthly plans, route days that pack 15+ commercial stops, recurring auto-billing, and a portfolio page that signals legitimacy to commercial property managers. Service Plan agreements e-signed via magic link work the same for commercial as resi.' },
    { q: 'Can I switch from Jobber, Housecall Pro, or Markate?', a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. Run your 14-day Opervo trial in parallel with your current tool — no credit card required.' },
    { q: 'Does it work on iPhone?', a: 'Yes — Opervo is on the App Store, and the same login works on Android (via PWA install) and any browser. Updates push to your phone within 24 hours. No App Store delays when we ship a fix.' },
  ],
  finalCtaH2: 'Stop juggling apps.<br />Start running routes.',
}

export default function WindowCleaning() {
  return <TradeLandingPage config={config} />
}
