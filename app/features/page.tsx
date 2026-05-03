import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'All Features — Opervo | Field Service Management for Solo Operators',
  description: 'Every feature in Opervo: job management, scheduling, estimates, invoicing, client portal, portfolio page, SMS automation, mileage tracking, team management, and more. Starting at $24.99/mo.',
  alternates: { canonical: 'https://opervo.io/features' },
  openGraph: {
    title: 'All Features — Opervo',
    description: 'Every feature in Opervo. Job management, invoicing, scheduling, client portal, portfolio, SMS, mileage tracking, and more — $24.99/mo.',
    url: 'https://opervo.io/features',
    type: 'website',
  },
}

const categories = [
  {
    id: 'jobs', icon: '01', title: 'Job Management',
    features: [
      { name: 'Create & edit jobs', desc: 'Google Places autocomplete for addresses — no manual entry.' },
      { name: 'Status flow', desc: 'Documented \u2192 Scheduled \u2192 In Progress \u2192 Completed \u2192 Paid. Always know where every job stands.' },
      { name: 'Recurring scheduling', desc: 'Set jobs to repeat weekly, biweekly, monthly, or custom. Auto-creates and auto-invoices.' },
      { name: 'Job checklists', desc: 'Add task checklists to any job. Crew members check off as they go.' },
      { name: 'One-tap navigation', desc: 'Open job address in Google Maps or Apple Maps with a single tap.' },
      { name: 'Service auto-fill', desc: 'Save your service catalog. Auto-fill line items, pricing, and descriptions on new jobs.' },
      { name: 'Team assignment', desc: 'Assign jobs to specific crew members. They see only their jobs.' },
      { name: 'Photo documentation', desc: 'Before, during, and after photos attached to every job. Build proof of work.' },
      { name: 'Voice-to-text notes', desc: 'Hands-free job notes. Speak instead of type — ideal when your hands are dirty.' },
      { name: 'Branded job reports', desc: 'Send professional job summaries to clients via magic link — SMS, email, or direct link.' },
    ],
  },
  {
    id: 'clients', icon: '02', title: 'Client Management',
    features: [
      { name: 'Client database', desc: 'Centralized contacts, addresses, notes, and full job history for every client.' },
      { name: 'Lead source tracking', desc: 'Know where every client came from — Google, referral, door knock, Folio page.' },
      { name: 'CSV import', desc: 'Import from Jobber, Housecall Pro, ServiceTitan, QuickBooks, or Google Contacts.' },
      { name: 'Auto-column mapping', desc: 'Smart column detection and duplicate detection on import. No manual cleanup.' },
      { name: 'Client portal', desc: 'Branded portal via magic link — no login required. Clients view jobs, invoices, and estimates.' },
      { name: 'Service request form', desc: 'Clients submit service requests through the portal. You get notified instantly.' },
    ],
  },
  {
    id: 'billing', icon: '03', title: 'Billing & Invoicing',
    features: [
      { name: 'Professional invoices', desc: 'Line items, tax, due dates, and your branding. Looks like you have a back office.' },
      { name: 'Custom invoice titles', desc: 'Name your invoices however you want. Standalone invoicing without creating a job.' },
      { name: 'Status filters', desc: 'Draft, Sent, Paid, Overdue — auto-calculated. See exactly what\u2019s outstanding.' },
      { name: 'Online payments', desc: 'Stripe-powered — credit cards, Apple Pay, Google Pay. Clients pay in seconds.' },
      { name: 'Post-payment tipping', desc: 'Clients can add a tip after paying. Averages 15-20% in the trades.' },
      { name: 'Google review prompt', desc: 'After payment, clients see a prompt to leave a Google review. Builds your rating on autopilot.' },
      { name: 'Payment notifications', desc: 'Push notification the second a client pays. Auto-updates invoice status.' },
    ],
  },
  {
    id: 'estimates', icon: '04', title: 'Estimates & Proposals',
    features: [
      { name: 'Branded estimates', desc: 'Line items, tax, discounts, and photo attachments. Send in under 60 seconds.' },
      { name: 'Digital approval', desc: 'Client-facing approval with IP logging and timestamp. No printing, no scanning.' },
      { name: 'Decline tracking', desc: 'If a client declines, capture their reason. Use it to improve your pitch.' },
      { name: 'Status tracking', desc: 'Draft, Sent, Approved, Declined, Expired. Know where every estimate stands.' },
      { name: 'One-tap convert to job', desc: 'Approved estimate? Convert to a scheduled job with one tap. No re-entering data.' },
    ],
  },
  {
    id: 'schedule', icon: '05', title: 'Schedule',
    features: [
      { name: 'Week strip & month views', desc: 'Toggle between a quick week strip and full month calendar.' },
      { name: 'Map view', desc: 'See all scheduled jobs on an interactive map. Plan your route visually.' },
      { name: 'Personal tasks & reminders', desc: 'Add non-job tasks and reminders to your calendar. Everything in one place.' },
      { name: 'Google Calendar sync', desc: 'Two-way sync. Jobs appear on Google Calendar. Personal events appear in Opervo.' },
    ],
  },
  {
    id: 'folio', icon: '06', title: 'Folio — Public Portfolio',
    features: [
      { name: 'Custom portfolio page', desc: 'Your own page at opervo.io/p/your-slug. Share it everywhere.' },
      { name: 'Before/after slider', desc: 'Interactive comparison slider. Clients drag to see the transformation.' },
      { name: 'Gallery grid', desc: 'Drag-and-drop reordering. Show 1 to 20 photos of your best work.' },
      { name: 'Service catalog', desc: 'List your services with emoji icons, descriptions, and pricing.' },
      { name: 'Google rating display', desc: 'Show your Google star rating and review count. Social proof built in.' },
      { name: '"Accepting New Clients" badge', desc: 'Toggle on when you want new leads. Signals availability.' },
      { name: 'Quote request form', desc: 'Built-in lead capture. Clients request a quote directly from your Folio.' },
      { name: 'SEO optimized', desc: 'Open Graph meta tags, semantic HTML. Your Folio ranks on Google.' },
    ],
  },
  {
    id: 'mileage', icon: '07', title: 'Mileage & Expense Tracking',
    features: [
      { name: 'Trip logging', desc: 'Log trips with start and end locations. Link trips to specific jobs.' },
      { name: 'Monthly mileage summary', desc: 'See your total miles and estimated tax deduction at a glance.' },
      { name: 'Expense logging', desc: 'Log expenses by category. Attach receipt photos.' },
      { name: 'Expense summary widgets', desc: 'Monthly totals, category breakdowns, and trends on your dashboard.' },
    ],
  },
  {
    id: 'reviews', icon: '08', title: 'Reputation & Reviews',
    features: [
      { name: 'Review requests', desc: 'Request reviews from clients via email after a job. One tap to send.' },
      { name: 'Star-rating collection', desc: 'Clients rate your work and leave feedback directly in Opervo.' },
      { name: 'Google Business link', desc: 'Automatic Google review link on your Folio page and post-payment screen.' },
    ],
  },
  {
    id: 'team', icon: '09', title: 'Team Management',
    features: [
      { name: 'Invite crew via email', desc: 'Add up to 10 team members on the Team plan (1 helper on Solo). They get their own login.' },
      { name: 'Job assignment', desc: 'Assign specific jobs to specific people. They see only their work.' },
      { name: 'Clock-in/clock-out', desc: 'Crew members track their hours per job. You see it all on your dashboard.' },
      { name: 'Owner dashboard', desc: 'Bird\u2019s-eye view of team activity, job progress, and time tracking.' },
    ],
  },
  {
    id: 'sms', icon: '10', title: 'SMS Automation',
    features: [
      { name: '"On My Way" notifications', desc: 'Clients get a text with your ETA when you\u2019re heading to the job.' },
      { name: 'Job completion texts', desc: 'Automatic text when a job is marked complete. Includes a link to the job report.' },
      { name: 'Invoice delivery via SMS', desc: 'Send invoices by text. Clients tap to view and pay instantly.' },
      { name: 'A2P 10DLC compliant', desc: 'Twilio-powered. Fully registered for carrier-approved business texting.' },
    ],
  },
  {
    id: 'ai', icon: '11', title: 'AI Assistant',
    features: [
      { name: 'Built-in AI chat', desc: 'Ask anything about running your business. Get help writing estimates, emails, and follow-ups.' },
    ],
  },
  {
    id: 'mobile', icon: '12', title: 'Mobile-First PWA',
    features: [
      { name: 'Installable on any device', desc: 'Add to your home screen on iPhone, Android, tablet, or desktop. No app store needed.' },
      { name: 'Push notifications', desc: 'Real-time alerts for new jobs, payments, reviews, leads, and team activity.' },
      { name: 'Dark mode', desc: 'Easy on the eyes for early morning or late-night work.' },
      { name: 'Voice input everywhere', desc: 'Tap the mic icon on any text field. Speak your notes, descriptions, or messages.' },
    ],
  },
  {
    id: 'integrations', icon: '13', title: 'Integrations',
    features: [
      { name: 'QuickBooks Online', desc: 'Connect your QBO account. Sync invoices one way — Opervo to QuickBooks.' },
      { name: 'Google Calendar', desc: 'Two-way sync. Your jobs and your personal calendar in one view.' },
      { name: 'Stripe', desc: 'Payments, subscriptions, and tipping. PCI-compliant. Funds hit your bank in 2 days.' },
      { name: 'SMS Notifications', desc: '"On My Way!" texts, appointment reminders, job completion alerts, and invoice delivery — all automatic.' },
      { name: 'Google Maps / Apple Maps', desc: 'One-tap navigation to any job address from the job detail screen.' },
    ],
  },
  {
    id: 'field-tools', icon: '14', title: 'Field Tools',
    features: [
      { name: 'Door-to-door canvassing', desc: 'Map-based canvassing with pin statuses. Closed loop from door knock to estimate to invoice.' },
      { name: 'Square footage & linear foot tool', desc: 'Measure properties on-site. Auto-calculate pricing based on area or linear feet.' },
    ],
  },
]

export default function FeaturesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Opervo',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: [
      { '@type': 'Offer', name: 'Solo (Monthly)', price: '24.99', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Solo (Annual)', price: '249.00', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Team (Monthly)', price: '54.99', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Team (Annual)', price: '549.00', priceCurrency: 'USD' },
    ],
    url: 'https://opervo.io/features',
    description: 'Field service management app for solo operators and small crews. Jobs, invoicing, scheduling, client portal, portfolio, SMS automation, and more.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      <main style={{ background: '#F7F5F2', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px 40px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5620F', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
            ALL FEATURES
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.05, marginBottom: 16 }}>
            Everything You Need.{'\n'}Nothing You Don&apos;t.
          </h1>
          <p style={{ fontSize: 18, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            Jobs, invoices, scheduling, client portal, portfolio page, SMS automation, mileage tracking, team management — all in one app. Starting at $24.99/mo.
          </p>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase', padding: '14px 32px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Start Free — 30 Days, No Card
          </a>
          <p style={{ fontSize: 12, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginTop: 10 }}>
            Solo plan: $24.99/mo after trial &middot; Team plan: $54.99/mo
          </p>
        </section>

        {/* Sticky Category Nav */}
        <nav style={{ position: 'sticky', top: 57, zIndex: 40, background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '0 24px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 4, padding: '8px 0' }}>
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} style={{ whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600, color: '#6B6B6B', textDecoration: 'none', padding: '8px 14px', borderRadius: 20, fontFamily: "'Barlow', sans-serif" }}>
                {cat.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Feature Categories */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 0' }}>
          {categories.map((cat, ci) => (
            <section key={cat.id} id={cat.id} style={{ marginBottom: 64, scrollMarginTop: 130 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F5620F', background: 'rgba(245,98,15,0.08)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, flexShrink: 0 }}>{cat.icon}</span>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', color: '#0F0F0F' }}>
                  {cat.title}
                </h2>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", background: '#EDE9E3', padding: '4px 10px', borderRadius: 12 }}>
                  {cat.features.length} {cat.features.length === 1 ? 'feature' : 'features'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {cat.features.map((f, fi) => (
                  <div key={fi} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '20px 22px' }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 6 }}>
                      {f.name}
                    </h3>
                    <p style={{ fontSize: 14, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>

              {(ci === 3 || ci === 7 || ci === 11) && (
                <div style={{ background: '#0F0F0F', borderRadius: 12, padding: '32px 24px', textAlign: 'center', marginTop: 32 }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', color: '#F7F5F2', marginBottom: 8 }}>
                    {ci === 3 ? 'All of this for $24.99/mo.' : ci === 7 ? 'No add-ons. No hidden fees.' : 'Built for the truck, not the desk.'}
                  </p>
                  <p style={{ fontSize: 14, color: '#9CA3AF', fontFamily: "'Barlow', sans-serif", marginBottom: 16 }}>
                    14-day free trial. No credit card required.
                  </p>
                  <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, textTransform: 'uppercase', padding: '12px 28px', borderRadius: 6, textDecoration: 'none' }}>
                    Start Free Trial &rarr;
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Feature Count Summary */}
        <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '48px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 8 }}>
            60+ Features. One App. $24.99/mo.
          </h2>
          <p style={{ fontSize: 16, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}>
            No feature gates. No add-on pricing. Every Solo plan customer gets access to everything above. Team plan adds crew management for $54.99/mo.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { num: '60+', label: 'Features included' },
              { num: '$24.99', label: 'Per month (Solo)' },
              { num: '14', label: 'Day free trial' },
              { num: '0', label: 'Credit card required' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5620F' }}>{s.num}</p>
                <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Callout */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: '#0F0F0F', textAlign: 'center', marginBottom: 24 }}>
            See How Opervo Compares
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { name: 'Opervo vs Jobber', href: '/compare/opervo-vs-jobber', price: '$24.99/mo vs $39/mo', desc: 'Save $168/year. Get a portfolio page and SMS included.' },
              { name: 'Opervo vs Housecall Pro', href: '/compare/opervo-vs-housecall-pro', price: '$24.99/mo vs $79/mo', desc: 'Save $648/year. All the features solos actually need.' },
              { name: 'Opervo vs GorillaDesk', href: '/compare/opervo-vs-gorilladesk', price: '$24.99/mo vs $49/mo', desc: 'Save $288/year. Built for any home-service trade.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} title={c.name} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '24px', textDecoration: 'none' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 4 }}>{c.name}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F5620F', fontFamily: "'Barlow', sans-serif", marginBottom: 8 }}>{c.price}</p>
                <p style={{ fontSize: 14, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.5 }}>{c.desc}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F5620F', fontFamily: "'Barlow', sans-serif", marginTop: 12 }}>See full comparison &rarr;</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Industry Pages */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: '#0F0F0F', textAlign: 'center', marginBottom: 24 }}>
            Built for Your Trade
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { name: 'Solar Panel Cleaning', href: '/solar-panel-cleaning' },
              { name: 'Window Cleaning', href: '/window-cleaning' },
              { name: 'Pressure Washing', href: '/pressure-washing' },
              { name: 'Landscaping', href: '/landscaping' },
            ].map((t) => (
              <Link key={t.href} href={t.href} title={`${t.name} Software — Opervo`} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '20px', textDecoration: 'none', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 4 }}>{t.name}</p>
                <p style={{ fontSize: 14, color: '#F5620F', fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>Learn more &rarr;</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, textTransform: 'uppercase', color: '#F7F5F2', lineHeight: 1.1, marginBottom: 12 }}>
            Ready to Run Your Business Like a Pro?
          </h2>
          <p style={{ fontSize: 16, color: '#9CA3AF', fontFamily: "'Barlow', sans-serif", marginBottom: 24 }}>
            Start free — 14 days, no credit card.
          </p>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, textTransform: 'uppercase', padding: '16px 36px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Start Free Trial &rarr;
          </a>
        </section>
      </main>

      {/* Explore More */}
      <section style={{ background: '#F7F5F2', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#F5620F', letterSpacing: '0.14em', marginBottom: 16 }}>
            Explore More
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { title: 'Pricing', desc: 'Plans starting at $24.99/mo', href: '/pricing' },
              { title: 'Solar Panel Cleaning', desc: 'Software built for solar cleaners', href: '/solar-panel-cleaning' },
              { title: 'Window Cleaning', desc: 'Software built for window cleaners', href: '/window-cleaning' },
              { title: 'Pressure Washing', desc: 'Software built for pressure washers', href: '/pressure-washing' },
              { title: 'Landscaping', desc: 'Software built for landscapers', href: '/landscaping' },
              { title: 'Blog', desc: 'Tips to grow your business', href: '/blog' },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ display: 'block', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '16px 14px', textDecoration: 'none' }}>
                <strong style={{ display: 'block', fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</strong>
                <span style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif" }}>{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        .desktop-nav { display: flex !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          h1 { font-size: 36px !important; }
        }
      `}</style>
    </>
  )
}
