"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/lib/admin/actions";
import type { AdminSession } from "@/lib/admin/auth";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/admin",              icon: "⬛" },
  { label: "Products",   href: "/admin/products",     icon: "📦" },
  { label: "Pricing",    href: "/admin/pricing",      icon: "💰" },
  { label: "Industries", href: "/admin/industries",   icon: "🏭" },
  { label: "Solutions",  href: "/admin/solutions",    icon: "✨" },
  { label: "Resources",  href: "/admin/resources",    icon: "📄" },
  { label: "FAQs",       href: "/admin/faqs",         icon: "❓" },
  { label: "Leads",      href: "/admin/leads",        icon: "📋" },
  { label: "Media",      href: "/admin/media",        icon: "🖼️" },
  { label: "Settings",   href: "/admin/settings",     icon: "⚙️" },
] as const;

interface AdminShellProps {
  session: AdminSession;
  children: React.ReactNode;
}

export function AdminShell({ session, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 border-r border-white/5 bg-[#0d0d14] flex flex-col">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/5">
          <p className="text-xs font-bold tracking-widest uppercase text-[#6b6b80]">
            KAIONEX
          </p>
          <p className="text-[10px] tracking-wider text-[#4a4a5a] mt-0.5">
            Website Administration
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-3 px-5 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/8 text-white font-medium"
                    : "text-[#7a7a90] hover:text-white hover:bg-white/4",
                ].join(" ")}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-xs text-[#7a7a90] truncate mb-1">
            {session.email}
          </p>
          <p className="text-[10px] text-[#4a4a5a] uppercase tracking-wider mb-3">
            {session.profile.role}
          </p>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="w-full text-left text-xs text-[#6b6b80] hover:text-white transition-colors"
            >
              Sign out →
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
