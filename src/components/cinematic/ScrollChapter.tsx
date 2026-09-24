"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StoryPlaybackContext } from "./StoryPlayback";
import { useCinematicMotion } from "./useCinematicMotion";
import { useSceneProgress } from "./useSceneProgress";

type ChapterProps = {
  number: string;
  product: "fms" | "ecommerce" | "ems";
  name: string;
  title: ReactNode;
  description: string;
  steps: readonly string[];
  children: ReactNode;
  reverse?: boolean;
  bridgeChip?: ReactNode;
  footnote?: string;
  wide?: boolean;
};
export function ScrollChapter({
  number,
  product,
  name,
  title,
  description,
  steps,
  children,
  reverse = false,
  bridgeChip,
  footnote,
  wide = false,
}: ChapterProps) {
  const { ref, progress, step } = useSceneProgress(6);
  const cinematic = useCinematicMotion();
  const scale = useTransform(progress, [0, 0.35, 1], [0.96, 1, 1]);
  const y = useTransform(progress, [0, 0.4], [35, 0]);
  return (
    <section
      ref={ref}
      className={
        "cine-chapter " +
        (reverse ? "cine-chapter-reverse " : "") +
        (wide ? "cine-chapter-wide " : "")
      }
      id={"story-" + product}
      data-product={product}
    >
      <div className="cine-chapter-sticky">
        <div className="cine-chapter-inner">
          <div className="cine-chapter-copy">
            <p className="cine-eyebrow">{number} / {name} · Available</p>
            <h2 className="cine-heading">{title}</h2>
            <p className="cine-chapter-description">{description}</p>
            {bridgeChip && (
              <div className="cine-bridge-chip">
                <span className="cine-bridge-dot" />
                <span>{bridgeChip}</span>
              </div>
            )}
            <ol className="cine-beats" aria-label={name + " illustrative workflow"}>
              {steps.map((label, i) => (
                <li key={label} className={!cinematic || i <= step ? "is-reached" : ""}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </li>
              ))}
            </ol>
            <Link href={"/products/" + product} className="cine-text-link">
              Explore {name} <ArrowUpRight size={16} />
            </Link>
          </div>
          <motion.div className="cine-chapter-screen" style={cinematic ? { scale, y } : undefined}>
            <div className="cine-product-caption">
              <span>{name.toUpperCase()} / PRODUCT WORKSPACE</span>
              <span>ILLUSTRATIVE DEMO</span>
            </div>
            <StoryPlaybackContext value={cinematic ? step : null}>{children}</StoryPlaybackContext>
            <div className="cine-screen-footnote">
              <span className="cine-event-dot" />
              {footnote ?? (
                product === "fms"
                  ? "Clear financial management, ledger tracking, and cash-flow visibility with KAIONEX FMS."
                  : product === "ecommerce"
                    ? "Dedicated digital storefront management and order fulfillment with E-Commerce."
                    : "Workforce coordination, task tracking, and team communication with KAIONEX EMS."
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
