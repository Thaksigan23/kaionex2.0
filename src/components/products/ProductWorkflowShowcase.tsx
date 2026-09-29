"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useHydratedReducedMotion } from "@/components/ui/useHydratedReducedMotion";
import type { ProductId } from "@/content/products";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  step: string;
  title: string;
  detail: string;
  metric: string;
  uiBadge: string;
}

interface ProductWorkflowData {
  eyebrow: string;
  heading: string;
  description: string;
  steps: WorkflowStep[];
  renderScreen: (activeStep: number) => React.ReactNode;
}

export function ProductWorkflowShowcase({ productId }: { productId: ProductId }) {
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useHydratedReducedMotion();

  const data = getWorkflowData(productId);

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/2 left-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container wide className="relative z-10">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
            {data.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {data.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            {data.description}
          </p>
        </div>

        {/* Interactive Workflow Layout */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          {/* Left Column: Interactive Step Navigation */}
          <div className="space-y-3">
            {data.steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "w-full text-left rounded-xl p-4 sm:p-5 transition-all duration-200 border text-left",
                    isActive
                      ? "border-brand/40 bg-navy-900/90 shadow-[0_8px_24px_rgba(0,179,122,0.15)] ring-1 ring-brand/30"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors",
                          isActive
                            ? "bg-brand text-navy-950"
                            : "bg-white/10 text-slate-400",
                        )}
                      >
                        {s.step}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-base font-semibold sm:text-lg transition-colors",
                          isActive ? "text-white" : "text-slate-300",
                        )}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-mono",
                        isActive
                          ? "bg-brand/15 text-brand font-semibold"
                          : "bg-white/5 text-slate-400",
                      )}
                    >
                      {s.metric}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2.5 text-xs sm:text-sm leading-relaxed pl-10",
                      isActive ? "text-slate-300" : "text-slate-400",
                    )}
                  >
                    {s.detail}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Screen */}
          <div className="relative min-w-0">
            <div className="sticky top-24 rounded-2xl border border-white/12 bg-navy-900/90 p-5 shadow-[0_16px_48px_rgba(7,17,31,0.5)] backdrop-blur-md sm:p-6">
              {/* Window Chrome Header */}
              <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-[10px] tracking-wider uppercase text-slate-300">
                    STAGE {data.steps[activeStep].step} · {data.steps[activeStep].uiBadge}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Illustrative UI View
                </span>
              </div>

              {/* Dynamic Screen View with Motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-[280px]"
                >
                  {data.renderScreen(activeStep)}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Progress Controls */}
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  {data.steps.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-200",
                        activeStep === i
                          ? "w-6 bg-brand"
                          : "w-2 bg-white/20",
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                    className="rounded px-2 py-1 text-slate-400 transition hover:bg-white/10 disabled:opacity-30"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={activeStep === data.steps.length - 1}
                    onClick={() => setActiveStep((p) => Math.min(data.steps.length - 1, p + 1))}
                    className="rounded px-2 py-1 text-brand font-semibold transition hover:bg-brand/10 disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Product-specific truthful workflows */
function getWorkflowData(id: ProductId): ProductWorkflowData {
  switch (id) {
    case "pos":
      return {
        eyebrow: "Operational Flow",
        heading: "From item scan to receipt, kept at the counter.",
        description:
          "KAIONEX POS executes fast, offline-ready billing designed specifically for retail tills and restaurant counters.",
        steps: [
          {
            step: "01",
            title: "Item Selection & Scan",
            detail: "Quick lookup or barcode scan adds items to the ticket with live pricing and local stock count.",
            metric: "Instant",
            uiBadge: "REGISTER SCAN",
          },
          {
            step: "02",
            title: "Multi-Tender Cart",
            detail: "Split bills across cash, cards, vouchers, and credit terms without leaving the register.",
            metric: "Flexible",
            uiBadge: "CHECKOUT TICKET",
          },
          {
            step: "03",
            title: "Offline-Ready Billing Engine",
            detail: "Transactions process immediately locally even when internet connectivity drops.",
            metric: "Resilient",
            uiBadge: "OFFLINE SAFE",
          },
          {
            step: "04",
            title: "Receipt & Drawer Balance",
            detail: "Digital and thermal receipt generation with automated end-of-shift drawer reconciliation.",
            metric: "Verified",
            uiBadge: "RECEIPT ISSUED",
          },
          {
            step: "05",
            title: "Local Inventory Tracking",
            detail: "Counter stock levels adjust locally after each ticket, queuing cloud updates for when service returns.",
            metric: "Accurate",
            uiBadge: "STOCK ADJUSTED",
          },
        ],
        renderScreen: (step) => (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-navy-950 p-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-slate-400">
                <span>TICKET #0482 · REGISTER 02</span>
                <span className="text-brand">OFFLINE ACTIVE</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex justify-between text-white">
                  <span>2 × Organic Espresso Roast</span>
                  <b>$37.00</b>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>1 × Ceramic Travel Tumbler</span>
                  <span>$18.50</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-white font-bold">
                <span>SUBTOTAL (INCL. TAX)</span>
                <span className="text-brand-soft text-sm">$55.50</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px]">
              <span className="text-slate-400">CURRENT STATUS: </span>
              <span className="text-brand font-semibold">
                {step === 0 && "Scanning items into local register register memory..."}
                {step === 1 && "Cart populated · Customer requested card tender..."}
                {step === 2 && "Card accepted via offline terminal auth buffer..."}
                {step === 3 && "Receipt printed · Drawer pulse confirmed..."}
                {step === 4 && "Local till inventory deducted: -2 units Coffee, -1 Tumbler."}
              </span>
            </div>
          </div>
        ),
      };

    case "ems":
      return {
        eyebrow: "Workforce Flow",
        heading: "Organize teams, assign tasks, and coordinate shifts.",
        description:
          "KAIONEX EMS gives operations managers a clear, independent tool to schedule staff, track attendance, and verify daily assignments.",
        steps: [
          {
            step: "01",
            title: "Shift Scheduling & Roster",
            detail: "Create weekly rosters across locations and notify staff of their scheduled shifts.",
            metric: "Planned",
            uiBadge: "ROSTER ACTIVE",
          },
          {
            step: "02",
            title: "Clock-In & Attendance Verification",
            detail: "Accurately record shift start times, breaks, and late arrivals at each branch.",
            metric: "Tracked",
            uiBadge: "CHECK-IN",
          },
          {
            step: "03",
            title: "Task Dispatch & Checklist",
            detail: "Assign morning opening duties, restock tasks, and closing checklists to staff profiles.",
            metric: "Assigned",
            uiBadge: "TASKS LOGGED",
          },
          {
            step: "04",
            title: "Floor Progress Monitoring",
            detail: "Supervisors see completed tasks in real time with timestamp verification.",
            metric: "Live",
            uiBadge: "MONITORING",
          },
          {
            step: "05",
            title: "Shift Summary & Handover",
            detail: "Review shift hours, overtime calculations, and leave notes for the next team.",
            metric: "Complete",
            uiBadge: "HANDOVER DONE",
          },
        ],
        renderScreen: (step) => (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-navy-950 p-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-slate-400">
                <span>LOCATION: DOWNTOWN BRANCH</span>
                <span className="text-brand">24 / 26 ON SHIFT</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-brand" />
                    <span>Sarah Jenkins (Lead Supervisor)</span>
                  </div>
                  <span className="text-brand-soft">Clocked in 07:54 AM</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-brand" />
                    <span>Marcus Chen (Counter Associate)</span>
                  </div>
                  <span>Restock Checklist · 80%</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px]">
              <span className="text-slate-400">STAGE UPDATE: </span>
              <span className="text-brand font-semibold">
                {step === 0 && "Shift roster deployed to mobile worker profiles..."}
                {step === 1 && "24 workers logged in on terminal barcode/PIN..."}
                {step === 2 && "7 daily operational tasks assigned to team floor..."}
                {step === 3 && "Restock & register checks completed and verified..."}
                {step === 4 && "Daily attendance timesheet signed off by floor manager."}
              </span>
            </div>
          </div>
        ),
      };

    case "fms":
      return {
        eyebrow: "Financial Flow",
        heading: "Monitor revenue, classify expenses, and track cash flow.",
        description:
          "KAIONEX FMS offers an independent finance tool to record transactions, maintain operating ledgers, and produce clear financial visibility.",
        steps: [
          {
            step: "01",
            title: "Sales & Invoicing Records",
            detail: "Create customer invoices, track payment status, and record receivables with clear terms.",
            metric: "Recorded",
            uiBadge: "INVOICING",
          },
          {
            step: "02",
            title: "Expense Classification",
            detail: "Categorize operational outlays, supplier bills, and utility expenses against chart of accounts.",
            metric: "Classified",
            uiBadge: "EXPENSES",
          },
          {
            step: "03",
            title: "Operating Ledger Balance",
            detail: "Maintain balanced debit and credit entries with double-entry audit trails.",
            metric: "Balanced",
            uiBadge: "GENERAL LEDGER",
          },
          {
            step: "04",
            title: "Cash Flow & Bank Reconcile",
            detail: "Compare bank statements with operating cash balances to maintain liquidity clarity.",
            metric: "Reconciled",
            uiBadge: "CASH FLOW",
          },
          {
            step: "05",
            title: "Financial Reporting",
            detail: "Generate income statements, balance sheets, and tax-ready quarterly summaries.",
            metric: "Reporting",
            uiBadge: "P&L SUMMARY",
          },
        ],
        renderScreen: (step) => (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-navy-950 p-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-slate-400">
                <span>FISCAL Q3 · OPERATING LEDGER</span>
                <span className="text-brand">BALANCED</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Gross Operating Revenue (MTD)</span>
                  <b>$128,450.00</b>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Operational Expenses (Classified)</span>
                  <span className="text-amber">-$42,180.00</span>
                </div>
                <div className="flex justify-between text-brand text-[11px]">
                  <span>Net Cash Flow Position</span>
                  <b>+$86,270.00</b>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px]">
              <span className="text-slate-400">LEDGER STATUS: </span>
              <span className="text-brand font-semibold">
                {step === 0 && "Customer Invoice #INV-2026-089 issued with net-30 terms..."}
                {step === 1 && "Vendor invoice categorized under Supplier Inventory..."}
                {step === 2 && "Double-entry debit/credit ledger validation passed..."}
                {step === 3 && "Bank account statement reconciled against ledger entries..."}
                {step === 4 && "Quarterly P&L and tax export generated for review."}
              </span>
            </div>
          </div>
        ),
      };

    case "ecommerce":
      return {
        eyebrow: "Digital Commerce Flow",
        heading: "Storefront orders to customer fulfillment.",
        description:
          "E-Commerce powers dedicated digital storefronts, order processing, and customer delivery coordination.",
        steps: [
          {
            step: "01",
            title: "Storefront Catalog Ingestion",
            detail: "Publish products, set online variants, upload photography, and configure web pricing.",
            metric: "Active",
            uiBadge: "STOREFRONT",
          },
          {
            step: "02",
            title: "Customer Order Intake",
            detail: "Receive digital orders with customer shipping addresses and automated payment authorization.",
            metric: "Received",
            uiBadge: "NEW ORDER",
          },
          {
            step: "03",
            title: "Payment & Fraud Verification",
            detail: "Confirm online card transactions and gateway settlements before inventory allocation.",
            metric: "Verified",
            uiBadge: "PAID",
          },
          {
            step: "04",
            title: "Fulfillment & Packing Queue",
            detail: "Warehouse packing slips and shipping labels printed for order preparation.",
            metric: "Packing",
            uiBadge: "DISPATCH QUEUE",
          },
          {
            step: "05",
            title: "Carrier Dispatch & Tracking",
            detail: "Order dispatched with tracking notifications sent automatically to the customer.",
            metric: "Fulfilled",
            uiBadge: "DELIVERED",
          },
        ],
        renderScreen: (step) => (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-navy-950 p-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-slate-400">
                <span>ONLINE ORDER #ECO-1048</span>
                <span className="text-brand">FULFILLMENT QUEUE</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Customer: Elena Rostova</span>
                  <b>$142.50</b>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Items: 2 × Artisan Blend, 1 × Press</span>
                  <span>Express Carrier</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px]">
              <span className="text-slate-400">PIPELINE STAGE: </span>
              <span className="text-brand font-semibold">
                {step === 0 && "Digital catalog active on custom domain..."}
                {step === 1 && "Cart checkout completed via online payment gateway..."}
                {step === 2 && "Payment authorized · Funds allocated in merchant account..."}
                {step === 3 && "Packing slip printed · Dispatch label generated..."}
                {step === 4 && "Package handed to courier · Tracking link active."}
              </span>
            </div>
          </div>
        ),
      };

    case "crm":
      return {
        eyebrow: "Concept Preview",
        heading: "Customer relationships planned for the KAIONEX portfolio.",
        description:
          "KAIONEX CRM is currently under development to provide dedicated pipeline, account, and communication tools.",
        steps: [
          {
            step: "01",
            title: "Lead Capture Concept",
            detail: "Ingest inquiries from web forms, direct contacts, and phone outreach into a unified inbox.",
            metric: "Concept",
            uiBadge: "UNDER DEV",
          },
          {
            step: "02",
            title: "Contact Interaction Timeline",
            detail: "Maintain historical records of emails, meeting notes, and team conversations per account.",
            metric: "Planned",
            uiBadge: "CONCEPT",
          },
          {
            step: "03",
            title: "Opportunity Stages",
            detail: "Track prospective commercial deals across qualification, proposal, and contract phases.",
            metric: "Preview",
            uiBadge: "PIPELINE",
          },
          {
            step: "04",
            title: "Follow-up Reminders",
            detail: "Scheduled task triggers for sales representatives to ensure timely customer check-ins.",
            metric: "Planned",
            uiBadge: "TASKS",
          },
          {
            step: "05",
            title: "Customer Portfolio Health",
            detail: "Account overview identifying key client needs, renewal dates, and satisfaction metrics.",
            metric: "Future",
            uiBadge: "ROADMAP",
          },
        ],
        renderScreen: (step) => (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-xl border border-amber/20 bg-navy-950 p-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-slate-400">
                <span>KAIONEX CRM · PROTOTYPE WIREFRAME</span>
                <span className="text-amber">UNDER DEVELOPMENT</span>
              </div>
              <div className="py-3 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Prospect: Northern Apex Group</span>
                  <span className="text-amber">Stage: Proposal Review</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Key Stakeholder: David Miller (COO)</span>
                  <span>Value: $24,000 / yr</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber/20 bg-amber/5 p-3 text-[11px]">
              <span className="text-amber font-semibold">ROADMAP SPECIFICATION: </span>
              <span className="text-slate-300">
                {step === 0 && "Lead ingestion endpoint design in progress..."}
                {step === 1 && "Account activity chronology architecture planned..."}
                {step === 2 && "Visual kanban deal stage workflow wireframed..."}
                {step === 3 && "Automated calendar and notification hooks scheduled..."}
                {step === 4 && "Customer health scoring model under active review."}
              </span>
            </div>
          </div>
        ),
      };
  }
}
