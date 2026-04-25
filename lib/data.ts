import { supabase } from './supabase'
import { OperatorProfile } from './types'

export async function getOperatorBySlug(slug: string): Promise<OperatorProfile | null> {
  const { data, error } = await supabase
    .rpc('get_operator_profile_by_slug', { p_slug: slug })

  if (error || !data) return null
  const profile = Array.isArray(data) ? data[0] : data
  if (!profile) return null
  return profile as OperatorProfile
}

export const DEMO_PROFILE: OperatorProfile = {
  id: 'demo',
  slug: 'demo',
  business_name: 'Solar Wash ATX',
  tagline: 'Window · Solar Panel · Pressure Washing',
  logo_url: null,
  location: 'Austin, Texas',
  service_areas: ['Austin, Texas', 'Round Rock', 'Cedar Park'],
  phone: '9565594918',
  hero_photo_url: 'https://sbnykmxckfwkkxvhrkot.supabase.co/storage/v1/object/public/portfolio-photos/ead402ba-267b-4802-b184-99ada754dc81.jpeg',
  gallery_photos: [
    'https://sbnykmxckfwkkxvhrkot.supabase.co/storage/v1/object/public/portfolio-photos/ead402ba-267b-4802-b184-99ada754dc81.jpeg',
    'https://sbnykmxckfwkkxvhrkot.supabase.co/storage/v1/object/public/portfolio-photos/62fa9863-fe3d-4723-a634-cbd1bd7ab0b0.png',
    'https://sbnykmxckfwkkxvhrkot.supabase.co/storage/v1/object/public/portfolio-photos/ead402ba-267b-4802-b184-99ada754dc81.jpeg',
  ],
  services: [
    { id: '1', name: 'Window Cleaning',      description: 'Interior & exterior · all heights · streak-free finish', icon: '🪟', price_from: 89  },
    { id: '2', name: 'Solar Panel Cleaning', description: 'Restore panel efficiency · remove dust & buildup',        icon: '☀️', price_from: 149 },
    { id: '3', name: 'Pressure Washing',     description: 'Driveways · patios · siding · fences',                   icon: '🚿', price_from: 129 },
  ],
  stats: { jobs_done: '500+', rating: '5.0★', response_time: 'Same Day' },
  review: {
    text: "Amazing work — showed up on time, left the place spotless. Best cleaning service I've used in Austin.",
    reviewer_name: 'Maximiliano B.',
    reviewer_initial: 'M',
    date: 'March 2026',
    service_tag: '🪟 Windows',
    source: 'google',
  },
  trades: ['windows', 'solar', 'pressure'],
  accepting_clients: true,
  jobs_done: 500,
  google_rating: 5.0,
  google_review_count: 24,
  google_review_link: null,
  brand_color: '#0b6e62',
  portfolio_display_count: 6,
  folio_font_theme: 'classic',
  recent_jobs: [
    { id: 'demo-1', service_type: 'Window Cleaning', city: 'Cedar Park',  completed_at: new Date(Date.now() - 2  * 86400000).toISOString(), photo_url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=480&q=70' },
    { id: 'demo-2', service_type: 'Solar Panels',    city: 'Round Rock',  completed_at: new Date(Date.now() - 5  * 86400000).toISOString(), photo_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=480&q=70' },
    { id: 'demo-3', service_type: 'Pressure Wash',   city: 'Austin',      completed_at: new Date(Date.now() - 7  * 86400000).toISOString(), photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=70' },
    { id: 'demo-4', service_type: 'Window Cleaning', city: 'Pflugerville',completed_at: new Date(Date.now() - 14 * 86400000).toISOString(), photo_url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=480&q=70' },
  ],
  recent_jobs_meta: {
    jobs_this_month: 14,
    last_completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
