'use client'

import Link from 'next/link'
import { useState } from 'react'

const industries = [
  { name: 'Solar Panel Cleaning', href: '/solar-panel-cleaning' },
  { name: 'Window Cleaning', href: '/window-cleaning' },
  { name: 'Pressure Washing', href: '/pressure-washing' },
  { name: 'Landscaping', href: '/landscaping' },
  { name: 'Auto Detailing', href: '/auto-detailing' },
]

const comparisons = [
  { name: 'Opervo vs Jobber', href: '/compare/opervo-vs-jobber' },
  { name: 'Opervo vs Housecall Pro', href: '/compare/opervo-vs-housecall-pro' },
  { name: 'Opervo vs GorillaDesk', href: '/compare/opervo-vs-gorilladesk' },
  { name: 'Opervo vs Markate', href: '/compare/opervo-vs-markate' },
]

const resources = [
  { name: 'Job Profit Calculator', href: '/profit-calculator' },
  { name: 'Multi-Job Profit Tracker', href: '/multi-job-tracker' },
  { name: 'Blog', href: '/blog' },
  { name: 'Marketing Materials', href: '/print' },
  { name: 'Guide', href: '/guide' },
  { name: 'The Founder', href: '/founder' },
]

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

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
          <Link href="/features" style={navLinkStyle}>Features</Link>

          {/* Industries Dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setIndustriesOpen(true)} onMouseLeave={() => setIndustriesOpen(false)}>
            <button style={navBtnStyle}>Industries &#9662;</button>
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
            <button style={navBtnStyle}>Compare &#9662;</button>
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

          <Link href="/pricing" style={navLinkStyle}>Pricing</Link>

          {/* Resources Dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button style={navBtnStyle}>Resources &#9662;</button>
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

          <a href="https://app.opervo.io" style={navLinkStyle}>Sign In</a>
          <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>Try Free</a>
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
            Features
          </Link>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>Industries</p>
          {industries.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>Compare</p>
          {comparisons.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>Resources</p>
          {resources.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>
              {item.name}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingTop: 16, borderTop: '1px solid #E8E4DE', marginTop: 16 }}>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none' }}>Pricing</Link>
            <a href="https://app.opervo.io" style={{ fontSize: 14, fontWeight: 500, color: '#6B6B6B', textDecoration: 'none', padding: '10px 0' }}>Sign In</a>
            <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 6, textDecoration: 'none' }}>Try Free</a>
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
