import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  MdArrowUpward,
  MdArrowDownward,
  MdMoreVert,
  MdFilterList,
  MdClose,
} from 'react-icons/md';
import { flexRender, Table } from '@tanstack/react-table';

interface TableHeaderProps {
  table: Table<any>;
  handleFilterOpenFromMenu: (columnId: string) => void;
}

export default function TableHeader({
  table,
  handleFilterOpenFromMenu,
}: TableHeaderProps) {
  return (
    <thead className='h-auto border-b border-white/5'>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className='border-b border-white/3 last:border-b-0'
        >
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className={`relative group px-4 py-3 sm:py-4 text-white/40 font-extrabold text-[10px] sm:text-[0.7rem] tracking-widest uppercase transition-colors duration-200 select-none hover:text-white/90 cursor-pointer ${
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
                          size='1rem'
                          className='text-white/60'
                        />
                      ) : (
                        <MdArrowUpward size='1rem' className='text-white/60' />
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
              <div
                className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  ['current_price', 'total_volume', 'market_cap'].includes(
                    header.column.id
                  )
                    ? 'left-1 sm:left-2'
                    : 'right-1 sm:right-2'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Menu>
                  <MenuButton className='p-1 rounded hover:bg-white/10 text-white/40 hover:text-white focus:outline-none'>
                    <MdMoreVert size={20} />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor={{ to: 'bottom end', gap: 8 }}
                    className='w-40 sm:w-48 origin-top-right divide-y divide-white/5 rounded-xl bg-glass/95 backdrop-blur-xl shadow-xl ring-1 ring-white/10 focus:outline-none border border-white/10 z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0'
                  >
                    <div className='px-1 py-1'>
                      <MenuItem>
                        {({ focus }) => {
                          const isSorted = header.column.getIsSorted();
                          const showDesc = !isSorted || isSorted === 'asc';
                          return (
                            <button
                              className={`${
                                focus
                                  ? 'bg-white/10 text-white'
                                  : 'text-white/70 hover:text-white'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-xs sm:text-sm transition-colors`}
                              onClick={() =>
                                header.column.toggleSorting(showDesc)
                              }
                            >
                              {showDesc ? (
                                <MdArrowDownward className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                              ) : (
                                <MdArrowUpward className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                              )}
                              {showDesc ? 'Sort by DESC' : 'Sort by ASC'}
                            </button>
                          );
                        }}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => {
                          const isSorted = header.column.getIsSorted();
                          if (isSorted) {
                            return (
                              <button
                                className={`${
                                  focus
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                } group flex w-full items-center rounded-lg px-2 py-2 text-xs sm:text-sm transition-colors`}
                                onClick={() => header.column.clearSorting()}
                              >
                                <MdClose className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                                Unsort
                              </button>
                            );
                          }
                          return (
                            <button
                              className={`${
                                focus
                                  ? 'bg-white/10 text-white'
                                  : 'text-white/70 hover:text-white'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-xs sm:text-sm transition-colors`}
                              onClick={() => header.column.toggleSorting(false)}
                            >
                              <MdArrowUpward className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                              Sort by ASC
                            </button>
                          );
                        }}
                      </MenuItem>
                    </div>
                    <div className='px-1 py-1'>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            className={`${
                              focus
                                ? 'bg-white/10 text-white'
                                : 'text-white/70 hover:text-white'
                            } group flex w-full items-center rounded-lg px-2 py-2 text-xs sm:text-sm transition-colors`}
                            onClick={() =>
                              handleFilterOpenFromMenu(header.column.id)
                            }
                          >
                            <MdFilterList className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                            Filter
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
