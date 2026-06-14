import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started | Opervo Apprentice',
  description: 'How to set up your Opervo account, share your referral code, and track your gear credits.',
}

const steps = [
  {
    number: '01',
    title: 'LOG IN TO YOUR ACCOUNT',
    body: 'Go to app.opervo.io and sign in with the email you applied with. Your free Solo plan is already active — you have access to everything: jobs, invoices, clients, scheduling, your public portfolio page, and the AI assistant.',
  },
  {
    number: '02',
    title: 'SET UP YOUR BUSINESS',
    body: 'Tap the Setup Checklist on your dashboard. Add your business name, upload a logo, set your services and pricing, and build out your Folio page. Your Folio is your public portfolio — clients can see your work and request a quote directly.',
  },
  {
    number: '03',
    title: 'SHARE YOUR CODE',
    body: 'Your referral code is a short word based on your business name. When someone signs up for Opervo and types your code in the promo code field on their payment screen, they get 50% off their first month — and that referral is linked to you. You earn gear credits after they complete their second paid month.',
    highlight: true,
  },
  {
    number: '04',
    title: 'WHERE TO SHARE IT',
    body: 'Put your code in your TikTok bio, say it in your videos, add it to your Instagram link-in-bio, or text it to people who ask what app you use. You don\'t need a clickable link — they just type the code when they subscribe.',
  },
  {
    number: '05',
    title: 'TRACK YOUR CREDITS',
    body: 'Go to opervo.io/apprentice/credits and sign in with your Opervo login. You can also go directly with opervo.io/apprentice/credits?code=yourcode. Both show your balance, referral count, and what you can redeem.',
  },
  {
    number: '06',
    title: 'REDEEM GEAR',
    body: 'When you hit a reward tier, tap Redeem on the gear you want. That sends an email to Max and he\'ll get it shipped. Reward tiers are coming soon — we\'ll let you know when they go live.',
  },
]

export default function GuidePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F5F2', fontFamily: "'Barlow', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#0F0F0F', padding: '28px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#F7F5F2' }}>
              Opervo<span style={{ color: '#F5620F' }}>.</span>
            </span>
          </a>
          <p style={{ margin: '16px 0 0', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F7F5F2', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            APPRENTICE<br />GETTING STARTED
          </p>
          <p style={{ margin: '10px 0 0', fontSize: 15, color: '#9CA3AF', lineHeight: 1.6 }}>
            Your account is set up. Here's how to use it, share your code, and start earning gear.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: '#fff',
                border: step.highlight ? '2px solid #F5620F' : '1px solid #E8E4DE',
                borderRadius: 12,
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  color: '#F5620F',
                  lineHeight: 1,
                }}>
                  {step.number}
                </span>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: '#0F0F0F',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.3px',
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  {step.title}
                </h2>
              </div>
              <p style={{
                margin: 0,
                fontSize: 15,
                color: '#1a1a1a',
                lineHeight: 1.65,
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{
          background: '#fff',
          border: '1px solid #E8E4DE',
          borderRadius: 12,
          padding: '24px',
          marginTop: 16,
        }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 14,
            color: '#0F0F0F',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 12px',
          }}>
            QUICK LINKS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: 'https://app.opervo.io', label: 'Open Opervo App' },
              { href: '/apprentice', label: 'Apprentice Program Page' },
              { href: 'mailto:help@opervo.io', label: 'Email Max' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  background: '#F7F5F2',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0F0F0F',
                  textDecoration: 'none',
                }}
              >
                {link.label}
                <span style={{ float: 'right', color: '#6B6B6B' }}>&rarr;</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 12, color: '#9CA3AF' }}>
            Questions? Email <a href="mailto:help@opervo.io" style={{ color: '#6B6B6B' }}>help@opervo.io</a>
          </p>
        </div>
      </div>
    </div>
  )
}
