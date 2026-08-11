import type { RelatedLink } from '@/components/BlogLayout'

/**
 * Topical links for the 23 trade CRM guides.
 *
 * Before this, every blog post fell back to the same three destinations, so 47
 * posts pushed all their internal link equity at /features, /pricing and
 * /print, and none at each other. The 23 CRM guides had one inbound link each,
 * from the blog index, and none of them linked to the trade landing page
 * covering the same trade.
 *
 * Each guide now links to its trade landing page where one exists, plus the
 * next two guides in its cluster. Rotating within a cluster means every guide
 * gains exactly two inbound sibling links rather than a few hubs taking them
 * all.
 */

/** CRM guide slug -> the trade landing page covering the same work. */
const TRADE_PAGE: Record<string, { href: string; title: string; desc: string }> = {
  'window-cleaning': { href: '/window-cleaning', title: 'Window Cleaning Software', desc: 'Recurring routes, agreements, before and after photos' },
  'pressure-washing': { href: '/pressure-washing', title: 'Pressure Washing Software', desc: 'Chem-cost tracking and fast estimates' },
  'solar-panel-cleaning': { href: '/solar-panel-cleaning', title: 'Solar Panel Cleaning Software', desc: 'Built for panel washing operators' },
  landscaping: { href: '/landscaping', title: 'Landscaping Software', desc: 'Recurring maintenance and route planning' },
  'gutter-cleaning': { href: '/gutter-cleaning', title: 'Gutter Cleaning Software', desc: 'Quotes, scheduling and repeat customers' },
  'roof-cleaning': { href: '/roof-cleaning', title: 'Roof Cleaning Software', desc: 'Soft wash jobs, photos and follow up' },
  'holiday-lighting': { href: '/holiday-lighting', title: 'Holiday Lighting Software', desc: 'Seasonal installs and repeat bookings' },
  'mobile-detailing': { href: '/auto-detailing', title: 'Auto Detailing Software', desc: 'Mobile detailing scheduling and billing' },
}

/** Clusters group guides by the kind of work, so siblings are actually relevant. */
const CLUSTERS: string[][] = [
  ['pressure-washing', 'soft-washing', 'roof-cleaning', 'concrete-sealing', 'fence-and-deck-cleaning'],
  ['window-cleaning', 'solar-panel-cleaning', 'gutter-cleaning'],
  ['house-cleaning', 'commercial-cleaning', 'trash-bin-cleaning'],
  ['hvac', 'plumbing', 'electrical', 'handyman'],
  ['landscaping', 'irrigation', 'holiday-lighting', 'pest-control'],
  ['pool-service', 'junk-removal', 'mobile-detailing', 'rv-and-boat-cleaning'],
]

const LABEL: Record<string, string> = {
  'pressure-washing': 'Pressure Washing', 'soft-washing': 'Soft Washing', 'roof-cleaning': 'Roof Cleaning',
  'concrete-sealing': 'Concrete Sealing', 'fence-and-deck-cleaning': 'Fence and Deck Cleaning',
  'window-cleaning': 'Window Cleaning', 'solar-panel-cleaning': 'Solar Panel Cleaning', 'gutter-cleaning': 'Gutter Cleaning',
  'house-cleaning': 'House Cleaning', 'commercial-cleaning': 'Commercial Cleaning', 'trash-bin-cleaning': 'Trash Bin Cleaning',
  hvac: 'HVAC', plumbing: 'Plumbing', electrical: 'Electrical', handyman: 'Handyman',
  landscaping: 'Landscaping', irrigation: 'Irrigation', 'holiday-lighting': 'Holiday Lighting', 'pest-control': 'Pest Control',
  'pool-service': 'Pool Service', 'junk-removal': 'Junk Removal', 'mobile-detailing': 'Mobile Detailing',
  'rv-and-boat-cleaning': 'RV and Boat Cleaning',
}

export function crmRelated(slug: string): RelatedLink[] {
  const out: RelatedLink[] = []

  const trade = TRADE_PAGE[slug]
  if (trade) out.push(trade)

  const cluster = CLUSTERS.find((c) => c.includes(slug))
  if (cluster) {
    const i = cluster.indexOf(slug)
    for (let n = 1; n <= 2 && n < cluster.length; n++) {
      const sib = cluster[(i + n) % cluster.length]
      out.push({
        title: `CRM for ${LABEL[sib]}`,
        desc: `The same problem in ${LABEL[sib].toLowerCase()}`,
        href: `/blog/crm-for-${sib}-businesses`,
      })
    }
  }

  // Guides with no trade landing page still need a route into the product.
  if (!trade) out.push({ title: 'Pricing', desc: 'Every feature on every plan, $24.99/mo', href: '/pricing' })

  return out
}
