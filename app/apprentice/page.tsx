import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ApplicationForm from './ApplicationForm'

export const metadata: Metadata = {
  title: 'Opervo Apprentice — Free Software for Teen Operators',
  description: 'If you\'re 13–17 with a real service business — or a strong plan to start one — the software is on us. Free Solo plan, your own folio page, NFC cards, and a direct line to the founder.',
  alternates: { canonical: 'https://www.opervo.io/apprentice' },
  openGraph: {
    title: 'Opervo Apprentice — Free Software for Teen Operators',
    description: 'Built by someone who started mowing lawns at 12. For the next wave of operators.',
    url: 'https://www.opervo.io/apprentice',
    type: 'website',
  },
}

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: '#F5620F',
  marginBottom: 16,
  fontFamily: "'Barlow Condensed', sans-serif",
}

const sectionHeading: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  fontSize: 36,
  textTransform: 'uppercase',
  color: '#0F0F0F',
  lineHeight: 1.1,
  marginBottom: 24,
}

const body: React.CSSProperties = {
  fontSize: 17,
  color: '#1a1a1a',
  fontFamily: "'Barlow', sans-serif",
  lineHeight: 1.75,
}

export default function ApprenticePage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#F7F5F2', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ padding: '100px 24px 64px', textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 16 }}>OPERVO APPRENTICE</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 56, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.03, marginBottom: 24, letterSpacing: '-1px' }}>
            FREE OPERVO.<br />
            <span style={{ color: '#F5620F' }}>FOR THE NEXT WAVE OF OPERATORS.</span>
          </h1>
          <p style={{ fontSize: 19, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, maxWidth: 640, margin: '0 auto 32px' }}>
            If you're 13–17 with a real service business — or a strong plan to start one — the software is on us. Free Solo plan, your own folio page, NFC cards, and a direct line to the founder.
          </p>
          <a
            href="#apply"
            style={{
              display: 'inline-block',
              background: '#F5620F',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              textTransform: 'uppercase',
              padding: '16px 40px',
              borderRadius: 6,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            APPLY NOW
          </a>
          <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginTop: 16 }}>
            Takes 3 minutes. Reviewed by Max personally.
          </p>
        </section>

        {/* THE STORY */}
        <section style={{ background: '#0F0F0F', padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ ...eyebrow, color: '#F5620F' }}>WHY THIS EXISTS</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, textTransform: 'uppercase', color: '#fff', lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.5px' }}>
              I STARTED MOWING LAWNS AT 12.<br />
              <span style={{ color: '#F5620F' }}>I REMEMBER WHAT THE TOOLS COST.</span>
            </h2>

            {/* Young-entrepreneur photo strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 36 }}>
              {[
                { src: '/apprentice/IMG_7693.PNG', age: '12', caption: 'The lawn business' },
                { src: '/apprentice/IMG_7691.PNG', age: 'Middle school', caption: 'eBay fulfillment in a storage unit' },
                { src: '/apprentice/IMG_7687.PNG', age: 'Same era', caption: 'DIY product-photo studio for the listings' },
                { src: '/apprentice/IMG_7692.PNG', age: '14', caption: 'The teen entrepreneur contest video' },
              ].map((p) => (
                <div key={p.src}>
                  <div style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 8, overflow: 'hidden', background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                    <img
                      src={p.src}
                      alt={`Max, ${p.age} — ${p.caption}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                    />
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '12px 0 4px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {p.age}
                  </p>
                  <p style={{ fontSize: 13, color: '#d4d4d4', fontFamily: "'Barlow', sans-serif", lineHeight: 1.4, margin: 0 }}>
                    {p.caption}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 17, color: '#d4d4d4', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 18 }}>
              8 years old, I was washing cars and running lemonade stands in my neighborhood. Middle school, I was flipping stuff on eBay. At 12 I started mowing lawns — that's when it started feeling like an actual business. At 14, I entered a teen entrepreneur contest with a YouTube video about it. There's a record somewhere on the internet. I kept stacking trades from there — windows, pressure washing, solar panels — all of it run around a full-time paramedic career I've worked for the last decade.
            </p>
            <p style={{ fontSize: 17, color: '#d4d4d4', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 18 }}>
              Back then, software like Opervo didn't exist for solo operators. I tracked clients in a notebook, kept the schedule in my head, printed invoices on a sheet of paper. Today the software exists — but it's $50+ a month and built for 20-person crews. Same wall every young operator hits, just with a new tool on it.
            </p>
            <p style={{ fontSize: 17, color: '#fff', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, fontWeight: 600 }}>
              If you're 13 to 17, running a real service business or pitching one, this is the tool I wish I'd had at your age. On us. No catch. No contract. Just go.
            </p>
            <p style={{ marginTop: 24, fontSize: 14, color: '#9ca3af', fontFamily: "'Barlow', sans-serif", fontStyle: 'italic' }}>
              — Max, founder of Opervo
            </p>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={eyebrow}>WHAT'S INCLUDED</p>
            <h2 style={sectionHeading}>
              EVERYTHING ON THE SOLO PLAN.<br />
              <span style={{ color: '#F5620F' }}>PLUS A LITTLE EXTRA.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                title: 'Free Opervo Solo plan',
                value: '$24.99/mo value',
                desc: 'Same plan adult operators pay for. Jobs, invoices, scheduling, expenses, mileage, AI assistant. Everything.',
              },
              {
                title: 'Your own Folio page',
                value: 'Public portfolio',
                desc: 'opervo.io/yourbusiness — auto-updates as you complete jobs. Clients see your real work and request quotes.',
              },
              {
                title: 'NFC business cards',
                value: 'Pack of 5',
                desc: 'Tap your phone, share your folio. Looks pro at the door, on the truck, at the trade show.',
              },
              {
                title: 'Sticker pack',
                value: 'For the truck or cooler',
                desc: 'Brand-matched Opervo stickers. Throw them on your van, your hose reel, wherever.',
              },
              {
                title: 'Direct line to Max',
                value: 'Text or email anytime',
                desc: 'Stuck? Need advice on pricing a weird job? Want feedback on your folio? Hit me up. I read every message.',
              },
              {
                title: 'Founding-cohort badge',
                value: 'On your folio',
                desc: 'Public mark that you were one of the first Opervo Apprentices. Stays with you when you graduate.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E4DE',
                  borderRadius: 12,
                  padding: '24px',
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {item.value}
                </p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F0F0F', marginBottom: 10, lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '72px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={eyebrow}>REQUIREMENTS</p>
            <h2 style={sectionHeading}>
              THIS ISN'T FOR EVERYONE.<br />
              <span style={{ color: '#F5620F' }}>HERE'S WHO IT'S FOR.</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
              {[
                'You\'re 13 to 17 years old.',
                'You\'re either running a service business right now — window cleaning, pressure washing, lawn care, detailing, solar panels, snow, anything in the trades — OR you\'ve got a serious concept and you\'re ready to launch. The application is where you make your case.',
                'You have a parent or guardian who knows you\'re applying. They\'ll get a heads-up email when you submit.',
              ].map((line) => (
                <li key={line} style={{ ...body, paddingLeft: 24, position: 'relative', marginBottom: 14 }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, color: '#F5620F', fontWeight: 900, fontSize: 18 }}>›</span>
                  {line}
                </li>
              ))}
            </ul>
            <p style={{ ...body, fontSize: 15, color: '#6B6B6B', fontStyle: 'italic', marginTop: 24 }}>
              No follower count required. No minimum revenue. No registered LLC. If you're doing the work — or you've got a real plan to start — you qualify.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={eyebrow}>THE PROCESS</p>
            <h2 style={sectionHeading}>
              FOUR STEPS.<br />
              <span style={{ color: '#F5620F' }}>NO HIDDEN GATE.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { n: '01', t: 'Apply', d: 'Fill out the form below. About 3 minutes.' },
              { n: '02', t: 'Max reviews', d: 'Personally. Every application. No bots, no committee.' },
              { n: '03', t: 'Approved? You\'re in', d: 'Free plan activates, kit ships, Max sends you a welcome.' },
              { n: '04', t: 'Run your business', d: 'Post your work if you want. Don\'t if you don\'t. Plan is yours either way.' },
            ].map((s) => (
              <div key={s.n} style={{ borderTop: '3px solid #F5620F', paddingTop: 20 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5620F', lineHeight: 1, margin: 0 }}>
                  {s.n}
                </p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F0F0F', marginTop: 12, marginBottom: 8, textTransform: 'uppercase' }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: 14, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, margin: 0 }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* NO STRINGS */}
        <section style={{ background: '#0F0F0F', padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ ...eyebrow }}>NO STRINGS ATTACHED</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 38, textTransform: 'uppercase', color: '#fff', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.5px' }}>
              THIS ISN'T AN INFLUENCER PROGRAM.<br />
              <span style={{ color: '#F5620F' }}>IT'S A GIFT.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#d4d4d4', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 18 }}>
              No posting requirement. No exclusivity. No content quota. No contract.
            </p>
            <p style={{ fontSize: 17, color: '#d4d4d4', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, marginBottom: 18 }}>
              If you tag <strong style={{ color: '#fff' }}>#OpervoOperators</strong>, awesome. If we want to feature your work, we'll ask first. If you refer <strong style={{ color: '#fff' }}>paying operators</strong> to Opervo, you earn gear credits — redeemable for branded merch and the real trade equipment that moves your business forward (squeegees, sprayers, poles, the stuff you'd otherwise be saving up for). Telling other teens about Apprentice is encouraged, but referring them isn't how you earn — Max still reviews every application.
            </p>
            <p style={{ fontSize: 17, color: '#fff', fontFamily: "'Barlow', sans-serif", lineHeight: 1.75, fontWeight: 600 }}>
              The plan is yours. You don't owe us anything for it.
            </p>
          </div>
        </section>

        {/* APPLY FORM */}
        <section id="apply" style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={eyebrow}>APPLY</p>
            <h2 style={sectionHeading}>
              READY TO BUILD?<br />
              <span style={{ color: '#F5620F' }}>SEND IT.</span>
            </h2>
            <p style={{ ...body, color: '#6B6B6B', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>
              Your parent or guardian will get a heads-up email letting them know you applied. No surprise charges, no contract, no spam.
            </p>
          </div>
          <ApplicationForm />
        </section>

        {/* FAQ */}
        <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', padding: '72px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={eyebrow}>QUESTIONS</p>
            <h2 style={{ ...sectionHeading, marginBottom: 32 }}>
              THE COMMON ONES.
            </h2>
            {[
              {
                q: 'Why is this free?',
                a: 'Max started his first business at 12 and remembers what it costs to be a young operator with no margin for $50/mo software. Opervo exists to back operators at every stage, and the next generation is part of that mission, not separate from it. This is an intentional investment — not a discount, not a giveaway, not charity.',
              },
              {
                q: 'What if I\'m 12?',
                a: 'Save this page. Apply on your 13th birthday. We\'ll be here.',
              },
              {
                q: 'What if I\'m 18?',
                a: 'You don\'t need this — start a 14-day free trial at app.opervo.io. Solo plan is $24.99/mo, no credit card required to start.',
              },
              {
                q: 'Can my parent run the account?',
                a: 'They can be admin. But the point is for YOU to learn how to run a business. The login is yours.',
              },
              {
                q: 'Does my business have to be registered?',
                a: 'No. If you\'re charging real customers for real work, that counts.',
              },
              {
                q: 'How does payment processing work? I\'m under 18.',
                a: 'Most payment processors require account holders to be 18+. Most teen operators run payments through a parent\'s account, or accept cash/Venmo/Cash App. Opervo gives you the software — how you collect payment is between you and your family.',
              },
              {
                q: 'What\'s the catch?',
                a: 'There isn\'t one. If you ever feel like there is, email Max directly and tell him what\'s wrong with this page.',
              },
            ].map((item) => (
              <div key={item.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '20px 0' }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 19, color: '#0F0F0F', marginBottom: 8, textTransform: 'uppercase' }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: 16, color: '#1a1a1a', fontFamily: "'Barlow', sans-serif", lineHeight: 1.7, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.5px' }}>
            I CAN'T WAIT TO SEE<br />
            <span style={{ color: '#F5620F' }}>WHAT YOU BUILD.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#6B6B6B', fontFamily: "'Barlow', sans-serif", marginBottom: 32, fontStyle: 'italic' }}>
            — Max, founder of Opervo
          </p>
          <a
            href="#apply"
            style={{
              display: 'inline-block',
              background: '#F5620F',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              textTransform: 'uppercase',
              padding: '16px 40px',
              borderRadius: 6,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            APPLY NOW
          </a>
        </section>

      </main>
      <SiteFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        @media (max-width: 768px) {
          h1 { font-size: 38px !important; }
          h2 { font-size: 28px !important; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: 'Opervo Apprentice Program',
            description: 'Free Opervo Solo plan for operators ages 13–17 actively running a service business or pitching one. Application-gated, founder-approved.',
            url: 'https://www.opervo.io/apprentice',
            seller: {
              '@type': 'Organization',
              name: 'Opervo',
              url: 'https://www.opervo.io',
            },
            eligibleCustomerType: 'Individual ages 13–17 actively running a service business or pitching one',
            price: '0',
            priceCurrency: 'USD',
          }),
        }}
      />
    </>
  )
}
