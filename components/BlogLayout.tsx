import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

interface BlogLayoutProps {
  title: string
  category: string
  date: string
  readTime: string
  children: React.ReactNode
}

export default function BlogLayout({ title, category, date, readTime, children }: BlogLayoutProps) {
  return (
    <div style={{ background: '#F7F5F2', minHeight: '100vh' }}>
      <SiteNav />

      {/* Blog Header */}
      <header style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 0', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#F5620F',
          letterSpacing: '0.14em',
          marginBottom: 12,
        }}>
          {category}
        </p>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: 'clamp(28px, 5vw, 40px)',
          lineHeight: 1.1,
          color: '#0F0F0F',
          margin: '0 0 16px',
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: 14,
          color: '#6B6B6B',
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 400,
        }}>
          Max Ballesteros, Founder &middot; {date} &middot; {readTime} min read
        </p>
      </header>

      {/* Content Area */}
      <article className="blog-content" style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 64px' }}>
        {children}
      </article>

      {/* Author Box */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ borderTop: '1px solid #E8E4DE', paddingTop: 24 }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, color: '#0F0F0F', margin: '0 0 4px' }}>
            Max Ballesteros
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: 14, color: '#6B6B6B', margin: 0 }}>
            Founder, Opervo
          </p>
        </div>
      </div>

      {/* CTA Band */}
      <section style={{ background: '#0F0F0F', padding: '56px 24px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: 'clamp(24px, 4vw, 36px)',
          color: '#F7F5F2',
          margin: '0 0 12px',
        }}>
          READY TO LOOK PRO?
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', margin: '0 0 24px', fontFamily: "'Barlow', sans-serif" }}>
          Start free — 14 days, no credit card.
        </p>
        <a
          href="https://app.opervo.io"
          style={{
            display: 'inline-block',
            background: '#F5620F',
            color: '#fff',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 32px',
            borderRadius: 6,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          Start Free Trial &rarr;
        </a>
      </section>

      {/* Explore More */}
      <section style={{ background: '#F7F5F2', padding: '48px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#F5620F',
            letterSpacing: '0.14em',
            marginBottom: 16,
          }}>
            Explore More
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { title: 'All Features', desc: 'See everything Opervo can do', href: '/features' },
              { title: 'Pricing', desc: 'Plans starting at $24.99/mo', href: '/pricing' },
              { title: 'Marketing Materials', desc: 'Business cards, door hangers & more', href: '/print' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid #E8E4DE',
                  borderRadius: 10,
                  padding: '16px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <strong style={{ display: 'block', fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 4 }}>
                  {item.title}
                </strong>
                <span style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif" }}>
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .blog-content h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 22px;
          text-transform: uppercase;
          color: #0F0F0F;
          margin: 40px 0 16px;
          line-height: 1.2;
        }
        .blog-content h3 {
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #1a1a1a;
          margin: 32px 0 12px;
          line-height: 1.3;
        }
        .blog-content p {
          font-size: 16px;
          line-height: 1.7;
          color: #1a1a1a;
          margin-bottom: 20px;
          font-family: 'Barlow', sans-serif;
        }
        .blog-content blockquote {
          border-left: 3px solid #F5620F;
          padding-left: 20px;
          font-style: italic;
          color: #6B6B6B;
          margin: 24px 0;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 24px;
          margin-bottom: 20px;
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: #1a1a1a;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content a {
          color: #F5620F;
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
        }
        .blog-content th, .blog-content td {
          padding: 12px 16px;
          border-bottom: 1px solid #E8E4DE;
          text-align: left;
          color: #1a1a1a;
        }
        .blog-content th {
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          color: #6B6B6B;
          letter-spacing: 0.04em;
        }
        .blog-content strong {
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
