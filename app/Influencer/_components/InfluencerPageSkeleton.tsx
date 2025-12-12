export default function InfluencerPageSkeleton() {
  return (
    <div className="flex h-screen w-full bg-[#F4F5F7] animate-pulse">
      {/* LEFT PANE SKELETON */}
      <div className="w-full max-w-md bg-white border-r border-slate-200 flex flex-col">
        {/* Search + Filters */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          {/* Location */}
          <div className="space-y-1">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-300 rounded" />
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <div className="w-full h-10 bg-slate-200 rounded-md" />
          </div>
        </div>

        {/* List Skeletons */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="border rounded-2xl p-3 flex gap-3 bg-white"
            >
              {/* Image */}
              <div className="h-20 w-20 bg-slate-200 rounded-xl" />

              {/* Text */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-slate-300 rounded" />
                <div className="h-3 w-1/2 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-3 w-5/6 bg-slate-200 rounded" />

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="h-3 w-24 bg-slate-300 rounded" />
                  <div className="h-6 w-6 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE – MAP SKELETON */}
      <div className="flex-1 relative">
        {/* Category Chips Placeholder */}
        <div className="absolute top-2 left-2 z-10 flex gap-2 flex-wrap">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-20 bg-white/70 backdrop-blur-sm rounded-full border border-slate-200"
            />
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-full bg-slate-300" />
      </div>
    </div>
  );
}
