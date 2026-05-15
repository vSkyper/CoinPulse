import { MenuItem } from '@headlessui/react';
import { MdArrowUpward, MdArrowDownward, MdClose } from 'react-icons/md';
import type { SortOptionsProps } from './interface';

export default function SortOptions({ header }: SortOptionsProps) {
  if (!header.column.getCanSort()) return null;

  return (
    <div className="px-1 py-1">
      <MenuItem>
        {({ focus, close }) => {
          const isSorted = header.column.getIsSorted();
          const showDesc = !isSorted || isSorted === 'asc';
          return (
            <button
              type="button"
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
                <MdArrowDownward className="mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors" />
              ) : (
                <MdArrowUpward className="mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors" />
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
                type="button"
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
                <MdClose className="mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors" />
                Unsort
              </button>
            );
          }
          return (
            <button
              type="button"
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
              <MdArrowUpward className="mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors" />
              Sort by ASC
            </button>
          );
        }}
      </MenuItem>
    </div>
  );
}
