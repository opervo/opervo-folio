import type { Metadata } from 'next'
import Link from 'next/link'
import BlogLayout from '@/components/BlogLayout'

export const metadata: Metadata = {
  title: 'CRM for Irrigation Businesses | Opervo',
  description: "Opervo helps smaller irrigation businesses keep jobs moving and customers organized without needing a complex enterprise stack.",
  alternates: { canonical: 'https://www.opervo.io/blog/crm-for-irrigation-businesses' },
  openGraph: {
    title: 'CRM for Irrigation Businesses | Opervo',
    description: "Opervo helps smaller irrigation businesses keep jobs moving and customers organized without needing a complex enterprise stack.",
    url: 'https://www.opervo.io/blog/crm-for-irrigation-businesses',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CRM for Irrigation Businesses: Stay Organized Across Service Calls, Seasonal Work, and Customer Notes',
  author: { '@type': 'Person', name: 'Max Ballesteros' },
  datePublished: '2026-04-02',
  dateModified: '2026-05-06T17:11:03-05:00',
  image: 'https://www.opervo.io/og-image.png',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.opervo.io/blog/crm-for-irrigation-businesses' },
  publisher: { '@type': 'Organization', name: 'Opervo' },
}

export default function CrmForIrrigationBusinesses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.opervo.io"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.opervo.io/blog"}, {"@type": "ListItem", "position": 3, "name": "CRM for Irrigation Businesses", "item": "https://www.opervo.io/blog/crm-for-irrigation-businesses"}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What software should an irrigation business use?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Use software that makes scheduling, quoting, invoicing, and customer records easy to manage in the field.\"}}]}" }} />
      <BlogLayout
        category="GUIDES"
        title="CRM for Irrigation Businesses: Stay Organized Across Service Calls, Seasonal Work, and Customer Notes"
        date="April 2, 2026"
        readTime="5"
      >
        <p>Irrigation businesses often handle seasonal startups, repairs, maintenance, and recurring service. A CRM helps you manage that mix while keeping customer details and scheduling organized.</p>
    <h2>Why irrigation companies need a CRM</h2>
    <ul>
      <li>Seasonal demand creates a lot of moving parts.</li>
      <li>Property specific notes are important for future visits.</li>
      <li>Estimates and repair approvals need clear tracking.</li>
    </ul>
    <h2>Important features</h2>
    <ul>
      <li>Scheduling and reminders</li>
      <li>Customer records</li>
      <li>Estimate and invoice tools</li>
      <li>Mobile access</li>
    </ul>
    <h2>Why Opervo is a fit</h2>
    <p>Opervo helps smaller irrigation businesses keep jobs moving and customers organized without needing a complex enterprise stack.</p>
    <h2>FAQ</h2>
    <p><strong>What software should an irrigation business use?</strong><br />Use software that makes scheduling, quoting, invoicing, and customer records easy to manage in the field.</p>
      </BlogLayout>
    </>
  )
}
