import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

const CheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
)
const XSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)

export const metadata: Metadata = {
  title: 'Switch & Save — 50% Off 3 Months | Opervo',
  description:
    'Paying for Jobber, Housecall Pro, or GorillaDesk? Upload your billing receipt and get 50% off Opervo for 3 months. No code, no catch.',
  alternates: { canonical: 'https://www.opervo.io/switch' },
  openGraph: {
    title: 'Switch & Save — 50% Off 3 Months',
    description:
      'Upload your CRM billing receipt and get 50% off Opervo for 3 months.',
    url: 'https://www.opervo.io/switch',
    type: 'website',
  },
}

const COMPETITORS = [
  { name: 'Jobber', plan: 'Grow plan (most popular)', price: 169 },
  { name: 'Housecall Pro', plan: 'Essentials plan', price: 79 },
  { name: 'GorillaDesk', plan: 'Pro plan', price: 99 },
  { name: 'Markate', plan: 'Grow plan', price: 164 },
]

const CRM_LIST = [
  'Jobber', 'Housecall Pro', 'GorillaDesk', 'ServiceTitan',
  'Markate', 'QuoteIQ', 'FieldEdge', 'Service Fusion',
]

const ACCEPTED = [
  'Subscription billing receipt or renewal email',
  'Payment confirmation with amount + date',
  'Billing page screenshot showing a paid plan',
  'Dashboard screenshot with your business name + 60 days of data',
]

const REJECTED = [
  'Free trial screenshots (no charge = no proof)',
  'Marketing pages or pricing screenshots',
  'Receipts older than 90 days',
  'Screenshots from a different business',
]

const FAQ = [
  {
    q: 'Can I use a free trial screenshot?',
    a: 'No. We need proof you were actually paying for another CRM. The receipt must show a real charge amount and a date within the last 90 days.',
  },
  {
    q: 'Does this stack with the Founder offer?',
    a: "One active discount per account. If you already have a founder coupon applied, Switch & Save won't stack. Pick whichever saves you more.",
  },
  {
    q: 'What happens after the 3 months?',
    a: 'Your plan goes to the normal price — $24.99/mo Solo or $54.99/mo Team. Still less than one month of Jobber Grow.',
  },
  {
    q: "What if my CRM isn't on the list?",
    a: "Email help@opervo.io with your receipt. If it's a real field service CRM, we'll make it work.",
  },
  {
    q: 'Is my receipt private?',
    a: "Yes. It's verified automatically by AI, stored for 30 days, then deleted. No human sees it unless you contact support.",
  },
]

const heading = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900 as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.5px',
  color: '#0F0F0F',
}

const body = {
  fontFamily: "'Barlow', sans-serif",
}

export default function SwitchPage() {
  return (
    <div style={{ ...body, background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <SiteNav />
      <main>
        {/* Hero */}
        <section style={{ background: '#0F0F0F', color: '#fff', padding: '112px 24px 64px', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 999,
              padding: '6px 16px',
              fontSize: 11,
              ...heading,
              fontWeight: 800,
              letterSpacing: '0.12em',
              marginBottom: 24,
              background: 'rgba(245,98,15,0.15)',
              color: '#F5620F',
              border: '1px solid rgba(245,98,15,0.3)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Limited time
          </span>
          <h1 style={{ ...heading, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.05, marginBottom: 20, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', color: '#fff' }}>
            Stop overpaying.<br />
            Show the receipt.<br />
            Get <span style={{ color: '#F5620F' }}>50% off.</span>
          </h1>
          <p style={{ ...body, color: '#b0aaa0', fontSize: 16, maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.6 }}>
            If you&apos;re paying Jobber $169/mo, Housecall Pro $79/mo, or any
            field service CRM &mdash; upload your last billing receipt and
            we&apos;ll cut your Opervo bill in half for 3 months.
          </p>
          <Link
            href="https://app.opervo.io/settings/payments"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F5620F',
              borderRadius: 12,
              padding: '16px 32px',
              ...heading,
              color: '#fff',
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            Upload your receipt
          </Link>
          <p style={{ ...body, color: '#777', fontSize: 14, marginTop: 16 }}>
            14-day free trial. No credit card required.
          </p>
        </section>

        {/* Price comparison */}
        <section style={{ background: '#fff', borderBottom: '1px solid #E8E4DE', padding: '56px 24px', maxWidth: 520, margin: '0 auto' }}>
          <p style={{ ...heading, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#F5620F', marginBottom: 8 }}>
            What you&apos;re paying now
          </p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 4vw, 30px)', marginBottom: 24 }}>
            We checked. It&apos;s too much.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {COMPETITORS.map((c) => (
              <div
                key={c.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 16,
                  border: '1px solid #E8E4DE',
                  background: '#fafaf7',
                  padding: 16,
                }}
              >
                <div>
                  <div style={{ ...heading, fontSize: 16, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ ...body, fontSize: 12, color: '#6B6B6B' }}>{c.plan}</div>
                </div>
                <div style={{ ...heading, fontSize: 20 }}>
                  ${c.price}{' '}
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#6B6B6B' }}>/mo</span>
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 16,
                background: '#0F0F0F',
                color: '#fff',
                padding: 16,
              }}
            >
              <div>
                <div style={{ ...heading, fontSize: 16, fontWeight: 700, color: '#F5620F' }}>Opervo</div>
                <div style={{ ...body, fontSize: 12, color: '#999' }}>Solo plan &mdash; everything included</div>
              </div>
              <div style={{ ...heading, fontSize: 20, textAlign: 'right' as const, color: '#fff' }}>
                <del style={{ fontSize: 14, color: '#6B6B6B', fontWeight: 600, marginRight: 4 }}>$24.99</del>
                <span style={{ color: '#F5620F' }}>$12.49</span>{' '}
                <span style={{ fontSize: 12, fontWeight: 500, color: '#999' }}>/mo</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, background: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, textAlign: 'center', ...body, fontSize: 14 }}>
            Switching from Jobber Grow? You&apos;ll save{' '}
            <strong style={{ color: '#16a34a' }}>$156.51/mo</strong> &mdash; that&apos;s{' '}
            <strong style={{ color: '#16a34a' }}>$1,878/yr</strong> back in your pocket.
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '56px 24px', maxWidth: 520, margin: '0 auto', borderBottom: '1px solid #E8E4DE' }}>
          <p style={{ ...heading, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#F5620F', marginBottom: 8 }}>
            How it works
          </p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 4vw, 28px)', marginBottom: 32 }}>
            3 steps. 60 seconds.
          </h2>

          {[
            {
              num: 1,
              title: 'Sign up for Opervo',
              desc: '14-day free trial, no credit card. Import your clients from your old CRM in one tap.',
            },
            {
              num: 2,
              title: 'Upload your last billing receipt',
              desc: 'Find the email from Jobber, HCP, or whoever that says "Payment received." Screenshot it. Upload it in-app.',
            },
            {
              num: 3,
              title: '50% off, applied automatically',
              desc: 'We verify in seconds. No code, no coupon, no waiting. Your next 3 months are half off.',
            },
          ].map((s) => (
            <div key={s.num} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#0F0F0F',
                ...heading,
                color: '#fff',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {s.num}
              </div>
              <div>
                <h3 style={{ ...heading, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ ...body, fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* What counts as proof */}
        <section style={{ background: '#fff', padding: '56px 24px', maxWidth: 520, margin: '0 auto', borderBottom: '1px solid #E8E4DE' }}>
          <p style={{ ...heading, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#F5620F', marginBottom: 8 }}>
            What we accept
          </p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 4vw, 28px)', marginBottom: 24 }}>
            Proof you were paying, not browsing.
          </h2>

          <div style={{ background: '#fafaf7', border: '1px solid #E8E4DE', borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h4 style={{ ...heading, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <CheckSvg /> Accepted
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ACCEPTED.map((a) => (
                <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, ...body, fontSize: 14 }}>
                  <span style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }}><CheckSvg /></span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#fafaf7', border: '1px solid #E8E4DE', borderRadius: 16, padding: 20 }}>
            <h4 style={{ ...heading, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <XSvg /> Not accepted
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {REJECTED.map((r) => (
                <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, ...body, fontSize: 14, color: '#6B6B6B' }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}><XSvg /></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CRM grid */}
        <section style={{ padding: '56px 24px', maxWidth: 520, margin: '0 auto', borderBottom: '1px solid #E8E4DE' }}>
          <p style={{ ...heading, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#F5620F', marginBottom: 8 }}>
            Switching from
          </p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 4vw, 28px)', marginBottom: 24 }}>
            Any of these? You qualify.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {CRM_LIST.map((c) => (
              <div
                key={c}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E4DE',
                  borderRadius: 12,
                  padding: '12px 0',
                  textAlign: 'center',
                  ...heading,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#fff', padding: '56px 24px', maxWidth: 520, margin: '0 auto', borderBottom: '1px solid #E8E4DE' }}>
          <p style={{ ...heading, fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#F5620F', marginBottom: 8 }}>
            Questions
          </p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 4vw, 28px)', marginBottom: 24 }}>
            Before you ask.
          </h2>
          {FAQ.map((f) => (
            <div key={f.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '16px 0' }}>
              <h3 style={{ ...heading, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
              <p style={{ ...body, fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <section style={{ background: '#0F0F0F', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ ...heading, fontSize: 'clamp(28px, 4.5vw, 40px)', lineHeight: 1.05, marginBottom: 16, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto', color: '#fff' }}>
            You already know<br />
            you&apos;re overpaying.<br />
            <span style={{ color: '#F5620F' }}>Prove it.</span>
          </h2>
          <p style={{ ...body, color: '#999', marginBottom: 32 }}>Upload one receipt. Save hundreds.</p>
          <Link
            href="https://app.opervo.io/settings/payments"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F5620F',
              borderRadius: 12,
              padding: '16px 32px',
              ...heading,
              color: '#fff',
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            Upload your receipt
          </Link>
          <p style={{ ...body, color: '#777', fontSize: 14, marginTop: 16 }}>
            14-day free trial. No credit card required.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
