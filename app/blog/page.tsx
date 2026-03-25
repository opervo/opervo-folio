import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Blog — Field Service Business Tips & Guides | Opervo',
  description: 'Practical guides, pricing breakdowns, and business tips for solo contractors and small field service crews. Learn how to win more jobs and run your trade like a pro.',
  alternates: { canonical: 'https://opervo.io/blog' },
  openGraph: {
    title: 'Blog — Field Service Business Tips & Guides | Opervo',
    description: 'Practical guides, pricing breakdowns, and business tips for solo contractors and small field service crews.',
    url: 'https://opervo.io/blog',
    type: 'website',
  },
}

const posts = [
  {
    slug: 'field-service-software-pricing-guide',
    category: 'PRICING',
    title: 'Field Service Software Pricing Guide (2026)',
    excerpt: 'What does field service software actually cost? We break down pricing for Opervo, Jobber, Housecall Pro, and GorillaDesk.',
    date: 'March 20, 2026',
  },
  {
    slug: 'how-to-start-solar-panel-cleaning-business',
    category: 'GUIDES',
    title: 'How to Start a Solar Panel Cleaning Business in 2026',
    excerpt: 'Equipment costs, pricing strategies, finding clients, and the software to run it all.',
    date: 'March 18, 2026',
  },
  {
    slug: 'free-estimate-template-home-service-business',
    category: 'TEMPLATES',
    title: 'Free Estimate Template for Home Service Businesses',
    excerpt: 'What to include in a professional estimate and how to send one from your phone in 60 seconds.',
    date: 'March 15, 2026',
  },
  {
    slug: 'cheapest-field-service-management-software',
    category: 'COMPARISONS',
    title: 'The 7 Cheapest Field Service Management Software Options',
    excerpt: 'Ranked by actual cost. See what you get at every price point and which hidden fees to watch for.',
    date: 'March 12, 2026',
  },
  {
    slug: 'how-to-look-professional-solo-contractor',
    category: 'BUSINESS TIPS',
    title: 'How to Look Professional as a Solo Contractor',
    excerpt: '7 proven ways to build trust, win more jobs, and charge more — without spending a fortune.',
    date: 'March 10, 2026',
  },
]

export default function BlogIndex() {
  return (
    <div style={{ background: '#F7F5F2', minHeight: '100vh' }}>
      <SiteNav />

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 72px' }}>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: '#0F0F0F',
          margin: '0 0 8px',
          textAlign: 'center',
        }}>
          THE OPERVO BLOG
        </h1>
        <p style={{
          fontSize: 16,
          color: '#6B6B6B',
          textAlign: 'center',
          margin: '0 auto 48px',
          maxWidth: 520,
          fontFamily: "'Barlow', sans-serif",
          lineHeight: 1.6,
        }}>
          Practical guides, pricing breakdowns, and business tips for solo contractors and small field service crews.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {posts.map((post) => (
            <div key={post.slug} style={{
              background: '#fff',
              border: '1px solid #E8E4DE',
              borderRadius: 8,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#F5620F',
                letterSpacing: '0.14em',
                marginBottom: 8,
              }}>
                {post.category}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                title={post.title}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#0F0F0F',
                  textDecoration: 'none',
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                {post.title}
              </Link>
              <p style={{
                fontSize: 14,
                color: '#6B6B6B',
                lineHeight: 1.5,
                fontFamily: "'Barlow', sans-serif",
                margin: '0 0 16px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1,
              }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif" }}>
                  {post.date}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  title={`Read: ${post.title}`}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#F5620F',
                    textDecoration: 'none',
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  Read more &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
