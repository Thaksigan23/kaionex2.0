"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { products, type ProductId } from "@/content/products";
import { PosDemo } from "@/components/demos/PosDemo";
import { EmsDemo } from "@/components/demos/EmsDemo";
import { FmsDemo } from "@/components/demos/FmsDemo";
import { EcommerceDemo } from "@/components/demos/EcommerceDemo";
import { CrmDemo } from "@/components/demos/CrmDemo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const demos = {
  pos: PosDemo,
  ems: EmsDemo,
  fms: FmsDemo,
  ecommerce: EcommerceDemo,
  crm: CrmDemo,
};

/** Subtle personality frame — same system, distinct accent. */
const frames: Record<
  ProductId,
  { ring: string; glow: string; label: string }
> = {
  pos: {
    ring: "border-brand/25",
    glow: "from-brand/10 via-transparent to-transparent",
    label: "Commerce · transactions",
  },
  ems: {
    ring: "border-navy-700/20",
    glow: "from-navy-800/8 via-transparent to-transparent",
    label: "People · tasks",
  },
  fms: {
    ring: "border-teal/30",
    glow: "from-teal/10 via-transparent to-transparent",
    label: "Finance · analytics",
  },
  ecommerce: {
    ring: "border-brand-light/30",
    glow: "from-brand-light/10 via-transparent to-transparent",
    label: "Orders · channels",
  },
  crm: {
    ring: "border-amber/35 border-dashed",
    glow: "from-amber/8 via-transparent to-transparent",
    label: "Future · relationships",
  },
};

export function ProductShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title="Everything Your Business Needs, Working Together"
            description="Realistic product previews of the KAIONEX ecosystem — POS, EMS, FMS, E-Commerce available today, with CRM under development."
            className="mb-10 max-w-3xl lg:mb-14"
          />
        </Reveal>

        <div className="space-y-14 sm:space-y-16 lg:space-y-16">
          {products.map((product, index) => {
            const Demo = demos[product.id];
            const reverse = index % 2 === 1;
            const frame = frames[product.id];
            return (
              <div key={product.id} data-product={product.id}
                  className={cn(
                    "kx-product-row grid items-center gap-7 lg:gap-12",
                    reverse && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: reverse ? 18 : -18, y: 8 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        tone={
                          product.status === "available" ? "brand" : "warning"
                        }
                      >
                        {product.statusLabel}
                      </Badge>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {product.name}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-[1.6rem] font-semibold tracking-tight text-navy-900 whitespace-pre-line sm:text-[1.85rem] lg:text-[2.15rem]">
                      {product.headline}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                      {frame.label}
                    </p>
                    <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-relaxed text-slate-500 sm:text-base">
                      {product.description}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {product.features.slice(0, 6).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-brand"
                            aria-hidden
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button
                        href={
                          product.ctaHref === product.href
                            ? product.href
                            : product.ctaHref
                        }
                        variant={
                          product.status === "available"
                            ? "secondary"
                            : "primary"
                        }
                        withArrow
                      >
                        {product.ctaLabel}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: reverse ? -18 : 18, y: 8, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.06, ease: "easeOut" }}
                    className={cn(
                      "kx-product-stage relative rounded-2xl border p-2 sm:p-2.5",
                      frame.ring,
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br",
                        frame.glow,
                      )}
                      aria-hidden
                    />
                    <div className="relative">
                      <Demo />
                    </div>
                  </motion.div>
                </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
