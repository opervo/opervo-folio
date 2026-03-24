// app/api/qbo/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { QBO_CONFIG, intuitTokenUrl, supabaseAdmin, qboApiFetch, verifyState } from '@/lib/qbo'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const realmId = req.nextUrl.searchParams.get('realmId')
  const stateParam = req.nextUrl.searchParams.get('state')
  const error = req.nextUrl.searchParams.get('error')

  // Handle user denial
  if (error) {
    return NextResponse.redirect(
      `https://app.opervo.io/#/profile?qbo_error=${encodeURIComponent(error)}`
    )
  }

  if (!code || !realmId || !stateParam) {
    return NextResponse.redirect(
      'https://app.opervo.io/#/profile?qbo_error=missing_params'
    )
  }

  // Verify HMAC-signed state to prevent CSRF / state forgery
  const stateData = verifyState(stateParam)
  if (!stateData) {
    return NextResponse.redirect(
      'https://app.opervo.io/#/profile?qbo_error=invalid_state'
    )
  }
  const userId = stateData.user_id

  // Exchange auth code for tokens
  const basicAuth = Buffer.from(
    `${QBO_CONFIG.clientId}:${QBO_CONFIG.clientSecret}`
  ).toString('base64')

  const tokenRes = await fetch(intuitTokenUrl(), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: QBO_CONFIG.redirectUri,
    }),
  })

  if (!tokenRes.ok) {
    const errBody = await tokenRes.text()
    console.error('QBO token exchange failed:', errBody)
    return NextResponse.redirect(
      'https://app.opervo.io/#/profile?qbo_error=token_exchange_failed'
    )
  }

  const tokens = await tokenRes.json()
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  // Try to get company name from QBO
  let companyName: string | null = null
  try {
    const companyInfo = await qboApiFetch(
      'GET',
      '/companyinfo/' + realmId,
      tokens.access_token,
      realmId
    )
    companyName = companyInfo?.CompanyInfo?.CompanyName || null
  } catch {
    // Non-critical — company name is just for display
  }

  // Upsert connection in Supabase
  const sb = supabaseAdmin()
  const { error: dbError } = await sb
    .from('qbo_connections')
    .upsert(
      {
        user_id: userId,
        realm_id: realmId,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt,
        company_name: companyName,
        connected_at: new Date().toISOString(),
        sync_error: null,
      },
      { onConflict: 'user_id' }
    )

  if (dbError) {
    console.error('Failed to save QBO connection:', dbError)
    return NextResponse.redirect(
      'https://app.opervo.io/#/profile?qbo_error=save_failed'
    )
  }

  // Log successful connection
  await sb.from('qbo_sync_log').insert({
    user_id: userId,
    action: 'connected',
    payload: { realm_id: realmId, company_name: companyName },
  })

  // Redirect back to app profile with success
  return NextResponse.redirect(
    'https://app.opervo.io/#/profile?qbo_connected=true'
  )
}
