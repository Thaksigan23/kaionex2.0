-- ============================================================
-- KAIONEX CMS — Migration 002: Products CMS Content & Media
-- ============================================================
-- Extends the products table with content fields required by the
-- approved KAIONEX marketing website and normalizes E-Commerce naming.

alter table products
  add column if not exists summary text,
  add column if not exists headline text,
  add column if not exists accent text,
  add column if not exists benefits text[],
  add column if not exists audience text,
  add column if not exists product_family_role text,
  add column if not exists cta_label text,
  add column if not exists cta_href text;

comment on column products.summary is 'Short summary used in product cards and listings';
comment on column products.headline is 'Hero headline for the product detail page';
comment on column products.benefits is 'Key business benefits list';
comment on column products.audience is 'Target audience description';
comment on column products.product_family_role is 'Role in the KAIONEX product family (never implies technical integration or data sync)';
comment on column products.cta_label is 'Button label for product call-to-action';
comment on column products.cta_href is 'Destination URL for product call-to-action';

-- Extend product_media with caption and is_primary flag
alter table product_media
  add column if not exists caption text,
  add column if not exists is_primary boolean not null default false;

comment on column product_media.caption is 'Optional display caption';
comment on column product_media.is_primary is 'Flag indicating the primary hero image for this product';

-- Normalize E-Commerce public name per business rules
update products
set name = 'E-Commerce',
    short_name = 'E-Commerce',
    updated_at = now()
where slug = 'ecommerce';

-- RLS read policies for product features and media
-- (Ensures public can read features/media belonging to published products)
drop policy if exists "public_read_product_features" on product_features;
create policy "public_read_product_features"
  on product_features for select
  using (
    exists (
      select 1 from products p
      where p.id = product_features.product_id
        and p.is_published = true
    )
  );

drop policy if exists "public_read_product_media" on product_media;
create policy "public_read_product_media"
  on product_media for select
  using (
    exists (
      select 1 from products p
      where p.id = product_media.product_id
        and p.is_published = true
    )
  );

-- Admin read all features & media
drop policy if exists "admin_read_all_product_features" on product_features;
create policy "admin_read_all_product_features"
  on product_features for select
  using (is_cms_admin());

drop policy if exists "admin_read_all_product_media" on product_media;
create policy "admin_read_all_product_media"
  on product_media for select
  using (is_cms_admin());
