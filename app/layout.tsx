import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import ReferralAttribution from '@/components/ReferralAttribution'
import './globals.css'

export const metadata: Metadata = {
  title: 'Opervo — Run Your Trade Business Like a Pro',
  description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio — built mobile-first for solo trade operators.',
  metadataBase: new URL('https://www.opervo.io'),
  openGraph: {
    title: 'Opervo — Run Your Trade Business Like a Pro',
    description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio — built mobile-first for solo trade operators.',
    url: 'https://www.opervo.io',
    siteName: 'Opervo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Opervo — The one app built for trade operators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opervo — Run Your Trade Business Like a Pro',
    description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio — built mobile-first for solo trade operators.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}<ReferralAttribution /><Analytics /></body>
    </html>
  )
}
