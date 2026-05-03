'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const TRADES = [
  'Pressure washing',
  'Window cleaning',
  'Landscaping',
  'Solar panel cleaning',
  'Auto detailing',
  'Other home service',
] as const

// IRS 2026 standard mileage rate (placeholder — keep current). Used only for the "what your miles cost" line.
const MILEAGE_COST_PER_MILE = 0.67

const fmtMoney = (n: number) =>
  isFinite(n) ? `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'
const fmtMoneyRound = (n: number) =>
  isFinite(n) ? `$${Math.round(n).toLocaleString('en-US')}` : '—'
const fmtPct = (n: number) => (isFinite(n) ? `${(n * 100).toFixed(1)}%` : '—')

function profitColor(profit: number, revenue: number) {
  if (revenue <= 0) return '#6B6B6B'
  const margin = profit / revenue
  if (margin >= 0.4) return '#10B981'
  if (margin >= 0.2) return '#F5620F'
  return '#DC2626'
}

export default function ProfitCalculatorPage() {
  const [trade, setTrade] = useState<string>('Pressure washing')
  const [revenue, setRevenue] = useState<string>('400')
  const [hours, setHours] = useState<string>('3')
  const [materials, setMaterials] = useState<string>('45')
  const [mileage, setMileage] = useState<string>('20')
  const [helpers, setHelpers] = useState<string>('0')
  const [targetHourly, setTargetHourly] = useState<string>('100')

  const [email, setEmail] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { rev, h, mat, mi, help, mileageCost, totalCost, profit, hourly, margin, target, suggestPrice } = useMemo(() => {
    const rev = Number(revenue) || 0
    const h = Number(hours) || 0
    const mat = Number(materials) || 0
    const mi = Number(mileage) || 0
    const help = Number(helpers) || 0
    const mileageCost = mi * MILEAGE_COST_PER_MILE
    const totalCost = mat + mileageCost + help
    const profit = rev - totalCost
    const hourly = h > 0 ? profit / h : 0
    const margin = rev > 0 ? profit / rev : 0
    const target = Number(targetHourly) || 0
    const suggestPrice = totalCost + target * h
    return { rev, h, mat, mi, help, mileageCost, totalCost, profit, hourly, margin, target, suggestPrice }
  }, [revenue, hours, materials, mileage, helpers, targetHourly])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/profit-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, trade, revenue: rev, hours: h, materials: mat, mileage_miles: mi, helpers_paid: help }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      {/* JSON-LD: WebApplication */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Opervo Job Profit Calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://opervo.io/profit-calculator',
        description: 'Free job profit calculator for home-service operators. Enter revenue, hours, materials, and mileage — see your profit, hourly rate, and margin live.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />

      <div className="no-print"><SiteNav /></div>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 24px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Free tool · No login
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5.2vw, 52px)', lineHeight: 1.02, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Did that job actually pay<span style={{ color: '#F5620F' }}>?</span>
        </h1>
        <p style={{ fontSize: 17, color: '#3a3a3a', lineHeight: 1.55, maxWidth: 640, margin: '0 auto 12px', fontWeight: 500 }}>
          Enter your numbers. Get profit, effective hourly, and margin — live. Then see what you should charge to hit your target hourly.
        </p>
        <p style={{ fontSize: 13, color: '#6B6B6B', maxWidth: 580, margin: '0 auto' }}>
          Built for solo operators in home services. Most operators have no idea their actual hourly is half what they think after materials and drive time.
        </p>
      </section>

      {/* CALCULATOR + RESULTS */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>

          {/* INPUTS */}
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '28px 26px' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 18 }}>
              Your job
            </p>

            <Field label="What trade?">
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={inputStyle}>
                {TRADES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Total revenue from the job" suffix="$" prefix>
              <input type="number" inputMode="decimal" min="0" step="1" value={revenue} onChange={(e) => setRevenue(e.target.value)} style={inputStyle} placeholder="400" />
            </Field>

            <Field label="Time on site (hours)" suffix="hr">
              <input type="number" inputMode="decimal" min="0" step="0.25" value={hours} onChange={(e) => setHours(e.target.value)} style={inputStyle} placeholder="3" />
            </Field>

            <Field label="Materials cost" suffix="$" prefix>
              <input type="number" inputMode="decimal" min="0" step="1" value={materials} onChange={(e) => setMaterials(e.target.value)} style={inputStyle} placeholder="45" />
            </Field>

            <Field label="Round-trip mileage" suffix="mi">
              <input type="number" inputMode="decimal" min="0" step="1" value={mileage} onChange={(e) => setMileage(e.target.value)} style={inputStyle} placeholder="20" />
            </Field>

            <Field label="Helpers paid (total)" suffix="$" prefix>
              <input type="number" inputMode="decimal" min="0" step="1" value={helpers} onChange={(e) => setHelpers(e.target.value)} style={inputStyle} placeholder="0" />
            </Field>

            <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 12, lineHeight: 1.5 }}>
              Mileage is costed at the IRS standard mileage rate (${MILEAGE_COST_PER_MILE.toFixed(2)}/mi) — your fuel + wear-and-tear deduction.
            </p>
          </div>

          {/* RESULTS */}
          <div style={{ background: '#0F0F0F', borderRadius: 12, padding: '28px 26px', color: '#F7F5F2', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,98,15,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 18 }}>
                The math
              </p>

              <Stat label="Profit on this job" value={fmtMoneyRound(profit)} valueColor={profitColor(profit, rev)} big />
              <Stat label="Effective hourly rate" value={h > 0 ? `${fmtMoneyRound(hourly)}/hr` : '—'} valueColor={profitColor(profit, rev)} />
              <Stat label="Profit margin" value={fmtPct(margin)} valueColor={profitColor(profit, rev)} />

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0 16px' }} />

              <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Where the money goes</p>
              <Row label="Revenue" value={fmtMoney(rev)} />
              <Row label="− Materials" value={`−${fmtMoney(mat)}`} />
              <Row label={`− Mileage (${mi.toFixed(0)} mi @ $${MILEAGE_COST_PER_MILE.toFixed(2)})`} value={`−${fmtMoney(mileageCost)}`} />
              <Row label="− Helpers paid" value={`−${fmtMoney(help)}`} />
              <Row label="= Profit" value={fmtMoney(profit)} bold color={profitColor(profit, rev)} />
            </div>
          </div>
        </div>

        {/* REVERSE CALC */}
        <div style={{ background: 'rgba(245,98,15,0.06)', border: '1px solid rgba(245,98,15,0.2)', borderRadius: 12, padding: '24px 26px', marginTop: 20 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 12 }}>
            What should I charge?
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 500 }}>To make</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', border: '1px solid #E8E4DE', borderRadius: 8, padding: '4px 8px' }}>
              <span style={{ color: '#6B6B6B', fontWeight: 600, marginRight: 4 }}>$</span>
              <input type="number" inputMode="decimal" min="0" step="5" value={targetHourly} onChange={(e) => setTargetHourly(e.target.value)} style={{ ...inputStyle, width: 80, border: 'none', padding: '8px 0', fontWeight: 700, fontSize: 16 }} />
              <span style={{ color: '#6B6B6B', fontWeight: 600, marginLeft: 4 }}>/hr</span>
            </div>
            <span style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 500 }}>on a {h || '—'} hr {trade.toLowerCase()} job at {mi || '—'} mi round trip,</span>
          </div>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 32px)', color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
            Charge at least <span style={{ color: '#F5620F' }}>{fmtMoneyRound(suggestPrice)}</span>.
          </p>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginTop: 8, lineHeight: 1.55 }}>
            That covers materials ({fmtMoney(mat)}), mileage ({fmtMoney(mileageCost)}), helpers ({fmtMoney(help)}), and the {fmtMoneyRound(target * h)} you want to take home for {h || '—'} hours of work.
          </p>
        </div>

        {/* INSIGHTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 28 }}>
          {(() => {
            const cards: Array<{ icon: string; title: string; body: string }> = []
            if (rev > 0 && hourly < 25 && h > 0) {
              cards.push({ icon: '⚠️', title: `Effective hourly: ${fmtMoneyRound(hourly)}/hr`, body: 'That\'s below most trades\' break-even after taxes, insurance, and equipment depreciation. The job either needs to be priced higher or scoped tighter.' })
            } else if (rev > 0 && hourly >= 75) {
              cards.push({ icon: '✅', title: `Effective hourly: ${fmtMoneyRound(hourly)}/hr`, body: 'Strong number. Anything you can do to repeat this exact job (same client recurring, similar properties) is gold.' })
            } else if (rev > 0 && h > 0) {
              cards.push({ icon: '💡', title: `Effective hourly: ${fmtMoneyRound(hourly)}/hr`, body: 'Solid for an hourly. Track this across 5-10 jobs to find the work types that actually pay best.' })
            }
            if (mileageCost > 0 && mileageCost / Math.max(rev, 1) > 0.08) {
              cards.push({ icon: '🛣️', title: 'Drive time is eating you', body: `Mileage cost (${fmtMoney(mileageCost)}) is over 8% of revenue. Route-clustering nearby jobs into the same day or charging a travel fee outside your zone fixes this fast.` })
            }
            if (mat > 0 && mat / Math.max(rev, 1) > 0.25) {
              cards.push({ icon: '🧴', title: 'Materials are heavy', body: `Materials are ${fmtPct(mat / rev)} of revenue. Worth tracking per-job — bulk-buy, switch suppliers, or raise prices on jobs where chems/products dominate.` })
            }
            if (help > 0 && (help + mileageCost + mat) / Math.max(rev, 1) > 0.6) {
              cards.push({ icon: '👥', title: 'Total cost ratio is high', body: `Materials + mileage + helpers = ${fmtPct((help + mileageCost + mat) / rev)} of revenue. Margin gets thin fast — recheck pricing or cut a cost.` })
            }
            if (cards.length === 0) {
              cards.push({ icon: '✅', title: 'Looks healthy', body: 'Profit, margin, and hourly are all in a good range for this trade. Run more jobs through the calculator and find the patterns.' })
            }
            return cards.slice(0, 3).map((c) => (
              <div key={c.title} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '-0.2px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.55 }}>{c.body}</p>
              </div>
            ))
          })()}
        </div>
      </section>

      {/* SAVE / EMAIL */}
      <section className="no-print" style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '48px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          {!submitted ? (
            <>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 10 }}>
                Save these numbers + get the playbook
              </h2>
              <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 560, margin: '0 auto 20px', lineHeight: 1.6 }}>
                Drop your email and we&rsquo;ll send a copy of this calculation along with our short pricing playbook for {trade.toLowerCase()} operators. No spam.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 480, margin: '0 auto' }}>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ flex: '1 1 240px', minWidth: 220, padding: '13px 14px', border: '1px solid #E8E4DE', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                <button type="submit" disabled={submitting} style={{ background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '13px 24px', borderRadius: 6, border: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? 'Sending…' : 'Email me a copy →'}
                </button>
              </form>
              {error && <p style={{ color: '#DC2626', fontSize: 13, marginTop: 10 }}>{error}</p>}
              <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12 }}>Or just <button type="button" onClick={() => window.print()} style={{ color: '#F5620F', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, padding: 0, fontFamily: 'inherit' }}>save this page as a PDF</button> — no email required.</p>
            </>
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 10 }}>
                Sent. Check your inbox.
              </h2>
              <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 540, margin: '0 auto 18px', lineHeight: 1.6 }}>
                Your numbers are on the way. The pattern shows up after 5 jobs, not 1 — try the Multi-Job Profit Tracker to log them all in one place (saves to your phone, no account).
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/multi-job-tracker" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '13px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Open the Multi-Job Tracker →
                </Link>
                <a href="https://app.opervo.io" style={{ display: 'inline-block', background: 'transparent', color: '#0F0F0F', border: '1px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Try Opervo Free
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SOFT CTA */}
      <section className="no-print" style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ background: '#0F0F0F', borderRadius: 16, padding: '40px 32px', color: '#F7F5F2', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,98,15,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>What if every job tracked this for you?</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 32px)', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 16 }}>
              Opervo logs the chems, the miles, and the math<br />on every single job<span style={{ color: '#F5620F' }}>.</span>
            </h2>
            <p style={{ fontSize: 15, color: '#B8B8B8', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.65 }}>
              Build a catalog of supplies, log usage in seconds, see Revenue − Supplies = Profit live on every job. Plus mileage, recurring agreements, route optimization, a public folio — all-in at $24.99/mo.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '13px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Start Free — 14 Days
              </a>
              <Link href="/features" style={{ display: 'inline-block', background: 'transparent', color: '#F7F5F2', border: '1px solid rgba(255,255,255,0.25)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                See all features
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="no-print"><SiteFooter /></div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #E8E4DE',
  borderRadius: 6,
  fontSize: 15,
  fontFamily: 'inherit',
  background: '#fff',
  outline: 'none',
  color: '#0F0F0F',
}

function Field({ label, children, suffix }: { label: string; children: React.ReactNode; suffix?: string; prefix?: boolean }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B6B6B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}{suffix ? <span style={{ color: '#9CA3AF', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}> ({suffix})</span> : null}
      </span>
      {children}
    </label>
  )
}

function Stat({ label, value, valueColor, big }: { label: string; value: string; valueColor?: string; big?: boolean }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: big ? 44 : 26, color: valueColor || '#F7F5F2', lineHeight: 1.05, letterSpacing: '-1px' }}>{value}</p>
    </div>
  )
}

function Row({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: color || '#B8B8B8', padding: '4px 0', fontWeight: bold ? 800 : 500, borderTop: bold ? '1px solid rgba(255,255,255,0.1)' : 'none', marginTop: bold ? 8 : 0, paddingTop: bold ? 10 : 4 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
