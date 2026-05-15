import type { PaginationProps } from './interface';
import { PageSizeSelect, PageNavigation } from './components';

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-3 p-3 sm:p-3 border-t border-white/5 text-[10px] sm:text-xs text-white/60 rounded-b-3xl bg-black/20">
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <PageSizeSelect
          pageSize={pageSize}
          setPageSize={(size) => table.setPageSize(size)}
        />

        <div className="hidden sm:block w-px h-4 bg-white/10" />

        <div className="text-white/40 font-medium">
          Total: <span className="text-white font-bold">{totalRows}</span> coins
        </div>
      </div>

      <PageNavigation
        pageIndex={pageIndex}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        setPageIndex={(index) => table.setPageIndex(index)}
      />
    </div>
  );
}

