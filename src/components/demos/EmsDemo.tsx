"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { DemoChrome } from "@/components/demos/DemoChrome";
import { useDemoCycle } from "@/components/demos/useDemoCycle";
import { useScenarioDemoStep } from "@/components/demos/useScenarioDemoStep";
import { WorkforceStrip } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

const nav = ["Dashboard", "Employees", "Tasks", "Monitoring", "Chat"] as const;
const STEP_COUNT = 6;

export function EmsDemo() {
  const { ref, step, reduce, setStep, restart } = useDemoCycle(STEP_COUNT, 2300);

  const taskStatus =
    step <= 1 ? "Assigned" : step <= 3 ? "In progress" : "Completed";
  const progress = step <= 1 ? 12 : step <= 2 ? 48 : step <= 3 ? 78 : 100;
  const employeeStatus = step >= 2 ? "On task · Floor" : "Available · Floor";
  const showChat = step >= 4;
  const navActive = step >= 4 ? "Chat" : step >= 1 ? "Tasks" : "Dashboard";

  useScenarioDemoStep("ems", (scenarioStep) => {
    if (scenarioStep.event === "employee_active") setStep(0);
    if (scenarioStep.event === "task_assigned") setStep(1);
    if (scenarioStep.event === "task_in_progress") setStep(3);
    if (scenarioStep.event === "task_completed") setStep(4);
  });

  return (
    <div ref={ref}>
      <DemoChrome
        title="KAIONEX EMS"
        subtitle="People & work · sample data"
        badge={<Badge tone="brand">Available</Badge>}
        footer="Demo UI · fictional employees and tasks"
      >
        <div className="flex min-h-[17rem]">
          {/* Desktop-like rail — collapses to pills on small screens */}
          <aside className="hidden w-[7.25rem] shrink-0 border-r border-black/5 bg-paper/80 p-2 sm:block">
            {nav.map((item) => (
              <div
                key={item}
                className={cn(
                  "mb-1 rounded-lg px-2 py-1.5 text-[11px] font-medium",
                  navActive === item
                    ? "bg-navy-900 text-white"
                    : "text-slate-500",
                )}
              >
                {item}
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 p-3">
            <WorkforceStrip />
            <div className="mb-2 flex gap-1.5 overflow-x-auto sm:hidden">
              {nav.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                    navActive === item
                      ? "bg-navy-900 text-white"
                      : "bg-paper text-slate-500",
                  )}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { label: "On shift", value: "24" },
                { label: "Open tasks", value: step >= 5 ? "8" : "9" },
                { label: "Completed today", value: step >= 5 ? "17" : "16" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-paper px-3 py-2">
                  <p className="text-[10px] text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-navy-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-black/5 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-navy-900">
                    Store preparation · Task #482
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Assigned to Store Associate
                  </p>
                </div>
                <motion.span
                  key={taskStatus}
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    taskStatus === "Completed"
                      ? "bg-brand/15 text-brand"
                      : taskStatus === "In progress"
                        ? "bg-amber/15 text-amber"
                        : "bg-slate-100 text-slate-600",
                  )}
                >
                  {taskStatus}
                </motion.span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduce ? 0 : 0.55 }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-paper px-2.5 py-2 text-[11px]">
                <span className="text-navy-900">Store Associate</span>
                <motion.span
                  key={employeeStatus}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-500"
                >
                  {employeeStatus}
                </motion.span>
              </div>
              <div className="mt-2 flex justify-end">
                <button type="button" onClick={() => (taskStatus === "Completed" ? restart() : setStep(4))} className="rounded-md border border-brand/25 bg-brand/5 px-2 py-1 text-[10px] font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  {taskStatus === "Completed" ? "Replay task" : "Complete demo task"}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showChat ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 rounded-xl border border-brand/20 bg-brand/5 px-3 py-2 text-[11px] text-navy-900"
                >
                  <span className="font-semibold text-brand">Team chat · </span>
                  Floor lead: “Store preparation confirmed.”
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}
