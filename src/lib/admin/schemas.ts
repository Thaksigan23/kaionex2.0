/**
 * KAIONEX CMS — Zod validation schemas for all CMS entities.
 *
 * These schemas are used in server actions to validate input before
 * any database mutation. They are NOT used to validate database reads.
 *
 * All schemas are exported individually and as a named group.
 */

import { z } from "zod";

// ─── Products ─────────────────────────────────────────────────────────────────

export const ProductSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  name: z.string().min(1).max(128),
  short_name: z.string().min(1).max(32),
  tagline: z.string().max(256).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  status: z.enum(["available", "coming_soon"]),
  sort_order: z.number().int().min(0),
  is_published: z.boolean(),
});

export type ProductInput = z.infer<typeof ProductSchema>;

// ─── Pricing plans ────────────────────────────────────────────────────────────

export const PricingPlanSchema = z.object({
  product_id: z.string().uuid(),
  name: z.string().min(1).max(128),
  tagline: z.string().max(256).optional().nullable(),
  price_label: z.string().max(128).optional().nullable(),
  is_featured: z.boolean(),
  sort_order: z.number().int().min(0),
  is_published: z.boolean(),
});

export type PricingPlanInput = z.infer<typeof PricingPlanSchema>;

// ─── Industries ───────────────────────────────────────────────────────────────

export const IndustrySchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(128),
  description: z.string().max(1000).optional().nullable(),
  sort_order: z.number().int().min(0),
  is_published: z.boolean(),
});

export type IndustryInput = z.infer<typeof IndustrySchema>;

// ─── Solutions ────────────────────────────────────────────────────────────────

export const SolutionSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(256),
  description: z.string().max(1000).optional().nullable(),
  sort_order: z.number().int().min(0),
  is_published: z.boolean(),
});

export type SolutionInput = z.infer<typeof SolutionSchema>;

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FaqSchema = z.object({
  question: z.string().min(1).max(512),
  answer: z.string().min(1).max(4000),
  category: z.string().max(64).optional().nullable(),
  sort_order: z.number().int().min(0),
  is_published: z.boolean(),
});

export type FaqInput = z.infer<typeof FaqSchema>;

// ─── Resources ────────────────────────────────────────────────────────────────

export const ResourceSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(256),
  summary: z.string().max(512).optional().nullable(),
  content: z.string().max(100000).optional().nullable(),
  type: z.enum(["blog", "guide", "case_study", "whitepaper", "video"]),
  cover_storage_path: z.string().max(512).optional().nullable(),
  is_published: z.boolean(),
  published_at: z.string().datetime().optional().nullable(),
});

export type ResourceInput = z.infer<typeof ResourceSchema>;

// ─── Site settings ────────────────────────────────────────────────────────────

export const SiteSettingSchema = z.object({
  key: z.string().min(1).max(128),
  value: z.string().max(4000),
});

export type SiteSettingInput = z.infer<typeof SiteSettingSchema>;

// ─── Admin login ──────────────────────────────────────────────────────────────

export const AdminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
