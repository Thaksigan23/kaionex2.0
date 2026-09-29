import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HomeCrmTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 text-white border-t border-white/[0.08]">
      {/* Subtle Warm Amber Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl opacity-40" />
      </div>

      <Container wide className="relative z-10">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] via-navy-900/60 to-navy-950 p-6 sm:p-10 lg:p-12 shadow-[0_16px_48px_rgba(7,17,31,0.5)]">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Left Column: Restrained Future-Facing Context */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold text-amber tracking-wider uppercase">
                <Clock size={12} />
                <span>Coming Soon · Under Development</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl tracking-tight">
                KAIONEX CRM
              </h3>

              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
                Customer relationship tracking, interaction timelines, and opportunity pipeline management planned as a future expansion of the KAIONEX business software suite. Currently in active prototype development.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact?interest=crm"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400/20 border border-amber-400/40 px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-200 transition hover:bg-amber-400/30 hover:border-amber-400/60"
                >
                  <span>Register for Development Updates</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Obviously Conceptual Blurred Wireframe UI */}
            <div className="relative rounded-2xl border border-dashed border-amber-500/25 bg-navy-950/80 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-amber-500/15 pb-3 text-xs font-mono text-slate-400">
                <span className="text-amber-300/80">OPPORTUNITY PIPELINE PREVIEW</span>
                <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber">Concept Model</span>
              </div>

              {/* Wireframe Columns */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">1. Leads</span>
                  <div className="h-4 w-full rounded bg-white/10" />
                  <div className="h-3 w-3/4 rounded bg-white/5" />
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-3 space-y-2">
                  <span className="text-[10px] font-mono text-amber block uppercase">2. Proposal</span>
                  <div className="h-4 w-full rounded bg-amber-400/20" />
                  <div className="h-3 w-2/3 rounded bg-amber-400/10" />
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">3. Closed</span>
                  <div className="h-4 w-full rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                </div>
              </div>

              <p className="mt-4 text-center text-[11px] font-mono text-slate-400">
                Concept prototype · Architectural exploration for B2B client management
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
