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
    <Menu
      as='div'
      className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        header.column.columnDef.meta?.align === 'right'
          ? 'left-1 sm:left-2'
          : 'right-1 sm:right-2'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {({ open }) => (
        <>
          <MenuButton
            ref={menuButtonRef}
            id={`${context}-menu-${header.column.id}`}
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              handleMenuOpen();
            }}
            className={`p-2 sm:p-1 rounded sm:hover:bg-white/10 text-white/40 hover:text-white focus:outline-none transition-opacity duration-200 ${
              open
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100 group-active:opacity-100 focus-visible:opacity-100'
            }`}
          >
            <MdMoreVert className='w-4 h-4 sm:w-4 sm:h-4' />
          </MenuButton>
          <MenuItems
            transition
            modal={false}
            portal
            anchor={{ to: 'bottom end', gap: context === 'sticky' ? 16 : 8 }}
            className='w-36 sm:w-36 origin-top-right divide-y divide-white/5 rounded-xl bg-black/90 backdrop-blur-xl shadow-glass-lg border border-white/10 focus:outline-none z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0'
          >
            <div className='px-1 py-1'>
              <MenuItem>
                {({ focus, close }) => {
                  const isSorted = header.column.getIsSorted();
                  const showDesc = !isSorted || isSorted === 'asc';
                  return (
                    <button
                      type='button'
                      className={`${
                        focus
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white'
                      } group flex w-full items-center rounded-lg px-2 py-1.5 text-xs transition-colors`}
                      onClick={(e) => {
                        e.preventDefault();
                        header.column.toggleSorting(showDesc);
                        close();
                      }}
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
                {({ focus, close }) => {
                  const isSorted = header.column.getIsSorted();
                  if (isSorted) {
                    return (
                      <button
                        type='button'
                        className={`${
                          focus
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:text-white'
                        } group flex w-full items-center rounded-lg px-2 py-1.5 text-xs transition-colors`}
                        onClick={(e) => {
                          e.preventDefault();
                          header.column.clearSorting();
                          close();
                        }}
                      >
                        <MdClose className='mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors' />
                        Unsort
                      </button>
                    );
                  }
                  return (
                    <button
                      type='button'
                      className={`${
                        focus
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white'
                      } group flex w-full items-center rounded-lg px-2 py-1.5 text-xs transition-colors`}
                      onClick={(e) => {
                        e.preventDefault();
                        header.column.toggleSorting(false);
                        close();
                      }}
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
                {({ focus, close }) => (
                  <button
                    type='button'
                    className={`${
                      focus
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white'
                    } group flex w-full items-center rounded-lg px-2 py-1.5 text-xs transition-colors`}
                    onClick={() => {
                      if (menuButtonRef.current) {
                        handleFilterOpenFromMenu(
                          header.column.id,
                          menuButtonRef.current
                        );
                        close();
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
        </>
      )}
    </Menu>
  );
}
