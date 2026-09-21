"use client";

import { useRef } from "react";
import { motion,
  useScroll,
  useTransform,
  type MotionValue } from "framer-motion";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConnectedWorkflow } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Customer order",
    description:
      "A purchase starts in POS or E-Commerce and is captured in KAIONEX.",
    systems: ["POS", "E-Commerce"],
    cue: "Order #1048 · sample",
  },
  {
    title: "POS / E-Commerce processes",
    description:
      "Checkout and online order flows share inventory and fulfillment context.",
    systems: ["POS", "E-Commerce"],
    cue: "Processing · channel sync",
  },
  {
    title: "Inventory updates",
    description:
      "Stock levels adjust across counters, stores, and online channels.",
    systems: ["POS", "E-Commerce"],
    cue: "Ceramic Mug · 27 → 26",
  },
  {
    title: "FMS receives financials",
    description: "Revenue and payment records stay linked to the transaction.",
    systems: ["FMS"],
    cue: "Ledger · +$12.00",
  },
  {
    title: "EMS shows operations",
    description:
      "Workforce tasks and ownership stay visible behind the sale.",
    systems: ["EMS"],
    cue: "Task · Pack & confirm",
  },
  {
    title: "CRM — future customer layer",
    description:
      "As CRM arrives, relationship history is intended to connect to commerce.",
    systems: ["CRM"],
    cue: "Coming Soon · preview",
    soon: true,
  },
];

function StepCard({
  step,
  index,
  progress,
  reduce,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
  isLast: boolean;
}) {
  const start = index / steps.length;
  const end = (index + 1) / steps.length;
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end],
    [0.65, 1, 1],
  );
  const border = useTransform(
    progress,
    [start, start + 0.1, end],
    [
      "rgba(255,255,255,0.08)",
      step.soon ? "rgba(217,119,6,0.45)" : "rgba(18,201,140,0.45)",
      step.soon ? "rgba(217,119,6,0.25)" : "rgba(18,201,140,0.25)",
    ],
  );

  return (
    <li className="relative">
      {!isLast ? (
        <div
          className="absolute left-[1.15rem] top-[3.25rem] hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-brand/40 to-white/10 sm:block"
          aria-hidden
        />
      ) : null}
      <motion.div
        style={reduce ? undefined : { opacity, borderColor: border }}
        className={cn(
          "rounded-xl border bg-white/[0.04] p-4 sm:p-5",
          step.soon ? "border-amber/25 border-dashed" : "border-white/10",
        )}
      >
        <div className="flex flex-wrap items-start gap-3">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
              step.soon
                ? "border border-amber/30 bg-amber/10 text-amber"
                : "bg-brand/15 text-brand-soft",
            )}
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold sm:text-xl">
                {step.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {step.systems.map((sys) => (
                  <span
                    key={sys}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                      step.soon
                        ? "bg-amber/15 text-amber"
                        : "bg-white/10 text-white/70",
                    )}
                  >
                    {sys}
                    {step.soon ? " · Soon" : ""}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-white/60">
              {step.description}
            </p>
            <p
              className={cn(
                "mt-3 rounded-lg px-3 py-2 text-xs font-medium",
                step.soon
                  ? "border border-dashed border-amber/30 bg-amber/10 text-amber"
                  : "border border-brand/20 bg-navy-900/70 text-brand-soft",
              )}
            >
              {step.cue}
            </p>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

export function WorkflowStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy-950 py-14 text-white sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[44px_44px] opacity-40"
        aria-hidden
      />
      <Container wide className="relative">
        <SectionHeading
          eyebrow="Connected workflow"
          title="One action. Every system stays connected."
          description="Follow a sample order through POS / E-Commerce, inventory, finance, operations — and the future CRM layer."
          tone="light"
          className="mb-10 max-w-3xl lg:mb-12"
        />

        <ConnectedWorkflow />
        <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Desktop flow legend */}
          <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-soft">
              Data path
            </p>
            <ol className="mt-4 space-y-0">
              {steps.map((step, i) => (
                <li key={step.title} className="relative pl-5">
                  {i < steps.length - 1 ? (
                    <span
                      className={cn(
                        "absolute left-[0.3rem] top-5 h-[calc(100%-0.25rem)] w-px",
                        step.soon ? "bg-amber/30" : "bg-brand/35",
                      )}
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 size-2 rounded-full",
                      step.soon ? "bg-amber" : "bg-brand",
                    )}
                    aria-hidden
                  />
                  <p
                    className={cn(
                      "pb-4 text-sm font-medium",
                      step.soon ? "text-amber/90" : "text-white/80",
                    )}
                  >
                    {step.title}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[11px] text-white/40">
              Demo narrative · fictional amounts · CRM remains Coming Soon
            </p>
          </div>

          <ol className="space-y-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                step={step}
                index={index}
                progress={progress}
                reduce={reduce}
                isLast={index === steps.length - 1}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
