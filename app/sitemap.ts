import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

// Resolve a URL path to its source file so we can ask git when it last changed.
// Returns null if the source file doesn't exist (e.g. /blog/X without a slug page).
function pathToFile(urlPath: string): string | null {
  const root = process.cwd()
  if (urlPath === '/') return existsSync(join(root, 'public/index.html')) ? 'public/index.html' : null
  const candidate = `app${urlPath}/page.tsx`
  return existsSync(join(root, candidate)) ? candidate : null
}

// Last commit date for a file, or build time if git is unavailable (e.g.
// shallow clone with no history for the file). Vercel does ship git history
// in builds; the fallback is just defensive.
const buildTime = new Date()
function lastModified(urlPath: string): Date {
  const file = pathToFile(urlPath)
  if (!file) return buildTime
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return iso ? new Date(iso) : buildTime
  } catch {
    return buildTime
  }
}

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const entries: Entry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/solar-panel-cleaning', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/window-cleaning', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pressure-washing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/landscaping', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/auto-detailing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/compare/opervo-vs-jobber', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/compare/opervo-vs-housecall-pro', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/compare/opervo-vs-gorilladesk', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/compare/opervo-vs-markate', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/compare/servicewizard', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/features', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/profit-calculator', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/multi-job-tracker', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cost-calculator', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/print', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/guide', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/founder', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/switch', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/support', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/embed-guide', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/tos', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/blog/field-service-software-pricing-guide', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-start-solar-panel-cleaning-business', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/free-estimate-template-home-service-business', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/cheapest-field-service-management-software', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-look-professional-solo-contractor', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/best-crm-for-solo-contractors', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-run-service-business-from-phone', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-schedule-recurring-jobs', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/best-apps-for-window-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/jobber-vs-housecall-pro-vs-opervo', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/do-small-contractors-need-crm', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-send-invoices-in-the-field', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/best-software-for-pressure-washing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/how-to-grow-small-service-business', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/best-software-for-landscaping-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-solar-panel-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-window-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-pressure-washing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-landscaping-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-gutter-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-roof-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-house-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-commercial-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-pool-service-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-handyman-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-junk-removal-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-mobile-detailing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-hvac-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-plumbing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-electrical-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-pest-control-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-irrigation-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-holiday-lighting-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-fence-and-deck-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-concrete-sealing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-soft-washing-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-trash-bin-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog/crm-for-rv-and-boat-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.opervo.io'
  return entries.map((e) => ({
    url: `${baseUrl}${e.path === '/' ? '' : e.path}`,
    lastModified: lastModified(e.path),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }))
}
