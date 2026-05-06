'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function SiteNav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const industries = [
    { name: t('industries.solarPanelCleaning'), href: '/solar-panel-cleaning' as const },
    { name: t('industries.windowCleaning'), href: '/window-cleaning' as const },
    { name: t('industries.pressureWashing'), href: '/pressure-washing' as const },
    { name: t('industries.landscaping'), href: '/landscaping' as const },
    { name: t('industries.autoDetailing'), href: '/auto-detailing' as const },
  ]

  const comparisons = [
    { name: 'Opervo vs Jobber', href: '/compare/opervo-vs-jobber' as const },
    { name: 'Opervo vs Housecall Pro', href: '/compare/opervo-vs-housecall-pro' as const },
    { name: 'Opervo vs GorillaDesk', href: '/compare/opervo-vs-gorilladesk' as const },
    { name: 'Opervo vs Markate', href: '/compare/opervo-vs-markate' as const },
    { name: 'Opervo vs ServiceWizard', href: '/compare/servicewizard' as const },
  ]

  const resources = [
    { name: t('resources.trueCostCalculator'), href: '/cost-calculator' as const },
    { name: t('resources.jobProfitCalculator'), href: '/profit-calculator' as const },
    { name: t('resources.multiJobTracker'), href: '/multi-job-tracker' as const },
    { name: t('resources.blog'), href: '/blog' as const },
    { name: t('resources.marketingMaterials'), href: '/print' as const },
    { name: t('resources.guide'), href: '/guide' as const },
    { name: t('resources.theFounder'), href: '/founder' as const },
    { name: t('resources.apprentice'), href: '/apprentice' as const },
  ]

  const otherLocale = locale === 'en' ? 'es' : 'en'
  const otherLocaleLabel = locale === 'en' ? 'ES' : 'EN'

  const dropdownStyle = { position: 'absolute' as const, top: '100%', left: -8, background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '8px 0', minWidth: 220, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
  const dropdownLinkStyle = { display: 'block', padding: '10px 16px', fontSize: 14, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' } as const
  const navLinkStyle = { fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none' } as const
  const navBtnStyle = { fontSize: 14, fontWeight: 500, color: '#6B6B6B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", padding: '4px 0' } as const

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #E8E4DE', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Opervo<span style={{ color: '#F5620F' }}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
          <Link href="/features" style={navLinkStyle}>{t('features')}</Link>

          {/* Industries Dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setIndustriesOpen(true)} onMouseLeave={() => setIndustriesOpen(false)}>
            <button style={navBtnStyle}>{t('industriesLabel')} &#9662;</button>
            {industriesOpen && (
              <div style={dropdownStyle}>
                {industries.map((item) => (
                  <Link key={item.href} href={item.href} title={`${item.name} Software — Opervo`} style={dropdownLinkStyle}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(245,98,15,0.06)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Compare Dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setCompareOpen(true)} onMouseLeave={() => setCompareOpen(false)}>
            <button style={navBtnStyle}>{t('compareLabel')} &#9662;</button>
            {compareOpen && (
              <div style={dropdownStyle}>
                {comparisons.map((item) => (
                  <Link key={item.href} href={item.href} title={item.name} style={dropdownLinkStyle}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(245,98,15,0.06)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/pricing" style={navLinkStyle}>{t('pricing')}</Link>

          {/* Resources Dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button style={navBtnStyle}>{t('resourcesLabel')} &#9662;</button>
            {resourcesOpen && (
              <div style={dropdownStyle}>
                {resources.map((item) => (
                  <Link key={item.href} href={item.href} title={item.name} style={dropdownLinkStyle}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(245,98,15,0.06)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="https://app.opervo.io" style={navLinkStyle}>{t('signIn')}</a>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>{t('tryFree')}</a>
          <a href={`/${otherLocale}`} style={{ fontSize: 13, fontWeight: 700, color: '#6B6B6B', textDecoration: 'none', padding: '4px 8px', border: '1px solid #E8E4DE', borderRadius: 4 }}>{otherLocaleLabel}</a>
        </nav>

        {/* Mobile Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="mobile-nav" style={{ padding: '16px 0 8px', borderTop: '1px solid #E8E4DE', marginTop: 16 }}>
          <Link href="/features" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 600, color: '#0F0F0F', textDecoration: 'none' }}>
            {t('features')}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>{t('industriesLabel')}</p>
          {industries.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>{t('compareLabel')}</p>
          {comparisons.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>{t('resourcesLabel')}</p>
          {resources.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingTop: 16, borderTop: '1px solid #E8E4DE', marginTop: 16 }}>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>{t('pricing')}</Link>
            <a href="https://app.opervo.io" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none', padding: '10px 0' }}>{t('signIn')}</a>
            <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none' }}>{t('tryFree')}</a>
            <a href={`/${otherLocale}`} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 700, color: '#6B6B6B', textDecoration: 'none' }}>{otherLocaleLabel === 'ES' ? 'Espanol' : 'English'}</a>
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
