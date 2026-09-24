"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  UsersRound,
  CircleDollarSign,
  ShoppingBag,
  Layers3,
  RotateCcw,
} from "lucide-react";
import { useHeroWorkflow } from "./HeroProductScene";
import { cn } from "@/lib/utils";

const mobileModules = [
  { name: "POS", icon: MonitorSmartphone },
  { name: "EMS", icon: UsersRound },
  { name: "FMS", icon: CircleDollarSign },
  { name: "E-Commerce", icon: ShoppingBag },
] as const;

export function HeroProductSceneMobile({ className }: { className?: string }) {
  const { currentStep, reduce, replay } = useHeroWorkflow();

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-white/12 bg-navy-950/95 overflow-hidden shadow-[0_16px_36px_rgba(7,17,31,0.5)] select-none",
        className,
      )}
      aria-label="KAIONEX mobile product preview"
    >
      {/* Top Chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-brand/15 text-brand">
            <Layers3 size={13} />
          </span>
          <span className="text-xs font-semibold text-white">KAIONEX</span>
          <span className="text-[10px] text-slate-400">/ Product Suite</span>
        </div>
        <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] font-semibold text-slate-400">
          DEMO
        </span>
      </div>

      {/* Modules Strip */}
      <div className="grid grid-cols-4 gap-1 border-b border-white/[0.06] bg-white/[0.015] p-2 text-center">
        {mobileModules.map(({ name, icon: Icon }) => {
          const isActive =
            currentStep.source.toLowerCase() === name.toLowerCase();
          return (
            <div
              key={name}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg py-1.5 px-1 transition-colors",
                isActive
                  ? "bg-brand/15 text-brand ring-1 ring-brand/30"
                  : "text-slate-400",
              )}
            >
              <Icon size={14} />
              <span className="text-[9px] font-medium leading-tight">
                {name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Independent Product Stats */}
      <div className="grid grid-cols-3 gap-2 p-3">
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
          <span className="text-[8px] uppercase tracking-wide text-slate-400">
            POS Sales
          </span>
          <p className="mt-0.5 text-xs font-semibold text-white">
            $4,240.70
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
          <span className="text-[8px] uppercase tracking-wide text-slate-400">
            Workforce
          </span>
          <p className="mt-0.5 text-xs font-semibold text-white">
            24 active
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
          <span className="text-[8px] uppercase tracking-wide text-slate-400">
            FMS Revenue
          </span>
          <p className="mt-0.5 text-xs font-semibold text-white">
            $48,200.00
          </p>
        </div>
      </div>

      {/* Active Event Card */}
      <div className="px-3 pb-3">
        <motion.div
          key={currentStep.step}
          initial={reduce ? false : { opacity: 0.7, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 rounded-lg border border-brand/30 bg-brand/[0.06] p-2.5"
        >
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold text-white">
                {currentStep.source} · {currentStep.badge}
              </span>
              <span className="text-[8px] font-mono text-brand">
                Step 0{currentStep.step} / 06
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-300 truncate">
              {currentStep.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Simplified Mobile Footer with Replay & CRM Notice */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[9px] text-slate-400">
        <span>CRM: COMING SOON</span>
        <button
          type="button"
          onClick={replay}
          className="flex items-center gap-1 font-medium text-brand hover:underline"
          aria-label="Replay product showcase"
        >
          <RotateCcw size={10} />
          <span>Replay</span>
        </button>
      </div>
    </div>
  );
}
