-- ============================================================
-- KAIONEX CMS — Seed Data (Website Content Only)
-- ============================================================
-- Seeds the five KAIONEX product identities and core site
-- settings using only APPROVED content from the existing website.
--
-- DO NOT invent: pricing / pricing features / statistics /
-- testimonials / customer names / certifications / integrations.
--
-- Run AFTER applying migrations:
--   supabase db reset   (resets + runs migrations + seed)
-- or manually in the Supabase SQL editor.
-- ============================================================

-- ── Products ──────────────────────────────────────────────────────────────────

insert into products (slug, name, short_name, tagline, description, status, sort_order, is_published)
values
  (
    'pos',
    'KAIONEX POS',
    'POS',
    'Point of Sale built for modern retail',
    'KAIONEX POS is a purpose-built point-of-sale system for retail and service businesses. It is a standalone KAIONEX product in the KAIONEX product family.',
    'available',
    1,
    true
  ),
  (
    'ems',
    'KAIONEX EMS',
    'EMS',
    'Workforce and employee management',
    'KAIONEX EMS is a purpose-built employee management system. It is a standalone KAIONEX product in the KAIONEX product family.',
    'available',
    2,
    true
  ),
  (
    'fms',
    'KAIONEX FMS',
    'FMS',
    'Financial management for business clarity',
    'KAIONEX FMS is a purpose-built financial management system. It is a standalone KAIONEX product in the KAIONEX product family.',
    'available',
    3,
    true
  ),
  (
    'ecommerce',
    'KAIONEX E-Commerce',
    'E-Commerce',
    'Online storefront for your business',
    'KAIONEX E-Commerce is a purpose-built online commerce solution. It is a standalone KAIONEX product in the KAIONEX product family.',
    'available',
    4,
    true
  ),
  (
    'crm',
    'KAIONEX CRM',
    'CRM',
    'Customer relationship management — coming soon',
    'KAIONEX CRM is a purpose-built customer relationship management product currently under development. It is part of the KAIONEX product family.',
    'coming_soon',
    5,
    true
  )
on conflict (slug) do update set
  name         = excluded.name,
  short_name   = excluded.short_name,
  tagline      = excluded.tagline,
  description  = excluded.description,
  status       = excluded.status,
  sort_order   = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at   = now();

-- ── Site Settings ─────────────────────────────────────────────────────────────

insert into site_settings (key, value, description)
values
  (
    'site_name',
    'KAIONEX',
    'Public display name of the website'
  ),
  (
    'site_tagline',
    'One KAIONEX. Multiple business products.',
    'Homepage tagline shown in hero and meta'
  ),
  (
    'contact_email',
    'info@kaionex.app',
    'Primary public contact email'
  ),
  (
    'cms_initialized',
    'true',
    'Set to true once the first admin user is provisioned'
  )
on conflict (key) do update set
  value      = excluded.value,
  updated_at = now();
