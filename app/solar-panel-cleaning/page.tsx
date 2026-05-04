import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Solar Panel Cleaning Software — Annual Agreements, Routes, Before/After Folio | Opervo',
  description: 'Built for solar panel cleaners — residential and commercial. Annual and biannual cleaning agreements that auto-bill, route days for 4-6 residential stops, before/after panel photos that auto-publish to your folio. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://www.opervo.io/solar-panel-cleaning' },
  openGraph: {
    title: 'Solar Panel Cleaning Software — Opervo',
    description: 'Annual & biannual agreements, route optimization, before/after panel photos to your folio. $24.99/mo all-in.',
    url: 'https://www.opervo.io/solar-panel-cleaning',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'solar-panel-cleaning',
  trade: 'Solar Panel Cleaning',
  metaTitle: 'Solar Panel Cleaning Software',
  metaDescription: 'Built for solar panel cleaners — residential and commercial.',
  schemaName: 'Opervo for Solar Panel Cleaning',
  h1: 'Built for solar panel cleaners — residential and commercial.',
  heroSub: 'Annual and biannual cleaning agreements that auto-bill. Route days that pack 4-6 residential stops. Before/after panel photos that auto-publish to your folio. Water, soap, and fuel cost on every job.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.',
  heroImage: '/screenshots/hero-folio-2.jpg',
  heroImageAlt: 'Opervo folio for a solar panel cleaning operator showing services and before/after photos',
  stats: [
    { stat: '2x/year', label: 'Most efficient cleaning frequency to maintain panel output (industry guidance).' },
    { stat: '4-6', label: 'Typical residential solar panel cleaning stops per route day.' },
    { stat: '$1,128', label: 'Yearly savings vs Jobber Connect — same features, no upsells.' },
  ],
  featuresHeading: 'What solar cleaners actually need',
  featuresSub: 'Recurring agreements drive your revenue. Visual proof drives your bookings. These features are built around that.',
  features: [
    { icon: '☀️', title: 'Annual & biannual agreements that auto-bill', desc: 'Build a 6-month or annual cleaning plan. Client e-signs the agreement once via magic link. Jobs auto-generate 30 days out, auto-bill on completion. Auto-pause for the rainy season; auto-resume when it ends.' },
    { icon: '🗺️', title: 'Route My Day for residential routes', desc: 'Tap once: geolocate, geocode 4-6 residential stops, order them shortest-path, show miles + ETA. Opens Google Maps as a multi-leg trip with all stops as waypoints.' },
    { icon: '📸', title: 'Before/after panel photos auto-publish', desc: 'Snap before/after on the array — they auto-publish to your folio at opervo.io/p/your-slug. Drag-and-drop reorder, gallery up to 20 photos. Solar cleaning is visual; the dirty/clean panel shot IS the sale.' },
    { icon: '💧', title: 'Water, soap, fuel cost per job', desc: 'Track DI water, panel-safe soap, fuel as you use them. Revenue − Supplies = Profit, live on every job. Auto-deducted as a tax expense at year-end.' },
    { icon: '📐', title: 'Sketch arrays, auto-price commercial sites', desc: 'Drop points around a commercial array on a Google Maps satellite view. Square footage and perimeter compute live. Auto-prices the estimate at your $/sq ft rate. Right-angle snap keeps shapes clean.' },
    { icon: '💬', title: 'Client texts + commercial property manager email', desc: 'Residential: on-my-way → photos → invoice → tip → review, all automated. Commercial: branded job reports go straight to property managers via magic link. Looks like you have a back office.' },
  ],
  mathHeading: 'Why solar cleaners move from Jobber<br />and Markate',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no supplies tracking' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80–110/mo', sub: '$39.95 base + $10/mo each for Customer Portal, Online Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A solar cleaning route on Opervo: every annual agreement billing itself, every panel photographed to your folio, every property manager getting a branded report by magic link. Zero double-entry.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Annual / biannual e-signed agreements', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Before/after panel auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Water / soap / fuel tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Sketch arrays, auto-price by sq ft', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'Can I run annual or biannual cleaning agreements in Opervo?', a: 'Yes. Build a Service Plan at any cadence — monthly, quarterly, biannual, annual, or custom. Send the client a magic-link agreement they e-sign once. Jobs auto-generate 30 days out, land on your Schedule with a "Plan" badge, and auto-bill on completion. Pause for rainy season; auto-resume when it ends.' },
    { q: 'Does Opervo handle commercial solar accounts?', a: 'Yes. The Measurement Tool lets you sketch commercial arrays on a Google Maps satellite view and auto-price by square foot. Branded job reports go to property managers via magic link. Folio includes up to 10 service areas + an embeddable quote widget for commercial lead capture on your existing site.' },
    { q: 'Where do my before/after panel photos go?', a: 'They auto-publish to your portfolio at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery up to 20 photos. Up to 10 service areas per folio. Embeddable quote widget so you can drop the form on your existing site or social bio.' },
    { q: 'Can I track water, soap, and fuel cost per job?', a: 'Yes. Build a catalog of supplies in your own units (gallons of DI water, ounces of panel-safe soap, gallons of fuel) and log usage per job. Unit costs are snapshotted at logging time. Every job shows live profit math: Revenue − Supplies = Profit.' },
    { q: 'How does Opervo compare to Jobber, Housecall Pro, or Markate for solar cleaning?', a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Markate starts at $39.95 but Customer Portal, Online Booking, Lead Form, Reviews, and Proposals are each separate $10/mo add-ons — a realistic Markate stack runs $80–110/mo. Opervo Solo is $24.99/mo all-in. None of those competitors auto-publish before/after panel photos or track DI water cost.' },
    { q: 'Can I switch from Jobber, Housecall Pro, or Markate?', a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. Run your 14-day Opervo trial in parallel with your current tool — no credit card required.' },
    { q: 'Does it work on iPhone?', a: 'Yes — Opervo is on the App Store, and the same login works on Android (via PWA install) and any browser. Updates push to your phone within 24 hours.' },
  ],
  finalCtaH2: 'Stop juggling apps.<br />Start cleaning panels.',
}

export default function SolarPanelCleaning() {
  return <TradeLandingPage config={config} />
}
