"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import {
  MonitorSmartphone,
  UsersRound,
  CircleDollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const SHOWCASE_PRODUCTS = [
  {
    id: "pos",
    name: "KAIONEX POS",
    shortName: "POS",
    category: "Sales & Counter",
    badge: "Available Now",
    isAvailable: true,
    tagline: "Fast checkout and offline-ready counter billing.",
    contextMessage: "Continues recording sales and payments when internet drops.",
    href: "/products/pos",
    icon: MonitorSmartphone,
  },
  {
    id: "ems",
    name: "KAIONEX EMS",
    shortName: "EMS",
    category: "Workforce & Operations",
    badge: "Available Now",
    isAvailable: true,
    tagline: "Shift schedules, attendance, and task coordination.",
    contextMessage: "Organize staff schedules and floor checklists in one system.",
    href: "/products/ems",
    icon: UsersRound,
  },
  {
    id: "fms",
    name: "KAIONEX FMS",
    shortName: "FMS",
    category: "Finance & Ledgers",
    badge: "Available Now",
    isAvailable: true,
    tagline: "Operating ledgers, invoicing, and cash-flow clarity.",
    contextMessage: "Balanced double-entry financial visibility for business owners.",
    href: "/products/fms",
    icon: CircleDollarSign,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    shortName: "E-Commerce",
    category: "Digital Storefront",
    badge: "Available Now",
    isAvailable: true,
    tagline: "Digital storefronts, online catalog, and order fulfillment.",
    contextMessage: "Capture customer orders online and route them to dispatch.",
    href: "/products/ecommerce",
    icon: ShoppingBag,
  },
  {
    id: "crm",
    name: "KAIONEX CRM",
    shortName: "CRM",
    category: "Customer Management",
    badge: "Coming Soon",
    isAvailable: false,
    tagline: "Customer relationships and opportunity pipeline.",
    contextMessage: "Currently in prototype development as a future suite addition.",
    href: "/contact?interest=crm",
    icon: Clock,
  },
];

export function HeroProductScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useHydratedReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Relaxed auto-cycle (8 seconds), paused on hover or manual selection
  useEffect(() => {
    if (reduce || isPaused || userInteracted) return;
    const timer = window.setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [activeIdx, reduce, isPaused, userInteracted]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 0.8, ry: x * 0.8 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const current = SHOWCASE_PRODUCTS[activeIdx];

  const handleSelectProduct = (idx: number) => {
    setActiveIdx(idx);
    setUserInteracted(true);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handlePointerLeave();
      }}
      className={cn("relative w-full select-none", className)}
      aria-label="KAIONEX product showcase"
    >
      {/* Soft atmospheric ambient glow */}
      <div className="pointer-events-none absolute -inset-6 z-0 overflow-hidden" aria-hidden>
        <div
          className={cn(
            "absolute -top-10 right-1/4 h-80 w-96 rounded-full blur-[100px] opacity-25 transition-colors duration-700",
            current.id === "crm" ? "bg-amber-500/25" : "bg-emerald-500/25",
          )}
        />
      </div>

      <div className="relative z-10">
        {/* Large Browser / Device Frame */}
        <motion.div
          style={
            reduce
              ? undefined
              : {
                  transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: "transform 0.25s ease-out",
                }
          }
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-950/95 shadow-[0_24px_64px_rgba(7,17,31,0.7)] backdrop-blur-md"
        >
          {/* Window Chrome Header with Minimalist Tab Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.03] px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-500/70" />
              <span className="size-2.5 rounded-full bg-amber-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-xs font-semibold text-slate-200 tracking-wide">
                {current.name}
              </span>
            </div>

            {/* Product Switcher Pills */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Select product view">
              {SHOWCASE_PRODUCTS.map((prod, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectProduct(idx)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-mono transition-all duration-150",
                      isSelected
                        ? prod.id === "crm"
                          ? "bg-amber-500/20 text-amber font-semibold ring-1 ring-amber-400/40"
                          : "bg-emerald-500/20 text-emerald-400 font-semibold ring-1 ring-emerald-400/40"
                        : "text-slate-400 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {prod.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Product Showcase Body */}
          <div className="p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {/* 1. POS Visual State: Realistic Counter Till */}
                {current.id === "pos" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Lane 02 · Counter Checkout
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                        Offline-Ready
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-xs">
                        <div>
                          <p className="font-medium text-white">Organic Reserve Roast (1kg)</p>
                          <span className="text-[11px] text-slate-400">Qty: 2 · Standard Rate</span>
                        </div>
                        <span className="font-mono text-sm font-semibold text-white">$37.00</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-xs">
                        <div>
                          <p className="font-medium text-white">Ceramic Travel Tumbler</p>
                          <span className="text-[11px] text-slate-400">Qty: 1 · Counter Stock</span>
                        </div>
                        <span className="font-mono text-sm font-semibold text-white">$18.50</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-900/80 p-4">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400">TOTAL DUE (INCL. TAX)</span>
                        <p className="font-mono text-2xl font-bold text-white mt-0.5">$61.05</p>
                      </div>
                      <div className="rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-navy-950 shadow-[0_0_20px_rgba(0,179,122,0.35)]">
                        Complete Sale
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. EMS Visual State: Human-Oriented Workforce */}
                {current.id === "ems" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Downtown Store · Active Roster
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                        24 on Shift
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                            SJ
                          </span>
                          <div>
                            <p className="font-medium text-white">Sarah Jenkins</p>
                            <span className="text-[11px] text-slate-400">Floor Supervisor · Counters 1–4</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 font-medium">07:54 AM</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                            MC
                          </span>
                          <div>
                            <p className="font-medium text-white">Marcus Chen</p>
                            <span className="text-[11px] text-slate-400">Counter Associate · Lane 02</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 font-medium">08:00 AM</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-navy-900/80 p-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300">Daily Floor Checklists</span>
                        <span className="font-mono font-semibold text-emerald-400">18 of 22 Tasks Done</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FMS Visual State: Modern Finance & Ledgers */}
                {current.id === "fms" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Fiscal Q3 · Finance Overview
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                        Balanced
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                        <span className="text-[11px] font-mono text-slate-400 block uppercase">Collections MTD</span>
                        <p className="font-mono text-xl font-bold text-white mt-1">$128,450.00</p>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                        <span className="text-[11px] font-mono text-emerald-400 block uppercase">Net Position</span>
                        <p className="font-mono text-xl font-bold text-emerald-400 mt-1">+$86,270.00</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-navy-900/80 p-4 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium text-white">Commercial Invoicing</p>
                        <span className="text-[11px] text-slate-400">186 invoices cleared · Net-30</span>
                      </div>
                      <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-slate-300">
                        Double-Entry Verified
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. E-Commerce Visual State: Storefront & Orders */}
                {current.id === "ecommerce" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Digital Storefront · Order Intake
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                        48 Orders Today
                      </span>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">Demo Order #9104</span>
                        <span className="font-mono font-semibold text-emerald-400">$70.00 (Paid)</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        2× Artisan Whole Bean Roast · Standard Delivery
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-navy-900/80 p-4 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium text-white">Fulfillment Queue</p>
                        <span className="text-[11px] text-slate-400">Packaging complete · Shipping label ready</span>
                      </div>
                      <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                        Ready to Dispatch
                      </span>
                    </div>
                  </div>
                )}

                {/* 5. CRM Visual State: Obviously Conceptual Coming Soon */}
                {current.id === "crm" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white flex items-center gap-2">
                        <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                        Customer Management · Concept
                      </span>
                      <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 font-mono text-[10px] text-amber">
                        Coming Soon
                      </span>
                    </div>

                    <div className="rounded-xl border border-dashed border-amber-500/30 bg-amber-500/[0.03] p-5 text-center">
                      <div className="grid grid-cols-3 gap-2.5 opacity-60">
                        <div className="rounded-lg bg-white/5 p-2.5 text-left">
                          <span className="text-[10px] font-mono text-slate-400">1. Leads</span>
                          <div className="mt-2 h-2.5 w-14 rounded bg-white/20" />
                        </div>
                        <div className="rounded-lg bg-white/5 p-2.5 text-left">
                          <span className="text-[10px] font-mono text-amber">2. Proposal</span>
                          <div className="mt-2 h-2.5 w-12 rounded bg-amber-400/30" />
                        </div>
                        <div className="rounded-lg bg-white/5 p-2.5 text-left">
                          <span className="text-[10px] font-mono text-slate-400">3. Closed</span>
                          <div className="mt-2 h-2.5 w-10 rounded bg-white/20" />
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-medium text-amber">
                          Under Active Development
                        </span>
                        <p className="mt-2 text-xs text-slate-400">
                          Future relationship management suite for KAIONEX businesses.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Contextual Link Row */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3.5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 size={14} className={current.id === "crm" ? "text-amber" : "text-emerald-400"} />
                <span>{current.contextMessage}</span>
              </span>

              <Link
                href={current.href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>{current.id === "crm" ? "Get Updates" : "Explore"}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
