"use client";

import { useState, useTransition, useRef } from "react";
import type { ProductMedia } from "@/lib/supabase/types";
import {
  uploadProductMediaAction,
  updateProductMediaAction,
  deleteProductMediaAction,
  reorderProductMediaAction,
} from "@/lib/admin/product-actions";

interface ProductMediaManagerProps {
  productId: string;
  initialMedia: ProductMedia[];
}

export function ProductMediaManager({
  productId,
  initialMedia,
}: ProductMediaManagerProps) {
  const [mediaList, setMediaList] = useState<ProductMedia[]>(initialMedia);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Upload form state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState("");

  // Edit item state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const getMediaUrl = (storagePath: string) => {
    return `${supabaseUrl}/storage/v1/object/public/site-media/${storagePath}`;
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Please select an image file to upload");
      return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("file", file);
    formData.append("altText", altText.trim());

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await uploadProductMediaAction(formData);
      if (res.success && res.data) {
        const newItem = res.data as ProductMedia;
        setMediaList((prev) => [...prev, newItem]);
        setSuccess("Media uploaded successfully!");
        setAltText("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(res.error || "Failed to upload media");
      }
    });
  };

  const handleStartEdit = (item: ProductMedia) => {
    setEditingId(item.id);
    setEditAlt(item.alt_text ?? "");
  };

  const handleSaveEdit = (mediaId: string) => {
    setError(null);
    startTransition(async () => {
      const res = await updateProductMediaAction(mediaId, {
        alt_text: editAlt.trim() || null,
      });
      if (res.success && res.data) {
        setMediaList((prev) =>
          prev.map((m) => (m.id === mediaId ? (res.data as ProductMedia) : m))
        );
        setEditingId(null);
      } else {
        setError(res.error || "Failed to update media details");
      }
    });
  };

  const handleDelete = (mediaId: string) => {
    if (!confirm("Are you sure you want to delete this media item? The file will be removed from storage.")) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await deleteProductMediaAction(mediaId);
      if (res.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== mediaId));
      } else {
        setError(res.error || "Failed to delete media item");
      }
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= mediaList.length) return;

    const updated = [...mediaList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setMediaList(updated);

    startTransition(async () => {
      const orderedIds = updated.map((m) => m.id);
      await reorderProductMediaAction(productId, orderedIds);
    });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
          {success}
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaList.length === 0 ? (
          <div className="col-span-full rounded-xl border border-white/8 bg-white/2 p-6 text-center text-xs text-[#6b6b80] italic">
            No media uploaded for this product yet. Use the form below to upload screenshots or diagrams.
          </div>
        ) : (
          mediaList.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex flex-col rounded-xl border border-white/8 bg-white/3 overflow-hidden group"
            >
              {/* Image preview */}
              <div className="relative aspect-video w-full bg-black/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getMediaUrl(item.storage_path)}
                  alt={item.alt_text ?? "Product media"}
                  className="h-full w-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 rounded-full bg-blue-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    Primary Image
                  </span>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0 || isPending}
                    className="rounded bg-black/70 p-1 text-xs text-white hover:bg-black disabled:opacity-30"
                    title="Move earlier (makes primary if moved first)"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === mediaList.length - 1 || isPending}
                    className="rounded bg-black/70 p-1 text-xs text-white hover:bg-black disabled:opacity-30"
                    title="Move later"
                  >
                    ▶
                  </button>
                </div>
              </div>

              {/* Media details / edit */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                {editingId === item.id ? (
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[#7a7a90] text-[10px] uppercase mb-0.5">Alt Text</label>
                      <input
                        type="text"
                        value={editAlt}
                        onChange={(e) => setEditAlt(e.target.value)}
                        className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white"
                        placeholder="Alt text..."
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={isPending}
                        className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded bg-white/10 px-2 py-1 text-xs text-white/70 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-medium text-white truncate" title={item.alt_text ?? ""}>
                      {item.alt_text || <span className="italic text-[#6b6b80]">No alt text</span>}
                    </p>
                    <p className="text-[10px] font-mono text-[#4a4a5a] mt-1 truncate">
                      {item.storage_path}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className="text-[10px] text-[#6b6b80]">
                    Order #{item.sort_order}
                  </span>

                  <div className="flex items-center gap-2">
                    {editingId !== item.id && (
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        disabled={isPending}
                        className="text-xs text-[#7a7a90] hover:text-white"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="text-xs text-red-400/80 hover:text-red-300 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Media Section */}
      <div className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Upload New Product Media</h3>
        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
                Image File * (PNG, JPG, WebP up to 10MB)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                required
                disabled={isPending}
                className="w-full text-xs text-[#7a7a90] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#7a7a90] mb-1.5">
                Alt Text (accessibility & SEO)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descriptive image text..."
                disabled={isPending}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {isPending ? "Uploading..." : "Upload to Storage"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
