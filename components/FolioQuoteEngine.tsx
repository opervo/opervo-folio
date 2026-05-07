'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'

// ── Types ────────────────────────────────────────────────────────

type InputType = 'count' | 'area_sqft' | 'select' | 'toggle' | 'fixed'

interface SelectOption {
  label: string
  additive?: number
  multiplier?: number
}

interface LineItem {
  id: string
  name: string
  question: string | null
  input_type: InputType
  unit_price: number
  unit_label: string | null
  options: SelectOption[] | null
  default_value: string | null
  required: boolean
  sort_order: number
}

interface BreakdownLine {
  line_item_id: string
  name: string
  input_type: InputType
  display: string
  amount: number
  multiplier?: number
}

interface QuoteResult {
  base_price: number
  lines: BreakdownLine[]
  subtotal: number
  min_charge_applied: boolean
  travel_fee: number
  total: number
}

interface ServicePackage {
  id: string
  name: string
  description?: string | null
  quote_base_price: number
  quote_min_charge: number | null
}

type Answers = Record<string, number | boolean | string | null | undefined>

type Step = 'pick' | 'questions' | 'address' | 'contact' | 'reveal' | 'done'

// ── computeQuote (ported from opervo-work-flow) ─────────────────

function computeQuote(
  service: { base_price: number; min_charge: number | null; line_items: LineItem[] },
  answers: Answers,
): QuoteResult {
  const base = Number(service.base_price || 0)
  let total = base
  const lines: BreakdownLine[] = []
  const sorted = [...service.line_items].sort((a, b) => a.sort_order - b.sort_order)

  for (const li of sorted) {
    const ans = answers[li.id]
    switch (li.input_type) {
      case 'count':
      case 'area_sqft': {
        const qty = Math.max(0, Number(ans) || 0)
        if (qty === 0) continue
        const amt = qty * Number(li.unit_price || 0)
        total += amt
        const cleanQty = Number.isInteger(qty) ? String(qty) : qty.toFixed(1)
        const unitStr = li.unit_label ? `${cleanQty} ${li.unit_label}` : cleanQty
        lines.push({
          line_item_id: li.id,
          name: li.name,
          input_type: li.input_type,
          display: `${unitStr} × $${Number(li.unit_price || 0).toFixed(2)}`,
          amount: amt,
        })
        break
      }
      case 'toggle': {
        if (!ans) continue
        const amt = Number(li.unit_price || 0)
        total += amt
        lines.push({
          line_item_id: li.id,
          name: li.name,
          input_type: 'toggle',
          display: 'Included',
          amount: amt,
        })
        break
      }
      case 'select': {
        if (!ans || !li.options) continue
        const opt = li.options.find((o) => o.label === ans)
        if (!opt) continue
        const additive = Number(opt.additive || 0)
        const multiplier = opt.multiplier != null ? Number(opt.multiplier) : 1
        if (additive) total += additive
        if (multiplier !== 1) total = total * multiplier
        lines.push({
          line_item_id: li.id,
          name: li.name,
          input_type: 'select',
          display: opt.label,
          amount: additive,
          multiplier: multiplier !== 1 ? multiplier : undefined,
        })
        break
      }
      case 'fixed': {
        const amt = Number(li.unit_price || li.default_value || 0)
        if (!amt) continue
        total += amt
        lines.push({
          line_item_id: li.id,
          name: li.name,
          input_type: 'fixed',
          display: 'Flat fee',
          amount: amt,
        })
        break
      }
    }
  }

  const subtotalBeforeMin = total
  const minCharge = service.min_charge != null ? Number(service.min_charge) : 0
  const minApplied = minCharge > 0 && total < minCharge
  if (minApplied) total = minCharge

  return {
    base_price: base,
    lines,
    subtotal: Math.round(subtotalBeforeMin * 100) / 100,
    min_charge_applied: minApplied,
    travel_fee: 0,
    total: Math.round(total * 100) / 100,
  }
}

// ── Helpers ──────────────────────────────────────────────────────

const fmtMoney = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

// ── Main component ──────────────────────────────────────────────

interface FolioQuoteEngineProps {
  operatorUserId: string
  businessName: string
  slug: string
}

export default function FolioQuoteEngine({ operatorUserId, businessName, slug }: FolioQuoteEngineProps) {
  const [services, setServices] = useState<ServicePackage[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<Step>('pick')
  const [picked, setPicked] = useState<ServicePackage | null>(null)
  const [items, setItems] = useState<LineItem[]>([])
  const [loadingItems, setLoadingItems] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  const [address, setAddress] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitErr, setSubmitErr] = useState<string | null>(null)

  const addressRef = useRef<HTMLInputElement>(null)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Fetch quotable services on mount
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/services?user_id=eq.${operatorUserId}&show_on_quote_form=eq.true&order=name`,
          { headers: { apikey: supabaseAnon, Authorization: `Bearer ${supabaseAnon}` } },
        )
        if (!active) return
        const data = await res.json()
        const svcs: ServicePackage[] = (data || []).map((s: any) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          quote_base_price: Number(s.quote_base_price ?? 0),
          quote_min_charge: s.quote_min_charge != null ? Number(s.quote_min_charge) : null,
        }))
        setServices(svcs)
        if (svcs.length === 1) {
          setPicked(svcs[0])
          setStep('questions')
        }
      } catch (err) {
        console.error('[FolioQuoteEngine] services fetch failed', err)
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [operatorUserId, supabaseUrl, supabaseAnon])

  // Fetch line items when a service is picked
  useEffect(() => {
    if (!picked) { setItems([]); return }
    let active = true
    setLoadingItems(true)
    ;(async () => {
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/service_line_items?service_id=eq.${picked.id}&order=sort_order`,
          { headers: { apikey: supabaseAnon, Authorization: `Bearer ${supabaseAnon}` } },
        )
        if (!active) return
        const data = await res.json()
        setItems(
          (data || []).map((row: any) => ({
            id: row.id,
            name: row.name,
            question: row.question,
            input_type: row.input_type,
            unit_price: Number(row.unit_price || 0),
            unit_label: row.unit_label,
            options: row.options as SelectOption[] | null,
            default_value: row.default_value,
            required: Boolean(row.required),
            sort_order: Number(row.sort_order || 0),
          })),
        )
      } catch (err) {
        console.error('[FolioQuoteEngine] line items fetch failed', err)
        setItems([])
      } finally {
        if (active) setLoadingItems(false)
      }
    })()
    return () => { active = false }
  }, [picked, supabaseUrl, supabaseAnon])

  // Wire Google Places autocomplete on address step
  const initAutocomplete = useCallback((input: HTMLInputElement | null) => {
    if (!input || (input as any)._acInit) return
    ;(input as any)._acInit = true
    const tryInit = () => {
      if (!window.google?.maps?.places) { setTimeout(tryInit, 150); return }
      const ac = new window.google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      })
      ac.addListener('place_changed', () => {
        const place = ac.getPlace()
        if (place.formatted_address) setAddress(place.formatted_address)
      })
    }
    tryInit()
  }, [])

  useEffect(() => {
    if (step === 'address' && addressRef.current) initAutocomplete(addressRef.current)
  }, [step, initAutocomplete])

  const quote = useMemo(() => {
    if (!picked) return null
    return computeQuote(
      { base_price: picked.quote_base_price, min_charge: picked.quote_min_charge, line_items: items },
      answers,
    )
  }, [picked, items, answers])

  const allRequiredAnswered = useMemo(() => {
    return items.every((li) => {
      if (!li.required) return true
      const a = answers[li.id]
      if (li.input_type === 'toggle') return typeof a === 'boolean'
      if (li.input_type === 'select') return typeof a === 'string' && a.length > 0
      if (li.input_type === 'fixed') return true
      return typeof a === 'number' && a > 0
    })
  }, [items, answers])

  const handlePick = (svc: ServicePackage) => {
    setPicked(svc)
    setAnswers({})
    setStep('questions')
  }

  const goBack = () => {
    if (step === 'questions') setStep('pick')
    else if (step === 'address') setStep('questions')
    else if (step === 'contact') setStep('address')
    else if (step === 'reveal') setStep('contact')
  }

  const handleSubmit = async () => {
    setSubmitErr(null)
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setSubmitErr('Name, phone, and address are required')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/notify-quote-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operator_user_id: operatorUserId,
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          address: address.trim(),
          preferred_contact: smsConsent ? 'Text' : 'Call',
          service_requested: picked?.name || 'Quote Request',
          job_details: null,
          request_type: 'quote_request',
          portfolio_slug: slug,
          photo_urls: [],
          quoted_total: quote?.total ?? null,
          quoted_breakdown: quote
            ? {
                base_price: quote.base_price,
                lines: quote.lines,
                subtotal: quote.subtotal,
                min_charge_applied: quote.min_charge_applied,
                travel_fee: quote.travel_fee,
                total: quote.total,
                answers,
              }
            : null,
          quoted_service_id: picked?.id ?? null,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Submission failed')
      }
      setStep('done')
    } catch (err: any) {
      console.error(err)
      setSubmitErr(err?.message || "Couldn't submit. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Step progress: pick(0) → questions(1) → address(2) → contact(3) → reveal(4)
  const stepIdx = { pick: 0, questions: 1, address: 2, contact: 3, reveal: 4, done: 4 }[step]

  if (loading) {
    return (
      <div className="form-outer reveal" id="quoteform">
        <div className="form-header">
          <div className="fh-pill">Get a Quote</div>
          <div className="fh-title">Get Your<br /><em>Quote</em></div>
          <div className="fh-sub">Loading services...</div>
        </div>
        <div className="form-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ color: 'var(--stone)', fontSize: 13 }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-outer reveal" id="quoteform">
      <div className="form-header">
        <div className="fh-pill">Get a Quote</div>
        <div className="fh-title">Get Your<br /><em>Quote</em></div>
        <div className="fh-sub">
          {step === 'pick' && 'Pick a service and get an instant ballpark estimate.'}
          {step === 'questions' && (picked?.name ? `Tell us about your ${picked.name.toLowerCase()} job.` : 'Answer a few quick questions.')}
          {step === 'address' && "Where's the job?"}
          {step === 'contact' && 'Last step — how should we reach you?'}
          {step === 'reveal' && `${businessName} will review and confirm your final quote.`}
          {step === 'done' && "You're all set."}
        </div>
      </div>

      <div className="form-body">
        {/* Progress bar */}
        {step !== 'done' && (
          <div className="step-bar">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`step-seg${i < stepIdx ? ' step-seg--done' : ''}${i === stepIdx ? ' step-seg--active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* STEP: Pick service */}
        {step === 'pick' && (
          <>
            {services.length > 1 && (
              <label className="f-label">Select a service</label>
            )}
            <div className="svc-tiles">
              {services.map(svc => (
                <button
                  key={svc.id}
                  className={`svc-tile${picked?.id === svc.id ? ' svc-tile--sel' : ''}`}
                  onClick={() => handlePick(svc)}
                  type="button"
                >
                  <span className="st-name">{svc.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP: Questions */}
        {step === 'questions' && picked && (
          <>
            <button className="f-back" onClick={goBack} type="button">← Back</button>
            {loadingItems ? (
              <p style={{ color: 'var(--stone)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Loading questions...</p>
            ) : items.length === 0 ? (
              <p style={{ color: 'var(--ink-3)', fontSize: 13, marginBottom: 16 }}>
                No questions — we'll quote based on your address and contact info.
              </p>
            ) : (
              items.map(li => (
                <QuestionField
                  key={li.id}
                  item={li}
                  value={answers[li.id]}
                  onChange={(v) => setAnswers(a => ({ ...a, [li.id]: v }))}
                />
              ))
            )}
            <button
              className="btn-primary"
              onClick={() => setStep('address')}
              disabled={!allRequiredAnswered}
              type="button"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Address */}
        {step === 'address' && (
          <>
            <button className="f-back" onClick={goBack} type="button">← Back</button>
            <label className="f-label">Job address</label>
            <input
              ref={addressRef}
              className="f-input"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="123 Main St, Austin TX"
            />
            <button
              className="btn-primary"
              onClick={() => setStep('contact')}
              disabled={!address.trim()}
              type="button"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Contact */}
        {step === 'contact' && (
          <>
            <button className="f-back" onClick={goBack} type="button">← Back</button>
            <label className="f-label">Your name</label>
            <input
              className="f-input"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full name"
            />
            <label className="f-label">Phone</label>
            <input
              className="f-input"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
            <label className="f-label">Email (optional)</label>
            <input
              className="f-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
            <label
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 16,
                fontSize: 11, lineHeight: '1.5', color: 'var(--stone)',
              }}
            >
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={e => setSmsConsent(e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I agree to receive SMS messages from Opervo (opervo.io) on behalf of {businessName} regarding this quote. Msg & data rates apply. Reply STOP to opt out.
              </span>
            </label>
            <button
              className="btn-primary"
              onClick={() => setStep('reveal')}
              disabled={!fullName.trim() || !phone.trim()}
              type="button"
            >
              See My Estimate
            </button>
          </>
        )}

        {/* STEP: Reveal estimate */}
        {step === 'reveal' && quote && picked && (
          <>
            <button className="f-back" onClick={goBack} type="button">← Back</button>
            <div className="qe-estimate-card">
              <div className="qe-estimate-label">Estimate · {picked.name}</div>
              <div className="qe-estimate-total">{fmtMoney(quote.total)}</div>
              <div className="qe-estimate-note">
                {businessName} will review and confirm your final quote shortly.
              </div>
              <div className="qe-breakdown">
                {quote.base_price > 0 && (
                  <div className="qe-breakdown-row">
                    <span>Base</span>
                    <span>{fmtMoney(quote.base_price)}</span>
                  </div>
                )}
                {quote.lines.map(ln => (
                  <div key={ln.line_item_id} className="qe-breakdown-row">
                    <span>
                      {ln.name}
                      <span className="qe-breakdown-detail">{ln.display}</span>
                    </span>
                    <span>{ln.multiplier ? `× ${ln.multiplier}` : fmtMoney(ln.amount)}</span>
                  </div>
                ))}
                {quote.min_charge_applied && (
                  <div className="qe-breakdown-row qe-breakdown-row--min">
                    <span>Min charge applied</span>
                    <span>{fmtMoney(picked.quote_min_charge || 0)}</span>
                  </div>
                )}
              </div>
            </div>
            {submitErr && (
              <div className="submit-error">{submitErr}</div>
            )}
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
              type="button"
            >
              {submitting ? 'Sending...' : `Send to ${businessName}`}
            </button>
            <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--stone)', marginTop: 10 }}>
              By sending, you agree to be contacted about this quote.
            </p>
          </>
        )}

        {/* STEP: Done */}
        {step === 'done' && quote && picked && (
          <div className="form-success">
            <div className="success-check">✓</div>
            <div className="success-title">Estimate Sent</div>
            <p className="success-text">
              {businessName} got your request and the {fmtMoney(quote.total)} estimate. They'll be in touch.
            </p>
          </div>
        )}
      </div>

      <style>{`
.qe-estimate-card{background:var(--off);border:1.5px solid var(--rule);border-radius:var(--r-md);padding:20px;margin-bottom:8px}
.qe-estimate-label{font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--stone)}
.qe-estimate-total{font-family:var(--font-display);font-weight:700;font-size:48px;letter-spacing:-0.02em;color:var(--ink);line-height:1;margin:6px 0 8px}
.qe-estimate-note{font-size:12px;color:var(--stone);line-height:1.5}
.qe-breakdown{margin-top:16px;padding-top:14px;border-top:1px solid var(--rule)}
.qe-breakdown-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--ink);padding:4px 0}
.qe-breakdown-detail{font-size:11px;color:var(--stone);margin-left:6px}
.qe-breakdown-row--min{color:var(--teal);font-weight:600}
      `}</style>
    </div>
  )
}

// ── Question field sub-component ────────────────────────────────

function QuestionField({
  item,
  value,
  onChange,
}: {
  item: LineItem
  value: number | boolean | string | null | undefined
  onChange: (v: number | boolean | string) => void
}) {
  const label = item.question || item.name

  if (item.input_type === 'fixed') {
    return (
      <div style={{
        background: 'var(--off)', border: '1.5px solid var(--rule)',
        borderRadius: 'var(--r-sm)', padding: '12px 14px', marginBottom: 12,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{item.name}</span>
        <span style={{ fontSize: 12, color: 'var(--stone)', marginLeft: 8 }}>included automatically</span>
      </div>
    )
  }

  if (item.input_type === 'toggle') {
    const on = value === true
    return (
      <div style={{ marginBottom: 16 }}>
        <label className="f-label">
          {label} {item.required && <span style={{ color: 'var(--teal)' }}>*</span>}
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={`svc-tile${!on ? ' svc-tile--sel' : ''}`}
            style={{ flex: 1, minHeight: 44, padding: '10px 12px' }}
          >
            <span className="st-name">No</span>
          </button>
          <button
            type="button"
            onClick={() => onChange(true)}
            className={`svc-tile${on ? ' svc-tile--sel' : ''}`}
            style={{ flex: 1, minHeight: 44, padding: '10px 12px' }}
          >
            <span className="st-name">Yes (+${item.unit_price})</span>
          </button>
        </div>
      </div>
    )
  }

  if (item.input_type === 'select' && item.options) {
    return (
      <div style={{ marginBottom: 16 }}>
        <label className="f-label">
          {label} {item.required && <span style={{ color: 'var(--teal)' }}>*</span>}
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(item.options.length, 3)}, 1fr)`,
          gap: 7,
        }}>
          {item.options.map(opt => {
            const active = value === opt.label
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onChange(opt.label)}
                className={`svc-tile${active ? ' svc-tile--sel' : ''}`}
                style={{ minHeight: 44, padding: '10px 8px' }}
              >
                <span className="st-name">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // count / area_sqft → numeric
  return (
    <div style={{ marginBottom: 16 }}>
      <label className="f-label">
        {label} {item.required && <span style={{ color: 'var(--teal)' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          className="f-input"
          type="number"
          inputMode="decimal"
          min={0}
          value={typeof value === 'number' ? value : ''}
          onChange={e => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          placeholder="0"
        />
        {item.unit_label && (
          <span style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 13, color: 'var(--stone)',
          }}>
            {item.unit_label}
          </span>
        )}
      </div>
      <p style={{ fontSize: 11, color: 'var(--stone)', marginTop: 4 }}>
        {fmtMoney(item.unit_price)} per {item.unit_label || 'unit'}
      </p>
    </div>
  )
}
