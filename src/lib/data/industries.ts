import "server-only";

/**
 * KAIONEX CMS — Data access layer: industries.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Industry } from "@/lib/supabase/types";

export async function getPublishedIndustries(): Promise<Industry[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (error) throw new Error(`[industries] ${error.message}`);
  return (data ?? []) as Industry[];
}

export async function adminGetAllIndustries(): Promise<Industry[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("industries")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(`[industries admin] ${error.message}`);
  return (data ?? []) as Industry[];
}
