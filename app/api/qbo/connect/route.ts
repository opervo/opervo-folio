// app/api/qbo/connect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { QBO_CONFIG, intuitAuthUrl } from '@/lib/qbo'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  // Generate CSRF state token — encodes user_id so callback can identify who connected
  const state = Buffer.from(
    JSON.stringify({
      user_id: userId,
      nonce: crypto.randomBytes(16).toString('hex'),
    })
  ).toString('base64url')

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
