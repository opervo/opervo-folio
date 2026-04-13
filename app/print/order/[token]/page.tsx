import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ApprovalClient from './ApprovalClient'
import { getSupabaseServer } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Review Your Design — Opervo Print',
  robots: { index: false },
}

export default async function OrderApprovalPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ action?: string }>
}) {
  const { token } = await params
  const { action } = await searchParams

  let db
  try {
    db = getSupabaseServer()
  } catch {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: 40, textAlign: 'center', color: '#6B6B6B' }}>
        Service temporarily unavailable.
      </div>
    )
  }

  const { data: order, error } = await db
    .from('print_orders')
    .select('id, approval_token, status, product_title, qty, price_paid, color_theme, business_name, owner_name, trade, phone, email, website, notes, approved_at, changes_requested, created_at')
    .eq('approval_token', token)
    .maybeSingle()

  if (error || !order) return notFound()

  // Direct approve via email link — handle server-side
  if (action === 'approve' && order.status !== 'approved') {
    await db.from('print_orders')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', order.id)

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      // Notify Opervo
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Opervo Print <welcome@opervo.io>',
          to: ['opervo.io@gmail.com'],
          subject: `🟢 APPROVED — ${order.qty}x ${order.product_title} · ${order.business_name}`,
          html: `<p style="font-family:sans-serif;"><strong>${order.owner_name}</strong> approved their design for <strong>${order.qty}x ${order.product_title}</strong>. Place the Navitor order now.</p>`,
        }),
      }).catch(() => {})

      // Thank customer
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Opervo Print <welcome@opervo.io>',
          to: [order.email],
          subject: `Order approved — printing soon! 🖨️`,
          html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;"><p style="font-size:22px;font-weight:900;">Opervo<span style="color:#F5620F;">.</span></p><h2>You're all set, ${order.owner_name}!</h2><p style="color:#6B6B6B;">Your ${order.qty}x ${order.product_title} has been approved and sent to print. Expect delivery in 5–7 business days.</p><p style="color:#6B6B6B;font-size:13px;">Questions? <a href="mailto:help@opervo.io" style="color:#F5620F;">help@opervo.io</a></p></div>`,
        }),
      }).catch(() => {})
    }

    order.status = 'approved'
  }

  return <ApprovalClient order={order} />
}
