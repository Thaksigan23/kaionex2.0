import {
  Network,
  Layers,
  Building2,
  CheckCircle2,
  WifiOff,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Truthful platform characteristics — no invented customer counts. */
const items = [
  {
    icon: Network,
    signal: "One core",
    title: "Connected Ecosystem",
    description: "Sales, finance, people, and commerce share one KAIONEX core.",
  },
  {
    icon: Layers,
    signal: "4 live products",
    title: "Multi-Product Platform",
    description: "POS, EMS, FMS, and E-Commerce work across one connected platform.",
  },
  {
    icon: Building2,
    signal: "Connected ops",
    title: "Business Operations",
    description: "Built for retail, hospitality, services, and multi-location teams.",
  },
  {
    icon: CheckCircle2,
    signal: "Available now",
    title: "Four Live Products",
    description: "POS, EMS, FMS, and E-Commerce are available to evaluate and deploy.",
  },
  {
    icon: WifiOff,
    signal: "POS resilience",
    title: "Offline-Ready POS",
    description: "Keep selling during connectivity interruptions and sync when service returns.",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="cine-trust relative z-[1] -mt-px border-b border-black/5 bg-white py-5 shadow-[0_-12px_40px_rgba(7,17,31,0.12)] sm:py-7">
      <Container wide>
        <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[10%] right-[10%] top-5 hidden h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent lg:block"
            >
              <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/35" />
              <span className="absolute left-1/4 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/35" />
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/35" />
              <span className="absolute left-3/4 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/35" />
              <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand/35" />
            </div>
            <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                <Reveal key={item.title} delay={index * 0.045} y={12}>
                  <div
                  className={`group rounded-[18px] border bg-white px-4 py-4 shadow-kx-sm transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_10px_24px_rgba(7,17,31,0.08)] ${
                    index === 0
                      ? "border-brand/25 bg-[linear-gradient(145deg,rgba(0,179,122,0.075),rgba(255,255,255,0.98)_60%)] hover:border-brand/45"
                      : "border-black/[0.07] hover:border-brand/30"
                  }`}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border border-brand/15 bg-brand/[0.075] transition-colors duration-200 group-hover:border-brand/25 group-hover:bg-brand/[0.11]">
                    <Icon className="size-5 text-brand" aria-hidden />
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand/80">
                    {item.signal}
                  </p>
                  <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] text-navy-900">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-[1.55] text-slate-500">
                    {item.description}
                  </p>
                  </div>
                </Reveal>
              );
              })}
            </div>
          </div>
      </Container>
    </section>
  );
}
