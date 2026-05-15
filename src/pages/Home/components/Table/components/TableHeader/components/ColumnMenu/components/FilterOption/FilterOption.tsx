import { MenuItem } from '@headlessui/react';
import { MdFilterList } from 'react-icons/md';
import type { FilterOptionProps } from './interface';

export default function FilterOption({
  header,
  menuButtonRef,
  handleFilterOpenFromMenu,
}: FilterOptionProps) {
  return (
    <div className="px-1 py-1">
      <MenuItem>
        {({ focus, close }) => (
          <button
            type="button"
            className={`${
              focus ? 'bg-white/10 text-white' : 'text-zinc-400'
            } group flex w-full items-center rounded-lg px-2 py-1.5 text-xs transition-colors`}
            onClick={() => {
              if (menuButtonRef.current) {
                handleFilterOpenFromMenu(header.column.id, menuButtonRef.current);
                close();
              }
            }}
          >
            <MdFilterList className="mr-2 h-4 w-4 text-white/40 group-hover:text-white/90 transition-colors" />
            Filter
          </button>
        )}
      </MenuItem>
    </div>
  );
}
