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
    label: "Retail Sale",
    description: "A sample counter sale updates connected operations.",
    steps: [
      { id: "sale", event: "sale_started", label: "Sale", detail: "Sample item enters the POS cart.", source: "pos", affected: [] },
      { id: "payment", event: "payment_completed", label: "Payment", detail: "Demo card payment is approved.", source: "pos", affected: ["fms"] },
      { id: "inventory", event: "inventory_updated", label: "Inventory", detail: "Sample stock changes from 24 to 23.", source: "pos", affected: ["ecommerce"] },
      { id: "finance", event: "finance_updated", label: "Finance", detail: "The sample sale is recorded in FMS.", source: "fms", affected: [] },
    ],
  },
  {
    id: "online-order",
    label: "Online Order",
    description: "A demo online order synchronizes with store operations.",
    steps: [
      { id: "order", event: "online_order_created", label: "Order", detail: "Demo order #DEMO-1042 arrives from E-Commerce.", source: "ecommerce", affected: ["pos"] },
      { id: "processing", event: "item_added", label: "Processing", detail: "The order moves into the fulfillment workflow.", source: "ecommerce", affected: [] },
      { id: "stock", event: "inventory_updated", label: "Inventory", detail: "Shared sample stock is adjusted for the order.", source: "ecommerce", affected: ["pos", "fms"] },
      { id: "fulfilled", event: "order_fulfilled", label: "Fulfilled", detail: "The order is fulfilled and finance context is updated.", source: "fms", affected: [] },
    ],
  },
  {
    id: "team-workflow",
    label: "Team Workflow",
    description: "A sample EMS task moves from shift start to completion.",
    steps: [
      { id: "active", event: "employee_active", label: "Shift", detail: "A demo employee starts an active shift.", source: "ems", affected: [] },
      { id: "assigned", event: "task_assigned", label: "Task", detail: "“Check stock display” is assigned in EMS.", source: "ems", affected: [] },
      { id: "progress", event: "task_in_progress", label: "Progress", detail: "The team updates the sample task to in progress.", source: "ems", affected: ["pos"] },
      { id: "complete", event: "task_completed", label: "Complete", detail: "The task is completed and visible to operations.", source: "ems", affected: [] },
    ],
  },
];

export function getDemoScenario(id: DemoScenario["id"]) {
  return demoScenarios.find((scenario) => scenario.id === id) ?? demoScenarios[0];
}
