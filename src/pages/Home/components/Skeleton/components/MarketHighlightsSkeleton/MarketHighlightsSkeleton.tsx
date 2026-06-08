export default function MarketHighlightsSkeleton() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 relative z-10">
      {/* Top Gainers Column */}
      <div className="flex-1 flex flex-col gap-3 sm:gap-4">
        {/* Column Header */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-3 sm:p-5 rounded-xl sm:rounded-3xl bg-white/2 border border-white/5 overflow-hidden h-24 sm:h-32 justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 animate-pulse shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                  <div className="h-2 w-8 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <div className="h-4 w-12 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-10 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers Column */}
      <div className="flex-1 flex flex-col gap-3 sm:gap-4">
        {/* Column Header */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-3 sm:p-5 rounded-xl sm:rounded-3xl bg-white/2 border border-white/5 overflow-hidden h-24 sm:h-32 justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 animate-pulse shrink-0" />
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                  <div className="h-2 w-8 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <div className="h-4 w-12 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-10 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
