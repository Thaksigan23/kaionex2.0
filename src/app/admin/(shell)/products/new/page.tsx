import Link from "next/link";
import { verifyAdminSession } from "@/lib/admin/auth";
import { ProductForm } from "../_components/ProductForm";

export default async function AdminNewProductPage() {
  await verifyAdminSession();

  return (
    <div className="p-8 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-2">
          <Link href="/admin/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span>Add New Product</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Create New Product</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">
          Add a new product entry to the KAIONEX portfolio.
        </p>
      </div>

      {/* Main product form */}
      <ProductForm isNew={true} />
    </div>
  );
}
