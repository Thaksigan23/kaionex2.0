"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import {
  CircleDollarSign,
  MonitorSmartphone,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getDemoScenario, type DemoScenario, type DemoScenarioStep } from "@/content/demo-scenarios";
import { products, type ProductId } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemScenarioControls } from "@/components/sections/EcosystemScenarioControls";
import { publishDemoScenarioStep } from "@/lib/demo-events";
import { ProductSnippet } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

type Detail = {
  description: string;
  contexts: readonly string[];
  icon: LucideIcon;
};

const detailByProduct: Record<ProductId, Detail> = {
  pos: {
    icon: MonitorSmartphone,
    description: "Run sales, payments, receipts, and day-to-day counter operations.",
    contexts: ["Sales", "Inventory", "Orders", "Financial records"],
  },
  ems: {
    icon: UsersRound,
    description:
      "Bring employee information, tasks, work visibility, and team communication into one workspace.",
    contexts: ["Employees", "Tasks", "Work activity", "Team operations"],
  },
  fms: {
    icon: CircleDollarSign,
    description:
      "Keep financial activity and business reporting connected to operations.",
    contexts: ["Income", "Expenses", "Payments", "Financial reporting"],
  },
  ecommerce: {
    icon: ShoppingBag,
    description:
      "Connect online commerce with the operational systems behind the business.",
    contexts: ["Products", "Orders", "Inventory", "Sales"],
  },
  crm: {
    icon: UsersRound,
    description:
      "A future customer-management layer being developed for the KAIONEX ecosystem.",
    contexts: [
      "Planned customer profiles",
      "Planned relationship context",
      "Planned follow-up workflows",
    ],
  },
};

const desktopNodes: Array<{ id: ProductId; x: number; y: number }> = [
  { id: "ecommerce", x: 50, y: 26 },
  { id: "ems", x: 15, y: 51 },
  { id: "pos", x: 85, y: 51 },
  { id: "fms", x: 39, y: 84 },
  { id: "crm", x: 72, y: 84 },
];

const corePosition = { x: 50, y: 51 };

export function ProductEcosystem({ cinematic = false, revealCount = 4 }: { cinematic?: boolean; revealCount?: number } = {}) {
  const [selectedId, setSelectedId] = useState<ProductId>("pos");
  const [scenarioId, setScenarioId] = useState<DemoScenario["id"]>("retail-sale");
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoStartedRef = useRef(false);
  const inView = useInView(sectionRef, { once: true, amount: 0.18 });
  const reduce = useReducedMotion();
  const scenario = getDemoScenario(scenarioId);
  const activeStep = scenario.steps[stepIndex];
  const displayedId = playing ? activeStep.source : selectedId;
  const activeProduct = products.find((product) => product.id === displayedId)!;
  const activeDetail = detailByProduct[displayedId];

  useEffect(() => {
    if (cinematic || !inView || autoStartedRef.current || reduce) return;
    const timer = window.setTimeout(() => {
      autoStartedRef.current = true;
      setPlaying(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, cinematic]);

  useEffect(() => {
    if (!playing || reduce) return;
    if (stepIndex >= scenario.steps.length - 1) {
      const stop = window.setTimeout(() => {
        setSelectedId(activeStep.source);
        setPlaying(false);
      }, 1500);
      return () => window.clearTimeout(stop);
    }
    const timer = window.setTimeout(() => setStepIndex((index) => index + 1), 1500);
    return () => window.clearTimeout(timer);
  }, [activeStep.source, playing, reduce, scenario.steps.length, stepIndex]);

  useEffect(() => {
    if (playing) publishDemoScenarioStep(activeStep);
  }, [activeStep, playing]);

  const startScenario = (id: DemoScenario["id"] = scenarioId) => {
    const nextScenario = getDemoScenario(id);
    const nextStepIndex = reduce ? nextScenario.steps.length - 1 : 0;
    setScenarioId(id);
    setStepIndex(nextStepIndex);
    setSelectedId(nextScenario.steps[nextStepIndex].source);
    setPlaying(!reduce);
  };

  const selectProduct = (id: ProductId) => {
    setPlaying(false);
    setSelectedId(id);
  };
  const activeIds = playing
    ? [activeStep.source, ...activeStep.affected]
    : cinematic ? (["pos", "fms", "ecommerce", "ems"] as ProductId[]).slice(0, revealCount) : [displayedId];

  return (
    <section ref={sectionRef} className={cn("bg-paper py-12 sm:py-14 lg:py-16", cinematic && "cine-ecosystem-map")}>
      <Container wide>
        {!cinematic && <Reveal>
          <SectionHeading
            eyebrow="Ecosystem"
            title="Everything your business needs. Connected."
            description="See how POS, EMS, FMS, and E-Commerce connect through one KAIONEX core — and how CRM will extend the ecosystem."
            className="mb-8 lg:mb-10"
          />
        </Reveal>}

        <EcosystemScenarioControls
          scenario={scenario}
          stepIndex={stepIndex}
          onSelect={startScenario}
          onReplay={() => startScenario()}
        />

        <Reveal y={18}>
          <div className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-kx-sm">
            <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.95fr)]">
              <EcosystemMap selectedId={displayedId} onSelect={selectProduct} reduce={Boolean(reduce)} activeIds={activeIds} eventKey={playing ? activeStep.id : undefined} />
              <ProductInspector product={activeProduct} detail={activeDetail} reduce={Boolean(reduce)} activeStep={playing ? activeStep : undefined} />
            </div>

            <div className="lg:hidden">
              <div className="border-b border-black/[0.07] bg-[radial-gradient(circle_at_50%_0%,rgba(0,179,122,0.11),transparent_52%)] px-4 pb-5 pt-6 sm:px-6">
                <div className="mx-auto flex size-24 flex-col items-center justify-center rounded-full border border-brand/35 bg-navy-900 text-center shadow-kx-md">
                  <span className="font-display text-sm font-bold tracking-wide text-white">KAIONEX</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-soft">Core</span>
                </div>
                <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-2 sm:grid-cols-3">
                  {products.map((product) => (
                    <MobileProductButton key={product.id} product={product} selected={displayedId === product.id} onSelect={selectProduct} />
                  ))}
                </div>
              </div>
              <ProductInspector product={activeProduct} detail={activeDetail} reduce={Boolean(reduce)} activeStep={playing ? activeStep : undefined} mobile />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function EcosystemMap({ selectedId, onSelect, reduce, activeIds, eventKey }: { selectedId: ProductId; onSelect: (id: ProductId) => void; reduce: boolean; activeIds: ProductId[]; eventKey?: string }) {
  return (
    <div className="relative min-h-[40rem] overflow-hidden border-r border-black/[0.07] bg-[radial-gradient(circle_at_50%_50%,rgba(0,179,122,0.1),transparent_36%),radial-gradient(rgba(15,23,42,0.09)_0.7px,transparent_0.7px)] bg-[length:auto,18px_18px] p-7 xl:p-9">
      <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.17em] text-slate-500">Select a product to inspect its operating context</p>
      <p className="relative z-10 mt-1 text-sm text-slate-500">Available products connect through the KAIONEX Core.</p>

      <svg aria-hidden className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {desktopNodes.map((node) => {
          const product = products.find((item) => item.id === node.id)!;
          const selected = activeIds.includes(node.id);
          const future = product.status !== "available";
          return (
            <g key={node.id}>
              <motion.line
                x1={corePosition.x}
                y1={corePosition.y}
                x2={node.x}
                y2={node.y}
                stroke={selected ? future ? "rgba(217,119,6,0.72)" : "rgba(0,179,122,0.74)" : future ? "rgba(217,119,6,0.22)" : "rgba(150,174,198,0.24)"}
                strokeWidth={selected ? 0.44 : 0.28}
                strokeDasharray={future ? "1.25 1.5" : undefined}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: selected ? 1 : 0.9 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.08, ease: "easeOut" }}
              />
              {selected && eventKey && node.id === selectedId && !reduce ? (
                <motion.circle
                  key={eventKey}
                  r="0.7"
                  fill={future ? "#d97706" : "#00b37a"}
                  initial={{ cx: node.x, cy: node.y, opacity: 0 }}
                  animate={{ cx: [node.x, corePosition.x], cy: [node.y, corePosition.y], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      <motion.div
        className="absolute z-10 flex size-[8.6rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand/35 bg-navy-900 text-center shadow-kx-md"
        style={{ left: `${corePosition.x}%`, top: `${corePosition.y}%` }}
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
      >
        <span className="absolute inset-2 rounded-full border border-white/10" />
        <span className="font-display text-base font-bold tracking-wide text-white">KAIONEX</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-soft">Core</span>
        <span className="mt-3 flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/55"><span className="size-1.5 rounded-full bg-brand" /> System map</span>
      </motion.div>

      {desktopNodes.map((node) => {
        const product = products.find((item) => item.id === node.id)!;
        return <ProductNode key={node.id} product={product} selected={selectedId === node.id} active={activeIds.includes(node.id)} onSelect={onSelect} style={{ left: `${node.x}%`, top: `${node.y}%` }} index={desktopNodes.indexOf(node)} reduce={reduce} />;
      })}
    </div>
  );
}

function ProductNode({ product, selected, active, onSelect, style, index, reduce }: { product: (typeof products)[number]; selected: boolean; active: boolean; onSelect: (id: ProductId) => void; style: React.CSSProperties; index: number; reduce: boolean }) {
  const Icon = detailByProduct[product.id].icon;
  const future = product.status !== "available";
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(product.id)}
      className={cn(
        "kx-ecosystem-node absolute z-20 flex flex-wrap w-[9.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border p-3 text-left shadow-kx-sm transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        selected ? future ? "border-amber/45 bg-amber/[0.06] shadow-kx-md" : "border-brand/45 bg-white shadow-kx-md ring-1 ring-brand/15" : active ? "border-brand/30 bg-brand/[0.04] shadow-kx-sm" : future ? "border-dashed border-amber/30 bg-white/90 hover:border-amber/50" : "border-black/[0.1] bg-white/95 hover:border-brand/35 hover:shadow-kx-md",
      )}
      style={style}
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduce ? 0 : 0.28, delay: reduce ? 0 : 0.16 + index * 0.08, ease: "easeOut" }}
    >
      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg border", future ? "border-amber/20 bg-amber/10 text-amber" : "border-brand/15 bg-brand/[0.075] text-brand")}><Icon className="size-4" aria-hidden /></span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-semibold text-navy-900">{product.shortName}</span>
        <span className={cn("mt-0.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.09em]", future ? "text-amber" : "text-slate-500")}><span className={cn("size-1.5 rounded-full", future ? "bg-amber" : "bg-brand")} />{product.statusLabel}</span>
      </span>
      <ProductSnippet product={product.id} compact />
    </motion.button>
  );
}

function MobileProductButton({ product, selected, onSelect }: { product: (typeof products)[number]; selected: boolean; onSelect: (id: ProductId) => void }) {
  const future = product.status !== "available";
  return (
    <button type="button" aria-pressed={selected} onClick={() => onSelect(product.id)} className={cn("rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2", selected ? future ? "border-amber/45 bg-amber/[0.08]" : "border-brand/45 bg-brand/[0.08]" : "border-black/[0.08] bg-white")}>
      <span className="block truncate text-xs font-semibold text-navy-900">{product.shortName}</span>
      <span className={cn("mt-1 block text-[9px] font-bold uppercase tracking-[0.08em]", future ? "text-amber" : "text-slate-500")}>{future ? "Coming soon" : "Available"}</span>
    </button>
  );
}

function ProductInspector({ product, detail, reduce, activeStep, mobile = false }: { product: (typeof products)[number]; detail: Detail; reduce: boolean; activeStep?: DemoScenarioStep; mobile?: boolean }) {
  const Icon = detail.icon;
  const future = product.status !== "available";
  const linkLabel = future ? "Get Updates" : `Explore ${product.name}`;
  return (
    <aside className={cn("bg-white p-6 xl:p-8", mobile ? "p-5 sm:p-6" : "flex items-center")}>
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={product.id} initial={reduce ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}>
            {activeStep ? (
              <div className="mb-4 rounded-lg border border-brand/20 bg-brand/[0.06] px-3 py-2" aria-live="polite">
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-brand">Live demo event · {activeStep.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-700">{activeStep.detail}</p>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={cn("flex size-11 items-center justify-center rounded-xl border", future ? "border-amber/20 bg-amber/10 text-amber" : "border-brand/15 bg-brand/[0.075] text-brand")}><Icon className="size-5" aria-hidden /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Selected product</p><p className="mt-0.5 font-display text-xl font-semibold tracking-tight text-navy-900">{product.name}</p></div>
              </div>
              <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em]", future ? "bg-amber/10 text-amber" : "bg-brand/10 text-brand")}>{product.statusLabel}</span>
            </div>
            <div className="mt-5"><ProductSnippet product={product.id} /></div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">{detail.description}</p>
            <div className="mt-6 border-t border-black/[0.07] pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{future ? "Planned ecosystem context" : "Connected operations"}</p>
              <ul className="mt-3 grid gap-2">
                {detail.contexts.map((context) => <li key={context} className="flex items-center gap-2.5 rounded-lg border border-black/[0.06] bg-paper/65 px-3 py-2 text-xs font-medium text-navy-700"><span className={cn("size-1.5 rounded-full", future ? "bg-amber" : "bg-brand")} />{context}</li>)}
              </ul>
            </div>
            <Link href={future ? product.ctaHref : product.href} className={cn("mt-6 inline-flex text-sm font-semibold transition-colors hover:underline", future ? "text-amber" : "text-brand")}>{linkLabel} →</Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
