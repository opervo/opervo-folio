import type { Metadata } from 'next'
import SitesPage from './SitesPage'

export const metadata: Metadata = {
  title: 'Pro Websites for Home Service Pros — Opervo Sites | $39.99/mo or $499 to own',
  description:
    'Done-for-you SEO websites built specifically for home service operators. $39.99/mo with custom domain included, or $499 to own forever. 30-day delivery. From the team behind Opervo.',
  alternates: { canonical: 'https://www.opervo.io/sites' },
  openGraph: {
    title: 'Look pro. Win jobs. Online too. — Opervo Sites',
    description:
      'Real custom websites for window cleaners, pressure washers, landscapers and home service operators. $39.99/mo or $499 to own. Custom domain included.',
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
      'Custom-built SEO websites for window cleaners, pressure washers, landscapers, solar panel cleaners, gutter cleaners, and other home service businesses. $39.99/mo (hosted, edited, custom domain included) or $499 one-time ownership. Built by the team behind Opervo.',
    serviceType: 'Website design and build',
    provider: { '@id': 'https://www.opervo.io/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: 'https://www.opervo.io/sites',
    offers: [
      {
        '@type': 'Offer',
        name: 'Pro Site Monthly',
        price: '39.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '39.99',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        description: 'Full multi-page DFY website with hosting, custom domain, SSL, and unlimited minor edits included. 30-day delivery, 60-day money-back guarantee, cancel any time.',
      },
      {
        '@type': 'Offer',
        name: 'Pro Site Ownership',
        price: '499',
        priceCurrency: 'USD',
        description: 'One-time $499 build. Full multi-page DFY site with custom domain transferred to operator. Static export on completion. No ongoing fee.',
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
        name: 'Is there an ongoing fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Depends on the tier. Pro Site Monthly is $39.99/mo with hosting, edits, and custom domain included. Pro Site Ownership is $499 one-time and you walk away with everything — no ongoing fee at all. Either tier has 60-day money back and you can cancel any time. We always hand you the static export and transfer the domain.',
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
