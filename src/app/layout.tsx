import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "KAIONEX — Connected Business Software Ecosystem",
    template: "%s · KAIONEX",
  },
  description: siteConfig.description,
  applicationName: "KAIONEX",
  keywords: [
    "KAIONEX",
    "POS",
    "ERP",
    "FMS",
    "EMS",
    "E-Commerce",
    "CRM",
    "Techloom.ai",
    "business software",
    "Sri Lanka ERP",
  ],
  authors: [{ name: "Techloom.ai", url: siteConfig.parent.url }],
  creator: "Techloom.ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "KAIONEX",
    title: "KAIONEX — Connected Business Software Ecosystem",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "KAIONEX business software ecosystem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIONEX — Connected Business Software Ecosystem",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [{
    "@type": "WebSite",
    name: "KAIONEX",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.parent.name,
      url: siteConfig.parent.url,
    },
    }, {
      "@type": "Organization",
      name: siteConfig.parent.name,
      url: siteConfig.parent.url,
    }],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-h-dvh flex-col overflow-x-clip bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
