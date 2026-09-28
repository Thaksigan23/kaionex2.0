import "server-only";

/**
 * KAIONEX CMS — Data access layer: FAQs.
 */

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Faq } from "@/lib/supabase/types";

export async function getPublishedFaqs(category?: string): Promise<Faq[]> {
  const supabase = await createServerClient();
  let query = supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw new Error(`[faqs] ${error.message}`);
  return (data ?? []) as Faq[];
}

export async function adminGetAllFaqs(): Promise<Faq[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("faqs")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(`[faqs admin] ${error.message}`);
  return (data ?? []) as Faq[];
}
