'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const STORAGE_KEY = 'opervo_multi_job_tracker_v1'
const MILEAGE_RATE = 0.67

type Job = {
  id: string
  date: string
  label: string
  revenue: number
  hours: number
  materials: number
  mileageMiles: number
  helpersPaid: number
}

const $ = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const $$ = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function profitOf(j: Job) {
  const cost = j.materials + j.mileageMiles * MILEAGE_RATE + j.helpersPaid
  return j.revenue - cost
}
function hourlyOf(j: Job) {
  return j.hours > 0 ? profitOf(j) / j.hours : 0
}
function marginOf(j: Job) {
  return j.revenue > 0 ? profitOf(j) / j.revenue : 0
}
function pillColor(margin: number) {
  if (margin >= 0.4) return '#10B981'
  if (margin >= 0.2) return '#F5620F'
  return '#DC2626'
}

const blank: Omit<Job, 'id'> = {
  date: new Date().toISOString().slice(0, 10),
  label: '',
  revenue: 0,
  hours: 0,
  materials: 0,
  mileageMiles: 0,
  helpersPaid: 0,
}

export default function MultiJobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [draft, setDraft] = useState<Omit<Job, 'id'>>(blank)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setJobs(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch {}
  }, [jobs, hydrated])

  function addJob() {
    if (draft.revenue <= 0 && draft.hours <= 0) return
    const job: Job = {
      ...draft,
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      label: draft.label.trim() || 'Untitled job',
    }
    setJobs([job, ...jobs])
    setDraft({ ...blank, date: draft.date })
  }
  function removeJob(id: string) {
    setJobs(jobs.filter((j) => j.id !== id))
  }
  function clearAll() {
    if (jobs.length === 0) return
    if (confirm(`Delete all ${jobs.length} jobs from this tracker? This can’t be undone.`)) {
      setJobs([])
    }
  }
  function exportCsv() {
    if (jobs.length === 0) return
    const header = ['Date', 'Label', 'Revenue', 'Hours', 'Materials', 'Mileage (mi)', 'Helpers paid', 'Profit', 'Hourly', 'Margin %']
    const rows = jobs.map((j) => [
      j.date,
      `"${j.label.replace(/"/g, '""')}"`,
      j.revenue,
      j.hours,
      j.materials,
      j.mileageMiles,
      j.helpersPaid,
      profitOf(j).toFixed(2),
      hourlyOf(j).toFixed(2),
      (marginOf(j) * 100).toFixed(1),
    ])
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `opervo-jobs-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const stats = useMemo(() => {
    if (jobs.length === 0) {
      return { count: 0, totalRev: 0, totalProfit: 0, totalHours: 0, totalMiles: 0, totalMaterials: 0, avgHourly: 0, avgMargin: 0, best: null as Job | null, worst: null as Job | null }
    }
    const totalRev = jobs.reduce((s, j) => s + j.revenue, 0)
    const totalProfit = jobs.reduce((s, j) => s + profitOf(j), 0)
    const totalHours = jobs.reduce((s, j) => s + j.hours, 0)
    const totalMiles = jobs.reduce((s, j) => s + j.mileageMiles, 0)
    const totalMaterials = jobs.reduce((s, j) => s + j.materials, 0)
    const avgHourly = totalHours > 0 ? totalProfit / totalHours : 0
    const avgMargin = totalRev > 0 ? totalProfit / totalRev : 0
    let best = jobs[0], worst = jobs[0]
    for (const j of jobs) {
      if (hourlyOf(j) > hourlyOf(best)) best = j
      if (hourlyOf(j) < hourlyOf(worst)) worst = j
    }
    return { count: jobs.length, totalRev, totalProfit, totalHours, totalMiles, totalMaterials, avgHourly, avgMargin, best, worst }
  }, [jobs])

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Opervo Multi-Job Profit Tracker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://opervo.io/multi-job-tracker',
        description: 'Free multi-job profit tracker for home-service operators. Log jobs over time, see your effective hourly rate, find your best- and worst-paying job types.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />

      <SiteNav />

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 24px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Free tool · Saves to your phone · No login
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5.2vw, 52px)', lineHeight: 1.02, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Track every job. Find what really pays<span style={{ color: '#F5620F' }}>.</span>
        </h1>
        <p style={{ fontSize: 17, color: '#3a3a3a', lineHeight: 1.55, maxWidth: 640, margin: '0 auto 12px', fontWeight: 500 }}>
          Log 5 jobs. Then 10. Then 20. Watch which jobs actually pay you, which trades pay best, and which clients are eating your hours.
        </p>
        <p style={{ fontSize: 13, color: '#6B6B6B', maxWidth: 580, margin: '0 auto' }}>
          Saved on your device only — nothing leaves your phone. Export to CSV anytime.
        </p>
      </section>

      {/* AGGREGATES */}
      {jobs.length > 0 && (
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px' }}>
          <div style={{ background: '#0F0F0F', borderRadius: 14, padding: '24px 26px', color: '#F7F5F2', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,98,15,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>Across {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 16 }}>
                <Stat label="Total profit" value={$(stats.totalProfit)} color={pillColor(stats.avgMargin)} big />
                <Stat label="Avg hourly" value={stats.totalHours > 0 ? `${$(stats.avgHourly)}/hr` : '—'} color={pillColor(stats.avgMargin)} />
                <Stat label="Avg margin" value={`${(stats.avgMargin * 100).toFixed(1)}%`} color={pillColor(stats.avgMargin)} />
                <Stat label="Total revenue" value={$(stats.totalRev)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, fontSize: 13 }}>
                {stats.best && (
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Best paying</p>
                    <p style={{ fontSize: 14, color: '#F7F5F2', fontWeight: 700 }}>{stats.best.label}</p>
                    <p style={{ fontSize: 12, color: '#B8B8B8' }}>{$(hourlyOf(stats.best))}/hr · {(marginOf(stats.best) * 100).toFixed(0)}% margin</p>
                  </div>
                )}
                {stats.worst && stats.worst.id !== stats.best?.id && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Worst paying</p>
                    <p style={{ fontSize: 14, color: '#F7F5F2', fontWeight: 700 }}>{stats.worst.label}</p>
                    <p style={{ fontSize: 12, color: '#B8B8B8' }}>{$(hourlyOf(stats.worst))}/hr · {(marginOf(stats.worst) * 100).toFixed(0)}% margin</p>
                  </div>
                )}
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 14px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Totals</p>
                  <p style={{ fontSize: 13, color: '#F7F5F2' }}>{stats.totalHours.toFixed(1)} hrs · {stats.totalMiles.toFixed(0)} mi · {$$(stats.totalMaterials)} materials</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ADD JOB FORM */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 24px' }}>
        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '24px 26px' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>
            Add a job
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            <Field label="Date">
              <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} style={inputStyle} />
            </Field>
            <Field label="Label" suffix="job name / client">
              <input type="text" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} placeholder="e.g. Smith driveway" style={inputStyle} />
            </Field>
            <Field label="Revenue ($)">
              <input type="number" inputMode="decimal" min="0" step="1" value={draft.revenue || ''} onChange={(e) => setDraft({ ...draft, revenue: Number(e.target.value) || 0 })} placeholder="0" style={inputStyle} />
            </Field>
            <Field label="Hours">
              <input type="number" inputMode="decimal" min="0" step="0.25" value={draft.hours || ''} onChange={(e) => setDraft({ ...draft, hours: Number(e.target.value) || 0 })} placeholder="0" style={inputStyle} />
            </Field>
            <Field label="Materials ($)">
              <input type="number" inputMode="decimal" min="0" step="1" value={draft.materials || ''} onChange={(e) => setDraft({ ...draft, materials: Number(e.target.value) || 0 })} placeholder="0" style={inputStyle} />
            </Field>
            <Field label="Mileage (mi)">
              <input type="number" inputMode="decimal" min="0" step="1" value={draft.mileageMiles || ''} onChange={(e) => setDraft({ ...draft, mileageMiles: Number(e.target.value) || 0 })} placeholder="0" style={inputStyle} />
            </Field>
            <Field label="Helpers paid ($)">
              <input type="number" inputMode="decimal" min="0" step="1" value={draft.helpersPaid || ''} onChange={(e) => setDraft({ ...draft, helpersPaid: Number(e.target.value) || 0 })} placeholder="0" style={inputStyle} />
            </Field>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', marginTop: 18, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>Mileage costed at IRS rate (${MILEAGE_RATE.toFixed(2)}/mi).</p>
            <button onClick={addJob} disabled={draft.revenue <= 0 && draft.hours <= 0} style={{ background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '12px 28px', borderRadius: 6, border: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', cursor: draft.revenue <= 0 && draft.hours <= 0 ? 'not-allowed' : 'pointer', opacity: draft.revenue <= 0 && draft.hours <= 0 ? 0.5 : 1 }}>
              Add job →
            </button>
          </div>
        </div>
      </section>

      {/* JOB LIST */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px' }}>
        {jobs.length === 0 ? (
          <div style={{ background: '#fff', border: '1px dashed #E8E4DE', borderRadius: 12, padding: '40px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: '#6B6B6B', maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
              No jobs yet. Add your last 5 jobs above. Patterns show up fast.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
                Your jobs ({jobs.length})
              </h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={exportCsv} style={{ background: '#fff', color: '#0F0F0F', border: '1px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, padding: '9px 16px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  Export CSV
                </button>
                <button onClick={clearAll} style={{ background: 'transparent', color: '#DC2626', border: '1px solid rgba(220,38,38,0.3)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, padding: '9px 16px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  Clear all
                </button>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#F7F5F2' }}>
                      <th style={thStyle}>Date</th>
                      <th style={thStyle}>Label</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Revenue</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Hrs</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Mat.</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Mi</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Profit</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Hourly</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Margin</th>
                      <th style={thStyle}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((j) => {
                      const m = marginOf(j)
                      const c = pillColor(m)
                      return (
                        <tr key={j.id} style={{ borderTop: '1px solid #E8E4DE' }}>
                          <td style={tdStyle}>{j.date}</td>
                          <td style={{ ...tdStyle, fontWeight: 600 }}>{j.label}</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>{$$(j.revenue)}</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>{j.hours.toFixed(1)}</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>{$$(j.materials)}</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>{j.mileageMiles.toFixed(0)}</td>
                          <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: c }}>{$(profitOf(j))}</td>
                          <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: c }}>{j.hours > 0 ? `${$(hourlyOf(j))}/hr` : '—'}</td>
                          <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: c }}>{(m * 100).toFixed(0)}%</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>
                            <button onClick={() => removeJob(j.id)} aria-label="Delete job" style={{ background: 'transparent', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px 6px', fontSize: 16 }}>×</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>

      {/* SOFT CTA */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 64px' }}>
        <div style={{ background: '#0F0F0F', borderRadius: 16, padding: '36px 32px', color: '#F7F5F2', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(245,98,15,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>What if every job tracked itself?</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vw, 30px)', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 16 }}>
              Opervo logs the chems, the miles,<br />and the math on every single job<span style={{ color: '#F5620F' }}>.</span>
            </h2>
            <p style={{ fontSize: 14, color: '#B8B8B8', maxWidth: 540, margin: '0 auto 22px', lineHeight: 1.65 }}>
              No re-entering numbers. No spreadsheets. Live profit math, recurring agreements, route optimization, a public folio — all-in at $24.99/mo.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '13px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Start Free — 14 Days
              </a>
              <Link href="/profit-calculator" style={{ display: 'inline-block', background: 'transparent', color: '#F7F5F2', border: '1px solid rgba(255,255,255,0.25)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Single-Job Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #E8E4DE',
  borderRadius: 6,
  fontSize: 14,
  fontFamily: 'inherit',
  background: '#fff',
  outline: 'none',
  color: '#0F0F0F',
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 700,
  color: '#6B6B6B',
  textTransform: 'uppercase',
  fontSize: 11,
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  color: '#1a1a1a',
  whiteSpace: 'nowrap',
}

function Field({ label, children, suffix }: { label: string; children: React.ReactNode; suffix?: string }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B6B6B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}{suffix ? <span style={{ color: '#9CA3AF', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}> · {suffix}</span> : null}
      </span>
      {children}
    </label>
  )
}

function Stat({ label, value, color, big }: { label: string; value: string; color?: string; big?: boolean }) {
  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: big ? 30 : 22, color: color || '#F7F5F2', lineHeight: 1.05, letterSpacing: '-0.5px' }}>{value}</p>
    </div>
  )
}
