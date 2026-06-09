import { MdTrendingUp } from 'react-icons/md';

export default function TrendingMarqueeSkeleton() {
  return (
    <div className="w-full bg-white/2 border-y border-white/5 py-2 sm:py-2.5 overflow-hidden flex items-center mb-6 sm:mb-8 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-8 flex items-center gap-4 relative">
        <div className="flex items-center gap-2 shrink-0 bg-brand-violet/10 px-2 sm:px-3 py-1 rounded-full border border-brand-violet/20 shadow-glow-primary z-20">
          <MdTrendingUp className="text-brand-violet/50 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-[10px] sm:text-xs font-bold text-brand-violet/50 uppercase tracking-wider">
            Trending
          </span>
        </div>

        {/* Marquee Container Skeleton */}
        <div className="flex-1 overflow-hidden relative mask-fade-edges flex items-center gap-6 sm:gap-10 opacity-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 animate-pulse" />
              <div className="h-3 sm:h-4 w-16 sm:w-20 bg-white/5 rounded animate-pulse" />
              <div className="h-2 sm:h-3 w-8 sm:w-10 bg-white/5 rounded animate-pulse" />
              <div className="h-3 sm:h-3.5 w-10 sm:w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
