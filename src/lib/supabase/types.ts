/**
 * KAIONEX CMS — Supabase database types.
 *
 * Run the following command against your live Supabase project to regenerate:
 *   npx supabase gen types typescript --project-id <your-project-id> > src/lib/supabase/types.ts
 *
 * Until a live project is linked these types are hand-authored to match
 * supabase/migrations/001_initial_schema.sql exactly.
 *
 * DO NOT invent fields that are not in the migration.
 */

// ─── Enumerations ────────────────────────────────────────────────────────────

export type AdminRole = "owner" | "admin" | "editor";

export type ProductStatus = "available" | "coming_soon";

export type ResourceType =
  | "blog"
  | "guide"
  | "case_study"
  | "whitepaper"
  | "video";

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "unpublish";

// ─── Table row types ──────────────────────────────────────────────────────────

export interface AdminProfile {
  id: string; // uuid — matches auth.users.id
  role: AdminRole;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string; // uuid
  slug: string; // e.g. "pos", "ems"
  name: string; // e.g. "KAIONEX POS"
  short_name: string; // e.g. "POS"
  tagline: string | null;
  description: string | null;
  summary: string | null;
  headline: string | null;
  accent: string | null;
  benefits: string[] | null;
  audience: string | null;
  /** Role in the KAIONEX product family (describes positioning; never implies technical integration or data sync). */
  connection: string | null;
  cta_label: string | null;
  cta_href: string | null;
  status: ProductStatus;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature: string;
  sort_order: number;
  created_at: string;
}

export interface ProductMedia {
  id: string;
  product_id: string;
  storage_path: string; // relative path inside site-media bucket
  alt_text: string | null;
  media_type: string; // e.g. "image/png"
  sort_order: number;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  product_id: string;
  name: string;
  tagline: string | null;
  price_label: string | null; // e.g. "Contact us", "LKR 5,000/mo"
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingFeature {
  id: string;
  plan_id: string;
  feature: string;
  included: boolean;
  sort_order: number;
  created_at: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string | null; // markdown
  type: ResourceType;
  cover_storage_path: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  source: string; // "contact" | "book-demo" | "pricing" | etc.
  name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  message: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface SiteSetting {
  key: string; // primary key
  value: string; // stored as text; parse as needed
  description: string | null;
  updated_at: string;
  updated_by: string | null; // admin_profile.id
}

export interface CmsAuditLog {
  id: string;
  admin_id: string; // admin_profile.id
  action: AuditAction;
  table_name: string;
  record_id: string | null;
  diff: Record<string, unknown> | null; // before/after snapshot
  created_at: string;
}

// ─── Convenience union ────────────────────────────────────────────────────────

/** All CMS table names — used in the audit log helper. */
export type CmsTableName =
  | "products"
  | "product_features"
  | "product_media"
  | "pricing_plans"
  | "pricing_features"
  | "industries"
  | "solutions"
  | "faqs"
  | "resources"
  | "leads"
  | "site_settings";

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: AdminProfile;
        Insert: Partial<AdminProfile> & { id: string; role: AdminRole };
        Update: Partial<AdminProfile>;
      };
      products: {
        Row: Product;
        Insert: Partial<Product> & { slug: string; name: string; short_name: string };
        Update: Partial<Product>;
      };
      product_features: {
        Row: ProductFeature;
        Insert: Partial<ProductFeature> & { product_id: string; feature: string };
        Update: Partial<ProductFeature>;
      };
      product_media: {
        Row: ProductMedia;
        Insert: Partial<ProductMedia> & { product_id: string; storage_path: string; media_type: string };
        Update: Partial<ProductMedia>;
      };
      pricing_plans: {
        Row: PricingPlan;
        Insert: Partial<PricingPlan> & { product_id: string; name: string };
        Update: Partial<PricingPlan>;
      };
      pricing_features: {
        Row: PricingFeature;
        Insert: Partial<PricingFeature> & { plan_id: string; feature: string };
        Update: Partial<PricingFeature>;
      };
      industries: {
        Row: Industry;
        Insert: Partial<Industry> & { slug: string; name: string };
        Update: Partial<Industry>;
      };
      solutions: {
        Row: Solution;
        Insert: Partial<Solution> & { slug: string; title: string };
        Update: Partial<Solution>;
      };
      faqs: {
        Row: Faq;
        Insert: Partial<Faq> & { question: string; answer: string };
        Update: Partial<Faq>;
      };
      resources: {
        Row: Resource;
        Insert: Partial<Resource> & { slug: string; title: string; type: ResourceType };
        Update: Partial<Resource>;
      };
      leads: {
        Row: Lead;
        Insert: Partial<Lead> & { source: string };
        Update: Partial<Lead>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Partial<SiteSetting> & { key: string; value: string };
        Update: Partial<SiteSetting>;
      };
      cms_audit_log: {
        Row: CmsAuditLog;
        Insert: Partial<CmsAuditLog> & { admin_id: string; action: AuditAction; table_name: string };
        Update: Partial<CmsAuditLog>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

