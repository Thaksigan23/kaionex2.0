"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  HeroCommandCenter,
  HeroMobileVisual,
} from "@/components/sections/HeroCommandCenter";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden gradient-hero text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[48px_48px] opacity-35 [mask-image:radial-gradient(ellipse_at_70%_40%,black_15%,transparent_70%)]" />
        <motion.div
          className="absolute -right-20 top-8 hidden size-[24rem] rounded-full bg-brand/10 blur-3xl sm:block"
          animate={reduce ? undefined : { x: [0, 16, 0], y: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -left-20 bottom-4 size-[18rem] rounded-full bg-teal/12 blur-3xl" />
      </div>

      <Container
        wide
        className="relative grid items-center gap-6 pb-8 pt-6 sm:gap-7 sm:pb-10 sm:pt-7 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-6 lg:pb-10 lg:pt-8 xl:gap-8 xl:pb-12"
      >
        <div className="relative z-10 max-w-md lg:max-w-[26rem] xl:max-w-lg">
          <Badge tone="soft" className="mb-3">
            Powered by{" "}
            <Link
              href={siteConfig.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              Techloom.ai
            </Link>
          </Badge>

          <h1 className="font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-balance sm:text-[2.15rem] lg:text-[2.35rem] xl:text-[2.55rem]">
            Run Your Entire Business
            <span className="mt-1 block text-brand-soft">with KAIONEX</span>
          </h1>

          <p className="mt-3.5 max-w-[32rem] text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
            Connect sales, employees, finance and commerce in one ecosystem —
            with CRM joining soon.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href="/book-demo"
              size="lg"
              withArrow
              onClick={() =>
                track({ name: "cta_book_demo", props: { location: "hero" } })
              }
            >
              Book a Demo
            </Button>
            <Button
              href="/products"
              size="lg"
              variant="outline"
              onClick={() =>
                track({
                  name: "cta_explore_products",
                  props: { location: "hero" },
                })
              }
            >
              Explore Products
            </Button>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/40 sm:text-[11px]">
            <li className="border-r border-white/15 pr-3 last:border-0">
              POS · Available
            </li>
            <li className="border-r border-white/15 pr-3">EMS · Available</li>
            <li className="border-r border-white/15 pr-3">FMS · Available</li>
            <li className="border-r border-white/15 pr-3">
              E-Commerce · Available
            </li>
            <li className="text-amber">CRM · Coming Soon</li>
          </ul>
        </div>

        <div className="relative z-0 min-w-0 lg:-mr-2 xl:-mr-4">
          <HeroMobileVisual />
          <HeroCommandCenter className="mx-auto w-full" />
        </div>
      </Container>

      {/* Soft handoff into the light trust strip */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-black/20"
        aria-hidden
      />
    </section>
  );
}
