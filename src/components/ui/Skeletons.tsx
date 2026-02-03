export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden animate-fade-in">
      <div className="skeleton aspect-square"/>
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-1/3"/>
        <div className="skeleton h-5 w-3/4"/>
        <div className="skeleton h-3 w-full"/>
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton h-5 w-1/4"/>
          <div className="skeleton h-3 w-1/5"/>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="skeleton rounded-2xl aspect-square"/>
      <div className="space-y-5">
        <div className="skeleton h-3 w-1/4"/>
        <div className="skeleton h-8 w-3/4"/>
        <div className="skeleton h-4 w-1/2"/>
        <div className="skeleton h-6 w-1/3"/>
        <div className="skeleton h-20 w-full rounded-xl"/>
        <div className="skeleton h-10 w-full rounded-xl"/>
      </div>
    </div>
  );
}
