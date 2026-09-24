import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: "Explore available KAIONEX POS, EMS, FMS, and E-Commerce products. KAIONEX CRM is under development and coming soon.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="One KAIONEX. Multiple business products."
        description="Explore purpose-built software for sales, people, finance, and commerce. CRM is under development for the portfolio."
      >
        <Button href="/book-demo" withArrow>
          Book a Demo
        </Button>
      </PageHero>
      <section className="bg-white py-14 lg:py-20">
        <Container wide>
          <div className="mb-8 rounded-2xl border border-navy-800 bg-navy-900 p-5 text-white sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-soft">The KAIONEX Product Suite</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold sm:text-base">
              <span>KAIONEX POS (Sales)</span><span className="text-brand-soft" aria-hidden>·</span>
              <span>KAIONEX EMS (Workforce)</span><span className="text-brand-soft" aria-hidden>·</span>
              <span>KAIONEX FMS (Finance)</span><span className="text-brand-soft" aria-hidden>·</span>
              <span>E-Commerce (Storefront)</span><span className="text-brand-soft" aria-hidden>·</span>
              <span className="text-amber">KAIONEX CRM (Coming Soon)</span>
            </div>
            <p className="mt-3 text-xs text-white/60">Purpose-built software under one brand. Products operate independently with dedicated tools for each business area.</p>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={product.href}
              className={`group grid gap-3 px-1 py-6 transition hover:bg-paper sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-5 sm:px-5 ${product.status === "coming-soon" ? "bg-amber/5" : ""}`}
            >
              <span className="hidden font-display text-sm text-slate-400 sm:block">0{index + 1}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-semibold text-navy-900">
                  {product.name}
                </h2>
                <Badge tone={product.status === "available" ? "brand" : "warning"}>
                  {product.statusLabel}
                </Badge>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{product.summary}</p>
              </div>
              <p className="text-sm font-semibold text-brand transition group-hover:translate-x-1">
                View product →
              </p>
            </Link>
          ))}
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
