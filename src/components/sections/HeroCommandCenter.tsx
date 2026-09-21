"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useHydratedReducedMotion as useReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import { MonitorSmartphone, UsersRound, CircleDollarSign, ShoppingBag, Layers3, RotateCcw } from "lucide-react";
import { WorkspaceActivity } from "@/components/demos/ProductVisuals";
import { cn } from "@/lib/utils";

const events = [
  { product: "POS", title: "Sale completed", detail: "Sample checkout · $40.70" },
  { product: "Core", title: "Inventory adjusted", detail: "Coffee beans · 42 → 40 units" },
  { product: "FMS", title: "Transaction recorded", detail: "Sample ledger · +$40.70" },
  { product: "E-Commerce", title: "Inventory synchronized", detail: "Online stock · 40 units" },
  { product: "EMS", title: "Task completed", detail: "Floor restock · manager visibility" },
];
const modules = [
  { name: "POS", icon: MonitorSmartphone },
  { name: "EMS", icon: UsersRound },
  { name: "FMS", icon: CircleDollarSign },
  { name: "E-Commerce", icon: ShoppingBag },
];

function useHeroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .25 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!visible || reduce || step >= events.length) return;
    const timer = window.setTimeout(() => setStep(s => s + 1), 2100);
    return () => window.clearTimeout(timer);
  }, [visible, reduce, step]);
  return { ref, step: reduce ? events.length : step, reduce: Boolean(reduce), replay: () => setStep(0) };
}

export function HeroCommandCenter({ className }: { className?: string }) {
  const { ref, step, reduce, replay } = useHeroSequence();
  const active = events[Math.min(step, events.length - 1)];
  return <div ref={ref} className={cn("kx-command-stage hidden lg:block", className)}>
    <div className="kx-command-caption"><span>ONE CORE. CONNECTED OPERATIONS.</span><span>Illustrative demo</span></div>
    <motion.div className="kx-command-window" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
      <div className="kx-command-top"><span className="kx-command-mark"><Layers3 size={17} /></span><div><strong>KAIONEX</strong><span>Command Center</span></div><span className="kx-command-demo">DEMO · SAMPLE DATA</span></div>
      <div className="kx-command-body">
        <aside className="kx-command-rail" aria-label="Illustrative product modules">
          {modules.map(({ name, icon: Icon }) => <span key={name} className={active.product === name && step < events.length ? "is-active" : ""}><Icon size={17} /><span>{name}</span></span>)}
          <span className="kx-command-future">CRM<br />Coming Soon</span>
        </aside>
        <div className="kx-command-content">
          <div className="kx-snippet-row"><div><span className="kx-window-label">Business workspace</span><h2>Operational overview</h2></div><span className="kx-signal">4 products</span></div>
          <div className="kx-command-metrics">
            {[["Sample sales", step >= 2 ? "$4,240.70" : "$4,200.00"], ["Stock · Coffee", step >= 1 ? "40 units" : "42 units"], ["Team tasks", step >= 4 ? "17 / 24" : "16 / 24"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <WorkspaceActivity />
          <div className="kx-command-event" aria-live="off"><span className="kx-activity-dot" /><div><strong>{active.product} · {active.title}</strong><span>{active.detail}</span></div><span className="kx-signal">{step >= events.length ? "Complete" : String(Math.min(step + 1, 5)).padStart(2, "0") + " / 05"}</span></div>
        </div>
      </div>
      <div className="kx-command-bottom"><span>Illustrative events · no live customer data</span><button type="button" onClick={replay} aria-label="Replay hero workflow"><RotateCcw size={12} /> Replay</button></div>
    </motion.div>
    <div className="kx-command-path" aria-hidden><span>POS</span><i /><span>KAIONEX CORE</span><i /><span>FMS + E-Commerce</span>{step < events.length && !reduce && <motion.b key={step} initial={{ left: "8%", opacity: 0 }} animate={{ left: "90%", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.4 }} />}</div>
    <div className="kx-command-float" aria-hidden><span className="kx-signal">Shared inventory</span><strong>{step >= 1 ? "Stock updated across channels" : "Ready for the next sale"}</strong><span>POS ↔ E-Commerce · Demo</span></div>
  </div>;
}

export function HeroMobileVisual() {
  const { ref, step, reduce, replay } = useHeroSequence();
  const active = events[Math.min(step, events.length - 1)];
  return <div ref={ref} className="kx-mobile-command lg:hidden">
    <div className="kx-command-top"><Layers3 size={20} /><div><strong>KAIONEX</strong><span>Command Center</span></div><span className="kx-command-demo">DEMO</span></div>
    <div className="kx-mobile-modules">{modules.map(({ name, icon: Icon }) => <span key={name}><Icon size={15} />{name}</span>)}</div>
    <motion.div className="kx-command-event" key={step} initial={reduce ? false : { opacity: .5 }} animate={{ opacity: 1 }}><span className="kx-activity-dot" /><div><strong>{active.product} · {active.title}</strong><span>{active.detail}</span></div></motion.div>
    <div className="kx-command-path" aria-hidden><span>POS</span><i /><span>CORE</span><i /><span>FMS</span></div>
    <div className="kx-command-bottom"><span>Sample data · CRM Coming Soon</span><button type="button" onClick={replay} aria-label="Replay hero workflow"><RotateCcw size={12} /> Replay</button></div>
  </div>;
}
