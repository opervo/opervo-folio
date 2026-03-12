-- ─────────────────────────────────────────
-- OPERVO FOLIO — Supabase Schema
-- Run this in your Supabase SQL editor
-- ─────────────────────────────────────────

-- operator_profiles
-- One row per Opervo user. Linked to auth.users via id.
create table if not exists operator_profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  slug                text unique not null,           -- e.g. "solar-wash-atx"
  business_name       text not null,
  tagline             text,
  location            text,
  phone               text,
  hero_photo_url      text,
  gallery_photos      text[]    default '{}',         -- array of storage URLs
  services            jsonb     default '[]',         -- Service[]
  stats               jsonb     default '{"jobs_done":"0","rating":"5.0★","response_time":"Same Day"}',
  review              jsonb,                          -- Review | null
  trades              text[]    default '{}',         -- ['windows','solar','pressure']
  accepting_clients   boolean   default true,
  google_rating       numeric(3,1),
  google_review_count integer,
  brand_color         text      default '#0b6e62',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Row Level Security
alter table operator_profiles enable row level security;

-- Anyone can read profiles (public folio pages)
create policy "Public profiles are viewable by everyone"
  on operator_profiles for select
  using (true);

-- Operators can only update their own profile
create policy "Operators can update own profile"
  on operator_profiles for update
  using (auth.uid() = id);

create policy "Operators can insert own profile"
  on operator_profiles for insert
  with check (auth.uid() = id);

-- ─────────────────────────────────────────
-- leads
-- Quote requests submitted via public folio pages
-- ─────────────────────────────────────────
create table if not exists leads (
  id               uuid primary key default gen_random_uuid(),
  operator_id      uuid references operator_profiles(id) on delete cascade,
  portfolio_slug   text,
  service          text,
  property_type    text,
  name             text,
  phone            text,
  address          text,
  preferred_dates  text,
  notes            text,
  photo_url        text,
  status           text default 'new',   -- new | viewed | quoted | booked | lost
  created_at       timestamptz default now()
);

alter table leads enable row level security;

-- Anyone can insert a lead (public quote form)
create policy "Anyone can submit a lead"
  on leads for insert
  with check (true);

-- Operators can only read their own leads
create policy "Operators can read own leads"
  on leads for select
  using (auth.uid() = operator_id);

create policy "Operators can update own leads"
  on leads for update
  using (auth.uid() = operator_id);

-- ─────────────────────────────────────────
-- Storage buckets
-- ─────────────────────────────────────────

-- portfolio-photos: operator uploads (hero + gallery)
insert into storage.buckets (id, name, public)
  values ('portfolio-photos', 'portfolio-photos', true)
  on conflict do nothing;

-- lead-photos: photos attached to quote requests
insert into storage.buckets (id, name, public)
  values ('lead-photos', 'lead-photos', false)
  on conflict do nothing;

-- Public read on portfolio photos
create policy "Portfolio photos are public"
  on storage.objects for select
  using (bucket_id = 'portfolio-photos');

-- Authenticated operators can upload portfolio photos
create policy "Operators can upload portfolio photos"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-photos' and auth.role() = 'authenticated');

-- Anyone can upload lead photos (quote form attachment)
create policy "Anyone can upload lead photos"
  on storage.objects for insert
  with check (bucket_id = 'lead-photos');

-- Operators can read their own lead photos
create policy "Operators can read their lead photos"
  on storage.objects for select
  using (bucket_id = 'lead-photos' and auth.uid()::text = (storage.foldername(name))[1]);

-- ─────────────────────────────────────────
-- Auto-update updated_at
-- ─────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger operator_profiles_updated_at
  before update on operator_profiles
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────
-- Slug generation helper (optional)
-- Call from your app when creating a new operator
-- ─────────────────────────────────────────
create or replace function generate_slug(name text)
returns text as $$
begin
  return lower(regexp_replace(trim(name), '[^a-z0-9]+', '-', 'g'));
end;
$$ language plpgsql;
