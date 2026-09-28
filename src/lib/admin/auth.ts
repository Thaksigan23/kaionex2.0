import "server-only";

/**
 * KAIONEX CMS — Admin authentication & session helpers.
 *
 * This module is server-only (session verification, role checks).
 * Server actions (login/logout) are in `./actions.ts` with 'use server'
 * so they can be imported by Client Components without triggering
 * the server-only boundary.
 *
 * Security model:
 *   1. Supabase Auth verifies identity (email + password).
 *   2. admin_profiles.role verifies authorization level.
 *   3. Every server action must call verifyAdminSession() before mutating.
 *   4. proxy.ts performs optimistic cookie-based checks for redirect UX.
 */

import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { AdminProfile, AdminRole } from "@/lib/supabase/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminSession {
  userId: string;
  email: string;
  profile: AdminProfile;
}

export interface LoginResult {
  error?: string;
}

// ─── Session verification ─────────────────────────────────────────────────────

/**
 * Verifies that the current request has:
 *   1. A valid Supabase Auth session
 *   2. An active admin_profiles row
 *
 * Returns the admin session, or redirects to /admin/login if either check fails.
 *
 * Memoised with React `cache` so multiple calls within a single render pass
 * only hit the database once.
 */
export const verifyAdminSession = cache(async (): Promise<AdminSession> => {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || !profile.is_active) {
    // User exists in Supabase Auth but has no active admin_profiles row —
    // treat as unauthorized.
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return {
    userId: user.id,
    email: user.email ?? "",
    profile: profile as AdminProfile,
  };
});

/**
 * Like verifyAdminSession but also checks that the admin has one of the
 * required roles. Redirects to /admin if the role is insufficient.
 */
export async function requireRole(
  ...roles: AdminRole[]
): Promise<AdminSession> {
  const session = await verifyAdminSession();
  if (!roles.includes(session.profile.role)) {
    redirect("/admin");
  }
  return session;
}

/**
 * Returns the admin session or null — does NOT redirect.
 * Use this in components/layouts that conditionally render admin UI.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.is_active) return null;

    return {
      userId: user.id,
      email: user.email ?? "",
      profile: profile as AdminProfile,
    };
  } catch {
    return null;
  }
}
