import "server-only";

/**
 * KAIONEX CMS — Data access layer: products.
 *
 * Public helpers (no auth required) use the server client with RLS.
 * Admin helpers that read unpublished content go through the admin client.
 *
 * This layer manages WEBSITE CONTENT about KAIONEX products.
 * It is NOT connected to POS/EMS/FMS/E-Commerce/CRM operational databases.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product, ProductFeature } from "@/lib/supabase/types";

// ─── Public reads ─────────────────────────────────────────────────────────────

/** Fetch all published products ordered by sort_order. */
export async function getPublishedProducts(): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (error) throw new Error(`[products] ${error.message}`);
  return (data ?? []) as Product[];
}

/** Fetch a single published product by slug. */
export async function getPublishedProductBySlug(
  slug: string
): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error?.code === "PGRST116") return null; // not found
  if (error) throw new Error(`[products] ${error.message}`);
  return data as Product | null;
}

/** Fetch published features for a product. */
export async function getProductFeatures(
  productId: string
): Promise<ProductFeature[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("product_features")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order");

  if (error) throw new Error(`[product_features] ${error.message}`);
  return (data ?? []) as ProductFeature[];
}

// ─── Admin reads (all records, published or not) ──────────────────────────────

/** Admin: fetch ALL products including unpublished. */
export async function adminGetAllProducts(): Promise<Product[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(`[products admin] ${error.message}`);
  return (data ?? []) as Product[];
}

/** Admin: fetch a single product by id. */
export async function adminGetProduct(id: string): Promise<Product | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error?.code === "PGRST116") return null;
  if (error) throw new Error(`[products admin] ${error.message}`);
  return data as Product | null;
}
