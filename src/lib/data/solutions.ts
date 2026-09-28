import "server-only";

/**
 * KAIONEX CMS — Data access layer: solutions.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Solution } from "@/lib/supabase/types";

export async function getPublishedSolutions(): Promise<Solution[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (error) throw new Error(`[solutions] ${error.message}`);
  return (data ?? []) as Solution[];
}

export async function adminGetAllSolutions(): Promise<Solution[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("solutions")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(`[solutions admin] ${error.message}`);
  return (data ?? []) as Solution[];
}
