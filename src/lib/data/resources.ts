import "server-only";

/**
 * KAIONEX CMS — Data access layer: resources.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Resource, ResourceType } from "@/lib/supabase/types";

export async function getPublishedResources(
  type?: ResourceType
): Promise<Resource[]> {
  const supabase = await createServerClient();
  let query = supabase
    .from("resources")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;
  if (error) throw new Error(`[resources] ${error.message}`);
  return (data ?? []) as Resource[];
}

export async function getPublishedResourceBySlug(
  slug: string
): Promise<Resource | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error?.code === "PGRST116") return null;
  if (error) throw new Error(`[resources] ${error.message}`);
  return data as Resource | null;
}

export async function adminGetAllResources(): Promise<Resource[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`[resources admin] ${error.message}`);
  return (data ?? []) as Resource[];
}
