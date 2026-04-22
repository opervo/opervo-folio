'use client'

import { useEffect } from 'react'

// Fires once per mount. We can't log from the server component because
// /p/[slug] is ISR-cached (revalidate = 60) — the server code only runs
// on rebuild. Pinging from the client side guarantees one row per real
// page view.
//
// sessionStorage guard suppresses the obvious double-fire from React
// StrictMode in dev and tab-refresh loops. Anything beyond that (bots,
// prefetches) is out of scope for MVP.
export default function FolioViewPing({
  operatorUserId,
  slug,
}: {
  operatorUserId: string
  slug: string
}) {
  useEffect(() => {
    const key = `folio_view_pinged:${slug}`
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(key)) return
    window.sessionStorage.setItem(key, '1')

    fetch('/api/folio-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operator_user_id: operatorUserId, slug }),
      keepalive: true,
    }).catch(() => {
      // Swallow — a dropped view must not surface to the operator.
    })
  }, [operatorUserId, slug])

  return null
}
