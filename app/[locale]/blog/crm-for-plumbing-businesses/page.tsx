import type { Metadata } from 'next'
import Link from 'next/link'
import BlogLayout from '@/components/BlogLayout'
import { crmRelated } from '@/lib/crmRelated'

export const metadata: Metadata = {
  title: 'CRM for Plumbing Businesses | Opervo',
  description: "Opervo helps smaller plumbing businesses centralize the admin side of the business so they can stay responsive and organized without extra overhead.",
  alternates: { canonical: 'https://www.opervo.io/blog/crm-for-plumbing-businesses' },
  openGraph: {
    title: 'CRM for Plumbing Businesses | Opervo',
    description: "Opervo helps smaller plumbing businesses centralize the admin side of the business so they can stay responsive and organized without extra overhead.",
    url: 'https://www.opervo.io/blog/crm-for-plumbing-businesses',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CRM for Plumbing Businesses: Improve Follow Up, Scheduling, and Customer Retention',
  author: { '@type': 'Person', name: 'Max Ballesteros' },
  datePublished: '2026-04-02',
  dateModified: '2026-05-06T17:11:03-05:00',
  image: 'https://www.opervo.io/og-image.png',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.opervo.io/blog/crm-for-plumbing-businesses' },
  publisher: { '@type': 'Organization', name: 'Opervo' },
}

export default function CrmForPlumbingBusinesses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.opervo.io"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.opervo.io/blog"}, {"@type": "ListItem", "position": 3, "name": "CRM for Plumbing Businesses", "item": "https://www.opervo.io/blog/crm-for-plumbing-businesses"}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What is the best CRM for a plumbing business?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The best CRM is one that works well on mobile, keeps scheduling easy, and makes quoting and invoicing simple.\"}}]}" }} />
      <BlogLayout
        category="GUIDES"
        title="CRM for Plumbing Businesses: Improve Follow Up, Scheduling, and Customer Retention"
        date="April 2, 2026"
        readTime="5"
        related={crmRelated("plumbing")}
      >
        <p>Plumbing businesses deal with urgent jobs, estimates, repeat service, and customer trust. A CRM helps keep all of that organized while making it easier to manage incoming work and past customers.</p>
    <h2>Why plumbers need a CRM</h2>
    <ul>
      <li>Incoming jobs need quick response and clean scheduling.</li>
      <li>Customer notes and past work history are valuable for future calls.</li>
      <li>Professional follow up helps win more approved estimates.</li>
    </ul>
    <h2>Useful features</h2>
    <ul>
      <li>Calendar scheduling</li>
      <li>Estimate management</li>
      <li>Customer records</li>
      <li>Invoices and payments</li>
    </ul>
    <h2>Why Opervo works</h2>
    <p>Opervo helps smaller plumbing businesses centralize the admin side of the business so they can stay responsive and organized without extra overhead.</p>
    <h2>FAQ</h2>
    <p><strong>What is the best CRM for a plumbing business?</strong><br />The best CRM is one that works well on mobile, keeps scheduling easy, and makes quoting and invoicing simple.</p>
      </BlogLayout>
    </>
  )
}
