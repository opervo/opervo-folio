import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, productTitle, qty, businessName, ownerName, trade, phone, email, website, notes } = body

    if (!priceId || !email || !businessName || !ownerName || !trade || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const sk = process.env.STRIPE_SECRET_KEY
    if (!sk) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const baseUrl = 'https://opervo.io'

    // Build form data for Stripe checkout session
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('customer_email', email)
    params.append('success_url', `${baseUrl}/print/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${baseUrl}/print`)
    params.append('metadata[business_name]', businessName)
    params.append('metadata[owner_name]', ownerName)
    params.append('metadata[trade]', trade)
    params.append('metadata[phone]', phone)
    params.append('metadata[email]', email)
    params.append('metadata[website]', website || '')
    params.append('metadata[notes]', notes || '')
    params.append('metadata[product_title]', productTitle)
    params.append('metadata[qty]', String(qty))

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sk}:`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })

    const session = await res.json()

    if (!res.ok) {
      console.error('Stripe error:', session)
      return NextResponse.json({ error: session?.error?.message || 'Stripe error' }, { status: 500 })
    }

    // Fire-and-forget: notify Opervo via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Opervo Print <welcome@opervo.io>',
          to: ['opervo.io@gmail.com'],
          subject: `🖨️ New Print Order — ${qty}x ${productTitle} from ${businessName}`,
          html: `
            <h2>New Print Order Received</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Product</td><td style="padding:6px 0;">${qty.toLocaleString()} × ${productTitle}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Business</td><td style="padding:6px 0;">${businessName}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Owner</td><td style="padding:6px 0;">${ownerName}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Trade</td><td style="padding:6px 0;">${trade}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Email</td><td style="padding:6px 0;">${email}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Website</td><td style="padding:6px 0;">${website || '—'}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Notes</td><td style="padding:6px 0;">${notes || '—'}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;">Stripe Session</td><td style="padding:6px 0;">${session.id}</td></tr>
            </table>
            <p style="margin-top:20px;color:#6B6B6B;font-size:13px;">⚠️ Payment not yet confirmed — this fires at checkout initiation. Confirm payment in Stripe before placing order with Navitor.</p>
          `,
        }),
      }).catch((err) => console.error('Resend notify error:', err))
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('print-checkout error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
