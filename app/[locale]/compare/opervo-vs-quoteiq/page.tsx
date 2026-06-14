import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import MoreComparisons from '@/components/MoreComparisons'
import TradesMention from '@/components/TradesMention'

export const metadata: Metadata = {
  title: 'Opervo vs QuoteIQ | Solo Operator Comparison',
  description: 'Compare Opervo and QuoteIQ side by side. Opervo Solo is $24.99/mo and includes a helper, vs QuoteIQ at $74.99/mo for 2 users. See the honest breakdown.',
  alternates: { canonical: 'https://www.opervo.io/compare/opervo-vs-quoteiq' },
  openGraph: {
    title: 'Opervo vs QuoteIQ | Honest Comparison',
    description: 'Opervo Solo $24.99/mo includes a helper. QuoteIQ jumps to $74.99/mo at 2 users. See the full feature and price breakdown.',
    url: 'https://www.opervo.io/compare/opervo-vs-quoteiq',
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Starting price', opervo: '$24.99/mo', quoteiq: '$29.99/mo' },
  { feature: 'Price for 2 people', opervo: '$24.99/mo (helper included)', quoteiq: '$74.99/mo' },
  { feature: 'Price for a small crew', opervo: '$54.99/mo (up to 10)', quoteiq: '$149.99/mo (up to 4)' },
  { feature: 'How pricing scales', opervo: 'Flat plans, helper included', quoteiq: 'User buckets (1 / 2 / 4 / 10)' },
  { feature: 'Free trial', opervo: '14 days', quoteiq: '14 days' },
  { feature: 'Payment markup', opervo: 'Zero, ever', quoteiq: 'See note below' },
  { feature: 'Scheduling', opervo: '✓', quoteiq: '✓' },
  { feature: 'Estimates & invoicing', opervo: '✓', quoteiq: '✓' },
  { feature: 'AI photo estimating', opervo: '✓', quoteiq: '✓' },
  { feature: 'Satellite property measurement', opervo: 'On-map measure', quoteiq: '✓ (MapMeasure)' },
  { feature: 'Route optimization', opervo: '✓', quoteiq: '✓' },
  { feature: 'Recurring e-signed agreements', opervo: '✓', quoteiq: 'Not advertised' },
  { feature: 'Public portfolio page (Folio)', opervo: '✓', quoteiq: 'Self-quote embeds' },
  { feature: 'QuickBooks Online sync', opervo: '✓', quoteiq: '✓' },
  { feature: 'Native iOS + Android', opervo: '✓', quoteiq: '✓' },
  { feature: 'Built for', opervo: 'Solo operators & small crews', quoteiq: 'Solo to scaling crews' },
]

const switchReasons = [
  { title: 'Your first helper is included', desc: 'Opervo Solo is $24.99/mo and covers you plus one helper. On QuoteIQ, adding a second person moves you from the $29.99 Essentials plan to the $74.99 Beginner plan. For a two-person operation that is about $600 a year in your pocket.' },
  { title: 'Flat, predictable pricing', desc: 'Opervo has two plans: Solo $24.99/mo and Team $54.99/mo for up to 10 people. QuoteIQ prices by user bucket (1, 2, 4, 10, unlimited), so your cost steps up as you add people. With Opervo you know your number.' },
  { title: 'Zero payment markup, stated plainly', desc: 'Opervo never takes a cut of your payments. Money goes straight from your customer to you at the processor rate. QuoteIQ markets a no-markup payment promise, but its own payments terms reference a 1 percent convenience fee on card transactions. Worth confirming with them directly.' },
  { title: 'A public page that wins you jobs', desc: 'Every Opervo operator gets a Folio page at opervo.io/p/your-slug. Finished jobs auto-publish with before and after photos, services, and a built-in quote form, so new leads can find you on Google and request a quote on their own.' },
]

const faqs = [
  {
    q: 'Is Opervo cheaper than QuoteIQ?',
    a: 'For one person they are close: Opervo Solo is $24.99/mo and QuoteIQ Essentials is $29.99/mo. The gap opens the moment you add a helper. Opervo Solo already includes a second person, while QuoteIQ moves you to its $74.99/mo Beginner plan for two users. At that point Opervo is about $50/mo, or roughly $600 a year, cheaper.',
  },
  {
    q: 'Does QuoteIQ charge per user?',
    a: 'Not as a separate add-on, but its plans are built around user buckets: 1 user on Essentials ($29.99/mo), 2 on Beginner ($74.99/mo), 4 on Pro ($149.99/mo), 10 on Elite, and unlimited on Max. So your price still steps up as your crew grows. Opervo Solo includes a helper at $24.99/mo, and Team covers up to 10 people for $54.99/mo.',
  },
  {
    q: 'Does QuoteIQ have a free plan?',
    a: 'No. QuoteIQ offers a 14-day free trial but no permanently free tier. Opervo also offers a 14-day free trial, no credit card required.',
  },
  {
    q: 'What does QuoteIQ do better than Opervo?',
    a: 'QuoteIQ is a strong product with some genuine advantages. It bundles a deep set of AI tools (photo-based estimating, before and after image generation, and an automated call answering service), satellite property measurement through MapMeasure, and inventory management across trucks and warehouses. If you want all of that built into one platform and you are scaling a larger crew, QuoteIQ is a legitimate choice.',
  },
  {
    q: 'Does QuoteIQ mark up payments?',
    a: 'It depends which QuoteIQ page you read. Their payments marketing says they take no cut on top of Stripe, while their own Payments Terms of Service references a 1 percent convenience fee on card transactions. Because the two conflict, we would encourage you to confirm the current rate with QuoteIQ directly. Opervo is unambiguous: zero markup on payments, ever.',
  },
  {
    q: 'Is Opervo a good QuoteIQ alternative for a solo operator?',
    a: 'Yes. Opervo is built specifically for solo operators and small crews. You get scheduling, estimates, invoicing, AI photo estimating, route optimization, recurring e-signed service agreements, QuickBooks sync, and a public Folio page, all on a flat $24.99/mo plan that already includes a helper. QuoteIQ is broader and team-oriented, which can be more than a one or two person operation needs.',
  },
  {
    q: 'Can I switch from QuoteIQ to Opervo?',
    a: 'Yes. Export your client list as a CSV and import it into Opervo. Most operators are set up within an hour. Run your 14-day Opervo trial alongside QuoteIQ so you can move over without missing a beat.',
  },
]

export default function OpervoVsQuoteIQ() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Opervo',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Android, Web',
    description: 'Field service management software for solo operators and small crews. Scheduling, invoicing, estimates, client portal, route optimization, and a public portfolio page, starting at $24.99/mo with a helper included.',
    url: 'https://www.opervo.io',
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
    },
  }

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: '#F7F5F2', minHeight: '100vh', color: '#1a1a1a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />

      <SiteNav />

      {/* HERO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#F5620F', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(245,98,15,0.08)', padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
          Comparison
        </span>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 16 }}>
          Opervo vs QuoteIQ
        </h1>
        <p style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 12px' }}>
          Opervo and QuoteIQ are both built for home service trades like window cleaning, pressure washing, landscaping, and auto detailing. The biggest difference is what happens to your bill when you add a second set of hands.
        </p>
        <p style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>
          <span style={{ color: '#F5620F' }}>$24.99/mo</span> with a helper included, vs $74.99/mo for two users on QuoteIQ
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #F5620F', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#F5620F', textTransform: 'uppercase', fontSize: 12, background: 'rgba(245,98,15,0.06)' }}>Opervo</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #E8E4DE', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', fontSize: 12 }}>QuoteIQ</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F5F2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.opervo.startsWith('✓') ? '#F5620F' : '#0F0F0F', background: 'rgba(245,98,15,0.06)' }}>{row.opervo}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: row.quoteiq === '✗' ? '#ccc' : '#6B6B6B' }}>{row.quoteiq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 16, lineHeight: 1.5 }}>
          QuoteIQ pricing reflects its published plan tiers (Essentials, Beginner, Pro) at the time of writing. QuoteIQ updates pricing periodically, so check myquoteiq.com for current rates.
        </p>
      </section>

      {/* WHY PEOPLE SWITCH */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            Why Solo Operators Choose Opervo
          </h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {switchReasons.map((r) => (
              <div key={r.title} style={{ borderLeft: '3px solid #F5620F', paddingLeft: 20 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.55 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHEN QUOTEIQ MIGHT BE BETTER */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
          When QuoteIQ Might Be Better
        </h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          QuoteIQ is a capable, actively developed platform, and there are real reasons to pick it. It bundles a deep set of AI tools (photo-based estimating, before and after image generation, and an automated call answering service), satellite property measurement through MapMeasure, and inventory management across trucks and warehouses. If you want all of that in one platform and you are scaling a larger crew, QuoteIQ is a legitimate choice. Opervo is the better fit when you are a solo operator or small crew who wants a focused, mobile-first tool with flat pricing and zero payment markup.
        </p>
        <div style={{ marginTop: 24 }}>
          <TradesMention />
        </div>
      </section>

      {/* THE KILLER DIFFERENTIATOR, folio */}
      <section style={{ background: '#fff', borderTop: '1px solid #E8E4DE', borderBottom: '1px solid #E8E4DE', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '-0.5px' }}>
            Every job you finish becomes marketing
          </h2>
          <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            Every Opervo operator gets a public Folio page at <strong style={{ color: '#0F0F0F' }}>opervo.io/p/your-slug</strong>. Finished jobs auto-publish with before and after photos, your services, reviews, and a built-in quote form. New leads find you on Google and request a quote without you ever picking up the phone.
          </p>
          <img src="/screenshots/hero-folio-2.jpg" alt="Opervo Folio page with before and after slider and customer reviews, the public portfolio every operator gets included with the $24.99/mo plan" loading="lazy" decoding="async" style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, border: '1px solid #E8E4DE' }} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 72px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#0F0F0F', textTransform: 'uppercase', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ borderBottom: '1px solid #E8E4DE', padding: '24px 0' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#0F0F0F', marginBottom: 10 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>{f.a}</p>
          </div>
        ))}
      </section>

      <MoreComparisons exclude="/compare/opervo-vs-quoteiq" />

      {/* CTA BAND */}
      <section style={{ background: '#0F0F0F', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7F5F2', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Try the flat-priced QuoteIQ alternative
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 28 }}>Start free for 14 days, no credit card. $24.99/mo after, helper included.</p>
        <a href="https://app.opervo.io" style={{ display: 'inline-block', background: '#F5620F', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Start Free Trial
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
