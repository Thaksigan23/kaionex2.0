import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/content/industries";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

const productLinks: Record<string, string> = {
  POS: "/products/pos", EMS: "/products/ems", FMS: "/products/fms",
  Finance: "/products/fms", Workforce: "/products/ems", "E-Commerce": "/products/ecommerce",
  "CRM — Coming Soon": "/products/crm",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: `${industry.name} Software`,
    description: industry.summary,
    path: industry.href,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: industry.href },
        ])) }}
      />
      <PageHero
        eyebrow={industry.eyebrow}
        title={`${industry.name} operations, connected.`}
        description={industry.description}
      >
        <Button href="/book-demo" withArrow>
          Book a Demo
        </Button>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <Container wide className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <aside className="self-start rounded-2xl border border-black/5 bg-paper p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold text-navy-900">Built around your work</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Relevant KAIONEX products and operational areas for {industry.name.toLowerCase()} teams.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {industry.products.map((product) => productLinks[product] ? (
                <Link key={product} href={productLinks[product]} className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand">{product} ↗</Link>
              ) : <span key={product} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{product}</span>)}
            </div>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Teams this may fit</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{industry.whoUses.join(" · ")}</p>
          </aside>
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900">From daily friction to a connected workflow</h2>
            <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
              {industry.challenges.map((challenge, index) => (
                <div key={challenge} className="grid gap-2 py-5 sm:grid-cols-[1fr_1fr] sm:gap-8">
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">The challenge</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{challenge}</p></div>
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand">KAIONEX approach</p><p className="mt-2 text-sm leading-relaxed text-navy-900">{industry.solutions[index]}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Container wide className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-navy-900">
            Operational outcomes
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industry.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl border border-black/5 bg-paper px-4 py-5 text-sm font-medium text-navy-900"
              >
                {outcome}
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
