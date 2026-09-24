import { getSignInUrl, getSiteUrl } from "@/lib/env";

const whatsappNumber = "94741455445";

function whatsappUrl(text: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Central public company / marketing configuration.
 * Prefer this module over hard-coding contact or destination URLs in components.
 */
export const siteConfig = {
  name: "KAIONEX",
  tagline: "One KAIONEX. Multiple business products.",
  description:
    "KAIONEX is a business software product family from Techloom.ai for sales, employees, finance, and commerce. CRM is coming soon.",
  /** Production default: https://kaionex.app — override with NEXT_PUBLIC_SITE_URL */
  url: getSiteUrl(),
  parent: {
    name: "Techloom.ai",
    url: "https://techloom.ai",
  },
  contact: {
    address: "30, Palaly Road, Thirunelvely North, Jaffna 40000",
    email: "info@kaionex.app",
    phones: [
      { label: "074 14 55 445", href: "tel:+94741455445" },
      { label: "075 55 44 514", href: "tel:+94755544514" },
    ],
    hours: "Mon to Sat: 09:00 AM to 05:00 PM",
    whatsappNumber,
    whatsapp: whatsappUrl("Hi! I'd like to learn more about KAIONEX."),
    whatsappDemo: whatsappUrl("Hi! I'd like to book a KAIONEX demo."),
    buildWhatsAppUrl: whatsappUrl,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/112677991/",
    facebook: "https://www.facebook.com/profile.php?id=61587226020424",
    instagram: "https://www.instagram.com/kaionex.erp/",
    tiktok: "https://www.tiktok.com/@kaionex.erp",
  },
  /**
   * Sign In — no KAIONEX customer application exists yet.
   * Keep architecture ready; keep enabled/confirmed false and hide UI.
   */
  signIn: {
    href: getSignInUrl() ?? "",
    confirmed: false,
    enabled: false,
    note: "No KAIONEX application/login available — Sign In hidden from UI",
  },
  forms: {
    /**
     * Intended production delivery: email to CONTACT_RECIPIENT_EMAIL (or contact.email).
     * Until a transactional email provider is configured, /api/leads returns fallback
     * (honest Email/WhatsApp handoff). Optional LEAD_WEBHOOK_URL remains a bridge.
     */
    leadsEndpoint: "/api/leads",
    deliveryMethod: "email" as const,
    deliveryStatus: "prepared" as const,
  },
  links: {
    privacy: "/legal/privacy",
    terms: "/legal/terms",
  },
  ogImage: "/opengraph-image",
};

export type SiteConfig = typeof siteConfig;
