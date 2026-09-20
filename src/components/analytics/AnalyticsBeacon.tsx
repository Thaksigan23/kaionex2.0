"use client";

import { useEffect } from "react";
import { track, type AnalyticsEventName, type AnalyticsProps } from "@/lib/analytics";

export function AnalyticsBeacon({
  name,
  props,
}: {
  name: AnalyticsEventName;
  props?: AnalyticsProps;
}) {
  const location = props?.location;
  const productId = props?.productId;

  useEffect(() => {
    track({
      name,
      props: {
        ...(location ? { location } : {}),
        ...(productId ? { productId } : {}),
      },
    });
  }, [name, location, productId]);

  return null;
}
