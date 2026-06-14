import type { Metadata } from 'next'
import Preview from './Preview'

// Preview page, not indexed, not linked from nav. Shared via direct URL
// with Code 3's owner ahead of the intake Zoom. Replaces "imagine what
// it could look like" with "click this and see what we're building."
export const metadata: Metadata = {
  title: 'Code 3 Cleaning | Pro Site Preview',
  description: 'Preview build for Code 3 Cleaning. Internal use only.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Preview />
}
