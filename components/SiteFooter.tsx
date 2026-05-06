'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const colHeader = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 12 }
const linkStyle = { fontSize: 13, color: '#9ca3af', textDecoration: 'none' }

export default function SiteFooter() {
  const t = useTranslations('footer')

  return (
    <footer style={{ background: '#0F0F0F', borderTop: '1px solid #222', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ minWidth: 200 }}>
            <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', textDecoration: 'none', letterSpacing: '-0.5px' }}>
              Opervo<span style={{ color: '#F5620F' }}>.</span>
            </Link>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>{t('tagline')}</p>
            <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 4 }}>{t('copyright')}</p>
            <div className="footer-socials" style={{ display: 'flex', gap: 14, marginTop: 14 }}>
              <a href="https://www.instagram.com/opervo.io" target="_blank" rel="noopener" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577509469081" target="_blank" rel="noopener" aria-label="Facebook" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p style={colHeader}>{t('productHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/features" title="Opervo Features" style={linkStyle}>{t('features')}</Link>
              <Link href="/pricing" title="Opervo Pricing" style={linkStyle}>{t('pricing')}</Link>
              <Link href="/print" title="Marketing Materials" style={linkStyle}>{t('marketingMaterials')}</Link>
            </div>
          </div>

          {/* Industries */}
          <div>
            <p style={colHeader}>{t('industriesHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/solar-panel-cleaning" title="Solar Panel Cleaning Software — Opervo" style={linkStyle}>{t('solarPanelCleaning')}</Link>
              <Link href="/window-cleaning" title="Window Cleaning Software — Opervo" style={linkStyle}>{t('windowCleaning')}</Link>
              <Link href="/pressure-washing" title="Pressure Washing Software — Opervo" style={linkStyle}>{t('pressureWashing')}</Link>
              <Link href="/landscaping" title="Landscaping Software — Opervo" style={linkStyle}>{t('landscaping')}</Link>
            </div>
          </div>

          {/* Compare */}
          <div>
            <p style={colHeader}>{t('compareHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/compare/opervo-vs-jobber" title="Opervo vs Jobber — Feature Comparison" style={linkStyle}>Opervo vs Jobber</Link>
              <Link href="/compare/opervo-vs-housecall-pro" title="Opervo vs Housecall Pro — Feature Comparison" style={linkStyle}>Opervo vs Housecall Pro</Link>
              <Link href="/compare/opervo-vs-gorilladesk" title="Opervo vs GorillaDesk — Feature Comparison" style={linkStyle}>Opervo vs GorillaDesk</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={colHeader}>{t('companyHeading')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/blog" title="Opervo Blog" style={linkStyle}>{t('blog')}</Link>
              <Link href="/founder" title="The Founder" style={linkStyle}>{t('theFounder')}</Link>
              <Link href="/guide" title="Opervo Guide" style={linkStyle}>{t('guide')}</Link>
              <Link href="/apprentice" title="Opervo Apprentice" style={linkStyle}>{t('apprentice')}</Link>
              <Link href="/privacy" title="Privacy Policy" style={linkStyle}>{t('privacy')}</Link>
              <Link href="/tos" title="Terms of Service" style={linkStyle}>{t('terms')}</Link>
              <a href="https://app.opervo.io" style={linkStyle}>{t('signIn')}</a>
              <a href="https://app.opervo.io" style={{ fontSize: 13, color: '#F5620F', textDecoration: 'none', fontWeight: 600 }}>{t('startFreeTrial')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
