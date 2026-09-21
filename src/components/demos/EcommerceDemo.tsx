"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoChrome } from "@/components/demos/DemoChrome";
import { useDemoCycle } from "@/components/demos/useDemoCycle";
import { useScenarioDemoStep } from "@/components/demos/useScenarioDemoStep";
import { OrderManifest } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

const stages = ["Store", "New order", "Processing", "Inventory", "Finance"] as const;
const STEP_COUNT = 6;

export function EcommerceDemo() {
  const { ref, step, reduce, setStep, restart } = useDemoCycle(STEP_COUNT, 2200);

  const activeStage = Math.min(step, stages.length - 1);
  const stock = step >= 3 ? 26 : 27;
  const orderStatus =
    step <= 1 ? "New" : step === 2 ? "Processing" : step === 3 ? "Inventory reserved" : step === 4 ? "Ready" : "Fulfilled";
  const revenueBump = step >= 4;

  useScenarioDemoStep("ecommerce", (scenarioStep) => {
    if (scenarioStep.event === "online_order_created") setStep(1);
    if (scenarioStep.event === "item_added") setStep(2);
    if (scenarioStep.event === "inventory_updated") setStep(3);
  });

  return (
    <div ref={ref}>
      <DemoChrome
        title="E-Commerce · Online store"
        subtitle="Sample order flow · fictional data"
        footer="E-Commerce ↔ POS inventory · E-Commerce → FMS revenue · Demo UI"
      >
        <div className="p-3">
          <div className="grid grid-cols-5 gap-1">
            {stages.map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-center rounded-lg px-0.5 py-2 text-center sm:rounded-xl sm:px-1.5",
                  i <= activeStage ? "bg-navy-900 text-white" : "bg-paper text-slate-400",
                )}
              >
                <span className="text-[9px] font-semibold uppercase tracking-wide">
                  {i + 1}
                </span>
                <span className="mt-0.5 text-[9px] font-medium leading-tight sm:text-[10px]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <motion.div
              key={orderStatus}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-black/5 p-3"
            >
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Order
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-900">
                #1048 · Ceramic Mug
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Status:{" "}
                <span
                  className={cn(
                    "font-semibold",
                    step >= 3 ? "text-brand" : "text-amber",
                  )}
                >
                  {orderStatus}
                </span>
              </p>
            </motion.div>

            <div className="rounded-xl border border-black/5 p-3">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Inventory · POS sync
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-900">
                Ceramic Mug · Sage
              </p>
              <motion.p
                key={stock}
                initial={reduce ? false : { scale: 1.06 }}
                animate={{ scale: 1 }}
                className="mt-1 text-xs text-slate-500"
              >
                Qty on hand:{" "}
                <span className="font-semibold text-navy-900">{stock}</span>
              </motion.p>
            </div>
          </div>

          <OrderManifest />
          <AnimatePresence>
            {revenueBump ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center justify-between rounded-xl bg-brand/10 px-3 py-2 text-sm"
              >
                <span className="text-navy-900">Posted to FMS</span>
                <span className="font-semibold text-brand">+$12.00 revenue</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="mt-2 flex justify-end">
            <button type="button" onClick={() => (step >= STEP_COUNT - 1 ? restart() : setStep((current) => Math.min(current + 1, STEP_COUNT - 1)))} className="rounded-md border border-brand/25 bg-brand/5 px-2 py-1 text-[10px] font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              {step >= STEP_COUNT - 1 ? "Replay order" : "Advance demo order"}
            </button>
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}
