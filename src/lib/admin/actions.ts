"use server";

/**
 * KAIONEX CMS — Admin server actions (login / logout).
 *
 * These are separate 'use server' actions that can be imported by
 * Client Components. The 'use server' directive ensures they run
 * only on the server even when invoked from the browser.
 *
 * Do NOT add 'server-only' here — Client Components must be able to
 * import the function reference. The implementation stays server-side
 * because of 'use server'.
 */

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { LoginResult } from "@/lib/admin/auth";

/**
 * Server action: sign in with email + password.
 * Validates credentials, then checks admin_profiles authorization.
 */
export async function signInAdmin(
  _prev: LoginResult | undefined,
  formData: FormData
): Promise<LoginResult> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.",
    };
  }

  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return { error: "Invalid email or password." };
  }

  // Verify admin authorization
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication failed. Please try again." };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, is_active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut();
    return {
      error:
        "Access denied. This account is not authorized as an active KAIONEX Website Administrator.",
    };
  }

  redirect("/admin");
}

/**
 * Server action: sign out the current admin session.
 */
export async function signOutAdmin(): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
