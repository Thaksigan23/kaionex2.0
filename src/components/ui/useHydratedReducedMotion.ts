"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribeHydration = () => () => {};

/** Match server markup on hydration, then apply the device's motion preference. */
export function useHydratedReducedMotion() {
  const preference = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  return hydrated && Boolean(preference);
}
