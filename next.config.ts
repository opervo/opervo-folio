import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // Files under public/ are served by Vercel with
  // `public, max-age=0, must-revalidate` by default, which makes the browser
  // revalidate every font on every navigation. Google Fonts served these with
  // a one-year cache, so self-hosting without this header is a regression for
  // repeat visits, not an improvement.
  //
  // Safe to mark immutable because these files are only ever added or removed,
  // never edited in place. Changing a face means shipping a new filename.
  async headers() {
    return [
      {
        source: '/fonts/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/about', destination: '/founder', permanent: true },
      // Only /es is translated; it renders public/index-es.html. Every deeper
      // /es route served the English page body with a Spanish nav and footer,
      // which is duplicate English content on a Spanish URL, and each one
      // canonicalised to its English twin. Redirect them to that twin instead
      // so the duplicate URLs stop existing rather than sending a canonical
      // and a noindex that contradict each other.
      //
      // ':path+' requires at least one segment, so /es itself never matches.
      // Drop this entry for any route once it is genuinely translated.
      { source: '/es/:path+', destination: '/:path+', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
