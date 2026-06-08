import { MdSearch, MdFilterList, MdAutoGraph } from 'react-icons/md';
import type { TableControlsProps } from './interface';

export default function TableControls({
  globalFilter,
  setGlobalFilter,
  handleFilterClick,
  isFilterOpen,
  filterButtonRef,
  children,
}: TableControlsProps) {
  return (
    <div className="relative z-20 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2 sm:px-2 relative z-10 pb-2">
        {/* Title Section */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <div className="flex w-9 h-9 sm:w-12 sm:h-12 rounded-[0.85rem] sm:rounded-2xl bg-linear-to-br from-brand-violet/20 to-transparent items-center justify-center border border-brand-violet/20 shadow-[inset_0_0_12px_rgba(139,92,246,0.1)] shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-violet/10 blur-xl"></div>
            <MdAutoGraph className="w-4 h-4 sm:w-6 sm:h-6 text-brand-violet relative z-10 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-white/90 to-white/50 tracking-tighter drop-shadow-sm leading-none">
              Market Overview
            </h2>
            <p className="text-[10px] sm:text-xs font-medium text-white/50 tracking-wide mt-1">
              Track top performing assets
            </p>
          </div>
        </div>

        {/* Controls Section (Search & Filter) */}
        <div className="flex items-stretch sm:items-center gap-2 sm:gap-2 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative group flex-1 sm:w-56">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-violet transition-colors w-4 h-4" />
            <input
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search coins..."
              className="w-full bg-white/5 border border-white/5 ring-1 ring-white/5 rounded-xl py-1.5 pl-9 pr-3 text-xs font-medium text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 focus:shadow-glow-neutral focus:ring-brand-violet/40 transition-all hover:bg-white/10 hover:border-white/10"
            />
          </div>

          {/* Filter Button */}
          <button
            ref={filterButtonRef}
            onClick={handleFilterClick}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all border shrink-0 ${
              isFilterOpen
                ? 'bg-brand-violet/10 text-brand-violet border-brand-violet/20 shadow-glow-primary ring-1 ring-brand-violet/20'
                : 'bg-white/5 text-white/70 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/10 ring-1 ring-white/5 hover:shadow-glow-neutral'
            }`}
          >
            <MdFilterList className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Filters</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
