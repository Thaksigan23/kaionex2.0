import { Container } from "@/components/ui/Container";

const valuePillars = [
  {
    number: "01",
    title: "Purpose-built products",
    description:
      "Each KAIONEX product is designed for its dedicated operational scope. Counter billing, workforce rosters, finance ledgers, and digital storefronts each have their own focused workspace.",
  },
  {
    number: "02",
    title: "Clear operational visibility",
    description:
      "Know the real status of counter sales, staff attendance, customer invoicing, and online orders with focused operational views.",
  },
  {
    number: "03",
    title: "Flexible for different businesses",
    description:
      "Deploy individual products across retail counters, cafes, supermarkets, or expanding multi-branch businesses as your needs evolve.",
  },
  {
    number: "04",
    title: "Offline-ready POS",
    description:
      "Keep checkout lines moving during internet interruptions. KAIONEX POS records sales and payments locally, syncing when reconnected.",
  },
];

export function WhyKaionex() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 text-slate-900 border-y border-slate-200/80">
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16 xl:gap-20">
          {/* Left Column 35–40%: Editorial Headline & Context */}
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Why KAIONEX
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
              Software built around real business operations.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Purpose-built business software under one KAIONEX brand. Choose the products that fit your operational needs.
            </p>
          </div>

          {/* Right Column 60–65%: Horizontal Separator Rows (NO BOXES, NO 4-CARD GRIDS) */}
          <div className="border-t border-slate-200">
            {valuePillars.map((pillar) => (
              <div
                key={pillar.number}
                className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-[60px_1fr] sm:gap-6 sm:py-6"
              >
                <span className="font-mono text-sm font-semibold text-slate-400 pt-0.5">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy-950 tracking-tight sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
