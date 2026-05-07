import type { Metadata } from 'next'
import { Suspense } from 'react'
import CreditsClient from './CreditsClient'

export const metadata: Metadata = {
  title: 'Gear Credits — Opervo Apprentice',
  description: 'Track your gear credits and redeem rewards from the Opervo Apprentice program.',
  robots: 'noindex',
}

export default function CreditsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", color: '#6B6B6B', fontSize: 16 }}>Loading your credits...</p>
      </div>
    }>
      <CreditsClient />
    </Suspense>
  )
}
