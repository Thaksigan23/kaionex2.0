import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";
import { WorkflowStory } from "@/components/sections/WorkflowStory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "KAIONEX connects sales, inventory, finance, and workforce workflows. CRM is coming soon.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Replace disconnected tools with one operating layer."
        description="Connect sales, stock, finance, and workforce activity across the KAIONEX products available today. CRM is being developed as a future customer layer."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/book-demo" withArrow>
            Book a Demo
          </Button>
          <Button href="/products" variant="outline">
            Explore products
          </Button>
        </div>
      </PageHero>
      <section className="bg-white py-14 lg:py-20">
        <Container wide>
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Operational problems, connected answers</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900">Workflows that cross product boundaries.</h2>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
          {[
            {
              title: "Store and online sales",
              body: "POS and E-Commerce connect orders with inventory, so teams can see sales across physical and digital channels.",
              products: "POS · E-Commerce",
            },
            {
              title: "Sales and financial visibility",
              body: "POS and E-Commerce activity can feed FMS records, connecting transactions with income, expenses, and reporting.",
              products: "POS · E-Commerce · FMS",
            },
            {
              title: "People and daily work",
              body: "EMS keeps employee profiles, tasks, attendance, and team communication together with operational context.",
              products: "EMS · Operations",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="grid gap-2 py-6 md:grid-cols-[0.75fr_1.25fr] md:gap-10"
            >
              <div><h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand">{item.products}</p></div>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
      <ProductEcosystem />
      <WorkflowStory />
      <FinalCTA />
    </>
  );
}
