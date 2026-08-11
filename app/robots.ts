import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /admin and /preview already carry noindex, which is what actually
        // controls indexing. These stop the crawl entirely: 17 admin routes
        // and the client site mockups will never rank, so fetching them is
        // wasted budget.
        disallow: ['/api/', '/p/*/edit', '/admin', '/preview'],
      },
    ],
    sitemap: 'https://www.opervo.io/sitemap.xml',
  }
}
