import { Fragment } from 'react';
import {
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdCheck,
} from 'react-icons/md';
import { Table, PaginationState } from '@tanstack/react-table';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';

interface PaginationProps {
  table: Table<any>;
  pagination: PaginationState;
  totalRows: number;
}

export default function Pagination({
  table,
  pagination,
  totalRows,
}: PaginationProps) {
  const { pageIndex, pageSize } = pagination;
  const pageCount = Math.ceil(totalRows / pageSize);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-3 p-3 sm:p-3 border-t border-white/5 text-[10px] sm:text-xs text-white/60 rounded-b-3xl bg-black/20'>
      <div className='flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <span className='font-medium text-white/40'>Rows per page:</span>
          <Listbox
            value={pageSize}
            onChange={(value) => table.setPageSize(Number(value))}
          >
            <div className='relative'>
              <ListboxButton className='relative w-full cursor-default rounded-xl bg-white/5 py-1 sm:py-1.5 pl-2.5 sm:pl-2.5 pr-7 sm:pr-7 text-left text-[10px] sm:text-xs text-white border border-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'>
                <span className='block truncate font-medium'>{pageSize}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2'>
                  <MdKeyboardArrowDown
                    className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/40'
                    aria-hidden='true'
                  />
                </span>
              </ListboxButton>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <ListboxOptions className='absolute bottom-full mb-2 max-h-60 w-full overflow-auto rounded-xl bg-surface-dropdown border border-white/10 py-1 text-[10px] sm:text-xs shadow-xl ring-1 ring-white/5 focus:outline-none z-50 min-w-15 sm:min-w-20'>
                  {[50, 100].map((size) => (
                    <ListboxOption
                      key={size}
                      className={({ focus }) =>
                        `relative cursor-default select-none py-1.5 sm:py-1.5 pl-6 sm:pl-8 pr-3 sm:pr-4 transition-colors ${
                          focus ? 'bg-white/5 text-white' : 'text-white/70'
                        }`
                      }
                      value={size}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-bold text-white' : 'font-normal'
                            }`}
                          >
                            {size}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-1.5 sm:pl-2 text-white'>
                              <MdCheck
                                className='h-3 w-3 sm:h-4 sm:w-4'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className='hidden sm:block w-px h-4 bg-white/10' />

        <div className='text-white/40 font-medium'>
          Total: <span className='text-white font-bold'>{totalRows}</span> coins
        </div>
      </div>

      <div className='flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end'>
        <div className='text-white/40 font-medium'>
          Page <span className='text-white font-bold'>{pageIndex + 1}</span> of{' '}
          <span className='text-white font-bold'>{pageCount || 1}</span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='p-1.5 sm:p-1.5 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/10 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60 transition-all duration-200'
            onClick={() => table.setPageIndex(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <MdChevronLeft className='w-4 h-4 sm:w-4 sm:h-4' />
          </button>
          <button
            className='p-1.5 sm:p-1.5 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/10 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60 transition-all duration-200'
            onClick={() => table.setPageIndex(pageIndex + 1)}
            disabled={!canNextPage}
          >
            <MdChevronRight className='w-4 h-4 sm:w-4 sm:h-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
