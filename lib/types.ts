export interface OperatorProfile {
  id: string
  slug: string
  business_name: string
  tagline: string | null
  location: string | null
  phone: string | null
  hero_photo_url: string | null
  gallery_photos: string[]           // array of storage URLs
  services: Service[]
  stats: Stats
  review: Review | null
  trades: Trade[]                    // ['windows','solar','pressure']
  accepting_clients: boolean
  google_rating: number | null
  google_review_count: number | null
  google_review_link: string | null
  brand_color: string | null         // hex, defaults to #0b6e62
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  price_from: number | null
  fixed_price?: boolean
  price_display?: string
  estimated_minutes?: number
  bookable?: boolean
}

export interface Stats {
  jobs_done: string        // e.g. "500+"
  rating: string           // e.g. "5.0★"
  response_time: string    // e.g. "Same Day"
}

export interface Review {
  text: string
  reviewer_name: string
  reviewer_initial: string
  date: string
  service_tag: string
  source: 'google' | 'manual'
}

export type Trade = 'windows' | 'solar' | 'pressure'

export interface LeadInsert {
  operator_id: string
  portfolio_slug: string
  service: string | null
  property_type: string | null
  name: string | null
  phone: string | null
  address: string | null
  preferred_dates: string | null
  notes: string | null
  photo_url: string | null
  status: 'new'
  preferred_date?: string | null
  preferred_window?: string | null
  request_type?: string
  service_price?: number | null
  estimated_duration?: number | null
}
