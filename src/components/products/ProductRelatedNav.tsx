import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { products, type ProductId } from "@/content/products";

interface ProductRelatedNavProps {
  currentId: ProductId;
}

export function ProductRelatedNav({ currentId }: ProductRelatedNavProps) {
  const otherProducts = products.filter((p) => p.id !== currentId);

  return (
    <section className="relative border-t border-white/[0.08] bg-navy-950 py-14 text-white">
      <Container wide>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-[10px] font-mono tracking-widest text-brand-soft uppercase">
              KAIONEX Product Portfolio
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-white">
              Explore Sister Products
            </h3>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
          >
            <span>View Full Suite Overview</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherProducts.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-navy-900/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:bg-navy-900/90 shadow-kx-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>0{idx + 1}</span>
                  {item.status === "coming-soon" ? (
                    <span className="rounded bg-amber/15 px-1.5 py-0.5 text-amber text-[9px] font-bold">
                      COMING SOON
                    </span>
                  ) : (
                    <span className="text-brand">AVAILABLE</span>
                  )}
                </div>
                <h4 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-brand-soft transition-colors">
                  {item.id === "ecommerce" ? "E-Commerce" : item.name}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                <span>Explore product</span>
                <ChevronRight size={14} className="text-brand transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
