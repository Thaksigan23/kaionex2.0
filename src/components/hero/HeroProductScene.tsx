"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import {
  MonitorSmartphone,
  UsersRound,
  CircleDollarSign,
  ShoppingBag,
  Layers3,
  RotateCcw,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 6-Step Deterministic Connected Business Sequence:
 * Step 1: POS — Item added to checkout (2 × Organic Beans · $40.70)
 * Step 2: POS — Sale completed ($40.70 payment approved)
 * Step 3: KAIONEX Core — Single emerald signal moves; inventory adjusts 42 → 40 units
 * Step 4: FMS — Transaction recorded in financial ledger (+ $40.70)
 * Step 5: E-Commerce — Online storefront stock synchronized (40 units)
 * Step 6: Calm operational overview (all engines synchronized; hold briefly)
 */
export const HERO_STEPS = [
  {
    step: 1,
    source: "POS",
    badge: "Item added",
    description: "2 × Organic Coffee Beans placed in POS cart",
    amount: "$40.70",
    stock: "42 units",
    fmsRevenue: "$48,200.00",
    onlineStock: "42 units",
  },
  {
    step: 2,
    source: "POS",
    badge: "Sale completed",
    description: "Counter 02 checkout approved · $40.70 receipt issued",
    amount: "$40.70",
    stock: "42 units",
    fmsRevenue: "$48,200.00",
    onlineStock: "42 units",
  },
  {
    step: 3,
    source: "Core",
    badge: "Inventory updated",
    description: "Central catalog decrements Coffee Beans: 42 → 40 units",
    amount: "$40.70",
    stock: "40 units",
    fmsRevenue: "$48,200.00",
    onlineStock: "42 units",
  },
  {
    step: 4,
    source: "FMS",
    badge: "Ledger recorded",
    description: "Sale +$40.70 credited to operating account (POS-8841)",
    amount: "$40.70",
    stock: "40 units",
    fmsRevenue: "$48,240.70",
    onlineStock: "42 units",
  },
  {
    step: 5,
    source: "E-Commerce",
    badge: "Stock synchronized",
    description: "Online web store stock updated to 40 units in real time",
    amount: "$40.70",
    stock: "40 units",
    fmsRevenue: "$48,240.70",
    onlineStock: "40 units",
  },
  {
    step: 6,
    source: "Overview",
    badge: "Ecosystem synchronized",
    description: "One sale · Connected inventory, finance, and commerce",
    amount: "$40.70",
    stock: "40 units",
    fmsRevenue: "$48,240.70",
    onlineStock: "40 units",
  },
] as const;

export function useHeroWorkflow(isPaused = false) {
  const reduce = useHydratedReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (reduce || isPaused) return;

    // Step pacing: Step 1 (1.8s), Step 2 (1.8s), Step 3 (1.8s), Step 4 (1.8s), Step 5 (1.8s), Step 6 (2.8s calm pause)
    const durations = [1800, 1800, 1800, 1800, 1800, 2800];
    const duration = durations[stepIndex] ?? 2000;

    const timer = window.setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % HERO_STEPS.length);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, reduce, isPaused]);

  return {
    currentStep: reduce ? HERO_STEPS[5] : HERO_STEPS[stepIndex],
    stepIndex: reduce ? 5 : stepIndex,
    reduce: Boolean(reduce),
    replay: () => setStepIndex(0),
  };
}

import type { LucideIcon } from "lucide-react";

interface NavModule {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  tag?: string;
}

const navModules: NavModule[] = [
  { id: "overview", label: "Overview", icon: Layers3, active: true },
  { id: "pos", label: "POS", icon: MonitorSmartphone, tag: "Lane 02" },
  { id: "ems", label: "Employees", icon: UsersRound, tag: "24 active" },
  { id: "fms", label: "Finance", icon: CircleDollarSign, tag: "Ledgers" },
  { id: "ecommerce", label: "Commerce", icon: ShoppingBag, tag: "Store" },
];

export function HeroProductScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentStep, stepIndex, reduce, replay } = useHeroWorkflow();

  const isStep1 = stepIndex === 0;
  const isStep2 = stepIndex === 1;
  const isStep3 = stepIndex === 2;
  const isStep4 = stepIndex === 3;
  const isStep5 = stepIndex === 4;

  // Active highlighted areas based on the deterministic sequence
  const posHighlight = (isStep1 || isStep2) && !reduce;
  const coreHighlight = isStep3 && !reduce;
  const fmsHighlight = isStep4 && !reduce;
  const ecomHighlight = isStep5 && !reduce;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full select-none", className)}
      aria-label="KAIONEX operational software composition"
    >
      {/* Subtle background atmosphere behind the product composition ONLY */}
      <div
        className="pointer-events-none absolute -inset-6 z-0 overflow-visible"
        aria-hidden
      >
        {/* Soft emerald radial aura */}
        <div className="absolute -top-12 -right-8 h-[28rem] w-[32rem] rounded-full bg-gradient-to-br from-brand/12 to-teal/6 blur-3xl opacity-75" />
        {/* Subtle dark navy depth fill */}
        <div className="absolute -bottom-8 -left-6 h-[22rem] w-[26rem] rounded-full bg-navy-800/40 blur-2xl" />
        {/* Fine grid pattern mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_at_60%_45%,black_20%,transparent_75%)]" />
      </div>

      {/* Main Composition Container */}
      <div className="relative z-10">
        {/* Top Operational Label & Status Row */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono tracking-wider uppercase text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="font-semibold text-slate-300">
              OPERATIONAL ENVIRONMENT
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="hidden sm:inline text-brand-soft">4 ENGINES CONNECTED</span>
          </div>
          <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-400">
            DEMO · SAMPLE DATA
          </span>
        </div>

        {/* DOMINANT INTERFACE: Main Application Window */}
        <motion.div
          className={cn(
            "relative rounded-2xl border bg-navy-950/95 shadow-[0_24px_64px_rgba(7,17,31,0.6)] backdrop-blur-sm transition-colors duration-500",
            coreHighlight
              ? "border-brand/40 shadow-[0_24px_64px_rgba(18,201,140,0.12)]"
              : "border-white/12",
          )}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Window Chrome Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Subtle window dots */}
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="h-3.5 w-px bg-white/10" aria-hidden />
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-brand/15 text-brand">
                  <Layers3 size={13} />
                </span>
                <span className="text-xs font-semibold tracking-tight text-white">
                  KAIONEX
                </span>
                <span className="text-[11px] text-white/40">/</span>
                <span className="text-[11px] font-medium text-slate-300">
                  Operational Overview
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-medium text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Live Sync Active
              </span>
            </div>
          </div>

          {/* Window Body: Sidebar + Main Content */}
          <div className="flex min-h-[350px]">
            {/* Left Sidebar Rail */}
            <aside
              className="w-44 shrink-0 border-r border-white/[0.07] bg-white/[0.015] p-3 flex flex-col justify-between"
              aria-label="Application navigation"
            >
              <div className="space-y-1">
                <p className="px-2 pb-1.5 text-[9px] font-semibold uppercase tracking-wider text-white/35">
                  Modules
                </p>
                {navModules.map((item) => {
                  const Icon = item.icon;
                  const isCurrentSource =
                    currentStep.source.toLowerCase() === item.id;
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                        item.active
                          ? "bg-white/[0.08] text-white font-semibold"
                          : isCurrentSource
                            ? "bg-brand/15 text-brand ring-1 ring-brand/30"
                            : "text-slate-400 hover:text-slate-200",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={14} />
                        <span>{item.label}</span>
                      </span>
                      {item.tag && (
                        <span className="text-[9px] text-white/30">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CRM Coming Soon Indicator */}
              <div className="mt-4 rounded-lg border border-dashed border-amber/30 bg-amber/[0.04] p-2 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-amber/90">
                  CRM
                </p>
                <span className="mt-0.5 block text-[8px] font-medium text-amber/70">
                  Coming Soon
                </span>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
              <div>
                {/* 4 Connected Operational Metric Cards */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {/* Metric 1: POS Sales */}
                  <div
                    className={cn(
                      "rounded-xl border p-2.5 transition-colors duration-300",
                      posHighlight
                        ? "border-brand/40 bg-brand/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">
                      POS Sales
                    </span>
                    <motion.p
                      key={currentStep.step >= 2 ? "pos-after" : "pos-before"}
                      initial={reduce ? false : { scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="mt-1 text-sm font-semibold text-white tracking-tight"
                    >
                      {currentStep.step >= 2 ? "$4,240.70" : "$4,200.00"}
                    </motion.p>
                    <span className="mt-0.5 block text-[9px] text-brand">
                      {currentStep.step >= 2 ? "+$40.70 recorded" : "Lane 02 active"}
                    </span>
                  </div>

                  {/* Metric 2: Core Stock */}
                  <div
                    className={cn(
                      "rounded-xl border p-2.5 transition-colors duration-300",
                      coreHighlight
                        ? "border-brand/40 bg-brand/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">
                      Shared Stock
                    </span>
                    <motion.p
                      key={currentStep.stock}
                      initial={reduce ? false : { scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="mt-1 text-sm font-semibold text-white tracking-tight"
                    >
                      {currentStep.stock}
                    </motion.p>
                    <span className="mt-0.5 block text-[9px] text-slate-400">
                      Coffee Beans
                    </span>
                  </div>

                  {/* Metric 3: FMS Ledger */}
                  <div
                    className={cn(
                      "rounded-xl border p-2.5 transition-colors duration-300",
                      fmsHighlight
                        ? "border-brand/40 bg-brand/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">
                      FMS Revenue
                    </span>
                    <motion.p
                      key={currentStep.fmsRevenue}
                      initial={reduce ? false : { scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="mt-1 text-sm font-semibold text-white tracking-tight"
                    >
                      {currentStep.fmsRevenue}
                    </motion.p>
                    <span className="mt-0.5 block text-[9px] text-brand">
                      {currentStep.step >= 4 ? "Ledger posted" : "Cash flow +$12.4k"}
                    </span>
                  </div>

                  {/* Metric 4: E-Commerce Sync */}
                  <div
                    className={cn(
                      "rounded-xl border p-2.5 transition-colors duration-300",
                      ecomHighlight
                        ? "border-brand/40 bg-brand/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">
                      Storefront
                    </span>
                    <p className="mt-1 text-sm font-semibold text-white tracking-tight">
                      {currentStep.onlineStock}
                    </p>
                    <span className="mt-0.5 block text-[9px] text-brand">
                      {currentStep.step >= 5 ? "Synced with POS" : "Online catalog"}
                    </span>
                  </div>
                </div>

                {/* Real-time Activity Feed / Table Rows */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    <span>Operational Activity Stream</span>
                    <span className="text-white/40">Real-time status</span>
                  </div>

                  <div className="divide-y divide-white/[0.04] text-xs">
                    {/* Row 1: POS Sale */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 transition-colors",
                        posHighlight ? "bg-brand/[0.08]" : "hover:bg-white/[0.02]",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border",
                            posHighlight
                              ? "border-brand/40 bg-brand/20 text-brand"
                              : "border-white/10 bg-white/5 text-slate-400",
                          )}
                        >
                          <Coffee size={13} />
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            POS Checkout · Lane 02
                          </p>
                          <p className="text-[10px] text-slate-400">
                            2 × Organic Coffee Beans · Demo checkout
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-white">$40.70</span>
                        <span
                          className={cn(
                            "ml-2 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold",
                            currentStep.step >= 2
                              ? "bg-brand/15 text-brand"
                              : "bg-amber/15 text-amber",
                          )}
                        >
                          {currentStep.step >= 2 ? "Completed" : "Active Cart"}
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Central Inventory */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 transition-colors",
                        coreHighlight
                          ? "bg-brand/[0.08]"
                          : "hover:bg-white/[0.02]",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border",
                            coreHighlight
                              ? "border-brand/40 bg-brand/20 text-brand"
                              : "border-white/10 bg-white/5 text-slate-400",
                          )}
                        >
                          <Layers3 size={13} />
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            Shared Inventory Ledger
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {currentStep.step >= 3
                              ? "Coffee Beans decremented: 42 → 40 units"
                              : "Central stock level: 42 units"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold",
                            currentStep.step >= 3
                              ? "bg-brand/15 text-brand"
                              : "bg-white/10 text-slate-400",
                          )}
                        >
                          {currentStep.step >= 3 ? "Synced 40 units" : "Holding 42"}
                        </span>
                      </div>
                    </div>

                    {/* Row 3: FMS Ledger Entry */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 transition-colors",
                        fmsHighlight ? "bg-brand/[0.08]" : "hover:bg-white/[0.02]",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border",
                            fmsHighlight
                              ? "border-brand/40 bg-brand/20 text-brand"
                              : "border-white/10 bg-white/5 text-slate-400",
                          )}
                        >
                          <CircleDollarSign size={13} />
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            FMS Ledger · Entry #POS-8841
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Operating ledger · Revenue posted from POS
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-brand">+$40.70</span>
                        <span
                          className={cn(
                            "ml-2 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold",
                            currentStep.step >= 4
                              ? "bg-brand/15 text-brand"
                              : "bg-white/10 text-slate-400",
                          )}
                        >
                          {currentStep.step >= 4 ? "Recorded" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Row 4: E-Commerce Channel Sync */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 transition-colors",
                        ecomHighlight
                          ? "bg-brand/[0.08]"
                          : "hover:bg-white/[0.02]",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border",
                            ecomHighlight
                              ? "border-brand/40 bg-brand/20 text-brand"
                              : "border-white/10 bg-white/5 text-slate-400",
                          )}
                        >
                          <ShoppingBag size={13} />
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            E-Commerce Web Storefront
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Online inventory updated · 40 units available
                          </p>
                        </div>
                      </div>
                      <div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold",
                            currentStep.step >= 5
                              ? "bg-brand/15 text-brand"
                              : "bg-white/10 text-slate-400",
                          )}
                        >
                          {currentStep.step >= 5 ? "In Sync" : "Syncing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Live Step Status Bar & Replay Control */}
              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  <span className="font-medium text-slate-300">
                    Step 0{currentStep.step} / 06 · {currentStep.source}:
                  </span>
                  <span className="text-white/80">{currentStep.description}</span>
                </div>
                <button
                  type="button"
                  onClick={replay}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-brand hover:bg-white/[0.08] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Replay connected product workflow"
                >
                  <RotateCcw size={11} />
                  <span>Replay Workflow</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2–3 SUPPORTING SURFACES: Overlapping with depth & art direction */}
        {/* ========================================================================= */}

        {/* SUPPORTING SURFACE 1: FMS Activity Panel (Lower Right Overlap) */}
        <motion.div
          className={cn(
            "hidden lg:block absolute -bottom-6 -right-6 z-20 w-72 rounded-xl border bg-navy-900/95 p-3.5 shadow-[0_20px_40px_rgba(7,17,31,0.55)] backdrop-blur-md transition-all duration-300",
            fmsHighlight
              ? "border-brand ring-1 ring-brand/40 shadow-[0_20px_45px_rgba(18,201,140,0.15)] scale-[1.02]"
              : "border-white/12",
          )}
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-brand/15 text-brand">
                <CircleDollarSign size={11} />
              </span>
              <span className="text-[11px] font-semibold text-white">
                FMS · Financial Activity
              </span>
            </div>
            <span className="text-[9px] font-mono text-brand">
              {currentStep.step >= 4 ? "+$40.70 POS-8841" : "Cash flow ready"}
            </span>
          </div>

          <div className="mt-2.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">
                Operating Revenue
              </p>
              <motion.p
                key={currentStep.fmsRevenue}
                initial={reduce ? false : { scale: 1.06 }}
                animate={{ scale: 1 }}
                className="text-sm font-semibold text-white tracking-tight"
              >
                {currentStep.fmsRevenue}
              </motion.p>
            </div>
            {/* Mini weekly bars */}
            <div className="flex h-7 items-end gap-1" aria-hidden>
              {[35, 50, 42, 65, 58, 75, currentStep.step >= 4 ? 92 : 78].map(
                (h, idx) => (
                  <span
                    key={idx}
                    style={{ height: `${h}%` }}
                    className={cn(
                      "w-1.5 rounded-t transition-all duration-500",
                      idx === 6 && currentStep.step >= 4
                        ? "bg-brand"
                        : "bg-brand/35",
                    )}
                  />
                ),
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-1.5 text-[9px] text-slate-400">
            <span>Automatic Ledger Sync</span>
            <span className="text-brand font-medium">✓ Ledger updated</span>
          </div>
        </motion.div>

        {/* SUPPORTING SURFACE 2: E-Commerce Sync Surface (Upper Right Overlap) */}
        <motion.div
          className={cn(
            "hidden lg:block absolute -top-5 -right-3 z-20 w-64 rounded-xl border bg-navy-900/95 p-3 shadow-[0_18px_36px_rgba(7,17,31,0.5)] backdrop-blur-md transition-all duration-300",
            ecomHighlight
              ? "border-brand ring-1 ring-brand/40 shadow-[0_18px_40px_rgba(18,201,140,0.15)] scale-[1.02]"
              : "border-white/12",
          )}
          initial={reduce ? false : { opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-brand/15 text-brand">
                <ShoppingBag size={11} />
              </span>
              <span className="text-[11px] font-semibold text-white">
                E-Commerce · Channel Sync
              </span>
            </div>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                ecomHighlight ? "bg-brand animate-pulse" : "bg-brand/60",
              )}
            />
          </div>

          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Organic Coffee Beans</span>
              <span className="font-semibold text-white">
                {currentStep.onlineStock} on hand
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400">
              <span>POS ↔ Storefront link</span>
              <span className="text-brand font-medium">
                {currentStep.step >= 5 ? "Stock Synchronized" : "Channel Linked"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* SUPPORTING SURFACE 3: EMS Workforce Activity Surface (Lower Left Accent) */}
        <motion.div
          className="hidden xl:block absolute -bottom-5 -left-5 z-20 w-60 rounded-xl border border-white/12 bg-navy-900/95 p-3 shadow-[0_18px_36px_rgba(7,17,31,0.5)] backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, x: -10, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-brand/15 text-brand">
                <UsersRound size={11} />
              </span>
              <span className="text-[11px] font-semibold text-white">
                EMS · Workforce Status
              </span>
            </div>
            <span className="rounded bg-white/10 px-1.5 py-0.2 text-[8px] font-semibold text-brand">
              24 on shift
            </span>
          </div>

          <div className="mt-2 text-[10px]">
            <p className="text-slate-300 font-medium">
              Store Associate · Floor Task
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5">
              Aisle B restock completed · Operations Team
            </p>
          </div>
        </motion.div>

        {/* Subtle Visual Connection Track (Section 9) */}
        <div
          className="mt-8 flex items-center justify-between px-3 text-[9px] font-mono tracking-wider uppercase text-slate-400"
          aria-hidden
        >
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                posHighlight ? "bg-brand" : "bg-white/30",
              )}
            />
            POS (SALE)
          </span>
          <span className="flex-1 mx-3 h-px bg-gradient-to-r from-brand/40 via-brand/60 to-brand/40 relative overflow-hidden">
            {!reduce && currentStep.step >= 2 && currentStep.step <= 4 && (
              <motion.span
                key={currentStep.step}
                className="absolute top-[-2px] h-[5px] w-8 rounded-full bg-brand shadow-[0_0_8px_#5ee0b0]"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            )}
          </span>
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                coreHighlight ? "bg-brand" : "bg-white/30",
              )}
            />
            SHARED INVENTORY
          </span>
          <span className="flex-1 mx-3 h-px bg-gradient-to-r from-brand/40 via-brand/60 to-brand/40 relative overflow-hidden" />
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                fmsHighlight || ecomHighlight ? "bg-brand" : "bg-white/30",
              )}
            />
            FMS + COMMERCE
          </span>
        </div>
      </div>
    </div>
  );
}
