import { verifyAdminSession } from "@/lib/admin/auth";

export default async function AdminIndustriesPage() {
  await verifyAdminSession();
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Industries</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">Manage industry page content.</p>
      </div>
      <div className="rounded-xl border border-dashed border-white/10 p-10 text-center">
        <p className="text-[#6b6b80] text-sm">Full management UI planned for Phase D2.</p>
      </div>
    </div>
  );
}
