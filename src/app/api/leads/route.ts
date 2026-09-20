import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/forms/deliver";
import type { LeadPayload } from "@/lib/forms/types";
import { isValidEmail } from "@/lib/forms/types";

export const runtime = "nodejs";

function isLeadPayload(value: unknown): value is LeadPayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  const text = (key: string, max: number, required = false) =>
    typeof record[key] === "string" &&
    (record[key] as string).length <= max &&
    (!required || Boolean((record[key] as string).trim()));
  if (!(["demo", "contact", "crm_updates"] as unknown[]).includes(record.kind)) return false;
  if (!text("name", 120, true) || !text("email", 254, true) || !isValidEmail(record.email as string)) return false;
  if (!text("source", 200, true) || !text("submittedAt", 40, true)) return false;
  if (Number.isNaN(Date.parse(record.submittedAt as string))) return false;
  if (typeof record.consent !== "boolean" || !text("message", 5000)) return false;
  if (record.companyWebsite !== undefined && !text("companyWebsite", 300)) return false;
  if (record.phone !== undefined && !text("phone", 50)) return false;
  if (record.turnstileToken !== undefined && !text("turnstileToken", 3000)) return false;
  if (record.kind === "demo") {
    return text("businessName", 160, true) && text("phone", 50, true) &&
      text("industry", 100, true) && text("companySize", 50, true) &&
      Array.isArray(record.products) && record.products.length > 0 && record.products.length <= 5 &&
      record.products.every((item: unknown) => typeof item === "string" && item.length <= 50);
  }
  return text("message", 5000, true);
}

function normalizeLead(payload: LeadPayload): LeadPayload {
  const normalize = (value: string) => value.trim().replace(/\u0000/g, "");
  const common = {
    ...payload,
    name: normalize(payload.name),
    email: normalize(payload.email),
    message: normalize(payload.message),
    source: normalize(payload.source),
  };
  return payload.kind === "demo"
    ? { ...common, kind: "demo", phone: normalize(payload.phone), businessName: normalize(payload.businessName),
        industry: normalize(payload.industry), companySize: normalize(payload.companySize),
        products: payload.products.map(normalize) }
    : { ...common, kind: payload.kind, phone: payload.phone ? normalize(payload.phone) : undefined };
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 16_384) {
    return NextResponse.json({ ok: false, error: "validation", message: "Request is too large." }, { status: 413 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        message: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  if (!isLeadPayload(body)) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        message: "Unrecognized lead payload.",
      },
      { status: 400 },
    );
  }

  const result = await deliverLead(normalizeLead(body));
  const status = result.ok
    ? 200
    : result.error === "validation"
      ? 400
      : result.error === "rate_limit"
        ? 429
        : 502;

  return NextResponse.json(result, { status });
}
