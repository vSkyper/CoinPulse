import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { PageNavigationProps } from './interface';

export default function PageNavigation({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  setPageIndex,
}: PageNavigationProps) {
  return (
    <div className='flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end'>
      <div className='text-white/40 font-medium'>
        Page <span className='text-white font-bold'>{pageIndex + 1}</span> of{' '}
        <span className='text-white font-bold'>{pageCount || 1}</span>
      </div>

      <div className='flex items-center gap-2'>
        <button
          className='p-1.5 sm:p-1.5 rounded-xl bg-brand-violet/5 border border-white/10 text-white/60 hover:text-white hover:bg-brand-violet/10 hover:border-white/20 ring-1 ring-white/5 disabled:opacity-30 disabled:hover:bg-brand-violet/5 disabled:hover:text-white/60 transition-all duration-200'
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={!canPreviousPage}
        >
          <MdChevronLeft className='w-4 h-4 sm:w-4 sm:h-4' />
        </button>
        <button
          className='p-1.5 sm:p-1.5 rounded-xl bg-brand-violet/5 border border-white/10 text-white/60 hover:text-white hover:bg-brand-violet/10 hover:border-white/20 ring-1 ring-white/5 disabled:opacity-30 disabled:hover:bg-brand-violet/5 disabled:hover:text-white/60 transition-all duration-200'
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={!canNextPage}
        >
          <MdChevronRight className='w-4 h-4 sm:w-4 sm:h-4' />
        </button>
      </div>
    </div>
  );
}
