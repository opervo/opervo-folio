import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Gutter Cleaning Business Software | Opervo',
  description: 'Software for solo gutter cleaning operators. Recurring spring and fall plans, route optimization, before and after photos, branded invoices. $24.99/mo.',
  alternates: { canonical: 'https://www.opervo.io/gutter-cleaning' },
  openGraph: {
    title: 'Gutter Cleaning Business Software | Opervo',
    description: 'Recurring spring and fall plans that rebook themselves, tight routes, before and after proof, and same-day invoices. $24.99/mo all-in.',
    url: 'https://www.opervo.io/gutter-cleaning',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'gutter-cleaning',
  trade: 'Gutter Cleaning',
  metaTitle: 'Gutter Cleaning Software',
  metaDescription: 'Run your gutter cleaning routes, recurring plans, and invoicing from your phone.',
  schemaName: 'Opervo for Gutter Cleaning',
  h1: 'Run your gutter cleaning routes from your phone.',
  heroSub: 'Spring and fall maintenance plans that rebook themselves. One-tap route optimization for a 6 to 12 stop day. Before and after photos that prove the work and sell the next plan. Branded invoices you can text before you leave the driveway.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> Helper included. No add-on fees. No payment markup.',
  heroImage: '/screenshots/hero-folio-2.jpg',
  heroImageHeight: 2211,
  heroImageAlt: 'Opervo folio page example with before and after photos and reviews',
  stats: [
    { stat: '$150-300', label: 'Typical residential gutter cleaning job value.' },
    { stat: '2x / year', label: 'The spring and fall maintenance cycle the trade runs on.' },
    { stat: '6-12', label: 'Stops on a typical route day, where tight routing wins back an hour.' },
  ],
  featuresHeading: 'What gutter cleaners actually need',
  featuresSub: 'The money is in dense routes and twice-a-year recurring plans. These features are built around that.',
  features: [
    { icon: 'repeat', title: 'Twice a year on autopilot', desc: 'Set spring and fall maintenance as a recurring e-signed agreement so the plan rebooks itself. The trade runs on repeat visits, so stop reselling them by hand.' },
    { icon: 'route', title: 'Tighter routes, more stops', desc: 'Optimize the order of your 6 to 12 daily stops so you are not driving back across town. Less windshield time means more gutters cleaned per day.' },
    { icon: 'camera', title: 'Before and after sells the plan', desc: 'Snap clogged-then-clear photos that auto-publish to your public Folio page. Customers who see the leaves you pulled sign the annual plan on the spot.' },
    { icon: 'ruler', title: 'Measure the roofline, price it', desc: 'Trace the roofline on the map to get linear footage and apply your per-foot rate instantly. Quote accurately without a tape measure on a ladder.' },
    { icon: 'message', title: 'Reminders that cut no-shows', desc: 'Automated texts confirm the visit so the gate is unlocked and the dog is in. Fewer wasted trips on a route where every stop counts.' },
    { icon: 'clipboard', title: 'Know your real margin', desc: 'Track cost against each $150 to $300 job so you see true profit, not just revenue. Price the next quote off real numbers, not guesses.' },
  ],
  mathHeading: 'Why gutter cleaners move from Jobber<br />and Markate',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no recurring e-sign agreements' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80-110/mo', sub: '$39.95 base plus $10/mo each for Portal, Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A fall leaf-season route on Opervo: 10 stops auto-routed, every customer texted automatically, every job photographed to your Folio, every spring and fall plan billing itself on schedule. No double-entry.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Before/after auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'On-map measurement', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Per-job cost tracking', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'What is the best app for running a gutter cleaning business solo?', a: 'You want one app that handles estimates, scheduling, route order, invoicing, and recurring maintenance plans without per-seat fees stacking up. Opervo Solo is $24.99/mo and includes a helper, so a one or two person crew is fully covered. It runs on iOS, Android, and the web, so you can quote and invoice from the driveway.' },
    { q: 'How do I turn one-time gutter jobs into recurring revenue?', a: 'The trade runs on twice-a-year cleanings, but most operators forget to resell them. Opervo lets you set a recurring, e-signed service agreement so spring and fall visits rebook automatically. You sell the plan once and the calendar fills itself.' },
    { q: 'Can I quote a gutter job without climbing up to measure?', a: 'Yes. Opervo on-map measurement lets you trace the roofline to get linear footage, then apply your per-foot rate to generate a quote in minutes. You can do it on site or before you ever leave the shop.' },
    { q: 'How do I prove the gutters actually needed cleaning?', a: 'Customers never see the clogged gutters themselves, so before and after photos do the selling. Opervo attaches them to the job and auto-publishes a clean set to your public Folio page, which doubles as proof of work and marketing for the next customer.' },
    { q: 'How do I get paid faster on gutter jobs?', a: 'On $150 to $300 jobs with thin margins, waiting on a check hurts. Opervo sends branded invoices you can text the moment you finish, and there is zero markup on payments, so you keep what you charge.' },
    { q: 'Does it handle the spring and fall rush?', a: 'Yes. Route optimization clusters your stops so a heavy fall leaf-season day stays tight, and automated text reminders cut no-shows when you have no spare time. Recurring agreements mean the peak weeks are already booked before they arrive.' },
    { q: 'Will it sync with my accounting?', a: 'Opervo has QuickBooks Online sync, so invoices and payments flow into your books without double entry. That matters most at year end when you are reconciling a busy fall season.' },
  ],
  finalCtaH2: 'Stop chasing rebookings.<br />Let the plan rebook itself.',
  relatedPosts: [
    { href: '/blog/crm-for-gutter-cleaning-businesses', title: 'CRM for Gutter Cleaning Businesses', blurb: 'How to stay organized and book more jobs.' },
    { href: '/blog/how-to-schedule-recurring-jobs', title: 'How to Schedule Recurring Jobs', blurb: 'Set up plans that auto-schedule and auto-invoice.' },
  ],
}

export default function GutterCleaning() {
  return <TradeLandingPage config={config} />
}
