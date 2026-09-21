"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowRight, Layers3, Check } from "lucide-react";
import { useSceneProgress } from "./useSceneProgress";
import { useCinematicMotion } from "./useCinematicMotion";
import { cn } from "@/lib/utils";

export function ConnectedEvent() {
  const { ref, progress, step } = useSceneProgress(5);
  const cinematic = useCinematicMotion();

  // Controlled progress interpolation:
  // 0.0 -> 0.35: Event travels from POS to Core
  // 0.35 -> 0.70: Core receives event and illuminates paths
  // 0.70 -> 1.0: 3 operational outcomes activate sequentially
  const eventY = useTransform(progress, [0, 0.4], [0, 65]);
  const coreScale = useTransform(progress, [0.3, 0.45, 0.6], [0.95, 1.04, 1]);
  const coreBorder = useTransform(
    progress,
    [0.3, 0.45],
    ["rgba(255,255,255,0.12)", "rgba(111,227,182,0.6)"],
  );
  const pathProgress = useTransform(progress, [0.4, 0.75], [0, 1]);

  return (
    <section
      ref={ref}
      className="cine-connection"
      aria-label="Follow the illustrative sale through KAIONEX"
    >
      <div className="cine-connection-sticky">
        <div className="cine-connection-heading">
          <p className="cine-eyebrow">THE MOMENT SYSTEMS CONNECT</p>
          <h2>
            A sale doesn’t stop
            <br />
            <em>at the counter.</em>
          </h2>
          <p>
            One action becomes shared context.
            <br />
            Follow the same demo sale through KAIONEX.
          </p>
        </div>

        {/* Visual Shared Operational Layer: POS -> CORE -> 3 Outcomes */}
        <div className="cine-event-stage">
          {/* Top origin: POS */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-slate-400 mb-3 px-1">
            <span className="flex items-center gap-1.5 text-brand">
              <Check size={12} />
              COUNTER 02 / SALE COMPLETED
            </span>
            <span>SHARED OPERATIONAL FLOW</span>
          </div>

          {/* Travelling Transaction Card */}
          <motion.div
            className="cine-travelling-event"
            style={cinematic ? { y: eventY } : undefined}
          >
            <span className="cine-event-dot" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <small>DEMO TRANSACTION · POS-8841</small>
                <span className="text-[9px] font-mono text-brand font-semibold">
                  +$40.70
                </span>
              </div>
              <strong>
                2 × Organic Coffee Beans
                <b className="ml-2 font-normal text-slate-400">Paid by Card</b>
              </strong>
            </div>
            <ArrowRight size={16} className="text-brand shrink-0" />
          </motion.div>

          {/* Core Hub */}
          <div className="relative my-6 flex flex-col items-center">
            {/* Connecting line down to Core */}
            <div className="h-6 w-px bg-gradient-to-b from-brand to-brand/40" />

            {/* Core Node */}
            <motion.div
              className="relative flex items-center gap-2.5 rounded-xl border bg-navy-900 px-5 py-3 shadow-[0_12px_28px_rgba(7,17,31,0.5)] z-10"
              style={
                cinematic ? { scale: coreScale, borderColor: coreBorder } : undefined
              }
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-brand/20 text-brand">
                <Layers3 size={15} />
              </span>
              <div>
                <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                  CENTRAL PLATFORM
                </span>
                <strong className="block text-sm font-semibold text-white tracking-tight">
                  KAIONEX CORE
                </strong>
              </div>
              <span className="ml-2 rounded bg-brand/10 px-2 py-0.5 text-[9px] font-mono font-medium text-brand">
                Synchronizing
              </span>
            </motion.div>

            {/* Connecting line from Core to Outcomes */}
            <div className="h-6 w-px bg-gradient-to-b from-brand/40 to-transparent relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 top-0 h-full bg-brand"
                style={cinematic ? { scaleY: pathProgress } : { scaleY: 1 }}
              />
            </div>
          </div>

          {/* 3 Synchronized Operational Outcomes */}
          <ol className="cine-event-outcomes" aria-label="Connected operational updates">
            {[
              {
                num: "01",
                engine: "CENTRAL INVENTORY",
                title: "Stock decremented",
                detail: "Organic Coffee Beans: 42 → 40 units",
                state: "Synced",
              },
              {
                num: "02",
                engine: "FMS (FINANCE)",
                title: "Transaction recorded",
                detail: "Ledger updated: +$40.70 credited (POS-8841)",
                state: "Next Chapter →",
                highlight: true,
              },
              {
                num: "03",
                engine: "E-COMMERCE",
                title: "Storefront synchronized",
                detail: "Web catalog stock reflected: 40 units",
                state: "Live Sync",
              },
            ].map((item, i) => {
              const isReached = !cinematic || step >= i + 1;
              return (
                <li
                  key={item.num}
                  className={cn(
                    "cine-outcome-card transition-all duration-300",
                    isReached ? "is-reached" : "opacity-40",
                    item.highlight && isReached
                      ? "ring-1 ring-brand/40 border-brand/40 bg-brand/[0.04]"
                      : "",
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="cine-outcome-num">{item.num}</span>
                    <span
                      className={cn(
                        "text-[9px] font-mono uppercase px-1.5 py-0.5 rounded",
                        item.highlight
                          ? "bg-brand/15 text-brand font-semibold"
                          : "bg-white/5 text-slate-400",
                      )}
                    >
                      {item.state}
                    </span>
                  </div>
                  <span className="cine-outcome-engine">{item.engine}</span>
                  <strong className="cine-outcome-title">{item.title}</strong>
                  <p className="cine-outcome-detail">{item.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
