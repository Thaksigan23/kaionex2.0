"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const productRows = [
  {
    number: "01",
    name: "KAIONEX POS",
    subtitle: "Point of Sale",
    description: "Fast counter checkout and offline-ready billing for retail stores and cafes.",
    status: "Available",
    href: "/products/pos",
    previewHint: "Counter checkout · Offline billing",
  },
  {
    number: "02",
    name: "KAIONEX EMS",
    subtitle: "Employee & Work Management",
    description: "Shift scheduling, attendance tracking, and floor task coordination in one workspace.",
    status: "Available",
    href: "/products/ems",
    previewHint: "Staff rosters · Shift attendance",
  },
  {
    number: "03",
    name: "KAIONEX FMS",
    subtitle: "Finance Management",
    description: "Operating ledgers, commercial invoicing, and cash-flow visibility built for business owners.",
    status: "Available",
    href: "/products/fms",
    previewHint: "General ledgers · Invoicing",
  },
  {
    number: "04",
    name: "E-Commerce",
    subtitle: "Online Commerce",
    description: "Digital storefronts, online catalog, and order intake for packaging and dispatch.",
    status: "Available",
    href: "/products/ecommerce",
    previewHint: "Storefront · Order intake",
  },
];

export function ProductFamilyIntro() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 text-slate-900 border-y border-slate-200/80">
      {/* Very faint architectural background grid */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16 xl:gap-20">
          {/* Left Column: Editorial Introduction */}
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-700">
              01 // Product Portfolio
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl text-balance">
              Built for the way your business works.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Four focused products for sales, people, finance, and online commerce.
            </p>
          </div>

          {/* Right Column: Editorial Product Index Rows (NO BOXES, NO 4-CARD GRIDS) */}
          <div className="border-t border-slate-200">
            {productRows.map((row, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <Link
                  key={row.name}
                  href={row.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative flex flex-col justify-between border-b border-slate-200 py-6 transition-colors duration-200 sm:flex-row sm:items-center hover:border-slate-300"
                >
                  {/* Left: Number + Name + Subtitle + Description */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-emerald-700 transition pt-1">
                      {row.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-2xl font-bold text-navy-950 tracking-tight transition group-hover:text-emerald-700 sm:text-3xl">
                          {row.name}
                        </h3>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-700 uppercase">
                          {row.status}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-800">{row.subtitle}</span>
                        <span className="text-slate-400 hidden sm:inline">·</span>
                        <span className="text-slate-600">{row.description}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Clean Text Link & Hover Reveal Pill */}
                  <div className="mt-4 flex items-center justify-between sm:mt-0 sm:shrink-0 sm:gap-4">
                    <span
                      className={cn(
                        "rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-mono text-slate-600 transition-opacity duration-200 shadow-sm",
                        isHovered ? "opacity-100" : "opacity-0 sm:opacity-0",
                      )}
                    >
                      {row.previewHint}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 transition">
                      <span>Explore</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* CRM Refined Editorial Teaser */}
            <div className="mt-8 flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 transition sm:flex-row sm:items-center sm:p-7">
              <div className="flex items-start gap-4 sm:gap-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 border border-amber-300/60 mt-0.5">
                  <Clock size={18} />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase">
                      Coming Soon
                    </span>
                    <span className="size-1 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Under Development
                    </span>
                  </div>
                  <h4 className="mt-1 font-display text-xl font-bold text-navy-950 tracking-tight sm:text-2xl">
                    KAIONEX CRM
                  </h4>
                  <p className="mt-1 max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Customer relationship management and opportunity tracking planned as a future suite addition.
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 sm:shrink-0">
                <Link
                  href="/contact?interest=crm"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2 text-xs font-semibold text-amber-900 shadow-sm transition hover:bg-amber-50"
                >
                  <span>Get Updates</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
