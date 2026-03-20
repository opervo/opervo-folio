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

  // Fire-and-forget — uses a dedicated env var so it never conflicts with
  // the main app's Supabase project
  const url = process.env.GUIDE_SUPABASE_URL
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
    console.warn('Guide Supabase env vars not set — lead not captured')
  }

  // Always return ok so download is never blocked
  return NextResponse.json({ ok: true })
}
