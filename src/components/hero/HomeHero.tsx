"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroProductScene } from "@/components/hero/HeroProductScene";
import { HeroProductSceneMobile } from "@/components/hero/HeroProductSceneMobile";
import { siteConfig } from "@/lib/site";
import { track } from "@/lib/analytics";

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 pt-10 pb-16 text-white sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
      aria-label="KAIONEX business software suite"
    >
      {/* Background Architectural Mesh & Subtle Horizon Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-24 right-1/4 h-[32rem] w-[40rem] rounded-full bg-gradient-to-br from-brand/15 via-teal-500/5 to-transparent blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-12 h-80 w-80 rounded-full bg-navy-800/50 blur-3xl opacity-40" />

        {/* Technical Grid Pattern Masked Softly */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

        {/* Top Border Horizon */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        {/* Top Metadata Line */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5 text-[11px] font-mono tracking-wider text-slate-400 uppercase sm:mb-10">
          <span>KAIONEX / BUSINESS SOFTWARE SUITE</span>
          <Link
            href={siteConfig.parent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-brand-soft transition"
          >
            <span>BY TECHLOOM.AI</span>
            <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Main Hero Grid Split */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 xl:gap-20">
          {/* Left Column: Refined Editorial Marketing Content */}
          <div className="max-w-xl">
            {/* Clean Eyebrow */}
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-brand-soft">
              One brand · Multiple business products
            </p>

            {/* Controlled Headline Scale */}
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.08] text-balance">
              One KAIONEX.
              <br />
              Multiple ways to run
              <br />
              your <em className="not-italic text-brand-soft">business.</em>
            </h1>

            {/* Concise Value Description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Sales, workforce, finance, and online commerce. Purpose-built
              business software for different parts of your company.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button
                href="/book-demo"
                size="lg"
                withArrow
                onClick={() => track({ name: "cta_book_demo", props: { location: "hero" } })}
              >
                Book a Demo
              </Button>
              <Button
                href="/products"
                size="lg"
                variant="outline"
                onClick={() => track({ name: "cta_explore_products", props: { location: "hero" } })}
              >
                Explore Products
              </Button>
            </div>

            {/* Clean Availability Status Ribbon */}
            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs">
                {/* Available Products */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand tracking-wider uppercase">
                    <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                    Available
                  </span>
                  <span className="font-mono text-[11px] text-slate-300">
                    POS · EMS · FMS · E-Commerce
                  </span>
                </div>

                {/* Coming Soon */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-[10px] font-semibold text-amber tracking-wider uppercase">
                    Coming Soon
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    CRM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Software Product Visualization */}
          <div className="relative min-w-0">
            <HeroProductScene className="hidden sm:block" />
            <HeroProductSceneMobile className="sm:hidden" />
          </div>
        </div>
      </Container>
    </section>
  );
}
