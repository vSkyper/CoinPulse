import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from 'context/FavoritesContext';
import type { TableProps } from './interface';
import { columns } from 'constants/dataTable';
import { PAGINATION_CONFIG, customFilterFn } from 'utils/table';
import { useStickyHeader, useTableFilters } from './hooks';
import {
  FilterPanel,
  Pagination,
  StickyHeader,
  TableControls,
  TableHeader,
  TableBody,
} from './components';

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
  const { favorites } = useFavorites();

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
    meta: {
      favorites,
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
  const stickyHeaderPortal =
    document.getElementById('sticky-header-portal') && isHeaderVisible
      ? createPortal(
          <StickyHeader
            table={table}
            handleFilterOpenFromMenu={handleFilterOpenFromMenu}
            scrollContainerRef={scrollContainerRef}
            sorting={sorting}
            columnFilters={columnFilters}
            handleMenuOpen={handleMenuOpen}
          />,
          document.getElementById('sticky-header-portal') as HTMLElement,
        )
      : null;

  return (
    <div className="mt-8 sm:mt-8 relative flex flex-col gap-4 sm:gap-6">
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

      <div className="flex flex-col w-full rounded-3xl border border-white/5 bg-white/2 shadow-highlight-neutral">

        <div ref={scrollContainerRef} className="overflow-x-auto">
          <table
            ref={tableRef}
            className="w-full border-collapse border-spacing-0 table-fixed"
          >
            <TableHeader
              table={table}
              handleFilterOpenFromMenu={handleFilterOpenFromMenu}
              handleMenuOpen={handleMenuOpen}
              className={isHeaderVisible ? 'opacity-0 pointer-events-none' : ''}
              context="main"
              sorting={sorting}
            />
            <TableBody
              table={table}
              onRowClick={(id) => navigate(`/coins/${id}`)}
              onClearFilters={() => {
                setGlobalFilter('');
                setColumnFilters([]);
              }}
            />
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
