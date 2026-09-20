"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    kpis: [
      { label: "Revenue (MTD)", value: "$128,450", note: "+14.2%" },
      { label: "Open Orders", value: "312", note: "48 pending" },
      { label: "Inventory Value", value: "$84,200", note: "96% in stock" },
      { label: "Active Users", value: "42", note: "7 branches" },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    kpis: [
      { label: "Today's Sales", value: "$12,840", note: "POS + Online" },
      { label: "Avg Ticket", value: "$61.05", note: "Lane 02" },
      { label: "Conversion", value: "3.8%", note: "Store traffic" },
      { label: "Refunds", value: "0.4%", note: "Within range" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    kpis: [
      { label: "SKUs Tracked", value: "4,812", note: "All locations" },
      { label: "Low Stock", value: "8", note: "Below minimum" },
      { label: "Transfers", value: "14", note: "In progress" },
      { label: "Accuracy", value: "98.2%", note: "Cycle count" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    kpis: [
      { label: "Cash Position", value: "$28.6k", note: "Net" },
      { label: "Invoices Paid", value: "186", note: "This month" },
      { label: "Expenses", value: "$19.6k", note: "Under budget" },
      { label: "AR Aging", value: "12d", note: "Average" },
    ],
  },
  {
    id: "employees",
    label: "Employees",
    kpis: [
      { label: "On Shift", value: "36", note: "Across branches" },
      { label: "Attendance", value: "94%", note: "Today" },
      { label: "Leave Requests", value: "6", note: "Pending" },
      { label: "Hours Logged", value: "1,024h", note: "This week" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    kpis: [
      { label: "Top Channel", value: "POS", note: "62% of sales" },
      { label: "Top Category", value: "Grocery", note: "+9% MoM" },
      { label: "Peak Hour", value: "6–8 PM", note: "Weekend" },
      { label: "Repeat Rate", value: "41%", note: "30-day" },
    ],
  },
] as const;

export function DashboardPreview() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("overview");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-black/5 bg-paper py-14 sm:py-16 lg:py-20">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Product UI"
            title="Built for the way modern businesses work."
            description="Illustrative KAIONEX workspace previews — finance, inventory, sales, employees, and analytics connected in one place. Numbers shown are demo UI samples, not customer statistics."
            align="center"
            className="mb-7"
          />
        </Reveal>

        <div
          role="tablist"
          aria-label="Dashboard views"
          className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                active === tab.id
                  ? "bg-navy-900 text-white"
                  : "bg-paper text-slate-600 hover:bg-slate-100",
              )}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            role="tabpanel"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-7 overflow-hidden rounded-xl border border-black/[0.07] bg-navy-950 p-4 text-white shadow-kx-lg sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-soft">
                  KAIONEX
                </p>
                <p className="text-lg font-semibold">{current.label} workspace</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                Illustrative demo UI
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {current.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5"
                >
                  <p className="text-xs text-white/50">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-xs text-brand-soft">{kpi.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
