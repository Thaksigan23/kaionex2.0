import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HomePosSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-white">
      {/* Background Lighting Accent */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 -left-20 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[120px] opacity-30" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.85fr] xl:gap-16">
          {/* Left Column: Massive POS Interface & Device Presentation (~65% Width) */}
          <div className="relative min-w-0">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl opacity-30" />

            {/* Main Application Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900/90 shadow-[0_24px_64px_rgba(7,17,31,0.7)] backdrop-blur-md">
              {/* Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500/70" />
                  <span className="size-2.5 rounded-full bg-amber-500/70" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-xs font-semibold text-slate-200">
                    KAIONEX POS · Counter Station
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  Offline-Ready · Active
                </span>
              </div>

              {/* Workstation UI Body */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Active Register Information */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white">Lane 02 · Active Register</span>
                  </div>
                  <span className="font-mono text-slate-400">Drawer Float: $420.00</span>
                </div>

                {/* Cart Line Items */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
                    <div>
                      <p className="font-medium text-white text-sm">Organic Reserve Roast (1kg)</p>
                      <span className="font-mono text-xs text-slate-400">SKU #8849-012 · Qty: 2</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-white">$37.00</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
                    <div>
                      <p className="font-medium text-white text-sm">Ceramic Travel Tumbler</p>
                      <span className="font-mono text-xs text-slate-400">SKU #4912-882 · Qty: 1</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-white">$18.50</span>
                  </div>
                </div>

                {/* Checkout Balance & Actions */}
                <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      TOTAL DUE (INCL. TAX)
                    </span>
                    <p className="font-mono text-3xl font-bold text-white mt-0.5">$61.05</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-mono font-medium text-slate-200">
                      Cash Tender
                    </span>
                    <span className="rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-navy-950 shadow-[0_0_20px_rgba(0,179,122,0.35)] flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>Payment recorded</span>
                    </span>
                  </div>
                </div>

                {/* Subtle Status Line */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="text-slate-300">Sales receipt generated · Drawer recorded</span>
                  <span className="text-emerald-400">Local records armed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Marketing Storytelling (~35% Width) */}
          <div className="max-w-lg">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-400">
              01 / Sales & Counter Operations
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Fast at the counter.
              <br />
              <em className="not-italic text-emerald-400">Reliable offline.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              KAIONEX POS is built for retail counters, cafes, and store checkouts. It keeps sales, local inventory, and payments recorded when internet drops, syncing automatically when you reconnect.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Offline-ready billing that continues selling during network outages</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Fast checkout with barcode scanning and flexible payment recording</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Shift drawer float tracking, receipts, and multi-register reporting</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/products/pos"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:border-white/30"
              >
                <span>Explore KAIONEX POS</span>
                <ArrowRight size={15} className="text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
