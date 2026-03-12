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
  const profile = slug === 'demo' ? DEMO_PROFILE : await getOperatorBySlug(slug)
  if (!profile) notFound()

  return <FolioPage profile={profile} />
}
