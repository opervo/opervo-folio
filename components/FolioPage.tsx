'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { OperatorProfile, Service } from '@/lib/types'

// Google Maps Places type shim
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { types?: string[]; componentRestrictions?: { country: string } }
          ) => { addListener: (event: string, cb: () => void) => void; getPlace: () => { formatted_address?: string } }
        }
      }
    }
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${alpha})`
}

function shadeHex(hex: string, percent: number): string {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1,3),16) + percent))
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3,5),16) + percent))
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5,7),16) + percent))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}



interface Props {
  profile: OperatorProfile
}

export default function FolioPage({ profile }: Props) {
  const brand = profile.brand_color ?? '#0b6e62'

  useEffect(() => {
    // Load Google Maps Places eagerly so it's ready when address input mounts
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
    if (!document.getElementById('google-maps-places')) {
      const s = document.createElement('script')
      s.id = 'google-maps-places'
      s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
      s.async = true
      document.head.appendChild(s)
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // CSS custom properties injected at runtime so brand color works
  const cssVars = {
    '--teal':       brand,
    '--teal-2':     shadeHex(brand, -10),
    '--teal-lt':    hexToRgba(brand, 0.08),
    '--teal-mid':   shadeHex(brand, 10),
    '--shadow-teal':`0 8px 32px ${hexToRgba(brand, 0.28)}`,
  } as React.CSSProperties

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="page" style={cssVars}>
        <Hero profile={profile} />
        <OverlapCard profile={profile} />
        <WorkSection profile={profile} />
        <ServicesSection profile={profile} />
        <CredentialsSection />
        {profile.review && <ReviewSection review={profile.review} profile={profile} />}
        <QuoteForm profile={profile} />
        <Footer />
        <StickyCta />
      </div>
    </>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ profile }: { profile: OperatorProfile }) {
  const nameParts = profile.business_name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ') || profile.business_name
  const lastWord  = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null

  return (
    <div className="hero">
      {profile.hero_photo_url
        ? <img className="hero-img" src={profile.hero_photo_url} alt={profile.business_name} />
        : <div className="hero-img hero-img--fallback" />
      }
      <div className="hero-gradient" />

      <div className="hero-topbar">
        {profile.accepting_clients && (
          <div className="hero-badge">
            <div className="live-dot" />
            Accepting Clients
          </div>
        )}
        {profile.google_rating && (
          profile.google_review_link
            ? <a href={profile.google_review_link} target="_blank" rel="noopener noreferrer" className="hero-google hero-google--link">
                <span className="hero-google-stars">★★★★★</span>
                {profile.google_rating.toFixed(1)} Google
              </a>
            : <div className="hero-google">
                <span className="hero-google-stars">★★★★★</span>
                {profile.google_rating.toFixed(1)} Google
              </div>
        )}
      </div>

      <div className="hero-body">
        {profile.location && (
          <div className="hero-location">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {profile.location}
          </div>
        )}
        {profile.logo_url && (
          <img
            className="hero-logo"
            src={profile.logo_url}
            alt={`${profile.business_name} logo`}
          />
        )}
        <div className="hero-name">
          {firstName}
          {lastWord && <em>{lastWord}</em>}
        </div>
        <div className="hero-divider" />
        {profile.tagline && <div className="hero-descriptor">{profile.tagline}<br />Fully insured · Same-day quotes</div>}
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll to explore
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   OVERLAP TRUST CARD
───────────────────────────────────────── */
function OverlapCard({ profile }: { profile: OperatorProfile }) {
  return (
    <div className="overlap-card">
      <div className="contact-row">
        <a href="#quoteform" className="cr-btn">
          <div className="cr-icon cr-icon--teal">📋</div>
          <div className="cr-label">Get Quote</div>
        </a>
        {profile.phone && (
          <a href={`tel:${profile.phone}`} className="cr-btn">
            <div className="cr-icon cr-icon--paper">📞</div>
            <div className="cr-label">Call</div>
          </a>
        )}
        {profile.phone && (
          <a href={`sms:${profile.phone}`} className="cr-btn">
            <div className="cr-icon cr-icon--gold">💬</div>
            <div className="cr-label">Text</div>
          </a>
        )}
      </div>
      <div className="stats-row">
        <div className="stat-col">
          <div className="stat-num">{profile.stats.jobs_done}</div>
          <div className="stat-lbl">Jobs Done</div>
        </div>
        <div className="stat-col">
          <div className="stat-num">{profile.stats.rating}</div>
          <div className="stat-lbl">Rating</div>
        </div>
        <div className="stat-col">
          <div className="stat-num">{profile.stats.response_time}</div>
          <div className="stat-lbl">Response</div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BEFORE / AFTER + GALLERY
───────────────────────────────────────── */
function WorkSection({ profile }: { profile: OperatorProfile }) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const afterRef  = useRef<HTMLDivElement>(null)
  const lineRef   = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const dragging  = useRef(false)
  const [lightbox, setLightbox] = useState<{imgs: string[], idx: number} | null>(null)

  const set = useCallback((pct: number) => {
    pct = Math.max(3, Math.min(97, pct))
    if (afterRef.current)  afterRef.current.style.clipPath  = `inset(0 0 0 ${pct}%)`
    if (lineRef.current)   lineRef.current.style.left       = pct + '%'
    if (handleRef.current) handleRef.current.style.left     = pct + '%'
  }, [])

  const toPct = useCallback((clientX: number) => {
    if (!wrapRef.current) return 50
    const r = wrapRef.current.getBoundingClientRect()
    return ((clientX - r.left) / r.width) * 100
  }, [])

  useEffect(() => { set(50) }, [set])

  const photos = profile.gallery_photos
  const beforePhoto = photos[0] ?? profile.hero_photo_url
  const afterPhoto  = photos[1] ?? photos[0] ?? profile.hero_photo_url

  if (!beforePhoto) return null

  const tradeLabels: Record<string, string> = { windows: 'Windows', solar: 'Solar', pressure: 'Pressure' }

  return (
    <div className="sec reveal">
      <div className="sec-eyebrow">Portfolio</div>
      <div className="sec-title">Our Work</div>

      <div
        className="ba-container"
        ref={wrapRef}
        onMouseDown={e => { dragging.current = true; set(toPct(e.clientX)); e.preventDefault() }}
        onTouchStart={e => { dragging.current = true; set(toPct(e.touches[0].clientX)) }}
        onMouseMove={e => { if (dragging.current) set(toPct(e.clientX)) }}
        onTouchMove={e => { if (dragging.current) set(toPct(e.touches[0].clientX)) }}
        onMouseUp={() => { dragging.current = false }}
        onTouchEnd={() => { dragging.current = false }}
      >
        <div className="ba-before">
          <img src={beforePhoto} alt="Before" />
        </div>
        <div className="ba-after" ref={afterRef}>
          <img src={afterPhoto ?? beforePhoto} alt="After" />
        </div>
        <div className="ba-line"   ref={lineRef} />
        <div className="ba-handle" ref={handleRef}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12H3M9 6l-6 6 6 6M15 6l6 6-6 6"/>
          </svg>
        </div>
        <div className="ba-labels">
          <span className="ba-lbl ba-lbl--before">Before</span>
          <span className="ba-lbl ba-lbl--after">After ✓</span>
        </div>
        <div className="ba-hint">← Drag to compare →</div>
      </div>

      <div className="gallery-grid">
        {photos.slice(0, profile.portfolio_display_count ?? 6).map((url, i) => (
          <div key={i} className="gallery-tile" onClick={() => setLightbox({imgs: photos, idx: i})} style={{cursor:'zoom-in'}}>
            <img src={url} alt={`Work ${i + 1}`} />
            {profile.trades[i] && (
              <div className="gallery-tile-tag">{tradeLabels[profile.trades[i]] ?? ''}</div>
            )}
            <div className="gallery-tile-zoom">⤢</div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button className="lb-prev" onClick={e => { e.stopPropagation(); setLightbox(l => l && l.idx > 0 ? {...l, idx: l.idx-1} : l) }}>‹</button>
          <img
            className="lb-img"
            src={lightbox.imgs[lightbox.idx]}
            alt={`Photo ${lightbox.idx + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className="lb-next" onClick={e => { e.stopPropagation(); setLightbox(l => l && l.idx < l.imgs.length-1 ? {...l, idx: l.idx+1} : l) }}>›</button>
          <div className="lb-counter">{lightbox.idx + 1} / {lightbox.imgs.length}</div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
function ServicesSection({ profile }: { profile: OperatorProfile }) {
  if (!profile.services?.length) return null
  return (
    <div className="sec reveal">
      <div className="sec-eyebrow">What We Do</div>
      <div className="sec-title">Services</div>
      <div className="sec-rule" />
      {profile.services.map(svc => (
        <div key={svc.id} className="svc-item">
          {svc.icon ? <div className="svc-icon">{svc.icon}</div> : null}
          <div className="svc-body">
            <div className="svc-name">{svc.name}</div>
            <div className="svc-desc">{svc.description}</div>
          </div>
          {svc.price_from && (
            <div className="svc-price-col">
              <div className="svc-from">From</div>
              <div className="svc-price">${svc.price_from}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   CREDENTIALS
───────────────────────────────────────── */
function CredentialsSection() {
  const creds = [
    { icon: '📅', title: 'Same-Day Quotes',    text: 'Request online — hear back within hours.' },
    { icon: '📸', title: 'Job Documentation',  text: 'Before & after photos sent directly to you.' },
    { icon: '🔒', title: 'Fully Insured',       text: 'Licensed & insured for your peace of mind.' },
    { icon: '💳', title: 'Easy Payments',       text: 'Card, Apple Pay or Google Pay. No cash needed.' },
  ]
  return (
    <div className="sec reveal">
      <div className="sec-eyebrow">Our Promise</div>
      <div className="sec-title">Why Clients Choose Us</div>
      <div className="cred-strip">
        {creds.map(c => (
          <div key={c.title} className="cred-card">
            <div className="cred-icon">{c.icon}</div>
            <div className="cred-body">
              <div className="cred-title">{c.title}</div>
              <div className="cred-text">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REVIEW
───────────────────────────────────────── */
function ReviewSection({ review, profile }: { review: NonNullable<OperatorProfile['review']>; profile: OperatorProfile }) {
  return (
    <div className="sec reveal">
      <div className="sec-eyebrow">Client Testimonial</div>
      <div className="sec-title">What They Say</div>
      <div className="review-wrap">
        <div className="rv-stars">{'★★★★★'.split('').map((s, i) => <span key={i} className="rv-star">{s}</span>)}</div>
        <div className="rv-text">"{review.text}"</div>
        <div className="rv-footer">
          <div className="rv-person">
            <div className="rv-avatar">{review.reviewer_initial}</div>
            <div>
              <div className="rv-name">{review.reviewer_name}</div>
              <div className="rv-date">{review.date}</div>
            </div>
          </div>
          <div className="rv-badge">{review.service_tag}</div>
        </div>
        {review.source === 'google' && (
          profile.google_review_link
            ? <a href={profile.google_review_link} target="_blank" rel="noopener noreferrer" className="google-row google-row--link">
                <div className="google-g">G</div>
                <span>Verified Google Review ↗</span>
              </a>
            : <div className="google-row">
                <div className="google-g">G</div>
                <span>Verified Google Review</span>
              </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   QUOTE FORM
───────────────────────────────────────── */
function QuoteForm({ profile }: { profile: OperatorProfile }) {
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const addressRef = useRef<HTMLInputElement>(null)

  // New state for booking / scheduling upgrade
  const [requestType, setRequestType] = useState<'quote_request' | 'direct_booking'>('quote_request')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredWindows, setPreferredWindows] = useState<string[]>([])
  const [servicePrice, setServicePrice] = useState<number | null>(null)
  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(null)

  // Tomorrow's date for min on date picker
  const tomorrowStr = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }, [])

  // Wire autocomplete on first focus of address field
  function initAutocomplete(input: HTMLInputElement) {
    if ((input as any)._acInit) return
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
  }

  // Build service tiles from operator's actual services, filtering out non-bookable
  const bookableServices = (profile.services ?? []).filter(svc => svc.bookable !== false)

  function getPriceLabel(svc: Service): string {
    if (svc.price_display) return svc.price_display
    if (svc.price_from) return `From $${svc.price_from}`
    return 'Get a Quote'
  }

  function handleServiceSelect(svc: Service) {
    setSelectedService(svc.name)
    if (svc.fixed_price) {
      setRequestType('direct_booking')
      setServicePrice(svc.price_from ?? null)
      setEstimatedDuration(svc.estimated_minutes ?? null)
    } else {
      setRequestType('quote_request')
      setServicePrice(null)
      setEstimatedDuration(null)
    }
  }

  function handleExtraSelect(value: string) {
    setSelectedService(value)
    setRequestType('quote_request')
    setServicePrice(null)
    setEstimatedDuration(null)
  }

  // Quick-pick date helpers
  function setThisWeek() {
    const d = new Date()
    const dayOfWeek = d.getDay()
    const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 0
    if (daysUntilFriday <= 0) {
      // Already Friday or weekend, pick next Monday
      d.setDate(d.getDate() + (8 - dayOfWeek))
    } else {
      d.setDate(d.getDate() + 1) // tomorrow at minimum
    }
    setPreferredDate(d.toISOString().split('T')[0])
  }

  function setNextWeek() {
    const d = new Date()
    const dayOfWeek = d.getDay()
    const daysUntilNextMon = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
    d.setDate(d.getDate() + daysUntilNextMon)
    setPreferredDate(d.toISOString().split('T')[0])
  }

  function setFlexible() {
    setPreferredDate('')
  }

  // Time window toggle
  function toggleWindow(w: string) {
    if (w === 'any') {
      setPreferredWindows(prev => prev.includes('any') ? [] : ['any'])
    } else {
      setPreferredWindows(prev => {
        const without = prev.filter(p => p !== 'any' && p !== w)
        if (prev.includes(w)) return without
        return [...without, w]
      })
    }
  }

  // Format duration for display
  function formatDuration(mins: number): string {
    if (mins < 60) return `${mins} min`
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return m > 0 ? `${h}h ${m}m` : `${h}h`
  }

  // Format preferred window for display
  function formatWindowDisplay(): string {
    const labels: Record<string, string> = {
      morning: 'Morning',
      midday: 'Midday',
      afternoon: 'Afternoon',
      any: 'Any time',
    }
    return preferredWindows.map(w => labels[w] || w).join(', ')
  }

  const ORANGE = '#F5620F'
  const ORANGE_HOVER = '#d94e08'
  const ORANGE_LIGHT = 'rgba(245,98,15,0.08)'
  const ORANGE_BORDER = 'rgba(245,98,15,0.25)'

  // Inline styles for new elements
  const pillStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px 14px',
    borderRadius: '8px',
    border: `1.5px solid ${active ? ORANGE : 'var(--rule)'}`,
    background: active ? ORANGE_LIGHT : 'var(--off)',
    color: active ? ORANGE : 'var(--stone)',
    fontSize: '13px',
    fontWeight: active ? 600 : 400,
    fontFamily: "'Jost', sans-serif",
    cursor: 'pointer',
    transition: 'border-color 0.15s, background 0.15s',
    minHeight: '44px',
    textAlign: 'center' as const,
  })

  const quickPickStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${active ? ORANGE : 'var(--rule)'}`,
    background: active ? ORANGE_LIGHT : '#ffffff',
    color: active ? ORANGE : 'var(--stone)',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Jost', sans-serif",
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.15s',
    minHeight: '44px',
  })

  const bookingSummaryStyle: React.CSSProperties = {
    background: ORANGE_LIGHT,
    border: `1.5px solid ${ORANGE_BORDER}`,
    borderRadius: '12px',
    padding: '16px 18px',
    marginBottom: '16px',
  }

  async function submit() {
    setSubmitting(true)
    setError('')
    try {
      const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

      let photoPath = null
      if (photoFile) {
        const ext      = photoFile.name.split('.').pop()
        // profile.id is the operator's auth user_id (mapped from profiles.user_id by the RPC)
        const filename = `${profile.id}/${Date.now()}.${ext}`
        // quote-photos bucket has public anon-insert RLS — lead-photos doesn't, so uploads to it silently fail
        const res = await fetch(`${supabaseUrl}/storage/v1/object/quote-photos/${filename}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${supabaseAnon}`, 'Content-Type': photoFile.type },
          body: photoFile,
        })
        if (res.ok) {
          // store the full public URL so the lead read path doesn't have to reconstruct it
          photoPath = `${supabaseUrl}/storage/v1/object/public/quote-photos/${filename}`
        }
      }

      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnon}`,
          'apikey': supabaseAnon,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          operator_id: profile.id,
          portfolio_slug: profile.slug,
          service: selectedService || null,
          property_type: propertyType || null,
          name: name || null,
          phone: phone || null,
          address: address || null,
          preferred_dates: preferredDate || null,
          notes: notes || null,
          photo_url: photoPath,
          status: 'new',
          preferred_date: preferredDate || null,
          preferred_window: preferredWindows.length ? preferredWindows.join(',') : null,
          request_type: requestType,
          service_price: servicePrice,
          estimated_duration: estimatedDuration,
        }),
      })

      if (!res.ok) throw new Error(await res.text())
      setStep(3)
    } catch (err) {
      console.error('Quote form submit failed:', err)
      setError('Something went wrong. Please try calling or texting us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // Extra tiles always shown
  const extraTiles = [
    { icon: '✦', name: 'Multiple', value: 'Multiple Services' },
    { icon: '🤔', name: 'Not Sure', value: 'Not Sure' },
    { icon: '➕', name: 'Other', value: 'Other' },
  ]

  // Fallback service tiles when no services configured
  const fallbackTiles = [
    { icon: '🪟', name: 'Windows', value: 'Window Cleaning' },
    { icon: '☀️', name: 'Solar', value: 'Solar Panel Cleaning' },
    { icon: '🚿', name: 'Pressure', value: 'Pressure Washing' },
  ]

  return (
    <div className="form-outer" id="quoteform">
      <div className="form-header">
        <div className="fh-kicker">Free · No Obligation</div>
        <div className="fh-title">Get Your<br /><em>Quote</em></div>
        <div className="fh-sub">Tell us what you need and we'll send a price to your phone — usually within a few hours.</div>
      </div>

      <div className="form-body">
        <div className="step-bar">
          {[0,1,2].map(i => (
            <div key={i} className={`step-seg ${i < step ? 'step-seg--done' : i === step ? 'step-seg--active' : ''}`} />
          ))}
        </div>

        {/* Step 0 — Service selection */}
        {step === 0 && (
          <div>
            <div className="f-label">What service do you need?</div>
            <div className="svc-tiles">
              {bookableServices.length > 0 ? (
                <>
                  {bookableServices.map(svc => (
                    <div
                      key={svc.id}
                      className={`svc-tile ${selectedService === svc.name ? 'svc-tile--sel' : ''}`}
                      onClick={() => handleServiceSelect(svc)}
                      style={{ position: 'relative' }}
                    >
                      <div className="st-icon">{svc.icon || '🔧'}</div>
                      <div className="st-name">{svc.name}</div>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        color: selectedService === svc.name ? ORANGE : 'var(--stone-2)',
                        marginTop: '2px',
                      }}>
                        {getPriceLabel(svc)}
                      </div>
                      {svc.fixed_price ? (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          fontSize: '8px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          background: ORANGE,
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          lineHeight: '1.4',
                        }}>
                          Book Now
                        </div>
                      ) : (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          fontSize: '8px',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          background: 'transparent',
                          color: 'var(--stone-2)',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          border: '1px solid var(--rule)',
                          lineHeight: '1.4',
                        }}>
                          Quote
                        </div>
                      )}
                    </div>
                  ))}
                  {extraTiles.map(t => (
                    <div
                      key={t.value}
                      className={`svc-tile ${selectedService === t.value ? 'svc-tile--sel' : ''}`}
                      onClick={() => handleExtraSelect(t.value)}
                    >
                      <div className="st-icon">{t.icon}</div>
                      <div className="st-name">{t.name}</div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {fallbackTiles.map(t => (
                    <div
                      key={t.value}
                      className={`svc-tile ${selectedService === t.value ? 'svc-tile--sel' : ''}`}
                      onClick={() => handleExtraSelect(t.value)}
                    >
                      <div className="st-icon">{t.icon}</div>
                      <div className="st-name">{t.name}</div>
                    </div>
                  ))}
                  {extraTiles.map(t => (
                    <div
                      key={t.value}
                      className={`svc-tile ${selectedService === t.value ? 'svc-tile--sel' : ''}`}
                      onClick={() => handleExtraSelect(t.value)}
                    >
                      <div className="st-icon">{t.icon}</div>
                      <div className="st-name">{t.name}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="f-label">Property type</div>
            <select className="f-select" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
              <option value="" disabled>Select type</option>
              <option>Residential home</option>
              <option>Apartment / Condo</option>
              <option>Commercial property</option>
              <option>Rental property</option>
            </select>
            <button className="btn-primary" onClick={() => setStep(1)}>Continue →</button>
          </div>
        )}

        {/* Step 1 — Scheduling + Contact */}
        {step === 1 && (
          <div>
            <div className="f-back" onClick={() => setStep(0)}>← Back</div>

            {/* Booking summary card for direct_booking */}
            {requestType === 'direct_booking' && (
              <div style={bookingSummaryStyle}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                  marginBottom: '8px',
                }}>
                  Booking Summary
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '4px',
                  fontFamily: "'Jost', sans-serif",
                }}>
                  {selectedService}
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  {servicePrice != null && (
                    <div style={{ fontSize: '14px', fontWeight: 600, color: ORANGE }}>
                      ${servicePrice}
                    </div>
                  )}
                  {estimatedDuration != null && (
                    <div style={{ fontSize: '13px', color: 'var(--stone)', fontWeight: 400 }}>
                      ~{formatDuration(estimatedDuration)}
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--stone)',
                  fontStyle: 'italic',
                }}>
                  {profile.business_name} will confirm within a few hours.
                </div>
              </div>
            )}

            {/* Date picker */}
            <div className="f-label">Preferred date</div>
            <input
              className="f-input"
              type="date"
              min={tomorrowStr}
              value={preferredDate}
              onChange={e => setPreferredDate(e.target.value)}
              style={{ minHeight: '44px' }}
            />

            {/* Quick pick buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                style={quickPickStyle(false)}
                onClick={setThisWeek}
              >
                This week
              </button>
              <button
                type="button"
                style={quickPickStyle(false)}
                onClick={setNextWeek}
              >
                Next week
              </button>
              <button
                type="button"
                style={quickPickStyle(!preferredDate)}
                onClick={setFlexible}
              >
                Flexible
              </button>
            </div>

            {/* Time window multi-select pills (2x2 grid) */}
            <div className="f-label">Preferred time</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '18px',
            }}>
              <div
                style={pillStyle(preferredWindows.includes('morning'))}
                onClick={() => toggleWindow('morning')}
              >
                ☀️ Morning (8am–12pm)
              </div>
              <div
                style={pillStyle(preferredWindows.includes('midday'))}
                onClick={() => toggleWindow('midday')}
              >
                🌤 Midday (11am–2pm)
              </div>
              <div
                style={pillStyle(preferredWindows.includes('afternoon'))}
                onClick={() => toggleWindow('afternoon')}
              >
                🌅 Afternoon (1pm–5pm)
              </div>
              <div
                style={pillStyle(preferredWindows.includes('any'))}
                onClick={() => toggleWindow('any')}
              >
                🤷 Any time
              </div>
            </div>

            {/* Contact fields */}
            <div className="f-row">
              <div>
                <div className="f-label">Your name *</div>
                <input className="f-input" type="text" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} style={{ minHeight: '44px' }} />
              </div>
              <div>
                <div className="f-label">Phone *</div>
                <input className="f-input" type="tel" placeholder="(512) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} style={{ minHeight: '44px' }} />
              </div>
            </div>
            <div className="f-label">Address</div>
            <input ref={addressRef} className="f-input" type="text" placeholder="4521 Oak St, Austin TX" value={address} onChange={e => setAddress(e.target.value)} autoComplete="off" onFocus={e => initAutocomplete(e.currentTarget)} style={{ minHeight: '44px' }} />
            <div className="f-label">Additional notes</div>
            <textarea className="f-textarea" placeholder="2-storey home · 16 solar panels…" value={notes} onChange={e => setNotes(e.target.value)} />
            <button className="btn-primary" onClick={() => setStep(2)}>Continue →</button>
          </div>
        )}

        {/* Step 2 — Photo + submit */}
        {step === 2 && (
          <div>
            <div className="f-back" onClick={() => setStep(1)}>← Back</div>
            <div className="f-label">Add a photo (optional)</div>
            <label className="upload-zone">
              <div className="uz-icon">📸</div>
              <div className="uz-text">
                <strong>Tap to upload</strong> a photo of the area to be cleaned — helps us quote faster.
              </div>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setPhotoFile(e.target.files?.[0] ?? null)} />
            </label>
            {photoFile && <div className="uz-confirm">✓ Photo attached</div>}
            <div className="promise-box">
              <div className="pb-title">What happens next</div>
              <ul className="pb-items">
                {requestType === 'direct_booking' ? (
                  <>
                    <li>We confirm your booking within a few hours</li>
                    <li>You'll receive a confirmation text with the details</li>
                    <li>Show up, sit back, we handle the rest</li>
                  </>
                ) : (
                  <>
                    <li>We review your details and photos</li>
                    <li>A quote arrives on your phone — usually within hours</li>
                    <li>No obligation, no pressure</li>
                  </>
                )}
              </ul>
            </div>
            {error && <div className="submit-error">{error}</div>}
            <p style={{ fontSize: 11, lineHeight: 1.5, color: '#888', margin: '16px 0 0', textAlign: 'center' }}>
              By submitting, you consent to receive automated SMS notifications from this business, including appointment reminders, on-my-way alerts, job updates, and invoices. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out at any time. Reply HELP for help. <a href="https://opervo.io/privacy" style={{ color: '#888', textDecoration: 'underline' }}>Privacy Policy</a> · <a href="https://opervo.io/tos" style={{ color: '#888', textDecoration: 'underline' }}>Terms</a>
            </p>
            <button className="btn-primary" onClick={submit} disabled={submitting}>
              {submitting ? 'Sending…' : requestType === 'direct_booking' ? 'Send Booking Request' : 'Send My Quote Request'}
            </button>
          </div>
        )}

        {/* Success */}
        {step === 3 && (
          <div className="form-success">
            <div className="success-check">✓</div>
            {requestType === 'direct_booking' ? (
              <>
                <div className="success-title">Booking request sent.</div>
                <p className="success-text">
                  {selectedService && <><strong>{selectedService}</strong><br /></>}
                  {preferredDate && <>Date: {new Date(preferredDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}<br /></>}
                  {preferredWindows.length > 0 && <>Time: {formatWindowDisplay()}<br /></>}
                  <br />
                  {profile.business_name} will confirm your booking shortly. Talk soon.
                </p>
              </>
            ) : (
              <>
                <div className="success-title">All done.</div>
                <p className="success-text">
                  Thanks for reaching out. We'll review your details and send a quote to your phone shortly.<br /><br />
                  Talk soon.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FOOTER + STICKY CTA
───────────────────────────────────────── */
function Footer() {
  return (
    <div className="footer">
      <span>Managed with</span>
      <span className="footer-o">Opervo</span>
    </div>
  )
}

function StickyCta() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const form = document.getElementById('quoteform')
    if (!form) return
    const obs = new IntersectionObserver(
      entries => setHidden(entries[0].isIntersecting),
      { threshold: 0.25 }
    )
    obs.observe(form)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`sticky-cta ${hidden ? 'sticky-cta--hidden' : ''}`}
      onClick={() => document.getElementById('quoteform')?.scrollIntoView({ behavior: 'smooth' })}
    >
      Request a Free Quote
    </div>
  )
}

/* ─────────────────────────────────────────
   ALL STYLES (ported from production HTML)
───────────────────────────────────────── */
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
:root{
  --white:#ffffff;--off:#fafaf8;--paper:#f5f4f0;
  --rule:rgba(26,36,26,0.1);--rule-2:rgba(26,36,26,0.06);
  --stone:#8a8a82;--stone-2:#b0b0a8;
  --ink:#1a1a16;--ink-2:#363630;--ink-3:#5a5a52;
  --gold:#c09a3a;--gold-lt:#fdf6e3;
  --px:20px;--r-sm:8px;--r-md:14px;--r-lg:20px;--r-xl:28px;
  --shadow-sm:0 1px 4px rgba(26,36,26,0.07);
  --shadow-md:0 4px 20px rgba(26,36,26,0.09);
  --shadow-lg:0 12px 48px rgba(26,36,26,0.12);
}
html{scroll-behavior:smooth}
body{font-family:'Jost',sans-serif;background:var(--off);color:var(--ink);min-height:100vh;font-weight:300;line-height:1.5}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}
button{font-family:inherit;cursor:pointer;border:none;background:none}

.page{max-width:430px;margin:0 auto;padding-bottom:110px;background:var(--off);min-height:100vh;position:relative}

/* STICKY CTA */
.sticky-cta{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:200;width:calc(100% - 40px);max-width:390px;background:var(--teal);color:white;font-family:'Jost',sans-serif;font-weight:600;font-size:15px;letter-spacing:0.06em;text-transform:uppercase;padding:17px 28px;border-radius:4px;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;box-shadow:var(--shadow-teal);transition:opacity 0.3s,transform 0.3s;animation:riseUp 0.6s 1s cubic-bezier(0.22,1,0.36,1) both}
.sticky-cta:hover{background:var(--teal-2)}
.sticky-cta--hidden{opacity:0;pointer-events:none;transform:translateX(-50%) translateY(12px)}
@keyframes riseUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* HERO */
.hero{position:relative;height:100svh;max-height:680px;min-height:500px;overflow:hidden;background:var(--ink)}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;opacity:0.62;animation:heroZoom 8s ease both}
.hero-img--fallback{background:linear-gradient(135deg,#1a2a1a,#0b6e62)}
@keyframes heroZoom{from{transform:scale(1.08)}to{transform:scale(1.0)}}
.hero-gradient{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,12,10,0.10) 0%,rgba(10,12,10,0.02) 30%,rgba(10,12,10,0.55) 65%,rgba(10,12,10,0.90) 100%)}
.hero-topbar{position:absolute;top:0;left:0;right:0;padding:20px var(--px);display:flex;align-items:center;justify-content:space-between;z-index:10;animation:fadeDown 0.7s 0.2s ease both}
@keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
.hero-badge{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:6px 14px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.9)}
.live-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;animation:pulse 2.5s ease infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
.hero-google{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:6px 12px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.9)}
.hero-google-stars{color:#fbbf24;font-size:10px;letter-spacing:1px}
.hero-google--link{text-decoration:none;color:inherit;cursor:pointer}
.hero-google--link:hover{opacity:0.85}
.google-row--link{text-decoration:none;color:inherit;cursor:pointer}
.google-row--link:hover{opacity:0.8}
.hero-body{position:absolute;bottom:0;left:0;right:0;padding:0 var(--px) 36px;z-index:10;animation:fadeUp 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.hero-location{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:10px}
.hero-logo{width:64px;height:64px;border-radius:14px;object-fit:cover;border:2px solid rgba(255,255,255,0.3);margin-bottom:14px;box-shadow:0 4px 20px rgba(0,0,0,0.3)}
.hero-name{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:58px;line-height:0.9;letter-spacing:-0.02em;color:#ffffff;margin-bottom:4px}
.hero-name em{display:block;font-style:italic;font-weight:400;color:rgba(255,255,255,0.75);font-size:46px}
.hero-divider{width:36px;height:1.5px;background:var(--teal-mid);margin:16px 0}
.hero-descriptor{font-size:14px;font-weight:300;color:rgba(255,255,255,0.65);letter-spacing:0.02em;margin-bottom:20px;line-height:1.6}
.hero-scroll{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);animation:bobble 2.5s ease infinite 1.5s}
@keyframes bobble{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
.scroll-line{width:20px;height:1px;background:rgba(255,255,255,0.25)}

/* OVERLAP CARD */
.overlap-card{position:relative;z-index:20;margin:-32px var(--px) 0;background:var(--white);border-radius:var(--r-lg);box-shadow:var(--shadow-lg);overflow:hidden;animation:cardRise 0.7s 0.6s cubic-bezier(0.22,1,0.36,1) both}
@keyframes cardRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.contact-row{display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid var(--rule-2)}
.cr-btn{display:flex;flex-direction:column;align-items:center;gap:6px;padding:18px 10px;cursor:pointer;transition:background 0.15s;text-decoration:none;position:relative}
.cr-btn:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:var(--rule-2)}
.cr-btn:hover{background:var(--off)}
.cr-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px}
.cr-icon--teal{background:var(--teal-lt)}
.cr-icon--gold{background:var(--gold-lt)}
.cr-icon--paper{background:var(--paper)}
.cr-label{font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--stone)}
.stats-row{display:grid;grid-template-columns:1fr 1fr 1fr}
.stat-col{padding:16px 10px;text-align:center;position:relative}
.stat-col:not(:last-child)::after{content:'';position:absolute;right:0;top:25%;bottom:25%;width:1px;background:var(--rule-2)}
.stat-num{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:24px;color:var(--teal);line-height:1;margin-bottom:3px}
.stat-lbl{font-size:10px;font-weight:500;letter-spacing:0.09em;text-transform:uppercase;color:var(--stone-2)}

/* SECTIONS */
.sec{padding:36px var(--px) 0}
.sec-eyebrow{font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--teal);margin-bottom:6px}
.sec-title{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:34px;letter-spacing:-0.01em;color:var(--ink);line-height:1;margin-bottom:20px}
.sec-rule{height:1px;background:var(--rule-2);margin-bottom:20px}

/* B/A SLIDER */
.ba-container{position:relative;height:220px;border-radius:var(--r-lg);overflow:hidden;cursor:ew-resize;box-shadow:var(--shadow-md);user-select:none;border:1px solid var(--rule-2)}
.ba-before,.ba-after{position:absolute;inset:0}
.ba-before img,.ba-after img{width:100%;height:100%;object-fit:cover;pointer-events:none}
.ba-before img{filter:grayscale(0.65) brightness(0.8)}
.ba-after{clip-path:inset(0 0 0 50%)}
.ba-line{position:absolute;top:0;bottom:0;left:50%;width:1.5px;background:rgba(255,255,255,0.9);z-index:5;pointer-events:none}
.ba-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;background:white;border-radius:50%;z-index:6;pointer-events:none;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 16px rgba(0,0,0,0.2)}
.ba-labels{position:absolute;top:12px;left:0;right:0;display:flex;justify-content:space-between;padding:0 14px;z-index:7;pointer-events:none}
.ba-lbl{font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:4px 11px;border-radius:2px}
.ba-lbl--before{background:rgba(0,0,0,0.4);backdrop-filter:blur(8px);color:rgba(255,255,255,0.75)}
.ba-lbl--after{background:var(--teal);color:white}
.ba-hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.35);backdrop-filter:blur(8px);color:rgba(255,255,255,0.7);font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;padding:4px 14px;border-radius:2px;white-space:nowrap;z-index:7;pointer-events:none}

/* GALLERY */
.gallery-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px}
.gallery-tile{height:96px;border-radius:var(--r-md);overflow:hidden;position:relative;border:1px solid var(--rule-2)}
.gallery-tile img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease}
.gallery-tile:hover img{transform:scale(1.06)}
.gallery-tile-tag{position:absolute;bottom:7px;left:7px;background:rgba(255,255,255,0.9);color:var(--ink-3);font-size:9px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;padding:2px 8px;border-radius:2px}
.gallery-tile-zoom{position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.5);color:#fff;font-size:12px;width:22px;height:22px;border-radius:4px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s}
.gallery-tile:hover .gallery-tile-zoom{opacity:1}
.lb-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;animation:lbIn 0.2s ease}
@keyframes lbIn{from{opacity:0}to{opacity:1}}
.lb-img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;box-shadow:0 0 60px rgba(0,0,0,0.5)}
.lb-close{position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:20px;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center}
.lb-close:hover{background:rgba(255,255,255,0.25)}
.lb-prev,.lb-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:36px;width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.lb-prev{left:16px}.lb-next{right:16px}
.lb-prev:hover,.lb-next:hover{background:rgba(255,255,255,0.25)}
.lb-counter{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.6);font-size:13px}

/* SERVICES */
.svc-item{display:flex;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid var(--rule-2)}
.svc-item:last-child{border-bottom:none}
.svc-icon{width:52px;height:52px;border-radius:var(--r-md);border:1px solid var(--rule);background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;transition:background 0.2s}
.svc-item:hover .svc-icon{background:var(--teal-lt)}
.svc-body{flex:1}
.svc-name{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:20px;color:var(--ink);margin-bottom:2px;letter-spacing:-0.01em}
.svc-desc{font-size:12px;color:var(--stone);line-height:1.5}
.svc-price-col{text-align:right;flex-shrink:0}
.svc-from{font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--stone-2)}
.svc-price{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:26px;color:var(--teal);letter-spacing:-0.01em;line-height:1}

/* CREDENTIALS */
.cred-strip{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.cred-card{background:var(--white);border:1px solid var(--rule-2);border-radius:var(--r-md);padding:16px 14px;box-shadow:var(--shadow-sm);display:flex;align-items:flex-start;gap:12px}
.cred-icon{width:36px;height:36px;border-radius:10px;background:var(--teal-lt);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.cred-title{font-weight:600;font-size:13px;color:var(--ink);margin-bottom:2px}
.cred-text{font-size:11px;color:var(--stone);line-height:1.5}

/* REVIEW */
.review-wrap{background:var(--white);border:1px solid var(--rule-2);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-sm);position:relative;overflow:hidden}
.review-wrap::before{content:"\u201C";position:absolute;top:-10px;right:18px;font-family:'Cormorant Garamond',serif;font-size:100px;color:var(--teal-lt);line-height:1;pointer-events:none}
.rv-stars{display:flex;gap:3px;margin-bottom:12px}
.rv-star{color:var(--gold);font-size:14px}
.rv-text{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:19px;color:var(--ink-2);line-height:1.65;margin-bottom:18px}
.rv-footer{display:flex;align-items:center;justify-content:space-between}
.rv-person{display:flex;align-items:center;gap:10px}
.rv-avatar{width:38px;height:38px;border-radius:50%;background:var(--teal-lt);border:1.5px solid rgba(11,110,98,0.15);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:17px;color:var(--teal);flex-shrink:0}
.rv-name{font-weight:600;font-size:13px;color:var(--ink)}
.rv-date{font-size:11px;color:var(--stone);margin-top:1px}
.rv-badge{font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;background:var(--teal-lt);color:var(--teal);padding:4px 10px;border-radius:2px}
.google-row{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;font-size:11px;color:var(--stone)}
.google-g{width:18px;height:18px;background:#4285F4;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white}

/* QUOTE FORM */
.form-outer{margin:36px var(--px) 0;border-radius:var(--r-xl);overflow:hidden;box-shadow:var(--shadow-lg);border:1px solid var(--rule-2)}
.form-header{background:var(--teal);padding:28px var(--px) 26px;position:relative;overflow:hidden}
.form-header::before,.form-header::after{content:'';position:absolute;border-radius:50%;background:rgba(255,255,255,0.06)}
.form-header::before{width:180px;height:180px;top:-70px;right:-40px}
.form-header::after{width:80px;height:80px;bottom:-20px;left:60px}
.fh-kicker{font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:6px}
.fh-title{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:38px;letter-spacing:-0.01em;color:white;line-height:0.95;margin-bottom:8px}
.fh-title em{font-style:italic;font-weight:400;color:rgba(255,255,255,0.7)}
.fh-sub{font-size:13px;font-weight:300;color:rgba(255,255,255,0.6);line-height:1.6}
.form-body{background:var(--white);padding:24px var(--px)}
.step-bar{display:flex;align-items:center;gap:0;margin-bottom:24px}
.step-seg{flex:1;height:2px;background:var(--rule);transition:background 0.3s}
.step-seg--done{background:var(--teal-2)}
.step-seg--active{background:var(--teal)}
.svc-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:18px}
.svc-tile{border:1.5px solid var(--rule);border-radius:var(--r-md);padding:12px 6px;text-align:center;cursor:pointer;background:var(--off);transition:border-color 0.15s,background 0.15s;min-height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.svc-tile:hover,.svc-tile--sel{border-color:var(--teal);background:var(--teal-lt)}
.st-icon{font-size:22px;margin-bottom:5px}
.st-name{font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--stone);line-height:1.3;word-break:break-word;white-space:normal}
.svc-tile--sel .st-name{color:var(--teal)}
.f-label{display:block;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--stone);margin-bottom:7px;margin-top:16px}
.f-input,.f-select,.f-textarea{width:100%;background:var(--off);border:1.5px solid var(--rule);border-radius:var(--r-sm);padding:13px 14px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);outline:none;transition:border-color 0.2s,background 0.2s;appearance:none;line-height:1.4}
.f-input:focus,.f-select:focus,.f-textarea:focus{border-color:var(--teal);background:var(--white)}
.f-textarea{resize:none;min-height:80px}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.f-back{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:var(--stone-2);cursor:pointer;margin-bottom:18px;transition:color 0.15s}
.f-back:hover{color:var(--stone)}
.upload-zone{display:block;border:1.5px dashed var(--rule);border-radius:var(--r-sm);padding:20px;text-align:center;cursor:pointer;background:var(--off);transition:border-color 0.2s,background 0.2s}
.upload-zone:hover{border-color:var(--teal);background:var(--teal-lt)}
.uz-icon{font-size:26px;margin-bottom:6px}
.uz-text{font-size:12px;color:var(--stone);line-height:1.5}
.uz-text strong{color:var(--teal);font-weight:600}
.uz-confirm{font-size:12px;color:var(--teal);font-weight:500;margin-top:7px}
.promise-box{background:var(--teal-lt);border:1px solid rgba(11,110,98,0.12);border-radius:var(--r-sm);padding:14px 16px;margin:16px 0}
.pb-title{font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:var(--teal);margin-bottom:4px}
.pb-items{list-style:none}
.pb-items li{font-size:12px;color:var(--ink-3);line-height:1.7;display:flex;align-items:flex-start;gap:7px}
.pb-items li::before{content:'→';color:var(--teal);font-size:11px;margin-top:2px;flex-shrink:0}
.btn-primary{width:100%;background:var(--teal);color:white;font-family:'Jost',sans-serif;font-weight:600;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;padding:16px;border-radius:var(--r-sm);border:none;cursor:pointer;margin-top:16px;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s,transform 0.2s,box-shadow 0.2s}
.btn-primary:hover{background:var(--teal-2);transform:translateY(-1px);box-shadow:var(--shadow-teal)}
.btn-primary:disabled{opacity:0.7;cursor:not-allowed;transform:none}
.submit-error{margin-top:10px;padding:10px 14px;background:#fff0f0;border:1px solid rgba(200,0,0,0.15);border-radius:8px;font-size:13px;color:#c00;text-align:center}
.form-success{text-align:center;padding:16px 0 8px}
.success-check{width:64px;height:64px;border-radius:50%;background:var(--teal-lt);border:1.5px solid rgba(11,110,98,0.2);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 16px;animation:checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both}
@keyframes checkPop{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
.success-title{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:30px;color:var(--ink);margin-bottom:8px}
.success-text{font-size:13px;font-weight:300;color:var(--stone);line-height:1.7}

/* FOOTER */
.footer{padding:32px var(--px) 16px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--stone-2)}
.footer-o{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:15px;color:var(--teal);letter-spacing:0.06em}

/* SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(20px);transition:opacity 0.65s ease,transform 0.65s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
`
