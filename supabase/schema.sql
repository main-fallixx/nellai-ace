create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  mode text, pickup text not null, drop_off text not null,
  goods_type text, approx_load text,
  trip_date date not null, time_slot text not null,
  loading_helper boolean not null default false,
  return_trip boolean not null default false,
  notes text check (char_length(notes) <= 300),
  estimate_inr integer, source text default 'web',
  status text not null default 'new' check (status in ('new','called','confirmed','completed','cancelled'))
);
-- RLS ON with NO policies = anon/authenticated keys can read/write nothing.
-- Only the server-side service-role key (used by /api/enquiry) can insert.
alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
