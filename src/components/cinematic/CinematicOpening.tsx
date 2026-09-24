"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroProductScene } from "@/components/hero/HeroProductScene";
import { HeroProductSceneMobile } from "@/components/hero/HeroProductSceneMobile";
import { PosDemo } from "@/components/demos/PosDemo";
import { StoryPlaybackContext } from "./StoryPlayback";
import { useCinematicMotion } from "./useCinematicMotion";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function CinematicOpening() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematicMotion();
  const [beat, setBeat] = useState(0);
  const [posActive, setPosActive] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", value => { progress.set(value); setPosActive(value >= .34); setBeat(Math.min(8, Math.max(0, Math.floor((value - .35) / .065)))); });
  const heroOpacity = useTransform(progress, [0, .18, .34], [1, 1, 0]);
  const heroY = useTransform(progress, [0, .4], [0, -65]);
  const posOpacity = useTransform(progress, [.25, .43], [0, 1]);
  const screenScale = useTransform(progress, [0, .5, .82, 1], [.94, 1, 1, .96]);
  const eventOpacity = useTransform(progress, [.62, .72], [0, 1]);
  const screenX = useTransform(progress, [0, .5], ["0%", "-12%"]);
  const lineProgress = useTransform(progress, [.45, 1], [0, 1]);
  const showingPos = cinematic && posActive;
  return <section ref={ref} className="cine-opening" aria-label="KAIONEX product family and POS showcase">
    <div className="cine-opening-sticky">
      <div className="cine-opening-inner">
        <div className="cine-topline"><span>KAIONEX / BUSINESS SOFTWARE SUITE</span><Link href={siteConfig.parent.url} target="_blank" rel="noopener noreferrer">BY TECHLOOM.AI <ArrowUpRight size={12} /></Link></div>
        <motion.div className="cine-hero-copy" style={cinematic ? { opacity: heroOpacity, y: heroY } : undefined} inert={showingPos}>
          <p className="cine-eyebrow">One brand. Multiple business products.</p>
          <h1>One KAIONEX.<br />Multiple ways to<br />run your <em>business.</em></h1>
          <p className="cine-intro">Sales. People. Finance. Commerce.<br />Purpose-built KAIONEX products for different parts of your business.</p>
          <div className="cine-actions"><Button href="/book-demo" size="lg" withArrow onClick={() => track({ name: "cta_book_demo", props: { location: "hero" } })}>Book a Demo</Button><Button href="/products" size="lg" variant="outline" onClick={() => track({ name: "cta_explore_products", props: { location: "hero" } })}>Explore Products</Button></div>
          <div className="cine-status-treatment" role="region" aria-label="Product availability status">
            <div className="cine-status-group">
              <span className="cine-status-badge is-available">
                <span className="cine-status-dot is-available" />
                AVAILABLE
              </span>
              <span className="cine-status-products">POS · EMS · FMS · E-COMMERCE</span>
            </div>
            <div className="cine-status-group">
              <span className="cine-status-badge is-soon">
                <span className="cine-status-dot is-soon" />
                COMING SOON
              </span>
              <span className="cine-status-products is-muted">CRM</span>
            </div>
          </div>
        </motion.div>
        <motion.div className="cine-opening-pos-copy" style={cinematic ? { opacity: posOpacity } : undefined} inert={cinematic && !showingPos}>
          <p className="cine-eyebrow">01 / KAIONEX POS · Available</p>
          <h2>Sell.<br />Track.<br /><em>Manage.</em></h2>
          <p className="cine-intro">Start with a sale.<br />Purpose-built software for your counter.</p>
          <p className="cine-chapter-detail">Checkout, payments, receipts, and inventory in one focused operational flow. Offline-ready POS keeps the counter moving.</p>
          <Link className="cine-text-link" href="/products/pos">Explore KAIONEX POS <ArrowUpRight size={16} /></Link>
          <span className="cine-event-label">{beat >= 5 ? "Sale completed · Demo transaction" : "A sample sale, taking shape"}</span>
        </motion.div>
        <motion.div className="cine-opening-visual" style={cinematic ? { scale: screenScale, x: screenX } : undefined}>
          <motion.div className="cine-overview-layer" style={cinematic ? { opacity: heroOpacity } : undefined} inert={showingPos}>
            <HeroProductScene className="hidden md:block" />
            <HeroProductSceneMobile className="md:hidden" />
          </motion.div>
          <motion.div className="cine-pos-layer" data-product="pos" style={cinematic ? { opacity: posOpacity } : undefined} inert={cinematic && !showingPos}>
            <div className="cine-product-caption"><span>COUNTER 02 / ILLUSTRATIVE WORKSPACE</span><span>POS · SALES & RETAIL</span></div>
            <StoryPlaybackContext value={cinematic ? beat : null}><PosDemo /></StoryPlaybackContext>
            <motion.div className="cine-sale-event" style={cinematic ? { opacity: eventOpacity } : undefined}><span className="cine-event-dot" /><div><span>DEMO WORKFLOW</span><strong>Sale completed <b>$40.70</b></strong><small>2 × Coffee Beans + sample tax · Illustrative checkout</small></div></motion.div>
          </motion.div>
        </motion.div>
        <div className="cine-opening-footer"><span><ArrowDown size={14} /> Scroll to explore products</span><span>01 — 05 / KAIONEX PRODUCT PORTFOLIO</span></div>
      </div>
      <motion.div className="cine-opening-progress" style={cinematic ? { scaleX: lineProgress } : { scaleX: 1 }} />
    </div>
  </section>;
}
