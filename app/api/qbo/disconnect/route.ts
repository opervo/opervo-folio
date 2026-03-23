// app/api/qbo/disconnect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, getValidToken, QBO_CONFIG } from '@/lib/qbo'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const sb = supabaseAdmin()

  const { data: { user }, error: authError } = await sb.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid auth token' }, { status: 401 })
  }

  // Revoke token at Intuit (best effort)
  try {
    const { accessToken } = await getValidToken(user.id)
    const basicAuth = Buffer.from(
      `${QBO_CONFIG.clientId}:${QBO_CONFIG.clientSecret}`
    ).toString('base64')

    await fetch('https://developer.api.intuit.com/v2/oauth2/tokens/revoke', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    })
  } catch {
    // Best effort — even if revoke fails, we delete locally
  }

  // Delete connection from Supabase
  await sb
    .from('qbo_connections')
    .delete()
    .eq('user_id', user.id)

  // Log disconnect
  await sb.from('qbo_sync_log').insert({
    user_id: user.id,
    action: 'disconnected',
    payload: {},
  })

  return NextResponse.json({ success: true })
}
