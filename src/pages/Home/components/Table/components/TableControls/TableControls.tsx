import { MdSearch, MdFilterList } from 'react-icons/md';
import { TableControlsProps } from './interface';

export default function TableControls({
  globalFilter,
  setGlobalFilter,
  handleFilterClick,
  isFilterOpen,
  filterButtonRef,
  children,
}: TableControlsProps) {
  return (
    <div className='p-3 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 relative z-20'>
      <h2 className='text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white/90 to-white/70 tracking-tight hidden sm:block'>
        Market Overview
      </h2>
      <div className='flex items-center gap-2 sm:gap-3 w-full sm:w-auto'>
        <div className='relative group flex-1 sm:flex-none'>
          <MdSearch className='absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-violet transition-colors duration-300 w-4 h-4 sm:w-5 sm:h-5' />
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder='Search coins...'
            className='bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-2 sm:py-2.5 pl-9 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm text-white/90 placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 focus:shadow-glow-white-sm transition-all duration-300 w-full sm:w-72'
          />
        </div>
        <button
          ref={filterButtonRef}
          onClick={handleFilterClick}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-300 border font-medium text-xs sm:text-sm ${
            isFilterOpen
              ? 'bg-brand-violet/10 text-brand-violet border-brand-violet/20 shadow-glow-violet-xs'
              : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5'
          }`}
        >
          <MdFilterList className='w-4 h-4 sm:w-5 sm:h-5' />
          <span className='hidden sm:block'>Filters</span>
        </button>
      </div>
      {children}
    </div>
  );
}
