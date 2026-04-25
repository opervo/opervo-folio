import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOperatorBySlug, DEMO_PROFILE } from '@/lib/data'
import { resolveFolioFontTheme } from '@/lib/folioThemes'
import { getSupabaseServer } from '@/lib/supabase-server'
import FolioPage from '@/components/FolioPage'
import FolioViewPing from '@/components/FolioViewPing'
import type { RecentJob } from '@/lib/types'

const JOB_PHOTOS_BUCKET = 'job-photos'
// Signed URL TTL — long enough that ISR-cached pages keep working through
// the next revalidation, short enough that leaked URLs don't outlive the
// operator's intent. Page revalidates every 60s (export const revalidate),
// so an hour gives plenty of headroom.
const SIGNED_URL_TTL_SECONDS = 60 * 60

/**
 * job-photos is a private bucket — turn each storage path into a short-lived
 * signed URL so the public folio can render the image without exposing the
 * whole bucket. Skips entries that already look like full URLs (DEMO_PROFILE)
 * or that fail to sign.
 */
async function signRecentJobPhotos(jobs: RecentJob[]): Promise<RecentJob[]> {
  if (!jobs?.length) return jobs ?? []
  // Demo data already uses full https URLs, no signing needed.
  if (jobs.every((j) => /^https?:\/\//i.test(j.photo_url))) return jobs

  try {
    const supa = getSupabaseServer()
    const paths = jobs.map((j) => j.photo_url.replace(/^\/+/, ''))
    const { data, error } = await supa.storage
      .from(JOB_PHOTOS_BUCKET)
      .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS)
    if (error || !data) return jobs

    return jobs.map((j, i) => {
      const signed = data[i]?.signedUrl
      return signed ? { ...j, photo_url: signed } : j
    })
  } catch {
    return jobs
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

// ISR — revalidate every 60 seconds
// When operator updates their profile, the page rebuilds in background
export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const profile = slug === 'demo' ? DEMO_PROFILE : await getOperatorBySlug(slug)
  if (!profile) return { title: 'Not Found' }

  return {
    title: `${profile.business_name} — ${profile.location ?? 'Field Services'}`,
    description: profile.tagline ?? `${profile.business_name} — professional exterior cleaning services. Get a free quote today.`,
    openGraph: {
      title: profile.business_name,
      description: profile.tagline ?? '',
      images: profile.hero_photo_url ? [profile.hero_photo_url] : [],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const raw = slug === 'demo' ? DEMO_PROFILE : await getOperatorBySlug(slug)
  if (!raw) notFound()

  // ── Sanitize user-controlled fields ────────────────────
  const safeBrandColor = /^#[0-9a-fA-F]{6}$/.test(raw!.brand_color ?? '')
    ? raw!.brand_color!
    : '#0b6e62'

  const rawLink = raw!.google_review_link ?? null
  const safeReviewLink = rawLink && /^https?:\/\//i.test(rawLink) ? rawLink : null

  const safeHero = raw!.hero_photo_url && /^https?:\/\//i.test(raw!.hero_photo_url)
    ? raw!.hero_photo_url
    : null

  const safeGallery = (raw!.gallery_photos?.length ? raw!.gallery_photos : [])
    .filter((url: string) => /^https?:\/\//i.test(url))

  // Merge with safe defaults so FolioPage never crashes on null fields
  const profile = {
    ...raw!,
    hero_photo_url: safeHero,
    gallery_photos: safeGallery,
    services:       raw!.services?.length       ? raw!.services       : [],
    stats:          raw!.stats ?? {
      jobs_done:     raw!.jobs_done ? `${raw!.jobs_done}+` : '—',
      rating:        raw!.google_rating ? `${raw!.google_rating}★` : '5.0★',
      response_time: 'Same Day',
    },
    review:         raw!.review ?? null,
    trades:         raw!.trades?.length         ? raw!.trades         : [],
    brand_color:    safeBrandColor,
    google_review_link: safeReviewLink,
    folio_font_theme: resolveFolioFontTheme(raw!.folio_font_theme),
    recent_jobs: await signRecentJobPhotos(
      Array.isArray(raw!.recent_jobs) ? (raw!.recent_jobs as RecentJob[]) : [],
    ),
    recent_jobs_meta: raw!.recent_jobs_meta ?? null,
  }

  return (
    <>
      <FolioPage profile={profile} />
      {slug !== 'demo' && raw!.id && (
        <FolioViewPing operatorUserId={raw!.id} slug={slug} />
      )}
    </>
  )
}
