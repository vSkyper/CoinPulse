import { flexRender, Table } from '@tanstack/react-table';
import { ColumnMenu, SortIcon } from './components';

import { SortingState } from '@tanstack/react-table';

interface TableHeaderProps {
  table: Table<any>;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  handleMenuOpen: () => void;
  className?: string;
  context?: string;
  sorting?: SortingState;
}

export default function TableHeader({
  table,
  handleFilterOpenFromMenu,
  handleMenuOpen,
  className = '',
  context = 'main',
  sorting,
}: TableHeaderProps) {
  return (
    <thead
      className={`h-auto border-b border-white/5 ${className}`}
      data-sorting={JSON.stringify(sorting)}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className='border-b border-white/3 last:border-b-0'
        >
          {headerGroup.headers.map((header) => {
            const align = header.column.columnDef.meta?.align ?? 'center';
            const isLeft = align === 'left';
            const isRight = align === 'right';

            const sortItem = sorting?.find((s) => s.id === header.column.id);
            const isSorted = sortItem
              ? sortItem.desc
                ? 'desc'
                : 'asc'
              : false;

            return (
              <th
                key={header.id}
                tabIndex={context === 'sticky' ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  header.column.getToggleSortingHandler()?.(e);
                }}
                className={`relative group px-4 sm:px-3 py-3 sm:py-2.5 text-white/40 font-extrabold text-[10px] sm:text-[0.65rem] tracking-widest uppercase transition-colors duration-200 select-none hover:text-white/90 focus:text-white/90 focus:outline-none cursor-pointer ${
                  isLeft ? 'text-left' : isRight ? 'text-right' : 'text-center'
                }`}
                style={{
                  width: header.column.getSize(),
                }}
              >
                <div
                  className={`flex items-center gap-1 ${
                    isLeft
                      ? 'justify-start'
                      : isRight
                      ? 'justify-end'
                      : 'justify-center'
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isLeft ? 'gap-1 flex-row-reverse' : 'relative'
                    }`}
                  >
                    <SortIcon
                      key={String(isSorted)}
                      align={align}
                      isSorted={isSorted}
                    />
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </div>

                {/* Column Menu */}
                <ColumnMenu
                  header={header}
                  handleFilterOpenFromMenu={handleFilterOpenFromMenu}
                  handleMenuOpen={handleMenuOpen}
                  context={context}
                />
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
