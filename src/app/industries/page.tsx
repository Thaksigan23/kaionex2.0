import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "See how KAIONEX adapts to retail, hospitality, construction, manufacturing, professional services, and e-commerce.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Flexible software for the industries we serve."
        description="Every industry has different operational challenges. Explore how available POS, EMS, FMS, and E-Commerce products fit your work. CRM is coming soon."
      />
      <section className="bg-white py-16 lg:py-24">
        <Container wide className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={industry.href}
              className="rounded-3xl border border-black/5 bg-paper p-6 transition hover:-translate-y-0.5 hover:shadow-kx-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                {industry.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                {industry.name}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{industry.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {industry.products.map((product) => (
                  <span
                    key={product}
                    className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy-900"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </Container>
        <Container wide className="mt-10">
          <Button href="/book-demo" withArrow>
            Book an industry demo
          </Button>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
