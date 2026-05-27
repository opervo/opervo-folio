import type { Metadata } from 'next'
import SitesPage from './SitesPage'

export const metadata: Metadata = {
  title: 'Pro Websites for Home Service Pros — Opervo Sites | $1,499 once',
  description:
    'Done-for-you SEO websites built specifically for home service operators. $1,499 one-time. You own it forever. Real local SEO, your domain, 30-day delivery. From the team behind Opervo.',
  alternates: { canonical: 'https://www.opervo.io/sites' },
  openGraph: {
    title: 'Look pro. Win jobs. Online too. — Opervo Sites',
    description:
      'Real custom websites for window cleaners, pressure washers, landscapers and home service operators. $1,499 one-time, you own it forever. 30-day delivery.',
    url: 'https://www.opervo.io/sites',
    type: 'website',
  },
}

// Service schema for the DFY website offering, plus FAQPage for the FAQ
// section. Service is the right fit because pricing is published and the
// offering is a service (one-time build with optional hosting bundle).
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Opervo Sites — Done-For-You Websites for Home Service Operators',
    description:
      'Custom-built SEO websites for window cleaners, pressure washers, landscapers, solar panel cleaners, gutter cleaners, and other home service businesses. $1,499 one-time. You own it forever. Optional $19/mo hosting bundle (free with Opervo CRM). Built by the team behind Opervo.',
    serviceType: 'Website design and build',
    provider: { '@id': 'https://www.opervo.io/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: 'https://www.opervo.io/sites',
    offers: {
      '@type': 'Offer',
      name: 'Opervo Pro Website',
      price: '1499',
      priceCurrency: 'USD',
      description: 'Custom multi-page SEO website for home service operators. One-time $1,499. You own it forever. Includes service pages, location pages, gallery, quote forms, custom domain, 30-day delivery, 60-day money-back guarantee. Hosting + edits available at $19/mo (or free with Opervo CRM).',
    },
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
        name: 'Is there an ongoing fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'The $1,499 is one-time. You own the site forever. If you want us to keep hosting + handling edits, it’s $19/mo (or free when you add Opervo CRM at $24.99/mo). You can cancel any time — we hand you the static export and your domain. No ongoing fee is required.',
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
