import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase-server'
import { buildProofEmail } from '@/lib/proof-email'

export const dynamic = 'force-dynamic'

// Stripe minimal signature verification (no stripe npm package needed)
async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts = sigHeader.split(',').reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split('=')
    acc[k] = v
    return acc
  }, {})

  const timestamp = parts['t']
  const signature = parts['v1']
  if (!timestamp || !signature) return false

  // Check timestamp within 5 minutes
  if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300) return false

  const signedPayload = `${timestamp}.${payload}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload))
  const expected = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('')

  return expected === signature
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const payload = await req.text()
  const sigHeader = req.headers.get('stripe-signature') || ''

  const valid = await verifyStripeSignature(payload, sigHeader, webhookSecret)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: { type: string; data: { object: Record<string, unknown> } }
  try {
    event = JSON.parse(payload)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as {
    id: string
    payment_intent?: string
    customer_email?: string
    amount_total?: number
    metadata?: Record<string, string>
  }

  const meta = session.metadata || {}
  const resendKey = process.env.RESEND_API_KEY

  try {
    const db = getSupabaseServer()

    // Insert order row
    const { data: order, error: insertError } = await db
      .from('print_orders')
      .insert({
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent || null,
        status: 'paid',
        product_title: meta.product_title || '',
        qty: parseInt(meta.qty || '0'),
        price_paid: (session.amount_total || 0) / 100,
        color_theme: meta.color_theme || '',
        business_name: meta.business_name || '',
        owner_name: meta.owner_name || '',
        trade: meta.trade || '',
        phone: meta.phone || '',
        email: meta.email || session.customer_email || '',
        website: meta.website || '',
        notes: meta.notes || '',
      })
      .select('id, approval_token, email, owner_name, product_title, qty, price_paid, color_theme, business_name, trade, phone, website, notes')
      .single()

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      // Don't fail the webhook — Stripe will retry
      return NextResponse.json({ received: true })
    }

    if (!resendKey || !order) {
      return NextResponse.json({ received: true })
    }

    // 1. Send proof email to customer
    const proofHtml = buildProofEmail({
      id: order.id,
      approvalToken: order.approval_token,
      productTitle: order.product_title,
      qty: order.qty,
      pricePaid: order.price_paid,
      businessName: order.business_name,
      ownerName: order.owner_name,
      trade: order.trade,
      phone: order.phone,
      email: order.email,
      website: order.website,
      colorTheme: order.color_theme,
      notes: order.notes,
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Opervo Print <welcome@opervo.io>',
        to: [order.email],
        subject: `Your design proof is ready — ${order.product_title}`,
        html: proofHtml,
      }),
    })

    // Update status to proof_sent
    await db.from('print_orders').update({ status: 'proof_sent' }).eq('id', order.id)

    // 2. Notify Opervo internally
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Opervo Print <welcome@opervo.io>',
        to: ['opervo.io@gmail.com'],
        subject: `✅ Payment Confirmed — ${order.qty}x ${order.product_title} from ${order.business_name}`,
        html: `
          <h2 style="font-family:sans-serif;">Payment Confirmed — Ready to Design</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Product</td><td>${order.qty.toLocaleString()} × ${order.product_title}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Business</td><td>${order.business_name}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Owner</td><td>${order.owner_name}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Trade</td><td>${order.trade}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Phone</td><td>${order.phone}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Email</td><td>${order.email}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Website</td><td>${order.website || '—'}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Color Theme</td><td>${order.color_theme}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Notes</td><td>${order.notes || '—'}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Amount Paid</td><td>$${order.price_paid.toFixed(2)}</td></tr>
          </table>
          <p style="margin-top:20px;color:#6B6B6B;font-size:13px;">Proof email sent to customer. Waiting for approval.</p>
          <p><a href="https://opervo.io/print/order/${order.approval_token}" style="color:#F5620F;">View order page →</a></p>
        `,
      }),
    })

  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return NextResponse.json({ received: true })
}
