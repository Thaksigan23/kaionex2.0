"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Six-beat sequence (preserved):
 * 0 chart · 1 E-Com order · 2 EMS task · 3 POS inventory · 4 FMS txn · 5 hub pulse
 */
const STEP_COUNT = 6;
const STEP_MS = 2600;

/** Hub at ~center; satellites fully outside the dashboard footprint. */
const nodes = [
  {
    id: "pos",
    label: "POS",
    metricKey: "pos",
    x: "1%",
    y: "4%",
    path: "M95 72 C 170 120, 230 160, 300 200",
    soon: false,
  },
  {
    id: "ems",
    label: "EMS",
    metricKey: "ems",
    x: "78%",
    y: "4%",
    path: "M505 72 C 430 120, 370 160, 300 200",
    soon: false,
  },
  {
    id: "ecom",
    label: "E-Commerce",
    metricKey: "ecom",
    x: "1%",
    y: "58%",
    path: "M95 300 C 170 270, 230 240, 300 215",
    soon: false,
  },
  {
    id: "fms",
    label: "FMS",
    metricKey: "fms",
    x: "78%",
    y: "58%",
    path: "M505 300 C 430 270, 370 240, 300 215",
    soon: false,
  },
  {
    id: "crm",
    label: "CRM",
    metricKey: "crm",
    x: "50%",
    y: "88%",
    path: "M300 420 C 300 360, 300 300, 300 250",
    soon: true,
    centerX: true,
  },
] as const;

function DemoChip() {
  return (
    <span className="rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/55">
      Demo UI
    </span>
  );
}

function useVisibleCycle(stepCount: number, intervalMs: number) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % stepCount);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduce, visible, stepCount, intervalMs]);

  return {
    ref,
    step: reduce ? 4 : step,
    reduce: Boolean(reduce),
  };
}

export function HeroCommandCenter({ className }: { className?: string }) {
  const { ref, step, reduce } = useVisibleCycle(STEP_COUNT, STEP_MS);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 22 });
  const sy = useSpring(my, { stiffness: 50, damping: 22 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / 70);
      my.set((e.clientY - cy) / 90);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const orders = step >= 1 ? 313 : 312;
  const taskDone = step >= 2;
  const inventory = step >= 3 ? "$84.0k" : "$84.2k";
  const revenue = step >= 4 ? "$128.5k" : "$128.4k";
  const showTxn = step === 4 || reduce;
  const hubPulse = step === 5;

  /** Which available product drives the current beat */
  const activeId =
    step === 1
      ? "ecom"
      : step === 2
        ? "ems"
        : step === 3
          ? "pos"
          : step === 4
            ? "fms"
            : step === 5
              ? "all"
              : null;

  const nodeMetrics: Record<string, { metric: string; value: string }> = {
    pos: {
      metric: "Sales",
      value: step >= 3 ? "$4.2k" : "$4.1k",
    },
    ems: {
      metric: taskDone ? "Task" : "On shift",
      value: taskDone ? "Done" : "36",
    },
    fms: {
      metric: "Finance",
      value: revenue,
    },
    ecom: {
      metric: "Orders",
      value: String(orders),
    },
    crm: { metric: "Pipeline", value: "Soon" },
  };

  const activity = [
    step >= 1 ? "E-Com · Order #1048" : "Waiting for activity",
    taskDone ? "EMS · Restock completed" : "EMS · Task assigned",
    step >= 3 ? "POS · Inventory −2" : "POS · Counters ready",
  ];

  const railActive =
    activeId === "all"
      ? ["pos", "ems", "fms", "ecom"]
      : activeId
        ? [activeId]
        : [];

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative hidden aspect-[5/4] w-full max-w-none lg:block",
        className,
      )}
      style={reduce ? undefined : { x: sx, y: sy }}
      aria-hidden
    >
      {/* Connection paths + packets */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 600 480"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12c98c" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#12c98c" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0f9aa8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {nodes.map((node) => {
          const isCrm = node.soon;
          const active =
            !isCrm &&
            (activeId === node.id || activeId === "all" || hubPulse);
          const crmPulse = isCrm && hubPulse;
          return (
            <g key={node.id}>
              <motion.path
                d={node.path}
                stroke={
                  isCrm
                    ? "rgba(217,119,6,0.45)"
                    : active
                      ? "url(#hero-flow)"
                      : "rgba(255,255,255,0.14)"
                }
                strokeWidth={active || crmPulse ? 1.6 : 1}
                strokeDasharray={isCrm ? "3 6" : "4 7"}
                initial={false}
                animate={
                  reduce
                    ? { strokeDashoffset: 0, opacity: isCrm ? 0.4 : 0.55 }
                    : {
                        strokeDashoffset:
                          active || crmPulse ? [20, 0] : 0,
                        opacity: active || crmPulse ? 1 : isCrm ? 0.35 : 0.4,
                      }
                }
                transition={{
                  duration: active && !reduce ? 1.8 : 0.35,
                  repeat: active && !reduce ? Infinity : 0,
                  ease: "linear",
                }}
              />
              {active && !reduce && !isCrm ? (
                <circle r="3.2" fill="#12c98c" opacity="0.95">
                  <animateMotion
                    dur="1.7s"
                    repeatCount="indefinite"
                    path={node.path}
                  />
                </circle>
              ) : null}
              {crmPulse && !reduce ? (
                <circle r="2.4" fill="#d97706" opacity="0.65">
                  <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    path={node.path}
                    keyPoints="0;0.4;0"
                    keyTimes="0;0.55;1"
                    calcMode="linear"
                  />
                </circle>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Satellite product modules — outside hub */}
      {nodes.map((node, index) => {
        const metrics = nodeMetrics[node.metricKey];
        const lit =
          (!node.soon && (activeId === node.id || activeId === "all")) ||
          (node.soon && hubPulse);
        return (
          <motion.div
            key={node.id}
            className={cn(
              "absolute z-20",
              "centerX" in node && node.centerX && "-translate-x-1/2",
            )}
            style={{ left: node.x, top: node.y }}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.04, duration: 0.35 }}
          >
            <div
              className={cn(
                "w-[7.25rem] rounded-lg border px-2.5 py-2 shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition xl:w-[7.75rem]",
                node.soon
                  ? "border-dashed border-amber/40 bg-navy-950/90"
                  : lit
                    ? "border-brand/50 bg-navy-900/95 ring-1 ring-brand/25"
                    : "border-white/16 bg-navy-900/88",
              )}
            >
              <div className="flex items-center justify-between gap-1">
                <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-white/80">
                  {node.label}
                </p>
                {node.soon ? (
                  <span className="shrink-0 rounded bg-amber/15 px-1 py-0.5 text-[8px] font-semibold uppercase text-amber">
                    Soon
                  </span>
                ) : (
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      lit
                        ? "bg-brand-light shadow-[0_0_6px_rgba(18,201,140,0.75)]"
                        : "bg-brand-light/50",
                    )}
                  />
                )}
              </div>
              <p className="mt-0.5 text-[9px] uppercase tracking-wide text-white/35">
                {metrics.metric}
              </p>
              <motion.p
                key={metrics.value}
                initial={reduce ? false : { opacity: 0.45 }}
                animate={{ opacity: 1 }}
                className="text-sm font-semibold tabular-nums text-white"
              >
                {metrics.value}
              </motion.p>
            </div>
          </motion.div>
        );
      })}

      {/* Central Command Center hub */}
      <motion.div
        className="absolute left-1/2 top-[42%] z-10 w-[56%] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 xl:w-[54%] xl:max-w-[24rem]"
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: hubPulse
            ? "0 0 0 1px rgba(18,201,140,0.35)"
            : "0 0 0 0 rgba(18,201,140,0)",
        }}
        transition={{ duration: 0.45, delay: 0.06 }}
      >
        <div
          className={cn(
            "overflow-hidden rounded-xl border bg-navy-950/96 shadow-[0_22px_55px_rgba(0,0,0,0.5)] backdrop-blur-xl",
            hubPulse
              ? "border-brand/35 ring-1 ring-brand/20"
              : "border-white/14",
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2.5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-soft">
                KAIONEX
              </p>
              <p className="text-sm font-semibold text-white">Command Center</p>
            </div>
            <div className="flex items-center gap-1.5">
              <DemoChip />
              <span className="hidden rounded-md bg-brand/15 px-2 py-0.5 text-[9px] font-semibold text-brand-soft sm:inline">
                Sample data
              </span>
            </div>
          </div>

          <div className="flex">
            {/* Compact system rail */}
            <div className="flex w-9 shrink-0 flex-col items-center gap-1.5 border-r border-white/10 bg-white/[0.02] py-2.5">
              {[
                { id: "pos", label: "P" },
                { id: "ems", label: "E" },
                { id: "fms", label: "F" },
                { id: "ecom", label: "C" },
              ].map((item) => (
                <span
                  key={item.id}
                  className={cn(
                    "flex size-6 items-center justify-center rounded-md text-[9px] font-bold",
                    railActive.includes(item.id)
                      ? "bg-brand/25 text-brand-soft"
                      : "bg-white/5 text-white/40",
                  )}
                  title={item.id}
                >
                  {item.label}
                </span>
              ))}
              <span
                className="mt-auto size-1.5 rounded-full border border-dashed border-amber/40 bg-amber/20"
                title="CRM Coming Soon"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-2 gap-1.5 p-2.5 sm:grid-cols-4">
                {[
                  { label: "Revenue", value: revenue },
                  { label: "Orders", value: String(orders) },
                  { label: "Inventory", value: inventory },
                  { label: "Employees", value: taskDone ? "36" : "36" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5"
                  >
                    <p className="text-[8px] uppercase tracking-wide text-white/40">
                      {item.label}
                    </p>
                    <motion.p
                      key={item.value}
                      initial={reduce ? false : { opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="mt-0.5 text-xs font-semibold tabular-nums text-white sm:text-sm"
                    >
                      {item.value}
                    </motion.p>
                  </div>
                ))}
              </div>

              <div className="grid gap-1.5 border-t border-white/10 p-2.5 sm:grid-cols-[1.2fr_1fr]">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <p className="text-[10px] font-medium text-white/50">
                    Today&apos;s sales
                  </p>
                  <div className="mt-1.5 flex h-10 items-end gap-1">
                    {[40, 58, 46, 72, 64, 80, 68, 88, 74, step >= 1 ? 96 : 90].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-[1px] bg-gradient-to-t from-brand/35 to-brand-light/85"
                          initial={reduce ? false : { height: 4 }}
                          animate={{ height: `${h}%` }}
                          transition={{
                            delay: reduce ? 0 : i * 0.03,
                            duration: 0.4,
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="relative space-y-1 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <p className="text-[10px] font-medium text-white/50">
                    Activity
                  </p>
                  {activity.map((item) => (
                    <div
                      key={item}
                      className="truncate rounded-md bg-white/5 px-1.5 py-1 text-[10px] text-white/65"
                    >
                      {item}
                    </div>
                  ))}
                  <AnimatePresence>
                    {showTxn ? (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-1.5 bottom-1.5 rounded-md border border-brand/30 bg-navy-950/95 px-1.5 py-1 text-[9px] font-medium text-brand-soft"
                      >
                        Txn · +$61.05 → FMS
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Simplified mobile/tablet hero visual — not a shrunk desktop diagram */
export function HeroMobileVisual() {
  const { ref, step, reduce } = useVisibleCycle(5, 2400);
  const products = ["POS", "EMS", "FMS", "E-Com", "CRM"] as const;
  const snippets = [
    { title: "Checkout", detail: "Sale · $61.05 · card approved" },
    { title: "Workforce", detail: "Task completed · Floor restock" },
    { title: "Finance", detail: "Revenue posted · sample ledger" },
    { title: "Online order", detail: "Order #1048 · inventory synced" },
    { title: "CRM preview", detail: "Coming Soon · not released" },
  ];

  return (
    <div ref={ref} className="lg:hidden" aria-hidden>
      <div className="overflow-hidden rounded-xl border border-white/12 bg-navy-950/95 shadow-kx-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-soft">
              KAIONEX
            </p>
            <p className="text-sm font-semibold text-white">Command Center</p>
          </div>
          <DemoChip />
        </div>
        <div className="flex gap-1.5 overflow-x-auto px-3.5 py-2.5">
          {products.map((label, i) => (
            <span
              key={label}
              className={cn(
                "shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold",
                i === step
                  ? "bg-brand text-navy-950"
                  : "bg-white/5 text-white/50",
              )}
            >
              {label}
              {label === "CRM" ? (
                <span className="ml-1 text-[9px] text-amber">Soon</span>
              ) : null}
            </span>
          ))}
        </div>
        <div className="px-3.5 pb-3">
          <motion.div
            key={reduce ? "static" : step}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-wide text-white/40">
              {snippets[step].title}
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {snippets[step].detail}
            </p>
          </motion.div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { label: "Sales", value: "$4.2k" },
              { label: "Orders", value: "86" },
              { label: "Tasks", value: "17" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2"
              >
                <p className="text-[9px] uppercase text-white/40">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="border-t border-white/10 px-3.5 py-2 text-[11px] text-white/45">
          Sample data · CRM coming soon
        </p>
      </div>
    </div>
  );
}
