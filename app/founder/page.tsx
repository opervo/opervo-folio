import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'The Founder — Opervo | Built From the Truck Up',
  description: 'Opervo was built by a solo operator who was tired of paying enterprise prices for software that never fit. This is the story behind the app.',
  alternates: { canonical: 'https://opervo.io/founder' },
  openGraph: {
    title: 'The Founder — Opervo',
    description: 'Built by someone who was on the truck. For the ones still on it.',
    url: 'https://opervo.io/founder',
    type: 'website',
  },
}

export default function FounderPage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#F7F5F2', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ padding: '100px 24px 64px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5620F', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
            THE FOUNDER
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.05, marginBottom: 24 }}>
            I BUILT THIS BECAUSE<br />
            <span style={{ color: '#F5620F' }}>NOTHING ELSE WORKED.</span>
          </h1>
          <p style={{ fontSize: 18, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            Opervo wasn't born in a boardroom. It was born on a truck, between jobs, by someone who lived this work every single day.
          </p>
        </section>

        {/* PHOTO + INTRO */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
            {/* Photo placeholder */}
            <div style={{ flex: '0 0 280px', maxWidth: 280 }}>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 16,
                background: '#E8E4DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img
                  src="/founder-photo.jpg"
                  alt="Founder of Opervo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
                  onError={undefined}
                />
              </div>
            </div>

            {/* Intro text */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 20, lineHeight: 1.15 }}>
                FROM MOWING LAWNS TO<br />BUILDING SOFTWARE
              </h2>
              <p style={{ fontSize: 16, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 16 }}>
                I started cutting grass as a kid. That was the first business. No CRM, no invoicing app. Just knocking on doors, doing the work, and collecting cash.
              </p>
              <p style={{ fontSize: 16, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 16 }}>
                Years later, I became a full-time paramedic. But the itch to build something never went away. So I started cleaning solar panels on the side. Then windows. Then pressure washing. Juggling a W-2 and a truck at the same time.
              </p>
              <p style={{ fontSize: 16, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>
                I was already spending thousands on equipment, supplies, insurance, and marketing. Then I looked at the software. Jobber wanted $49 a month. Housecall Pro, $65. And none of them were built for someone like me. One person. One truck. Trying to look professional without burning money on tools designed for 20-person crews.
              </p>
            </div>
          </div>
        </section>

        {/* THE BREAKING POINT */}
        <section style={{ background: '#0F0F0F', padding: '72px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5620F', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
              THE BREAKING POINT
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, textTransform: 'uppercase', color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              I WAS PAYING MORE FOR SOFTWARE<br />
              <span style={{ color: '#F5620F' }}>THAN FOR MY TRUCK PAYMENT.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#9ca3af', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 20 }}>
              I needed invoicing, scheduling, a way to track clients, photos for before-and-after proof, and something to help me win new work. Every tool wanted me to pay per feature, per user, per month. Stack three or four of them and you're bleeding $150+ before you've even sent your first invoice.
            </p>
            <p style={{ fontSize: 17, color: '#9ca3af', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>
              So I thought: what if there was one app that did everything a solo operator actually needs? Not enterprise features you'll never touch. Not dashboards built for office managers. Just the stuff that matters when you're the one on the truck, on the roof, in the yard.
            </p>
          </div>
        </section>

        {/* WHAT I BUILT */}
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5620F', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
            WHAT I BUILT
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 24 }}>
            ONE APP. EVERYTHING YOU NEED.<br />
            <span style={{ color: '#F5620F' }}>NOTHING YOU DON'T.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 20 }}>
            Opervo is the app I wish existed when I was running routes. Jobs, invoices, scheduling, client management, before-and-after photos, mileage tracking, expense logging, and a live portfolio page that wins you new clients while you work.
          </p>
          <p style={{ fontSize: 17, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 20 }}>
            That last part is called Folio. No other CRM has it. It's a public page at opervo.io/yourbusiness that auto-updates every time you complete a job. Clients see your real work, your reviews, and a quote request button. It's your best marketing tool and it's built in.
          </p>
          <p style={{ fontSize: 17, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>
            Solo plan is $24.99 a month. Team plan for small crews is $54.99. No per-user pricing. No feature gating. No enterprise sales calls. Just sign up and go.
          </p>
        </section>

        {/* WHO THIS IS FOR */}
        <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '72px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5620F', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>
              WHO THIS IS FOR
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 24 }}>
              IF YOU'VE EVER SENT AN INVOICE<br />
              <span style={{ color: '#F5620F' }}>FROM THE DRIVER'S SEAT.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 20 }}>
              Opervo is for the window cleaner who does 6 houses before lunch. The pressure washer booking jobs off Instagram. The solar panel tech driving 200 miles a week between appointments. The landscaper who started mowing lawns as a teenager and turned it into a real business.
            </p>
            <p style={{ fontSize: 17, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>
              If you're a solo operator or running a small crew, you deserve software that respects your time, your budget, and the way you actually work. That's what this is.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 16 }}>
            BUILT BY SOMEONE WHO WAS ON THE TRUCK.<br />
            <span style={{ color: '#F5620F' }}>FOR THE ONES STILL ON IT.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            30-day free trial. No credit card required. Set up in minutes.
          </p>
          <Link
            href="https://app.opervo.io"
            style={{
              display: 'inline-block',
              background: '#F5620F',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              textTransform: 'uppercase',
              padding: '16px 40px',
              borderRadius: 6,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            START FREE TRIAL
          </Link>
        </section>

      </main>
      <SiteFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        @media (max-width: 768px) {
          h1 { font-size: 36px !important; }
          h2 { font-size: 28px !important; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Founder of Opervo',
            jobTitle: 'Founder & CEO',
            worksFor: {
              '@type': 'Organization',
              name: 'Opervo',
              url: 'https://opervo.io',
            },
            description: 'Solo operator turned software founder. Built Opervo for the trades.',
          }),
        }}
      />
    </>
  )
}
