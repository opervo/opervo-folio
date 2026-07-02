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

  // Authenticate the caller. The redeeming apprentice's email is derived from the
  // verified session token, NOT from the request body. Previously the body-supplied
  // email was trusted, letting anyone drain any apprentice's credits by naming their
  // email.
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { data: userData, error: userErr } = await supabase.auth.getUser(token)
  if (userErr || !userData?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const normalizedEmail = userData.user.email.toLowerCase()

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { items } = body
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Verify this email is an apprentice
  const { data: apprentice } = await supabase
    .from('apprentice_referral_codes')
    .select('code, business_name')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (!apprentice) {
    return NextResponse.json({ error: 'Not an apprentice' }, { status: 403 })
  }

  // Recompute the cost from the authoritative gear_items table. The client-supplied
  // credit_cost / total_credits are NOT trusted (a tampered client could otherwise
  // claim expensive items cost 1 credit). Quantities are clamped to sane integers.
  const requested: { id: string; qty: number }[] = []
  for (const it of items) {
    if (!it || typeof it.id !== 'string') {
      return NextResponse.json({ error: 'Invalid item' }, { status: 400 })
    }
    const qty = Math.floor(Number(it.qty))
    if (!Number.isFinite(qty) || qty < 1 || qty > 100) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
    }
    requested.push({ id: it.id, qty })
  }

  const { data: gear, error: gearErr } = await supabase
    .from('gear_items')
    .select('id, title, credit_cost, active')
    .in('id', requested.map((r) => r.id))

  if (gearErr) {
    return NextResponse.json({ error: 'Failed to price order' }, { status: 500 })
  }
  const gearById = new Map((gear || []).map((g) => [g.id, g]))

  let serverTotal = 0
  const validatedItems: { id: string; title: string; credit_cost: number; qty: number }[] = []
  for (const r of requested) {
    const g = gearById.get(r.id)
    if (!g || !g.active) {
      return NextResponse.json({ error: 'Item unavailable' }, { status: 400 })
    }
    serverTotal += g.credit_cost * r.qty
    validatedItems.push({ id: g.id, title: g.title, credit_cost: g.credit_cost, qty: r.qty })
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

  if (serverTotal > balance) {
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 })
  }

  // Write redemption record (server-validated items + server-computed total)
  const { error: redemptionErr } = await supabase.from('gear_redemptions').insert({
    apprentice_email: normalizedEmail,
    items: validatedItems,
    total_credits: serverTotal,
  })

  if (redemptionErr) {
    return NextResponse.json({ error: 'Failed to save redemption' }, { status: 500 })
  }

  // Debit gear credits
  const itemTitles = validatedItems.map((i) => i.title).join(', ')
  await supabase.from('gear_credits').insert({
    apprentice_email: normalizedEmail,
    type: 'redeem',
    amount_cents: serverTotal,
    description: `Redeemed: ${itemTitles}`,
  })

  return NextResponse.json({ ok: true })
}
