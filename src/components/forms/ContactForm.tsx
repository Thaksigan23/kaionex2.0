"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { submitContactRequest } from "@/lib/forms/submit";
import { isValidEmail } from "@/lib/forms/types";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "fallback" | "delivered" | "error";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  companyWebsite: string;
};

export function ContactForm({ className }: { className?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<ContactFields | null>(null);
  const started = useRef(false);

  useEffect(() => {
    track({ name: "contact_form_started", props: { location: "contact" } });
  }, []);

  function markStarted() {
    if (started.current) return;
    started.current = true;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    setError(null);
    setState("loading");

    const form = new FormData(event.currentTarget);
    const payload: ContactFields = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      message: String(form.get("message") || "").trim(),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") || "").trim(),
    };
    const crmInterest = new URLSearchParams(window.location.search).get("interest") === "crm";

    if (!payload.name || !payload.email || !payload.message || !payload.consent) {
      setState("error");
      setError("Please complete the required fields and accept the consent notice.");
      return;
    }

    if (!isValidEmail(payload.email)) {
      setState("error");
      setError("Enter a valid email address.");
      return;
    }

    const result = await submitContactRequest({
      ...payload,
      phone: payload.phone || undefined,
      kind: crmInterest ? "crm_updates" : "contact",
      source: crmInterest ? "/products/crm" : "/contact",
    });

    if (!result.ok) {
      setState("error");
      setError(result.message);
      return;
    }

    setLastPayload(result.mode === "fallback" ? payload : null);
    if (result.mode === "delivered") event.currentTarget.reset();
    setState(result.mode === "delivered" ? "delivered" : "fallback");
  }

  if (state === "delivered") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-brand/30 bg-brand/5 p-6 sm:p-8",
          className,
        )}
        role="status"
      >
        <p className="font-display text-2xl font-semibold text-navy-900">
          Message sent
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Your message was delivered to the KAIONEX team. We will reply using the
          contact details you provided.
        </p>
        <div className="mt-6">
          <Button variant="light" onClick={() => setState("idle")}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  if (state === "fallback") {
    const bodyText = lastPayload
      ? `Name: ${lastPayload.name}\nEmail: ${lastPayload.email}\nPhone: ${lastPayload.phone || "—"}\n\n${lastPayload.message}`
      : "";
    const mailto = lastPayload
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(new URLSearchParams(window.location.search).get("interest") === "crm" ? `KAIONEX CRM update request — ${lastPayload.name}` : `KAIONEX contact — ${lastPayload.name}`)}&body=${encodeURIComponent(bodyText)}`
      : `mailto:${siteConfig.contact.email}`;

    return (
      <div
        className={cn(
          "rounded-3xl border border-brand/30 bg-brand/5 p-6 sm:p-8",
          className,
        )}
        role="status"
      >
        <p className="font-display text-2xl font-semibold text-navy-900">
          Continue via email or WhatsApp
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Automated delivery is not connected yet. Nothing has been sent until
          you continue via email or WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={mailto} external withArrow>
            Continue via Email
          </Button>
          <Button href={siteConfig.contact.whatsapp} external variant="secondary">
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
        Prefer email or WhatsApp immediately? Use the contact details beside this
        form. Automated delivery uses the same secure lead endpoint as demos when
        configured.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            defaultValue={lastPayload?.name}
            className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={lastPayload?.email}
            className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy-900">
          Phone <span className="font-normal text-slate-500">(optional)</span>
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={lastPayload?.phone}
          className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy-900">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          defaultValue={lastPayload?.message}
          className="w-full rounded-xl border border-black/10 bg-paper px-3 py-2.5 outline-none transition focus:border-brand"
          placeholder="How can we help?"
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
          I agree to be contacted about this enquiry. We will only use your
          details to respond.
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
        {state === "loading" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
