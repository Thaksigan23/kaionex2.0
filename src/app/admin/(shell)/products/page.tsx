import { verifyAdminSession } from "@/lib/admin/auth";
import { adminGetAllProducts } from "@/lib/data/products";

export default async function AdminProductsPage() {
  await verifyAdminSession();

  let products: Awaited<ReturnType<typeof adminGetAllProducts>> = [];
  let error: string | null = null;

  try {
    products = await adminGetAllProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load products";
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">
          Manage website content for each KAIONEX product.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6 text-sm text-amber-400">
          {error.includes("SUPABASE") || error.includes("Missing")
            ? "Supabase not configured. See docs/CMS_SETUP.md."
            : error}
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-white/3 p-8 text-center text-[#6b6b80] text-sm">
          No products found. Run the seed script or add products via the
          Supabase dashboard.
        </div>
      )}

      {products.length > 0 && (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-5 py-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-[#6b6b80] mt-0.5">{p.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    p.status === "available"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-amber-500/15 text-amber-400",
                  ].join(" ")}
                >
                  {p.status === "available" ? "Available" : "Coming Soon"}
                </span>
                <span
                  className={[
                    "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    p.is_published
                      ? "bg-blue-500/15 text-blue-400"
                      : "bg-white/8 text-[#6b6b80]",
                  ].join(" ")}
                >
                  {p.is_published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-[#4a4a5a]">
        Full CRUD editing UI is planned for Phase D2.
      </p>
    </div>
  );
}
