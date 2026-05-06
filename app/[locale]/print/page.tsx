import type { Metadata } from 'next'
import PrintPage from './PrintPage'

export const metadata: Metadata = {
  title: 'Marketing Materials — Opervo | Business Cards & Door Hangers',
  description: 'Professional business cards and door hangers for home service businesses. Branded with your info, shipped to your door. Free shipping, 5–7 day turnaround.',
  alternates: { canonical: 'https://www.opervo.io/print' },
  openGraph: {
    title: 'Pro Marketing Materials for Your Trade Business — Opervo',
    description: 'Business cards and door hangers branded with your info. Proof sent within 24hrs. Free shipping.',
    url: 'https://www.opervo.io/print',
    type: 'website',
  },
}

// ItemList of the two products sold on this page. ItemList is a safer
// fit than Product/Offer because pricing is custom-quoted (operator
// uploads design, gets a per-batch quote) and Google penalizes Product
// schema with no price. ItemList still gets eligibility for sitelinks
// and helps the page rank for "{trade} business cards" / "door hangers".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Opervo Marketing Materials",
  description: "Business cards and door hangers for home-service businesses, branded with the operator's info and shipped to their door.",
  url: "https://www.opervo.io/print",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Custom Business Cards for Home-Service Operators",
        description: "Professional business cards branded with your info. Proof sent within 24 hours. Free shipping, 5–7 day turnaround.",
        brand: { "@id": "https://www.opervo.io/#organization" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Custom Door Hangers for Home-Service Operators",
        description: "Door hangers for canvassing routes. Branded with your info, your service offer, and a quote-form QR code. Free shipping.",
        brand: { "@id": "https://www.opervo.io/#organization" },
      },
    },
  ],
}

export default function PrintPageWrapper() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrintPage />
    </>
  )
}
