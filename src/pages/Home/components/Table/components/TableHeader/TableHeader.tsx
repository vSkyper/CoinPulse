import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { flexRender, Table } from '@tanstack/react-table';
import { ColumnMenu } from './components';

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
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              tabIndex={context === 'sticky' ? -1 : 0}
              onClick={(e) => {
                e.preventDefault();
                header.column.getToggleSortingHandler()?.(e);
              }}
              className={`relative group px-4 sm:px-3 py-3 sm:py-2.5 text-white/40 font-extrabold text-[10px] sm:text-[0.65rem] tracking-widest uppercase transition-colors duration-200 select-none hover:text-white/90 focus:text-white/90 focus:outline-none cursor-pointer ${
                header.column.id === 'name'
                  ? 'text-left'
                  : ['current_price', 'total_volume', 'market_cap'].includes(
                      header.column.id
                    )
                  ? 'text-right'
                  : 'text-center'
              }`}
              style={{
                width: header.column.getSize(),
              }}
            >
              <div
                className={`flex items-center gap-1 ${
                  header.column.id === 'name'
                    ? 'justify-start'
                    : ['current_price', 'total_volume', 'market_cap'].includes(
                        header.column.id
                      )
                    ? 'justify-end'
                    : 'justify-center'
                }`}
              >
                <div
                  className={`flex items-center ${
                    header.column.id === 'name'
                      ? 'gap-1 flex-row-reverse'
                      : 'relative'
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      header.column.id === 'name'
                        ? ''
                        : 'absolute right-full mr-1 top-1/2 -translate-y-1/2'
                    }`}
                  >
                    {{
                      asc: [
                        'current_price',
                        'total_volume',
                        'market_cap',
                        'price_change_percentage_1h_in_currency',
                        'price_change_percentage_24h_in_currency',
                        'price_change_percentage_7d_in_currency',
                      ].includes(header.column.id) ? (
                        <MdArrowDownward
                          size='1.2rem'
                          className='text-white/60'
                        />
                      ) : (
                        <MdArrowUpward
                          size='1.2rem'
                          className='text-white/60'
                        />
                      ),
                      desc: [
                        'current_price',
                        'total_volume',
                        'market_cap',
                        'price_change_percentage_1h_in_currency',
                        'price_change_percentage_24h_in_currency',
                        'price_change_percentage_7d_in_currency',
                      ].includes(header.column.id) ? (
                        <MdArrowUpward
                          size='1.2rem'
                          className='text-white/60'
                        />
                      ) : (
                        <MdArrowDownward
                          size='1.2rem'
                          className='text-white/60'
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? (
                      <MdArrowUpward
                        size='1.2rem'
                        className='text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                      />
                    )}
                  </span>
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
          ))}
        </tr>
      ))}
    </thead>
  );
}
