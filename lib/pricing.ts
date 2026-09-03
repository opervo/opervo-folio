/**
 * Single source of truth for subscription pricing and the Offer schema built
 * from it.
 *
 * Every surface that states a price reads from here: the pricing cards a human
 * sees, and the structured data an answer engine reads on /pricing and
 * /features. A price change that updated one and not the other would leave the
 * site advertising a number Opervo does not charge, and it would fail silently.
 * The page renders, the schema validates, and only a customer notices.
 *
 * Lifetime Pass pricing deliberately lives on /lifetime. It is not sold on
 * /pricing or /features, so it is not in these offers.
 */

export const SOLO_MO = 24.99
export const TEAM_MO = 54.99
export const SOLO_YR = 249
export const TEAM_YR = 549

export const CURRENCY = 'USD'

/** Free trial length in days. Stated on the cards and in the pricing FAQ. */
export const TRIAL_DAYS = 14

export const SOLO_SAVINGS = (SOLO_MO * 12 - SOLO_YR).toFixed(0)
export const TEAM_SAVINGS = (TEAM_MO * 12 - TEAM_YR).toFixed(0)
export const SOLO_YR_EQUIV = (SOLO_YR / 12).toFixed(2)
export const TEAM_YR_EQUIV = (TEAM_YR / 12).toFixed(2)

/**
 * Entity ids defined in the JSON-LD graph in public/index.html. Referencing
 * these rather than redeclaring the entities is what keeps the site describing
 * one product instead of one product per page.
 */
export const SOFTWARE_ID = 'https://www.opervo.io/#software'
export const ORGANIZATION_ID = 'https://www.opervo.io/#organization'
export const WEBSITE_ID = 'https://www.opervo.io/#website'

/** Where a subscription is actually bought, regardless of which page links to it. */
export const PRICING_URL = 'https://www.opervo.io/pricing'

/**
 * `referenceQuantity` of 1 MON / 1 ANN is the load-bearing part.
 *
 * A bare `price: '24.99'` does not say per what, so a consumer cannot tell a
 * $24.99 monthly subscription from a $24.99 one-time purchase. That was the
 * state of the offers in the homepage graph and on /features.
 */
function offer(name: string, price: number, unitCode: 'MON' | 'ANN') {
  const amount = price.toFixed(2)
  return {
    '@type': 'Offer',
    name,
    price: amount,
    priceCurrency: CURRENCY,
    url: PRICING_URL,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: amount,
      priceCurrency: CURRENCY,
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode },
    },
  }
}

export const subscriptionOffers = [
  offer('Solo (Monthly)', SOLO_MO, 'MON'),
  offer('Solo (Annual)', SOLO_YR, 'ANN'),
  offer('Team (Monthly)', TEAM_MO, 'MON'),
  offer('Team (Annual)', TEAM_YR, 'ANN'),
]

export const aggregateOffer = {
  '@type': 'AggregateOffer',
  priceCurrency: CURRENCY,
  lowPrice: SOLO_MO.toFixed(2),
  highPrice: TEAM_YR.toFixed(2),
  offerCount: subscriptionOffers.length,
  offers: subscriptionOffers,
}

/**
 * The shared SoftwareApplication node.
 *
 * `url` is the product's canonical URL on every page that emits this, not the
 * emitting page's own URL. Two pages claiming the same @id with different urls
 * is a contradiction; a page describes itself with its own WebPage node instead.
 */
export const softwareApplicationNode = {
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: 'Opervo',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  url: 'https://www.opervo.io',
  publisher: { '@id': ORGANIZATION_ID },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Solo operators and small crews in home service trades',
  },
  offers: aggregateOffer,
}
