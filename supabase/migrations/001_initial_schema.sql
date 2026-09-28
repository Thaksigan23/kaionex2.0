-- ============================================================
-- KAIONEX CMS — Migration 001: Initial Schema
-- ============================================================
-- Applies to: Supabase PostgreSQL
-- Purpose  : Establishes the complete CMS schema for the KAIONEX
--            marketing website backend.
--
-- This schema manages WEBSITE CONTENT about KAIONEX products.
-- It does NOT connect or integrate the POS, EMS, FMS, E-Commerce
-- or CRM application databases. Each KAIONEX product has its own
-- separate operational database.
--
-- Run with:
--   supabase db push
-- or manually in the Supabase SQL editor.
-- ============================================================

-- ── Extensions ────────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── Helper: updated_at trigger ────────────────────────────────────────────────

create or replace function cms_set_updated_at()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── 1. admin_profiles ─────────────────────────────────────────────────────────
--
-- Links to Supabase Auth users (auth.users). An admin user must have:
--   a) a valid Supabase Auth account (auth.users row)
--   b) an active row in this table
-- Unauthenticated users or auth users without an admin_profiles row
-- are denied all admin access.

create table if not exists admin_profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         text not null check (role in ('owner', 'admin', 'editor')),
  display_name text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger admin_profiles_updated_at
  before update on admin_profiles
  for each row execute function cms_set_updated_at();

comment on table admin_profiles is
  'KAIONEX Website CMS administrators. NOT for POS/EMS/FMS/E-Commerce/CRM app users.';
comment on column admin_profiles.role is
  'owner: full access; admin: manage all content; editor: publish/edit content';

-- ── 2. products ───────────────────────────────────────────────────────────────

create table if not exists products (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,        -- e.g. "pos", "ems"
  name         text not null,               -- e.g. "KAIONEX POS"
  short_name   text not null,               -- e.g. "POS"
  tagline      text,
  description  text,
  status       text not null default 'available'
               check (status in ('available', 'coming_soon')),
  sort_order   integer not null default 0,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger products_updated_at
  before update on products
  for each row execute function cms_set_updated_at();

comment on table products is
  'KAIONEX product family members. Each row is a separate software product.';

-- ── 3. product_features ───────────────────────────────────────────────────────

create table if not exists product_features (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid not null references products(id) on delete cascade,
  feature     text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists product_features_product_id_idx on product_features(product_id);

-- ── 4. product_media ──────────────────────────────────────────────────────────

create table if not exists product_media (
  id             uuid primary key default uuid_generate_v4(),
  product_id     uuid not null references products(id) on delete cascade,
  storage_path   text not null,    -- relative path inside "site-media" bucket
  alt_text       text,
  media_type     text not null default 'image/png',
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now()
);

create index if not exists product_media_product_id_idx on product_media(product_id);

-- ── 5. pricing_plans ──────────────────────────────────────────────────────────

create table if not exists pricing_plans (
  id           uuid primary key default uuid_generate_v4(),
  product_id   uuid not null references products(id) on delete cascade,
  name         text not null,
  tagline      text,
  price_label  text,               -- "Contact us", "LKR 5,000/mo", etc.
  is_featured  boolean not null default false,
  sort_order   integer not null default 0,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger pricing_plans_updated_at
  before update on pricing_plans
  for each row execute function cms_set_updated_at();

create index if not exists pricing_plans_product_id_idx on pricing_plans(product_id);

-- ── 6. pricing_features ───────────────────────────────────────────────────────

create table if not exists pricing_features (
  id          uuid primary key default uuid_generate_v4(),
  plan_id     uuid not null references pricing_plans(id) on delete cascade,
  feature     text not null,
  included    boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists pricing_features_plan_id_idx on pricing_features(plan_id);

-- ── 7. industries ─────────────────────────────────────────────────────────────

create table if not exists industries (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  name         text not null,
  description  text,
  sort_order   integer not null default 0,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger industries_updated_at
  before update on industries
  for each row execute function cms_set_updated_at();

-- ── 8. solutions ──────────────────────────────────────────────────────────────

create table if not exists solutions (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  description  text,
  sort_order   integer not null default 0,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger solutions_updated_at
  before update on solutions
  for each row execute function cms_set_updated_at();

-- ── 9. faqs ───────────────────────────────────────────────────────────────────

create table if not exists faqs (
  id           uuid primary key default uuid_generate_v4(),
  question     text not null,
  answer       text not null,
  category     text,
  sort_order   integer not null default 0,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger faqs_updated_at
  before update on faqs
  for each row execute function cms_set_updated_at();

-- ── 10. resources ─────────────────────────────────────────────────────────────

create table if not exists resources (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text not null unique,
  title               text not null,
  summary             text,
  content             text,           -- markdown body
  type                text not null
                      check (type in ('blog','guide','case_study','whitepaper','video')),
  cover_storage_path  text,           -- relative path inside "site-media" bucket
  is_published        boolean not null default false,
  published_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger resources_updated_at
  before update on resources
  for each row execute function cms_set_updated_at();

-- ── 11. leads ─────────────────────────────────────────────────────────────────

create table if not exists leads (
  id         uuid primary key default uuid_generate_v4(),
  source     text not null,   -- "contact" | "book-demo" | "pricing" | etc.
  name       text,
  email      text,
  company    text,
  phone      text,
  message    text,
  metadata   jsonb,           -- extra structured payload (product interest, etc.)
  created_at timestamptz not null default now()
);

-- ── 12. site_settings ─────────────────────────────────────────────────────────

create table if not exists site_settings (
  key         text primary key,
  value       text not null,
  description text,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references admin_profiles(id) on delete set null
);

-- ── 13. cms_audit_log ─────────────────────────────────────────────────────────

create table if not exists cms_audit_log (
  id          uuid primary key default uuid_generate_v4(),
  admin_id    uuid not null references admin_profiles(id) on delete restrict,
  action      text not null check (action in ('create','update','delete','publish','unpublish')),
  table_name  text not null,
  record_id   text,           -- string representation of the PK of the affected row
  diff        jsonb,          -- {before: {...}, after: {...}} snapshot
  created_at  timestamptz not null default now()
);

create index if not exists cms_audit_log_admin_id_idx  on cms_audit_log(admin_id);
create index if not exists cms_audit_log_table_name_idx on cms_audit_log(table_name);
create index if not exists cms_audit_log_created_at_idx on cms_audit_log(created_at desc);

-- ── Row-Level Security ────────────────────────────────────────────────────────

-- Enable RLS on all content tables
alter table products         enable row level security;
alter table product_features enable row level security;
alter table product_media    enable row level security;
alter table pricing_plans    enable row level security;
alter table pricing_features enable row level security;
alter table industries       enable row level security;
alter table solutions        enable row level security;
alter table faqs             enable row level security;
alter table resources        enable row level security;
alter table leads            enable row level security;
alter table site_settings    enable row level security;
alter table cms_audit_log    enable row level security;
alter table admin_profiles   enable row level security;

-- ── Helper function: is_cms_admin ─────────────────────────────────────────────
--
-- Returns TRUE if the current auth.uid() has an active admin_profiles row.
-- Used in RLS policies. SECURITY DEFINER so it bypasses RLS on admin_profiles.

create or replace function is_cms_admin()
  returns boolean
  language sql
  security definer
  stable
as $$
  select exists (
    select 1 from admin_profiles
    where id = auth.uid()
      and is_active = true
  );
$$;

-- Helper: role check

create or replace function cms_admin_role()
  returns text
  language sql
  security definer
  stable
as $$
  select role from admin_profiles
  where id = auth.uid()
    and is_active = true
  limit 1;
$$;

-- ── Public read policies (anon + authenticated) ───────────────────────────────

-- Published products are publicly readable
create policy "public_read_published_products"
  on products for select
  using (is_published = true);

create policy "public_read_product_features"
  on product_features for select
  using (
    exists (
      select 1 from products p
      where p.id = product_features.product_id
        and p.is_published = true
    )
  );

create policy "public_read_product_media"
  on product_media for select
  using (
    exists (
      select 1 from products p
      where p.id = product_media.product_id
        and p.is_published = true
    )
  );

create policy "public_read_published_pricing_plans"
  on pricing_plans for select
  using (is_published = true);

create policy "public_read_pricing_features"
  on pricing_features for select
  using (
    exists (
      select 1 from pricing_plans pp
      where pp.id = pricing_features.plan_id
        and pp.is_published = true
    )
  );

create policy "public_read_published_industries"
  on industries for select
  using (is_published = true);

create policy "public_read_published_solutions"
  on solutions for select
  using (is_published = true);

create policy "public_read_published_faqs"
  on faqs for select
  using (is_published = true);

create policy "public_read_published_resources"
  on resources for select
  using (is_published = true);

create policy "public_read_site_settings"
  on site_settings for select
  using (true);

-- No anonymous writes on any table
-- (Only admin clients using service-role bypass RLS for mutations)

-- ── Admin read policies ───────────────────────────────────────────────────────

create policy "admin_read_all_products"
  on products for select
  using (is_cms_admin());

create policy "admin_read_all_pricing_plans"
  on pricing_plans for select
  using (is_cms_admin());

create policy "admin_read_all_industries"
  on industries for select
  using (is_cms_admin());

create policy "admin_read_all_solutions"
  on solutions for select
  using (is_cms_admin());

create policy "admin_read_all_faqs"
  on faqs for select
  using (is_cms_admin());

create policy "admin_read_all_resources"
  on resources for select
  using (is_cms_admin());

create policy "admin_read_leads"
  on leads for select
  using (is_cms_admin());

create policy "admin_read_audit_log"
  on cms_audit_log for select
  using (is_cms_admin());

create policy "admin_read_own_profile"
  on admin_profiles for select
  using (id = auth.uid());

-- ── Storage bucket ────────────────────────────────────────────────────────────
--
-- Create the "site-media" bucket via Supabase Dashboard or CLI:
--
--   supabase storage create site-media --public
--
-- Expected folder structure:
--   products/{product_id}/
--   resources/{resource_id}/
--   site/                    (logos, OG images, misc)
--
-- Anonymous uploads are NOT allowed.
-- Admin uploads go through authenticated server actions using service-role.
