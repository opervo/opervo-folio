import { entries, SECTION_ORDER, SITE } from '../site-entries'

/**
 * /llms.txt, generated from the same entry list that builds the sitemap.
 *
 * It used to be a hand-maintained file in public/, and it drifted: 33 URLs
 * against the sitemap's 72, missing every trade CRM guide, and stating a
 * tagline that had been retired. Generating it means a page cannot be added to
 * the sitemap and forgotten here.
 *
 * Statically rendered at build time, so it costs nothing to serve.
 */
export const dynamic = 'force-static'

const SUMMARY = [
  'Opervo is mobile-first field service management software for solo trade operators and small crews',
  'in home service trades (window cleaning, pressure washing, landscaping, solar panel cleaning, auto',
  'detailing, and more). Plans are flat: Solo $24.99/mo (operator plus one helper) and Team $54.99/mo',
  '(up to 10 members). Every feature is on every plan, there are no per-user fees, and Opervo takes',
  'zero markup on client payments (money goes directly from the customer to the operator). Built by a',
  'former field operator in Austin, Texas. Tagline: "Stop looking like a side hustle."',
].join(' ')

function render(): string {
  const lines: string[] = ['# Opervo', '', `> ${SUMMARY}`, '']

  for (const section of SECTION_ORDER) {
    const inSection = entries.filter((e) => e.section === section && e.label)
    if (inSection.length === 0) continue

    lines.push(`## ${section}`)
    for (const e of inSection) {
      const url = `${SITE}${e.path === '/' ? '' : e.path}`
      lines.push(`- [${e.label}](${url})${e.blurb ? `: ${e.blurb}` : ''}`)
    }
    lines.push('')
  }

  // Not a page on this site, so it has no sitemap entry, but a model asking
  // "where do I sign in" should still find it.
  lines.push('## App', `- [Opervo web and mobile app](https://app.opervo.io)`, '')

  return lines.join('\n')
}

export function GET() {
  return new Response(render(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
