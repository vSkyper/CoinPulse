import { Fragment } from 'react';
import { createPortal } from 'react-dom';
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
import { useFilterPosition } from '../../hooks/useFilterPosition';

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
  anchorEl: HTMLElement | null;
  isAnchoring?: boolean;
  isHeaderVisible: boolean;
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
  anchorEl,
  isAnchoring = false,
  isHeaderVisible,
}: FilterPanelProps) {
  const { position, setRefs } = useFilterPosition(
    isFilterOpen,
    anchorEl,
    filterRef,
    isHeaderVisible
  );

  return createPortal(
    <Transition
      show={isFilterOpen}
      as='div'
      ref={setRefs}
      style={{
        ...(position
          ? {
              position: position.strategy,
              top: position.top,
              left: position.left,
              zIndex: 100,
            }
          : undefined),
        opacity: isAnchoring ? 0 : undefined,
      }}
      className={
        position
          ? `w-[90vw] sm:w-80 h-fit bg-glass/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-xl shadow-glass-lg p-3 sm:p-4 ring-1 ring-white/5`
          : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-[90vw] sm:w-80 h-fit bg-glass/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-xl shadow-glass-lg p-3 sm:p-4 ring-1 ring-white/5'
      }
      onMouseDown={(e) => e.stopPropagation()}
      enter='transition ease-out duration-300'
      enterFrom='opacity-0 translate-y-2 scale-95'
      enterTo='opacity-100 translate-y-0 scale-100'
      leave='transition ease-in duration-200'
      leaveFrom='opacity-100 translate-y-0 scale-100'
      leaveTo='opacity-0 translate-y-2 scale-95'
    >
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <div className='flex items-center gap-2 sm:gap-2'>
          <div className='p-1.5 sm:p-1.5 rounded-xl sm:rounded-lg bg-brand-violet/10 text-brand-violet ring-1 ring-brand-violet/20'>
            <MdFilterList className='w-4 h-4 sm:w-4 sm:h-4' />
          </div>
          <div>
            <span className='font-bold text-xs sm:text-sm text-white block'>
              Filter Columns
            </span>
            <span className='text-[10px] sm:text-[10px] text-white/40 font-medium'>
              Customize your view
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsFilterOpen(false)}
          className='p-1.5 sm:p-1.5 rounded-xl sm:rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all'
        >
          <MdClose className='w-4 h-4 sm:w-4 sm:h-4' />
        </button>
      </div>

      <div className='space-y-3 sm:space-y-3'>
        <div className='grid grid-cols-2 gap-2 sm:gap-2'>
          {/* Column Select */}
          <div className='flex flex-col gap-1 sm:gap-1'>
            <span className='text-[10px] sm:text-[10px] font-semibold text-white/40 uppercase tracking-wider ml-1'>
              Column
            </span>
            <Listbox value={activeFilterColumn} onChange={handleColumnChange}>
              <div className='relative'>
                <ListboxButton className='relative w-full cursor-default rounded-xl sm:rounded-lg bg-white/5 py-1.5 sm:py-1.5 pl-2.5 sm:pl-2.5 pr-6 sm:pr-7 text-left text-[10px] sm:text-xs text-white border border-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'>
                  <span className='block truncate font-medium'>
                    {
                      table
                        .getAllColumns()
                        .find((col) => col.id === activeFilterColumn)?.columnDef
                        .header as string
                    }
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2'>
                    <MdKeyboardArrowDown
                      className='h-3 w-3 sm:h-4 sm:w-4 text-white/40'
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
                  <ListboxOptions
                    modal={false}
                    className='absolute mt-2 sm:mt-1 max-h-60 w-full overflow-auto rounded-xl sm:rounded-lg bg-surface-dropdown border border-white/10 py-1 text-[10px] sm:text-xs shadow-xl ring-1 ring-white/5 focus:outline-none z-50'
                  >
                    {table.getAllColumns().map((column) => (
                      <ListboxOption
                        key={column.id}
                        className={({ focus }) =>
                          `relative cursor-default select-none py-1.5 sm:py-1.5 pl-6 sm:pl-7 pr-3 sm:pr-3 transition-colors ${
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
                              <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2 text-white'>
                                <MdCheck
                                  className='h-3 w-3 sm:h-3 sm:w-3'
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
          <div className='flex flex-col gap-1 sm:gap-1'>
            <span className='text-[10px] sm:text-[10px] font-semibold text-white/40 uppercase tracking-wider ml-1'>
              Condition
            </span>
            <Listbox value={activeOperator} onChange={setActiveOperator}>
              <div className='relative'>
                <ListboxButton className='relative w-full cursor-default rounded-xl sm:rounded-lg bg-white/5 py-1.5 sm:py-1.5 pl-2.5 sm:pl-2.5 pr-6 sm:pr-7 text-left text-[10px] sm:text-xs text-white border border-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'>
                  <span className='block truncate font-medium'>
                    {activeOperator}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2'>
                    <MdKeyboardArrowDown
                      className='h-3 w-3 sm:h-4 sm:w-4 text-white/40'
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
                  <ListboxOptions
                    modal={false}
                    className='absolute mt-2 sm:mt-1 max-h-60 w-full overflow-auto rounded-xl sm:rounded-lg bg-surface-dropdown border border-white/10 py-1 text-[10px] sm:text-xs shadow-xl ring-1 ring-white/5 focus:outline-none z-50'
                  >
                    {getOperatorsForColumn(activeFilterColumn).map((op) => (
                      <ListboxOption
                        key={op}
                        className={({ focus }) =>
                          `relative cursor-default select-none py-1.5 sm:py-1.5 pl-6 sm:pl-7 pr-3 sm:pr-3 transition-colors ${
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
                              <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2 text-white'>
                                <MdCheck
                                  className='h-3 w-3 sm:h-3 sm:w-3'
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
          <div className='flex flex-col gap-1 sm:gap-1'>
            <span className='text-[10px] sm:text-[10px] font-semibold text-white/40 uppercase tracking-wider ml-1'>
              Value
            </span>
            <input
              value={activeValue}
              onChange={(e) => setActiveValue(e.target.value)}
              placeholder='Enter value...'
              className='w-full bg-white/5 border border-white/5 rounded-xl sm:rounded-lg py-1.5 sm:py-1.5 px-2.5 sm:px-2.5 text-[10px] sm:text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 hover:bg-white/10 hover:border-white/10 transition-all'
            />
          </div>
        )}
      </div>

      <div className='flex justify-end gap-2 sm:gap-2 mt-4 sm:mt-4 pt-3 sm:pt-3 border-t border-white/5'>
        <button
          onClick={handleFilterClear}
          className='px-2.5 sm:px-3 py-1.5 sm:py-1.5 text-[10px] sm:text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-xl sm:rounded-lg transition-all font-medium'
        >
          Reset
        </button>
        <button
          onClick={handleFilterSave}
          className='px-3 sm:px-4 py-1.5 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white bg-brand-violet hover:bg-brand-violet/90 rounded-xl sm:rounded-lg shadow-lg shadow-brand-violet/20 ring-1 ring-white/10 transition-all duration-200'
        >
          Apply Filter
        </button>
      </div>
    </Transition>,
    document.body
  );
}
