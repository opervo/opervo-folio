import type { Metadata } from 'next'
import SitesPage from './SitesPage'

export const metadata: Metadata = {
  title: 'Pro Websites for Home Service Pros — Opervo Sites | $1,499 + $49/mo',
  description:
    'Done-for-you SEO websites built specifically for home service operators. Real local SEO, your domain, 30-day delivery — and you own it. From the team behind Opervo.',
  alternates: { canonical: 'https://www.opervo.io/sites' },
  openGraph: {
    title: 'Look pro. Win jobs. Online too. — Opervo Sites',
    description:
      'Real custom websites for window cleaners, pressure washers, landscapers and home service operators. $1,499 build + $49/mo, 30-day delivery, you own it.',
    url: 'https://www.opervo.io/sites',
    type: 'website',
  },
}

// Service schema for the DFY website offering, plus FAQPage for the FAQ
// section. Service is the right fit because pricing is published and the
// offering is a service (build + maintenance), not a packaged product.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Opervo Sites — Done-For-You Websites for Home Service Operators',
    description:
      'Custom-built SEO websites for window cleaners, pressure washers, landscapers, solar panel cleaners, gutter cleaners, and other home service businesses. Includes design, copy, hosting, SSL, and ongoing maintenance. Built by the team behind Opervo.',
    serviceType: 'Website design and build',
    provider: { '@id': 'https://www.opervo.io/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: 'https://www.opervo.io/sites',
    offers: [
      {
        '@type': 'Offer',
        name: 'Pro Site',
        price: '1499',
        priceCurrency: 'USD',
        description: 'Up to 7-page custom website with real SEO, your domain, hosting and SSL. 30-day delivery. $49/mo maintenance ("Pro Site Live").',
      },
      {
        '@type': 'Offer',
        name: 'Pro Site Plus',
        price: '2499',
        priceCurrency: 'USD',
        description: 'Pro Site plus 5 service-specific SEO landing pages, location pages, blog setup with starter posts, and deeper Google Business Profile integration. $49/mo maintenance.',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I own my website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. The build is yours. Your domain is yours. If you ever leave, we hand you a static export of the site and transfer your domain. No proprietary CMS, no hostage situation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to use the Opervo CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'No. Opervo Sites is a standalone product. Your site works on its own — quote forms email you, the contact info routes wherever you want. Connect the Opervo CRM later if you want your services, photos, and reviews to update themselves on the site.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the build take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            '30 days from kickoff. We schedule a 60-minute intake call within 72 hours of order, send a first draft by day 21, finalize revisions, and ship live by day 30.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the $49/mo cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Hosting, SSL, security updates, and minor edits (hours, prices, swap a photo, add a service). Beyond that, additional pages are $99/page and major redesigns are quoted separately. You can cancel maintenance any time — site stays online via static export.',
        },
      },
      {
        '@type': 'Question',
        name: 'What trades do you build for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Window cleaning, pressure washing, soft washing, gutter cleaning, solar panel cleaning, landscaping, lawn care, junk removal, mobile detailing, roof cleaning, concrete sealing, and most other home service trades. If you serve homes or commercial properties on a route, we build for you.',
        },
      },
      {
        '@type': 'Question',
        name: 'What about my existing domain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We work with whatever you have. Keep your existing domain — we point it to the new site. Or we register a new one for you at cost. No upcharge.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who writes the copy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We do. We extract your voice during the intake call and write trade-specific SEO copy that ranks. You review and approve every page before it goes live.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a money-back guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            '60 days. If you’re not happy with the launched site, we’ll refund the build fee in full. Better than the industry standard 30 days.',
        },
      },
    ],
  },
]

export default function SitesPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SitesPage />
    </>
  )
}
