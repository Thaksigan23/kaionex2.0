import type { ProductId } from "@/content/products";

export type DemoEventType =
  | "sale_started"
  | "item_added"
  | "payment_completed"
  | "inventory_updated"
  | "finance_updated"
  | "online_order_created"
  | "order_fulfilled"
  | "employee_active"
  | "task_assigned"
  | "task_in_progress"
  | "task_completed";

export type DemoScenarioStep = {
  id: string;
  event: DemoEventType;
  label: string;
  detail: string;
  source: ProductId;
  affected: readonly ProductId[];
};

export type DemoScenario = {
  id: "retail-sale" | "online-order" | "team-workflow";
  label: string;
  description: string;
  steps: readonly DemoScenarioStep[];
};

/** Illustrative, deterministic product workflows for the marketing site. */
export const demoScenarios: readonly DemoScenario[] = [
  {
    id: "retail-sale",
    label: "POS Checkout",
    description: "An illustrative POS counter checkout workflow.",
    steps: [
      { id: "sale", event: "sale_started", label: "Cart", detail: "Sample item enters the POS cart.", source: "pos", affected: [] },
      { id: "payment", event: "payment_completed", label: "Payment", detail: "Demo card payment is approved.", source: "pos", affected: [] },
      { id: "inventory", event: "inventory_updated", label: "Stock", detail: "Sample stock changes from 24 to 23.", source: "pos", affected: [] },
      { id: "finance", event: "finance_updated", label: "Receipt", detail: "Digital receipt generated and register balanced.", source: "pos", affected: [] },
    ],
  },
  {
    id: "online-order",
    label: "Online Order",
    description: "A demo online order and fulfillment workflow.",
    steps: [
      { id: "order", event: "online_order_created", label: "Order", detail: "Demo order #DEMO-1042 arrives in E-Commerce.", source: "ecommerce", affected: [] },
      { id: "processing", event: "item_added", label: "Processing", detail: "The order moves into the fulfillment workflow.", source: "ecommerce", affected: [] },
      { id: "stock", event: "inventory_updated", label: "Stock", detail: "Storefront catalog quantity is updated for dispatch.", source: "ecommerce", affected: [] },
      { id: "fulfilled", event: "order_fulfilled", label: "Fulfilled", detail: "Order packaged, labeled, and marked ready for dispatch.", source: "ecommerce", affected: [] },
    ],
  },
  {
    id: "team-workflow",
    label: "Team Workflow",
    description: "A sample EMS task moves from shift start to completion.",
    steps: [
      { id: "active", event: "employee_active", label: "Shift", detail: "A demo employee starts an active shift in EMS.", source: "ems", affected: [] },
      { id: "assigned", event: "task_assigned", label: "Task", detail: "“Store floor prep” is assigned in EMS.", source: "ems", affected: [] },
      { id: "progress", event: "task_in_progress", label: "Progress", detail: "The team updates the sample task to in progress.", source: "ems", affected: [] },
      { id: "complete", event: "task_completed", label: "Complete", detail: "The task is completed and visible to managers.", source: "ems", affected: [] },
    ],
  },
];

export function getDemoScenario(id: DemoScenario["id"]) {
  return demoScenarios.find((scenario) => scenario.id === id) ?? demoScenarios[0];
}
