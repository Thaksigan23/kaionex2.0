import { verifyAdminSession } from "@/lib/admin/auth";
import { adminGetAllProducts } from "@/lib/data/products";

/**
 * KAIONEX Website Administration — Dashboard.
 *
 * Shows real CMS status only. No fabricated stats, analytics,
 * or metrics. Information is derived from actual database counts.
 *
 * This is the WEBSITE CONTENT administration dashboard.
 * It is NOT an interface for KAIONEX POS, EMS, FMS, E-Commerce, or CRM.
 */
export default async function AdminDashboard() {
  const session = await verifyAdminSession();

  // Real counts from DB — Supabase admin client bypasses RLS for counting
  let productCount = 0;
  let setupWarning = false;

  try {
    const products = await adminGetAllProducts();
    productCount = products.length;
  } catch {
    // Supabase not configured yet
    setupWarning = true;
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">
          Welcome back,{" "}
          <span className="text-white">
            {session.profile.display_name ?? session.email}
          </span>{" "}
          —{" "}
          <span className="text-[#6b6b80]">
            role: {session.profile.role}
          </span>
        </p>
      </div>

      {/* Scope notice */}
      <div className="mb-8 rounded-xl border border-white/8 bg-white/3 p-5">
        <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-widest mb-1.5">
          What this dashboard manages
        </p>
        <p className="text-sm text-[#a0a0b0] leading-relaxed">
          This CMS manages <strong className="text-white">website content</strong> for the
          KAIONEX marketing site — product descriptions, pricing page content,
          industry pages, solutions, FAQs, blog resources, and incoming leads.
        </p>
        <p className="text-sm text-[#6b6b80] mt-2">
          It is not connected to the operational databases of KAIONEX POS,
          EMS, FMS, E-Commerce, or CRM.
        </p>
      </div>

      {/* Setup warning when Supabase is not configured */}
      {setupWarning && (
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <p className="text-sm font-semibold text-amber-400 mb-1">
            ⚠ Supabase not configured
          </p>
          <p className="text-sm text-amber-400/70">
            Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, and{" "}
            <code className="font-mono">SUPABASE_SECRET_KEY</code> in your{" "}
            <code className="font-mono">.env.local</code> to connect to the database.
            See <code className="font-mono">docs/CMS_SETUP.md</code> for step-by-step
            instructions.
          </p>
        </div>
      )}

      {/* CMS status cards */}
      {!setupWarning && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-8">
          <StatCard label="Products" value={productCount} description="in the KAIONEX family" />
          <StatCard label="Leads" value="—" description="connect DB to view" />
          <StatCard label="Resources" value="—" description="connect DB to view" />
        </div>
      )}

      {/* Phase D1 status */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-5">
        <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-widest mb-3">
          Phase D1 — Foundation status
        </p>
        <ul className="space-y-2 text-sm">
          {[
            "Supabase client architecture (client / server / admin)",
            "Database schema — 13 tables, RLS policies, audit log",
            "Admin authentication — Supabase Auth + admin_profiles authorization",
            "Admin shell — sidebar + navigation",
            "Data access layer — products, pricing, industries, solutions, FAQs, resources, settings",
            "Zod validation schemas — all CMS entities",
            "Route protection — proxy.ts (Next.js 16.x)",
            "Environment configuration — .env.example updated",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-[#a0a0b0]">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
          <li className="flex items-start gap-2 text-[#6b6b80]">
            <span className="text-[#4a4a5a] mt-0.5 flex-shrink-0">○</span>
            Phase D2 — Content migration (next phase)
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number | string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-5">
      <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-[#4a4a5a]">{description}</p>
    </div>
  );
}
