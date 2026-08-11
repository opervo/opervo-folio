import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'
import { entries, SITE } from './site-entries'

// Resolve a URL path to its source file so we can ask git when it last changed.
// Returns null if the source file doesn't exist (e.g. /blog/X without a slug page).
function pathToFile(urlPath: string): string | null {
  const root = process.cwd()
  if (urlPath === '/') return existsSync(join(root, 'public/index.html')) ? 'public/index.html' : null
  // Pages live under app/[locale]/... — the [locale] segment is a literal
  // directory name. Resolving to app${urlPath} (without it) always missed,
  // so every URL fell back to build time and the git freshness signal died.
  const candidate = `app/[locale]${urlPath}/page.tsx`
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


export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((e) => ({
    url: `${SITE}${e.path === '/' ? '' : e.path}`,
    lastModified: lastModified(e.path),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }))
}
