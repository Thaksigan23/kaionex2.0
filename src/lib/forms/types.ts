/**
 * Typed lead / form payloads for demo and contact flows.
 * Destination (CRM, email, webhook, DB) is decided server-side — never in UI.
 */

export type LeadKind = "demo" | "contact" | "crm_updates";

export type DemoLeadPayload = {
  kind: "demo";
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  products: string[];
  message: string;
  consent: boolean;
  /** Honeypot — must be empty for humans. */
  companyWebsite?: string;
  source: string;
  submittedAt: string;
  /** Optional future Turnstile token — ignored until configured. */
  turnstileToken?: string;
};

export type ContactLeadPayload = {
  kind: "contact" | "crm_updates";
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
  companyWebsite?: string;
  source: string;
  submittedAt: string;
  turnstileToken?: string;
};

export type LeadPayload = DemoLeadPayload | ContactLeadPayload;

export type LeadSubmitSuccess =
  | { ok: true; mode: "delivered" }
  | { ok: true; mode: "fallback" };

export type LeadSubmitFailure = {
  ok: false;
  error: "validation" | "network" | "server" | "rate_limit";
  message: string;
};

export type LeadSubmitResult = LeadSubmitSuccess | LeadSubmitFailure;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
