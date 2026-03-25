import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://opervo.io'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/solar-panel-cleaning`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/window-cleaning`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/pressure-washing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/landscaping`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/compare/opervo-vs-jobber`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/compare/opervo-vs-housecall-pro`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/compare/opervo-vs-gorilladesk`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog/field-service-software-pricing-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/how-to-start-solar-panel-cleaning-business`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/free-estimate-template-home-service-business`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/cheapest-field-service-management-software`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/how-to-look-professional-solo-contractor`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  return staticPages
}
