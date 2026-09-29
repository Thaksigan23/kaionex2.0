"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import type { ProductMedia } from "@/lib/supabase/types";
import type { Product as ContentProduct } from "@/content/products";
import { cn } from "@/lib/utils";

interface ProductMediaGalleryProps {
  product: ContentProduct;
  media: ProductMedia[];
}

export function ProductMediaGallery({ product, media }: ProductMediaGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const reduce = useHydratedReducedMotion();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  // If zero media, render a high-tech architectural UI composition
  if (!media || media.length === 0) {
    return (
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
        <Container wide>
          <div className="rounded-2xl border border-white/10 bg-navy-900/40 p-8 text-center sm:p-12">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
              <Monitor size={24} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">
              {product.name} Interface Architecture
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              High-throughput operational views engineered for counter speed and clear daily reporting.
            </p>

            {/* Illustrative blueprint layer */}
            <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3 text-left">
                <div className="rounded-lg border border-white/10 bg-navy-950 p-4">
                  <span className="text-[10px] font-mono text-brand">01 / WORKSPACE</span>
                  <strong className="mt-1 block text-sm text-white">Active Register View</strong>
                  <p className="mt-1 text-xs text-slate-400">Low-latency order input and instant ticket balance.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-navy-950 p-4">
                  <span className="text-[10px] font-mono text-brand">02 / TELEMETRY</span>
                  <strong className="mt-1 block text-sm text-white">Shift Cash Ledger</strong>
                  <p className="mt-1 text-xs text-slate-400">Drawer totals, tenders, and automated reconciliation.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-navy-950 p-4">
                  <span className="text-[10px] font-mono text-brand">03 / REPORTING</span>
                  <strong className="mt-1 block text-sm text-white">Daily Operational P&L</strong>
                  <p className="mt-1 text-xs text-slate-400">Immediate visibility into daytime volume and volume trends.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Single media item: Large luxury hero presentation
  if (media.length === 1) {
    const item = media[0];
    const src = `${supabaseUrl}/storage/v1/object/public/site-media/${item.storage_path}`;
    return (
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
        <Container wide>
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
              Software Presentation
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">
              Visual overview of {product.name}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900 shadow-[0_24px_72px_rgba(7,17,31,0.6)]">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2">{product.name} Workspace View</span>
              </div>
            </div>
            <div className="relative aspect-[16/9] w-full bg-navy-950">
              <Image
                src={src}
                alt={item.alt_text || `${product.name} screenshot`}
                fill
                className="object-cover object-top"
              />
            </div>
            {item.alt_text && (
              <div className="border-t border-white/[0.08] bg-white/[0.02] px-5 py-3 text-xs text-slate-400">
                {item.alt_text}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  // Multi-media gallery with interactive selector
  const activeMedia = media[selectedIdx] || media[0];
  const activeSrc = `${supabaseUrl}/storage/v1/object/public/site-media/${activeMedia.storage_path}`;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      <Container wide>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
              Product Visuals ({media.length})
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">
              Inside {product.name}
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Click thumbnails to inspect interface screens
          </p>
        </div>

        {/* Main Stage Display */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900 shadow-[0_24px_72px_rgba(7,17,31,0.6)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-2 font-semibold text-slate-300">
                {activeMedia.alt_text || `Screen 0${selectedIdx + 1}`}
              </span>
            </div>
            <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] text-slate-400">
              {selectedIdx + 1} of {media.length}
            </span>
          </div>

          <div className="relative aspect-[16/9] w-full bg-navy-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMedia.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeSrc}
                  alt={activeMedia.alt_text || `${product.name} screenshot`}
                  fill
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {media.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const thumbSrc = `${supabaseUrl}/storage/v1/object/public/site-media/${item.storage_path}`;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "relative aspect-[16/10] overflow-hidden rounded-xl border transition-all duration-200 text-left",
                  isSelected
                    ? "border-brand shadow-[0_0_16px_rgba(0,179,122,0.3)] ring-2 ring-brand/50"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30",
                )}
              >
                <Image
                  src={thumbSrc}
                  alt={item.alt_text || `Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 rounded bg-navy-950/80 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
