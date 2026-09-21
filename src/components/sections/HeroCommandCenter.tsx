"use client";

import { HeroProductScene } from "@/components/hero/HeroProductScene";
import { HeroProductSceneMobile } from "@/components/hero/HeroProductSceneMobile";

export { HeroProductScene, HeroProductSceneMobile };

export function HeroCommandCenter({ className }: { className?: string }) {
  return <HeroProductScene className={className} />;
}

export function HeroMobileVisual({ className }: { className?: string }) {
  return <HeroProductSceneMobile className={className} />;
}
