import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Use for product titles that already contain the KAIONEX name. */
  absoluteTitle?: boolean;
};

/** Keep canonical and social URLs aligned for every indexable page. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · KAIONEX`;
  const url = new URL(path, `${siteConfig.url}/`).toString();
  const image = new URL(siteConfig.ogImage, `${siteConfig.url}/`).toString();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "KAIONEX",
      url,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: "KAIONEX business software ecosystem" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Navigation hierarchy for search engines; no visual breadcrumb is required. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${siteConfig.url}/`).toString(),
    })),
  };
}
