"use client";

import type { ComponentType } from "react";
import type { ProductId } from "@/content/products";
import { PosDemo } from "@/components/demos/PosDemo";
import { EmsDemo } from "@/components/demos/EmsDemo";
import { FmsDemo } from "@/components/demos/FmsDemo";
import { EcommerceDemo } from "@/components/demos/EcommerceDemo";
import { CrmDemo } from "@/components/demos/CrmDemo";

const demos: Record<ProductId, ComponentType> = {
  pos: PosDemo,
  ems: EmsDemo,
  fms: FmsDemo,
  ecommerce: EcommerceDemo,
  crm: CrmDemo,
};

/** Drop-in product preview — swap for real screenshots later when available. */
export function ProductDemoById({ id }: { id: ProductId }) {
  const Demo = demos[id];
  return <Demo />;
}
