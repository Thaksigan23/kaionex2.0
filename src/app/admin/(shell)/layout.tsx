import { verifyAdminSession } from "@/lib/admin/auth";
import { AdminShell } from "./_components/AdminShell";

/**
 * Admin section root layout.
 *
 * Applies to all routes under /admin/* EXCEPT /admin/login
 * (which has its own layout-less page).
 *
 * verifyAdminSession() will redirect to /admin/login if the session
 * is invalid or the user has no admin_profiles row.
 */
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <AdminShell session={session}>{children}</AdminShell>
    </div>
  );
}
