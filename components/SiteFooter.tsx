import Link from 'next/link'

const colHeader = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F7F5F2', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 12 }
const linkStyle = { fontSize: 13, color: '#9ca3af', textDecoration: 'none' }

export default function SiteFooter() {
  return (
    <footer style={{ background: '#0F0F0F', borderTop: '1px solid #222', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ minWidth: 200 }}>
            <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2', textDecoration: 'none', letterSpacing: '-0.5px' }}>
              Opervo<span style={{ color: '#F5620F' }}>.</span>
            </Link>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>Look pro. Win jobs.</p>
            <p style={{ fontSize: 12, color: '#6B6B6B', marginTop: 4 }}>Built for the trades. &copy; 2026 Opervo.</p>
          </div>

          {/* Product */}
          <div>
            <p style={colHeader}>Product</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/features" title="Opervo Features" style={linkStyle}>Features</Link>
              <Link href="/pricing" title="Opervo Pricing" style={linkStyle}>Pricing</Link>
              <Link href="/print" title="Marketing Materials" style={linkStyle}>Marketing Materials</Link>
            </div>
          </div>

          {/* Industries */}
          <div>
            <p style={colHeader}>Software for Your Trade</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/solar-panel-cleaning" title="Solar Panel Cleaning Software — Opervo" style={linkStyle}>Solar Panel Cleaning</Link>
              <Link href="/window-cleaning" title="Window Cleaning Software — Opervo" style={linkStyle}>Window Cleaning</Link>
              <Link href="/pressure-washing" title="Pressure Washing Software — Opervo" style={linkStyle}>Pressure Washing</Link>
              <Link href="/landscaping" title="Landscaping Software — Opervo" style={linkStyle}>Landscaping</Link>
            </div>
          </div>

          {/* Compare */}
          <div>
            <p style={colHeader}>Compare</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/compare/opervo-vs-jobber" title="Opervo vs Jobber — Feature Comparison" style={linkStyle}>Opervo vs Jobber</Link>
              <Link href="/compare/opervo-vs-housecall-pro" title="Opervo vs Housecall Pro — Feature Comparison" style={linkStyle}>Opervo vs Housecall Pro</Link>
              <Link href="/compare/opervo-vs-gorilladesk" title="Opervo vs GorillaDesk — Feature Comparison" style={linkStyle}>Opervo vs GorillaDesk</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={colHeader}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/blog" title="Opervo Blog" style={linkStyle}>Blog</Link>
              <Link href="/guide" title="Opervo Guide" style={linkStyle}>Guide</Link>
              <Link href="/privacy" title="Privacy Policy" style={linkStyle}>Privacy</Link>
              <Link href="/tos" title="Terms of Service" style={linkStyle}>Terms</Link>
              <a href="https://app.opervo.io" style={linkStyle}>Sign In</a>
              <a href="https://app.opervo.io" style={{ fontSize: 13, color: '#F5620F', textDecoration: 'none', fontWeight: 600 }}>Start Free Trial &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
