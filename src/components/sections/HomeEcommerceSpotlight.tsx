import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HomeEcommerceSpotlight() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 text-slate-900 border-y border-slate-200/80">
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.35fr] xl:gap-16">
          {/* Left Column: Editorial Marketing Storytelling (~35% Width) */}
          <div className="max-w-lg">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-700">
              04 / Digital Commerce
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Sell online.
              <br />
              <em className="not-italic text-emerald-700">Fulfill with speed.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              E-Commerce provides an independent digital storefront and order intake system. Receive customer orders online, track order status, and coordinate dispatch from catalog to fulfillment.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Responsive digital storefront with modern product catalog browsing</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Online order intake and customer order status tracking</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Order packaging queues and dispatch tracking</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/products/ecommerce"
                className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-900"
              >
                <span>Explore E-Commerce</span>
                <ArrowRight size={15} className="text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Storefront-Oriented Visual Composition (~65% Width) */}
          <div className="relative min-w-0">
            {/* Main Application Frame with Light/High-Contrast Styling */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              {/* Chrome Header */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-xs font-semibold text-navy-950">
                    E-Commerce · Storefront Management
                  </span>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[10px] font-mono text-emerald-800 font-semibold">
                  Online Storefront Active
                </span>
              </div>

              {/* Storefront Visual Body */}
              <div className="p-6 sm:p-7 space-y-5 bg-white">
                {/* Catalog Tiles Preview */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                    <span className="font-semibold text-navy-950 uppercase tracking-wider text-[11px]">
                      Catalog Preview
                    </span>
                    <span className="font-mono text-slate-500">Sample products</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                          <ShoppingBag size={16} />
                        </span>
                        <div>
                          <p className="font-semibold text-navy-950 text-xs sm:text-sm">Whole Bean Roast</p>
                          <span className="text-[11px] font-mono text-slate-500">In Stock · $35.00</span>
                        </div>
                      </div>
                      <span className="rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-semibold px-2 py-0.5">
                        Live
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                          <ShoppingBag size={16} />
                        </span>
                        <div>
                          <p className="font-semibold text-navy-950 text-xs sm:text-sm">Pour-Over Dripper</p>
                          <span className="text-[11px] font-mono text-slate-500">In Stock · $28.00</span>
                        </div>
                      </div>
                      <span className="rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-semibold px-2 py-0.5">
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Intake Queue Panel */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                    <span className="font-mono font-bold text-navy-950">DEMO ORDER #9104</span>
                    <span className="font-mono text-emerald-700 font-bold">$70.00</span>
                  </div>

                  <div className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-navy-950">2× Whole Bean Roast (1kg)</p>
                      <span className="text-[11px] text-slate-600">Standard Delivery · Online order</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 font-mono text-[10px] text-emerald-800 font-semibold">
                      Order Received
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-[11px] font-mono text-slate-600">
                    <span>Fulfillment: Packaging completed</span>
                    <span className="text-emerald-700 font-semibold">Ready for Dispatch</span>
                  </div>
                </div>

                {/* Summary Note */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 pt-1">
                  <span>Digital storefront intake</span>
                  <span className="text-emerald-700 font-semibold">Order intake active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
