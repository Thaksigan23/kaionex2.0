import Link from "next/link";
import { notFound } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin/auth";
import {
  adminGetProduct,
  adminGetProductFeatures,
  adminGetProductMedia,
} from "@/lib/data/products";
import { ProductForm } from "../_components/ProductForm";
import { ProductFeatureManager } from "../_components/ProductFeatureManager";
import { ProductMediaManager } from "../_components/ProductMediaManager";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  await verifyAdminSession();
  const { id } = await params;

  const product = await adminGetProduct(id);
  if (!product) {
    notFound();
  }

  const [features, media] = await Promise.all([
    adminGetProductFeatures(id),
    adminGetProductMedia(id),
  ]);

  return (
    <div className="p-8 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-2">
          <Link href="/admin/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span>Edit Product</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            {product.name}
            <span className="font-mono text-xs font-normal text-[#6b6b80] px-2 py-0.5 rounded bg-white/5 border border-white/8">
              /{product.slug}
            </span>
          </h1>
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="text-xs text-brand hover:underline flex items-center gap-1"
          >
            Preview on website ↗
          </Link>
        </div>
      </div>

      {/* Main product form */}
      <ProductForm initialProduct={product} isNew={false} />

      {/* Product features manager */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Capabilities & Features</h2>
          <p className="text-xs text-[#7a7a90] mt-1">
            Manage key capabilities shown on the product detail page and comparison tables.
          </p>
        </div>
        <ProductFeatureManager productId={product.id} initialFeatures={features} />
      </div>

      {/* Product media manager */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Product Media & Gallery</h2>
          <p className="text-xs text-[#7a7a90] mt-1">
            Upload and manage product screenshots, diagrams, and hero imagery in the site-media bucket.
          </p>
        </div>
        <ProductMediaManager productId={product.id} initialMedia={media} />
      </div>
    </div>
  );
}
