"use server";

/**
 * KAIONEX CMS — Product mutation server actions (Phase D2).
 *
 * All mutations require an authenticated admin session with 'owner' or 'admin' role.
 * Actions write audit logs to `cms_audit_log` and revalidate cache paths.
 */

import { revalidatePath } from "next/cache";
import { verifyAdminSession, requireRole } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/admin/audit";
import { ProductSchema, type ProductInput } from "@/lib/admin/schemas";

const CANONICAL_SLUGS = ["pos", "ems", "fms", "ecommerce", "crm"] as const;

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Update an existing product.
 */
export async function updateProductAction(
  id: string,
  input: ProductInput
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin");

    const validated = ProductSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: `Validation failed: ${validated.error.issues.map((i) => i.message).join(", ")}`,
      };
    }

    const admin = createAdminClient();

    // Fetch existing row for diff
    const { data: before } = await admin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!before) {
      return { success: false, error: "Product not found" };
    }

    // Execute update
    const { data: after, error } = await admin
      .from("products")
      .update({
        ...validated.data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Audit log
    await writeAuditLog({
      adminId: session.userId,
      action: "update",
      tableName: "products",
      recordId: id,
      diff: { before, after },
    });

    // Revalidate affected pages
    revalidatePath("/products");
    revalidatePath(`/products/${validated.data.slug}`);
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true, data: after };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update product",
    };
  }
}

/**
 * Toggle published state of a product.
 */
export async function toggleProductPublishAction(
  id: string,
  isPublished: boolean
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    const { data: product, error } = await admin
      .from("products")
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: isPublished ? "publish" : "unpublish",
      tableName: "products",
      recordId: id,
    });

    revalidatePath("/products");
    if (product?.slug) revalidatePath(`/products/${product.slug}`);
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true, data: product };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle publish state",
    };
  }
}

/**
 * Create a new product.
 */
export async function createProductAction(
  input: ProductInput
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin");

    const validated = ProductSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: `Validation failed: ${validated.error.issues.map((i) => i.message).join(", ")}`,
      };
    }

    const admin = createAdminClient();

    const { data: created, error } = await admin
      .from("products")
      .insert(validated.data)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "create",
      tableName: "products",
      recordId: created.id,
      diff: { after: created },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true, data: created };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create product",
    };
  }
}

/**
 * Delete a product (protected: canonical products cannot be deleted).
 */
export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner");

    const admin = createAdminClient();

    const { data: product } = await admin
      .from("products")
      .select("slug")
      .eq("id", id)
      .single();

    if (!product) return { success: false, error: "Product not found" };

    if ((CANONICAL_SLUGS as readonly string[]).includes(product.slug)) {
      return {
        success: false,
        error: `Cannot delete canonical product "${product.slug}". These are core to the KAIONEX portfolio.`,
      };
    }

    const { error } = await admin.from("products").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "delete",
      tableName: "products",
      recordId: id,
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete product",
    };
  }
}

/**
 * Add a feature to a product.
 */
export async function addProductFeatureAction(
  productId: string,
  feature: string,
  sortOrder: number = 0
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const clean = feature.trim();
    if (!clean) return { success: false, error: "Feature text cannot be empty" };

    const admin = createAdminClient();

    const { data, error } = await admin
      .from("product_features")
      .insert({
        product_id: productId,
        feature: clean,
        sort_order: sortOrder,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "create",
      tableName: "product_features",
      recordId: data.id,
      diff: { after: data },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to add feature",
    };
  }
}

/**
 * Delete a feature from a product.
 */
export async function deleteProductFeatureAction(
  featureId: string
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    const { error } = await admin
      .from("product_features")
      .delete()
      .eq("id", featureId);

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "delete",
      tableName: "product_features",
      recordId: featureId,
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete feature",
    };
  }
}

/**
 * Update an existing product feature.
 */
export async function updateProductFeatureAction(
  featureId: string,
  feature: string,
  sortOrder?: number
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const clean = feature.trim();
    if (!clean) return { success: false, error: "Feature text cannot be empty" };

    const admin = createAdminClient();

    const updatePayload: Record<string, unknown> = { feature: clean };
    if (typeof sortOrder === "number") {
      updatePayload.sort_order = sortOrder;
    }

    const { data, error } = await admin
      .from("product_features")
      .update(updatePayload)
      .eq("id", featureId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "update",
      tableName: "product_features",
      recordId: featureId,
      diff: { after: data },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update feature",
    };
  }
}

/**
 * Reorder features for a product.
 */
export async function reorderProductFeaturesAction(
  productId: string,
  orderedFeatureIds: string[]
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    for (let i = 0; i < orderedFeatureIds.length; i++) {
      const id = orderedFeatureIds[i];
      await admin
        .from("product_features")
        .update({ sort_order: i + 1 })
        .eq("id", id)
        .eq("product_id", productId);
    }

    await writeAuditLog({
      adminId: session.userId,
      action: "update",
      tableName: "product_features",
      recordId: productId,
      diff: { after: { reordered: orderedFeatureIds } },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to reorder features",
    };
  }
}

// ─── Product Media Actions ────────────────────────────────────────────────────

/**
 * Upload a media file for a product and save database record.
 */
export async function uploadProductMediaAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const productId = formData.get("productId") as string;
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || null;

    if (!productId || !file || file.size === 0) {
      return { success: false, error: "Product ID and a valid file are required" };
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File size exceeds 10MB limit" };
    }

    const admin = createAdminClient();

    // Verify product exists
    const { data: product } = await admin
      .from("products")
      .select("id")
      .eq("id", productId)
      .single();

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const storagePath = `products/${productId}/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to site-media bucket
    const { error: uploadError } = await admin.storage
      .from("site-media")
      .upload(storagePath, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (uploadError) {
      return { success: false, error: `Storage upload failed: ${uploadError.message}` };
    }

    // Determine next sort order
    const { data: existingMedia } = await admin
      .from("product_media")
      .select("sort_order")
      .eq("product_id", productId)
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextOrder = existingMedia && existingMedia.length > 0 ? (existingMedia[0].sort_order || 0) + 1 : 1;

    // Insert database record
    const { data: inserted, error: insertError } = await admin
      .from("product_media")
      .insert({
        product_id: productId,
        storage_path: storagePath,
        alt_text: altText,
        media_type: file.type || "image/png",
        sort_order: nextOrder,
      })
      .select()
      .single();

    if (insertError) {
      // Cleanup uploaded file on DB insert error
      await admin.storage.from("site-media").remove([storagePath]);
      return { success: false, error: insertError.message };
    }

    await writeAuditLog({
      adminId: session.userId,
      action: "create",
      tableName: "product_media",
      recordId: inserted.id,
      diff: { after: inserted },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, data: inserted };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to upload product media",
    };
  }
}

/**
 * Update product media metadata (alt text, sort order).
 */
export async function updateProductMediaAction(
  mediaId: string,
  input: {
    alt_text?: string | null;
    sort_order?: number;
  }
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    // Fetch existing media row
    const { data: existing } = await admin
      .from("product_media")
      .select("*")
      .eq("id", mediaId)
      .single();

    if (!existing) return { success: false, error: "Media item not found" };

    const updatePayload: Record<string, unknown> = {};
    if (input.alt_text !== undefined) updatePayload.alt_text = input.alt_text;
    if (input.sort_order !== undefined) updatePayload.sort_order = input.sort_order;

    const { data: updated, error } = await admin
      .from("product_media")
      .update(updatePayload)
      .eq("id", mediaId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await writeAuditLog({
      adminId: session.userId,
      action: "update",
      tableName: "product_media",
      recordId: mediaId,
      diff: { before: existing, after: updated },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true, data: updated };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update media item",
    };
  }
}

/**
 * Delete product media item (removes DB record and cleans up storage object).
 */
export async function deleteProductMediaAction(mediaId: string): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    const { data: media } = await admin
      .from("product_media")
      .select("id, storage_path, product_id")
      .eq("id", mediaId)
      .single();

    if (!media) return { success: false, error: "Media item not found" };

    // Delete DB record
    const { error: dbError } = await admin
      .from("product_media")
      .delete()
      .eq("id", mediaId);

    if (dbError) return { success: false, error: dbError.message };

    // Clean up file in storage
    if (media.storage_path) {
      try {
        await admin.storage.from("site-media").remove([media.storage_path]);
      } catch {
        // Storage cleanup non-blocking
      }
    }

    await writeAuditLog({
      adminId: session.userId,
      action: "delete",
      tableName: "product_media",
      recordId: mediaId,
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete media item",
    };
  }
}

/**
 * Reorder media items for a product.
 */
export async function reorderProductMediaAction(
  productId: string,
  orderedMediaIds: string[]
): Promise<ActionResult> {
  try {
    const session = await verifyAdminSession();
    await requireRole("owner", "admin", "editor");

    const admin = createAdminClient();

    for (let i = 0; i < orderedMediaIds.length; i++) {
      const id = orderedMediaIds[i];
      await admin
        .from("product_media")
        .update({ sort_order: i + 1 })
        .eq("id", id)
        .eq("product_id", productId);
    }

    await writeAuditLog({
      adminId: session.userId,
      action: "update",
      tableName: "product_media",
      recordId: productId,
      diff: { after: { reordered_media: orderedMediaIds } },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to reorder media",
    };
  }
}

