import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Product as ContentProduct } from "@/content/products";

interface ProductCapabilitiesGridProps {
  product: ContentProduct;
  features: string[];
}

export function ProductCapabilitiesGrid({ product, features }: ProductCapabilitiesGridProps) {
  const isAvailable = product.status === "available";

  // Separate spotlight features from detailed list
  const spotlightFeatures = features.slice(0, 2);
  const remainingFeatures = features.slice(2);

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20 lg:py-24">
      {/* Background Architectural Accent */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-12 -right-12 h-80 w-80 rounded-full bg-brand/10 blur-3xl opacity-25" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
            {isAvailable ? "Key Capabilities" : "Planned Roadmap"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {isAvailable ? "Built for real operating conditions." : "Planned capabilities under development."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            {isAvailable
              ? `Explore the dedicated operational features engineered specifically for ${product.name}.`
              : `Concept preview of features planned for ${product.name} as part of the KAIONEX software suite.`}
          </p>
        </div>

        {/* Varied Layout: 2 Spotlight Cards + 2-Column Capability Matrix */}
        <div className="space-y-6">
          {/* Spotlight Cards (Asymmetric Large Visual Cards) */}
          {spotlightFeatures.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {spotlightFeatures.map((feat, idx) => (
                <div
                  key={feat}
                  className="group relative overflow-hidden rounded-2xl border border-white/12 bg-navy-950 p-6 sm:p-8 shadow-[0_12px_36px_rgba(7,17,31,0.4)] transition-all duration-300 hover:border-brand/40 hover:bg-navy-950/90"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Core
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-white tracking-tight sm:text-2xl">
                    {feat}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Engineered to provide immediate operational clarity and fast execution during high-throughput business hours.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-brand-soft">
                    <CheckCircle2 size={15} className="text-brand" />
                    <span>Included in standard {product.shortName} deployment</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Matrix of Remaining Features */}
          {remainingFeatures.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-navy-950/60 p-6 sm:p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-4">
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                  Additional Dedicated Capabilities ({remainingFeatures.length})
                </span>
                <span className="text-xs text-brand-soft">All standard features</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {remainingFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <CheckCircle2 size={13} />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
