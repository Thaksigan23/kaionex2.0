import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number,
  currency: "USD" | "LKR",
  options?: { compact?: boolean },
) {
  if (currency === "LKR") {
    return `LKR ${amount.toLocaleString("en-LK")}`;
  }
  return options?.compact ? `$${amount}` : `$${amount.toLocaleString("en-US")}`;
}
