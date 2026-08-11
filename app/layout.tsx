import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import ReferralAttribution from '@/components/ReferralAttribution'
import './fonts.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Opervo | Run Your Trade Business Like a Pro',
  description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio. Built mobile-first for solo trade operators.',
  metadataBase: new URL('https://www.opervo.io'),
  openGraph: {
    title: 'Opervo | Run Your Trade Business Like a Pro',
    description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio. Built mobile-first for solo trade operators.',
    url: 'https://www.opervo.io',
    siteName: 'Opervo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Opervo, The one app built for trade operators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opervo | Run Your Trade Business Like a Pro',
    description: 'Jobs, estimates, invoices, scheduling, client portal, and a public portfolio. Built mobile-first for solo trade operators.',
    images: ['/og-image.png'],
  },
  // Preserved from public/index.html, whose <head> is dropped when the homepage
  // body is assembled, so these were not reaching any served page. Site-wide
  // here covers every route, not just the homepage.
  itunes: { appId: '6763399255' },
  verification: { google: 'dqtkzyB8hQ_hB38N_' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts are self-hosted from /public/fonts via fonts.css. The two
            faces below are on essentially every page (body copy and the
            condensed headings), so preloading them lets the browser start
            fetching without waiting to parse CSS first. */}
        <link rel="preload" href="/fonts/Barlow-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/BarlowCondensed-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <ReferralAttribution />
        <Analytics />
        {/* PostHog, shared with app.opervo.io via the same project key so
            anonymous visitor → signup → in-app activity stitches into one
            person. cross_subdomain_cookie ensures the distinct_id survives
            the opervo.io → app.opervo.io hop. */}
        <Script id="posthog" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_qhDaPpj5W7su3GdfcvRU43vMsxiLxyCahEKgwiWgFV9S',{api_host:'https://us.i.posthog.com',autocapture:true,capture_pageview:true,capture_pageleave:true,cross_subdomain_cookie:true,persistence:'localStorage+cookie'});
          `}
        </Script>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1634207697801976');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1634207697801976&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
