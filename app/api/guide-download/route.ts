import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Force this route to always run dynamically — never cached
export const dynamic = 'force-dynamic'

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
        if (error.code === '23505') {
          // Duplicate email — fine, skip silently
        } else {
          console.error('Supabase insert error:', error.code, error.message)
        }
      } else {
        console.log('Guide lead captured:', email.toLowerCase().trim())
      }
    } catch (err) {
      console.error('Supabase exception:', err)
    }
  } else {
    console.warn('GUIDE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set')
  }

  return NextResponse.json({ ok: true })
}
