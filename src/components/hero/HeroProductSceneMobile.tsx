"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SHOWCASE_PRODUCTS } from "./HeroProductScene";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

export function HeroProductSceneMobile({ className }: { className?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduce = useHydratedReducedMotion();
  const current = SHOWCASE_PRODUCTS[activeIdx];
  const Icon = current.icon;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-white/12 bg-navy-950/95 overflow-hidden shadow-[0_16px_36px_rgba(7,17,31,0.5)] select-none",
        className,
      )}
      aria-label="KAIONEX mobile product preview"
    >
      {/* Top Chrome Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded bg-brand/15 text-brand">
            <Icon size={12} />
          </span>
          <span className="text-xs font-semibold text-white font-mono">{current.name}</span>
        </div>
        <span
          className={cn(
            "rounded px-2 py-0.5 text-[9px] font-semibold font-mono uppercase",
            current.isAvailable
              ? "bg-brand/10 text-brand border border-brand/20"
              : "bg-amber/10 text-amber border border-amber/20",
          )}
        >
          {current.badge}
        </span>
      </div>

      {/* Product Switcher Pills */}
      <div className="grid grid-cols-5 gap-1 border-b border-white/[0.06] bg-white/[0.015] p-1.5 text-center">
        {SHOWCASE_PRODUCTS.map((prod, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={prod.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "rounded-lg py-1 px-1 font-mono text-[10px] transition-colors",
                isActive
                  ? prod.id === "crm"
                    ? "bg-amber/20 text-amber font-semibold ring-1 ring-amber/40"
                    : "bg-brand/20 text-brand font-semibold ring-1 ring-brand/40"
                  : "text-slate-400 hover:text-white",
              )}
            >
              {prod.shortName}
            </button>
          );
        })}
      </div>

      {/* Product Advertisement Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-3.5"
        >
          {current.id === "pos" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">Lane 02 · Checkout</span>
                <span className="font-mono text-[10px] text-brand">Offline-Ready</span>
              </div>
              <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2.5 text-xs flex justify-between">
                <span>Organic Reserve Roast (1kg)</span>
                <span className="font-mono text-white">$37.00</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400">TOTAL DUE</span>
                  <p className="font-mono text-lg font-bold text-white">$61.05</p>
                </div>
                <div className="rounded bg-brand px-3 py-1.5 text-[11px] font-semibold text-navy-950">
                  Complete Sale
                </div>
              </div>
            </div>
          )}

          {current.id === "ems" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">Downtown Store</span>
                <span className="font-mono text-[10px] text-brand">24 on shift</span>
              </div>
              <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2.5 text-xs flex justify-between">
                <span>Sarah Jenkins · Lead</span>
                <span className="font-mono text-[10px] text-brand">07:54 AM</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-2.5 text-xs flex justify-between items-center">
                <span className="text-slate-300">Daily Tasks</span>
                <span className="font-mono text-brand font-semibold">18 / 22 Done</span>
              </div>
            </div>
          )}

          {current.id === "fms" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">Operating Ledger</span>
                <span className="font-mono text-[10px] text-brand">Balanced</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2">
                  <span className="text-[10px] text-slate-400">Collections</span>
                  <p className="font-mono font-semibold text-white mt-0.5">$128,450</p>
                </div>
                <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2">
                  <span className="text-[10px] text-slate-400">Net Position</span>
                  <p className="font-mono font-semibold text-brand mt-0.5">+$86,270</p>
                </div>
              </div>
            </div>
          )}

          {current.id === "ecommerce" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">Storefront Queue</span>
                <span className="font-mono text-[10px] text-brand">48 Orders</span>
              </div>
              <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2.5 text-xs flex justify-between">
                <span>Demo Order #9104</span>
                <span className="font-mono text-brand font-semibold">$70.00</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-navy-900/80 p-2.5 text-xs flex justify-between items-center">
                <span className="text-slate-300">Dispatch Status</span>
                <span className="font-mono text-brand text-[10px]">AWB Ready</span>
              </div>
            </div>
          )}

          {current.id === "crm" && (
            <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-500/[0.03] p-3 text-center text-xs">
              <span className="rounded bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] text-amber font-mono">
                Coming Soon
              </span>
              <p className="mt-2 text-slate-300 text-[11px]">
                Customer relationship & pipeline tool in development.
              </p>
            </div>
          )}

          {/* Contextual link */}
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 size={11} className={current.id === "crm" ? "text-amber" : "text-brand"} />
              <span className="truncate">{current.contextMessage}</span>
            </span>
            <Link href={current.href} className="text-brand shrink-0 hover:underline flex items-center gap-0.5">
              <span>Explore</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Switcher Control */}
      <div className="border-t border-white/[0.06] bg-white/[0.015] px-3 py-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Part of KAIONEX</span>
        <button
          type="button"
          onClick={() => setActiveIdx((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length)}
          className="flex items-center gap-0.5 text-brand shrink-0 font-semibold"
        >
          <span>Next</span>
          <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}
