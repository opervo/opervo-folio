import { readFileSync } from 'fs'
import { join } from 'path'
import { setRequestLocale } from 'next-intl/server'

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
