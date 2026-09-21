"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { products } from "@/content/products";
import { Button } from "@/components/ui/Button";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { useCinematicMotion } from "./useCinematicMotion";

export function EcosystemReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: .25 });
  const reduce = useHydratedReducedMotion();
  const cinematic = useCinematicMotion();
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", value => progress.set(value));
  const scale = useTransform(progress, [0, .65, 1], [1.055, 1, 1]);
  useEffect(() => {
    if (!inView || reduce || count >= 4) return;
    const timer = window.setTimeout(() => setCount((current) => current + 1), 650);
    return () => window.clearTimeout(timer);
  }, [count, inView, reduce]);

  return (
    <section ref={ref} className="cine-ecosystem-reveal">
      <div className="cine-payoff-heading">
      <p className="cine-eyebrow">05 / THE WHOLE PICTURE</p>
      <h2>
        One ecosystem.
        <br />
        <em>Connected operations.</em>
      </h2>
      <p>
        You’ve seen each product in motion.
        <br />
        Now see how POS, FMS, E-Commerce, and EMS operate as one connected foundation.
      </p>
    </div>
    <motion.div style={cinematic ? { scale } : undefined} className="cine-payoff-map">
      <ProductEcosystem cinematic revealCount={reduce ? 4 : count} />
    </motion.div>
      <aside className="cine-future" data-product="crm">
        <span className="cine-eyebrow">THE NEXT CONNECTION</span>
        <div>
          <h3>KAIONEX CRM</h3>
          <span className="cine-future-status">COMING SOON</span>
        </div>
        <p>
          Customer relationships, joining the ecosystem.
          <br />
          Concept preview · Under development.
        </p>
        <Button href={products.find((p) => p.id === "crm")!.ctaHref} variant="outline">
          Get Updates
        </Button>
      </aside>
    </section>
  );
}
