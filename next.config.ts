import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/preview-weapon.html',
      },
    ]
  },
}

export default nextConfig
