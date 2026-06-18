import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import { setRequestLocale } from 'next-intl/server'

const SITE = 'https://www.opervo.io'

// The homepage body is assembled from public/index.html (or index-es.html) by
// the regex extraction below, which intentionally drops the file's <head>. So
// the file's <title>, description, canonical, and OG tags never reached the
// served page, and the homepage fell back to the generic root-layout metadata.
// generateMetadata pulls those values back out of the same source file so each
// locale keeps its own correct title/description, and adds the canonical +
// hreflang the homepage was missing entirely.
function readHomeMeta(locale: string) {
  const filename = locale === 'es' ? 'index-es.html' : 'index.html'
  const html = readFileSync(join(process.cwd(), 'public', filename), 'utf-8')
  const pick = (re: RegExp) => html.match(re)?.[1]?.trim()
  return {
    title: pick(/<title>([\s\S]*?)<\/title>/i),
    description: pick(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i),
    ogTitle: pick(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i),
    ogDescription: pick(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i),
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const meta = readHomeMeta(locale)
  const canonical = locale === 'es' ? `${SITE}/es` : SITE
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: SITE,
        es: `${SITE}/es`,
        'x-default': SITE,
      },
    },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      url: canonical,
      // Without this, the page openGraph overrides the layout's and drops the
      // image. With no og:image, scrapers auto-pick an image from the page
      // body, which was grabbing a dashboard screenshot. Pin the branded OG
      // card explicitly. metadataBase (layout) makes this absolute.
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      images: ['/og-image.png'],
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const filename = locale === 'es' ? 'index-es.html' : 'index.html'
  const html = readFileSync(join(process.cwd(), 'public', filename), 'utf-8')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  const styleMatch = html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)
  const scriptMatch = html.matchAll(/<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)
  const ldJsonMatch = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)

  const styles = [...styleMatch].map((m) => m[1]).join('\n')
  const scripts = [...scriptMatch].map((m) => m[1]).join('\n')
  const ldJsonBlocks = [...ldJsonMatch].map((m) => m[0]).join('\n')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: ldJsonBlocks }} />
      <div dangerouslySetInnerHTML={{ __html: bodyMatch?.[1] ?? '' }} />
      <script dangerouslySetInnerHTML={{ __html: scripts }} />
    </>
  )
}
