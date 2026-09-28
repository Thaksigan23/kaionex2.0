"use client";

import { useState, useTransition } from "react";
import type { ProductFeature } from "@/lib/supabase/types";
import {
  addProductFeatureAction,
  updateProductFeatureAction,
  reorderProductFeaturesAction,
  deleteProductFeatureAction,
} from "@/lib/admin/product-actions";

interface ProductFeatureManagerProps {
  productId: string;
  initialFeatures: ProductFeature[];
}

export function ProductFeatureManager({
  productId,
  initialFeatures,
}: ProductFeatureManagerProps) {
  const [features, setFeatures] = useState<ProductFeature[]>(initialFeatures);
  const [newFeatureText, setNewFeatureText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;

    setError(null);
    startTransition(async () => {
      const nextOrder = features.length > 0 ? Math.max(...features.map((f) => f.sort_order)) + 1 : 1;
      const res = await addProductFeatureAction(productId, newFeatureText.trim(), nextOrder);
      if (res.success && res.data) {
        setFeatures((prev) => [...prev, res.data as ProductFeature]);
        setNewFeatureText("");
      } else {
        setError(res.error || "Failed to add feature");
      }
    });
  };

  const handleStartEdit = (f: ProductFeature) => {
    setEditingId(f.id);
    setEditingText(f.feature);
  };

  const handleSaveEdit = (featureId: string) => {
    if (!editingText.trim()) return;

    setError(null);
    startTransition(async () => {
      const res = await updateProductFeatureAction(featureId, editingText.trim());
      if (res.success && res.data) {
        setFeatures((prev) =>
          prev.map((f) => (f.id === featureId ? (res.data as ProductFeature) : f))
        );
        setEditingId(null);
        setEditingText("");
      } else {
        setError(res.error || "Failed to update feature");
      }
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= features.length) return;

    const updated = [...features];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFeatures(updated);

    startTransition(async () => {
      const orderedIds = updated.map((f) => f.id);
      const res = await reorderProductFeaturesAction(productId, orderedIds);
      if (!res.success) {
        setError(res.error || "Failed to reorder features");
      }
    });
  };

  const handleDeleteFeature = (featureId: string) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    setError(null);
    startTransition(async () => {
      const res = await deleteProductFeatureAction(featureId);
      if (res.success) {
        setFeatures((prev) => prev.filter((f) => f.id !== featureId));
      } else {
        setError(res.error || "Failed to delete feature");
      }
    });
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Feature list */}
      <div className="divide-y divide-white/5 rounded-xl border border-white/8 bg-white/2">
        {features.length === 0 ? (
          <p className="p-4 text-xs text-[#6b6b80] italic">
            No features added for this product yet.
          </p>
        ) : (
          features.map((f, idx) => (
            <div
              key={f.id}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-white/1"
            >
              {editingId === f.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-sm text-white focus:border-brand focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(f.id)}
                    disabled={isPending}
                    className="rounded bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="rounded bg-white/10 px-2 py-1 text-xs text-[#a0a0b0] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xs font-mono text-[#6b6b80] w-6 shrink-0">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-white/90 truncate">{f.feature}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0 || isPending}
                      className="p-1 text-xs text-[#7a7a90] hover:text-white disabled:opacity-30"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === features.length - 1 || isPending}
                      className="p-1 text-xs text-[#7a7a90] hover:text-white disabled:opacity-30"
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(f)}
                      disabled={isPending}
                      className="px-2 py-0.5 text-xs text-blue-400 hover:text-blue-300"
                      title="Edit text"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFeature(f.id)}
                      disabled={isPending}
                      className="px-2 py-0.5 text-xs text-red-400/70 hover:text-red-300 transition-colors disabled:opacity-50"
                      title="Delete feature"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add feature input */}
      <form onSubmit={handleAddFeature} className="flex gap-2">
        <input
          type="text"
          value={newFeatureText}
          onChange={(e) => setNewFeatureText(e.target.value)}
          placeholder="Add a new product capability or feature..."
          disabled={isPending}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-[#6b6b80] focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <button
          type="submit"
          disabled={isPending || !newFeatureText.trim()}
          className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          {isPending ? "Adding..." : "+ Add Feature"}
        </button>
      </form>
    </div>
  );
}
