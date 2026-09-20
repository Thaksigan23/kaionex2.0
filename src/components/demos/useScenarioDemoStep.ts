"use client";

import { useEffect } from "react";
import type { DemoScenarioStep } from "@/content/demo-scenarios";
import type { ProductId } from "@/content/products";
import { subscribeToDemoScenarioSteps } from "@/lib/demo-events";

/** Subscribes a conceptual product preview to relevant homepage scenario events. */
export function useScenarioDemoStep(
  productId: ProductId,
  onStep: (step: DemoScenarioStep) => void,
) {
  useEffect(() => subscribeToDemoScenarioSteps(productId, onStep), [productId, onStep]);
}
