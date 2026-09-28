"use client";

import { useTransition } from "react";
import { toggleProductPublishAction } from "@/lib/admin/product-actions";

interface PublishToggleButtonProps {
  productId: string;
  isPublished: boolean;
}

export function PublishToggleButton({
  productId,
  isPublished,
}: PublishToggleButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleProductPublishAction(productId, !isPublished);
      if (!res.success) {
        alert(res.error || "Failed to update publish status");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50",
        isPublished
          ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30"
          : "bg-white/5 text-[#7a7a90] hover:bg-white/10 hover:text-white border border-white/10",
      ].join(" ")}
      title={isPublished ? "Click to unpublish" : "Click to publish"}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          isPublished ? "bg-emerald-400 animate-pulse" : "bg-[#7a7a90]",
        ].join(" ")}
      />
      {isPending ? "Updating..." : isPublished ? "Published" : "Draft"}
    </button>
  );
}
