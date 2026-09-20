export type Currency = "USD" | "LKR";
export type BillingCycle = "monthly" | "yearly";

export type PricingPlan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  description: string;
  popular?: boolean;
  cta: { label: string; href: string };
  price: {
    monthly: { USD: number | null; LKR: number | null };
    yearlyMonthlyEquivalent: { USD: number | null; LKR: number | null };
    yearlySavings: { USD: number | null; LKR: number | null };
  };
  featureIntro: string;
  features: string[];
};

/**
 * Pricing sourced from the live kaionex.app pricing UI (Sep 2026).
 * Yearly savings: USD $35 / $60 · LKR 10,500 / 18,000.
 * Yearly monthly-equivalent derived from those savings against listed monthly rates.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "Basic billing and inventory for small shops and single-outlet businesses",
    cta: { label: "Book a Demo", href: "/book-demo" },
    price: {
      monthly: { USD: 15, LKR: 4500 },
      yearlyMonthlyEquivalent: { USD: 12, LKR: 3625 },
      yearlySavings: { USD: 35, LKR: 10500 },
    },
    featureIntro: "Includes",
    features: [
      "Finance Management",
      "Inventory & Stock Management",
      "Sales & Order Management",
      "CRM — Coming Soon",
      "Procurement Management",
      "Real Time Business Dashboard",
      "Business Reports & Analytics",
      "Role Based User Access",
      "Single Business Location",
      "Up to 5 Users",
      "Secure Cloud ERP Platform",
      "Onboarding & Training Support",
      "Email & Chat Support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "Powerful features for growing businesses and multi-outlet operations",
    popular: true,
    cta: { label: "Book a Demo", href: "/book-demo" },
    price: {
      monthly: { USD: 25, LKR: 7500 },
      yearlyMonthlyEquivalent: { USD: 20, LKR: 6000 },
      yearlySavings: { USD: 60, LKR: 18000 },
    },
    featureIntro: "Everything in Starter, plus",
    features: [
      "Financial Accounting & Reporting",
      "EMS (Employee & Work Management)",
      "Multi-Branch Management",
      "Supplier & Procurement Management",
      "Workflow Automation",
      "Business Intelligence & Analytics",
      "Advanced Inventory Control",
      "CRM — Coming Soon",
      "Role-Based Access & Permissions",
      "API Access & Integrations",
      "10+ Users",
      "Priority Email & Chat Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Advanced tools for large businesses and multi-branch management",
    cta: { label: "Request a Quote", href: "/contact" },
    price: {
      monthly: { USD: null, LKR: null },
      yearlyMonthlyEquivalent: { USD: null, LKR: null },
      yearlySavings: { USD: null, LKR: null },
    },
    featureIntro: "Everything in Pro, plus",
    features: [
      "Unlimited Users",
      "Multi Branches & Business Locations",
      "Enterprise Security & Access Control",
      "Custom Workflows & Process Automation",
      "Multi-Language Support",
      "API Integrations",
      "Data Migration & Implementation Support",
      "Scalable Cloud Infrastructure",
      "Custom Integrations",
    ],
  },
];

export const pricingNotes = [
  "All plans include industry-specific customization. Features and modules are configured based on your business type and selected package.",
  "Starter and Pro prices shown for the selected currency. Enterprise is quoted to your needs — plan features stay the same.",
  "CRM is under development and listed as Coming Soon — it is not delivered as a released module today.",
];
