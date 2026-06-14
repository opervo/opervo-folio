import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

// Swap this with your real Google Calendar appointment-scheduling URL
// (Calendar → Create → Appointment schedule → public booking link).
export const DEMO_BOOKING_URL = 'https://calendar.app.google/2KuCvGVUmv9cEcvo8'

export const metadata: Metadata = {
  title: 'Book a 15-min walkthrough with the founder | Opervo',
  description:
    "Get on a quick call with Max — see Opervo on your data, ask anything, and walk away with a configured account. Switching from another CRM? We'll migrate it for you.",
  alternates: { canonical: 'https://www.opervo.io/demo' },
  openGraph: {
    title: 'Book a 15-min walkthrough | Opervo',
    description:
      "Founder-led demo. See Opervo on your data. Switching CRMs? We'll migrate it for you.",
    url: 'https://www.opervo.io/demo',
    type: 'website',
  },
}

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

const COVERED = [
  {
    title: 'See Opervo on your data',
    body: "Bring a real client, a real job, a real invoice. We'll wire it up live so you know it fits how you work — not a generic demo account.",
  },
  {
    title: 'Get your account configured',
    body: 'Services, tax rate, folio basics, payment connection, branded invoice template. By the end of the call your account is ready to send to a real customer.',
  },
  {
    title: 'Free migration if you’re switching',
    body: "Coming from Jobber, Housecall Pro, GorillaDesk, a spreadsheet, or anything else? Send your export — clients and services land in your account by next business day. No re-typing.",
  },
  {
    title: 'Honest answers',
    body: "What Opervo does, what it doesn't, where we're still rough. If it's not the right fit I'll say so on the call.",
  },
]

const FAQ = [
  {
    q: 'How long is it?',
    a: '15 minutes is the slot. If we need more time and you want it, we keep going. Most calls run 20–30 min.',
  },
  {
    q: 'Who am I talking to?',
    a: "Max — the founder. I built Opervo on the truck between jobs. I'm the one who'll answer your support emails too.",
  },
  {
    q: 'What about the data migration?',
    a: 'Send me your last export from your current CRM (CSV, screenshot, or just a billing portal share). I’ll import your clients and services into your account by the next business day. Free, no catch.',
  },
  {
    q: "What if I'm not switching from anywhere?",
    a: "Even better — bring a list of services and a couple of clients. We'll set up your account live so you can text your first invoice that day.",
  },
  {
    q: "Do I have to pay first?",
    a: 'No. The walkthrough is free during your 14-day trial. If you already subscribed, this is just included.',
  },
]

export default function DemoPage() {
  return (
    <div style={{ ...body, background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <SiteNav />
      <main>
        {/* HERO */}
        <section
          style={{
            background: '#0F0F0F',
            color: '#fff',
            padding: '112px 24px 72px',
            textAlign: 'center',
          }}
        >
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
            Founder-led · 15 min · free
          </span>

          <h1
            style={{
              ...heading,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.05,
              marginBottom: 20,
              maxWidth: 640,
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#fff',
            }}
          >
            Get on the truck with the founder.<br />
            <span style={{ color: '#F5620F' }}>Walk away ready.</span>
          </h1>

          <p
            style={{
              ...body,
              color: '#b0aaa0',
              fontSize: 17,
              maxWidth: 540,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            15 minutes with Max. We&apos;ll set up your account on your real data
            — services, payments, folio, first invoice. Switching from another
            CRM? We&apos;ll migrate your clients and services for you.
          </p>

          <a
            href={DEMO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            Book my walkthrough
          </a>
          <p style={{ ...body, color: '#777', fontSize: 14, marginTop: 16 }}>
            3 slots a day. Pick one that fits.
          </p>
        </section>

        {/* WHAT WE'LL COVER */}
        <section
          style={{
            background: '#F7F5F2',
            padding: '72px 24px',
            maxWidth: 880,
            margin: '0 auto',
          }}
        >
          <p
            style={{
              ...heading,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#F5620F',
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            On the call
          </p>
          <h2
            style={{
              ...heading,
              fontSize: 'clamp(28px, 4vw, 36px)',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            What you actually get.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {COVERED.map((c) => (
              <div
                key={c.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E4DE',
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3 style={{ ...heading, fontSize: 18, marginBottom: 8 }}>
                  {c.title}
                </h3>
                <p
                  style={{
                    ...body,
                    color: '#6B6B6B',
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CONCIERGE MIGRATION CALLOUT */}
        <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '56px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                ...heading,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.15em',
                color: '#F5620F',
                marginBottom: 8,
              }}
            >
              Switching from another CRM?
            </p>
            <h2
              style={{
                ...heading,
                fontSize: 'clamp(24px, 4vw, 32px)',
                marginBottom: 16,
              }}
            >
              We&apos;ll move your data for you.
            </h2>
            <p
              style={{
                ...body,
                fontSize: 16,
                color: '#1a1a1a',
                lineHeight: 1.65,
                maxWidth: 560,
                margin: '0 auto 24px',
              }}
            >
              Send your last export — Jobber CSV, Housecall Pro download,
              GorillaDesk backup, even a screenshot of your client list. Your
              clients and services land in your Opervo account by next
              business day. You don&apos;t re-type anything.
            </p>
            <a
              href={DEMO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#0F0F0F',
                borderRadius: 12,
                padding: '14px 28px',
                ...heading,
                color: '#fff',
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
            >
              Book your migration handoff
            </a>
            <p style={{ ...body, fontSize: 13, color: '#6B6B6B', marginTop: 14 }}>
              Pair it with{' '}
              <Link href="/switch" style={{ color: '#F5620F', fontWeight: 600 }}>
                Switch &amp; Save
              </Link>{' '}
              for 50% off your first 3 months.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            background: '#F7F5F2',
            padding: '72px 24px',
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              ...heading,
              fontSize: 'clamp(24px, 4vw, 32px)',
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            Questions before you book.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((f) => (
              <details
                key={f.q}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E4DE',
                  borderRadius: 12,
                  padding: '16px 20px',
                }}
              >
                <summary
                  style={{
                    ...heading,
                    fontSize: 16,
                    cursor: 'pointer',
                    listStyle: 'none',
                  }}
                >
                  {f.q}
                </summary>
                <p
                  style={{
                    ...body,
                    color: '#6B6B6B',
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginTop: 12,
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: '#0F0F0F', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
          <h2
            style={{
              ...heading,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#fff',
              marginBottom: 16,
            }}
          >
            One call. Account live.
          </h2>
          <p style={{ ...body, color: '#b0aaa0', fontSize: 16, maxWidth: 480, margin: '0 auto 28px' }}>
            3 slots a day, first-come. Pick whichever fits your route.
          </p>
          <a
            href={DEMO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            Book my walkthrough
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
