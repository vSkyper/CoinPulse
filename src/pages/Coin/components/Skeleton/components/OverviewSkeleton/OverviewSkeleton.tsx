import { InlineLoader } from 'components';

export default function OverviewSkeleton() {
  return (
    <>
      {/* Row 1: Chart & Converter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-4">
        <div className="sm:col-span-8 flex flex-col gap-6 sm:gap-8">
          {/* Mobile-only Price Range (above chart) */}
          <div className="block sm:hidden">
            <div className="h-30 rounded-3xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral" />
          </div>

          <div className="mb-4 sm:mb-3">
            <div className="h-62.5 sm:h-112.5 flex items-center justify-center bg-white/2 rounded-3xl border border-white/5 shadow-highlight-neutral">
              <InlineLoader text="Loading chart..." />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 flex flex-col gap-6 sm:gap-8">
          {/* Desktop-only Price Range (right column) */}
          <div className="hidden sm:block">
            <div className="h-30 rounded-3xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral" />
          </div>
          <div className="h-75 sm:h-64 rounded-3xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral flex items-center justify-center">
            <InlineLoader text="Loading currency converter..." />
          </div>
        </div>
      </div>

      {/* Row 2: Market Stats (Full Width) */}
      <div className="mt-8 sm:mt-10">
        <div className="w-full flex flex-col gap-4 sm:gap-4">
          {/* Row 1: Hero Stats (3 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-22.5 rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral"
              />
            ))}
          </div>
          {/* Row 2: Secondary Stats (4 cols) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral"
              />
            ))}
          </div>

          {/* Row 3: Range & Extreme Stats (2 cols for extreme) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-10 rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Project Info & Links */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-10">
        <div className="sm:col-span-8 flex flex-col gap-6 sm:gap-8">
          {/* Project Info */}
          <div className="h-62.5 w-full rounded-3xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral" />

          {/* Developer Activity */}
          <div className="h-62.5 w-full rounded-3xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral" />
        </div>

        <div className="sm:col-span-4 flex flex-col gap-6 sm:gap-8">
          {/* Links */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/2 border border-white/5 shadow-highlight-neutral space-y-6">
            <div className="space-y-3">
              <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2.5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 rounded-lg bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 rounded-lg bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
