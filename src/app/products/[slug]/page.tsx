import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, type Product as ContentProduct, type ProductId } from "@/content/products";
import {
  getPublishedProductBySlug,
  getProductFeatures,
  getProductMedia,
  getPublishedProducts,
} from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { ProductPageHero } from "@/components/products/ProductPageHero";
import { ProductPositioningBanner } from "@/components/products/ProductPositioningBanner";
import { ProductVisualMoment } from "@/components/products/ProductVisualMoment";
import { ProductWorkflowShowcase } from "@/components/products/ProductWorkflowShowcase";
import { ProductCapabilitiesGrid } from "@/components/products/ProductCapabilitiesGrid";
import { ProductBenefitsAudience } from "@/components/products/ProductBenefitsAudience";
import { ProductMediaGallery } from "@/components/products/ProductMediaGallery";
import { ProductRelatedNav } from "@/components/products/ProductRelatedNav";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import type { ProductMedia } from "@/lib/supabase/types";

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
  let dbMedia: ProductMedia[] = [];

  try {
    dbProduct = await getPublishedProductBySlug(slug);
    if (dbProduct) {
      const [features, media] = await Promise.all([
        getProductFeatures(dbProduct.id),
        getProductMedia(dbProduct.id).catch(() => []),
      ]);
      dbFeatures = features.map((f) => f.feature);
      dbMedia = media || [];
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: product.name, path: product.href },
            ]),
          ),
        }}
      />

      {/* 1. Cinematic Product Hero */}
      <ProductPageHero product={product} media={dbMedia} />

      {/* 2. Position in KAIONEX Banner */}
      <ProductPositioningBanner product={product} />

      {/* 3. Expansive Workstation Spotlight / Hardware & Software Deep Dive */}
      <ProductVisualMoment productId={product.id} />

      {/* 4. Asymmetric Capabilities & Feature Spotlight */}
      <ProductCapabilitiesGrid product={product} features={product.features} />

      {/* 5. Interactive Workflow Showcase */}
      <ProductWorkflowShowcase productId={product.id} />

      {/* 6. Target Audience & Business Value Split */}
      <ProductBenefitsAudience product={product} />

      {/* 6. Product Media Gallery (CMS Media or Architecture Layout) */}
      <ProductMediaGallery product={product} media={dbMedia} />

      {/* 7. Related Sister Products Navigation */}
      <ProductRelatedNav currentId={product.id} />

      {/* 8. Contextual CTA */}
      {product.status === "available" ? (
        <FinalCTA />
      ) : (
        <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
          </div>
          <Container wide className="relative z-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[11px] font-mono font-semibold text-amber uppercase">
              Under Development
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Follow KAIONEX CRM Progress
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              CRM is being developed as a future customer management layer for the KAIONEX product family. Register your interest for development updates.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/contact?interest=crm" size="lg" withArrow>
                Register Interest
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
