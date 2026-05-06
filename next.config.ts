import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/founder', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
