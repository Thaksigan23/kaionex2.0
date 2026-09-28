import "server-only";

/**
 * KAIONEX CMS — Admin Supabase client (secret key / bypass RLS).
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  SECURITY CRITICAL                                                       ║
 * ║  This module uses the SECRET key which bypasses ALL Row-Level            ║
 * ║  Security policies. It must NEVER be imported from:                      ║
 * ║    • Client Components (`"use client"`)                                  ║
 * ║    • Any file reachable from the browser bundle                          ║
 * ║    • Any NEXT_PUBLIC_* environment variable                              ║
 * ║                                                                          ║
 * ║  It is protected by `import "server-only"` which causes a build error    ║
 * ║  if imported from a client boundary.                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * Use this ONLY in:
 *   - Server Actions that have already verified admin session + role
 *   - Internal migration/seed scripts (not shipped in the app bundle)
 *
 * Every call site must authenticate and verify admin_profiles.role BEFORE
 * calling createAdminClient().
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseSecretKey } from "@/lib/env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _adminClient: SupabaseClient<any> | null = null;

/**
 * Returns a singleton Supabase admin client using the secret key.
 *
 * The client is created lazily and cached for the process lifetime.
 * In serverless environments (Vercel) each invocation is a new process,
 * so this effectively creates one client per request in cold starts.
 */
export function createAdminClient() {
  if (_adminClient) return _adminClient;

  const url = getSupabaseUrl();
  const serviceKey = getSupabaseSecretKey();

  if (!url || !serviceKey) {
    throw new Error(
      "[KAIONEX CMS] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY. " +
        "These must be set in .env.local (never in NEXT_PUBLIC_ for the secret key). " +
        "See docs/CMS_SETUP.md for setup instructions."
    );
  }

  _adminClient = createClient(url, serviceKey, {
    auth: {
      // Disable auto-refresh and session persistence for server-side admin usage.
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _adminClient;
}
