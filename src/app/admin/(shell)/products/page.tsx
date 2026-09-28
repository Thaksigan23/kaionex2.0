import Link from "next/link";
import { verifyAdminSession } from "@/lib/admin/auth";
import { adminGetAllProducts } from "@/lib/data/products";
import { PublishToggleButton } from "./_components/PublishToggleButton";

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
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
            KAIONEX Website Administration
          </p>
          <h1 className="text-2xl font-bold text-white">Products CMS</h1>
          <p className="mt-1 text-sm text-[#7a7a90]">
            Manage website content, positioning, features, and visibility for each KAIONEX product.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          + Add Product
        </Link>
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
          No products found. Run the product migration script or add products above.
        </div>
      )}

      {products.length > 0 && (
        <div className="rounded-xl border border-white/8 bg-white/2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#7a7a90]">
              <thead className="border-b border-white/8 bg-white/3 text-xs font-semibold uppercase tracking-wider text-[#6b6b80]">
                <tr>
                  <th scope="col" className="px-5 py-3.5">
                    Product
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Slug
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Visibility
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Order
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/3 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        <Link href={`/admin/products/${p.id}`}>
                          {p.name}
                        </Link>
                      </div>
                      <div className="text-xs text-[#6b6b80] mt-0.5 line-clamp-1 max-w-sm">
                        {p.tagline ?? "No tagline set"}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[#a0a0b0]">
                      /{p.slug}
                    </td>
                    <td className="px-5 py-4">
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
                    </td>
                    <td className="px-5 py-4">
                      <PublishToggleButton
                        productId={p.id}
                        isPublished={p.is_published}
                      />
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[#6b6b80]">
                      {p.sort_order}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="text-xs text-[#6b6b80] hover:text-white transition-colors"
                          title="View public page"
                        >
                          View ↗
                        </Link>
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="rounded bg-white/5 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
