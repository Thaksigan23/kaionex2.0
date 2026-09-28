import "server-only";

/**
 * KAIONEX CMS — Data access layer: site settings.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteSetting } from "@/lib/supabase/types";

/** Get a single site setting by key. Returns null if not found. */
export async function getSiteSetting(key: string): Promise<string | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error?.code === "PGRST116") return null;
  if (error) throw new Error(`[site_settings] ${error.message}`);
  return (data as { value: string } | null)?.value ?? null;
}

/** Get all site settings. */
export async function getAllSiteSettings(): Promise<SiteSetting[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key");

  if (error) throw new Error(`[site_settings] ${error.message}`);
  return (data ?? []) as SiteSetting[];
}

/** Admin: update a site setting value. */
export async function adminSetSiteSetting(
  key: string,
  value: string,
  updatedBy: string
): Promise<void> {
  const admin = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any)
    .from("site_settings")
    .upsert({ key, value, updated_by: updatedBy }, { onConflict: "key" });

  if (error) throw new Error(`[site_settings admin] ${error.message}`);
}
