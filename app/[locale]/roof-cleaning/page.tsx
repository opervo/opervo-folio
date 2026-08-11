import type { Metadata } from 'next'
import TradeLandingPage, { type TradePageConfig } from '@/components/TradeLandingPage'

export const metadata: Metadata = {
  title: 'Roof Cleaning & Soft Wash Business Software | Opervo',
  description: 'Software for soft wash roof cleaning operators. Fast per-square-foot quotes, before and after proof, recurring rebooks, branded invoices. $24.99/mo all-in.',
  alternates: { canonical: 'https://www.opervo.io/roof-cleaning' },
  openGraph: {
    title: 'Roof Cleaning & Soft Wash Business Software | Opervo',
    description: 'Custom-quote every roof, capture the streak-to-spotless shot, rebook on the right cycle, and get the big ticket signed. $24.99/mo.',
    url: 'https://www.opervo.io/roof-cleaning',
    type: 'website',
  },
}

const config: TradePageConfig = {
  slug: 'roof-cleaning',
  trade: 'Roof Cleaning',
  metaTitle: 'Roof Cleaning Software',
  metaDescription: 'Quote, schedule, document, and invoice soft wash roof cleaning jobs from your phone.',
  schemaName: 'Opervo for Roof Cleaning',
  h1: 'Run your soft wash roof cleaning from your phone.',
  heroSub: 'Custom-quote every roof by tracing it on the map. Capture the streak-to-spotless shot that sells the next job. Rebook on the right one to three year cycle automatically. Get $700 to $2,500 tickets e-signed and paid from the customer’s phone.',
  heroSubExtra: 'All in one app. <strong style="color:#0F0F0F">$24.99/mo, all features included.</strong> Helper included. No add-on fees. No payment markup.',
  heroImage: '/screenshots/hero-folio-1.jpg',
  heroImageHeight: 2195,
  heroImageAlt: 'Opervo folio page example with a before and after slider and reviews',
  stats: [
    { stat: '$0.30-0.75', label: 'Typical price per square foot on a soft wash roof.' },
    { stat: '1-3 yrs', label: 'How often a roof gets recleaned, the recurring cycle to never lose.' },
    { stat: 'Mar-Nov', label: 'The warm-season window soft wash operators work.' },
  ],
  featuresHeading: 'What soft wash operators actually need',
  featuresSub: 'Every roof is a custom quote and a dramatic before and after. These features are built around that.',
  features: [
    { icon: 'ruler', title: 'Custom quote every roof', desc: 'Trace the roof on the map for square footage, then apply your per-square-foot rate and adjust for pitch and staining. Send an accurate estimate before you ever set up the truck.' },
    { icon: 'camera', title: 'The streak-to-spotless shot', desc: 'Soft wash gives the most dramatic before and after in the trade. Opervo auto-publishes those shots to your Folio page, turning every job into your next sales pitch.' },
    { icon: 'repeat', title: 'Rebook on the right cycle', desc: 'Roofs get recleaned every one to three years, easy for both sides to forget. Recurring agreements schedule the next clean automatically so you do not lose the customer to a competitor.' },
    { icon: 'clipboard', title: 'Bundle roof and gutters', desc: 'Quote roof cleaning, gutters, and house wash on one estimate to lift the ticket and cut a second trip. One visit, more revenue, less drive time.' },
    { icon: 'check-circle', title: 'Get the big ticket signed', desc: 'E-signed estimates and branded invoices make a $2,000 job feel buttoned-up. Customers approve from their phone and pay with zero added markup.' },
    { icon: 'droplet', title: 'Documented proof for warranty', desc: 'Same-angle photos logged with date and address back your regrowth warranty and settle any dispute. Coverage proof lives on the job, not in a shoebox of files.' },
  ],
  mathHeading: 'Why soft wash operators move from Jobber<br />and Housecall Pro',
  pricingCards: [
    { name: 'Jobber Connect', price: '$119/mo', sub: 'plus per-text SMS, no portfolio, no recurring e-sign agreements' },
    { name: 'Housecall Pro', price: '$79/mo', sub: 'plus 2.59% + $0.10 on every client payment' },
    { name: 'Markate (real stack)', price: '$80-110/mo', sub: '$39.95 base plus $10/mo each for Portal, Booking, Lead Form, Reviews' },
    { name: 'Opervo Solo', price: '$24.99/mo', sub: 'all-in. 0% payment markup. Founding 50: $15/mo for life.', highlight: true },
  ],
  mathTakeaway: 'A $1,800 roof on Opervo: quoted from the map before you arrive, e-signed on the spot, photographed streak-to-spotless to your Folio, the next clean already scheduled, and paid with zero markup skimmed off the top.',
  comparisonRows: [
    { feature: 'Monthly price', opervo: '$24.99', jobber: '$119+', housecall: '$79+', gorilla: '$49+', markate: '$39.95 + add-ons' },
    { feature: 'On-map square-foot quoting', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Recurring agreements (e-signed)', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Before/after auto-publish', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Multi-service bundled estimate', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '✓' },
    { feature: 'Customer portal', opervo: '✓ Included', jobber: '✓', housecall: '✓', gorilla: '✗', markate: '+$10/mo' },
    { feature: 'Auto-text "on my way"', opervo: '✓', jobber: 'Add-on', housecall: '✓', gorilla: '✓', markate: '+$10/mo' },
    { feature: 'Public portfolio page', opervo: '✓', jobber: '✗', housecall: '✗', gorilla: '✗', markate: '✗' },
    { feature: 'Payment markup', opervo: '0%', jobber: 'Jobber Payments', housecall: '2.59% + $0.10', gorilla: 'GD Pay', markate: 'Markate Payments' },
    { feature: '14-day free trial', opervo: '✓', jobber: '✓', housecall: '✓', gorilla: '✓', markate: '✓' },
  ],
  faqs: [
    { q: 'What software is best for a soft wash roof cleaning business?', a: 'Look for fast custom estimating, photo documentation, recurring plans, and easy payment in one place. Opervo covers all of it from $24.99/mo on the Solo plan with a helper included, on iOS, Android, and web. It is built for solo operators and small crews, not enterprises paying per tech.' },
    { q: 'How do I quote a roof when every one is a different size and pitch?', a: 'Soft wash jobs are custom by nature. Opervo on-map measurement gives you square footage from a traced outline, then you apply your per-square-foot rate and adjust for pitch, complexity, and stain level. You can send the estimate before you arrive on site.' },
    { q: 'How do before and after photos help me close more roof jobs?', a: 'Algae-streaked to spotless is the most convincing result in exterior cleaning. Opervo attaches your before and after shots to each job and auto-publishes them to a public Folio page, so prospects browsing your work see exactly what you deliver.' },
    { q: 'Roofs only get cleaned every couple of years. How do I keep customers from forgetting me?', a: 'That long cycle is exactly why operators lose repeat business. Opervo recurring service agreements schedule the next clean on the right interval, one to three years out or sooner for shaded roofs, and the rebook is automatic. Automated texts keep you top of mind.' },
    { q: 'Can I bundle roof cleaning with gutter and house washing?', a: 'Yes. You can build one estimate covering multiple services, which lifts your average ticket and saves a second trip to the same address. Bundling is one of the simplest ways to raise revenue per stop in this trade.' },
    { q: 'How do customers pay for a big roof job, and do you take a cut?', a: 'Opervo sends a branded invoice the customer can pay from their phone, and there is zero payment markup. On a $700 to $2,500 job that no-markup policy keeps real money in your pocket.' },
    { q: 'It is a warm-season business. Does the app help me stay organized in the off months?', a: 'Yes. With March through November being the active window, you can use the quieter months to send recurring rebook reminders, clean up your customer list, and prep next season routes. QuickBooks sync also makes year-end bookkeeping straightforward.' },
  ],
  finalCtaH2: 'Quote it from the map.<br />Close it from the roof.',
  relatedPosts: [
    { href: '/blog/crm-for-roof-cleaning-businesses', title: 'CRM for Roof Cleaning Businesses', blurb: 'Manage leads, scheduling, and repeat work more easily.' },
    { href: '/blog/best-software-for-pressure-washing-businesses', title: 'Best Software for Pressure Washing Businesses', blurb: 'The 5 best apps for exterior cleaning pros, ranked.' },
  ],
}

export default function RoofCleaning() {
  return <TradeLandingPage config={config} />
}
