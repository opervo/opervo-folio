import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  let email: string

  try {
    const body = await req.json()
    email = body?.email
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Fire-and-forget Supabase write — never blocks the download
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && key) {
    try {
      const supabase = createClient(url, key)
      await supabase
        .from('guide_leads')
        .upsert(
          {
            email: email.toLowerCase().trim(),
            source: 'guide_page',
            downloaded_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        )
    } catch (err) {
      console.error('Supabase write failed (non-blocking):', err)
    }
  } else {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set — lead not captured')
  }

  return NextResponse.json({ ok: true })
}
