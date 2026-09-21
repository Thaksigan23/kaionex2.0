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
            Every
            <br />
            transaction.
            <br />
            <em>Visible.</em>
          </>
        }
        description="The sale leaves the counter, not the picture. Keep financial activity connected to the operation that created it."
        steps={[
          "Sale arrives from POS",
          "Transaction recorded",
          "Financial summary updates",
          "Invoice status visible",
          "Cash-flow chart responds",
          "One financial picture",
        ]}
        reverse={true}
        footnote="The POS sale (#POS-8841 · $40.70) automatically credits revenue ($48,240.70) and records into the financial ledger."
      >
        <FmsDemo storyMode />
      </ScrollChapter>

      <ScrollChapter
        number="03"
        product="ecommerce"
        name="E-Commerce"
        title={
          <>
            Online orders.
            <br />
            <em>Shared stock.</em>
          </>
        }
        description="An online order. The same operational foundation. Inventory and fulfillment stay connected to the rest of your business."
        steps={[
          "Store ready",
          "New order received",
          "Order processing",
          "Inventory reserved",
          "Ready for fulfillment",
          "Order fulfilled",
        ]}
        bridgeChip="POS Stock (40) ⇄ Online Store Stock (40)"
        footnote="Central warehouse inventory is decremented from the counter sale; online orders draw from the same stock pool."
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
            <em>Visible.</em>
          </>
        }
        description="Behind every operation, there are people. Bring attendance, tasks, shifts, and team communication into one workspace."
        steps={[
          "Employee active",
          "Task assigned",
          "Work in progress",
          "Progress visible",
          "Task completed",
          "Manager visibility",
        ]}
        footnote="Floor operations stay connected: Store Associate executes replenishment and Floor Lead confirms in team chat."
      >
        <EmsDemo />
      </ScrollChapter>
    </>
  );
}
