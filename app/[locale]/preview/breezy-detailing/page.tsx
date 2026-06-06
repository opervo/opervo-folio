import type { Metadata } from 'next'
import Preview from './Preview'

// Preview page for Breezy Detailing. Not indexed, not linked from main nav.
// Reachable from /sites portfolio card and shareable via direct URL with
// Ricardo ahead of the domain handoff.
export const metadata: Metadata = {
  title: 'Breezy Detailing — Pro Site Preview',
  description:
    'Preview build for Breezy Detailing, a premium DFW auto detailer. Internal use only.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Preview />
}
