import type { ProductId } from "@/content/products";
import { ArrowRight, Check, Coffee, Package, UsersRound } from "lucide-react";

/** Illustrative UI surfaces reused throughout the homepage. */
export function ProductSnippet({ product, compact = false }: { product: ProductId; compact?: boolean }) {
  return (
    <span className={"kx-snippet " + (compact ? "kx-snippet-compact" : "")}>
      {!compact && <span className="kx-window-label">Illustrative workspace · Sample data</span>}
      {product === "pos" && <><span className="kx-snippet-row"><span>Coffee beans × 2</span><b>$37.00</b></span><span className="kx-snippet-row"><span>Checkout</span><span className="kx-signal">Sale completed</span></span><span className="kx-meter"><i style={{ width: "100%" }} /></span></>}
      {product === "ems" && <><span className="kx-snippet-row"><span>Floor restock</span><span className="kx-signal">Done <Check size={11} /></span></span><span className="kx-snippet-row"><span>Team operations</span><b>17 / 24</b></span><span className="kx-meter"><i style={{ width: "71%" }} /></span></>}
      {product === "fms" && <><span className="kx-snippet-row"><span>Sample ledger</span><span className="kx-signal">+$61.05</span></span><span className="kx-mini-bars">{[25, 42, 33, 58, 46, 65, 81, 70, 92].map((h, i) => <i key={i} style={{ height: h + "%" }} />)}</span></>}
      {product === "ecommerce" && <><span className="kx-snippet-row"><span>Order #1048</span><span className="kx-signal">Ready</span></span><span className="kx-snippet-row"><span>Stock synchronized</span><b>26 units</b></span><span className="kx-meter"><i style={{ width: "82%" }} /></span></>}
      {product === "crm" && <><span className="kx-snippet-row"><span>Concept Preview</span></span><span className="kx-future">Coming Soon</span></>}
    </span>
  );
}
export function WorkforceStrip() {
  return <div className="kx-workforce"><span className="kx-workforce-icon"><UsersRound size={19} /></span><div><strong>Workforce overview</strong><span>Sample team · Morning shift</span></div><span className="kx-signal">24 on shift</span></div>;
}
export function FinanceBreakdown() {
  return <div className="kx-breakdown"><span>Sample income by channel</span><div className="kx-segment-bar"><i /><i /></div><div className="kx-snippet-row"><span>POS · 62%</span><span>E-Commerce · 38%</span></div></div>;
}
export function OrderManifest() {
  return <div className="kx-manifest"><span className="kx-workforce-icon"><Package size={20} /></span><div><strong>Fulfillment queue</strong><span>Sample order #1048 · 1 item</span></div><span className="kx-signal">Inventory linked</span></div>;
}
export function ConnectedWorkflow() {
  return <div className="kx-workflow" aria-label="Illustrative sale through KAIONEX Core, inventory, finance and E-Commerce">
    <div><span className="kx-window-label">01 · Action</span><strong><Coffee size={16} /> POS sale</strong><ProductSnippet product="pos" compact /></div>
    <ArrowRight className="kx-flow-arrow" aria-hidden />
    <div className="kx-core-tile"><span className="kx-window-label">02 · Shared data</span><strong>KAIONEX CORE</strong><span>Inventory adjusted</span><span className="kx-signal">42 → 40 units</span></div>
    <ArrowRight className="kx-flow-arrow" aria-hidden />
    <div><span className="kx-window-label">03 · Business visibility</span><strong>FMS + E-Commerce</strong><ProductSnippet product="fms" compact /><span className="kx-signal">Online stock synchronized</span></div>
  </div>;
}
export function WorkspaceActivity({ view = "overview" }: { view?: string }) {
  const labels: Record<string, string[]> = {
    overview: ["POS · Sale completed", "EMS · Restock task completed", "E-Commerce · Stock synchronized"],
    sales: ["POS · Checkout completed", "E-Commerce · Order received", "FMS · Payment recorded"],
    inventory: ["POS · Coffee beans adjusted", "E-Commerce · Stock reserved", "EMS · Replenishment assigned"],
    finance: ["POS · Revenue recorded", "E-Commerce · Payment posted", "FMS · Ledger updated"],
    employees: ["EMS · Morning shift active", "EMS · Restock task assigned", "EMS · Manager visibility updated"],
    analytics: ["POS · Sales activity", "E-Commerce · Channel activity", "FMS · Financial summary"],
  };
  return <div className="kx-workspace-detail">
    <div className="kx-chart-panel">
      <div className="kx-snippet-row"><strong>{view === "employees" ? "Task activity" : view === "inventory" ? "Stock movement" : "Operational activity"}</strong><span>Sample · 7 days</span></div>
      <div className="kx-chart-grid"><svg viewBox="0 0 520 140" preserveAspectRatio="none" role="img" aria-label="Illustrative activity trend">
        <path d="M0 120 L45 110 L90 116 L140 70 L185 85 L235 55 L280 65 L325 35 L375 48 L420 16 L470 26 L520 5 L520 140 L0 140 Z" fill="rgba(18,201,140,.08)" />
        <path d="M0 120 L45 110 L90 116 L140 70 L185 85 L235 55 L280 65 L325 35 L375 48 L420 16 L470 26 L520 5" fill="none" stroke="#5ee0b0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg></div>
      <div className="kx-snippet-row"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
    </div>
    <div className="kx-activity-panel"><span className="kx-window-label">Connected activity · Demo</span>{(labels[view] ?? labels.overview).map((label, i) => <div className="kx-activity-row" key={label}><span className="kx-activity-dot" /><div><strong>{label}</strong><span>Illustrative event · Step {i + 1}</span></div><Check size={13} /></div>)}</div>
  </div>;
}
