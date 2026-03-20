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

  const url = process.env.GUIDE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && key) {
    try {
      const supabase = createClient(url, key)
      const { error } = await supabase
        .from('guide_leads')
        .insert({
          email: email.toLowerCase().trim(),
          source: 'guide_page',
          downloaded_at: new Date().toISOString(),
        })

      if (error) {
        // Duplicate email — that's fine, just ignore it
        if (error.code === '23505') {
          console.log('Duplicate email, skipping:', email)
        } else {
          console.error('Supabase insert error:', error.code, error.message)
        }
      }
    } catch (err) {
      console.error('Supabase exception (non-blocking):', err)
    }
  } else {
    console.warn('Guide Supabase env vars not set — lead not captured')
  }

  return NextResponse.json({ ok: true })
}
