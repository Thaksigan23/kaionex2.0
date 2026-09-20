"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { track } from "@/lib/analytics";
import { submitDemoRequest } from "@/lib/forms/submit";
import { isValidEmail } from "@/lib/forms/types";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "fallback" | "delivered" | "error";

type DemoFields = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  products: string[];
  message: string;
  consent: boolean;
  companyWebsite: string;
};

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

export function DemoForm({ className }: { className?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [lastPayload, setLastPayload] = useState<DemoFields | null>(null);
  const started = useRef(false);

  useEffect(() => {
    track({ name: "demo_form_started", props: { location: "book-demo" } });
  }, []);

  function markStarted() {
    if (started.current) return;
    started.current = true;
  }

  function toggleProduct(id: string) {
    markStarted();
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    setError(null);
    setState("loading");

    const form = new FormData(event.currentTarget);
    const payload: DemoFields = {
      name: String(form.get("name") || "").trim(),
      businessName: String(form.get("businessName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      industry: String(form.get("industry") || "").trim(),
      companySize: String(form.get("companySize") || "").trim(),
      products: selectedProducts,
      message: String(form.get("message") || "").trim(),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") || "").trim(),
    };

    if (
      !payload.name ||
      !payload.businessName ||
      !payload.email ||
      !payload.phone ||
      !payload.industry ||
      !payload.companySize ||
      !payload.consent
    ) {
      setState("error");
      setError("Please complete all required fields and accept the consent notice.");
      return;
    }

    if (!isValidEmail(payload.email)) {
      setState("error");
      setError("Enter a valid work email address.");
      return;
    }

    if (selectedProducts.length === 0) {
      setState("error");
      setError("Select at least one product of interest.");
      return;
    }

    const result = await submitDemoRequest({
      ...payload,
      source: "/book-demo",
    });

    if (!result.ok) {
      setState("error");
      setError(result.message);
      return;
    }

    setLastPayload(result.mode === "fallback" ? payload : null);
    if (result.mode === "delivered") {
      event.currentTarget.reset();
      setSelectedProducts([]);
    }
    setState(result.mode === "delivered" ? "delivered" : "fallback");
  }

  if (state === "delivered") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-brand/30 bg-brand/5 p-8",
          className,
        )}
        role="status"
      >
        <p className="font-display text-2xl font-semibold text-navy-900">
          Request sent
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Your demo request was delivered to the KAIONEX team. We will follow up
          using the contact details you provided.
        </p>
        <div className="mt-6">
          <Button variant="light" onClick={() => setState("idle")}>
            Submit another request
          </Button>
        </div>
      </div>
    );
  }

  if (state === "fallback") {
    const bodyText = lastPayload
      ? `Name: ${lastPayload.name}\nBusiness: ${lastPayload.businessName}\nEmail: ${lastPayload.email}\nPhone: ${lastPayload.phone}\nIndustry: ${lastPayload.industry}\nCompany size: ${lastPayload.companySize}\nProducts: ${lastPayload.products.join(", ")}\n\n${lastPayload.message}`
      : "";
    const mailto = lastPayload
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`KAIONEX demo request — ${lastPayload.businessName}`)}&body=${encodeURIComponent(bodyText)}`
      : `mailto:${siteConfig.contact.email}`;
    const whatsappHref = lastPayload
      ? siteConfig.contact.buildWhatsAppUrl(
          `Hi! I'd like to book a KAIONEX demo.\n\n${bodyText}`,
        )
      : siteConfig.contact.whatsappDemo;

    return (
      <div
        className={cn(
          "rounded-3xl border border-brand/30 bg-brand/5 p-8",
          className,
        )}
        role="status"
      >
        <p className="font-display text-2xl font-semibold text-navy-900">
          Continue via email or WhatsApp
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Your details were checked, but an automated booking destination is not
          connected yet. Nothing has been sent to KAIONEX until you continue via
          email or WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={mailto}
            external
            withArrow
            onClick={() =>
              track({
                name: "demo_form_continue_email",
                props: { location: "book-demo" },
              })
            }
          >
            Continue via Email
          </Button>
          <Button
            href={whatsappHref}
            external
            variant="secondary"
            onClick={() =>
              track({
                name: "demo_form_continue_whatsapp",
                props: { location: "book-demo" },
              })
            }
          >
            Continue via WhatsApp
          </Button>
          <Button variant="light" onClick={() => setState("idle")}>
            Edit details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={markStarted}
      className={cn(
        "relative space-y-5 rounded-3xl border border-black/5 bg-white p-6 shadow-kx-md sm:p-8",
        className,
      )}
      noValidate
    >
      <HoneypotField />
      <p className="rounded-xl bg-paper px-3 py-2 text-xs text-slate-500">
        This form validates your details first. If automated delivery is not
        configured, you&apos;ll continue via email or WhatsApp — no booking is
        claimed until it is actually sent.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" defaultValue={lastPayload?.name} />
        <Field
          label="Business Name"
          name="businessName"
          required
          autoComplete="organization"
          defaultValue={lastPayload?.businessName}
        />
        <Field
          label="Work Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={lastPayload?.email}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          defaultValue={lastPayload?.phone}
        />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Industry</span>
          <select
            name="industry"
            required
            className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
            defaultValue={lastPayload?.industry ?? ""}
          >
            <option value="" disabled>
              Select industry
            </option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.name}>
                {industry.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">
            Company Size
          </span>
          <select
            name="companySize"
            required
            className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
            defaultValue={lastPayload?.companySize ?? ""}
          >
            <option value="" disabled>
              Select size
            </option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-navy-900">
          Products Interested In
        </legend>
        <div className="flex flex-wrap gap-2">
          {products.map((product) => {
            const selected = selectedProducts.includes(product.id);
            return (
              <button
                key={product.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleProduct(product.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  selected
                    ? "border-brand bg-brand/10 text-navy-900"
                    : "border-black/10 bg-paper text-slate-600 hover:border-brand/40",
                )}
              >
                {product.shortName}
                {product.status !== "available" ? (
                  <span className="ml-1 text-[10px] text-amber">
                    ({product.statusLabel})
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy-900">Message</span>
        <textarea
          name="message"
          defaultValue={lastPayload?.message}
          rows={4}
          className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
          placeholder="Tell us about your operations, locations, and goals."
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="consent"
          defaultChecked={lastPayload?.consent}
          className="mt-1 size-4 rounded border-black/20"
          required
        />
        <span>
          I agree to be contacted about KAIONEX demos, pricing, and onboarding.
          We will only use your details to respond to this request.
        </span>
      </label>

      {error ? (
        <p
          className="rounded-xl border border-rose/30 bg-rose/5 px-3 py-2 text-sm text-rose"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        withArrow
        disabled={state === "loading"}
        aria-busy={state === "loading"}
      >
        {state === "loading" ? "Sending..." : "Continue"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy-900">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
      />
    </label>
  );
}
