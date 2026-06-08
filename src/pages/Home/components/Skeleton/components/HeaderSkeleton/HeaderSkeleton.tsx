export default function HeaderSkeleton() {
  return (
    <div className="relative mb-6 sm:mb-8 p-4 sm:p-6 rounded-3xl sm:rounded-4xl bg-linear-to-b from-white/3 to-transparent border border-white/5 overflow-hidden">
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
        <div className="flex-1 space-y-3 sm:space-y-3">
          {/* Title */}
          <div className="h-6 sm:h-8 w-56 sm:w-72 bg-white/5 rounded-lg animate-pulse" />
          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 sm:h-4 w-full max-w-2xl bg-white/5 rounded animate-pulse" />
            <div className="h-3 sm:h-4 w-full max-w-xl bg-white/5 rounded animate-pulse" />
          </div>
        </div>
        {/* Switch Button */}
        <div className="shrink-0 mt-2 sm:mt-0">
          <div className="h-7 sm:h-10 w-28 sm:w-40 bg-white/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
