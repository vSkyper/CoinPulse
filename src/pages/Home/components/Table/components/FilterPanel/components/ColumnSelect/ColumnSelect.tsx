import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import { MdKeyboardArrowDown, MdCheck } from 'react-icons/md';
import type { ColumnSelectProps } from './interface';

export default function ColumnSelect({
  activeFilterColumn,
  handleColumnChange,
  table,
}: ColumnSelectProps) {
  return (
    <div className="flex flex-col gap-1 sm:gap-1">
      <span className="text-[10px] sm:text-[10px] font-semibold text-white/40 uppercase tracking-wider ml-1">
        Column
      </span>
      <Listbox value={activeFilterColumn} onChange={handleColumnChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white/5 hover:bg-white/10 py-2 pl-3 pr-8 text-left text-xs text-white border border-white/5 hover:border-white/10 ring-1 ring-white/5 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 transition-all duration-200">
            <span className="block truncate font-bold tracking-wide">
              {activeFilterColumn === 'favorite'
                ? 'Favorite'
                : (table
                    .getAllColumns()
                    .find((col) => col.id === activeFilterColumn)
                    ?.columnDef.header as string)}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2">
              <MdKeyboardArrowDown
                className="h-3 w-3 sm:h-4 sm:w-4 text-white/50"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              modal={false}
              className="absolute mt-2 sm:mt-1 max-h-60 w-full overflow-auto custom-scrollbar rounded-xl bg-black/90 border border-white/10 ring-1 ring-white/5 py-1 text-xs shadow-popover focus:outline-none z-50"
            >
              {table.getAllColumns().map((column) => (
                <ListboxOption
                  key={column.id}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none py-2 sm:py-1.5 pl-6 sm:pl-7 pr-3 sm:pr-3 transition-all duration-200 ${
                      focus ? 'bg-white/10 text-white' : 'text-zinc-400'
                    }`
                  }
                  value={column.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate font-bold tracking-wide ${
                          selected ? 'text-white' : ''
                        }`}
                      >
                        {column.id === 'favorite'
                          ? 'Favorite'
                          : (column.columnDef.header as string)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2 text-brand-violet">
                          <MdCheck
                            className="h-3 w-3 sm:h-3 sm:w-3"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
