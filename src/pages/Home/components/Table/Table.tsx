import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TableProps } from './interface';
import { columns } from 'constants/dataTable';
import { PAGINATION_CONFIG, customFilterFn } from 'utils/table';
import TableControls from './components/TableControls';
import FilterPanel from './components/FilterPanel';
import TableHeader from './components/TableHeader';
import Pagination from './components/Pagination';
import StickyHeader from './components/StickyHeader';
import { useTableFilters } from './hooks/useTableFilters';
import { useStickyHeader } from './hooks/useStickyHeader';

const DEFAULT_COLUMN = {
  filterFn: customFilterFn,
};

const CORE_ROW_MODEL = getCoreRowModel();
const PAGINATION_ROW_MODEL = getPaginationRowModel();
const SORTED_ROW_MODEL = getSortedRowModel();
const FILTERED_ROW_MODEL = getFilteredRowModel();

export default function Table({ coins }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION_CONFIG.pageSize,
  });

  // Scroll to top on sort change
  const prevSortingRef = useRef(JSON.stringify(sorting));

  useEffect(() => {
    const currentSortingStr = JSON.stringify(sorting);
    if (prevSortingRef.current === currentSortingStr) {
      return;
    }
    prevSortingRef.current = currentSortingStr;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sorting]);

  const navigate = useNavigate();

  // Custom Hooks
  const { isHeaderVisible, tableRef, scrollContainerRef } = useStickyHeader();

  const table = useReactTable({
    data: coins,
    columns,
    defaultColumn: DEFAULT_COLUMN,
    getCoreRowModel: CORE_ROW_MODEL,
    getPaginationRowModel: PAGINATION_ROW_MODEL,
    getSortedRowModel: SORTED_ROW_MODEL,
    getFilteredRowModel: FILTERED_ROW_MODEL,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
    },
  });

  const {
    isFilterOpen,
    setIsFilterOpen,
    activeFilterColumn,
    activeOperator,
    setActiveOperator,
    activeValue,
    setActiveValue,
    filterAnchor,
    filterRef,
    filterButtonRef,
    handleFilterClick,
    handleFilterOpenFromMenu,
    handleFilterSave,
    handleFilterClear,
    handleColumnChange,
    handleMenuOpen,
    isAnchoring,
  } = useTableFilters({ table, columnFilters, isHeaderVisible });

  // Portal logic for sticky header
  const stickyHeaderPortal = document.getElementById('sticky-header-portal')
    ? createPortal(
        <StickyHeader
          table={table}
          handleFilterOpenFromMenu={handleFilterOpenFromMenu}
          scrollContainerRef={scrollContainerRef}
          sorting={sorting}
          columnFilters={columnFilters}
          handleMenuOpen={handleMenuOpen}
        />,
        document.getElementById('sticky-header-portal') as HTMLElement
      )
    : null;

  return (
    <div className='mt-6 sm:mt-6 relative'>
      <div className='flex flex-col w-full rounded-3xl border border-white/5 bg-white/2 backdrop-blur-[20px] shadow-glass'>
        <TableControls
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          handleFilterClick={handleFilterClick}
          isFilterOpen={isFilterOpen}
          filterButtonRef={filterButtonRef}
        >
          <FilterPanel
            isFilterOpen={isFilterOpen}
            filterRef={filterRef}
            setIsFilterOpen={setIsFilterOpen}
            activeFilterColumn={activeFilterColumn}
            handleColumnChange={handleColumnChange}
            table={table}
            activeOperator={activeOperator}
            setActiveOperator={setActiveOperator}
            activeValue={activeValue}
            setActiveValue={setActiveValue}
            handleFilterClear={handleFilterClear}
            handleFilterSave={handleFilterSave}
            anchorEl={filterAnchor}
            isAnchoring={isAnchoring}
            isHeaderVisible={isHeaderVisible}
          />
        </TableControls>

        <div className='h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent' />

        <div ref={scrollContainerRef} className='overflow-x-auto'>
          <table
            ref={tableRef}
            className='w-full border-collapse border-spacing-0 table-fixed'
          >
            <TableHeader
              table={table}
              handleFilterOpenFromMenu={handleFilterOpenFromMenu}
              handleMenuOpen={handleMenuOpen}
              className={isHeaderVisible ? 'opacity-0 pointer-events-none' : ''}
              context='main'
              sorting={sorting}
            />
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => navigate(`/coins/${row.original.id}`)}
                    className='cursor-pointer transition-colors duration-150 ease-out hover:bg-white/5 focus-within:bg-brand-violet/5 active:bg-brand-violet/10'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`py-0.5 sm:py-1.5 text-white/90 text-xs sm:text-xs font-medium ${(() => {
                          const align =
                            cell.column.columnDef.meta?.align ?? 'center';
                          if (align === 'left')
                            return 'pl-4 pr-2 sm:px-3 text-left';
                          if (align === 'right')
                            return 'px-2 sm:px-3 text-right';
                          return 'px-2 sm:px-3 text-center';
                        })()}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className='border-b border-white/3'>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className='py-12 sm:py-20 text-center'
                  >
                    <div className='flex flex-col items-center justify-center gap-2 text-white/40'>
                      <div className='p-4 rounded-full bg-white/5'>
                        <MdSearchOff size={32} />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span className='font-bold text-lg text-white/60'>
                          No coins found
                        </span>
                        <span className='text-xs sm:text-sm'>
                          Try adjusting your search query or filters to find
                          what you're looking for.
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setGlobalFilter('');
                          setColumnFilters([]);
                        }}
                        className='mt-3 text-xs text-brand-violet hover:text-brand-violet/80 hover:underline transition-all'
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          table={table}
          pagination={pagination}
          totalRows={table.getFilteredRowModel().rows.length}
        />
      </div>
      {stickyHeaderPortal}
    </div>
  );
}
