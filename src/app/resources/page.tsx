import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Explore KAIONEX products, pricing, industry workflows, FAQs, and ways to contact the team.",
  path: "/resources",
});

const resources = [
  {
    title: "Product overview",
    description: "Explore POS, FMS, E-Commerce, EMS, and CRM in the ecosystem.",
    href: "/products",
  },
  {
    title: "Pricing guide",
    description: "Compare Starter, Pro, and Enterprise plans in USD or LKR.",
    href: "/pricing",
  },
  {
    title: "Industry workflows",
    description: "See how KAIONEX products fit retail, hospitality, and more.",
    href: "/industries",
  },
  {
    title: "Book a demo",
    description: "Request a walkthrough tailored to your operations.",
    href: "/book-demo",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Explore KAIONEX with clear next steps."
        description="Browse the products, compare plans, explore industry workflows, and find answers before requesting a demo."
      />
      <section className="bg-white py-16 lg:py-20">
        <Container wide className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="rounded-3xl border border-black/5 bg-paper p-6 transition hover:shadow-kx-md"
            >
              <h2 className="font-display text-xl font-semibold text-navy-900">
                {resource.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {resource.description}
              </p>
            </Link>
          ))}
        </Container>
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  );
}
