import { Fragment } from 'react';
import {
  Transition,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import {
  MdFilterList,
  MdClose,
  MdKeyboardArrowDown,
  MdCheck,
} from 'react-icons/md';
import { Table } from '@tanstack/react-table';
import { getOperatorsForColumn } from 'utils/table';

interface FilterPanelProps {
  isFilterOpen: boolean;
  filterRef: React.RefObject<HTMLDivElement | null>;
  setIsFilterOpen: (value: boolean) => void;
  activeFilterColumn: string;
  handleColumnChange: (newCol: string) => void;
  table: Table<any>;
  activeOperator: string;
  setActiveOperator: (value: string) => void;
  activeValue: string;
  setActiveValue: (value: string) => void;
  handleFilterClear: () => void;
  handleFilterSave: () => void;
}

export default function FilterPanel({
  isFilterOpen,
  filterRef,
  setIsFilterOpen,
  activeFilterColumn,
  handleColumnChange,
  table,
  activeOperator,
  setActiveOperator,
  activeValue,
  setActiveValue,
  handleFilterClear,
  handleFilterSave,
}: FilterPanelProps) {
  return (
    <Transition
      show={isFilterOpen}
      as={Fragment}
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-2 scale-95'
      enterTo='opacity-100 translate-y-0 scale-100'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0 scale-100'
      leaveTo='opacity-0 translate-y-2 scale-95'
    >
      <div
        ref={filterRef}
        className='absolute top-full left-1/2 -translate-x-1/2 sm:translate-x-0 sm:inset-auto sm:right-0 sm:top-full z-50 w-[90vw] sm:w-[480px] h-fit bg-glass/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass-lg p-3 sm:p-6 ring-1 ring-white/5'
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between mb-3 sm:mb-6'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='p-1.5 sm:p-2 rounded-xl bg-brand-violet/10 text-brand-violet ring-1 ring-brand-violet/20'>
              <MdFilterList className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div>
              <span className='font-bold text-xs sm:text-base text-white block'>
                Filter Columns
              </span>
              <span className='text-[10px] sm:text-xs text-white/40 font-medium'>
                Customize your view
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsFilterOpen(false)}
            className='p-1.5 sm:p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all'
          >
            <MdClose className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>

        <div className='space-y-3 sm:space-y-5'>
          <div className='grid grid-cols-2 gap-2 sm:gap-4'>
            {/* Column Select */}
            <div className='flex flex-col gap-1 sm:gap-2'>
              <span className='text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider ml-1'>
                Column
              </span>
              <Listbox value={activeFilterColumn} onChange={handleColumnChange}>
                <div className='relative'>
                  <ListboxButton className='relative w-full cursor-default rounded-xl bg-white/5 py-1.5 sm:py-3 pl-2.5 sm:pl-4 pr-6 sm:pr-10 text-left text-[10px] sm:text-sm text-white border border-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'>
                    <span className='block truncate font-medium'>
                      {
                        table
                          .getAllColumns()
                          .find((col) => col.id === activeFilterColumn)
                          ?.columnDef.header as string
                      }
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3'>
                      <MdKeyboardArrowDown
                        className='h-3 w-3 sm:h-5 sm:w-5 text-white/40'
                        aria-hidden='true'
                      />
                    </span>
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <ListboxOptions className='absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surface-dropdown border border-white/10 py-1 text-[10px] sm:text-sm shadow-xl ring-1 ring-white/5 focus:outline-none z-50'>
                      {table.getAllColumns().map((column) => (
                        <ListboxOption
                          key={column.id}
                          className={({ focus }) =>
                            `relative cursor-default select-none py-1.5 sm:py-2.5 pl-6 sm:pl-10 pr-3 sm:pr-4 transition-colors ${
                              focus ? 'bg-white/5 text-white' : 'text-white/70'
                            }`
                          }
                          value={column.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? 'font-bold text-white'
                                    : 'font-normal'
                                }`}
                              >
                                {column.columnDef.header as string}
                              </span>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 text-white'>
                                  <MdCheck
                                    className='h-3 w-3 sm:h-5 sm:w-5'
                                    aria-hidden='true'
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

            {/* Operator Select */}
            <div className='flex flex-col gap-1 sm:gap-2'>
              <span className='text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider ml-1'>
                Condition
              </span>
              <Listbox value={activeOperator} onChange={setActiveOperator}>
                <div className='relative'>
                  <ListboxButton className='relative w-full cursor-default rounded-xl bg-white/5 py-1.5 sm:py-3 pl-2.5 sm:pl-4 pr-6 sm:pr-10 text-left text-[10px] sm:text-sm text-white border border-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'>
                    <span className='block truncate font-medium'>
                      {activeOperator}
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3'>
                      <MdKeyboardArrowDown
                        className='h-3 w-3 sm:h-5 sm:w-5 text-white/40'
                        aria-hidden='true'
                      />
                    </span>
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <ListboxOptions className='absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surface-dropdown border border-white/10 py-1 text-[10px] sm:text-sm shadow-xl ring-1 ring-white/5 focus:outline-none z-50'>
                      {getOperatorsForColumn(activeFilterColumn).map((op) => (
                        <ListboxOption
                          key={op}
                          className={({ focus }) =>
                            `relative cursor-default select-none py-1.5 sm:py-2.5 pl-6 sm:pl-10 pr-3 sm:pr-4 transition-colors ${
                              focus ? 'bg-white/5 text-white' : 'text-white/70'
                            }`
                          }
                          value={op}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? 'font-bold text-white'
                                    : 'font-normal'
                                }`}
                              >
                                {op}
                              </span>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 text-white'>
                                  <MdCheck
                                    className='h-3 w-3 sm:h-5 sm:w-5'
                                    aria-hidden='true'
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
          </div>

          {/* Value Input */}
          {!['up', 'down'].includes(activeOperator) && (
            <div className='flex flex-col gap-1 sm:gap-2'>
              <span className='text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider ml-1'>
                Value
              </span>
              <input
                value={activeValue}
                onChange={(e) => setActiveValue(e.target.value)}
                placeholder='Enter value...'
                className='w-full bg-white/5 border border-white/5 rounded-xl py-1.5 sm:py-3 px-2.5 sm:px-4 text-[10px] sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'
              />
            </div>
          )}
        </div>

        <div className='flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5'>
          <button
            onClick={handleFilterClear}
            className='px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium'
          >
            Reset
          </button>
          <button
            onClick={handleFilterSave}
            className='px-3 sm:px-6 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-bold text-white bg-brand-violet hover:bg-brand-violet/90 rounded-xl shadow-lg shadow-brand-violet/20 ring-1 ring-white/10 transition-all duration-200'
          >
            Apply Filter
          </button>
        </div>
      </div>
    </Transition>
  );
}
