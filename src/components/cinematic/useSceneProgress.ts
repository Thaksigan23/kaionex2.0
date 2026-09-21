"use client";

import { useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

/** A JS motion-value bridge keeps multi-stop timelines consistent across browsers. */
export function useSceneProgress(stepCount = 6) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useMotionValue(0);
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", value => {
    progress.set(value);
    setStep(Math.min(stepCount - 1, Math.max(0, Math.floor(value * stepCount))));
  });
  return { ref, progress, step };
}
