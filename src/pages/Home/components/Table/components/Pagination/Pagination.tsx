import {
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { Table } from '@tanstack/react-table';

interface PaginationProps {
  table: Table<any>;
}

export default function Pagination({ table }: PaginationProps) {
  return (
    <div className='flex items-center justify-end gap-4 p-4 border-t border-white/5 text-sm text-white/60 rounded-b-3xl'>
      <div className='flex items-center gap-2'>
        <span>Rows per page:</span>
        <div className='relative'>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className='appearance-none bg-white/5 border border-white/10 rounded px-2 py-1 pr-6 focus:outline-none focus:border-brand-violet cursor-pointer'
          >
            {[50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize} className='bg-surface'>
                {pageSize}
              </option>
            ))}
          </select>
          <MdKeyboardArrowDown className='absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-white/40' />
        </div>
      </div>
      <div className='flex items-center gap-1 min-w-[100px] justify-center'>
        <span>
          {table.getFilteredRowModel().rows.length === 0
            ? 0
            : table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length}
        </span>
      </div>
      <div className='flex gap-1'>
        <button
          className='p-1 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-colors'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MdChevronLeft size={24} />
        </button>
        <button
          className='p-1 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-colors'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
