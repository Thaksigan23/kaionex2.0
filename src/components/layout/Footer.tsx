import Link from "next/link";
import { Camera, Globe2, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { products } from "@/content/products";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Globe2 },
  { label: "Facebook", href: siteConfig.social.facebook, icon: MessageCircle },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Camera },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: Music2 },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <Container wide className="py-14 sm:py-16 lg:py-[4.75rem]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(10rem,0.65fr)_minmax(14rem,0.9fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="max-w-xl">
            <Logo height={32} className="rounded-sm" />
            <p className="mt-6 text-sm font-semibold text-brand-soft">
              Business software product family
            </p>
            <p className="mt-3 max-w-[31rem] text-sm leading-relaxed text-white/60">
              {siteConfig.tagline} Purpose-built software for sales, people, finance, and commerce under one brand.
            </p>

            <address className="mt-7 space-y-3 not-italic text-sm text-white/70">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>{siteConfig.contact.address}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Mail className="size-4 shrink-0 text-brand" aria-hidden />
                <span>{siteConfig.contact.email}</span>
              </a>
              {siteConfig.contact.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-3 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Phone className="size-4 shrink-0 text-brand" aria-hidden />
                  <span>{phone.label}</span>
                </a>
              ))}
              <p className="pt-0.5 text-white/55">{siteConfig.contact.hours}</p>
            </address>

            <div className="mt-7 flex flex-wrap gap-2.5" aria-label="KAIONEX social media">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/55 transition hover:border-brand/45 hover:bg-brand/10 hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-base font-semibold text-white">Quick Links</h2>
            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="KAIONEX products">
            <h2 className="text-base font-semibold text-white">Our Products</h2>
            <ul className="mt-6 space-y-4">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.href}
                    className="text-sm text-white/60 transition hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {product.name}
                    {product.status === "coming-soon" ? (
                      <span className="ml-1.5 text-xs text-amber">· Coming Soon</span>
                    ) : null}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-demo"
                  className="text-sm text-white/60 transition hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KAIONEX. All rights reserved.</p>
          <a
            href={siteConfig.parent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Powered by Techloom.ai
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/legal/privacy" className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Privacy Policy</Link>
            <Link href="/legal/terms" className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
