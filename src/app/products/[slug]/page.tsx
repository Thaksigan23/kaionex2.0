import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getProduct, products, type Product as ContentProduct, type ProductId } from "@/content/products";
import { getPublishedProductBySlug, getProductFeatures, getPublishedProducts } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProductActionButtons } from "@/components/products/ProductActionButtons";
import { ProductDemoById } from "@/components/demos/ProductDemoById";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const slugToId = {
  pos: "pos",
  ems: "ems",
  fms: "fms",
  ecommerce: "ecommerce",
  crm: "crm",
} as const;

export async function generateStaticParams() {
  try {
    const dbProducts = await getPublishedProducts();
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // Fallback to static IDs
  }
  return Object.keys(slugToId).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId[slug as keyof typeof slugToId];
  const fallback = id ? getProduct(id) : undefined;

  let dbProduct = null;
  try {
    dbProduct = await getPublishedProductBySlug(slug);
  } catch {
    // Ignore error
  }

  if (!dbProduct && !fallback) return {};

  const name = dbProduct?.name ?? fallback?.name ?? "";
  const summary = dbProduct?.summary ?? fallback?.summary ?? "";
  const href = `/products/${slug}`;

  const titles: Record<string, string> = {
    pos: "KAIONEX POS — Point of Sale",
    ems: "KAIONEX EMS — Employee & Work Management",
    fms: "KAIONEX FMS — Financial Management",
    ecommerce: "E-Commerce — Connected Online Commerce | KAIONEX",
    crm: "KAIONEX CRM — Customer Management | Coming Soon",
  };

  const title = titles[slug] || `${name} | KAIONEX`;

  return pageMetadata({
    title,
    description: summary,
    path: href,
    absoluteTitle: true,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const id = slugToId[slug as keyof typeof slugToId];
  const fallback = id ? getProduct(id) : undefined;

  let dbProduct = null;
  let dbFeatures: string[] = [];

  try {
    dbProduct = await getPublishedProductBySlug(slug);
    if (dbProduct) {
      const features = await getProductFeatures(dbProduct.id);
      dbFeatures = features.map((f) => f.feature);
    }
  } catch {
    // Database read fallback
  }

  if (!dbProduct && !fallback) {
    notFound();
  }

  // Compose product object from database with fallback values
  const product: ContentProduct = {
    id: (id || slug) as ProductId,
    name: dbProduct?.name ?? (slug === "ecommerce" ? "E-Commerce" : (fallback?.name ?? "")),
    shortName: dbProduct?.short_name ?? fallback?.shortName ?? "",
    href: `/products/${slug}`,
    status: (dbProduct ? (dbProduct.status === "available" ? "available" : "coming-soon") : (fallback?.status ?? "available")),
    statusLabel: dbProduct ? (dbProduct.status === "available" ? "Available" : "Coming Soon") : (fallback?.statusLabel ?? "Available"),
    tagline: dbProduct?.tagline ?? fallback?.tagline ?? "",
    summary: dbProduct?.summary ?? fallback?.summary ?? "",
    headline: dbProduct?.headline ?? fallback?.headline ?? "",
    description: dbProduct?.description ?? fallback?.description ?? "",
    accent: dbProduct?.accent ?? fallback?.accent ?? slug,
    features: dbFeatures.length > 0 ? dbFeatures : (fallback?.features ?? []),
    benefits: dbProduct?.benefits ?? fallback?.benefits ?? [],
    audience: dbProduct?.audience ?? fallback?.audience ?? "",
    connection: dbProduct?.connection ?? fallback?.connection ?? "",
    ctaLabel: dbProduct?.cta_label ?? fallback?.ctaLabel ?? "Learn More",
    ctaHref: dbProduct?.cta_href ?? fallback?.ctaHref ?? `/products/${slug}`,
    brandingNote: fallback?.brandingNote,
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.description,
    url: `${siteConfig.url}${product.href}`,
    ...(product.status !== "available"
      ? {
          creativeWorkStatus:
            product.status === "coming-soon" ? "Incomplete" : "Draft",
        }
      : {}),
    provider: {
      "@type": "Organization",
      name: siteConfig.parent.name,
      url: siteConfig.parent.url,
    },
  };

  return (
    <>
      <AnalyticsBeacon
        name="product_view"
        props={{ productId: product.id, location: product.href }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: product.href },
        ])) }}
      />
      <section className="gradient-hero overflow-hidden py-14 text-white lg:py-20">
        <Container wide className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <div className="min-w-0">
            <Badge tone={product.status === "available" ? "soft" : "warning"}>
              {product.statusLabel}
            </Badge>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
              {product.name}
            </p>
            <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {product.headline.replace("\n", " ")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              {product.description}
            </p>
            <div className="mt-7"><ProductActionButtons product={product} /></div>
          </div>
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-kx-md sm:p-3">
            <ProductDemoById id={product.id} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container wide className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900">
              {product.status === "available" ? "Key capabilities" : "Planned direction"}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/5 bg-paper p-6">
              <h3 className="font-semibold text-navy-900">{product.status === "available" ? "What it helps with" : "Intended value"}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>• {benefit}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 bg-paper p-6">
              <h3 className="font-semibold text-navy-900">Who it&apos;s for</h3>
              <p className="mt-2 text-sm text-slate-600">{product.audience}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-navy-900 p-6 text-white">
              <h3 className="font-semibold">Position in KAIONEX</h3>
              <p className="mt-2 text-sm text-white/70">{product.connection}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/5 bg-paper py-12">
        <Container wide>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Related products
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {products
              .filter((item) => item.id !== product.id)
              .map((item) => (
                <Button key={item.id} href={item.href} variant="light" size="sm">
                  {item.shortName}{item.status === "coming-soon" ? " · Coming Soon" : ""}
                </Button>
              ))}
          </div>
        </Container>
      </section>
      {product.status === "available" ? <FinalCTA /> : (
        <section className="bg-navy-950 py-16 text-white">
          <Container wide>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Under development</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Follow KAIONEX CRM progress.</h2>
            <p className="mt-3 max-w-xl text-white/70">CRM is being developed as a future customer management layer. Contact our team to request updates.</p>
            <div className="mt-6"><Button href="/contact?interest=crm" withArrow>Get Updates</Button></div>
          </Container>
        </section>
      )}
    </>
  );
}
