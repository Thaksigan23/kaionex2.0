import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HomeFmsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-white border-t border-white/[0.08]">
      {/* Background Lighting Accent */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 -left-20 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[120px] opacity-30" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.85fr] xl:gap-16">
          {/* Left Column: Modern Financial Software Cockpit (~65% Width) */}
          <div className="relative min-w-0">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl opacity-30" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900/90 shadow-[0_24px_64px_rgba(7,17,31,0.7)] backdrop-blur-md">
              {/* Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500/70" />
                  <span className="size-2.5 rounded-full bg-amber-500/70" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-xs font-semibold text-slate-200">
                    KAIONEX FMS · Financial Console
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  Operating Ledger · Balanced
                </span>
              </div>

              {/* Financial Cockpit Body */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      Collections MTD
                    </span>
                    <p className="font-mono text-2xl font-bold text-white mt-1">
                      $128,450.00
                    </p>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Fiscal Q3</span>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      Operating Outlays
                    </span>
                    <p className="font-mono text-2xl font-bold text-white mt-1">
                      $86,270.00
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Categorized</span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                    <span className="text-[11px] font-mono text-emerald-400 block uppercase">
                      Net Cash Flow
                    </span>
                    <p className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                      +$42,180.00
                    </p>
                    <span className="text-[10px] text-emerald-300 block mt-0.5">Reconciled</span>
                  </div>
                </div>

                {/* Invoicing & Ledger Surface */}
                <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
                    <span className="text-slate-300">RECENT COMMERCIAL INVOICES</span>
                    <span className="text-emerald-400">186 CLEARED · NET-30</span>
                  </div>

                  <div className="py-3 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-200">
                      <div>
                        <p className="font-medium text-white">Invoice #INV-2026-089</p>
                        <span className="text-[11px] text-slate-400">Wholesale supply settlement</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-semibold">+$4,850.00</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-200 pt-2 border-t border-white/[0.04]">
                      <div>
                        <p className="font-medium text-white">Utility & Store Facility Outlay</p>
                        <span className="text-[11px] text-slate-400">Operating expense classified</span>
                      </div>
                      <span className="font-mono text-slate-300">-$1,240.00</span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.08] pt-3 flex justify-between items-center text-[11px] font-mono text-slate-400">
                    <span>Tax liability calculated</span>
                    <span className="text-emerald-400">Ledger balanced</span>
                  </div>
                </div>

                {/* Status Line */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="text-slate-300">General ledger records committed</span>
                  <span className="text-emerald-400">Audit-ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Marketing Storytelling (~35% Width) */}
          <div className="max-w-lg">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-400">
              03 / Finance & Ledgers
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Know where
              <br />
              <em className="not-italic text-emerald-400">your money is going.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              KAIONEX FMS offers a dedicated finance workspace built for business owners. Record commercial transactions, maintain balanced operating ledgers, issue professional invoices, and monitor cash-flow trajectory with complete clarity.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Operating general ledger with balanced transaction records</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Customer invoicing, receivables tracking, and payment status visibility</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Expense classification and cash runway monitoring</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/products/fms"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:border-white/30"
              >
                <span>Explore KAIONEX FMS</span>
                <ArrowRight size={15} className="text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
