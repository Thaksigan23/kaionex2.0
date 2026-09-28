"use client";

/**
 * KAIONEX CMS — Browser Supabase client.
 *
 * Use this ONLY in Client Components (`"use client"`).
 * Never import server-only helpers from this file.
 *
 * The client is created once per browser session using the publishable key.
 * The publishable key is safe to expose to the browser — all access is governed by
 * Row-Level Security policies on the database.
 */

import { createBrowserClient } from "@supabase/ssr";

/**
 * Returns a browser-side Supabase client.
 *
 * Call this inside Client Components, event handlers, and effects.
 * Do NOT call this in Server Components or Route Handlers — use
 * `createServerClient` from `./server` instead.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[KAIONEX CMS] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "Copy .env.example to .env.local and fill in your Supabase project credentials."
    );
  }

  return createBrowserClient(url, key);
}
