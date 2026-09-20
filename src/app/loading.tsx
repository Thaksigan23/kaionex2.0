export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-paper">
      <div className="flex items-center gap-3 rounded-full border border-black/5 bg-white px-5 py-3 shadow-kx-sm">
        <span className="size-2.5 animate-pulse rounded-full bg-brand" />
        <span className="text-sm font-medium text-slate-600">Loading KAIONEX…</span>
      </div>
    </div>
  );
}
