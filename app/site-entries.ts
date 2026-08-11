import type { MetadataRoute } from 'next'

/**
 * Single source of truth for every indexable URL on the marketing site.
 *
 * Both app/sitemap.ts and app/llms.txt/route.ts read this, so the two cannot
 * drift apart. They already had: llms.txt listed 33 URLs against the sitemap's
 * 72, and stated a tagline that had been retired months earlier.
 *
 * Adding a page here puts it in the sitemap. Give it a section and a label and
 * it also appears in llms.txt.
 */
export type SiteEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  /** llms.txt grouping. Omit to keep a page out of llms.txt entirely. */
  section?: string
  /** Link text in llms.txt. */
  label?: string
  /** Optional trailing description in llms.txt. */
  blurb?: string
}

export const SITE = 'https://www.opervo.io'

export const SECTION_ORDER = [
  'Product',
  'Trades',
  'Comparisons',
  'Free tools',
  'Guides',
  'Trade CRM guides',
  'Support',
  'Legal',
] as const

export const entries: SiteEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/solar-panel-cleaning', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Solar panel cleaning software" },
  { path: '/window-cleaning', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Window cleaning software" },
  { path: '/pressure-washing', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Pressure washing software" },
  { path: '/landscaping', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Landscaping software" },
  { path: '/auto-detailing', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Auto detailing software" },
  { path: '/gutter-cleaning', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Gutter cleaning software" },
  { path: '/roof-cleaning', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Roof cleaning and soft wash software" },
  { path: '/holiday-lighting', changeFrequency: 'monthly', priority: 0.8, section: 'Trades', label: "Holiday and Christmas light installation software" },
  { path: '/compare/opervo-vs-jobber', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs Jobber", blurb: "flat pricing vs per-user pricing, side by side." },
  { path: '/compare/opervo-vs-housecall-pro', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs Housecall Pro" },
  { path: '/compare/opervo-vs-gorilladesk', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs GorillaDesk" },
  { path: '/compare/opervo-vs-markate', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs Markate" },
  { path: '/compare/servicewizard', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs ServiceWizard", blurb: "field service comparison" },
  { path: '/compare/opervo-vs-quoteiq', changeFrequency: 'monthly', priority: 0.7, section: 'Comparisons', label: "Opervo vs QuoteIQ", blurb: "flat pricing with a helper included vs QuoteIQ's per-user-bucket tiers." },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9, section: 'Product', label: "Pricing", blurb: "Solo $24.99/mo and Team $54.99/mo, annual and lifetime options, full pricing FAQ. Every feature on every plan, no per-user fees, no payment markup." },
  { path: '/features', changeFrequency: 'monthly', priority: 0.9, section: 'Product', label: "Features", blurb: "jobs, estimates, branded invoices, scheduling, client portal, recurring service plans, and a public Folio page that auto-publishes finished work." },
  { path: '/profit-calculator', changeFrequency: 'monthly', priority: 0.8, section: 'Free tools', label: "Profit calculator", blurb: "model job profitability." },
  { path: '/multi-job-tracker', changeFrequency: 'monthly', priority: 0.8, section: 'Free tools', label: "Multi-job tracker", blurb: "track multiple jobs in a day." },
  { path: '/cost-calculator', changeFrequency: 'monthly', priority: 0.85, section: 'Free tools', label: "Cost calculator", blurb: "estimate what field service software actually costs you." },
  { path: '/print', changeFrequency: 'monthly', priority: 0.6, section: 'Product', label: "Marketing Materials" },
  { path: '/guide', changeFrequency: 'monthly', priority: 0.5, section: 'Product', label: "Opervo User Guide", blurb: "complete walkthrough for new users" },
  { path: '/founder', changeFrequency: 'monthly', priority: 0.7, section: 'Product', label: "Founder story", blurb: "why and who built Opervo, built by someone who was on the truck." },
  { path: '/sites', changeFrequency: 'monthly', priority: 0.8, section: 'Product', label: "Pro Websites for Home Service Pros" },
  { path: '/lifetime', changeFrequency: 'monthly', priority: 0.7, section: 'Product', label: "Opervo Lifetime Pass", blurb: "pay once, own it forever" },
  { path: '/apprentice', changeFrequency: 'monthly', priority: 0.6, section: 'Product', label: "Opervo Apprentice", blurb: "free software for teen operators" },
  { path: '/switch', changeFrequency: 'monthly', priority: 0.8, section: 'Product', label: "Switch and save", blurb: "discount for operators moving from another platform." },
  { path: '/demo', changeFrequency: 'monthly', priority: 0.85, section: 'Product', label: "Book a demo", blurb: "free 15-minute founder demo." },
  { path: '/support', changeFrequency: 'monthly', priority: 0.5, section: 'Support', label: "Support", blurb: "help@opervo.io" },
  { path: '/embed-guide', changeFrequency: 'monthly', priority: 0.5, section: 'Product', label: "Embed Quote Form on Your Website" },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3, section: 'Legal', label: "Privacy Policy" },
  { path: '/tos', changeFrequency: 'yearly', priority: 0.3, section: 'Legal', label: "Terms of Service" },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7, section: 'Guides', label: "Blog index", blurb: "guides for solo trade operators, including CRM guides for 25 plus trades." },
  { path: '/blog/field-service-software-pricing-guide', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Field service software pricing guide" },
  { path: '/blog/how-to-start-solar-panel-cleaning-business', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to Start a Solar Panel Cleaning Business in 2026 (Step-by-Step)" },
  { path: '/blog/free-estimate-template-home-service-business', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Free Estimate Template for Home Service Businesses" },
  { path: '/blog/cheapest-field-service-management-software', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Cheapest field service management software" },
  { path: '/blog/how-to-look-professional-solo-contractor', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to look professional as a solo contractor" },
  { path: '/blog/best-crm-for-solo-contractors', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Best CRM for solo contractors" },
  { path: '/blog/how-to-run-service-business-from-phone', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to Run a Service Business Entirely From Your Phone (2026 Guide)" },
  { path: '/blog/how-to-schedule-recurring-jobs', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to schedule recurring jobs" },
  { path: '/blog/best-apps-for-window-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Best apps for window cleaning businesses" },
  { path: '/blog/jobber-vs-housecall-pro-vs-opervo', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Jobber vs Housecall Pro vs Opervo" },
  { path: '/blog/jobber-alternative-for-solo-operators', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Best Jobber alternative for solo operators", blurb: "the real per-user price math and the best alternatives." },
  { path: '/blog/do-small-contractors-need-crm', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Do small contractors need a CRM" },
  { path: '/blog/how-to-send-invoices-in-the-field', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to send invoices in the field" },
  { path: '/blog/best-software-for-pressure-washing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Best Software for Pressure Washing Businesses (2026)", blurb: "5 apps ranked" },
  { path: '/blog/how-to-grow-small-service-business', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "How to Grow a Small Service Business (From Solo to Crew)" },
  { path: '/blog/best-software-for-landscaping-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Guides', label: "Best Software for Landscaping Businesses (2026)", blurb: "5 apps ranked" },
  { path: '/blog/crm-for-solar-panel-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Solar Panel Cleaning Businesses" },
  { path: '/blog/crm-for-window-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Window Cleaning Businesses" },
  { path: '/blog/crm-for-pressure-washing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Pressure Washing Businesses" },
  { path: '/blog/crm-for-landscaping-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Landscaping Businesses" },
  { path: '/blog/crm-for-gutter-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Gutter Cleaning Businesses" },
  { path: '/blog/crm-for-roof-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Roof Cleaning Businesses" },
  { path: '/blog/crm-for-house-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for House Cleaning Businesses" },
  { path: '/blog/crm-for-commercial-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Commercial Cleaning Businesses" },
  { path: '/blog/crm-for-pool-service-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Pool Service Businesses" },
  { path: '/blog/crm-for-handyman-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Handyman Businesses" },
  { path: '/blog/crm-for-junk-removal-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Junk Removal Businesses" },
  { path: '/blog/crm-for-mobile-detailing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Mobile Detailing Businesses" },
  { path: '/blog/crm-for-hvac-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for HVAC Businesses" },
  { path: '/blog/crm-for-plumbing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Plumbing Businesses" },
  { path: '/blog/crm-for-electrical-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Electrical Businesses" },
  { path: '/blog/crm-for-pest-control-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Pest Control Businesses" },
  { path: '/blog/crm-for-irrigation-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Irrigation Businesses" },
  { path: '/blog/crm-for-holiday-lighting-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Holiday Lighting Businesses" },
  { path: '/blog/crm-for-fence-and-deck-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Fence and Deck Cleaning Businesses" },
  { path: '/blog/crm-for-concrete-sealing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Concrete Sealing Businesses" },
  { path: '/blog/crm-for-soft-washing-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Soft Washing Businesses" },
  { path: '/blog/crm-for-trash-bin-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for Trash Bin Cleaning Businesses" },
  { path: '/blog/crm-for-rv-and-boat-cleaning-businesses', changeFrequency: 'monthly', priority: 0.6, section: 'Trade CRM guides', label: "CRM for RV and Boat Cleaning Businesses" },]
