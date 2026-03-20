import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Instantiate inside handler so build doesn't crash without env vars
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Upsert — idempotent, no duplicate rows if same email downloads twice
    const { error } = await supabase
      .from('guide_leads')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          source: 'guide_page',
          downloaded_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('Supabase error:', error)
      // Don't block the download on a DB write failure
      // Just log and continue
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Guide download error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
