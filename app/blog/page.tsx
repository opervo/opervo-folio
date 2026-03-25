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
  {
    slug: 'best-crm-for-solo-contractors',
    category: 'COMPARISONS',
    title: 'Best CRM for Solo Contractors (2026) — 5 Options Ranked',
    excerpt: 'The 5 best CRMs for solo contractors, ranked by price, features, and ease of use.',
    date: 'March 22, 2026',
  },
  {
    slug: 'how-to-run-service-business-from-phone',
    category: 'GUIDES',
    title: 'How to Run a Service Business Entirely From Your Phone',
    excerpt: 'You don\'t need an office or a laptop. Here\'s how to run your entire business from your phone.',
    date: 'March 21, 2026',
  },
  {
    slug: 'how-to-schedule-recurring-jobs',
    category: 'BUSINESS TIPS',
    title: 'How to Schedule Recurring Jobs Efficiently',
    excerpt: 'Stop manually rebooking the same clients. Set up recurring jobs that auto-schedule and auto-invoice.',
    date: 'March 20, 2026',
  },
  {
    slug: 'best-apps-for-window-cleaning-businesses',
    category: 'COMPARISONS',
    title: 'Best Apps for Window Cleaning Businesses (2026)',
    excerpt: 'The 5 best apps for window cleaners — pricing, features, and which one fits your business.',
    date: 'March 19, 2026',
  },
  {
    slug: 'jobber-vs-housecall-pro-vs-opervo',
    category: 'COMPARISONS',
    title: 'Jobber vs Housecall Pro vs Opervo (2026)',
    excerpt: 'The 3 most popular field service apps compared. Pricing, features, and which fits your size.',
    date: 'March 18, 2026',
  },
  {
    slug: 'do-small-contractors-need-crm',
    category: 'BUSINESS TIPS',
    title: 'Do Small Contractors Need a CRM? (Honest Answer)',
    excerpt: 'Honest answer — plus what to look for if you decide to get one.',
    date: 'March 17, 2026',
  },
  {
    slug: 'how-to-send-invoices-in-the-field',
    category: 'BUSINESS TIPS',
    title: 'How to Send Invoices in the Field (Get Paid Same Day)',
    excerpt: 'Stop waiting to get home. Invoice clients on-site from your phone and get paid the same day.',
    date: 'March 16, 2026',
  },
  {
    slug: 'best-software-for-pressure-washing-businesses',
    category: 'COMPARISONS',
    title: 'Best Software for Pressure Washing Businesses (2026)',
    excerpt: 'The 5 best apps for pressure washers — ranked by price, features, and fit.',
    date: 'March 15, 2026',
  },
  {
    slug: 'how-to-grow-small-service-business',
    category: 'GUIDES',
    title: 'How to Grow a Small Service Business (From Solo to Crew)',
    excerpt: 'Practical strategies to grow from solo to crew — pricing, hiring, systems, and tools.',
    date: 'March 14, 2026',
  },
  {
    slug: 'best-software-for-landscaping-businesses',
    category: 'COMPARISONS',
    title: 'Best Software for Landscaping Businesses (2026)',
    excerpt: 'The 5 best apps for landscapers and lawn care pros — pricing, features, and which fits.',
    date: 'March 13, 2026',
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
