import type { Metadata } from 'next'
import CreditsClient from './CreditsClient'

export const metadata: Metadata = {
  title: 'Gear Credits — Opervo Apprentice',
  description: 'Track your gear credits and redeem rewards from the Opervo Apprentice program.',
  robots: 'noindex',
}

export default function CreditsPage() {
  return <CreditsClient />
}
