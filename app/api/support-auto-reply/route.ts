import { NextRequest, NextResponse } from 'next/server'

const SUPPORT_AUTO_REPLY_HTML = (senderName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:26px;font-weight:900;color:#0F0F0F;letter-spacing:-0.5px;">
        Opervo<span style="color:#F5620F;">.</span>
      </span>
    </div>

    <!-- Card -->
    <div style="background:#ffffff;border:1px solid #E8E4DE;border-radius:12px;padding:32px 28px;">
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#0F0F0F;">
        We got your message!
      </h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#1a1a1a;">
        Hey${senderName ? ` ${senderName}` : ''},
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#1a1a1a;">
        Thanks for reaching out to Opervo Support. We've received your message and a real human will get back to you within <strong>24 hours</strong>.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#1a1a1a;">
        If this is urgent, just reply to this email and we'll prioritize it.
      </p>
      <div style="border-top:1px solid #E8E4DE;padding-top:20px;">
        <p style="margin:0;font-size:13px;color:#6B6B6B;">
          — The Opervo Team
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="margin:0;font-size:11px;color:#6B6B6B;">
        Opervo — Look pro. Win jobs.
      </p>
      <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">
        <a href="https://www.opervo.io" style="color:#9ca3af;text-decoration:none;">opervo.io</a>
      </p>
    </div>
  </div>
</body>
</html>
`

export async function POST(req: NextRequest) {
  try {
    const { to, senderName } = await req.json()

    if (!to) {
      return NextResponse.json({ error: 'Missing "to" email address' }, { status: 400 })
    }

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
        from: 'Opervo Support <help@opervo.io>',
        to,
        subject: 'We got your message — Opervo Support',
        html: SUPPORT_AUTO_REPLY_HTML(senderName || ''),
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ success: true, id: data.id })
  } catch (e) {
    console.error('support-auto-reply error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
