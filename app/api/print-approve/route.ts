import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { token, action, changes } = await req.json()

    if (!token || !action) {
      return NextResponse.json({ error: 'Missing token or action' }, { status: 400 })
    }

    const db = getSupabaseServer()

    const { data: order, error: fetchError } = await db
      .from('print_orders')
      .select('id, status, business_name, owner_name, product_title, qty, email')
      .eq('approval_token', token)
      .single()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status === 'approved') {
      return NextResponse.json({ message: 'Already approved' })
    }

    const resendKey = process.env.RESEND_API_KEY

    if (action === 'approve') {
      await db.from('print_orders')
        .update({ status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', order.id)

      // Notify Opervo — ready to order from Navitor
      if (resendKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Opervo Print <welcome@opervo.io>',
            to: ['opervo.io@gmail.com'],
            subject: `🟢 APPROVED — ${order.qty}x ${order.product_title} · ${order.business_name}`,
            html: `
              <h2 style="font-family:sans-serif;color:#12a05c;">Design Approved — Place Order on Navitor</h2>
              <p style="font-family:sans-serif;font-size:14px;color:#1a1a1a;">
                <strong>${order.owner_name}</strong> from <strong>${order.business_name}</strong>
                has approved their design for <strong>${order.qty}x ${order.product_title}</strong>.
              </p>
              <p style="font-family:sans-serif;font-size:14px;color:#1a1a1a;">
                Log into Navitor, upload the print file, and place the order.
              </p>
            `,
          }),
        })

        // Thank you email to customer
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Opervo Print <welcome@opervo.io>',
            to: [order.email],
            subject: `Order approved — printing soon! 🖨️`,
            html: `
              <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;">
                <p style="font-size:22px;font-weight:900;color:#0F0F0F;text-transform:uppercase;">Opervo<span style="color:#F5620F;">.</span></p>
                <h2 style="font-size:20px;font-weight:900;color:#0F0F0F;">You're all set, ${order.owner_name}!</h2>
                <p style="font-size:14px;color:#6B6B6B;line-height:1.6;">
                  Your design for <strong>${order.qty}x ${order.product_title}</strong> has been approved and sent to print.
                  Expect delivery within 5–7 business days.
                </p>
                <p style="font-size:13px;color:#6B6B6B;">Questions? Email <a href="mailto:help@opervo.io" style="color:#F5620F;">help@opervo.io</a></p>
              </div>
            `,
          }),
        })
      }

      return NextResponse.json({ success: true, action: 'approved' })
    }

    if (action === 'changes') {
      await db.from('print_orders')
        .update({ status: 'changes_requested', changes_requested: changes || '' })
        .eq('id', order.id)

      // Notify Opervo of requested changes
      if (resendKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Opervo Print <welcome@opervo.io>',
            to: ['opervo.io@gmail.com'],
            subject: `🔄 Changes Requested — ${order.business_name}`,
            html: `
              <h2 style="font-family:sans-serif;">Changes Requested</h2>
              <p style="font-family:sans-serif;font-size:14px;"><strong>${order.owner_name}</strong> from <strong>${order.business_name}</strong> requested changes:</p>
              <blockquote style="font-family:sans-serif;font-size:14px;background:#F7F5F2;border-left:3px solid #F5620F;padding:12px 16px;margin:0;">${changes}</blockquote>
              <p style="font-family:sans-serif;font-size:13px;color:#6B6B6B;margin-top:16px;">Revise and re-send a new proof at: <a href="https://opervo.io/print/order/${token}">order page</a></p>
            `,
          }),
        })
      }

      return NextResponse.json({ success: true, action: 'changes_requested' })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

  } catch (err) {
    console.error('print-approve error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
