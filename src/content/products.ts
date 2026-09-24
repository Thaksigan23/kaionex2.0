export type ProductStatus = "available" | "early-access" | "coming-soon";

export type ProductId = "pos" | "ems" | "fms" | "ecommerce" | "crm";

export type Product = {
  id: ProductId;
  name: string;
  shortName: string;
  href: string;
  status: ProductStatus;
  statusLabel: string;
  tagline: string;
  summary: string;
  headline: string;
  description: string;
  accent: string;
  features: string[];
  benefits: string[];
  audience: string;
  connection: string;
  ctaLabel: string;
  ctaHref: string;
  /** Internal note only — not shown to customers. */
  brandingNote?: string;
};

/**
 * Central product configuration.
 * All badges, menus, and CTAs should derive status from here.
 *
 * Open: E-Commerce final branded product name (display as "E-Commerce" for now).
 * See BUSINESS_DECISIONS.md.
 */
export const products: Product[] = [
  {
    id: "pos",
    name: "KAIONEX POS",
    shortName: "POS",
    href: "/products/pos",
    status: "available",
    statusLabel: "Available",
    tagline: "Fast, practical point-of-sale operations.",
    summary:
      "Sell faster with offline-ready billing, multi-payment checkout, and practical inventory tracking built for your counter.",
    headline: "Sell faster.\nOperate smarter.",
    description:
      "KAIONEX POS is a fast, offline-ready billing system built for retail counters, restaurant floors, and service desks. It keeps sales, local inventory, and payments recorded when internet drops, then syncs automatically with the cloud when you reconnect.",
    accent: "pos",
    features: [
      "Fast checkout with barcode and SKU scanning",
      "Cash, card, and digital payment methods",
      "Split payments, discounts, and tax configuration",
      "Digital and printed receipts",
      "Counter stock tracking and low-stock alerts",
      "Multi-counter and multi-location operations",
      "Offline-ready billing with automatic cloud sync",
      "Sales reporting and role-based access",
    ],
    benefits: [
      "Faster checkout and shorter queues",
      "Keep selling during connectivity outages",
      "Accurate records for every register and counter",
      "A focused checkout flow for counter staff",
    ],
    audience:
      "Retail stores, supermarkets, restaurants, cafés, and any business with a physical counter or till.",
    connection:
      "Part of the KAIONEX product family, serving the counter and sales operations of your business.",
    ctaLabel: "Learn More",
    ctaHref: "/products/pos",
  },
  {
    id: "ems",
    name: "KAIONEX EMS",
    shortName: "EMS",
    href: "/products/ems",
    status: "available",
    statusLabel: "Available",
    tagline: "Manage your people and work in a dedicated workspace.",
    summary:
      "Employee management, tasks, work visibility, team communication, and workforce workflows — purpose-built under the KAIONEX brand.",
    headline: "Your people and work.\nOrganized in one workspace.",
    description:
      "KAIONEX EMS brings employee and work management together in one focused system. Manage staff records, assign tasks, coordinate work activity, and keep teams communicating with the workforce tools your operations need.",
    accent: "ems",
    features: [
      "Employee management and workforce profiles",
      "Task management and internal coordination",
      "Work and employee monitoring",
      "Team communication / chat",
      "Attendance tracking with exception flags",
      "Leave management and shift/roster planning",
      "Role-based permissions",
      "Workforce reports across branches",
    ],
    benefits: [
      "People and work stay in one organized system",
      "Clearer accountability by role, task, and location",
      "Less time lost to manual roster and coordination work",
      "Dedicated workforce visibility for store and facility managers",
    ],
    audience:
      "Any business with hourly or shift-based staff — retail, hospitality, and service teams especially.",
    connection:
      "Part of the KAIONEX product family, focused on employee management and team coordination.",
    ctaLabel: "Learn More",
    ctaHref: "/products/ems",
  },
  {
    id: "fms",
    name: "KAIONEX FMS",
    shortName: "FMS",
    href: "/products/fms",
    status: "available",
    statusLabel: "Available",
    tagline: "Financial visibility and control.",
    summary:
      "Accounting, invoicing, expenses, cash flow, and reporting from a secure finance workspace built for business owners.",
    headline: "Know where\nyour money is going.",
    description:
      "KAIONEX FMS simplifies financial management for businesses of all sizes. Manage invoices, track income and expenses, monitor cash flow, and generate accurate financial reports from one secure platform.",
    accent: "fms",
    features: [
      "Accounting and invoice management",
      "Payments and expense tracking",
      "Cash flow visibility",
      "Tax configuration",
      "Financial reporting and revenue analytics",
      "Project-based billing where needed",
      "Exportable statements for accountants",
      "Comprehensive ledger and transaction management",
    ],
    benefits: [
      "Up-to-date view of revenue and expenses",
      "Faster month-end reporting",
      "Clear cash flow and invoice tracking",
      "Exportable records for accountants",
    ],
    audience:
      "Growing businesses that have outgrown spreadsheet accounting and need dedicated financial management.",
    connection:
      "Part of the KAIONEX product family, providing dedicated financial tools for your business.",
    ctaLabel: "Learn More",
    ctaHref: "/products/fms",
  },
  {
    id: "ecommerce",
    /** Final branded product name pending — keep "E-Commerce" centralized here. */
    name: "E-Commerce",
    shortName: "E-Commerce",
    href: "/products/ecommerce",
    status: "available",
    statusLabel: "Available",
    tagline: "Purpose-built digital commerce.",
    summary:
      "Online storefronts, product catalogs, order tracking, and digital checkout for growing brands.",
    headline: "Commerce built\nfor modern brands.",
    description:
      "E-Commerce provides dedicated digital selling software for modern businesses. Manage product catalogs, process online orders, handle digital payments, and track fulfillment in a focused online commerce environment.",
    accent: "ecommerce",
    brandingNote: "Final branded KAIONEX product name pending confirmation.",
    features: [
      "Product catalog and online order management",
      "Storefront stock tracking and low-stock alerts",
      "Customer and payment workflows",
      "Order tracking and fulfillment visibility",
      "Promotions and discount configurations",
      "Sales analytics for online revenue",
      "Digital receipts and shipping notifications",
      "Fewer missed orders with clear dispatch queues",
    ],
    benefits: [
      "Dedicated storefront management",
      "Clear digital catalog and order tracking",
      "Streamlined fulfillment from order to dispatch",
      "Comprehensive digital sales reporting",
    ],
    audience:
      "Retail stores and commercial businesses managing online storefronts, catalog sales, and customer deliveries.",
    connection:
      "Part of the KAIONEX product family, dedicated to online storefronts and order management.",
    ctaLabel: "Learn More",
    ctaHref: "/products/ecommerce",
  },
  {
    id: "crm",
    name: "KAIONEX CRM",
    shortName: "CRM",
    href: "/products/crm",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    tagline: "Customer relationships planned for the KAIONEX family.",
    summary:
      "Client and customer relationship management planned for the KAIONEX product suite — currently under development.",
    headline: "Customer relationships\nplanned for the KAIONEX family.",
    description:
      "KAIONEX CRM is currently being developed as a future product in the KAIONEX portfolio. It is designed to provide dedicated customer and client relationship tools. Concept preview — not yet released.",
    accent: "crm",
    features: [
      "Planned: centralized customer and client profiles",
      "Planned: relationship history and interaction logs",
      "Planned: follow-up and communication context",
      "Planned: segmentation for targeted campaigns",
    ],
    benefits: [
      "Future customer management under the familiar KAIONEX design language",
      "Dedicated tools for client profiles and communication history",
      "Modular addition to your KAIONEX product toolkit when available",
    ],
    audience:
      "Retail, hospitality, and service businesses that want updates as dedicated customer management joins KAIONEX.",
    connection:
      "Coming soon — planned as a future customer relationship product in the KAIONEX portfolio.",
    ctaLabel: "Get Updates",
    ctaHref: "/contact?interest=crm",
  },
];

const STATUS_LABELS: Record<ProductStatus, string> = {
  available: "Available",
  "early-access": "Early Access",
  "coming-soon": "Coming Soon",
};

/** Primary conversion CTA derived from status (single source of truth). */
export function getProductActionCta(product: Product): {
  label: string;
  href: string;
} {
  switch (product.status) {
    case "available":
      return { label: "Book a Demo", href: "/book-demo" };
    case "early-access":
      return { label: "Book a Demo", href: "/book-demo" };
    case "coming-soon":
      return { label: "Get Updates", href: "/contact?interest=crm" };
  }
}

export function getStatusLabel(status: ProductStatus) {
  return STATUS_LABELS[status];
}

export function getProduct(id: ProductId) {
  return products.find((product) => product.id === id);
}

export function isProductAvailable(id: ProductId) {
  return getProduct(id)?.status === "available";
}

/** Product areas and roadmap capabilities across the KAIONEX portfolio */
export const ecosystemFlows = [
  {
    id: "pos-fms",
    from: "pos" as const,
    to: "fms" as const,
    title: "POS & FMS",
    description: "Counter sales operations alongside dedicated financial ledgers.",
  },
  {
    id: "ecom-pos",
    from: "ecommerce" as const,
    to: "pos" as const,
    title: "E-Commerce & POS",
    description: "Online storefront and counter software built for commercial teams.",
  },
  {
    id: "ecom-fms",
    from: "ecommerce" as const,
    to: "fms" as const,
    title: "E-Commerce & FMS",
    description: "Digital commerce orders alongside structured business accounts.",
  },
  {
    id: "ems-ops",
    from: "ems" as const,
    to: "pos" as const,
    title: "EMS & Operations",
    description: "Employee coordination and work management for store teams.",
  },
  {
    id: "crm-sales",
    from: "crm" as const,
    to: "ecommerce" as const,
    title: "CRM & Commerce",
    description: "Coming soon — planned customer relationship tools for the KAIONEX family.",
  },
] as const;
