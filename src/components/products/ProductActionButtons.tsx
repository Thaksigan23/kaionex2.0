"use client";

import { track } from "@/lib/analytics";
import { getProductActionCta, type Product } from "@/content/products";
import { Button } from "@/components/ui/Button";

export function ProductActionButtons({ product }: { product: Product }) {
  const actionCta = getProductActionCta(product);

  function onPrimary() {
    if (product.id === "crm") {
      track({ name: "crm_get_updates", props: { productId: product.id } });
      return;
    }
    track({
      name: "cta_book_demo",
      props: { location: "product", productId: product.id },
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button href={actionCta.href} withArrow onClick={onPrimary}>
        {actionCta.label}
      </Button>
      <Button href="/products" variant="outline">
        Explore Products
      </Button>
    </div>
  );
}
