import type { Metadata } from "next";
import { Clock, Layers3 } from "lucide-react";
import { products as fallbackProducts } from "@/content/products";
import { getPublishedProducts } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProductSnippet } from "@/components/demos/ProductVisuals";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Products — KAIONEX Business Software Suite",
  description:
    "Explore purpose-built KAIONEX products: POS for counter sales, EMS for workforce, FMS for finance, E-Commerce for digital stores, and CRM (under development).",
  path: "/products",
});

export default async function ProductsPage() {
  let displayProducts: {
    id: string;
    slug: string;
    name: string;
    shortName: string;
    tagline: string;
    href: string;
    status: "available" | "coming-soon" | "early-access";
    statusLabel: string;
    summary: string;
    connection: string;
  }[] = fallbackProducts.map((p) => ({
    id: p.id,
    slug: p.id,
    name: p.id === "ecommerce" ? "E-Commerce" : p.name,
    shortName: p.shortName,
    tagline: p.tagline,
    href: p.href,
    status: p.status,
    statusLabel: p.statusLabel,
    summary: p.summary,
    connection: p.connection,
  }));

  try {
    const dbProducts = await getPublishedProducts();
    if (dbProducts && dbProducts.length > 0) {
      displayProducts = dbProducts.map((p) => {
        const fallback = fallbackProducts.find((f) => f.id === p.slug);
        return {
          id: p.slug,
          slug: p.slug,
          name: p.slug === "ecommerce" ? "E-Commerce" : p.name,
          shortName: p.short_name ?? fallback?.shortName ?? p.name,
          tagline: p.tagline ?? fallback?.tagline ?? "",
          href: `/products/${p.slug}`,
          status: p.status === "available" ? ("available" as const) : ("coming-soon" as const),
          statusLabel: p.status === "available" ? "Available" : "Coming Soon",
          summary: p.summary ?? fallback?.summary ?? "",
          connection: p.connection ?? fallback?.connection ?? "",
        };
      });
    }
  } catch {
    // Graceful fallback to approved static content if database is unreachable
  }

  return (
    <div className="bg-navy-950 text-white min-h-screen">
      {/* 1. Showroom Page Hero */}
      <section className="relative overflow-hidden pt-16 pb-14 sm:pt-20 sm:pb-20 border-b border-white/[0.08]">
        {/* Subtle Architectural Atmosphere */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-20 left-1/2 h-[28rem] w-[45rem] -translate-x-1/2 rounded-full bg-brand/12 blur-3xl opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35" />
        </div>

        <Container wide className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono tracking-wider text-slate-300 uppercase mb-5">
            <Layers3 size={14} className="text-brand" />
            <span>KAIONEX BUSINESS SOFTWARE SUITE</span>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto text-balance">
            One KAIONEX.<br />Multiple ways to run your <em className="not-italic text-brand-soft">business.</em>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Sales. People. Finance. Commerce. Dedicated, independent software products engineered under one brand to give each operational team clarity and speed.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/book-demo" size="lg" withArrow>
              Book a Demo
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Talk to Our Team
            </Button>
          </div>

          {/* Suite Availability Strip */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-navy-900/60 px-6 py-3 text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-brand font-semibold">
              <span className="size-2 rounded-full bg-brand animate-pulse" />
              4 LIVE PRODUCTS: POS · EMS · FMS · E-COMMERCE
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-amber">
              <Clock size={12} />
              1 COMING SOON: CRM (UNDER DEVELOPMENT)
            </span>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Product Showroom Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container wide>
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-white/[0.08] pb-6">
            <div>
              <p className="text-[10px] font-mono tracking-widest text-brand-soft uppercase">
                PORTFOLIO CATALOG
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                Explore Available & Upcoming Products
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              5 Independent Software Solutions
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-1">
            {displayProducts.map((product, index) => {
              const isAvailable = product.status === "available";
              const isCrm = product.slug === "crm";
              const isPos = product.slug === "pos";
              const isEms = product.slug === "ems";
              const isFms = product.slug === "fms";
              const isEcom = product.slug === "ecommerce";

              return (
                <div
                  key={product.slug}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-brand/40 shadow-[0_16px_40px_rgba(7,17,31,0.5)]",
                    isCrm
                      ? "border-amber/25 bg-navy-900/40 hover:border-amber/50"
                      : "border-white/10 bg-navy-900/60 hover:bg-navy-900/80",
                  )}
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    {/* Left: Product Information */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] font-mono text-xs font-bold text-slate-300">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl group-hover:text-brand-soft transition-colors">
                          {product.name}
                        </h3>
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold font-mono tracking-wider text-brand">
                            <span className="size-1.5 rounded-full bg-brand" />
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-[10px] font-semibold font-mono tracking-wider text-amber">
                            <Clock size={11} />
                            COMING SOON
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-medium text-brand-soft">
                        {product.tagline}
                      </p>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                        {product.summary}
                      </p>

                      {/* Position in KAIONEX role note */}
                      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Position in KAIONEX: </span>
                        <span>{product.connection}</span>
                      </div>

                      <div className="mt-6 flex items-center gap-4">
                        <Button href={product.href} withArrow>
                          {isCrm ? "View Concept Preview" : `Explore ${product.shortName}`}
                        </Button>
                        <span className="text-xs font-mono text-slate-400">
                          Dedicated module
                        </span>
                      </div>
                    </div>

                    {/* Right: Rich UI Preview Snippet */}
                    <div className="rounded-xl border border-white/10 bg-navy-950 p-4 shadow-inner">
                      <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-2 text-[10px] font-mono text-slate-400">
                        <span className="text-brand font-semibold">
                          {product.shortName.toUpperCase()} · WORKSPACE
                        </span>
                        <span>SAMPLE PREVIEW</span>
                      </div>
                      <div className="py-2">
                        <ProductSnippet
                          product={
                            isPos
                              ? "pos"
                              : isEms
                                ? "ems"
                                : isFms
                                  ? "fms"
                                  : isEcom
                                    ? "ecommerce"
                                    : "crm"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Final Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
