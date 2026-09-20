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
      "Sell faster with offline-ready billing, multi-payment checkout, and inventory that stays in sync across counters and stores.",
    headline: "Sell faster.\nOperate smarter.",
    description:
      "KAIONEX POS is a fast, offline-ready billing system built for retail counters, restaurant floors, and service desks. It keeps every sale, stock update, and payment recorded locally when the internet drops, then syncs automatically when you reconnect.",
    accent: "pos",
    features: [
      "Fast checkout with barcode and SKU scanning",
      "Cash, card, and digital payment methods",
      "Split payments, discounts, and tax configuration",
      "Digital and printed receipts",
      "Inventory synchronization and low-stock alerts",
      "Multi-counter and multi-location operations",
      "Offline-ready billing with automatic sync",
      "Sales reporting and role-based access",
    ],
    benefits: [
      "Faster checkout and shorter queues",
      "Keep selling during outages",
      "One inventory view across every counter",
      "A focused checkout flow for counter staff",
    ],
    audience:
      "Retail stores, supermarkets, restaurants, cafés, and any business with a physical counter or till.",
    connection:
      "Sales feed financial records in FMS and keep inventory synchronized across the ecosystem.",
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
    tagline: "Manage your people and work from one connected workspace.",
    summary:
      "Employee management, tasks, work monitoring, team communication, and workforce workflows — connected to the same KAIONEX ecosystem as sales and inventory.",
    headline: "Your people and work.\nOne connected workspace.",
    description:
      "KAIONEX EMS brings employee and work management together in one system. Manage people, assign tasks, monitor work activity, and keep teams communicating — with the workforce workflows your operations need.",
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
      "People and work stay in one system instead of scattered tools",
      "Clearer accountability by role, task, and location",
      "Less time lost to manual roster and coordination work",
      "Workforce context stays connected to store operations",
    ],
    audience:
      "Any business with hourly or shift-based staff — retail, hospitality, and service teams especially.",
    connection:
      "Employees, roles, tasks, and workforce information stay connected to business operations across the platform.",
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
      "Accounting, invoicing, expenses, cash flow, and reporting from one secure finance workspace connected to live sales data.",
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
      "Books that stay connected to sales activity",
    ],
    benefits: [
      "No duplicate data entry between sales and accounts",
      "Up-to-date view of revenue and expenses",
      "Faster month-end reporting",
      "Clearer records for review",
    ],
    audience:
      "Growing businesses that have outgrown spreadsheet accounting but want finance connected to operations.",
    connection:
      "Sales from POS and commerce flow into financial records without manual re-entry.",
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
    tagline: "Connected digital commerce.",
    summary:
      "Online orders, product catalogs, and inventory that stay synchronized with physical stores and finance.",
    headline: "Commerce that\nstays connected.",
    description:
      "E-Commerce connects online selling with the rest of your KAIONEX operations. Product management, online orders, inventory synchronization, payments, and order tracking stay linked to POS and finance — so omnichannel demand shares one operational picture.",
    accent: "ecommerce",
    brandingNote: "Final branded KAIONEX product name pending confirmation.",
    features: [
      "Product catalog and online order management",
      "Inventory synchronization with stores",
      "Customer and payment workflows",
      "Order tracking and fulfillment visibility",
      "Connected POS and in-store operations",
      "Promotions and multi-location retail support",
      "Sales analytics across channels",
      "Fewer missed online and in-store orders",
    ],
    benefits: [
      "Online and physical sales stay synchronized",
      "One inventory picture for every channel",
      "Faster fulfillment with fewer handoff gaps",
      "Clearer sales visibility by store and SKU",
    ],
    audience:
      "Retail stores and e-commerce businesses managing billing, inventory, customers, and multiple locations together.",
    connection:
      "Online and physical sales stay synchronized with inventory and FMS records. CRM is a future customer layer.",
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
    tagline: "Customer relationships are joining the KAIONEX ecosystem.",
    summary:
      "Client and customer management for the connected KAIONEX ecosystem — currently under development.",
    headline: "Customer relationships\nare joining the KAIONEX ecosystem.",
    description:
      "KAIONEX CRM is being developed to bring customer and client management into the connected KAIONEX ecosystem. It is designed to connect customer relationships with the rest of your business operations. It is not released yet.",
    accent: "crm",
    features: [
      "Planned: centralized customer and client profiles",
      "Planned: relationship history connected to commerce",
      "Planned: follow-up and communication context",
      "Planned: segmentation for targeted offers",
    ],
    benefits: [
      "Bring client management into the same ecosystem as sales and operations",
      "Reduce handoffs between disconnected customer tools",
      "Prepare for relationship workflows tied to commerce",
    ],
    audience:
      "Retail, hospitality, and service businesses that want updates as unified customer management joins KAIONEX.",
    connection:
      "Coming soon — customer activity is intended to connect with transactions and commerce across KAIONEX.",
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

/** Meaningful product-to-product data flows for the ecosystem visualization */
export const ecosystemFlows = [
  {
    id: "pos-fms",
    from: "pos" as const,
    to: "fms" as const,
    title: "POS → FMS",
    description: "Checkout totals and payments flow into financial records.",
  },
  {
    id: "ecom-pos",
    from: "ecommerce" as const,
    to: "pos" as const,
    title: "E-Commerce ↔ POS",
    description: "Online and in-store inventory and orders stay synchronized.",
  },
  {
    id: "ecom-fms",
    from: "ecommerce" as const,
    to: "fms" as const,
    title: "E-Commerce → FMS",
    description: "Online revenue posts into the same finance workspace.",
  },
  {
    id: "ems-ops",
    from: "ems" as const,
    to: "pos" as const,
    title: "EMS → Operations",
    description: "Staff roles, tasks, and permissions stay linked to store operations.",
  },
  {
    id: "crm-sales",
    from: "crm" as const,
    to: "ecommerce" as const,
    title: "CRM → Commerce",
    description: "Coming soon — customer activity is intended to connect to transactions.",
  },
] as const;
