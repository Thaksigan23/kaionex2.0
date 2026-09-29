import { Users, TrendingUp, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Product as ContentProduct } from "@/content/products";

interface ProductBenefitsAudienceProps {
  product: ContentProduct;
}

export function ProductBenefitsAudience({ product }: ProductBenefitsAudienceProps) {
  const isAvailable = product.status === "available";

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      {/* Background Separator Rule */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column: Target Audience */}
          <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                <Users size={18} />
              </span>
              <div>
                <p className="text-[10px] font-mono tracking-widest text-brand-soft uppercase">
                  Operational Fit
                </p>
                <h3 className="font-display text-xl font-semibold text-white tracking-tight sm:text-2xl">
                  Who it&apos;s built for
                </h3>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-300">
              {product.audience}
            </p>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Ideal Operating Environments
              </h4>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Independent retail counters & shops",
                  "Multi-branch operations & chains",
                  "High-traffic hospitality floors",
                  "Fast-paced order dispatch desks",
                ].map((env) => (
                  <div
                    key={env}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-slate-300"
                  >
                    <span className="size-1.5 rounded-full bg-brand" />
                    <span>{env}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tangible Business Benefits */}
          <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                <TrendingUp size={18} />
              </span>
              <div>
                <p className="text-[10px] font-mono tracking-widest text-brand-soft uppercase">
                  Measurable Impact
                </p>
                <h3 className="font-display text-xl font-semibold text-white tracking-tight sm:text-2xl">
                  {isAvailable ? "What it helps with" : "Intended value"}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3.5">
              {product.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-colors hover:border-brand/20 hover:bg-white/[0.03]"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <CheckCircle size={14} />
                  </span>
                  <div>
                    <strong className="block text-sm font-semibold text-white">
                      {benefit}
                    </strong>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                      Standard operational capability for {product.shortName} teams.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
