import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Embed Quote Form on Your Website — Opervo',
  description: 'Add an Opervo quote request form to any website with one line of code. Works on WordPress, Squarespace, Wix, and custom sites.',
  alternates: { canonical: 'https://opervo.io/embed-guide' },
  openGraph: {
    title: 'Embed Quote Form on Your Website — Opervo',
    description: 'Add an Opervo quote request form to any website with one line of code.',
    url: 'https://opervo.io/embed-guide',
    type: 'website',
  },
}

export default function EmbedGuidePage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#F7F5F2', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 60px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5620F', marginBottom: 12 }}>
            SETUP GUIDE
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)', textTransform: 'uppercase', color: '#0F0F0F', lineHeight: 1.1, marginBottom: 16 }}>
            ADD A QUOTE FORM<br />TO YOUR WEBSITE
          </h1>
          <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            One line of code. Leads go straight to your Opervo dashboard with a push notification. Works on any website.
          </p>
        </section>

        {/* Steps */}
        <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Step 1 */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5620F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>1</div>
              <div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 6 }}>COPY YOUR CODE SNIPPET</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 12 }}>
                  Open the Opervo app, go to <strong style={{ color: '#0F0F0F' }}>Settings &gt; Business</strong>, and scroll to <strong style={{ color: '#0F0F0F' }}>Website Quote Form</strong>. Tap the copy button — the snippet is already personalized with your account ID.
                </p>
                <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '16px 20px', overflow: 'auto' }}>
                  <code style={{ fontSize: 13, color: '#F7F5F2', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {`<script src="https://app.opervo.io/embed/quote-form.js"\n  data-operator="YOUR-ID"\n  data-slug="your-business-slug"></script>`}
                  </code>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5620F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>2</div>
              <div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 6 }}>PASTE IT INTO YOUR WEBSITE</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 16 }}>
                  Add the code to the page where you want the quote form to appear — usually a "Get a Quote" or "Contact" page. Here's how for the most common platforms:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { platform: 'WordPress', steps: 'Edit your page, click the + button to add a block, search for "Custom HTML", paste the code snippet, and publish.' },
                    { platform: 'Squarespace', steps: 'Edit your page, click an insert point, add a "Code" block, paste the code snippet, and save.' },
                    { platform: 'Wix', steps: 'Open the Wix Editor, click "Add Elements" > "Embed Code" > "Embed HTML", paste the code snippet, and publish.' },
                    { platform: 'Custom / HTML Site', steps: 'Open the HTML file in a code editor, paste the snippet where you want the form, and upload the file.' },
                  ].map(({ platform, steps }) => (
                    <div key={platform} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '14px 16px' }}>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F0F0F', marginBottom: 4, textTransform: 'uppercase' }}>{platform}</p>
                      <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{steps}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5620F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>3</div>
              <div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 6 }}>DONE — START GETTING LEADS</h3>
                <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6 }}>
                  The form automatically pulls in your services from Opervo and shows your business name. When a customer fills it out:
                </p>
                <ul style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.8, marginTop: 8, paddingLeft: 20 }}>
                  <li>You get a <strong style={{ color: '#0F0F0F' }}>push notification</strong> instantly</li>
                  <li>The lead appears in your <strong style={{ color: '#0F0F0F' }}>Opervo dashboard</strong></li>
                  <li>Customer info, service, address, and notes are all captured</li>
                  <li>You can convert it to a job or estimate with one tap</li>
                </ul>
              </div>
            </div>
          </div>

          {/* No Code Alternative */}
          <div style={{ marginTop: 48, background: 'rgba(245,98,15,0.06)', border: '1px solid rgba(245,98,15,0.15)', borderRadius: 16, padding: '24px 28px' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 8 }}>
              NO CODE? NO PROBLEM.
            </h3>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 12 }}>
              If your website builder doesn't support custom code, you can link to your Opervo portfolio page instead. Add a "Get a Quote" button on your website that links to:
            </p>
            <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '12px 16px' }}>
              <code style={{ fontSize: 14, color: '#F5620F', fontWeight: 600 }}>
                opervo.io/p/your-business-slug
              </code>
            </div>
            <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5, marginTop: 10 }}>
              Your slug is your business name on your Opervo portfolio page. Find it in <strong style={{ color: '#0F0F0F' }}>Settings &gt; Business</strong>.
            </p>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#0F0F0F', marginBottom: 20 }}>
              COMMON QUESTIONS
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { q: 'Does the form match my website\'s design?', a: 'The form uses clean Opervo branding with a white/off-white background and orange accents. It works well on most sites. It displays in an isolated frame so it won\'t conflict with your site\'s styles.' },
                { q: 'Can customers upload photos?', a: 'The embedded form currently captures name, phone, email, address, service selection, and notes. For photo uploads, link to your full Opervo portfolio page instead.' },
                { q: 'Is there a limit on submissions?', a: 'The form is rate-limited to 5 submissions per hour per visitor to prevent spam. There\'s no monthly cap on legitimate leads.' },
                { q: 'Will I get notified instantly?', a: 'Yes — you get a push notification on your phone the moment someone submits a quote request, plus it appears in your Leads section in the app.' },
                { q: 'Does it work on mobile?', a: 'Yes. The form is fully responsive and works on all screen sizes.' },
                { q: 'Can my web developer customize it?', a: 'The form container can be styled with CSS on your site (width, margins, etc.). The form content itself uses standard Opervo branding for a consistent professional look.' },
              ].map(({ q, a }) => (
                <div key={q} style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 12, padding: '16px 20px' }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F0F0F', marginBottom: 6, textTransform: 'uppercase' }}>{q}</p>
                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <Link
              href="https://app.opervo.io"
              style={{ display: 'inline-block', padding: '14px 32px', background: '#F5620F', color: '#fff', borderRadius: 12, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.04em', textDecoration: 'none' }}
            >
              Open Opervo App
            </Link>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginTop: 10 }}>
              Go to Settings &gt; Business to grab your embed code.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
