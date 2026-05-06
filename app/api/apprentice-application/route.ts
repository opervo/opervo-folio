import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

type Payload = {
  first_name?: string
  last_name?: string
  email?: string
  date_of_birth?: string
  city?: string
  state?: string
  business_name?: string
  trade?: string
  social_handle?: string
  parent_name?: string
  parent_email?: string
  story?: string
}

const FOUNDER_EMAIL = 'help@opervo.io'
const REPLY_TO = 'help@opervo.io'

function calcAge(dobStr: string) {
  const dob = new Date(dobStr)
  if (isNaN(dob.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

function founderEmailHtml(p: Payload, age: number) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>New Apprentice application</title></head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F5F2;padding:24px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E8E4DE;max-width:600px;width:100%;">
      <tr><td style="background:#0F0F0F;padding:24px 28px;">
        <p style="margin:0;color:#F7F5F2;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Opervo<span style="color:#F5620F">.</span></p>
        <p style="margin:6px 0 0;color:#9CA3AF;font-size:13px;">New Apprentice application</p>
      </td></tr>

      <tr><td style="padding:28px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">APPLICANT · AGE ${age}</p>
        <h1 style="margin:8px 0 4px;font-size:26px;font-weight:900;color:#0F0F0F;letter-spacing:-0.5px;line-height:1.1;">${escape(p.first_name || '')} ${escape(p.last_name || '')}</h1>
        <p style="margin:0;font-size:14px;color:#6B6B6B;">${escape(p.business_name || '')} · ${escape(p.trade || '')} · ${escape(p.city || '')}, ${escape(p.state || '')}</p>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;font-size:14px;color:#1a1a1a;">
          <tr><td style="padding:8px 0;color:#6B6B6B;width:140px;">Email</td><td style="padding:8px 0;"><a href="mailto:${escape(p.email || '')}" style="color:#F5620F;text-decoration:none;">${escape(p.email || '')}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6B6B6B;">DOB</td><td style="padding:8px 0;">${escape(p.date_of_birth || '')}</td></tr>
          <tr><td style="padding:8px 0;color:#6B6B6B;">Social</td><td style="padding:8px 0;">${p.social_handle ? escape(p.social_handle) : '<span style="color:#9CA3AF;">(none provided)</span>'}</td></tr>
          <tr><td style="padding:8px 0;color:#6B6B6B;">Parent</td><td style="padding:8px 0;">${escape(p.parent_name || '')} · <a href="mailto:${escape(p.parent_email || '')}" style="color:#F5620F;text-decoration:none;">${escape(p.parent_email || '')}</a></td></tr>
        </table>

        <div style="margin-top:24px;padding:18px 20px;background:#F7F5F2;border-radius:8px;border-left:3px solid #F5620F;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.12em;">Their story</p>
          <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap;">${escape(p.story || '')}</p>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="padding-right:6px;">
              <a href="mailto:${escape(p.email || '')}?subject=Re%3A%20Opervo%20Apprentice%20application&cc=${encodeURIComponent(p.parent_email || '')}" style="display:block;background:#F5620F;color:#fff;font-weight:800;font-size:14px;padding:12px 16px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;text-align:center;">Approve / reply</a>
            </td>
            <td style="padding-left:6px;">
              <a href="mailto:${escape(p.email || '')}?subject=Re%3A%20Opervo%20Apprentice%20application" style="display:block;background:#fff;border:1px solid #E8E4DE;color:#1a1a1a;font-weight:700;font-size:14px;padding:11px 16px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;text-align:center;">Decline</a>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

function parentEmailHtml(p: Payload) {
  const teen = `${p.first_name || ''}`.trim() || 'your son or daughter'
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${escape(teen)} just applied to Opervo Apprentice</title></head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F5F2;padding:24px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E8E4DE;max-width:600px;width:100%;">
      <tr><td style="background:#0F0F0F;padding:24px 28px;">
        <p style="margin:0;color:#F7F5F2;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Opervo<span style="color:#F5620F">.</span></p>
        <p style="margin:6px 0 0;color:#9CA3AF;font-size:13px;">A heads-up from Max</p>
      </td></tr>

      <tr><td style="padding:32px 28px 8px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">JUST SO YOU KNOW</p>
        <h1 style="margin:8px 0 16px;font-size:26px;font-weight:900;color:#0F0F0F;letter-spacing:-0.5px;line-height:1.15;">${escape(teen)} just applied to Opervo Apprentice.</h1>
        <p style="margin:0 0 16px;font-size:16px;color:#1a1a1a;line-height:1.65;">Hi ${escape(p.parent_name || '')},</p>
        <p style="margin:0 0 16px;font-size:16px;color:#1a1a1a;line-height:1.65;">My name is Max — I founded Opervo. Your ${teen === (p.first_name || '').trim() ? 'kid' : 'son or daughter'} just applied to a free program I run for young operators (ages 13–17) who are either running a real service business or pitching one they're ready to start. They listed you as their parent or guardian, so I wanted to give you a quick heads-up.</p>
      </td></tr>

      <tr><td style="padding:0 28px 8px;">
        <div style="background:#F7F5F2;border-radius:10px;padding:20px 22px;border-left:3px solid #F5620F;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.12em;">What it is</p>
          <p style="margin:0 0 10px;font-size:15px;color:#1a1a1a;line-height:1.65;">Opervo is field-service software for solo operators — invoicing, scheduling, client management, the kind of thing tradespeople use to run their business.</p>
          <p style="margin:0 0 10px;font-size:15px;color:#1a1a1a;line-height:1.65;">If approved, ${escape(teen)} gets the same plan adult operators pay $24.99/month for, completely free. Plus a small kit (NFC business cards, stickers) and direct access to me.</p>
          <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;"><strong>There is no contract, no payment, and no obligation.</strong> They aren't required to post about us, sign anything, or do anything in exchange. The plan is just a gift.</p>
        </div>
      </td></tr>

      <tr><td style="padding:20px 28px 8px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.12em;">Why I'm doing this</p>
        <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;">I started my first business at 12 and I remember how much the tools cost. If a teenager today is doing the work, the software should not be the thing blocking them.</p>
      </td></tr>

      <tr><td style="padding:20px 28px 8px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.12em;">If you have questions or concerns</p>
        <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;">Just reply to this email — it goes straight to me. If you'd rather they not be in the program, also just reply and I'll throw out the application. No questions asked.</p>
      </td></tr>

      <tr><td style="padding:24px 28px 32px;">
        <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;">Thanks for raising someone with this kind of drive.</p>
        <p style="margin:8px 0 0;font-size:15px;color:#1a1a1a;line-height:1.65;">— Max<br><span style="color:#6B6B6B;font-size:13px;">Founder, Opervo</span></p>
      </td></tr>

      <tr><td style="padding:0 28px 24px;text-align:center;border-top:1px solid #E8E4DE;padding-top:20px;">
        <p style="margin:0;font-size:12px;color:#9CA3AF;">Learn more at <a href="https://www.opervo.io/apprentice" style="color:#6B6B6B;">opervo.io/apprentice</a> · Reply to this email to reach Max directly.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

async function sendResendEmail(to: string, subject: string, html: string, replyTo: string = REPLY_TO) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[apprentice] RESEND_API_KEY not set; skipping email send to', to)
    return { ok: false, reason: 'no_api_key' }
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Opervo <welcome@opervo.io>',
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    })
    if (!res.ok) {
      const txt = await res.text()
      console.error('[apprentice] Resend send error:', res.status, txt, 'to=', to)
      return { ok: false, reason: 'send_failed', status: res.status, body: txt }
    }
    const json = await res.json().catch(() => ({}))
    return { ok: true, id: json?.id }
  } catch (err) {
    console.error('[apprentice] Resend exception:', err, 'to=', to)
    return { ok: false, reason: 'exception' }
  }
}

export async function POST(req: NextRequest) {
  let p: Payload
  try {
    p = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Server-side validation (mirrors client)
  const required: (keyof Payload)[] = ['first_name', 'last_name', 'email', 'date_of_birth', 'business_name', 'trade', 'parent_name', 'parent_email', 'story']
  for (const k of required) {
    if (!p[k] || String(p[k]).trim() === '') {
      return NextResponse.json({ error: `Missing required field: ${k}` }, { status: 400 })
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email || '')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.parent_email || '')) {
    return NextResponse.json({ error: 'Invalid parent email' }, { status: 400 })
  }

  const age = calcAge(p.date_of_birth || '')
  if (age === null) {
    return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 })
  }
  if (age < 13 || age > 17) {
    return NextResponse.json({ error: `Apprentice is for ages 13–17 (you're ${age}).` }, { status: 400 })
  }

  // Normalize
  p.email = (p.email || '').toLowerCase().trim()
  p.parent_email = (p.parent_email || '').toLowerCase().trim()

  // 1. Save lead to Supabase (graceful degrade — uses guide_leads with source 'apprentice')
  const url = process.env.GUIDE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      const supabase = createClient(url, key)
      const { error } = await supabase.from('guide_leads').insert({
        email: p.email,
        source: 'apprentice',
        downloaded_at: new Date().toISOString(),
        metadata: {
          first_name: p.first_name,
          last_name: p.last_name,
          date_of_birth: p.date_of_birth,
          age,
          city: p.city,
          state: p.state,
          business_name: p.business_name,
          trade: p.trade,
          social_handle: p.social_handle || null,
          parent_name: p.parent_name,
          parent_email: p.parent_email,
          story: p.story,
        },
      })
      if (error && error.code !== '23505') {
        if (error.code === 'PGRST204' || /metadata/.test(error.message || '')) {
          await supabase.from('guide_leads').insert({
            email: p.email,
            source: 'apprentice',
            downloaded_at: new Date().toISOString(),
          })
        } else {
          console.error('[apprentice] Supabase insert error:', error.code, error.message)
        }
      }
    } catch (err) {
      console.error('[apprentice] Supabase exception:', err)
    }
  } else {
    console.warn('[apprentice] GUIDE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set; skipping lead capture')
  }

  // 2. Email to Max — application notification
  await sendResendEmail(
    FOUNDER_EMAIL,
    `Apprentice application · ${p.first_name} ${p.last_name} · age ${age} · ${p.business_name}`,
    founderEmailHtml(p, age),
    p.email,
  )

  // 3. Email to parent — transparency
  await sendResendEmail(
    p.parent_email!,
    `${p.first_name} just applied to Opervo Apprentice — a heads-up from Max`,
    parentEmailHtml(p),
  )

  return NextResponse.json({ ok: true })
}
