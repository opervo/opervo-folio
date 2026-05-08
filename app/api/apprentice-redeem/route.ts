import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const url = process.env.GUIDE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const supabase = createClient(url, key)

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, items, total_credits } = body
  if (!email || !items?.length || !total_credits) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase()

  // Verify this email is an apprentice
  const { data: apprentice } = await supabase
    .from('apprentice_referral_codes')
    .select('code, business_name')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (!apprentice) {
    return NextResponse.json({ error: 'Not an apprentice' }, { status: 403 })
  }

  // Calculate current balance
  const { data: credits } = await supabase
    .from('gear_credits')
    .select('type, amount_cents')
    .eq('apprentice_email', normalizedEmail)

  const ledger = credits || []
  const earned = ledger.filter((c) => c.type === 'earn').reduce((s, c) => s + c.amount_cents, 0)
  const redeemed = ledger.filter((c) => c.type === 'redeem').reduce((s, c) => s + Math.abs(c.amount_cents), 0)
  const balance = earned - redeemed

  if (total_credits > balance) {
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 })
  }

  // Write redemption record
  const { error: redemptionErr } = await supabase.from('gear_redemptions').insert({
    apprentice_email: normalizedEmail,
    items,
    total_credits,
  })

  if (redemptionErr) {
    return NextResponse.json({ error: 'Failed to save redemption' }, { status: 500 })
  }

  // Debit gear credits
  const itemTitles = items.map((i: any) => i.title).join(', ')
  await supabase.from('gear_credits').insert({
    apprentice_email: normalizedEmail,
    type: 'redeem',
    amount_cents: total_credits,
    description: `Redeemed: ${itemTitles}`,
  })

  return NextResponse.json({ ok: true })
}
