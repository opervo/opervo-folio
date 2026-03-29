-- Run this in Supabase SQL Editor (project: sbnykmxckfwkkxvhrkot)

create table if not exists print_orders (
  id                  uuid primary key default gen_random_uuid(),
  stripe_session_id   text unique not null,
  stripe_payment_intent text,
  status              text not null default 'paid',
  -- status flow: paid → proof_sent → approved | changes_requested → ordered → shipped

  product_title       text,
  qty                 integer,
  price_paid          numeric(10,2),
  color_theme         text,

  business_name       text,
  owner_name          text,
  trade               text,
  phone               text,
  email               text,
  website             text,
  notes               text,

  approval_token      text unique default encode(gen_random_bytes(32), 'hex'),
  approved_at         timestamptz,
  changes_requested   text,
  designer_notes      text,

  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Auto-update updated_at on any change
create or replace function update_print_orders_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger print_orders_updated_at
  before update on print_orders
  for each row execute function update_print_orders_updated_at();

-- No RLS needed — only accessed via service role key from server-side API routes
