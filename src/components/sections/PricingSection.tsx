"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  pricingPlans,
  type BillingCycle,
  type Currency,
} from "@/content/pricing";
import { track } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PricingSection({ compact = false }: { compact?: boolean }) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = useMemo(() => pricingPlans, []);

  return (
    <section className={cn("bg-white py-14 sm:py-16 lg:py-20", compact && "py-11 lg:py-14")}>
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Plans that scale with your business"
            description="All plans include industry-specific customization. Features and modules are configured based on your business type and selected package."
            align="center"
            className="mb-8"
          />
        </Reveal>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-full border border-black/10 bg-paper p-1">
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold capitalize transition",
                  cycle === option
                    ? "bg-navy-900 text-white"
                    : "text-slate-600 hover:text-navy-900",
                )}
                onClick={() => {
                  setCycle(option);
                  track({
                    name: "pricing_period_change",
                    props: { period: option, location: "pricing" },
                  });
                }}
              >
                {option}
                {option === "yearly" ? (
                  <span className="ml-1 text-[10px] uppercase tracking-wide text-brand-soft">
                    Save
                  </span>
                ) : null}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full border border-black/10 bg-paper p-1">
            {(["USD", "LKR"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  currency === option
                    ? "bg-navy-900 text-white"
                    : "text-slate-600 hover:text-navy-900",
                )}
                onClick={() => {
                  setCurrency(option);
                  track({
                    name: "pricing_currency_change",
                    props: { currency: option, location: "pricing" },
                  });
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const amount =
              cycle === "monthly"
                ? plan.price.monthly[currency]
                : plan.price.yearlyMonthlyEquivalent[currency];
            const savings = plan.price.yearlySavings[currency];
            const availableFeatures = plan.features.filter(
              (feature) => !feature.startsWith("CRM"),
            );
            const hasComingSoonCrm = plan.features.some((feature) =>
              feature.startsWith("CRM"),
            );

            return (
              <Reveal key={plan.id}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-kx-sm",
                    plan.popular
                      ? "border-brand/40 shadow-kx-md ring-1 ring-brand/20"
                      : "border-black/5",
                  )}
                >
                  {plan.popular ? (
                    <Badge className="absolute -top-3 left-6">Most Popular</Badge>
                  ) : null}
                  <h3 className="font-display text-2xl font-semibold text-navy-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                  <div className="mt-6">
                    {amount == null ? (
                      <p className="font-display text-4xl font-semibold text-navy-900">
                        Custom
                      </p>
                    ) : (
                      <div>
                        <p className="font-display text-4xl font-semibold text-navy-900">
                          {formatPrice(amount, currency)}
                          <span className="text-base font-medium text-slate-500">
                            /month
                          </span>
                        </p>
                        {cycle === "yearly" ? (
                          <p className="mt-1 text-xs text-slate-500">
                            Billed yearly · shown as monthly equivalent
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-slate-500">
                            Billed monthly
                          </p>
                        )}
                      </div>
                    )}
                    {cycle === "yearly" && savings != null ? (
                      <p className="mt-2 text-sm text-brand">
                        Save {formatPrice(savings, currency)} per year vs monthly
                      </p>
                    ) : null}
                    {amount == null ? (
                      <p className="mt-2 text-sm text-slate-500">
                        Quote based on users, branches, modules, and integrations.
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {plan.featureIntro}
                  </p>
                  <ul className="mt-3 flex-1 space-y-2">
                    {(compact
                      ? availableFeatures.slice(0, 8)
                      : availableFeatures
                    ).map(
                      (feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                  {hasComingSoonCrm ? (
                    <p className="mt-4 rounded-lg border border-amber/20 bg-amber/5 px-3 py-2 text-xs font-medium text-slate-700">
                      CRM — Coming Soon. Not included as a released module today.
                    </p>
                  ) : null}
                  <div className="mt-8">
                    <Button
                      href={plan.cta.href}
                      variant={plan.popular ? "primary" : "secondary"}
                      className="w-full"
                      withArrow
                    >
                      {plan.cta.label}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Starter and Pro prices shown in {currency}. Yearly prices are{" "}
          <strong className="font-semibold text-slate-700">
            monthly equivalents
          </strong>{" "}
          derived from published yearly savings on kaionex.app. Enterprise is
          quoted to your needs — plan features stay the same.
        </p>
      </Container>
    </section>
  );
}
