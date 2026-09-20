import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/lib/site";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "KAIONEX is a connected business software ecosystem developed by Techloom.ai for sales, people, finance, and commerce operations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About KAIONEX"
        title="Built by Techloom.ai to run modern businesses."
        description="KAIONEX is the connected business software ecosystem developed by Techloom.ai. Available products cover POS, employee and work management, finance, and E-Commerce; CRM is under development."
      >
        <Button href={siteConfig.parent.url} external variant="outline">
          Visit Techloom.ai
        </Button>
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <Container wide className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-navy-900">
              What KAIONEX is
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              KAIONEX brings sales, employee and work management, finance, and
              online commerce into one product ecosystem. POS, EMS, FMS, and
              E-Commerce are available today. CRM is being developed as a future
              customer and client management product.
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Techloom.ai is the company behind KAIONEX. The product is designed
              to help teams connect day-to-day work across counters, stores,
              people, and financial records, with modules selected for their
              operational needs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-black/5 bg-paper p-4"
              >
                <p className="font-semibold text-navy-900">{product.shortName}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {product.statusLabel}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container wide className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-paper p-6">
            <h3 className="font-display text-xl font-semibold text-navy-900">
              Vision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              To make business operations easier to understand and manage across
              the software products a team uses each day.
            </p>
          </div>
          <div className="rounded-3xl border border-black/5 bg-paper p-6">
            <h3 className="font-display text-xl font-semibold text-navy-900">
              Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              To connect sales, workforce, finance, and commerce in KAIONEX,
              while developing CRM as the future customer relationship layer.
            </p>
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
