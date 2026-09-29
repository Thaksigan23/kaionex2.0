"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import type { ProductId } from "@/content/products";
import { cn } from "@/lib/utils";
import {
  Printer,
  HardDrive,
  Barcode,
  Layers,
  Clock,
  UsersRound,
  ShieldCheck,
  Send,
  Scale,
  Receipt,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  Truck,
  Globe,
  UserCheck,
  Kanban,
  MessageSquare,
} from "lucide-react";

interface SubsystemCallout {
  id: string;
  label: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface ProductMomentData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  callouts: SubsystemCallout[];
  renderWorkstation: (activeSubsystem: string) => React.ReactNode;
}

export function ProductVisualMoment({ productId }: { productId: ProductId }) {
  const data = getMomentData(productId);
  const [activeCallout, setActiveCallout] = useState<string>(data.callouts[0]?.id || "");
  const reduce = useHydratedReducedMotion();

  const selectedCallout = data.callouts.find((c) => c.id === activeCallout) || data.callouts[0];

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
      {/* Expansive Ambient Atmospheric Glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-[38rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px] opacity-40" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      <Container wide className="relative z-10">
        {/* Section Header with Generous Editorial Breathing Room */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brand-soft">
            {data.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
            {data.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {data.subheadline}
          </p>
        </div>

        {/* Subsystem Interactive Filter Chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {data.callouts.map((c) => {
            const isActive = c.id === activeCallout;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCallout(c.id)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand text-navy-950 font-semibold shadow-[0_0_24px_rgba(0,179,122,0.35)]"
                    : "bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white hover:border-white/20",
                )}
              >
                <Icon size={14} className={isActive ? "text-navy-950" : "text-brand"} />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* The Expansive Workstation Stage */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/15 bg-navy-900/40 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-[0_32px_96px_rgba(7,17,31,0.85)]">
          {/* Workstation Top Command Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex size-3 items-center justify-center">
                <span className="size-2 rounded-full bg-brand animate-ping" />
              </span>
              <span className="text-white font-semibold tracking-wider uppercase">
                {productId.toUpperCase()} SYSTEM COMMAND STAGE
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">ACTIVE SUBSYSTEM: {selectedCallout?.title.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="rounded bg-white/[0.06] px-2 py-0.5 text-brand font-semibold">
                {selectedCallout?.tag}
              </span>
              <span>STANDALONE RUNTIME</span>
            </div>
          </div>

          {/* Large Panoramic Render of Workstation */}
          <div className="relative min-h-[380px] w-full rounded-2xl border border-white/10 bg-navy-950/80 p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCallout}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {data.renderWorkstation(activeCallout)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subsystem Technical Detail Ribbon */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-brand/30 bg-brand/10 p-2.5 text-brand">
                {selectedCallout && <selectedCallout.icon size={20} />}
              </div>
              <div>
                <h4 className="font-semibold text-white sm:text-sm">
                  {selectedCallout?.title}
                </h4>
                <p className="mt-1 max-w-2xl text-slate-300 leading-relaxed">
                  {selectedCallout?.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right font-mono text-[11px] text-slate-400">
              <span className="block text-brand font-semibold">{selectedCallout?.tag}</span>
              <span className="text-slate-400">Verified architecture</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function getMomentData(productId: ProductId): ProductMomentData {
  switch (productId) {
    case "pos":
      return {
        eyebrow: "Counter Hardware & Architecture",
        headline: "Engineered for the Physical Checkout Counter",
        subheadline:
          "High-speed transaction processing built with local persistence, autonomous thermal receipt generation, and offline-first queue buffering.",
        callouts: [
          {
            id: "spooler",
            label: "Thermal Receipt Spooler",
            title: "Autonomous Thermal Engine",
            description:
              "Direct 80mm/58mm ESC/POS spooling with zero browser print dialogs, custom tax compliance headers, and QR verification codes.",
            tag: "HARDWARE READY",
            icon: Printer,
          },
          {
            id: "buffer",
            label: "Offline SQLite/IndexedDB Buffer",
            title: "Local-First Persistence Layer",
            description:
              "Every sale writes synchronously to local durable storage first. Never drops a transaction even during complete broadband blackout.",
            tag: "ZERO DATA LOSS",
            icon: HardDrive,
          },
          {
            id: "scanner",
            label: "Laser Scanner Deck",
            title: "Instant SKU & Barcode Decoder",
            description:
              "Handles 1D UPC/EAN and 2D GS1 DataBar scanning with sub-20ms lookup against the locally cached product catalog.",
            tag: "SUB-SECOND SCAN",
            icon: Barcode,
          },
          {
            id: "drawer",
            label: "Split Tender Drawer",
            title: "Cash Drawer Float & Tender Tracking",
            description:
              "RJ12 solenoid drawer kick-out, start-of-day float balancing, mid-shift cash drops, and end-of-shift reconciliation audit.",
            tag: "AUDITED CASH FLOW",
            icon: Layers,
          },
        ],
        renderWorkstation: (activeSubsystem) => (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Left: Interactive Counter Register Terminal Display */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white">LANE 01 · ACTIVE REGISTER</span>
                </div>
                <span className="font-mono text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                  OFFLINE READY · SYNC ARMED
                </span>
              </div>

              {/* Cart Table Simulation */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                  <span>ITEM / SKU</span>
                  <span>QTY</span>
                  <span>PRICE</span>
                </div>
                <div className={cn("flex justify-between p-2 rounded transition-colors", activeSubsystem === "scanner" ? "bg-brand/15 border border-brand/30" : "bg-white/[0.02]")}>
                  <div>
                    <span className="text-white font-medium">Arabica Reserve 1kg</span>
                    <span className="block text-[10px] text-slate-400">SKU #8849-012</span>
                  </div>
                  <span className="text-slate-300">x 2</span>
                  <span className="text-brand font-semibold">$34.00</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.02]">
                  <div>
                    <span className="text-white font-medium">Cold Brew Bottle 500ml</span>
                    <span className="block text-[10px] text-slate-400">SKU #4912-882</span>
                  </div>
                  <span className="text-slate-300">x 1</span>
                  <span className="text-brand font-semibold">$6.70</span>
                </div>
              </div>

              {/* Total Balance Bar */}
              <div className="flex items-center justify-between rounded-xl bg-navy-900 border border-white/10 p-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">TOTAL DUE (INCL. TAX)</span>
                  <p className="text-2xl font-bold font-mono text-white">$40.70</p>
                </div>
                <div className="flex gap-2">
                  <span className={cn("px-3 py-1.5 rounded-lg text-xs font-mono font-medium border", activeSubsystem === "drawer" ? "bg-brand text-navy-950 font-bold border-brand" : "bg-white/5 text-slate-300 border-white/10")}>
                    Cash Tender ($50.00)
                  </span>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 text-slate-300 border border-white/10">
                    Card / NFC
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Thermal Receipt Preview Engine */}
            <div className={cn(
              "rounded-xl border p-4 font-mono text-xs transition-all duration-300",
              activeSubsystem === "spooler"
                ? "border-brand/40 bg-navy-900/90 shadow-[0_0_24px_rgba(0,179,122,0.2)]"
                : "border-white/10 bg-navy-900/50",
            )}>
              <div className="border-b border-dashed border-white/20 pb-3 text-center">
                <p className="font-bold text-white tracking-widest">KAIONEX RETAIL STORE</p>
                <p className="text-[10px] text-slate-400">TAX INVOICE · REGISTER 01</p>
                <p className="text-[10px] text-slate-400">2026-09-28 14:22:09</p>
              </div>

              <div className="my-3 space-y-1.5 text-[11px] border-b border-dashed border-white/20 pb-3">
                <div className="flex justify-between">
                  <span>2x Arabica Reserve 1kg</span>
                  <span className="text-white">$34.00</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Cold Brew Bottle 500ml</span>
                  <span className="text-white">$6.70</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Sales Tax (8%)</span>
                  <span>$3.01</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1">
                  <span>TOTAL PAID</span>
                  <span className="text-brand">$40.70</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cash Change Due</span>
                  <span>$9.30</span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 space-y-1">
                <p>ESC/POS ESC-p 0 30 120 (SOLENOID OPEN)</p>
                <p className="text-brand font-semibold">LOCAL WRITE: COMMIT OK · 14ms</p>
              </div>
            </div>
          </div>
        ),
      };

    case "ems":
      return {
        eyebrow: "Workforce Operations Deck",
        headline: "Precision Scheduling & Floor Accountability",
        subheadline:
          "Manage shifts, verify clock-in attendance records, and assign operational checklists across store and facility branches.",
        callouts: [
          {
            id: "roster",
            label: "Shift Scheduler",
            title: "Dynamic Floor Roster Matrix",
            description:
              "Plan hourly coverage by department, avoid under-staffing during peak trade, and publish rosters instantly to staff accounts.",
            tag: "COVERAGE SAFEGUARD",
            icon: UsersRound,
          },
          {
            id: "attendance",
            label: "Time & Attendance Engine",
            title: "Terminal PIN & Barcode Clock-In",
            description:
              "Accurate clock-in and clock-out event tracking with late tolerance rules, early leave flags, and break enforcement.",
            tag: "VERIFIED TIMESHEETS",
            icon: Clock,
          },
          {
            id: "tasks",
            label: "Daily Task Delegation",
            title: "Operational Floor Checklists",
            description:
              "Assign morning opening checks, mid-day stock replenishment, and evening sanitization protocols with supervisor sign-offs.",
            tag: "REAL-TIME PROGRESS",
            icon: ShieldCheck,
          },
          {
            id: "broadcast",
            label: "Team Announcements",
            title: "Targeted Branch Broadcasts",
            description:
              "Publish priority operational alerts, shift swap requests, and safety guidelines directly to the team workspace.",
            tag: "INTERNAL COMMS",
            icon: Send,
          },
        ],
        renderWorkstation: (activeSubsystem) => (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            {/* Shift Roster Heatmap Board */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white">DOWNTOWN STORE · MORNING SHIFT</span>
                </div>
                <span className="font-mono text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                  24 ACTIVE · 100% COVERAGE
                </span>
              </div>

              {/* Staff Roster Rows */}
              <div className="space-y-2 font-mono text-xs">
                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "attendance" ? "border-brand/40 bg-brand/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="size-2.5 rounded-full bg-brand" />
                      <span className="text-white font-semibold">Sarah Jenkins · Floor Supervisor</span>
                    </div>
                    <span className="text-brand font-semibold text-[11px]">CLOCKED IN 07:54 AM</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Assigned: Counter 1-4 & Opening Safe</span>
                    <span>Verified PIN #****</span>
                  </div>
                </div>

                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "tasks" ? "border-brand/40 bg-brand/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="size-2.5 rounded-full bg-brand" />
                      <span className="text-white font-semibold">Marcus Chen · Counter Associate</span>
                    </div>
                    <span className="text-brand font-semibold text-[11px]">CLOCKED IN 08:00 AM</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Task Checklist: Restock & Cash Count</span>
                    <span className="text-brand">4 / 5 Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shift Health & Checklist Summary */}
            <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">SHIFT TIMESHEET STATUS</span>
                <span className="text-brand font-semibold">ROSTER #EMS-08</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-slate-400">SCHEDULED HOURS</span>
                  <p className="text-lg font-bold text-white mt-0.5">192.0 hrs</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-slate-400">ON-TIME RATE</span>
                  <p className="text-lg font-bold text-brand mt-0.5">96.2%</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Exceptions / Unexcused:</span>
                  <span className="text-white font-semibold">0 incidents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pending Leave Requests:</span>
                  <span className="text-white font-semibold">2 for next week</span>
                </div>
              </div>
            </div>
          </div>
        ),
      };

    case "fms":
      return {
        eyebrow: "Financial Accounting Engine",
        headline: "Clear Operating Ledgers & Cash Flow Truth",
        subheadline:
          "Maintain double-entry audit rigor, monitor operating cash flow, and generate comprehensive balance sheets for your business.",
        callouts: [
          {
            id: "ledger",
            label: "Operating General Ledger",
            title: "Double-Entry Transaction Journal",
            description:
              "Strict debit and credit balance verification on every committed journal entry. Audit-ready and structured for enterprise accounting.",
            tag: "DOUBLE-ENTRY CERTIFIED",
            icon: Scale,
          },
          {
            id: "invoicing",
            label: "Receivables & Invoicing",
            title: "Commercial Billing Engine",
            description:
              "Issue clear professional tax invoices, set net-30 terms, monitor overdue aging buckets, and log customer remittances.",
            tag: "ACCOUNTS RECEIVABLE",
            icon: Receipt,
          },
          {
            id: "expenses",
            label: "Expense Tracking",
            title: "Operational Outlay Classification",
            description:
              "Categorize vendor bills, utilities, inventory acquisitions, and recurring subscriptions against a standard chart of accounts.",
            tag: "COST VISIBILITY",
            icon: CheckCircle2,
          },
          {
            id: "cashflow",
            label: "Cash Flow Forecasting",
            title: "Liquidity & Runway Trajectory",
            description:
              "Real-time visibility into operating bank accounts, expected receivables, and payable obligations to protect working capital.",
            tag: "LIQUIDITY MONITOR",
            icon: TrendingUp,
          },
        ],
        renderWorkstation: (activeSubsystem) => (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Double-Entry Journal Entry Board */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white">JOURNAL BATCH #FMS-4012</span>
                </div>
                <span className="font-mono text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                  DEBIT = CREDIT · BALANCED
                </span>
              </div>

              {/* Ledger Entries Table */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400 border-b border-white/5 pb-1">
                  <span>ACCOUNT / MEMO</span>
                  <span>DEBIT</span>
                  <span>CREDIT</span>
                </div>
                <div className={cn("flex justify-between p-2 rounded transition-colors", activeSubsystem === "ledger" ? "bg-brand/15 border border-brand/30" : "bg-white/[0.02]")}>
                  <div>
                    <span className="text-white font-medium">1010 Operating Cash (Bank)</span>
                    <span className="block text-[10px] text-slate-400">Trade collections deposit</span>
                  </div>
                  <span className="text-brand font-semibold">$14,250.00</span>
                  <span className="text-slate-500">—</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.02]">
                  <div>
                    <span className="text-white font-medium">4000 Sales Revenue (Gross)</span>
                    <span className="block text-[10px] text-slate-400">Operating revenues credited</span>
                  </div>
                  <span className="text-slate-500">—</span>
                  <span className="text-brand font-semibold">$13,194.44</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.02]">
                  <div>
                    <span className="text-white font-medium">2100 Sales Tax Payable</span>
                    <span className="block text-[10px] text-slate-400">8% tax liability accrued</span>
                  </div>
                  <span className="text-slate-500">—</span>
                  <span className="text-brand font-semibold">$1,055.56</span>
                </div>
              </div>
            </div>

            {/* Financial Cockpit Metrics */}
            <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">FISCAL HEALTH REPORT</span>
                <span className="text-brand font-semibold">Q3 AUDITED</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Gross Invoiced:</span>
                  <span className="text-white font-bold">$128,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operating Expenses:</span>
                  <span className="text-white font-bold">$86,270.00</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-brand-soft">Net Operating Surplus:</span>
                  <span className="text-brand font-bold text-sm">+$42,180.00</span>
                </div>
              </div>
            </div>
          </div>
        ),
      };

    case "ecommerce":
      return {
        eyebrow: "Digital Commerce Pipeline",
        headline: "Omnichannel Online Storefront & Fulfillment",
        subheadline:
          "Capture customer orders online, process digital payments, and route items through packaging, labelling, and courier dispatch.",
        callouts: [
          {
            id: "storefront",
            label: "Digital Storefront",
            title: "High-Performance Customer Cart",
            description:
              "Mobile-optimized catalog browsing, real-time inventory availability display, and sub-second checkout conversion.",
            tag: "LIGHTNING STOREFRONT",
            icon: Globe,
          },
          {
            id: "intake",
            label: "Order Intake Engine",
            title: "Automated Order Ingestion",
            description:
              "Receives web orders, validates card and digital payments, and routes line-items directly into warehouse packaging bins.",
            tag: "ZERO ORDER DELAYS",
            icon: ShoppingBag,
          },
          {
            id: "dispatch",
            label: "Packaging & Dispatch Deck",
            title: "Courier Airway Bill Generation",
            description:
              "Print compliant carrier labels, assign tracking numbers, and confirm shipment handoffs with delivery partners.",
            tag: "FULFILLMENT ACCELERATOR",
            icon: Truck,
          },
          {
            id: "catalog",
            label: "Digital Catalog Hub",
            title: "SKU & Pricing Management",
            description:
              "Manage online product variants, imagery, tiered discount pricing, and SEO-friendly metadata in one workspace.",
            tag: "CATALOG CONTROL",
            icon: Layers,
          },
        ],
        renderWorkstation: (activeSubsystem) => (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            {/* Live Web Orders Ingestion Stream */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white">ORDER INTAKE · QUEUE #WEB-9104</span>
                </div>
                <span className="font-mono text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                  ONLINE STOREFRONT · PAID
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "storefront" ? "border-brand/40 bg-brand/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Order #9104 · Olivia Bennett</span>
                    <span className="text-brand font-semibold">$89.50 (Card Auth OK)</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    2x Organic Single Origin (Whole Bean) · Express Courier
                  </div>
                </div>

                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "dispatch" ? "border-brand/40 bg-brand/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Dispatch Stage: Packing Table 03</span>
                    <span className="text-brand font-semibold text-[11px]">AWB GENERATED</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Tracking: #KX-EXP-884920 · Handover Scheduled 15:30
                  </div>
                </div>
              </div>
            </div>

            {/* Storefront Operations Summary */}
            <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">STOREFRONT METRICS</span>
                <span className="text-brand font-semibold">TODAY</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-slate-400">ORDERS INTAKE</span>
                  <p className="text-lg font-bold text-white mt-0.5">48 orders</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-slate-400">DISPATCHED</span>
                  <p className="text-lg font-bold text-brand mt-0.5">34 parcels</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Average Fulfillment Time:</span>
                  <span className="text-white font-semibold">42 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Catalog SKUs Published:</span>
                  <span className="text-white font-semibold">142 active</span>
                </div>
              </div>
            </div>
          </div>
        ),
      };

    case "crm":
      return {
        eyebrow: "Customer Relationship Architecture",
        headline: "Unified Customer Intelligence & Engagement",
        subheadline:
          "In active development as a future customer layer: track customer interactions, manage opportunities, and maintain unified communication records.",
        callouts: [
          {
            id: "timeline",
            label: "Customer Interaction Timeline",
            title: "Chronological Touchpoint Log",
            description:
              "Every inbound call, support inquiry, quote request, and store visit compiled into a single timeline for your sales team.",
            tag: "UNDER DEVELOPMENT",
            icon: Clock,
          },
          {
            id: "pipeline",
            label: "Opportunity Pipeline",
            title: "Visual Deal Stage Progression",
            description:
              "Track deals from initial contact to quote review and closing, with automatic stage milestone notifications.",
            tag: "COMING SOON",
            icon: Kanban,
          },
          {
            id: "profiles",
            label: "Account Profiles",
            title: "Rich Company & Contact Intelligence",
            description:
              "Centralized records with billing terms, contact hierarchies, purchase preferences, and communication notes.",
            tag: "CONCEPT PROTOTYPE",
            icon: UserCheck,
          },
          {
            id: "channels",
            label: "Omnichannel Communications",
            title: "Inbound & Outbound Messaging",
            description:
              "Plan outreach via email, phone notes, and internal team mentions directly within the customer's account file.",
            tag: "FUTURE ADDITION",
            icon: MessageSquare,
          },
        ],
        renderWorkstation: (activeSubsystem) => (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-amber animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white">ACCOUNT TIMELINE · CONTACT #CRM-104</span>
                </div>
                <span className="font-mono text-[11px] text-amber bg-amber/10 border border-amber/30 px-2 py-0.5 rounded">
                  CONCEPT PROTOTYPE
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "timeline" ? "border-amber/40 bg-amber/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Inquiry: Whole Bean Wholesale Contract</span>
                    <span className="text-amber font-semibold text-[11px]">OPPORTUNITY STAGE: PROPOSAL</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Acme Hospitality Group · Contact: David Wright (F&B Director)
                  </div>
                </div>

                <div className={cn("p-3 rounded-xl border transition-all", activeSubsystem === "pipeline" ? "border-amber/40 bg-amber/10" : "border-white/10 bg-white/[0.02]")}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Deal Value: $24,000 / year</span>
                    <span className="text-slate-300">Expected Close: Q4 2026</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Status: Sample contract shared, waiting on executive review
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">DEVELOPMENT ROADMAP</span>
                <span className="text-amber font-semibold">STAGE 2</span>
              </div>
              <div className="space-y-2 text-[11px] text-slate-300">
                <p>• Data schema finalized for accounts & contacts</p>
                <p>• Visual Kanban pipeline wireframes tested</p>
                <p>• Independent standalone workspace architecture</p>
              </div>
              <div className="rounded-lg bg-amber/10 border border-amber/20 p-2.5 text-[11px] text-amber">
                KAIONEX CRM is currently in development. Interested teams may register for early beta access.
              </div>
            </div>
          </div>
        ),
      };
  }
}
