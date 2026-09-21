"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoChrome } from "@/components/demos/DemoChrome";
import { useDemoCycle } from "@/components/demos/useDemoCycle";
import { useScenarioDemoStep } from "@/components/demos/useScenarioDemoStep";
import { FinanceBreakdown } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

const bars = [36, 48, 42, 60, 54, 72, 68];
const STEP_COUNT = 6;

export function FmsDemo() {
  const { ref, step, reduce, setStep, restart } = useDemoCycle(STEP_COUNT, 2300);

  const revenue = step >= 2 ? "$48.6k" : "$48.2k";
  const invoicePaid = step >= 3;
  const chartBoost = step >= 4;
  const showTxn = step >= 1;

  useScenarioDemoStep("fms", (scenarioStep) => {
    if (scenarioStep.event === "payment_completed") setStep(2);
    if (scenarioStep.event === "finance_updated" || scenarioStep.event === "order_fulfilled") setStep(4);
    if (scenarioStep.event === "inventory_updated") setStep(3);
  });

  return (
    <div ref={ref}>
      <DemoChrome
        title="KAIONEX FMS · Finance"
        subtitle="Sample ledgers · fictional figures"
        footer="Demo UI · not real KAIONEX or customer financials"
      >
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: "Revenue", value: revenue },
              { label: "Expenses", value: "$19.6k" },
              { label: "Cash flow", value: "+$12.4k" },
              { label: "Open invoices", value: invoicePaid ? "11" : "12" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-paper px-2.5 py-2">
                <p className="text-[10px] text-slate-500">{item.label}</p>
                <motion.p
                  key={item.value}
                  initial={reduce ? false : { opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold text-navy-900"
                >
                  {item.value}
                </motion.p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-black/5 p-3">
            <p className="text-[11px] font-medium text-slate-500">Weekly cash flow</p>
            <div className="mt-2 flex h-16 items-end gap-1.5">
              {bars.map((h, i) => {
                const height = chartBoost && i === bars.length - 1 ? h + 14 : h;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-md bg-gradient-to-t from-teal/25 to-brand"
                    initial={reduce ? false : { height: 8 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: reduce ? 0 : i * 0.04, duration: 0.45 }}
                  />
                );
              })}
            </div>
          </div>

          <FinanceBreakdown />
          <div className="mt-3 min-h-36 space-y-2">
            <AnimatePresence mode="popLayout">
              {showTxn ? (
                <motion.div
                  key="txn"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-xl border border-brand/20 bg-brand/5 px-3 py-2 text-sm"
                >
                  <span className="text-navy-900">POS sale · #POS-8841</span>
                  <span className="font-semibold text-brand">+$61.05</span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2 text-sm">
              <span className="text-slate-600">INV-2041 · Northwind Café</span>
              <motion.span
                key={String(invoicePaid)}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  invoicePaid
                    ? "bg-brand/15 text-brand"
                    : "bg-amber/15 text-amber",
                )}
              >
                {invoicePaid ? "Paid · $3,480" : "Pending · $3,480"}
              </motion.span>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => (showTxn ? restart() : setStep(2))} className="rounded-md border border-brand/25 bg-brand/5 px-2 py-1 text-[10px] font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                {showTxn ? "Replay finance demo" : "Record demo sale"}
              </button>
            </div>
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}
