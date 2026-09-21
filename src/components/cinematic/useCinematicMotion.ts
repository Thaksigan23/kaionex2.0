"use client";

import { useSyncExternalStore } from "react";

const query = "(min-width: 1100px) and (min-height: 860px) and (prefers-reduced-motion: no-preference)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
export function useCinematicMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

