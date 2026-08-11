import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Christmas & Holiday Light Installation Software | Opervo',
  description: 'Software for holiday and Christmas light installers. Roofline quoting, season-long scheduling, automatic rebooks of last year clients, e-signed bids. $24.99/mo.',
  alternates: { canonical: 'https://www.opervo.io/holiday-lighting' },
  openGraph: {
    title: 'Christmas & Holiday Light Installation Software | Opervo',
    description: 'Win the street before rivals, bid rooflines from the map, run the whole install-to-takedown cycle, and get big bids signed fast. $24.99/mo.',
    url: 'https://www.opervo.io/holiday-lighting',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'holiday-lighting',
  trade: 'Holiday Lighting',
  metaTitle: 'Holiday Light Installation Software',
  metaDescription: 'Quote, schedule, rebook, and invoice Christmas and holiday light installs from your phone.',
  schemaName: 'Opervo for Holiday Light Installation',
  h1: 'Run your holiday light season from your phone.',
  heroSub: 'Rebook last year clients before a competitor knocks. Bid rooflines from the map for exact linear footage. Keep install, maintenance, and takedown on one schedule. Close $1,200 bids e-signed from the customer phone, all inside a 60 to 70 day window.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> Helper included. No add-on fees. No payment markup.',
  heroImage: '/screenshots/hero-service-plans.jpg',
  heroImageHeight: 2652,
  heroImageAlt: 'Opervo recurring service plan and schedule example on a phone',
  stats: [
    { stat: '$1,200+', label: 'Average professional holiday light installation.' },
    { stat: '60-70', label: 'Working days that hold most of the season revenue.' },
    { stat: '$2.50-7', label: 'Common price per linear foot for installation.' },
  ],
  featuresHeading: 'What light installers actually need',
  featuresSub: 'A year of revenue lands in 60 to 70 days, and returning customers are the whole model. These features are built around that.',
  features: [
    { icon: 'repeat', title: 'Win the street before rivals', desc: 'Returning customers are the whole game. Recurring agreements and automated early-fall texts rebook last year clients before a competitor knocks, locking in the neighborhood cluster.' },
    { icon: 'ruler', title: 'Measure the roofline, bid it', desc: 'Trace the roofline on the map for exact linear footage, then apply your per-foot rate. Send a clean bid in minutes instead of guessing from the ground.' },
    { icon: 'clipboard', title: 'One calendar for the whole cycle', desc: 'Install, mid-season fixes, takedown, and storage are all tracked per customer on one schedule. Nothing falls through in a 60 to 70 day sprint.' },
    { icon: 'route', title: 'Cluster the block', desc: 'Route optimization groups installs and takedowns by neighborhood so your short season stays dense and profitable. Less driving, more homes lit per day.' },
    { icon: 'camera', title: 'Display photos that sell next year', desc: 'Capture every finished display and auto-publish it to your Folio page. Last year glowing rooflines become the portfolio that books next year street.' },
    { icon: 'check-circle', title: 'Get the big bid signed fast', desc: 'E-signed estimates and branded invoices close $1,200 jobs from the customer phone, with zero payment markup. Move quickly while the booking window is open.' },
  ],
  mathHeading: 'Why light installers move from Jobber<br />and spreadsheets',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no recurring e-sign agreements' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80-110/mo', sub: '$39.95 base plus $10/mo each for Portal, Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'One Opervo season: last year customers rebooked by text in early fall, every roofline bid from the map, installs and takedowns clustered by block, every display published to your Folio, every $1,200 bid signed and paid with zero markup.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'On-map roofline measurement', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Recurring rebook agreements', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Route optimization (one tap)', opervo: '✓', jobber: 'Add-on', housecall: '✗', gorilla: '✓', markate: '✗' },
    { feature: 'Before/after auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'E-signed estimates', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '✓' },
    { feature: 'Auto-text rebook campaigns', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'What is the best software for a Christmas light installation business?', a: 'You need fast roofline quoting, season-long scheduling across install and takedown, and a system to rebook last year clients. Opervo handles all of it from $24.99/mo on the Solo plan with a helper included, on iOS, Android, and web. It is priced for seasonal operators, not enterprise crews.' },
    { q: 'How do I quote a light install without measuring every roofline by hand?', a: 'Opervo on-map measurement lets you trace the roofline for exact linear footage, then apply your per-foot rate to produce a bid in minutes. You can quote remotely or on site, which matters when you are bidding dozens of homes in a few weeks.' },
    { q: 'How do I get last year customers to rebook?', a: 'Returning clients are the backbone of this trade, and whoever reaches them first in early fall wins the street. Opervo recurring agreements plus automated texts let you reach every prior customer at once, so the rebook happens before a competitor shows up.' },
    { q: 'Can one app track install, maintenance, and takedown for each customer?', a: 'Yes. The full cycle is install in fall, fixes during the season, and takedown from late December into January, often with storage. Opervo keeps all those touch points on one schedule per customer so nothing gets missed in the rush.' },
    { q: 'The season is only a couple of months. Is a monthly subscription worth it?', a: 'At $24.99/mo, even paying year-round is a small fraction of one $1,200 install. Most operators keep it active in the off-season to send rebook reminders, build next year routes, and manage any other trade they run. There is no setup fee and no payment markup eating into your tickets.' },
    { q: 'How do I make a short season profitable?', a: 'Density is everything. Opervo route optimization clusters installs and takedowns by neighborhood so you light more homes per day with less driving. In a 60 to 70 day window, tighter routes are the difference between a good season and a great one.' },
    { q: 'How do I get paid for these jobs, and is there a fee on payments?', a: 'Opervo sends a branded, e-signed estimate and invoice the customer can approve and pay from their phone, with zero markup on payments. On $1,000-plus jobs that no-markup policy keeps real money in your pocket.' },
  ],
  finalCtaH2: 'Win the street.<br />Light it up.',
  relatedPosts: [
    { href: '/blog/crm-for-holiday-lighting-businesses', title: 'CRM for Holiday Lighting Businesses', blurb: 'Handle seasonal leads, installs, and repeat clients more smoothly.' },
    { href: '/blog/how-to-schedule-recurring-jobs', title: 'How to Schedule Recurring Jobs', blurb: 'Set up rebooks that schedule themselves.' },
  ],
}

export default function HolidayLighting() {
  return <TradeLandingPage config={config} />
}
