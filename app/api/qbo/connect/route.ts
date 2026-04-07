// app/api/qbo/connect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { QBO_CONFIG, intuitAuthUrl, supabaseAdmin, signState } from '@/lib/qbo'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // ── Auth check (header only) ────────────────────────────
  // Previously also accepted token via ?token= query param, which leaks
  // the bearer token into Vercel access logs and Intuit referer headers.
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = supabaseAdmin()
  const { data: { user }, error: authError } = await sb.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid auth token' }, { status: 401 })
  }

  // ── Build HMAC-signed state ─────────────────────────────
  const state = signState(user.id)

  const params = new URLSearchParams({
    client_id: QBO_CONFIG.clientId,
    redirect_uri: QBO_CONFIG.redirectUri,
    response_type: 'code',
    scope: 'com.intuit.quickbooks.accounting',
    state,
  })

  const authUrl = `${intuitAuthUrl()}?${params.toString()}`

  return NextResponse.redirect(authUrl)
}
