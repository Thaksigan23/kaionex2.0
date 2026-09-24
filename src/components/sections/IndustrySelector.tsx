"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { industries } from "@/content/industries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductSnippet } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

export function IndustrySelector() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  const reduce = useReducedMotion();

  return (
    <section className="bg-paper py-14 sm:py-16 lg:py-20">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Industries"
            title="Built for the way your industry works."
            description="Select an industry to see how KAIONEX products support the workflows that matter most."
            className="mb-8"
          />
        </Reveal>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {industries.map((industry) => (
            <button
              key={industry.id}
              type="button"
              aria-pressed={activeId === industry.id}
              onClick={() => setActiveId(industry.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                activeId === industry.id
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-black/10 bg-white text-slate-700 hover:border-navy-900/30",
              )}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="rounded-xl border border-black/[0.07] bg-white p-5 shadow-kx-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {active.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                {active.name}
              </h3>
              <p className="mt-3 text-slate-500">{active.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.products.map((product) => (
                  <span
                    key={product}
                    className="rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-navy-900"
                  >
                    {product}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button href={active.href} variant="secondary" withArrow>
                  Explore {active.name}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-black/[0.07] bg-navy-900 p-5 text-white shadow-kx-md sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-soft">
                How KAIONEX helps
              </p>
              <div className="mt-4"><ProductSnippet product={active.products.some(p => p.includes("POS")) ? "pos" : active.products.some(p => p.includes("EMS")) ? "ems" : "ecommerce"} /></div>
              <ul className="mt-4 space-y-3">
                {active.solutions.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/industries"
                className="mt-6 inline-block text-sm font-semibold text-brand-soft hover:text-white"
              >
                View all industries →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
