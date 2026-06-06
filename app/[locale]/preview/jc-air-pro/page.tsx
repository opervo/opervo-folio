import type { Metadata } from 'next'
import Preview from './Preview'

// Preview page for JC Air Pro. Not indexed, not linked from main nav.
// Reachable from /sites portfolio card and shareable via direct URL with
// the operator (Emilio) ahead of the domain handoff.
export const metadata: Metadata = {
  title: 'JC Air Pro — Pro Site Preview',
  description: 'Preview build for JC Air Pro, a family-owned DFW HVAC contractor. Internal use only.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Preview />
}
