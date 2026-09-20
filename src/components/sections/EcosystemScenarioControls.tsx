"use client";

import { RotateCcw } from "lucide-react";
import type { DemoScenario } from "@/content/demo-scenarios";
import { demoScenarios } from "@/content/demo-scenarios";
import { cn } from "@/lib/utils";

type EcosystemScenarioControlsProps = {
  scenario: DemoScenario;
  stepIndex: number;
  onSelect: (id: DemoScenario["id"]) => void;
  onReplay: () => void;
};

export function EcosystemScenarioControls({
  scenario,
  stepIndex,
  onSelect,
  onReplay,
}: EcosystemScenarioControlsProps) {
  return (
    <div className="mb-4 rounded-xl border border-black/[0.08] bg-white p-3 shadow-kx-sm sm:mb-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Watch the flow</p>
        <p className="mt-0.5 text-xs text-slate-500">Illustrative product activity · no live customer data</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0" role="group" aria-label="Demo workflow scenarios">
        {demoScenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={scenario.id === item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
              scenario.id === item.id
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-black/[0.1] bg-white text-slate-600 hover:border-brand/35 hover:text-navy-900",
            )}
          >
            {item.label}
          </button>
        ))}
        <button type="button" onClick={onReplay} className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
          <RotateCcw className="size-3.5" aria-hidden /> Replay
        </button>
      </div>

      <ol className="mt-3 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-3 sm:col-span-2" aria-label={`${scenario.label} progress`}>
        {scenario.steps.map((step, index) => (
          <li key={step.id} className={cn("rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]", index === stepIndex ? "bg-brand/12 text-brand" : index < stepIndex ? "bg-navy-900/7 text-navy-700" : "bg-paper text-slate-400")}>
            {String(index + 1).padStart(2, "0")} {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
