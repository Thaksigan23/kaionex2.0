import "server-only";

/**
 * KAIONEX CMS — Server Supabase client (SSR / Server Components).
 *
 * This module is server-only. It reads cookies from the request context so
 * that Supabase Auth session tokens are forwarded correctly.
 *
 * Use this in:
 *   - Server Components
 *   - Route Handlers (app/api/…/route.ts)
 *   - Server Actions ('use server')
 *
 * Do NOT use this in Client Components — use `./client` instead.
 *
 * Security: uses the publishable key. All access is governed by RLS.
 * Admin mutations that bypass RLS must go through `./admin` (secret key),
 * which is NEVER imported from this file or any browser-reachable module.
 */

import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseUrl, getSupabasePublishableKey } from "@/lib/env";

export async function createServerClient() {
  const cookieStore = await cookies();
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    throw new Error(
      "[KAIONEX CMS] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return _createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // `setAll` is called from Server Components where cookie mutation
          // is not allowed. This is expected during read operations.
        }
      },
    },
  });
}
