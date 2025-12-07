import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRef } from 'react';
import {
  MdArrowUpward,
  MdArrowDownward,
  MdMoreVert,
  MdClose,
  MdFilterList,
} from 'react-icons/md';
import { ColumnMenuProps } from './interface';

export default function ColumnMenu({
  header,
  handleFilterOpenFromMenu,
  handleMenuOpen,
  context,
}: ColumnMenuProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu>
      <MenuButton
        ref={menuButtonRef}
        id={`${context}-menu-${header.column.id}`}
        onClick={handleMenuOpen}
        className='p-1 rounded hover:bg-white/10 text-white/40 hover:text-white focus:outline-none'
      >
        <MdMoreVert size={20} />
      </MenuButton>
      <MenuItems
        transition
        modal={false}
        portal
        anchor={{ to: 'bottom end', gap: context === 'sticky' ? 24 : 8 }}
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
                  onClick={() => header.column.toggleSorting(showDesc)}
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
                onClick={() => {
                  if (menuButtonRef.current) {
                    handleFilterOpenFromMenu(
                      header.column.id,
                      menuButtonRef.current
                    );
                  }
                }}
              >
                <MdFilterList className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                Filter
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
