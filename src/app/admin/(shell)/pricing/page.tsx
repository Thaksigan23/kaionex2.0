import { verifyAdminSession } from "@/lib/admin/auth";

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">{description}</p>
      </div>
      <div className="rounded-xl border border-dashed border-white/10 p-10 text-center">
        <p className="text-[#6b6b80] text-sm">
          Full management UI is planned for Phase D2.
        </p>
        <p className="text-[#4a4a5a] text-xs mt-2">
          Content can be managed directly in the Supabase dashboard in the meantime.
        </p>
      </div>
    </div>
  );
}

export default async function AdminPricingPage() {
  await verifyAdminSession();
  return (
    <PlaceholderPage
      title="Pricing"
      description="Manage pricing plans and features for each KAIONEX product."
    />
  );
}
