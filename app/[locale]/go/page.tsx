import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opervo — The One App for Trade Operators',
  description: 'Jobs, invoices, estimates, scheduling, and a free portfolio page. 14-day free trial, no card required.',
  openGraph: {
    title: 'Opervo — The One App for Trade Operators',
    description: 'Jobs, invoices, estimates, scheduling, and a free portfolio page. 14-day free trial, no card required.',
    url: 'https://www.opervo.io/go',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const LINKS = [
  {
    label: 'Start Free Trial',
    sub: '14 days free. No card required.',
    href: 'https://app.opervo.io/#/signup',
    primary: true,
  },
  {
    label: 'See What It Does',
    sub: 'Features overview',
    href: 'https://www.opervo.io/features',
  },
  {
    label: 'Compare vs Jobber',
    sub: 'Save $30+/mo on day one',
    href: 'https://www.opervo.io/compare/opervo-vs-jobber',
  },
  {
    label: 'Compare vs Housecall Pro',
    sub: 'More features, less money',
    href: 'https://www.opervo.io/compare/opervo-vs-housecall-pro',
  },
  {
    label: 'Pricing',
    sub: 'Solo $24.99 / Team $54.99',
    href: 'https://www.opervo.io/pricing',
  },
  {
    label: 'Download on iOS',
    sub: 'App Store',
    href: 'https://apps.apple.com/app/opervo/id6744257728',
  },
  {
    label: 'Download on Android',
    sub: 'Google Play (Beta)',
    href: 'https://play.google.com/store/apps/details?id=io.opervo.app',
  },
]

export default function GoPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 20px 64px',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: '42px',
        color: '#F7F5F2',
        letterSpacing: '-0.5px',
        marginBottom: '8px',
      }}>
        Opervo<span style={{ color: '#F5620F' }}>.</span>
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: '16px',
        color: '#6B6B6B',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '12px',
      }}>
        Built for the truck
      </p>

      {/* One-liner */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: '15px',
        color: '#A0A0A0',
        textAlign: 'center',
        maxWidth: '320px',
        lineHeight: '1.5',
        marginBottom: '36px',
      }}>
        Jobs, invoices, estimates, scheduling, and a free portfolio page — all in one app. Built by a window cleaner.
      </p>

      {/* Links */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '380px',
      }}>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: '12px',
              background: link.primary ? '#F5620F' : '#1a1a1a',
              border: link.primary ? 'none' : '1px solid #2a2a2a',
              textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              color: link.primary ? '#FFFFFF' : '#F7F5F2',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {link.label}
            </div>
            <div style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '13px',
              color: link.primary ? 'rgba(255,255,255,0.8)' : '#6B6B6B',
              marginTop: '2px',
            }}>
              {link.sub}
            </div>
          </a>
        ))}
      </div>

      {/* Founder note */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        borderRadius: '12px',
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        maxWidth: '380px',
        width: '100%',
      }}>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: '14px',
          color: '#A0A0A0',
          lineHeight: '1.6',
          textAlign: 'center',
        }}>
          &ldquo;I built Opervo because I was tired of paying $50/mo for software that wasn&rsquo;t built for people like me — solo operators actually on the truck.&rdquo;
        </p>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          color: '#F5620F',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center',
          marginTop: '8px',
        }}>
          — Max, Founder
        </p>
      </div>

      {/* Footer */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: '12px',
        color: '#444',
        marginTop: '32px',
      }}>
        opervo.io
      </p>
    </div>
  )
}
