import { whyKaionex } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  Activity,
  BarChart3,
  Eye,
  Layers3,
  MapPin,
  ShieldCheck,
  UsersRound,
  WifiOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CapabilityTitle = (typeof whyKaionex)[number]["title"];

const capabilityMeta: Record<
  CapabilityTitle,
  { icon: LucideIcon; signal: string; detail: readonly string[] }
> = {
  "One Connected Platform": {
    icon: Layers3,
    signal: "Connected operations",
    detail: ["POS", "EMS", "FMS", "E-Commerce"],
  },
  "Operational Visibility": {
    icon: Eye,
    signal: "Visibility",
    detail: ["Stock", "Orders", "Revenue"],
  },
  "Built to Scale": {
    icon: Activity,
    signal: "Growth",
    detail: ["Products", "Locations", "Operations"],
  },
  "Access Controls": {
    icon: ShieldCheck,
    signal: "Permissions",
    detail: ["Roles", "Access", "Responsibilities"],
  },
  "Works Across Locations": {
    icon: MapPin,
    signal: "Locations",
    detail: ["Store", "Warehouse", "Branch"],
  },
  "Business Analytics": {
    icon: BarChart3,
    signal: "Reporting",
    detail: ["Dashboards", "Reports", "Trends"],
  },
  "Offline-Ready POS": {
    icon: WifiOff,
    signal: "POS resilience",
    detail: ["Billing", "Local records", "Sync"],
  },
  "Team Workflows": {
    icon: UsersRound,
    signal: "Work coordination",
    detail: ["People", "Tasks", "Chat"],
  },
};

const anchor = whyKaionex[0];
const offlinePos = whyKaionex.find((item) => item.title === "Offline-Ready POS");
const capabilityCards = whyKaionex.filter(
  (item) => item.title !== anchor.title && item.title !== "Offline-Ready POS",
);

export function WhyKaionex() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-[4.5rem]">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Why KAIONEX"
            title="A serious platform for connected operations."
            description="Bring sales, finance, inventory, commerce, and workforce operations into one connected operating layer."
            className="mb-8 sm:mb-9"
          />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-2" y={18}>
            <article className="group relative h-full overflow-hidden rounded-[18px] border border-brand/25 bg-[linear-gradient(135deg,rgba(0,179,122,0.1),rgba(247,248,251,0.92)_52%,#fff)] p-5 shadow-kx-sm transition-[transform,border-color,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-brand/40 motion-safe:hover:shadow-kx-md sm:p-6">
              <div aria-hidden className="absolute right-0 top-0 size-36 -translate-y-1/2 translate-x-1/3 rounded-full border border-brand/15" />
              <div className="relative flex h-full flex-col">
                <IconBlock icon={capabilityMeta[anchor.title].icon} />
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-brand/80">
                  {capabilityMeta[anchor.title].signal}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-navy-900">
                  {anchor.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  {anchor.description}
                </p>

                <div aria-hidden className="relative mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px] font-bold uppercase tracking-[0.09em] text-navy-700 sm:max-w-[31rem]">
                  <div className="grid grid-cols-2 gap-1.5">
                    {capabilityMeta[anchor.title].detail.map((product) => (
                      <span key={product} className="rounded-md border border-brand/15 bg-white/70 px-2 py-1.5 text-center">
                        {product}
                      </span>
                    ))}
                  </div>
                  <span className="relative flex size-11 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-[9px] text-brand">
                    <span className="absolute -left-3 right-8 top-1/2 h-px bg-brand/30" />
                    <span className="absolute -right-3 left-8 top-1/2 h-px bg-brand/30" />
                    Core
                  </span>
                  <div className="flex items-center gap-1.5 rounded-md border border-amber/20 bg-amber/[0.06] px-2 py-2 text-amber">
                    <span className="size-1.5 rounded-full bg-amber" /> CRM <span className="text-[8px] opacity-75">Soon</span>
                  </div>
                </div>

                {offlinePos ? (
                  <div className="mt-4 flex items-start gap-2.5 border-t border-brand/15 pt-3.5">
                    <WifiOff className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    <p className="text-xs leading-relaxed text-slate-600">
                      <span className="font-semibold text-navy-900">{offlinePos.title}.</span>{" "}
                      {offlinePos.description}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>

          {capabilityCards.map((item, index) => {
            const meta = capabilityMeta[item.title];
            return (
              <Reveal key={item.title} delay={(index + 1) * 0.04} y={18}>
                <article className="group h-full rounded-[18px] border border-black/[0.07] bg-paper/70 p-5 shadow-kx-sm transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-brand/28 motion-safe:hover:bg-white motion-safe:hover:shadow-kx-md sm:p-6">
                  <IconBlock icon={meta.icon} />
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-brand/80">
                    {meta.signal}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <div aria-hidden className="mt-4 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-3">
                    {meta.detail.map((detail) => (
                      <span key={detail} className="rounded-md bg-navy-900/[0.045] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        {detail}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function IconBlock({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex size-11 items-center justify-center rounded-xl border border-brand/15 bg-brand/[0.075] transition-colors duration-200 group-hover:border-brand/25 group-hover:bg-brand/[0.11]">
      <Icon className="size-5 text-brand" aria-hidden />
    </div>
  );
}
