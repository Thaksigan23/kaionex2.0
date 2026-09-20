/**
 * Public / server environment accessors for the marketing site.
 * Defaults are production-safe. Preview deployments can override SITE_URL.
 */

const DEFAULT_SITE_URL = "https://kaionex.app";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function readPublic(name: string): string | undefined {
  const value = process.env[name];
  if (!value || !value.trim()) return undefined;
  return value.trim();
}

/** Canonical marketing site URL (no trailing slash). */
export function getSiteUrl(): string {
  const explicit = readPublic("NEXT_PUBLIC_SITE_URL");
  if (explicit) return stripTrailingSlash(explicit);

  return DEFAULT_SITE_URL;
}

/** Application Sign In URL — empty until business confirms. */
export function getSignInUrl(): string | undefined {
  return readPublic("NEXT_PUBLIC_SIGN_IN_URL");
}

export function isSignInConfirmed(): boolean {
  return Boolean(getSignInUrl());
}

/** Server-only: optional lead delivery webhook. Never expose to the client. */
export function getLeadWebhookUrl(): string | undefined {
  const value = process.env.LEAD_WEBHOOK_URL?.trim();
  return value || undefined;
}

export function getLeadWebhookSecret(): string | undefined {
  const value = process.env.LEAD_WEBHOOK_SECRET?.trim();
  return value || undefined;
}

/** Server-only lead recipient. Override for non-production environments. */
export function getContactRecipientEmail(): string | undefined {
  const value = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  return value || "info@kaionex.app";
}

/** Server-only verified sender; required by a future email provider. */
export function getLeadFromEmail(): string | undefined {
  const value = process.env.LEAD_FROM_EMAIL?.trim();
  return value || undefined;
}

/**
 * Intended lead delivery channel for production.
 * Email provider is not connected until credentials are configured.
 */
export function getLeadDeliveryMethod(): "email" {
  return "email";
}

/** Optional future Turnstile site key (public). Do not enable UI without a key. */
export function getTurnstileSiteKey(): string | undefined {
  return readPublic("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
}

/** Optional analytics provider id — no SDK installed until configured. */
export function getAnalyticsProvider(): string | undefined {
  return readPublic("NEXT_PUBLIC_ANALYTICS_PROVIDER");
}

export const envDefaults = {
  siteUrl: DEFAULT_SITE_URL,
} as const;
