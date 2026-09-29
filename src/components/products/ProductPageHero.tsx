"use client";

import { useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductDemoById } from "@/components/demos/ProductDemoById";
import { ProductActionButtons } from "@/components/products/ProductActionButtons";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import type { Product as ContentProduct } from "@/content/products";
import type { ProductMedia } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface ProductPageHeroProps {
  product: ContentProduct;
  media?: ProductMedia[];
}

export function ProductPageHero({ product, media = [] }: ProductPageHeroProps) {
  const reduce = useHydratedReducedMotion();
  const id = useId();
  const isAvailable = product.status === "available";
  const isCrm = product.id === "crm";

  // Product chapter numbers
  const chapterMap: Record<string, string> = {
    pos: "01",
    ems: "02",
    fms: "03",
    ecommerce: "04",
    crm: "05",
  };
  const chapterNum = chapterMap[product.id] || "01";

  // Scope tags per product
  const scopeTags: Record<string, string[]> = {
    pos: ["Counter Checkout", "Offline Billing", "Local Stock Records", "Shift Reports"],
    ems: ["Shift Rosters", "Time Tracking", "Task Coordination", "Team Messages"],
    fms: ["Income & Expense", "Operating Ledgers", "Cash Flow Visibility", "Invoicing"],
    ecommerce: ["Digital Storefront", "Order Intake", "Fulfillment Pipeline", "Catalog Sync"],
    crm: ["Contact Timeline", "Opportunity Stages", "Interaction Log", "Future Suite Addition"],
  };
  const tags = scopeTags[product.id] || ["Operational Software", "Independent Tool", "Cloud Ready"];

  const primaryMedia = media.length > 0 ? media[0] : null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const mediaUrl = primaryMedia
    ? `${supabaseUrl}/storage/v1/object/public/site-media/${primaryMedia.storage_path}`
    : null;

  return (
    <section
      className="relative overflow-hidden bg-navy-950 pt-12 pb-16 text-white sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
      aria-labelledby={`product-hero-${id}`}
    >
      {/* Background Architectural Mesh */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Subtle Ambient Radial Glow */}
        <div
          className={cn(
            "absolute -top-24 right-1/4 h-[32rem] w-[40rem] rounded-full blur-3xl opacity-35",
            isCrm
              ? "bg-gradient-to-br from-amber-500/15 via-amber-600/5 to-transparent"
              : "bg-gradient-to-br from-brand/20 via-teal-500/10 to-transparent",
          )}
        />
        <div className="absolute -bottom-16 -left-12 h-96 w-96 rounded-full bg-navy-800/40 blur-3xl" />

        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        {/* Top Accent Horizon Rule */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        {/* Top Technical Metadata Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 text-[10px] font-mono tracking-widest text-slate-400 uppercase sm:mb-12">
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="text-slate-400 transition hover:text-brand-soft"
            >
              KAIONEX PRODUCTS
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {isAvailable ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                AVAILABLE NOW
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-amber">
                <Clock size={10} />
                COMING SOON · UNDER DEVELOPMENT
              </span>
            )}
          </div>
        </div>

        {/* Main Hero Split */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-20">
          {/* Left Column: Editorial Content */}
          <div className="min-w-0">
            {/* Context Eyebrow */}
            <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-brand-soft">
              <span className="text-slate-400 font-semibold">{chapterNum}</span>
              <span className="text-white/20">{"//"}</span>
              <span className="font-semibold text-white tracking-widest">{product.name}</span>
            </div>

            {/* Display Headline */}
            <h1
              id={`product-hero-${id}`}
              className="font-display text-4xl font-semibold tracking-tight text-white leading-[1.08] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]"
            >
              {product.headline.split("\n").map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 1 ? (
                    <em className={cn("not-italic", isCrm ? "text-amber" : "text-brand-soft")}>
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Narrative Description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-7">
              <ProductActionButtons product={product} />
            </div>

            {/* Operational Scope Highlights */}
            <div className="mt-9 border-t border-white/[0.08] pt-5">
              <p className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                Core Capabilities
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                  >
                    <CheckCircle2 size={12} className={isCrm ? "text-amber" : "text-brand"} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layered Product UI Showcase */}
          <div className="relative min-w-0">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-950 shadow-[0_24px_72px_rgba(7,17,31,0.7)] backdrop-blur-md transition-all duration-300 hover:border-white/25"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Luxury Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  <span className="ml-2 text-[11px] font-mono tracking-wide text-slate-300">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Interactive Preview
                  </span>
                </div>
              </div>

              {/* Showcase Body: CMS Image or Interactive Demo */}
              <div className="relative p-2 sm:p-4 bg-navy-900/60">
                {mediaUrl ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-navy-950">
                    <Image
                      src={mediaUrl}
                      alt={primaryMedia?.alt_text || `${product.name} interface screenshot`}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <ProductDemoById id={product.id} />
                  </div>
                )}

                {/* Subtle status caption */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-400">
                    {isAvailable ? "Interactive UI sandbox" : "Concept wireframe"}
                  </span>
                  <span>Fictional business data</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
