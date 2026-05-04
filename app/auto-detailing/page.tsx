import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Auto Detailing Software — Packages, Before/After Folio, Mobile Routes | Opervo',
  description: 'For mobile detailers and bay shops. Branded packages (Bronze/Silver/Gold), before/after auto-publish to your folio, route optimization for mobile detailing, product cost on every detail. $24.99/mo. 14-day free trial.',
  alternates: { canonical: 'https://www.opervo.io/auto-detailing' },
  openGraph: {
    title: 'Auto Detailing Software — Opervo',
    description: 'Packages, before/after gallery, mobile route optimization, product cost on every detail. $24.99/mo all-in.',
    url: 'https://www.opervo.io/auto-detailing',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'auto-detailing',
  trade: 'Auto Detailing',
  metaTitle: 'Auto Detailing Software',
  metaDescription: 'For mobile detailers and bay shops.',
  schemaName: 'Opervo for Auto Detailing',
  h1: 'For mobile detailers and bay shops.',
  heroSub: 'Branded Bronze/Silver/Gold packages. Before/after photos that auto-publish to your folio. Route optimization for mobile detailers. Wax, sealant, soap, and water cost on every detail.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> No add-on fees. No payment markup. Cancel any time.',
  heroImage: '/screenshots/hero-folio-1.jpg',
  heroImageAlt: 'Opervo folio for an auto detailing operator showing services and before/after photos',
  stats: [
    { stat: '3-5', label: 'Typical mobile detailer daily appointments. Routing matters.' },
    { stat: '$200-450', label: 'Average detail package price range. Packages drive your AOV.' },
    { stat: '$1,128', label: 'Yearly savings vs Jobber Connect — same features, no upsells.' },
  ],
  featuresHeading: 'What detailers actually need',
  featuresSub: 'Packages, before/after proof, and routes for the mobile guys. Plus the cost of all those products you actually use.',
  features: [
    { icon: '🚗', title: 'Package-driven estimates', desc: 'Build Bronze / Silver / Gold packages with services, products, and pricing baked in. One-tap quote on the spot. Convert to a job in another tap. No re-typing line items every time.' },
    { icon: '📸', title: 'Before/after auto-publish', desc: 'Snap before/after on every detail — they auto-publish to your folio at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery up to 20 photos. The transformation IS the marketing.' },
    { icon: '🗺️', title: 'Route My Day for mobile detailers', desc: 'Hit the button: we geolocate you, geocode today\'s appointments, order them shortest-path, show miles and ETA. Opens Google Maps as a multi-leg trip. Saves 30+ min on a 4-stop mobile day.' },
    { icon: '🧴', title: 'Product cost per detail', desc: 'Track wax, sealant, soap, water, brushes, microfibers as you use them. Revenue − Supplies = Profit, live on every detail. Find out which packages actually pay you well.' },
    { icon: '🔁', title: 'Recurring detail subscriptions', desc: 'Build monthly maintenance plans for fleet accounts and exotic-car clients. Client e-signs once via magic link. Jobs auto-generate, auto-bill. Vacation pause + auto-resume baked in.' },
    { icon: '💬', title: 'Client texts that close the loop', desc: 'On my way → photos delivered → invoice sent → "Pay now" → tip → Google review request. All automated. Your clients think you have a back office. You don\'t.' },
  ],
  mathHeading: 'Why detailers move from Jobber<br />and Markate',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no product tracking' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80–110/mo', sub: '$39.95 base + $10/mo each for Customer Portal, Online Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A mobile detail day on Opervo: 4 stops auto-routed, every detail photographed to your folio, every product cost logged, every client texted automatically. Zero spreadsheets.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Package-driven estimates', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: 'Proposal Kit +$10/mo' },
    { feature: 'Before/after auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Product / supplies tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Recurring detail subscriptions (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Online booking / quote form', opervo: '✓ Included', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'Can I build Bronze / Silver / Gold detail packages in Opervo?', a: 'Yes. Build named packages with the products and services baked in. One-tap quote on the spot. Convert to a job in another tap. Edit packages globally and the next quote uses the new structure — no re-typing line items every time you book.' },
    { q: 'Where do my before/after detail photos go?', a: 'They auto-publish to your portfolio at opervo.io/p/your-slug. Drag-and-drop reorder, before/after slider, gallery up to 20 photos. Up to 10 service areas per folio. Embeddable quote widget so you can drop the form on your existing site or Instagram bio.' },
    { q: 'Does Opervo work for mobile detailers running 3-5 stops a day?', a: 'Yes — Route My Day is built for this. Tap once: geolocate, geocode every appointment, order shortest-path, show miles and ETA. Opens Google Maps as a multi-leg trip with all stops as waypoints. Saves 30+ min on a typical mobile day.' },
    { q: 'Can I track wax, sealant, soap, water, and microfibers per detail?', a: 'Yes. Build a catalog of supplies in your own units (oz of sealant, lb of compound, gallons of water, microfiber count) and log usage per job. Unit costs are snapshotted at logging time. Every detail shows live profit math: Revenue − Supplies = Profit.' },
    { q: 'How does Opervo compare to Jobber, Housecall Pro, or Markate for auto detailing?', a: 'Jobber Connect is $119/mo and SMS is an add-on. Housecall Pro is $79/mo and they take 2.59% + $0.10 on every payment. Markate starts at $39.95 but Customer Portal, Online Booking, Lead Form, Reviews, and Proposal Kit are each $10/mo add-ons — a realistic Markate stack runs $80–110/mo. Opervo Solo is $24.99/mo all-in. None of those competitors auto-publish before/after photos or track product cost per detail.' },
    { q: 'Does Opervo handle bay-shop scheduling and walk-in customers?', a: 'Yes. Build appointment-style scheduling for bay shops, walk-in clients via Folio quote widget, fleet account management with recurring monthly plans. Same app handles both mobile and bay-shop modes.' },
    { q: 'Can I switch from Jobber, Housecall Pro, or Markate?', a: 'Take 10 minutes. CSV import handles Jobber, Housecall Pro, ServiceTitan, QuickBooks, and Google Contacts with auto-column mapping and duplicate detection. Run your 14-day Opervo trial in parallel with your current tool — no credit card required.' },
  ],
  finalCtaH2: 'Stop juggling apps.<br />Start detailing.',
}

export default function AutoDetailing() {
  return <TradeLandingPage config={config} />
}
