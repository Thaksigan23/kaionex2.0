import {
  getContactRecipientEmail,
  getLeadFromEmail,
  getLeadWebhookSecret,
  getLeadWebhookUrl,
} from "@/lib/env";
import type { LeadPayload, LeadSubmitResult } from "@/lib/forms/types";
import { isValidEmail } from "@/lib/forms/types";
import { formatLeadEmail } from "@/lib/forms/email";

/**
 * Server-side lead delivery boundary.
 *
 * Business target: deliver demo/contact details by **email** to the KAIONEX team.
 * Preferred recipient env: CONTACT_RECIPIENT_EMAIL (do not invent providers/credentials).
 *
 * Current behavior:
 * - If LEAD_WEBHOOK_URL is set, POST there (temporary bridge until email provider is wired).
 * - Otherwise return fallback so the UI can use honest Email/WhatsApp handoff.
 *
 * Never logs PII. Never reports "delivered" unless a configured destination succeeds.
 */
export async function deliverLead(
  payload: LeadPayload,
): Promise<LeadSubmitResult> {
  if (payload.companyWebsite && payload.companyWebsite.trim() !== "") {
    // Silent success for bots — do not deliver.
    return { ok: true, mode: "fallback" };
  }

  if (!payload.consent) {
    return {
      ok: false,
      error: "validation",
      message: "Consent is required.",
    };
  }

  if (!isValidEmail(payload.email)) {
    return {
      ok: false,
      error: "validation",
      message: "Enter a valid email address.",
    };
  }

  if (payload.kind === "demo") {
    if (
      !payload.name ||
      !payload.businessName ||
      !payload.phone ||
      !payload.industry ||
      !payload.companySize ||
      payload.products.length === 0
    ) {
      return {
        ok: false,
        error: "validation",
        message: "Please complete all required demo fields.",
      };
    }
  } else if (!payload.name || !payload.message) {
    return {
      ok: false,
      error: "validation",
      message: "Please complete all required contact fields.",
    };
  }

  const recipient = getContactRecipientEmail();

  const webhook = getLeadWebhookUrl();
  if (!webhook) {
    // Email provider not connected — honest UI fallback.
    return { ok: true, mode: "fallback" };
  }

  if (!recipient || !isValidEmail(recipient)) {
    return { ok: false, error: "server", message: "Delivery is unavailable. Please continue via email or WhatsApp." };
  }

  try {
    const secret = getLeadWebhookSecret();
    const from = getLeadFromEmail();
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({
        kind: payload.kind,
        source: payload.source,
        submittedAt: payload.submittedAt,
        deliveryTarget: "email",
        recipient,
        ...(from && isValidEmail(from) ? { emailMessage: formatLeadEmail(payload, recipient, from) } : {}),
        ...(payload.kind === "demo"
          ? {
              name: payload.name,
              businessName: payload.businessName,
              email: payload.email,
              phone: payload.phone,
              industry: payload.industry,
              companySize: payload.companySize,
              products: payload.products,
              message: payload.message,
            }
          : {
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              message: payload.message,
            }),
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (response.status === 429) {
      return {
        ok: false,
        error: "rate_limit",
        message: "Too many requests. Please try again shortly.",
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        error: "server",
        message: "We could not deliver your request. Please try email or WhatsApp.",
      };
    }

    // HTTP 2xx only proves the bridge accepted a request. Require explicit
    // confirmation that its email provider accepted this recipient.
    const acknowledgement: unknown = await response.json().catch(() => null);
    if (acknowledgement && typeof acknowledgement === "object" &&
      "emailAccepted" in acknowledgement && acknowledgement.emailAccepted === true &&
      "recipient" in acknowledgement && acknowledgement.recipient === recipient) {
      return { ok: true, mode: "delivered" };
    }
    return { ok: false, error: "server", message: "Delivery could not be confirmed. Please continue via email or WhatsApp." };
  } catch {
    return {
      ok: false,
      error: "network",
      message: "Network error. Please try email or WhatsApp.",
    };
  }
}
