import { verifyAdminSession } from "@/lib/admin/auth";
import { getAllSiteSettings } from "@/lib/data/settings";
import type { SiteSetting } from "@/lib/supabase/types";

export default async function AdminSettingsPage() {
  await verifyAdminSession();

  let settings: SiteSetting[] = [];
  let error: string | null = null;

  try {
    settings = await getAllSiteSettings();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load settings";
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">Global configuration for the KAIONEX marketing website.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6 text-sm text-amber-400">
          {error.includes("Missing") ? "Supabase not configured. See docs/CMS_SETUP.md." : error}
        </div>
      )}

      {!error && settings.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-white/3 p-8 text-center text-[#6b6b80] text-sm">
          No settings found. Run the seed script to initialize default settings.
        </div>
      )}

      {settings.length > 0 && (
        <div className="space-y-3">
          {settings.map((s) => (
            <div
              key={s.key}
              className="rounded-xl border border-white/8 bg-white/3 px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-[#7a7a90] mb-1">{s.key}</p>
                  <p className="text-sm text-white break-words">{s.value}</p>
                  {s.description && (
                    <p className="text-xs text-[#4a4a5a] mt-1">{s.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-[#4a4a5a]">Editing UI planned for Phase D2.</p>
    </div>
  );
}
