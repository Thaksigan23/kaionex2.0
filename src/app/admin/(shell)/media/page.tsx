import { verifyAdminSession } from "@/lib/admin/auth";

export default async function AdminMediaPage() {
  await verifyAdminSession();
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b80] mb-1">
          KAIONEX Website Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Media</h1>
        <p className="mt-1 text-sm text-[#7a7a90]">
          Upload and manage website media files via the{" "}
          <code className="text-xs bg-white/8 px-1 py-0.5 rounded">site-media</code>{" "}
          Supabase Storage bucket.
        </p>
      </div>
      <div className="rounded-xl border border-white/8 bg-white/3 p-5 text-sm text-[#a0a0b0]">
        <p className="font-semibold text-white mb-2">Storage bucket structure</p>
        <pre className="text-xs text-[#6b6b80] leading-loose">
{`site-media/
  products/{product_id}/   — product images
  resources/{resource_id}/ — blog / resource cover images
  site/                    — logos, OG images, misc`}
        </pre>
        <p className="mt-4 text-xs text-[#4a4a5a]">
          Create the bucket in the Supabase Dashboard → Storage → New bucket → name:{" "}
          <code className="bg-white/8 px-1 py-0.5 rounded">site-media</code> → Public: on.
          <br />
          Anonymous uploads are disabled. Upload via authenticated admin actions.
        </p>
      </div>
      <p className="mt-6 text-xs text-[#4a4a5a]">
        File browser and upload UI planned for Phase D2.
      </p>
    </div>
  );
}
