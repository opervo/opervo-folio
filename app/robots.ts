import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/p/*/edit'],
      },
    ],
    sitemap: 'https://opervo.io/sitemap.xml',
  }
}
