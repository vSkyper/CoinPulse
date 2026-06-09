import { flexRender } from '@tanstack/react-table';
import { MdSearchOff } from 'react-icons/md';
import { useEffect, useState } from 'react';
import type { TableBodyProps } from './interface';

let hasAnimated = false;

export default function TableBody({
  table,
  onRowClick,
  onClearFilters,
}: TableBodyProps) {
  const [shouldAnimate] = useState(!hasAnimated);

  useEffect(() => {
    hasAnimated = true;
  }, []);

  return (
    <tbody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick(row.original.id)}
            className={`group cursor-pointer transition-all duration-300 ease-out hover:bg-linear-to-r hover:from-white/5 hover:to-transparent focus-within:bg-white/5 active:bg-white/10 border-b border-white/5 relative shadow-[inset_0_0_0_0_var(--color-brand-violet)] hover:shadow-[inset_3px_0_0_0_var(--color-brand-violet)] ${shouldAnimate ? 'animate-[fadeInUp_0.4s_ease-out_both]' : ''}`}
            style={shouldAnimate ? { animationDelay: `${row.index * 30}ms` } : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`py-0.5 sm:py-2 text-white/90 text-xs sm:text-[13px] font-medium transition-colors ${(() => {
                  const align = cell.column.columnDef.meta?.align ?? 'center';
                  if (align === 'left') return 'pl-4 pr-2 sm:px-4 text-left';
                  if (align === 'right') return 'px-2 sm:px-4 text-right';
                  return 'px-2 sm:px-4 text-center';
                })()}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr className="border-b border-white/3">
          <td
            colSpan={table.getVisibleFlatColumns().length}
            className="py-12 sm:py-20 text-center"
          >
            <div className="flex flex-col items-center justify-center gap-2 text-white/40">
              <div className="p-4 rounded-full bg-white/5">
                <MdSearchOff size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg text-white/60">
                  No coins found
                </span>
                <span className="text-xs sm:text-sm">
                  Try adjusting your search query or filters to find what you're
                  looking for.
                </span>
              </div>
              <button
                onClick={onClearFilters}
                className="mt-3 text-xs text-brand-violet hover:text-brand-violet/80 hover:underline transition-all"
              >
                Clear all filters
              </button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
