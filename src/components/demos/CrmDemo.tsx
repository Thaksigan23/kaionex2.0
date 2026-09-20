"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { DemoChrome } from "@/components/demos/DemoChrome";

/**
 * CRM is Coming Soon — preview only, not an operational product UI.
 */
export function CrmDemo() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden>
      <DemoChrome
        title="KAIONEX CRM"
        subtitle="Product preview · under development"
        badge={<Badge tone="warning">Coming Soon</Badge>}
        className="relative border-dashed border-amber/35 bg-amber/[0.03]"
        footer="Conceptual preview · CRM is not released yet"
      >
        <div className="relative p-3">
          <div className="grid gap-2 opacity-55 sm:grid-cols-3">
            {[
              { label: "Customer", value: "—" },
              { label: "Company", value: "—" },
              { label: "Activity", value: "—" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-amber/15 bg-white/70 px-3 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-slate-400">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2 opacity-45 sm:grid-cols-2">
            <div className="rounded-xl border border-dashed border-amber/20 px-3 py-3">
              <p className="text-[10px] uppercase text-slate-400">Relationship</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100" />
              <div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-100" />
            </div>
            <div className="rounded-xl border border-dashed border-amber/20 px-3 py-3">
              <p className="text-[10px] uppercase text-slate-400">Pipeline</p>
              <div className="mt-2 flex gap-1">
                {[40, 55, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-slate-100"
                    style={{ height: h * 0.35 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Soft connection lines suggesting future ecosystem join */}
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 320 200"
            fill="none"
          >
            <motion.path
              d="M40 170 C 110 120, 210 120, 280 40"
              stroke="rgba(217,119,6,0.35)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              initial={false}
              animate={
                reduce
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: [18, 0] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M60 40 C 130 80, 190 140, 260 170"
              stroke="rgba(18,201,140,0.25)"
              strokeWidth="1"
              strokeDasharray="3 7"
              initial={false}
              animate={
                reduce
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: [0, 20] }
              }
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          <div className="absolute inset-x-4 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-amber/30 bg-white/90 px-4 py-4 text-center shadow-kx-md backdrop-blur-sm">
            <p className="font-display text-lg font-semibold text-navy-900">
              KAIONEX CRM
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-amber">
              Coming Soon
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Customer and client management is being developed to join the
              connected KAIONEX ecosystem.
            </p>
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}
