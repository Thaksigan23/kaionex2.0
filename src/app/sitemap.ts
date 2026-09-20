import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/solutions",
    "/industries",
    "/pricing",
    "/about",
    "/contact",
    "/book-demo",
    "/resources",
    "/legal/privacy",
    "/legal/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}${product.href}`,
      priority: 0.8,
    })),
    ...industries.map((industry) => ({
      url: `${siteConfig.url}${industry.href}`,
      priority: 0.7,
    })),
  ];
}
