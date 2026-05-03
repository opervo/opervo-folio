import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

type Inputs = {
  trade?: string
  revenue?: number
  hours?: number
  materials?: number
  mileage_miles?: number
  helpers_paid?: number
}

const MILEAGE_RATE = 0.67

function compute(i: Inputs) {
  const rev = Number(i.revenue) || 0
  const h = Number(i.hours) || 0
  const mat = Number(i.materials) || 0
  const mi = Number(i.mileage_miles) || 0
  const help = Number(i.helpers_paid) || 0
  const mileageCost = mi * MILEAGE_RATE
  const totalCost = mat + mileageCost + help
  const profit = rev - totalCost
  const hourly = h > 0 ? profit / h : 0
  const margin = rev > 0 ? profit / rev : 0
  return { rev, h, mat, mi, help, mileageCost, totalCost, profit, hourly, margin }
}

const $ = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const $$ = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function emailHtml(i: Inputs) {
  const c = compute(i)
  const trade = i.trade || 'home service'
  const profitColor = c.margin >= 0.4 ? '#10B981' : c.margin >= 0.2 ? '#F5620F' : '#DC2626'

  // Personalized insights (max 2)
  const insights: string[] = []
  if (c.rev > 0 && c.hourly < 25 && c.h > 0) {
    insights.push(`<strong>Your effective hourly is ${$(c.hourly)}/hr.</strong> That’s below most trades’ break-even after taxes, insurance, and equipment depreciation. Either re-price the job or scope it tighter next time.`)
  } else if (c.rev > 0 && c.hourly >= 75) {
    insights.push(`<strong>${$(c.hourly)}/hr is strong.</strong> Anything you can do to repeat this exact job (recurring agreement, similar property type, same neighborhood) is gold.`)
  }
  if (c.mileageCost > 0 && c.mileageCost / Math.max(c.rev, 1) > 0.08) {
    insights.push(`<strong>Drive time is eating you.</strong> Mileage cost (${$$(c.mileageCost)}) is over 8% of revenue. Cluster nearby jobs into the same day, or charge a travel fee outside your zone.`)
  }
  if (c.mat > 0 && c.mat / Math.max(c.rev, 1) > 0.25 && insights.length < 2) {
    insights.push(`<strong>Materials are heavy.</strong> Materials are ${(c.mat / c.rev * 100).toFixed(0)}% of revenue. Worth tracking per-job — bulk-buy, switch suppliers, or raise prices on jobs where chems dominate.`)
  }
  if (insights.length === 0) {
    insights.push(`<strong>Looks healthy.</strong> Profit, margin, and hourly are all in a good range. The pattern shows up after 5–10 jobs, not 1.`)
  }

  // 2 universal "ways operators leak profit" tips
  const leakTips = [
    `<strong>Drive time is invisible work.</strong> An average operator burns 6–8 hours/week on the road. If you’re not pricing it in, it eats your margin silently — every $0.67 per mile is a tax-deductible cost you should be charging back.`,
    `<strong>Materials creep is real.</strong> Most operators underestimate chem/product cost by 15–30%. A $20-off-brand swap on a recurring service plan compounds to thousands per year.`,
  ]

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your job profit numbers</title></head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F5F2;padding:24px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E8E4DE;max-width:600px;width:100%;">
      <tr><td style="background:#0F0F0F;padding:24px 28px;">
        <p style="margin:0;color:#F7F5F2;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Opervo<span style="color:#F5620F">.</span></p>
        <p style="margin:6px 0 0;color:#9CA3AF;font-size:13px;">Your job profit numbers</p>
      </td></tr>

      <tr><td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">${trade.toUpperCase()} JOB</p>
        <h1 style="margin:8px 0 4px;font-size:30px;font-weight:900;color:#0F0F0F;letter-spacing:-1px;line-height:1.05;">${$(c.profit)} <span style="color:${profitColor}">profit</span></h1>
        <p style="margin:0;font-size:14px;color:#6B6B6B;">on ${$$(c.rev)} revenue · ${c.h} hr on site · ${c.mi.toFixed(0)} mi round trip</p>
      </td></tr>

      <tr><td style="padding:16px 28px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:14px 16px;background:#F7F5F2;border-radius:8px;width:33%;">
              <p style="margin:0;font-size:10px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;">Profit</p>
              <p style="margin:2px 0 0;font-size:22px;font-weight:900;color:${profitColor};letter-spacing:-0.5px;">${$(c.profit)}</p>
            </td>
            <td style="width:8px;"></td>
            <td style="padding:14px 16px;background:#F7F5F2;border-radius:8px;width:33%;">
              <p style="margin:0;font-size:10px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;">Hourly</p>
              <p style="margin:2px 0 0;font-size:22px;font-weight:900;color:${profitColor};letter-spacing:-0.5px;">${c.h > 0 ? $(c.hourly) + '/hr' : '—'}</p>
            </td>
            <td style="width:8px;"></td>
            <td style="padding:14px 16px;background:#F7F5F2;border-radius:8px;width:33%;">
              <p style="margin:0;font-size:10px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;">Margin</p>
              <p style="margin:2px 0 0;font-size:22px;font-weight:900;color:${profitColor};letter-spacing:-0.5px;">${(c.margin * 100).toFixed(1)}%</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:20px 28px 8px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.12em;">Where the money goes</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#1a1a1a;">
          <tr><td style="padding:6px 0;">Revenue</td><td style="padding:6px 0;text-align:right;">${$$(c.rev)}</td></tr>
          <tr><td style="padding:6px 0;color:#6B6B6B;">− Materials</td><td style="padding:6px 0;text-align:right;color:#6B6B6B;">−${$$(c.mat)}</td></tr>
          <tr><td style="padding:6px 0;color:#6B6B6B;">− Mileage (${c.mi.toFixed(0)} mi @ $${MILEAGE_RATE.toFixed(2)})</td><td style="padding:6px 0;text-align:right;color:#6B6B6B;">−${$$(c.mileageCost)}</td></tr>
          <tr><td style="padding:6px 0;color:#6B6B6B;">− Helpers paid</td><td style="padding:6px 0;text-align:right;color:#6B6B6B;">−${$$(c.help)}</td></tr>
          <tr><td style="padding:10px 0 6px;border-top:1px solid #E8E4DE;font-weight:800;">= Profit</td><td style="padding:10px 0 6px;border-top:1px solid #E8E4DE;text-align:right;font-weight:800;color:${profitColor};">${$$(c.profit)}</td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:24px 28px 8px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">What this tells us</p>
        ${insights.map((i) => `<p style="margin:0 0 10px;font-size:14px;color:#1a1a1a;line-height:1.55;">• ${i}</p>`).join('')}
      </td></tr>

      <!-- TRACKER CTA — the carrot -->
      <tr><td style="padding:16px 28px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(245,98,15,0.08);border:1px solid rgba(245,98,15,0.3);border-radius:10px;">
          <tr><td style="padding:24px 22px;">
            <p style="margin:0;font-size:11px;font-weight:800;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">Track every job · Free, no login</p>
            <p style="margin:8px 0 6px;font-size:20px;font-weight:900;color:#0F0F0F;letter-spacing:-0.5px;line-height:1.2;">The pattern shows up after 5 jobs.<br>Not 1.</p>
            <p style="margin:0 0 16px;font-size:14px;color:#3a3a3a;line-height:1.55;">One job tells you a number. Five jobs tell you which work actually pays. Use the Multi-Job Profit Tracker to log them — saves to your phone, exports to CSV, no account needed.</p>
            <a href="https://opervo.io/multi-job-tracker" style="display:inline-block;background:#0F0F0F;color:#fff;font-weight:800;font-size:14px;padding:12px 24px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;">Open the tracker →</a>
          </td></tr>
        </table>
      </td></tr>

      <!-- 2 educational tips -->
      <tr><td style="padding:24px 28px 8px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.12em;">Two things most operators leak</p>
        ${leakTips.map((t) => `<p style="margin:0 0 14px;font-size:14px;color:#1a1a1a;line-height:1.6;">• ${t}</p>`).join('')}
        <p style="margin:14px 0 0;font-size:13px;color:#6B6B6B;font-style:italic;">More on this in a few days — we’ll send a couple short notes on profit patterns operators usually miss.</p>
      </td></tr>

      <tr><td style="padding:16px 28px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0F0F0F;border-radius:10px;">
          <tr><td style="padding:24px 24px;text-align:center;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.14em;">When you’re ready to stop tracking manually</p>
            <p style="margin:10px 0 12px;font-size:18px;font-weight:900;color:#F7F5F2;letter-spacing:-0.5px;line-height:1.2;">Opervo logs the chems, the miles, and the math<br>on every single job.</p>
            <p style="margin:0 0 18px;font-size:13px;color:#B8B8B8;line-height:1.55;">$24.99/mo, all-in. Founding 50 operators lock $15/mo for life.</p>
            <a href="https://app.opervo.io" style="display:inline-block;background:#F5620F;color:#fff;font-weight:800;font-size:14px;padding:13px 28px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;">Start Free — 14 Days</a>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:0 28px 24px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9CA3AF;">You’re getting this because you used the Job Profit Calculator at <a href="https://opervo.io/profit-calculator" style="color:#6B6B6B;">opervo.io/profit-calculator</a>.</p>
        <p style="margin:6px 0 0;font-size:12px;color:#9CA3AF;">No spam ever. Reply to this email to reach Max directly.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

async function sendResendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set; skipping email send')
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
        reply_to: 'help@opervo.io',
      }),
    })
    if (!res.ok) {
      const txt = await res.text()
      console.error('Resend send error:', res.status, txt)
      return { ok: false, reason: 'send_failed', status: res.status }
    }
    return { ok: true }
  } catch (err) {
    console.error('Resend exception:', err)
    return { ok: false, reason: 'exception' }
  }
}

export async function POST(req: NextRequest) {
  let email: string
  let inputs: Inputs = {}

  try {
    const body = await req.json()
    email = body?.email
    inputs = {
      trade: body?.trade,
      revenue: Number(body?.revenue) || 0,
      hours: Number(body?.hours) || 0,
      materials: Number(body?.materials) || 0,
      mileage_miles: Number(body?.mileage_miles) || 0,
      helpers_paid: Number(body?.helpers_paid) || 0,
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const cleanEmail = email.toLowerCase().trim()

  // 1. Save lead to Supabase (graceful degrade)
  const url = process.env.GUIDE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      const supabase = createClient(url, key)
      const { error } = await supabase
        .from('guide_leads')
        .insert({
          email: cleanEmail,
          source: 'profit_calculator',
          downloaded_at: new Date().toISOString(),
          metadata: inputs,
        })
      if (error && error.code !== '23505') {
        if (error.code === 'PGRST204' || /metadata/.test(error.message || '')) {
          await supabase.from('guide_leads').insert({
            email: cleanEmail,
            source: 'profit_calculator',
            downloaded_at: new Date().toISOString(),
          })
        } else {
          console.error('Supabase insert error:', error.code, error.message)
        }
      }
    } catch (err) {
      console.error('Supabase exception:', err)
    }
  } else {
    console.warn('GUIDE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set; skipping lead capture')
  }

  // 2. Send email with their numbers (graceful degrade)
  const profit = compute(inputs).profit
  const subject = profit >= 0
    ? `Your ${inputs.trade?.toLowerCase() || 'job'} numbers — ${$(profit)} profit`
    : `Your ${inputs.trade?.toLowerCase() || 'job'} numbers — the math`
  await sendResendEmail(cleanEmail, subject, emailHtml(inputs))

  return NextResponse.json({ ok: true })
}
