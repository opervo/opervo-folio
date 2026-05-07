import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get('code') || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 16)

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const url = process.env.GUIDE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const supabase = createClient(url, key)

  // Look up apprentice by referral code
  const { data: apprentice, error: aErr } = await supabase
    .from('apprentice_referral_codes')
    .select('id, email, business_name, created_at')
    .eq('code', code)
    .maybeSingle()

  if (aErr || !apprentice) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
  }

  // Fetch gear credits ledger
  const { data: credits } = await supabase
    .from('gear_credits')
    .select('id, type, amount_cents, description, created_at')
    .eq('apprentice_email', apprentice.email)
    .order('created_at', { ascending: false })

  const ledger = credits || []
  const earned = ledger
    .filter((c) => c.type === 'earn')
    .reduce((sum, c) => sum + c.amount_cents, 0)
  const redeemed = ledger
    .filter((c) => c.type === 'redeem')
    .reduce((sum, c) => sum + Math.abs(c.amount_cents), 0)
  const balance = earned - redeemed

  return NextResponse.json({
    business_name: apprentice.business_name,
    code,
    balance_cents: balance,
    earned_cents: earned,
    redeemed_cents: redeemed,
    referral_count: ledger.filter((c) => c.type === 'earn').length,
    ledger: ledger.map((c) => ({
      type: c.type,
      amount_cents: c.amount_cents,
      description: c.description,
      date: c.created_at,
    })),
  }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
