import { FmsDemo } from "@/components/demos/FmsDemo";
import { EcommerceDemo } from "@/components/demos/EcommerceDemo";
import { EmsDemo } from "@/components/demos/EmsDemo";
import { ScrollChapter } from "./ScrollChapter";
import { ConnectedEvent } from "./ConnectedEvent";

export function ProductChapters() {
  return (
    <>
      <ConnectedEvent />
      <ScrollChapter
        number="02"
        product="fms"
        name="KAIONEX FMS"
        title={
          <>
            Finance.
            <br />
            Clearly
            <br />
            <em>managed.</em>
          </>
        }
        description="A dedicated KAIONEX product for financial management. Track income, monitor expenses, manage cash flow, and maintain clear records for your business."
        steps={[
          "Income & expense tracking",
          "Operating ledger entries",
          "Cash-flow monitoring",
          "Invoice status visibility",
          "Revenue summaries",
          "Financial control",
        ]}
        reverse={true}
        footnote="Illustrative financial records showing invoice tracking and cash flow in KAIONEX FMS."
      >
        <FmsDemo storyMode />
      </ScrollChapter>

      <ScrollChapter
        number="03"
        product="ecommerce"
        name="E-Commerce"
        title={
          <>
            Sell online.
            <br />
            Manage
            <br />
            <em>orders.</em>
          </>
        }
        description="A dedicated digital commerce product in the KAIONEX portfolio. Manage digital storefronts, receive online orders, and guide fulfillment from purchase to completion."
        steps={[
          "Store catalog active",
          "Order received",
          "Order processing",
          "Ready for fulfillment",
          "Order fulfilled",
          "Fulfillment complete",
        ]}
        footnote="Illustrative digital storefront workflow: managing online orders from intake to fulfillment."
        wide={true}
      >
        <EcommerceDemo storyMode />
      </ScrollChapter>

      <ScrollChapter
        number="04"
        product="ems"
        name="KAIONEX EMS"
        title={
          <>
            People. Work.
            <br />
            <em>Organized.</em>
          </>
        }
        description="A dedicated KAIONEX product for workforce and operations management. Organize staff profiles, assign tasks, monitor shifts, and keep teams communicating."
        steps={[
          "Active shift roster",
          "Task assigned",
          "Work in progress",
          "Progress tracking",
          "Task completed",
          "Team confirmation",
        ]}
        footnote="Illustrative workforce coordination: task assignment, monitoring, and team communication in KAIONEX EMS."
      >
        <EmsDemo />
      </ScrollChapter>
    </>
  );
}
