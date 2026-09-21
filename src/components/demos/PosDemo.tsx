"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoChrome } from "@/components/demos/DemoChrome";
import { useDemoCycle } from "@/components/demos/useDemoCycle";
import { useScenarioDemoStep } from "@/components/demos/useScenarioDemoStep";
import { Coffee, CupSoda, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const catalog = [
  { id: "p1", name: "Organic Coffee Beans", price: 18.5, stock: 42 },
  { id: "p2", name: "Ceramic Mug · Sage", price: 12.0, stock: 28 },
  { id: "p3", name: "Gift Card $25", price: 25.0, stock: 99 },
];

/** Steps: browse → add → qty → total → pay → done → receipt → inventory → hold */
const STEP_COUNT = 9;

export function PosDemo() {
  const { ref, step, reduce, setStep, restart } = useDemoCycle(STEP_COUNT, 2000);

  const selected = step >= 0;
  const inCart = step >= 1;
  const qty = step >= 2 ? 2 : inCart ? 1 : 0;
  const showTotal = step >= 3 || (reduce && inCart);
  const paying = step === 4 || step === 5;
  const paid = step >= 5;
  const receipt = step >= 6;
  const inventoryPulse = step >= 7;

  const lineTotal = catalog[0].price * Math.max(qty, 0);
  const tax = lineTotal * 0.1;
  const total = lineTotal + tax;
  const stockLeft = inventoryPulse ? catalog[0].stock - qty : catalog[0].stock;

  useScenarioDemoStep("pos", (scenarioStep) => {
    if (scenarioStep.event === "sale_started") setStep(1);
    if (scenarioStep.event === "payment_completed") setStep(5);
    if (scenarioStep.event === "inventory_updated") setStep(7);
    if (scenarioStep.event === "online_order_created") setStep(2);
  });

  return (
    <div ref={ref}>
      <DemoChrome
        title="KAIONEX POS · Lane 02"
        subtitle="Sample checkout · fictional data"
        tone="dark"
        footer={
          inventoryPulse
            ? `Inventory updated · Coffee Beans → ${stockLeft} in stock`
            : "Offline-ready billing · Demo UI"
        }
      >
        <div className="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/10 p-3 sm:border-b-0 sm:border-r">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Products
            </p>
            <div className="space-y-1.5">
              {catalog.map((item, i) => {
                const active = selected && i === 0 && step < 4;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (i === 0) setStep(1);
                    }}
                    aria-label={
                      i === 0
                        ? `Add ${item.name} to the demonstration cart`
                        : `${item.name} sample product`
                    }
                    className={cn(
                      "w-full rounded-xl px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light",
                      active
                        ? "bg-brand/20 ring-1 ring-brand/40"
                        : "bg-white/5 text-white/75",
                    )}
                    animate={
                      active && !reduce
                        ? { scale: [1, 1.02, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.45 }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-medium text-white"><span className="kx-catalog-icon">{i === 0 ? <Coffee size={21} /> : i === 1 ? <CupSoda size={21} /> : <Gift size={21} />}</span>{item.name}</span>
                      <span className="text-white/70">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-white/40">
                      Stock {i === 0 ? stockLeft : item.stock}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Cart
            </p>
            <div className="min-h-[9.5rem] space-y-2">
              <AnimatePresence mode="popLayout">
                {inCart ? (
                  <motion.div
                    key="cart-line"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl bg-white/5 px-3 py-2.5 text-sm"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="text-white/85">{catalog[0].name}</span>
                      <span className="font-semibold text-white">
                        ×{qty}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-white/45">
                      <span>${catalog[0].price.toFixed(2)} each</span>
                      <span>${lineTotal.toFixed(2)}</span>
                    </div>
                    {!paid ? (
                      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="text-[10px] text-white/45">Demo quantity</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            disabled={qty === 1}
                            aria-label="Reduce demonstration quantity"
                            className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            aria-label="Increase demonstration quantity"
                            className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                ) : (
                  <p className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-white/35">
                    Select a product to begin
                  </p>
                )}
              </AnimatePresence>

              {showTotal ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1 border-t border-white/10 pt-2 text-sm"
                >
                  <div className="flex justify-between text-white/50">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-white">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={reduce ? false : { scale: 1.08 }}
                      animate={{ scale: 1 }}
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                  {!paid ? (
                    <button type="button" onClick={() => setStep(reduce ? 7 : 4)} className="mt-2 w-full rounded-lg bg-brand px-2.5 py-2 text-xs font-bold text-navy-950 transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light">
                      Checkout demo
                    </button>
                  ) : null}
                </motion.div>
              ) : null}
            </div>

            <AnimatePresence>
              {paying ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-3 bottom-3 rounded-xl border border-brand/35 bg-navy-950/95 p-3 shadow-kx-md"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-soft">
                    Payment
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Card · •••• 4821
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {paid ? "Approved · receipt ready" : "Authorizing…"}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      initial={{ width: "8%" }}
                      animate={{ width: paid ? "100%" : "62%" }}
                      transition={{ duration: reduce ? 0 : 0.8 }}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {receipt && !paying ? (
                <motion.div
                  key="receipt"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 rounded-xl bg-brand/15 px-3 py-2 text-center text-xs font-medium text-brand-soft"
                >
                  Sale complete · SMS · Print · Email
                </motion.div>
              ) : null}
              {receipt ? (
                <button key="replay" type="button" onClick={restart} className="mt-2 text-[10px] font-semibold text-brand-soft underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light">
                  Replay checkout demo
                </button>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}
