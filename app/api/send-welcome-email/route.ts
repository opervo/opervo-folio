import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const TEMPLATE_ID = '167765b2-85f3-4d77-bd30-694cf00400d5'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userId = body?.user_id || body?.record?.id
    const email = body?.email || body?.record?.email

    if (!email || !userId) {
      return NextResponse.json({ error: 'Missing user_id or email' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Get profile data for personalization
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: profile } = await supabase
      .from('profiles')
      .select('owner_name, business_name, business_slug')
      .eq('user_id', userId)
      .single()

    const ownerName = profile?.owner_name || profile?.business_name || ''
    const firstName = ownerName.split(' ')[0] || 'there'
    const slug = profile?.business_slug || 'your-slug'

    const trialEnd = new Date()
    trialEnd.setDate(trialEnd.getDate() + 30)
    const trialEndDate = trialEnd.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    // Fetch the template HTML from Resend
    const tplRes = await fetch(`https://api.resend.com/templates/${TEMPLATE_ID}`, {
      headers: { Authorization: `Bearer ${resendKey}` },
    })

    let html: string
    if (tplRes.ok) {
      const tpl = await tplRes.json()
      // Replace template variables {{{var}}} with actual values
      html = (tpl.html || '')
        .replace(/\{\{\{first_name\}\}\}/g, firstName)
        .replace(/\{\{\{trial_end_date\}\}\}/g, trialEndDate)
        .replace(/\{\{\{slug\}\}\}/g, slug)
        .replace(/\{\{\{unsubscribe_url\}\}\}/g, '#')
    } else {
      // Fallback plain HTML if template fetch fails
      html = `<p>Hey ${firstName}, welcome to Opervo! Your 30-day free trial runs until ${trialEndDate}.</p><p><a href="https://app.opervo.io">Open Opervo</a></p>`
    }

    // Send the email with rendered HTML
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Max at Opervo <welcome@opervo.io>',
        to: [email],
        subject: 'You are in. 30 days free starts now.',
        html: html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 })
    }

    const result = await res.json()
    return NextResponse.json({ success: true, id: result.id }, { status: 200 })
  } catch (err) {
    console.error('Welcome email error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
