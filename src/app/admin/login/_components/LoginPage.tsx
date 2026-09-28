"use client";

import { useActionState } from "react";
import { signInAdmin } from "@/lib/admin/actions";
import type { LoginResult } from "@/lib/admin/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginResult | undefined, FormData>(
    signInAdmin,
    undefined
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="font-bold text-2xl tracking-tight text-white">
              KAIONEX
            </span>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-2">
            Website Administration
          </p>
          <h1 className="text-xl font-semibold text-white">
            Sign in to CMS
          </h1>
          <p className="mt-1 text-sm text-[#6b6b80]">
            For website content management only —{" "}
            <span className="text-[#8b8ba0]">not POS · EMS · FMS</span>
          </p>
        </div>

        {/* Form */}
        <form action={action} className="space-y-5">
          {state?.error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#a0a0b0] mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50"
              placeholder="admin@kaionex.app"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#a0a0b0] mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0a0f] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* No registration — intentional */}
        <p className="mt-8 text-center text-xs text-[#4a4a5a]">
          Admin accounts are provisioned by the system owner.
          <br />
          No self-registration is available.
        </p>
      </div>
    </div>
  );
}
