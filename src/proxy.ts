import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseUrl, getSupabasePublishableKey } from "@/lib/env";

/**
 * KAIONEX CMS — Route protection proxy.
 *
 * This is the Next.js 16.x proxy (renamed from middleware).
 * See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
 *
 * Performs OPTIMISTIC checks only (reads the Supabase session cookie).
 * This is NOT the authoritative security boundary — every server action
 * and data access function must independently verify session + admin_profiles.
 *
 * Protected: /admin/* (all admin routes except /admin/login)
 * Public redirect: /admin/login → /admin (if already authenticated)
 */

const ADMIN_LOGIN = "/admin/login";
const ADMIN_ROOT = "/admin";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ── Refresh Supabase session cookies ──────────────────────────────────────
  // @supabase/ssr requires the proxy to call getUser() so it can refresh the
  // access token cookie and write it to the response.

  let response = NextResponse.next({
    request,
  });

  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  // If Supabase is not configured, allow /admin/login and block everything else
  if (!url || !key) {
    if (pathname === ADMIN_LOGIN) return response;
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() validates the session token with Supabase Auth.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);

  // /admin/login: redirect authenticated users to dashboard
  if (pathname === ADMIN_LOGIN) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ADMIN_ROOT, request.url));
    }
    return response;
  }

  // All other /admin/* routes: require authentication
  if (!isAuthenticated) {
    const loginUrl = new URL(ADMIN_LOGIN, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    // Run proxy on all /admin routes
    "/admin/:path*",
  ],
};
