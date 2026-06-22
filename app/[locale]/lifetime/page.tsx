import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Opervo Lifetime Pass · Pay once, own it forever',
  description:
    'Pay once. You\'re in. Every feature, every update, every year. Solo Lifetime $499, Team Lifetime $1,499. No monthly bill, ever.',
  alternates: { canonical: 'https://www.opervo.io/lifetime' },
  openGraph: {
    title: 'Opervo Lifetime Pass · Pay once, own it forever',
    description:
      'Pay once. You\'re in. Every feature, every update, every year. No monthly bill, ever.',
    url: 'https://www.opervo.io/lifetime',
    type: 'website',
  },
}

const SOLO_PRICE = 499
const TEAM_PRICE = 1499

// Claiming a Lifetime Pass goes through the same path as every membership:
// sign in to the app, open Settings > Payments, and claim there. That checkout
// stamps the operator's account id, so the pass provisions to the right account.
const APP_CHECKOUT = 'https://app.opervo.io/#/settings/payments'

const heading = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900 as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.5px',
  color: '#0F0F0F',
}

const body = { fontFamily: "'Barlow', sans-serif" }

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#F5620F" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6 9 17l-5-5"/></svg>
)
const Dash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M5 12h14"/></svg>
)

export default function LifetimePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Opervo Lifetime Pass',
    description: 'One-time payment for lifetime access to Opervo field service management software.',
    offers: [
      { '@type': 'Offer', name: 'Solo Lifetime Pass', price: SOLO_PRICE, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Team Lifetime Pass', price: TEAM_PRICE, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    ],
  }

  return (
    <div style={{ ...body, background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteNav />

      {/* HERO. the letter */}
      <section style={{ background: '#0F0F0F', color: '#fff', padding: '96px 24px 72px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 32 }}>
            A letter from Max · Founder, Opervo
          </p>
          <h1 style={{ ...heading, color: '#fff', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.0, marginBottom: 36, letterSpacing: '-1.5px' }}>
            Pay once for Opervo.<br />
            Own it <span style={{ color: '#F5620F' }}>forever</span>.
          </h1>

          <div style={{ fontSize: 17, lineHeight: 1.7, color: '#d4cec3' }}>
            <p style={{ marginBottom: 20 }}>
              I built Opervo because I was on the truck and Jobber wanted $79 a month for software I barely used. The whole industry charges per seat, marks up your payments, and locks your data in. It&apos;s a racket built to extract from people too busy on the truck to push back.
            </p>
            <p style={{ marginBottom: 20 }}>
              I&apos;m not raising VC. The moment you take that money, you spend the next decade defending margins instead of fighting for the people you started this for. Every Jobber, every Housecall Pro, every ServiceTitan is in that trap. They literally cannot offer what&apos;s on this page. Their boards would fire them.
            </p>
            <p style={{ marginBottom: 20 }}>
              I have a day job. Opervo isn&apos;t how I pay my rent. That&apos;s the whole point. It means I get to build this the right way, with the people it&apos;s actually for, on a timeline that respects you instead of a quarterly board deck. Nobody is going to pressure me to ship a worse product to hit a number.
            </p>
            <p style={{ marginBottom: 0, color: '#fff', fontSize: 18, fontWeight: 600 }}>
              So here&apos;s the launch special.
            </p>
          </div>
        </div>
      </section>

      {/* THE OFFER */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {/* SOLO CARD */}
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 16, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Solo Lifetime</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ ...heading, fontSize: 56, lineHeight: 1, color: '#0F0F0F' }}>$499</span>
              <span style={{ fontSize: 14, color: '#6B6B6B', fontWeight: 500 }}>once</span>
            </div>
            <p style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 500, marginBottom: 12 }}>
              or 4 payments of $124.75, interest-free with Klarna at checkout
            </p>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55, marginBottom: 24 }}>
              You + a helper. Every Solo feature we ship, forever. Compare to $24.99/mo.
            </p>

            <a href={APP_CHECKOUT} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '16px 20px', background: '#F5620F', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', boxSizing: 'border-box' }}>
              Claim Solo Lifetime
            </a>
            <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>30-day money back. After that, non-refundable.</p>
          </div>

          {/* TEAM CARD */}
          <div style={{ background: '#0F0F0F', border: '1px solid #0F0F0F', borderRadius: 16, padding: '32px 28px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Team Lifetime</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ ...heading, fontSize: 56, lineHeight: 1, color: '#fff' }}>$1,499</span>
              <span style={{ fontSize: 14, color: '#b0aaa0', fontWeight: 500 }}>once</span>
            </div>
            <p style={{ fontSize: 12, color: '#b0aaa0', fontWeight: 500, marginBottom: 12 }}>
              or 4 payments of $374.75, interest-free with Klarna at checkout
            </p>
            <p style={{ fontSize: 14, color: '#b0aaa0', lineHeight: 1.55, marginBottom: 24 }}>
              Up to 10 team members. Every Team feature we ship, forever. Compare to $54.99/mo.
            </p>

            <a href={APP_CHECKOUT} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '16px 20px', background: '#F5620F', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', boxSizing: 'border-box' }}>
              Claim Team Lifetime
            </a>
            <p style={{ fontSize: 12, color: '#b0aaa0', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>30-day money back. After that, non-refundable.</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#6B6B6B', marginTop: 24, lineHeight: 1.6, maxWidth: 560, margin: '24px auto 0' }}>
          You pay once. You&apos;re in. Every feature, every update, every year. Yours.<br />
          <strong style={{ color: '#1a1a1a' }}>Year three you&apos;re already ahead. Year ten you&apos;ve paid one-fifth what a Jobber subscriber paid.</strong> Year twenty the math becomes a joke.
        </p>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#6B6B6B', marginTop: 16, lineHeight: 1.6, maxWidth: 560, margin: '16px auto 0' }}>
          You claim it inside the app: sign in, open Settings, then Payments and billing, and claim your pass there. If you don&apos;t have an account yet, start free first, it takes a minute.
        </p>
      </section>

      {/* WHY I'M DOING THIS */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 24px' }}>
        <h2 style={{ ...heading, fontSize: 'clamp(28px, 4vw, 38px)', marginBottom: 24, lineHeight: 1.05 }}>
          Why I&apos;m doing this
        </h2>
        <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 32 }}>
          Two reasons. Both honest.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          <div style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>One</p>
            <p style={{ ...heading, fontSize: 22, color: '#0F0F0F', marginBottom: 10, letterSpacing: '-0.3px' }}>
              I&apos;m rewarding the operators who show up early.
            </p>
            <p style={{ fontSize: 16, color: '#1a1a1a', lineHeight: 1.65 }}>
              This is a launch offer for the people who back Opervo before it&apos;s famous. Pay once now, and you never pay for the software again. That&apos;s the trade for betting on us early.
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>Two</p>
            <p style={{ ...heading, fontSize: 22, color: '#0F0F0F', marginBottom: 10, letterSpacing: '-0.3px' }}>
              I want partners, not subscribers.
            </p>
            <p style={{ fontSize: 16, color: '#1a1a1a', lineHeight: 1.65 }}>
              Anyone who buys this is betting on me before I&apos;ve earned it. That bet matters. You&apos;re not a subscriber. You&apos;re a founding operator. I&apos;ll build like it.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT INCLUDES / DOESN'T */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 16, padding: '32px 28px' }}>
            <h3 style={{ ...heading, fontSize: 18, marginBottom: 18, color: '#0F0F0F' }}>What it includes</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
              {[
                'Lifetime access to your tier. Every feature, every update.',
                'No per-seat fees. Solo means you + a helper. Team means up to 10.',
                'Payments stay at Stripe or Square cost. We don\'t mark them up. Now or ever.',
                'Founder Discord access. Direct line to me. Feature requests with operator support get prioritized.',
                'Founding Operator badge on your Folio. Public proof you showed up early.',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: '#1a1a1a', lineHeight: 1.55 }}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 16, padding: '32px 28px' }}>
            <h3 style={{ ...heading, fontSize: 18, marginBottom: 18, color: '#0F0F0F' }}>What it doesn&apos;t include</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
              {[
                'SMS, payment processing, and third-party API costs. Those stay pass-through.',
                'Future tiers above Team. If we launch something bigger someday, that’s separate.',
                'Magic. The app still has bugs and we still ship at 11pm.',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: '#1a1a1a', lineHeight: 1.55 }}>
                  <Dash />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROTECTION */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 24px' }}>
        <h2 style={{ ...heading, fontSize: 'clamp(28px, 4vw, 38px)', marginBottom: 24, lineHeight: 1.05 }}>
          Your Pass is protected.
        </h2>
        <div style={{ display: 'grid', gap: 18, fontSize: 16, lineHeight: 1.65, color: '#1a1a1a' }}>
          <p>
            I&apos;m planning to build this for decades. But if anything ever happens, your Pass is protected. Pro-rated refund of remaining value, written into the terms. No disappearing acts.
          </p>
          <p>
            If Opervo is ever acquired, your Pass transfers to the new owner at the same terms, or you get refunded. Your call.
          </p>
          <p>
            If it&apos;s not for you, email <a href="mailto:help@opervo.io" style={{ color: '#F5620F', textDecoration: 'underline' }}>help@opervo.io</a> in the first 30 days and I refund you in full, no questions. After that it&apos;s non-refundable. Fair on both sides.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 24px' }}>
        <h2 style={{ ...heading, fontSize: 'clamp(28px, 4vw, 38px)', marginBottom: 32, lineHeight: 1.05 }}>
          Honest answers.
        </h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {[
            {
              q: 'How do I claim it?',
              a: 'Inside the app, the same way every membership works. Sign in at app.opervo.io, open Settings, then Payments and billing, and claim your Lifetime Pass there. If you don\'t have an account yet, start the free trial first, it only takes a minute, then claim.',
            },
            {
              q: 'What if I\'m already paying for Opervo?',
              a: 'Your last 12 months of payments come off the lifetime price. If you\'ve paid us $300 over the year, you pay $199 instead of $499. Email help@opervo.io to apply the credit.',
            },
            {
              q: 'Can I split the payment up?',
              a: 'Yes. At checkout, choose Klarna and split it into 4 interest-free payments. $124.75 every two weeks for Solo, $374.75 every two weeks for Team. Klarna handles the financing. From our side it\'s still one payment, and you\'re a Lifetime Pass holder from day one.',
            },
            {
              q: 'What does "lifetime" actually mean?',
              a: 'Lifetime of your account. Non-transferable. You get every current and future feature in your tier, forever. If we launch a brand-new tier above Team someday, that\'s separate. You stay on the tier you bought, with everything that ships into it.',
            },
            {
              q: 'Why are you doing this instead of raising VC?',
              a: 'Because the moment you take that money, the people who own you stop being your customers. Every promise on this page disappears the day a board starts asking about ARR multiples. No per-seat fees. No payment markups. Nothing between me and you. I don\'t want that fight. So I\'m funding Opervo with the operators it\'s actually for.',
            },
            {
              q: 'What happens if Opervo shuts down?',
              a: 'I owe every Pass holder a pro-rated refund based on remaining estimated value. It\'s in the terms. I\'m not planning to disappear. But if anything ever happened, you\'re protected.',
            },
            {
              q: 'Can I upgrade Solo Lifetime to Team Lifetime later?',
              a: 'Yes, by paying the difference ($1,000). Solo Lifetime credits in full toward Team Lifetime whenever you grow into a crew.',
            },
            {
              q: 'Why should I trust a one-person company with $499?',
              a: 'You shouldn\'t blindly. Here\'s what I can offer: 30-day money-back, written acquirer-protection clause, refund clause if we shut down, my real name and a real day job at the bottom of this page. If that\'s not enough yet, start on the monthly trial first. Come back when you\'re ready.',
            },
          ].map((f, i) => (
            <details key={i} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '18px 22px' }}>
              <summary style={{ fontSize: 16, fontWeight: 700, color: '#0F0F0F', cursor: 'pointer', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ fontSize: 15, color: '#1a1a1a', lineHeight: 1.65, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#0F0F0F', color: '#fff', padding: '72px 24px', marginTop: 64 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 16 }}>
            Opervo Launch Special
          </p>
          <h2 style={{ ...heading, color: '#fff', fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.05, marginBottom: 24 }}>
            Pay once. You&apos;re in.
          </h2>
          <p style={{ fontSize: 17, color: '#d4cec3', lineHeight: 1.6, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            Every feature we ship. Every update. Every year. Yours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={APP_CHECKOUT} style={{ display: 'inline-block', padding: '16px 28px', background: '#F5620F', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
              Claim Solo Lifetime · $499
            </a>
            <a href={APP_CHECKOUT} style={{ display: 'inline-block', padding: '16px 28px', background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
              Claim Team Lifetime · $1,499
            </a>
          </div>
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.12)', textAlign: 'left', fontSize: 15, color: '#d4cec3', lineHeight: 1.6 }}>
            <p style={{ marginBottom: 4 }}>Max</p>
            <p style={{ marginBottom: 4, color: '#b0aaa0' }}>Founder, Opervo</p>
            <p style={{ color: '#b0aaa0' }}>Austin, TX</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
