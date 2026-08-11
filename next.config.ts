import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
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
