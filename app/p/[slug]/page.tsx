import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOperatorBySlug, DEMO_PROFILE } from '@/lib/data'
import FolioPage from '@/components/FolioPage'

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
  }

  return <FolioPage profile={profile} />
}
