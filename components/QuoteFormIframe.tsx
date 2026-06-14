'use client'

import { useEffect, useRef, useState } from 'react'

// Iframes the canonical quote engine hosted at app.opervo.io/embed/quote/{slug}.
// Single source of truth: the same component that powers the in-app folio,
// the operator preview, and any third-party website embed.
//
// We post-message-resize the iframe so the form doesn't get a permanent inner
// scrollbar, content height drives the wrapper height.

const APP_URL =
  process.env.NEXT_PUBLIC_OPERVO_APP_URL || 'https://app.opervo.io'

interface Props {
  slug: string
}

export default function QuoteFormIframe({ slug }: Props) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(820)

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'opervo-quote-height' && typeof e.data.height === 'number') {
        setHeight(Math.max(560, Math.ceil(e.data.height)))
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  return (
    <div
      id="quoteform"
      className="reveal"
      style={{
        margin: '36px var(--px, 20px) 0',
        borderRadius: 28,
        overflow: 'hidden',
      }}
    >
      <iframe
        ref={ref}
        src={`${APP_URL}/embed/quote/${slug}`}
        style={{
          width: '100%',
          height,
          border: 'none',
          display: 'block',
          background: '#F7F5F2',
        }}
        title="Get a quote"
      />
    </div>
  )
}
