import type { Metadata } from 'next'
import PrintPage from './PrintPage'

export const metadata: Metadata = {
  title: 'Marketing Materials — Opervo | Business Cards & Door Hangers',
  description: 'Professional business cards and door hangers for home service businesses. Branded with your info, shipped to your door. Free shipping, 5–7 day turnaround.',
  alternates: { canonical: 'https://opervo.io/print' },
  openGraph: {
    title: 'Pro Marketing Materials for Your Trade Business — Opervo',
    description: 'Business cards and door hangers branded with your info. Proof sent within 24hrs. Free shipping.',
    url: 'https://opervo.io/print',
    type: 'website',
  },
}

export default function PrintPageWrapper() {
  return <PrintPage />
}
