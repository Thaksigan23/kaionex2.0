import "server-only";

/**
 * KAIONEX CMS — Audit log helper.
 *
 * Writes entries to cms_audit_log using the admin (service-role) client
 * so that RLS does not block writes. Call this inside server actions AFTER
 * verifying admin session and completing the mutation.
 *
 * Failures are logged to stderr but do NOT throw — audit failures must never
 * break the primary mutation.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import type { AuditAction, CmsTableName } from "@/lib/supabase/types";

export interface AuditEntry {
  adminId: string;
  action: AuditAction;
  tableName: CmsTableName;
  recordId?: string;
  diff?: { before?: unknown; after?: unknown };
}

export async function writeAuditLog(entry: AuditEntry): Promise<void> {
  try {
    const admin = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (admin as any).from("cms_audit_log").insert({
      admin_id: entry.adminId,
      action: entry.action,
      table_name: entry.tableName,
      record_id: entry.recordId ?? null,
      diff: entry.diff ?? null,
    });

    if (error) {
      console.error("[KAIONEX CMS] Audit log write failed:", error.message);
    }
  } catch (err) {
    console.error("[KAIONEX CMS] Audit log exception:", err);
  }
}
