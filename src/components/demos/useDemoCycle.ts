"use client";

import { useEffect, useState, useRef, type SetStateAction } from "react";
import { useStoryPlayback } from "@/components/cinematic/StoryPlayback";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";

/**
 * Sequenced demo steps — pauses when off-screen; freezes on reduced motion.
 * Last step holds longer before looping so the completed state can be read.
 */
export function useDemoCycle(stepCount: number, intervalMs = 2400) {
  const reduce = useReducedMotion();
  const storyStep = useStoryPlayback();
  const [override, setOverride] = useState<{ at: number; value: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const autonomousStep = reduce && !manual ? Math.max(0, stepCount - 2) : step;
  const displayedStep = storyStep === null ? autonomousStep : override?.at === storyStep ? override.value : Math.min(stepCount - 1, storyStep);
  const selectStep = (next: SetStateAction<number>) => {
    setManual(true);
    if (storyStep !== null) setOverride({ at: storyStep, value: typeof next === "function" ? next(displayedStep) : next });
    setStep(typeof next === "function" ? next(displayedStep) : next);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (storyStep !== null || reduce || !visible || stepCount < 2) return;
    const delay =
      step === stepCount - 1 ? Math.round(intervalMs * 1.6) : intervalMs;
    const id = window.setTimeout(() => {
      setStep((s) => (s + 1) % stepCount);
    }, delay);
    return () => window.clearTimeout(id);
  }, [reduce, visible, stepCount, intervalMs, step, storyStep]);

  return {
    ref,
    step: displayedStep,
    setStep: selectStep,
    restart: () => selectStep(0),
    reduce: Boolean(reduce),
    visible,
    controlled: storyStep !== null,
  };
}
