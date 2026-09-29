import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HomeEmsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-white border-t border-white/[0.08]">
      {/* Background Lighting Accent */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[120px] opacity-30" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.35fr] xl:gap-16">
          {/* Left Column: Editorial Marketing Storytelling (~35% Width) */}
          <div className="max-w-lg">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-400">
              02 / Workforce & Operations
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Keep your team organized
              <br />
              <em className="not-italic text-emerald-400">on the floor.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              KAIONEX EMS brings staff records, shift scheduling, and daily operational tasks together. Manage hourly floor coverage, track attendance, and keep teams aligned without manual roster confusion.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Weekly shift planning with role coverage across branches</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Attendance tracking with clock-in logging and shift exception records</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Daily floor checklists and team task coordination</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/products/ems"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:border-white/30"
              >
                <span>Explore KAIONEX EMS</span>
                <ArrowRight size={15} className="text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Human-Oriented Workforce Dashboard (~65% Width) */}
          <div className="relative min-w-0">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl opacity-30" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900/90 shadow-[0_24px_64px_rgba(7,17,31,0.7)] backdrop-blur-md">
              {/* Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500/70" />
                  <span className="size-2.5 rounded-full bg-amber-500/70" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-xs font-semibold text-slate-200">
                    KAIONEX EMS · Workforce Console
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  24 Active on Shift
                </span>
              </div>

              {/* Workforce Dashboard Body */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Roster Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 text-xs">
                  <div>
                    <span className="font-semibold text-white">Downtown Store · Morning Shift (07:00 – 15:30)</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Floor Coverage: Full Roster Confirmed</p>
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
                    On-Time: 96.2%
                  </span>
                </div>

                {/* Human-Oriented Staff Roster Cards */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                        SJ
                      </span>
                      <div>
                        <p className="font-medium text-white text-sm">Sarah Jenkins</p>
                        <span className="text-xs text-slate-400">Lead Supervisor · Store Counters 1–4</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-emerald-400 font-medium">Clocked in 07:54 AM</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                        MC
                      </span>
                      <div>
                        <p className="font-medium text-white text-sm">Marcus Chen</p>
                        <span className="text-xs text-slate-400">Counter Associate · Register 02</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-emerald-400 font-medium">Clocked in 08:00 AM</span>
                  </div>
                </div>

                {/* Daily Floor Tasks Section */}
                <div className="rounded-xl border border-white/10 bg-navy-950/80 p-5">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="text-slate-300 font-medium">Daily Store Checklists</span>
                    <span className="font-mono font-semibold text-emerald-400">18 of 22 Tasks Done</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Morning restock: Complete</span>
                    <span>Till float check: Verified</span>
                  </div>
                </div>

                {/* Summary Note */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="text-slate-300">Shift attendance recorded</span>
                  <span className="text-emerald-400">0 unexcused absences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
