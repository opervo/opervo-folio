import { NextRequest, NextResponse } from 'next/server'
import { logFolioView } from '@/lib/folio-views'

// POST /api/folio-view
// Body: { operator_user_id: string, slug: string }
// Called once per folio page mount from components/FolioViewPing.tsx.
// Inserts via service role key — see lib/folio-views.ts.
export async function POST(req: NextRequest) {
  try {
    const { operator_user_id, slug } = await req.json()
    if (typeof operator_user_id !== 'string' || typeof slug !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // UA hash + referer come from the client request, not the body, so the
    // client can't spoof either. (operator_user_id + slug are trust-based
    // anyway — someone who wanted to inflate a competitor's view count
    // could script POSTs. Acceptable for MVP; revisit with a per-slug rate
    // limit if it becomes a problem.)
    await logFolioView({
      operatorUserId: operator_user_id,
      slug,
      userAgent: req.headers.get('user-agent'),
      referrer: req.headers.get('referer'),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
