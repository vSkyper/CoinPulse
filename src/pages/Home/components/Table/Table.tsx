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
import { useState, useEffect, useRef } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { TableProps } from './interface';
import { columns } from 'constants/dataTable';
import {
  PAGINATION_CONFIG,
  getOperatorsForColumn,
  customFilterFn,
} from 'utils/table';
import TableControls from './components/TableControls';
import FilterPanel from './components/FilterPanel';
import TableHeader from './components/TableHeader';
import Pagination from './components/Pagination';

export default function Table({ coins }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION_CONFIG.pageSize,
  });

  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string>('');
  const [activeOperator, setActiveOperator] = useState<string>('contains');
  const [activeValue, setActiveValue] = useState<string>('');
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const table = useReactTable({
    data: coins,
    columns,
    defaultColumn: {
      filterFn: customFilterFn,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const updateFilterStateForColumn = (columnId: string) => {
    const existingFilter = columnFilters.find((f) => f.id === columnId)
      ?.value as any;
    const validOperators = getOperatorsForColumn(columnId);

    if (existingFilter) {
      setActiveOperator(existingFilter.operator);
      setActiveValue(existingFilter.value);
    } else {
      setActiveOperator(validOperators[0]);
      setActiveValue('');
    }
  };

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFilterOpen) {
      if (!activeFilterColumn) {
        const firstCol = table.getAllColumns()[0]?.id;
        if (firstCol) {
          setActiveFilterColumn(firstCol);
          updateFilterStateForColumn(firstCol);
        }
      } else {
        updateFilterStateForColumn(activeFilterColumn);
      }
    }
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterOpenFromMenu = (columnId: string) => {
    if (activeFilterColumn && activeFilterColumn !== columnId) {
      table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
    }
    setActiveFilterColumn(columnId);
    updateFilterStateForColumn(columnId);
    setIsFilterOpen(true);
  };

  const handleFilterSave = () => {
    if (activeFilterColumn) {
      table.getColumn(activeFilterColumn)?.setFilterValue({
        operator: activeOperator,
        value: activeValue,
      });
    }
  };

  const handleFilterClear = () => {
    if (activeFilterColumn) {
      table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
      setActiveValue('');
      const validOperators = getOperatorsForColumn(activeFilterColumn);
      setActiveOperator(validOperators[0]);
    }
  };

  const handleColumnChange = (newCol: string) => {
    if (activeFilterColumn && activeFilterColumn !== newCol) {
      table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
    }
    setActiveFilterColumn(newCol);
    updateFilterStateForColumn(newCol);
  };

  return (
    <div className='mt-6 sm:mt-8 relative transform-gpu will-change-transform'>
      <div className='flex flex-col w-full rounded-3xl border border-white/5 bg-glass/40 backdrop-blur-[20px] shadow-glass'>
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
          />
        </TableControls>

        <div className='h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent' />

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border-spacing-0 table-fixed'>
            <TableHeader
              table={table}
              handleFilterOpenFromMenu={handleFilterOpenFromMenu}
            />
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className='border-b border-white/3 last:border-b-0 transition-colors duration-150 ease-out hover:bg-white/3 focus-within:bg-brand-violet/5 active:bg-brand-violet/10'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`py-0.5 sm:py-2.5 text-white/90 text-xs sm:text-sm font-medium ${
                          cell.column.id === 'name'
                            ? 'pl-4 pr-2 sm:px-4 text-left'
                            : [
                                'current_price',
                                'total_volume',
                                'market_cap',
                              ].includes(cell.column.id)
                            ? 'px-2 sm:px-4 text-right'
                            : 'px-2 sm:px-4 text-center'
                        }`}
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
                          Try adjusting your search or filters to find what
                          you're looking for.
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
    </div>
  );
}
