import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Order Confirmed — Opervo Print',
  robots: { index: false },
}

export default function PrintSuccess() {
  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <SiteNav />

      <section style={{ maxWidth: 600, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(18,160,92,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>
          ✓
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 16 }}>
          Order Confirmed!
        </h1>
        <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 32 }}>
          Thank you for your order. We'll send a design proof to your email within 24 hours for your approval before anything goes to print.
        </p>

        <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '24px', marginBottom: 32, textAlign: 'left' }}>
          {[
            { step: '1', label: 'Proof in 24hrs', desc: "Check your email — we'll send a design proof for your approval." },
            { step: '2', label: 'You approve', desc: 'Reply with any changes or give the green light.' },
            { step: '3', label: 'We print & ship', desc: 'Ships within 5–7 business days after approval. Free shipping.' },
          ].map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: 14, marginBottom: s.step !== '3' ? 20 : 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F0F0F', margin: '2px 0 2px' }}>{s.label}</p>
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>
          Questions? Email us at <a href="mailto:help@opervo.io" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 600 }}>help@opervo.io</a>
        </p>

        <Link href="/print" style={{ display: 'inline-block', background: '#0F0F0F', color: '#F7F5F2', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, padding: '13px 28px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Order More Materials
        </Link>
      </section>

      <SiteFooter />
    </div>
  )
}
