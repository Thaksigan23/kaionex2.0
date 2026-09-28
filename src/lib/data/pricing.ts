import "server-only";

/**
 * KAIONEX CMS — Data access layer: pricing.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PricingPlan, PricingFeature } from "@/lib/supabase/types";

// ─── Public reads ─────────────────────────────────────────────────────────────

/** Fetch published pricing plans for a product. */
export async function getPublishedPricingPlans(
  productId: string
): Promise<PricingPlan[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .eq("product_id", productId)
    .eq("is_published", true)
    .order("sort_order");

  if (error) throw new Error(`[pricing_plans] ${error.message}`);
  return (data ?? []) as PricingPlan[];
}

/** Fetch features for a pricing plan. */
export async function getPricingFeatures(
  planId: string
): Promise<PricingFeature[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("pricing_features")
    .select("*")
    .eq("plan_id", planId)
    .order("sort_order");

  if (error) throw new Error(`[pricing_features] ${error.message}`);
  return (data ?? []) as PricingFeature[];
}

// ─── Admin reads ──────────────────────────────────────────────────────────────

/** Admin: fetch all pricing plans (published + unpublished). */
export async function adminGetAllPricingPlans(): Promise<PricingPlan[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("pricing_plans")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(`[pricing_plans admin] ${error.message}`);
  return (data ?? []) as PricingPlan[];
}
