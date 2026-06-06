'use client'

import Link from 'next/link'

// JC Air Pro Pro Site preview — tightened.
//
// Direction from Max: show the whole site (imagery sells), advertise no
// page limit + full SEO for whatever the operator needs, drop the
// "how it's wired up" tech talk, keep things simple.

const NAVY = '#001a4a'
const NAVY_MID = '#002f87'
const RED = '#c8102e'
const RED_DARK = '#a40d24'
const SUN = '#fbc63a'
const INK = '#0a0a0a'
const INK_SOFT = '#1f1f1f'
const MUTED = '#5f6368'
const LINE = '#e5e2dc'
const BG_SOFT = '#f7f5f2'

const OPERVO_ORANGE = '#F5620F'

// Iframe src for the live JC Air Pro site. Default: the Vercel interim
// deploy at jc-air-pro.vercel.app. Swap to Emilio's real domain when his
// hosting is up. Override per-env via NEXT_PUBLIC_JC_AIR_PRO_URL.
const JC_URL =
  process.env.NEXT_PUBLIC_JC_AIR_PRO_URL || 'https://jc-air-pro.vercel.app'

// (Static screenshot tour replaced by the live iframe embed in the hero.)

export default function Preview() {
  return (
    <div
      style={{
        background: BG_SOFT,
        minHeight: '100vh',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
        color: INK,
      }}
    >
      {/* Top status bar */}
      <div
        style={{
          background: '#0F0F0F',
          color: '#fff',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 0.2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: OPERVO_ORANGE,
              color: '#fff',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.25)' }} />
            Pro Site Case Study
          </span>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>JC Air Pro · HVAC, DFW</span>
        </div>
        <Link
          href="/sites"
          style={{
            color: '#fff',
            textDecoration: 'none',
            borderBottom: '1px dotted rgba(255,255,255,0.4)',
            fontSize: 12,
          }}
        >
          ← Back to portfolio
        </Link>
      </div>

      {/* ── Tight intro ── */}
      <section style={{ padding: '56px 24px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 16px',
              color: INK,
              maxWidth: 920,
            }}
          >
            This is what an Opervo Pro Site looks like.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: INK_SOFT,
              maxWidth: 760,
              margin: '0 0 22px',
            }}
          >
            Built for an HVAC contractor in DFW. Same approach for any home
            service trade. Scroll the screens below.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/sites#pricing"
              style={{
                background: OPERVO_ORANGE,
                color: '#fff',
                padding: '12px 20px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 24px -10px rgba(245,98,15,0.5)',
              }}
            >
              Get a build like this · from $39.99/mo
              <ArrowGlyph color="#fff" />
            </Link>
            <Link
              href="/sites"
              style={{
                background: 'transparent',
                color: INK,
                border: '1.5px solid ' + LINE,
                padding: '12px 20px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero: live, scrollable embed of the real site ── */}
      <section style={{ padding: '16px 24px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <BrowserFrame domain="jcairpro.com">
            <div style={{ position: 'relative', background: '#fff' }}>
              <iframe
                src={JC_URL}
                title="JC Air Pro — live Pro Site preview"
                style={{
                  width: '100%',
                  height: 'min(1200px, 85vh)',
                  border: 'none',
                  display: 'block',
                  background: '#fff',
                }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </BrowserFrame>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14,
              fontSize: 13,
              color: MUTED,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <span>Live site, embedded. Scroll inside the frame to walk through every section.</span>
            <a
              href={JC_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: NAVY,
                fontWeight: 700,
                textDecoration: 'none',
                borderBottom: '1px dotted ' + NAVY,
              }}
            >
              Open in a new tab ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Unlimited pages · full SEO ── */}
      <section style={{ padding: '40px 24px 8px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: OPERVO_ORANGE,
            }}
          >
            No page limit. Full SEO.
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '8px 0 14px',
              color: INK,
              maxWidth: 880,
            }}
          >
            One page per service. One page per city. One page per anything
            you want to rank for.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: INK_SOFT, maxWidth: 820, margin: 0 }}>
            Service pages, location pages, blog posts, FAQs, landing pages for
            a Facebook ad. Whatever your business needs Google to find, we
            build it. No tier walls, no per-page upcharges.
          </p>

          <div
            style={{
              marginTop: 28,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16,
            }}
            className="stat-grid"
          >
            <Tile big="Unlimited" sub="Pages" />
            <Tile big="Every page" sub="SEO-tuned" />
            <Tile big="Every page" sub="Schema-ready" />
            <Tile big="Every page" sub="Mobile-first" />
          </div>
        </div>
      </section>


      {/* ── What you get (short) ── */}
      <section style={{ padding: '64px 24px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: OPERVO_ORANGE,
            }}
          >
            What you get
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '8px 0 32px',
              color: INK,
            }}
          >
            Built right, written like you talk, ready to rank.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 18,
            }}
            className="feature-grid"
          >
            <FeatureCard title="Real copy in your voice" body="No template stuffing. We write your site to sound like you actually talk to customers." />
            <FeatureCard title="Photos that sell" body="Your truck. Your team. Real jobs. We feature them where buyers expect to see them." />
            <FeatureCard title="Form-first conversion" body="A lead form right after the hero, on a bold background. Most leads come from here." />
            <FeatureCard title="Reviews on the page" body="Your Google reviews shown on the site and wired into schema for star ratings in search." />
            <FeatureCard title="Branded share previews" body="Paste your URL in iMessage or Slack — it shows your wordmark, phone, and stars." />
            <FeatureCard title="GBP walkthrough included" body="A clear playbook for claiming Google Business Profile. The biggest local-SEO move, ready to hand off." />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: '64px 24px 80px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            background:
              'linear-gradient(135deg, ' + NAVY + ' 0%, ' + NAVY_MID + ' 45%, ' + RED_DARK + ' 100%)',
            color: '#fff',
            borderRadius: 20,
            padding: 'clamp(36px, 5vw, 56px) clamp(28px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(40% 60% at 0% 0%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(40% 60% at 100% 100%, rgba(0,0,0,0.25), transparent 60%)',
            }}
          />
          <span
            style={{
              position: 'relative',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: SUN,
            }}
          >
            Want a Pro Site like this?
          </span>
          <h3
            style={{
              position: 'relative',
              fontSize: 'clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: 0,
              maxWidth: 800,
            }}
          >
            $39.99/mo hosted, or $499 once to own it.
          </h3>
          <p
            style={{
              position: 'relative',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 720,
              margin: 0,
            }}
          >
            30-day delivery. Custom domain included. Cancel anytime. Same level
            of polish you just scrolled through, dialed to your trade and your
            brand.
          </p>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              gap: 12,
              marginTop: 8,
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/sites#pricing"
              style={{
                background: '#fff',
                color: NAVY,
                padding: '14px 22px',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 24px -10px rgba(0,0,0,0.3)',
              }}
            >
              See pricing
              <ArrowGlyph color={NAVY} />
            </Link>
            <Link
              href="/sites#contact"
              style={{
                background: SUN,
                color: NAVY,
                padding: '14px 22px',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 10px 24px -10px rgba(251,198,58,0.5)',
              }}
            >
              Start a build
              <ArrowGlyph color={NAVY} />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .stat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .feature-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .stat-grid,
          .feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── Small primitives ─── */

function BrowserFrame({
  domain,
  children,
}: {
  domain: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 30px 80px -28px rgba(0,26,74,0.35), 0 10px 28px -10px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          background: '#f1f3f5',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        <span
          style={{
            marginLeft: 16,
            flex: 1,
            background: '#fff',
            border: '1px solid #e1e4e8',
            borderRadius: 7,
            padding: '6px 14px',
            fontSize: 12,
            color: '#5f6368',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <LockIcon />
          <span style={{ color: '#202124' }}>{domain}</span>
        </span>
      </div>
      <div style={{ background: '#fff' }}>{children}</div>
    </div>
  )
}

function Tile({ big, sub }: { big: string; sub: string }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid ' + LINE,
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: NAVY,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: RED,
          marginTop: 6,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
        }}
      >
        {sub}
      </div>
    </div>
  )
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid ' + LINE,
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          width: 32,
          height: 32,
          borderRadius: 10,
          background: 'rgba(0,47,135,0.08)',
          color: NAVY,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        ✓
      </div>
      <div style={{ fontSize: 16, fontWeight: 900, color: NAVY, marginTop: 14 }}>{title}</div>
      <div style={{ fontSize: 14, color: INK_SOFT, marginTop: 8, lineHeight: 1.55 }}>{body}</div>
    </div>
  )
}

function ArrowGlyph({ color = '#fff' }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5f6368"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
