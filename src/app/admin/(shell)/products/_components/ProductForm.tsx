"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/supabase/types";
import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "@/lib/admin/product-actions";

const CANONICAL_SLUGS = ["pos", "ems", "fms", "ecommerce", "crm"];

interface ProductFormProps {
  initialProduct?: Product | null;
  isNew?: boolean;
}

export function ProductForm({ initialProduct, isNew = false }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [shortName, setShortName] = useState(initialProduct?.short_name ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [status, setStatus] = useState<"available" | "coming_soon">(
    initialProduct?.status ?? "available"
  );
  const [sortOrder, setSortOrder] = useState<number>(initialProduct?.sort_order ?? 0);
  const [isPublished, setIsPublished] = useState<boolean>(initialProduct?.is_published ?? false);

  const [tagline, setTagline] = useState(initialProduct?.tagline ?? "");
  const [headline, setHeadline] = useState(initialProduct?.headline ?? "");
  const [summary, setSummary] = useState(initialProduct?.summary ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [accent, setAccent] = useState(initialProduct?.accent ?? "");
  const [benefitsText, setBenefitsText] = useState(
    initialProduct?.benefits ? initialProduct.benefits.join("\n") : ""
  );
  const [audience, setAudience] = useState(initialProduct?.audience ?? "");
  const [productFamilyRole, setProductFamilyRole] = useState(initialProduct?.connection ?? "");
  const [ctaLabel, setCtaLabel] = useState(initialProduct?.cta_label ?? "Learn More");
  const [ctaHref, setCtaHref] = useState(
    initialProduct?.cta_href ?? (initialProduct?.slug ? `/products/${initialProduct.slug}` : "")
  );

  const isCanonical = initialProduct ? CANONICAL_SLUGS.includes(initialProduct.slug) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const benefits = benefitsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      short_name: shortName.trim(),
      slug: slug.trim().toLowerCase(),
      status,
      sort_order: Number(sortOrder),
      is_published: isPublished,
      tagline: tagline.trim() || null,
      headline: headline.trim() || null,
      summary: summary.trim() || null,
      description: description.trim() || null,
      accent: accent.trim() || null,
      benefits: benefits.length > 0 ? benefits : null,
      audience: audience.trim() || null,
      connection: productFamilyRole.trim() || null,
      cta_label: ctaLabel.trim() || null,
      cta_href: ctaHref.trim() || null,
    };

    startTransition(async () => {
      if (isNew) {
        const res = await createProductAction(payload);
        if (res.success && res.data) {
          setSuccess("Product created successfully!");
          router.push(`/admin/products/${(res.data as { id: string }).id}`);
          router.refresh();
        } else {
          setError(res.error || "Failed to create product");
        }
      } else if (initialProduct?.id) {
        const res = await updateProductAction(initialProduct.id, payload);
        if (res.success) {
          setSuccess("Product updated successfully!");
          router.refresh();
        } else {
          setError(res.error || "Failed to update product");
        }
      }
    });
  };

  const handleDelete = () => {
    if (!initialProduct?.id) return;
    if (isCanonical) {
      alert("Canonical products (pos, ems, fms, ecommerce, crm) cannot be deleted.");
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete "${initialProduct.name}"?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteProductAction(initialProduct.id);
      if (res.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(res.error || "Failed to delete product");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Basic product identity */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Product Identity</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Product Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. KAIONEX POS or E-Commerce"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Short Name *
            </label>
            <input
              type="text"
              required
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="e.g. POS or E-Commerce"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              disabled={!isNew && isCanonical}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. pos, ems, ecommerce"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white disabled:opacity-50 focus:border-brand focus:outline-none"
            />
            {isCanonical && (
              <p className="mt-1 text-[11px] text-[#6b6b80]">
                Canonical slug cannot be changed.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "available" | "coming_soon")}
              className="w-full rounded-lg border border-white/10 bg-[#161622] px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-brand focus:ring-brand"
              />
              <span className="text-sm font-medium text-white">
                Published to Marketing Website
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Marketing Content */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Marketing Content</h2>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Fast, practical point-of-sale operations."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Hero Headline
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Sell faster.\nOperate smarter."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Listing Summary (shown in cards and index)
          </label>
          <textarea
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Short summary for product cards..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Full Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprehensive product description..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Accent Key (theme mapping)
          </label>
          <input
            type="text"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            placeholder="pos, ems, fms, ecommerce, crm"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* Audience, Ecosystem & Benefits */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Value & Audience</h2>

        <div>
          <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
            Key Benefits (one per line)
          </label>
          <textarea
            rows={4}
            value={benefitsText}
            onChange={(e) => setBenefitsText(e.target.value)}
            placeholder="Faster checkout and shorter queues&#10;Keep selling during connectivity outages"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Target Audience
            </label>
            <textarea
              rows={3}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Retail stores, supermarkets, restaurants..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              Product Family Role (Position in KAIONEX)
            </label>
            <textarea
              rows={3}
              value={productFamilyRole}
              onChange={(e) => setProductFamilyRole(e.target.value)}
              placeholder="Role in the KAIONEX product family (e.g. dedicated financial tools for business)..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-[#6b6b80]">
              Describes positioning within the brand. Does not imply technical integration or sync.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              CTA Button Label
            </label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              placeholder="Learn More"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
              CTA Button Destination URL
            </label>
            <input
              type="text"
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
              placeholder="/products/pos"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/8">
        <div>
          {!isNew && initialProduct && (
            isCanonical ? (
              <span className="text-xs text-[#6b6b80]">
                Protected canonical product
              </span>
            ) : (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                Delete Product
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#7a7a90] hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
