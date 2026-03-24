// lib/qbo.ts — QuickBooks Online API helper

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// ── Config ──────────────────────────────────────────────
export const QBO_CONFIG = {
  clientId: process.env.QBO_CLIENT_ID!,
  clientSecret: process.env.QBO_CLIENT_SECRET!,
  redirectUri: process.env.QBO_REDIRECT_URI || 'https://opervo.io/api/qbo/callback',
  environment: (process.env.QBO_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production',
}

export function qboBaseUrl() {
  return QBO_CONFIG.environment === 'production'
    ? 'https://quickbooks.api.intuit.com'
    : 'https://sandbox-quickbooks.api.intuit.com'
}

export function intuitAuthUrl() {
  return 'https://appcenter.intuit.com/connect/oauth2'
}

export function intuitTokenUrl() {
  return 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'
}

// ── Supabase (service role — bypasses RLS) ──────────────
export function supabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── HMAC-signed OAuth state (CSRF protection) ───────────
function stateSecret(): string {
  // Use QBO_CLIENT_SECRET as HMAC key — always available on server
  return process.env.QBO_CLIENT_SECRET || 'fallback-dev-secret'
}

export function signState(userId: string): string {
  const payload = JSON.stringify({
    user_id: userId,
    nonce: crypto.randomBytes(16).toString('hex'),
    ts: Date.now(),
  })
  const sig = crypto
    .createHmac('sha256', stateSecret())
    .update(payload)
    .digest('hex')
  // Format: base64url(payload).signature
  return `${Buffer.from(payload).toString('base64url')}.${sig}`
}

export function verifyState(state: string): { user_id: string } | null {
  const parts = state.split('.')
  if (parts.length !== 2) return null

  const [payloadB64, sig] = parts
  const payload = Buffer.from(payloadB64, 'base64url').toString()

  // Verify HMAC signature
  const expected = crypto
    .createHmac('sha256', stateSecret())
    .update(payload)
    .digest('hex')

  if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) {
    return null
  }

  // Verify timestamp (reject states older than 10 minutes)
  try {
    const data = JSON.parse(payload)
    const age = Date.now() - (data.ts || 0)
    if (age > 10 * 60 * 1000) return null // 10 min TTL
    return { user_id: data.user_id }
  } catch {
    return null
  }
}

// ── Token refresh ───────────────────────────────────────
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string
  refresh_token: string
  expires_in: number
}> {
  const basicAuth = Buffer.from(
    `${QBO_CONFIG.clientId}:${QBO_CONFIG.clientSecret}`
  ).toString('base64')

  const res = await fetch(intuitTokenUrl(), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Token refresh failed: ${res.status} — ${err}`)
  }

  return res.json()
}

// ── Get valid access token (auto-refresh if expired) ────
export async function getValidToken(userId: string): Promise<{
  accessToken: string
  realmId: string
}> {
  const sb = supabaseAdmin()

  const { data: conn, error } = await sb
    .from('qbo_connections')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !conn) {
    throw new Error('No QuickBooks connection found. Please connect QuickBooks first.')
  }

  // If token is still valid (with 5-min buffer), use it
  const expiresAt = new Date(conn.token_expires_at)
  const now = new Date()
  const bufferMs = 5 * 60 * 1000

  if (expiresAt.getTime() - now.getTime() > bufferMs) {
    return { accessToken: conn.access_token, realmId: conn.realm_id }
  }

  // Token expired or about to expire — refresh it
  const refreshed = await refreshAccessToken(conn.refresh_token)

  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000).toISOString()

  await sb
    .from('qbo_connections')
    .update({
      access_token: refreshed.access_token,
      refresh_token: refreshed.refresh_token,
      token_expires_at: newExpiresAt,
    })
    .eq('user_id', userId)

  // Log the refresh
  await sb.from('qbo_sync_log').insert({
    user_id: userId,
    action: 'refresh_token',
    payload: { new_expires_at: newExpiresAt },
  })

  return { accessToken: refreshed.access_token, realmId: conn.realm_id }
}

// ── QBO API call helper ─────────────────────────────────
export async function qboApiFetch(
  method: 'GET' | 'POST',
  path: string,
  accessToken: string,
  realmId: string,
  body?: object
) {
  const url = `${qboBaseUrl()}/v3/company/${realmId}${path}`

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`QBO API ${method} ${path} failed: ${res.status} — ${errText}`)
  }

  return res.json()
}

// ── Find or create customer in QBO ──────────────────────
export async function findOrCreateCustomer(
  accessToken: string,
  realmId: string,
  clientName: string,
  clientEmail?: string | null,
  clientPhone?: string | null
): Promise<{ Id: string; DisplayName: string }> {
  // Search for existing customer by display name
  // Sanitize: strip everything except letters, numbers, spaces, hyphens, periods, ampersands
  const safeName = clientName.replace(/[^a-zA-Z0-9 .&'-]/g, '').slice(0, 100)
  const query = `SELECT * FROM Customer WHERE DisplayName = '${safeName.replace(/'/g, "\\'")}'`
  const searchResult = await qboApiFetch(
    'GET',
    `/query?query=${encodeURIComponent(query)}`,
    accessToken,
    realmId
  )

  const existing = searchResult?.QueryResponse?.Customer?.[0]
  if (existing) {
    return { Id: existing.Id, DisplayName: existing.DisplayName }
  }

  // Create new customer
  const newCustomer: Record<string, unknown> = {
    DisplayName: clientName,
  }
  if (clientEmail) {
    newCustomer.PrimaryEmailAddr = { Address: clientEmail }
  }
  if (clientPhone) {
    newCustomer.PrimaryPhone = { FreeFormNumber: clientPhone }
  }

  const created = await qboApiFetch(
    'POST',
    '/customer',
    accessToken,
    realmId,
    newCustomer
  )

  return { Id: created.Customer.Id, DisplayName: created.Customer.DisplayName }
}
