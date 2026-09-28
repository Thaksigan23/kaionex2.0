import { verifyAdminSession } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Lead } from "@/lib/supabase/types";

export default async function AdminLeadsPage() {
  await verifyAdminSession();

  let leads: Lead[] = [];
  let error: string | null = null;

  try {
    const admin = createAdminClient();
    const { data, error: dbError } = await admin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (dbError) throw dbError;
    leads = (data ?? []) as Lead[];
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load leads";
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">
          Incoming enquiries from the website contact, book-demo, and pricing forms.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6 text-sm text-amber-400">
          {error.includes("Missing") || error.includes("SUPABASE")
            ? "Supabase not configured. See docs/CMS_SETUP.md."
            : error}
        </div>
      )}

      {!error && leads.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-white/3 p-8 text-center text-[#6b6b80] text-sm">
          No leads yet.
        </div>
      )}

      {leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border border-white/8 bg-white/3 px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {lead.name ?? "—"}
                    {lead.company && (
                      <span className="text-[#7a7a90] font-normal">
                        {" "}· {lead.company}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#6b6b80] mt-0.5">
                    {lead.email ?? "No email"}{" "}
                    {lead.phone && `· ${lead.phone}`}
                  </p>
                  {lead.message && (
                    <p className="text-xs text-[#7a7a90] mt-2 max-w-xl line-clamp-2">
                      {lead.message}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7a7a90]">
                    {lead.source}
                  </span>
                  <p className="text-[10px] text-[#4a4a5a] mt-1.5">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
