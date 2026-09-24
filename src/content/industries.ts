export type Industry = {
  id: string;
  name: string;
  href: string;
  eyebrow: string;
  summary: string;
  description: string;
  products: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  whoUses: string[];
};

export const industries: Industry[] = [
  {
    id: "retail",
    name: "Retail",
    href: "/industries/retail",
    eyebrow: "Billing, stock & multi-store sales",
    summary:
      "Simplify billing, inventory, customer engagement, promotions, and multi-location retail operations.",
    description:
      "KAIONEX helps retail stores and online businesses manage billing, inventory, sales, and multiple store locations from one platform — with faster checkouts and a shared inventory picture.",
    products: ["POS", "Inventory", "FMS", "E-Commerce"],
    challenges: [
      "Stock counts differ between the system and the shelf.",
      "Multi-store inventory means duplicate work in disconnected tools.",
      "Online and in-store orders live in separate systems.",
      "Slow checkout lines during peak hours hurt the experience.",
    ],
    solutions: [
      "Barcode-driven inventory keeps stock accurate store to store.",
      "A single dashboard manages stock across stores and warehouses.",
      "Dedicated software solutions for in-store sales and online storefronts.",
      "Fast POS billing with multiple payment options keeps queues moving.",
    ],
    outcomes: [
      "Faster checkout during peak hours",
      "Accurate inventory across outlets",
      "Fewer missed online and in-store orders",
      "Clearer sales visibility by store and SKU",
    ],
    whoUses: [
      "Supermarkets",
      "Grocery Stores",
      "Fashion Stores",
      "Electronics Shops",
      "Pharmacies",
      "Online Stores",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    href: "/industries/hospitality",
    eyebrow: "Service floors, kitchens & guest ops",
    summary:
      "Run restaurants, cafés, hotels, and food businesses with connected billing, kitchen workflows, inventory, and workforce visibility.",
    description:
      "KAIONEX Hospitality simplifies billing, table management, inventory, kitchen operations, and guest service in one cloud-based platform built for restaurants, hotels, cloud kitchens, and food businesses.",
    products: ["POS", "Kitchen workflows", "Inventory", "EMS", "Finance"],
    challenges: [
      "Orders get miscommunicated between front of house and kitchen.",
      "Ingredient stock runs out mid-service without timely alerts.",
      "Recipe costs aren't tracked, so menu pricing is guesswork.",
      "Tables, reservations, and walk-ins get chaotic at peak.",
    ],
    solutions: [
      "Kitchen display workflows route orders from POS to prep stations.",
      "Real-time ingredient tracking raises alerts before service is hit.",
      "Recipe and ingredient costing grounds menu margins in real costs.",
      "Table management gives a live view of seating and order status.",
    ],
    outcomes: [
      "Faster billing and POS operations",
      "Fewer kitchen ticket mistakes",
      "Real-time ingredient control",
      "Smoother peak-hour table turns",
    ],
    whoUses: [
      "Restaurants",
      "Cafés",
      "Cloud Kitchens",
      "Hotels",
      "Bakeries",
      "Food Courts",
    ],
  },
  {
    id: "construction",
    name: "Construction",
    href: "/industries/construction",
    eyebrow: "Projects, materials & site cost control",
    summary:
      "Manage projects, procurement, materials, contractors, equipment, and project finances from one platform.",
    description:
      "KAIONEX helps construction teams bring project finances, procurement, materials, contractors, and workforce visibility into clear operational focus.",
    products: ["Finance", "Procurement", "Workforce", "Project operations"],
    challenges: [
      "Project costs are hard to track across sites and suppliers.",
      "Procurement and materials data live in separate sheets.",
      "Workforce and contractor visibility is fragmented.",
      "Finance closes late because site data arrives late.",
    ],
    solutions: [
      "Centralize project finances and procurement in one workspace.",
      "Track materials and equipment against live operational data.",
      "Keep contractors and workforce information connected.",
      "Give leaders a clearer view of site cost and progress.",
    ],
    outcomes: [
      "Better project cost visibility",
      "Cleaner procurement trails",
      "Fewer spreadsheet handoffs",
      "Faster financial reporting",
    ],
    whoUses: [
      "Contractors",
      "Site supervisors",
      "Procurement teams",
      "Project accountants",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    href: "/industries/manufacturing",
    eyebrow: "Production, warehouses & quality",
    summary:
      "Optimize production planning, inventory, purchasing, warehouse operations, and quality management with complete operational visibility.",
    description:
      "KAIONEX supports manufacturing teams with connected inventory, purchasing, warehouse operations, and financial visibility across production workflows.",
    products: ["Inventory", "Procurement", "FMS", "Analytics"],
    challenges: [
      "Production, warehouses, and purchasing operate in silos.",
      "Stock movements are hard to reconcile in real time.",
      "Quality and purchasing decisions lack shared visibility.",
      "Finance sees delayed operational numbers.",
    ],
    solutions: [
      "Connect warehouse and inventory movements in one view.",
      "Keep purchasing aligned with live stock conditions.",
      "Bring operational and financial reporting closer together.",
      "Give teams shared visibility from materials to finished goods.",
    ],
    outcomes: [
      "Clearer warehouse visibility",
      "Better purchasing alignment",
      "Stronger stock control",
      "Faster operational reporting",
    ],
    whoUses: [
      "Plant managers",
      "Warehouse leads",
      "Purchasing teams",
      "Operations finance",
    ],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    href: "/industries/professional-services",
    eyebrow: "Delivery, billing & team operations",
    summary:
      "Run client delivery, invoicing, expenses, and team coordination with purpose-built KAIONEX software.",
    description:
      "KAIONEX helps professional service businesses manage invoicing, expenses, cash flow, and team operations without juggling disconnected tools.",
    products: ["FMS", "EMS", "CRM — Coming Soon", "Analytics"],
    challenges: [
      "Billing and expenses live apart from delivery work.",
      "Team capacity and attendance are tracked manually.",
      "Client follow-ups are scattered across inboxes.",
      "Leaders lack a single financial and operational view.",
    ],
    solutions: [
      "Centralize invoicing, payments, and expense tracking.",
      "Use EMS for workforce visibility and team coordination.",
      "Prepare for CRM-led client relationship workflows.",
      "Use dashboards for clearer business visibility.",
    ],
    outcomes: [
      "Cleaner invoicing workflows",
      "Better cash-flow visibility",
      "Less admin overhead",
      "A clearer operating picture",
    ],
    whoUses: [
      "Agencies",
      "Consultancies",
      "Studios",
      "Service firms",
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    href: "/industries/ecommerce",
    eyebrow: "Online orders connected to operations",
    summary:
      "Keep online catalogs, orders, payments, and fulfillment organized with dedicated KAIONEX software.",
    description:
      "For online-first and commercial sellers, KAIONEX provides purpose-built digital commerce software alongside store, workforce, and finance tools so your operations are clear and focused.",
    products: ["E-Commerce", "POS", "Inventory", "FMS"],
    challenges: [
      "Online and store operations diverge without focused tools.",
      "Order fulfillment handoffs are easy to miss.",
      "Finance reconciles channel sales late.",
      "Customer and order data sit in disparate formats.",
    ],
    solutions: [
      "Track online orders and storefront inventory.",
      "Deploy purpose-built software for counter sales and online commerce.",
      "Track fulfillment against clear order queues.",
      "Reduce channel fragmentation with the KAIONEX product brand.",
    ],
    outcomes: [
      "Fewer stock mismatches",
      "Cleaner omnichannel fulfillment",
      "Faster finance reconciliation",
      "Better order visibility",
    ],
    whoUses: [
      "Online stores",
      "Omnichannel retailers",
      "D2C brands",
      "Marketplace sellers with stores",
    ],
  },
];

export function getIndustry(id: string) {
  return industries.find((industry) => industry.id === id);
}
