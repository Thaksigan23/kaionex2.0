import { Layers3, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Product as ContentProduct } from "@/content/products";

interface ProductPositioningBannerProps {
  product: ContentProduct;
}

export function ProductPositioningBanner({ product }: ProductPositioningBannerProps) {
  return (
    <section className="relative border-y border-white/[0.08] bg-navy-900/80 py-10 text-white backdrop-blur-md">
      <Container wide>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
              <Layers3 size={20} />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-brand-soft uppercase">
                Product Family Role
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-white tracking-tight sm:text-2xl">
                Position in KAIONEX
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
                {product.connection}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs text-slate-400 md:max-w-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-300 mb-1">
              <Info size={14} className="text-brand-soft" />
              <span>Independent Capability</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Each KAIONEX product is purpose-built for its dedicated operational scope. Products operate independently without forced dependencies or unconfigured sync.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
