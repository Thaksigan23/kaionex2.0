import type { LeadPayload } from "@/lib/forms/types";

export type LeadEmail = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character] ?? character);

const clean = (value: string) => value.trim().replace(/[\r\n]+/g, " ");

/** Provider-independent internal lead message. The sender must be verified. */
export function formatLeadEmail(payload: LeadPayload, to: string, from: string): LeadEmail {
  const title = payload.kind === "demo" ? "Demo Request" :
    payload.kind === "crm_updates" ? "CRM Update Request" : "Contact Enquiry";
  const subject = `[KAIONEX] ${title} — ${clean(payload.kind === "demo" ? payload.businessName : payload.name)}`;
  const rows: Array<[string, string | undefined]> = [
    ["Lead Type", title],
    ["Name", payload.name],
    ["Company", payload.kind === "demo" ? payload.businessName : undefined],
    ["Business Email", payload.email],
    ["Phone", payload.phone],
    ["Industry", payload.kind === "demo" ? payload.industry : undefined],
    ["Company Size", payload.kind === "demo" ? payload.companySize : undefined],
    ["Selected Products", payload.kind === "demo" ? payload.products.join(", ") : undefined],
    ["Message", payload.message || undefined],
    ["Source Page", payload.source],
    ["Submitted At", payload.submittedAt],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return {
    to, from, replyTo: payload.email, subject,
    text: rows.map(([label, value]) => `${label}: ${value ?? ""}`).join("\n"),
    html: `<h1>${escapeHtml(title)}</h1><table>${rows.map(([label, value]) =>
      `<tr><th style="text-align:left;padding:6px 16px 6px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value ?? "")}</td></tr>`
    ).join("")}</table>`,
  };
}
