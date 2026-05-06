'use client'

import { useState } from 'react'

const TRADES = [
  'Window Cleaning',
  'Pressure Washing',
  'Lawn Care / Landscaping',
  'Auto Detailing',
  'Solar Panel Cleaning',
  'Snow Removal',
  'Christmas Lights',
  'Holiday / Seasonal Services',
  'Junk Removal',
  'Other',
]

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  color: '#0F0F0F',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: 8,
  fontFamily: "'Barlow Condensed', sans-serif",
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  fontSize: 15,
  fontFamily: "'Barlow', sans-serif",
  border: '1px solid #E8E4DE',
  borderRadius: 6,
  background: '#fff',
  color: '#0F0F0F',
  outline: 'none',
  boxSizing: 'border-box',
}

const fieldStyle: React.CSSProperties = {
  marginBottom: 18,
}

export default function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      first_name: String(fd.get('first_name') || '').trim(),
      last_name: String(fd.get('last_name') || '').trim(),
      email: String(fd.get('email') || '').trim().toLowerCase(),
      date_of_birth: String(fd.get('date_of_birth') || '').trim(),
      city: String(fd.get('city') || '').trim(),
      state: String(fd.get('state') || '').trim(),
      business_name: String(fd.get('business_name') || '').trim(),
      trade: String(fd.get('trade') || '').trim(),
      social_handle: String(fd.get('social_handle') || '').trim(),
      parent_name: String(fd.get('parent_name') || '').trim(),
      parent_email: String(fd.get('parent_email') || '').trim().toLowerCase(),
      story: String(fd.get('story') || '').trim(),
    }

    if (!payload.first_name || !payload.last_name || !payload.email || !payload.date_of_birth || !payload.business_name || !payload.trade || !payload.parent_name || !payload.parent_email || !payload.story) {
      setError('Please fill out all required fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.parent_email)) {
      setError('Please enter a valid parent/guardian email address.')
      return
    }

    const dob = new Date(payload.date_of_birth)
    if (isNaN(dob.getTime())) {
      setError('Please enter a valid date of birth.')
      return
    }

    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--

    if (age < 13 || age > 17) {
      setError(`Apprentice is for ages 13–17. You\'re ${age}. If you\'re 18+, start a free trial at app.opervo.io. If you\'re under 13, save this page and apply on your 13th birthday.`)
      return
    }

    if (payload.story.length < 30) {
      setError('Tell me a little more about your business — at least a couple of sentences.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/apprentice-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Try again or email max@opervo.io.')
      }

      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again or email max@opervo.io.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E8E4DE',
        borderRadius: 12,
        padding: '40px 32px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>
          APPLICATION RECEIVED
        </p>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#0F0F0F', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 16 }}>
          NICE.<br />NOW WAIT FOR MAX.
        </h3>
        <p style={{ fontSize: 16, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.7, marginBottom: 12 }}>
          Max reads every application personally. You'll hear back within a few days, usually faster.
        </p>
        <p style={{ fontSize: 15, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.7 }}>
          We just sent your parent a heads-up email so they know you applied.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        border: '1px solid #E8E4DE',
        borderRadius: 12,
        padding: '32px',
      }}
    >
      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 24, letterSpacing: '0.04em' }}>
        About you
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="first_name">First name *</label>
          <input style={inputStyle} type="text" id="first_name" name="first_name" required />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="last_name">Last name *</label>
          <input style={inputStyle} type="text" id="last_name" name="last_name" required />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="email">Your email *</label>
        <input style={inputStyle} type="email" id="email" name="email" required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="date_of_birth">Date of birth *</label>
          <input style={inputStyle} type="date" id="date_of_birth" name="date_of_birth" required />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="city">City *</label>
          <input style={inputStyle} type="text" id="city" name="city" required />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="state">State *</label>
          <input style={inputStyle} type="text" id="state" name="state" placeholder="TX" maxLength={2} required />
        </div>
      </div>

      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#0F0F0F', textTransform: 'uppercase', marginTop: 12, marginBottom: 24, letterSpacing: '0.04em' }}>
        Your business
      </p>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="business_name">Business name *</label>
        <input style={inputStyle} type="text" id="business_name" name="business_name" placeholder="What you call your business" required />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="trade">What you do *</label>
        <select style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 8\'><path fill=\'%23F5620F\' d=\'M6 8L0 0h12z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: 10, paddingRight: 36 }} id="trade" name="trade" required defaultValue="">
          <option value="" disabled>Select a trade</option>
          {TRADES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="social_handle">Instagram / TikTok / YouTube (optional)</label>
        <input style={inputStyle} type="text" id="social_handle" name="social_handle" placeholder="@yourhandle or link" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="story">Tell me about your business or your concept *</label>
        <textarea
          style={{ ...inputStyle, minHeight: 140, resize: 'vertical', fontFamily: "'Barlow', sans-serif" }}
          id="story"
          name="story"
          placeholder="If you're already running it: how did you start, what jobs are you doing, what's working, what's hard. If you're about to start: what's the concept, why this trade, why now, what's the first 90 days look like. A few sentences is plenty — make your case."
          required
        />
      </div>

      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#0F0F0F', textTransform: 'uppercase', marginTop: 12, marginBottom: 24, letterSpacing: '0.04em' }}>
        Parent / guardian
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="parent_name">Their name *</label>
          <input style={inputStyle} type="text" id="parent_name" name="parent_name" required />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="parent_email">Their email *</label>
          <input style={inputStyle} type="email" id="parent_email" name="parent_email" required />
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, marginBottom: 24 }}>
        We'll send your parent a short heads-up email when you submit so they know what you applied for. They don't have to do anything — just so they're not surprised.
      </p>

      {error && (
        <div style={{
          background: 'rgba(220, 38, 38, 0.06)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          borderRadius: 6,
          padding: '12px 14px',
          marginBottom: 20,
          fontSize: 14,
          color: '#991B1B',
          fontFamily: "'Barlow', sans-serif",
          lineHeight: 1.5,
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          background: submitting ? '#9ca3af' : '#F5620F',
          color: '#fff',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 16,
          textTransform: 'uppercase',
          padding: '16px',
          borderRadius: 6,
          border: 'none',
          cursor: submitting ? 'not-allowed' : 'pointer',
          letterSpacing: '0.06em',
        }}
      >
        {submitting ? 'Sending…' : 'Send application'}
      </button>
    </form>
  )
}
