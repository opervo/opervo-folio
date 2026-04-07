-- Admin Command Center tasks table
-- Run in Supabase SQL Editor on project sbnykmxckfwkkxvhrkot
-- Service role key only — no public RLS access. The /api/admin/tasks route
-- uses the service role key on the Vercel server.

create table if not exists public.admin_tasks (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  priority text not null check (priority in ('high', 'med', 'low')),
  category text not null check (category in ('week', 'v2', 'other')),
  done boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: Lock the table down. Only service role can read/write.
alter table public.admin_tasks enable row level security;

-- No policies = no access for anon/authenticated. Service role bypasses RLS.

create index if not exists admin_tasks_priority_created_idx
  on public.admin_tasks (priority, created_at);

-- Trigger to auto-update updated_at
create or replace function public.touch_admin_tasks_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists admin_tasks_touch_updated_at on public.admin_tasks;
create trigger admin_tasks_touch_updated_at
  before update on public.admin_tasks
  for each row execute function public.touch_admin_tasks_updated_at();

-- Seed with the existing static tasks from page.tsx
insert into public.admin_tasks (text, priority, category) values
  ('Follow up Google OAuth verification email', 'high', 'week'),
  ('Test invoice Resend email end to end', 'high', 'week'),
  ('Investigate invoice email bug (Dustin)', 'high', 'week'),
  ('Film first 3 TikTok videos', 'med', 'week'),
  ('Wire Beehiiv waitlist to landing page', 'med', 'week'),
  ('Upload orange PWA icons (#F5620F)', 'med', 'week'),
  ('Delete test data from Supabase', 'low', 'week'),
  ('Regenerate GitHub token (30-day)', 'low', 'week'),
  ('D2D canvassing map — begin Lovable build', 'high', 'v2'),
  ('Onboarding wow flow — folio reveal screen', 'high', 'v2'),
  ('AI invoice/job creation (Claude API)', 'med', 'v2'),
  ('Gelato print-on-demand integration spec', 'med', 'v2'),
  ('SEO Tier 1 landing pages (8 pages)', 'med', 'v2'),
  ('Affiliate program structure + launch', 'low', 'v2'),
  ('Annual plan pricing lever', 'low', 'v2'),
  ('Recurring jobs feature', 'low', 'v2');
