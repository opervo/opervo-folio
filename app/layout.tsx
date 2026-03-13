import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Opervo — Run Your Trade Business Like a Pro',
  description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio — built mobile-first for solo trade operators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
