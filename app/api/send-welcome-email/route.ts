import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userId = body?.user_id || body?.record?.id
    const email = body?.email || body?.record?.email

    if (!email || !userId) {
      return NextResponse.json({ error: 'Missing user_id or email' }, { status: 400 })
    }

    // Get profile data for personalization (uses service role if available, anon key as fallback)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: profile } = await supabase
      .from('profiles')
      .select('owner_name, business_name')
      .eq('id', userId)
      .single()

    const { data: opProfile } = await supabase
      .from('operator_profiles')
      .select('slug')
      .eq('user_id', userId)
      .single()

    const ownerName = profile?.owner_name || profile?.business_name || ''
    const firstName = ownerName.split(' ')[0] || 'there'
    const slug = opProfile?.slug || 'your-slug'

    // Calculate trial end date
    const trialEnd = new Date()
    trialEnd.setDate(trialEnd.getDate() + 30)
    const trialEndDate = trialEnd.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    // Send via Resend template
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

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
        template_id: '167765b2-85f3-4d77-bd30-694cf00400d5',
        template_data: {
          first_name: firstName,
          trial_end_date: trialEndDate,
          slug: slug,
        },
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
