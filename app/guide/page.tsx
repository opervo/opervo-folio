import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Opervo User Guide — Complete Walkthrough for New Users',
  description: 'The full Opervo user guide — account setup, clients, jobs, estimates, invoicing, Folio, mileage, team, and every feature in between. Your first-week walkthrough.',
  alternates: { canonical: 'https://www.opervo.io/guide' },
  openGraph: {
    title: 'Opervo User Guide — Complete Walkthrough',
    description: 'Your complete first-week walkthrough. Get set up, get paid, and look pro.',
    url: 'https://www.opervo.io/guide',
    type: 'article',
  },
}

type Step = { title: string; body: string; bullets?: string[] }
type Section = { id: string; num: string; title: string; intro?: string; steps: Step[] }

const sections: Section[] = [
  {
    id: 'setup', num: '01', title: 'First 15 Minutes — Account Setup',
    intro: 'Get signed up and configured so every invoice, estimate, and client page looks pro from day one.',
    steps: [
      { title: 'Create your account', body: 'Go to app.opervo.io and tap Sign up. Use email + password or a magic link. No email confirmation needed during beta — you are in immediately. Your 14-day free trial starts automatically. No credit card required.' },
      { title: 'Fill in Business Info', body: 'Settings → Edit Business Info. This content appears on every client-facing page.', bullets: ['Business name, your name, title', 'Phone and business email', 'Street address', 'Logo (square PNG) — skip if you do not have one yet', 'Default tax rate (e.g. 8.25) — auto-fills estimates and invoices', 'Google review link — clients are prompted to leave a review after paying'] },
      { title: 'Connect Stripe', body: 'Settings → Payments → Connect Stripe. Complete the Express onboarding — ID, bank, tax info. Once approved, payouts land in your bank 2 business days after a client pays. Opervo takes 0% of your payment — you keep 100%.' },
      { title: 'Connect Google Calendar (optional)', body: 'Settings → Integrations → Connect Google Calendar. Two-way sync: jobs you schedule in Opervo show up in Google Calendar, and vice versa. Google verification was approved April 2026 — no warning screens.' },
    ],
  },
  {
    id: 'clients', num: '02', title: 'Build Your Client List',
    intro: 'Get every past and current customer into Opervo so you have a clean foundation for jobs, estimates, and invoices.',
    steps: [
      { title: 'Add clients one by one', body: 'Clients → tap the + button. Enter name, phone, email, address (Google Places autocompletes). Add notes — gate codes, pets, preferred days. Tag a lead source (Referral, Google, Door knock, Facebook) so you can see where your best jobs come from.' },
      { title: 'Or import from CSV', body: 'Coming from Jobber, Housecall Pro, ServiceTitan, QuickBooks, or Google Contacts? Export a CSV, then Clients → Import CSV. Opervo auto-maps columns and flags duplicates.' },
      { title: 'Client detail page', body: 'Tap any client to see full contact info, job history, invoices, estimates, lifetime revenue, and notes. Every client gets a magic-link Client Portal — share the link and they can see their own jobs and invoices with no login required.' },
    ],
  },
  {
    id: 'jobs', num: '03', title: 'Your First Job',
    intro: 'The core workflow: create → schedule → start → finish → send a branded report.',
    steps: [
      { title: 'Create a job', body: 'Tap + New Job from the dashboard. Pick a client (or create one on the spot), set the address, pick a service from your catalog (auto-fills price), schedule the date and time, assign a crew member, add a checklist and notes, save.' },
      { title: 'Recurring jobs', body: 'Toggle Recurring and pick your cadence — weekly, biweekly, monthly, custom. Opervo creates the whole series. Edit one, edit all — your choice.' },
      { title: 'Job status flow', body: 'Every job moves through: Documented → Scheduled → In Progress → Completed → Paid. Status updates automatically as you take the next action. Push notifications fire at every step.' },
      { title: 'On-site features', body: 'Once at the job, you have everything you need in one screen.', bullets: ['One-tap navigation (Google Maps or Apple Maps)', 'Start Job — logs start time', 'Before / During / After photo tabs', 'Voice-to-text notes — hands-free while you work', 'Checklist ticks as you go', 'Finish Job — logs end time, moves to Completed'] },
      { title: 'Send the branded job report', body: 'When you finish, tap Send Report. Opervo generates a branded page with your logo, before/after photos, services performed, and time on site. Share via SMS, email, or link. Clients love these — they are the #1 reason people refer you.' },
    ],
  },
  {
    id: 'estimates', num: '04', title: 'Estimates & Proposals',
    intro: 'Turn on-site visits into approved work in under 60 seconds.',
    steps: [
      { title: 'Create an estimate', body: 'Estimates → + New Estimate. Pick a client, add line items, apply discounts (percent or flat), toggle tax, attach photos (problem areas, reference shots), set an expiration date, give it a custom title like "Driveway Pressure Wash — Spring 2026".' },
      { title: 'Send and track', body: 'Send via SMS or email with a magic link. The client sees a branded page, taps Approve (IP logged) or Decline (with optional reason). You get a push notification the second they respond. Status tracks Draft → Sent → Approved / Declined / Expired.' },
      { title: 'Convert to job', body: 'When an estimate is approved, tap Convert to Job. Line items, client info, and photos carry over. Pick a date. Done.' },
    ],
  },
  {
    id: 'invoicing', num: '05', title: 'Invoicing & Getting Paid',
    intro: 'Cards, Apple Pay, Google Pay — plus tipping and review prompts built in.',
    steps: [
      { title: 'Create an invoice', body: 'Two ways: from a completed job (line items auto-fill) or standalone (Invoices → + New Invoice, no job required). Add line items, custom title, tax, due date, and notes.' },
      { title: 'Send and collect', body: 'Share via SMS, email, or link. Client opens a branded page with Stripe checkout built in. Status moves Draft → Sent → Paid automatically when they pay.' },
      { title: 'Tipping and reviews', body: 'After payment, clients see a tip prompt (10% / 15% / 20% / custom) and — if you set a Google review link — a "How did we do?" prompt. Most operators see 3–5× more reviews this way.' },
      { title: 'Filters and notifications', body: 'The Invoices screen has Draft, Sent, Paid, and Overdue tabs. Overdue is auto-calculated. When a client pays, you get an instant push: "💰 Sarah Johnson paid $450.00".' },
    ],
  },
  {
    id: 'schedule', num: '06', title: 'Schedule & Calendar',
    steps: [
      { title: 'Three views', body: 'Week strip (scrollable horizontal bar on the dashboard), month calendar (full view with job dots per day), and map view (all of today\u2019s jobs as pins).' },
      { title: 'Personal tasks', body: 'Add non-job items to your schedule: "Pick up new squeegee blades", "Call Mike back", "Order business cards".' },
      { title: 'Google Calendar sync', body: 'Two-way. Edit in either place and both update. No double-booking.' },
    ],
  },
  {
    id: 'folio', num: '07', title: 'Your Folio — Public Portfolio',
    intro: 'A mini-website for your business at opervo.io/p/your-slug. Share it on Instagram, Facebook, door hangers, anywhere.',
    steps: [
      { title: 'Set it up', body: 'Settings → My Folio. Pick your slug, write a headline and about section, drag in services from your catalog (each with emoji, description, price), and upload 1–20 before/after gallery photos.' },
      { title: 'Hero slider and badges', body: 'Pick a hero before/after pair for the comparison slider at the top. Toggle the "Accepting New Clients" badge. Your Google rating pulls automatically once you set the review link.' },
      { title: 'Built-in lead capture', body: 'Every Folio has a Request a Quote form. Leads flow straight into your Clients list tagged "Folio". Push notification fires the second one comes in.' },
      { title: 'SEO and sharing', body: 'Open Graph meta tags are built in — when you share your Folio link on social or SMS, it shows a preview card with your logo, headline, and hero photo.' },
    ],
  },
  {
    id: 'mileage', num: '08', title: 'Mileage & Expenses',
    intro: 'Every tax deduction captured automatically — no shoebox of receipts.',
    steps: [
      { title: 'Log a trip', body: 'Mileage → + Log Trip. Start and end locations autocomplete. Optionally link to a job for tax categorization. Opervo calculates distance via Google Maps.' },
      { title: 'Log an expense', body: 'Expenses → + New Expense. Pick a category (Fuel, Equipment, Supplies, Insurance, Marketing), enter amount and date, snap a receipt photo, add notes.' },
      { title: 'Tax reports', body: 'Settings → Tax Reports. Quarterly or yearly view of income, expenses by category, and mileage deduction (auto-calculated at IRS rate). Export to CSV for your accountant or TurboTax.' },
    ],
  },
  {
    id: 'reviews', num: '09', title: 'Reputation & Reviews',
    steps: [
      { title: 'Request a review', body: 'On any client detail page, tap Request Review. Sends a branded email with a star rating form and your Google review link.' },
      { title: 'Smart routing', body: 'Low ratings (1–2 stars) route to you privately with feedback instead of publicly to Google. Protects your reputation while giving you the signal to improve.' },
    ],
  },
  {
    id: 'team', num: '10', title: 'Team Management (Team Plan)',
    intro: 'Solo ($24.99/mo) includes 1 helper. Upgrade to Team ($54.99/mo) for up to 10 team members.',
    steps: [
      { title: 'Invite crew', body: 'Settings → Team → Invite Member. Enter their email, they set a password and join. They see only the jobs you assign them.' },
      { title: 'Clock-in / clock-out', body: 'Crew members clock in and out from their phone. You see hours per week per person in the owner dashboard.' },
      { title: 'Assign jobs', body: 'On any job, tap Assign and pick a crew member. They get a push notification. Their schedule updates automatically.' },
    ],
  },
  {
    id: 'ai', num: '11', title: 'AI Assistant',
    steps: [
      { title: 'Ask it anything', body: 'Tap AI in the bottom nav. Ask about how to use Opervo, your own business data, pricing questions, or draft messages to clients. Powered by GPT-4o-mini and scoped to your account.' },
    ],
  },
  {
    id: 'pwa', num: '12', title: 'Install on Your Phone',
    intro: 'Opervo is a Progressive Web App. Install it on any device like a native app.',
    steps: [
      { title: 'iPhone', body: 'Open app.opervo.io in Safari, tap the Share button, tap Add to Home Screen. Opervo icon appears on your home screen.' },
      { title: 'Android', body: 'Open app.opervo.io in Chrome, tap the three-dot menu, tap Install app. Opervo icon appears in your app drawer.' },
      { title: 'What works installed', body: 'Push notifications even when the app is closed, full-screen mode without browser bars, voice input, camera access, and dark mode following your system.' },
    ],
  },
]

const checklist = [
  'Sign up at app.opervo.io',
  'Fill in Business Info + upload logo',
  'Set default tax rate',
  'Connect Stripe',
  'Install Opervo on your phone (home screen)',
  'Add your first 5 clients (or import CSV)',
  'Create your Folio page',
  'Schedule your first job',
  'Send your first estimate',
  'Send your first invoice and get paid',
  'Log a trip (mileage)',
  'Connect Google Calendar',
  'Paste your Google review link',
  'Ask the AI assistant one question',
]

export default function GuidePage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#F7F5F2', minHeight: '100vh', fontFamily: "'Barlow', sans-serif", color: '#1a1a1a' }}>
        {/* Hero */}
        <section style={{ background: '#0F0F0F', padding: '72px 24px 56px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#F5620F', letterSpacing: '0.18em', marginBottom: 14 }}>
            New User Guide
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, lineHeight: 1.05, textTransform: 'uppercase', color: '#F7F5F2', maxWidth: 820, margin: '0 auto 16px' }}>
            Your First Week on Opervo
          </h1>
          <p style={{ fontSize: 18, color: '#9CA3AF', fontFamily: "'Barlow', sans-serif", maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.5 }}>
            A full walkthrough of every feature — from signup to your first paid invoice. Work through it top to bottom on day one, or jump to a section when you need it.
          </p>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, textTransform: 'uppercase', padding: '16px 36px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Start Free Trial &rarr;
          </a>
          <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginTop: 14 }}>
            14 days free. No credit card.
          </p>
        </section>

        {/* Table of contents */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 16px' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 16 }}>
            What You&rsquo;ll Learn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '14px 16px', textDecoration: 'none' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#F5620F' }}>{s.num}</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, textTransform: 'uppercase', color: '#0F0F0F' }}>{s.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 24px' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5620F', lineHeight: 1, marginBottom: 8 }}>{section.num}</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: section.intro ? 10 : 22 }}>
              {section.title}
            </h2>
            {section.intro && (
              <p style={{ fontSize: 16, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, marginBottom: 24 }}>
                {section.intro}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {section.steps.map((step, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '22px 22px' }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 8 }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: 15, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
                    {step.body}
                  </p>
                  {step.bullets && (
                    <ul style={{ margin: '12px 0 0 18px', padding: 0, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.7 }}>
                      {step.bullets.map((b, j) => (
                        <li key={j} style={{ marginBottom: 4 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Checklist */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5620F', lineHeight: 1, marginBottom: 8 }}>✓</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 14 }}>
            First Week Checklist
          </h2>
          <p style={{ fontSize: 16, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginBottom: 24 }}>
            Tick all 14 boxes and you&rsquo;re officially off the training wheels.
          </p>
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '24px 24px' }}>
            {checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < checklist.length - 1 ? '1px solid #F0EDE7' : 'none' }}>
                <span style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid #E8E4DE', borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", color: '#1a1a1a' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, textTransform: 'uppercase', color: '#F7F5F2', lineHeight: 1.1, marginBottom: 12 }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: 16, color: '#9CA3AF', fontFamily: "'Barlow', sans-serif", marginBottom: 24 }}>
            Sign up in 60 seconds. 14 days free. No credit card.
          </p>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, textTransform: 'uppercase', padding: '16px 36px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Start Free Trial &rarr;
          </a>
          <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginTop: 20 }}>
            Questions? <a href="mailto:help@opervo.io" style={{ color: '#F5620F', textDecoration: 'none' }}>help@opervo.io</a>
          </p>
        </section>

        {/* Explore More */}
        <section style={{ background: '#F7F5F2', padding: '48px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#F5620F', letterSpacing: '0.14em', marginBottom: 16 }}>
              Explore More
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { title: 'All Features', desc: 'Every feature in one place', href: '/features' },
                { title: 'Pricing', desc: 'Plans starting at $24.99/mo', href: '/pricing' },
                { title: 'Blog', desc: 'Tips to grow your business', href: '/blog' },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ display: 'block', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '16px 14px', textDecoration: 'none' }}>
                  <strong style={{ display: 'block', fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</strong>
                  <span style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif" }}>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          h1 { font-size: 36px !important; }
        }
      `}</style>
    </>
  )
}
