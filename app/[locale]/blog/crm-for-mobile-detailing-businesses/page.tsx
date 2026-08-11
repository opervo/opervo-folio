import type { Metadata } from 'next'
import Link from 'next/link'
import BlogLayout from '@/components/BlogLayout'
import { crmRelated } from '@/lib/crmRelated'

export const metadata: Metadata = {
  title: 'CRM for Mobile Detailing Businesses | Opervo',
  description: "Mobile detailing businesses need tight scheduling, strong customer communication, and repeat booking systems.",
  alternates: { canonical: 'https://www.opervo.io/blog/crm-for-mobile-detailing-businesses' },
  openGraph: {
    title: 'CRM for Mobile Detailing Businesses | Opervo',
    description: "Mobile detailing businesses need tight scheduling, strong customer communication, and repeat booking systems.",
    url: 'https://www.opervo.io/blog/crm-for-mobile-detailing-businesses',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CRM for Mobile Detailing Businesses: Stay Booked and Professional',
  author: { '@type': 'Person', name: 'Max Ballesteros' },
  datePublished: '2026-04-02',
  dateModified: '2026-05-06T17:11:03-05:00',
  image: 'https://www.opervo.io/og-image.png',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.opervo.io/blog/crm-for-mobile-detailing-businesses' },
  publisher: { '@type': 'Organization', name: 'Opervo' },
}

export default function CrmForMobileDetailingBusinesses() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.opervo.io"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.opervo.io/blog"}, {"@type": "ListItem", "position": 3, "name": "CRM for Mobile Detailing Businesses", "item": "https://www.opervo.io/blog/crm-for-mobile-detailing-businesses"}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Can a CRM increase repeat business for detailers?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Recurring scheduling and better customer management help bring clients back more consistently.\"}}]}" }} />
      <BlogLayout
        category="GUIDES"
        title="CRM for Mobile Detailing Businesses: Stay Booked and Professional"
        date="April 2, 2026"
        readTime="5"
        related={crmRelated("mobile-detailing")}
      >
        <p>Mobile detailing businesses need tight scheduling, strong customer communication, and repeat booking systems. A CRM helps you keep client details, vehicle notes, appointments, and payments organized in one place.</p>
    <h2>Why mobile detailers need a CRM</h2>
    <ul>
      <li>Repeat maintenance details are easy to lose without a system.</li>
      <li>Vehicle preferences and service history matter.</li>
      <li>Professional follow up helps build loyalty.</li>
    </ul>
    <h2>Key features</h2>
    <ul>
      <li>Recurring bookings</li>
      <li>Customer history</li>
      <li>Easy invoicing</li>
      <li>Mobile scheduling</li>
    </ul>
    <h2>Why Opervo works</h2>
    <p>Opervo gives detailers a clean way to manage work from the road without juggling multiple apps.</p>
    <h2>FAQ</h2>
    <p><strong>Can a CRM increase repeat business for detailers?</strong><br />Yes. Recurring scheduling and better customer management help bring clients back more consistently.</p>
      </BlogLayout>
    </>
  )
}
