import { createHash } from 'crypto'
import { getSupabaseServer } from './supabase-server'

// Fire-and-forget view logger. Called from the /p/[slug] server component
// after the operator profile resolves. Failures are swallowed — a dropped
// analytics row must never block rendering the public page.
//
// ua_hash is sha256(ua) so we can compute uniques later without storing
// the raw user-agent. Referrer stored as-is; truncated to 500 chars to
// keep row size bounded.
export async function logFolioView(params: {
  operatorUserId: string
  slug: string
  userAgent?: string | null
  referrer?: string | null
}) {
  try {
    const supabase = getSupabaseServer()
    const uaHash = params.userAgent
      ? createHash('sha256').update(params.userAgent).digest('hex').slice(0, 32)
      : null
    const referrer = params.referrer ? params.referrer.slice(0, 500) : null
    await supabase.from('folio_views').insert({
      operator_user_id: params.operatorUserId,
      slug: params.slug,
      ua_hash: uaHash,
      referrer,
    })
  } catch {
    // Swallow — see comment above.
  }
}
