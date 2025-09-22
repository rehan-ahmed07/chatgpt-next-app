// Route-level loading UI for storefront pages under (frontend)
// This shows instantly on navigation while the page streams in

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 h-10 w-full max-w-md animate-pulse rounded-md bg-muted" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}