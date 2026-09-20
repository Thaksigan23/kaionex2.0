import type { DemoScenarioStep } from "@/content/demo-scenarios";
import type { ProductId } from "@/content/products";

const scenarioEventName = "kaionex:demo-scenario-step";

/**
 * A small browser-only event bridge for the illustrative homepage demos.
 * It keeps product preview reactions synchronized without persisting data.
 */
export function publishDemoScenarioStep(step: DemoScenarioStep) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<DemoScenarioStep>(scenarioEventName, { detail: step }),
  );
}

export function subscribeToDemoScenarioSteps(
  productId: ProductId,
  listener: (step: DemoScenarioStep) => void,
) {
  if (typeof window === "undefined") return () => undefined;

  const handle = (event: Event) => {
    const step = (event as CustomEvent<DemoScenarioStep>).detail;
    if (step.source === productId || step.affected.includes(productId)) {
      listener(step);
    }
  };

  window.addEventListener(scenarioEventName, handle);
  return () => window.removeEventListener(scenarioEventName, handle);
}
