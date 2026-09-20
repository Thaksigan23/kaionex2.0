/**
 * Lightweight analytics event layer.
 * No provider SDK is installed. Events are no-ops until
 * NEXT_PUBLIC_ANALYTICS_PROVIDER is configured and wired.
 *
 * NEVER send name, email, phone, or message contents.
 */

export type AnalyticsEventName =
  | "cta_book_demo"
  | "cta_explore_products"
  | "product_view"
  | "pricing_view"
  | "pricing_currency_change"
  | "pricing_period_change"
  | "demo_form_started"
  | "demo_form_continue_email"
  | "demo_form_continue_whatsapp"
  | "contact_form_started"
  | "crm_get_updates";

export type AnalyticsProps = {
  location?: string;
  productId?: string;
  planId?: string;
  currency?: string;
  period?: string;
};

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  props?: AnalyticsProps;
};

const BLOCKED_PROP_KEYS = new Set([
  "name",
  "email",
  "phone",
  "message",
  "businessName",
  "business_name",
]);

function sanitizeProps(props?: AnalyticsProps): AnalyticsProps | undefined {
  if (!props) return undefined;
  const clean: AnalyticsProps = {};
  for (const [key, value] of Object.entries(props)) {
    if (BLOCKED_PROP_KEYS.has(key)) continue;
    if (value == null || value === "") continue;
    (clean as Record<string, string>)[key] = String(value);
  }
  return Object.keys(clean).length ? clean : undefined;
}

/**
 * Track a marketing event. Safe to call from client components.
 * Does nothing until a provider is configured.
 */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const safe = {
    name: event.name,
    props: sanitizeProps(event.props),
  };

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim();
  if (!provider) {
    return;
  }

  // Integration point — wire the chosen provider here after confirmation.
  // Example shape only; do not invent vendor calls.
  const bridge = (
    window as Window & {
      __kaionexAnalytics?: (event: typeof safe) => void;
    }
  ).__kaionexAnalytics;

  if (typeof bridge === "function") {
    bridge(safe);
  }
}
