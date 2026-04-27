import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/founder', permanent: true },
    ]
  },
}

export default nextConfig
