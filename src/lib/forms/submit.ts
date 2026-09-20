import type { LeadPayload, LeadSubmitResult } from "@/lib/forms/types";
import { siteConfig } from "@/lib/site";

/**
 * Client submission entry — posts to the leads API.
 * UI must treat `fallback` as "not delivered to KAIONEX yet".
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<LeadSubmitResult> {
  try {
    const response = await fetch(siteConfig.forms.leadsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      return {
        ok: false,
        error: "rate_limit",
        message: "Too many requests. Please try again shortly.",
      };
    }

    const data = (await response.json()) as LeadSubmitResult;
    if (!response.ok && !("ok" in data)) {
      return {
        ok: false,
        error: "server",
        message: "Something went wrong. Please try email or WhatsApp.",
      };
    }
    return data;
  } catch {
    return {
      ok: false,
      error: "network",
      message: "Network error. Please try email or WhatsApp.",
    };
  }
}

/** @deprecated Prefer submitLead — kept as a named demo boundary for clarity. */
export async function submitDemoRequest(
  payload: Omit<Extract<LeadPayload, { kind: "demo" }>, "kind" | "source" | "submittedAt"> & {
    source?: string;
  },
): Promise<LeadSubmitResult> {
  return submitLead({
    kind: "demo",
    source: payload.source ?? "/book-demo",
    submittedAt: new Date().toISOString(),
    name: payload.name,
    businessName: payload.businessName,
    email: payload.email,
    phone: payload.phone,
    industry: payload.industry,
    companySize: payload.companySize,
    products: payload.products,
    message: payload.message,
    consent: payload.consent,
    companyWebsite: payload.companyWebsite,
    turnstileToken: payload.turnstileToken,
  });
}

export async function submitContactRequest(
  payload: Omit<Extract<LeadPayload, { kind: "contact" | "crm_updates" }>, "kind" | "source" | "submittedAt"> & {
    source?: string;
    kind?: "contact" | "crm_updates";
  },
): Promise<LeadSubmitResult> {
  return submitLead({
    kind: payload.kind ?? "contact",
    source: payload.source ?? "/contact",
    submittedAt: new Date().toISOString(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    consent: payload.consent,
    companyWebsite: payload.companyWebsite,
    turnstileToken: payload.turnstileToken,
  });
}
