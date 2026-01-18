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
import { getOperatorsForColumn } from 'utils/table';
import { useFilterPosition } from './hooks';
import { FilterPanelProps } from './interface';

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
  // Determine alignment based on active filter column
  const column = table
    .getAllColumns()
    .find((col) => col.id === activeFilterColumn);

  // Sticky Header: Use ColumnMenu logic (Extend Right for Right-aligned columns).
  // Main Header ( & Global Filter): Always Anchor Right (Extend Left) to prevent overflow.
  const isRight = column?.columnDef.meta?.align === 'right';

  // If sticky header is visible (navbar hidden), use ColumnMenu logic (Extend Right for Right col).
  // If main header is visible, we always anchor to the Global Filter Button (far right),
  // so we always want to Anchor Right (Extend Left).
  const align = isHeaderVisible ? (isRight ? 'left' : 'right') : 'right';

  const { position, setRefs } = useFilterPosition(
    isFilterOpen,
    anchorEl,
    filterRef,
    isHeaderVisible,
    align
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
          ? `w-[90vw] sm:w-80 h-fit bg-white/2 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-2xl shadow-popover p-3 sm:p-5`
          : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-[90vw] sm:w-80 h-fit bg-white/2 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-2xl shadow-popover p-3 sm:p-5'
      }
      onMouseDown={(e) => e.stopPropagation()}
      enter='transition ease-out duration-300'
      enterFrom='opacity-0 translate-y-2 scale-95'
      enterTo='opacity-100 translate-y-0 scale-100'
      leave='transition ease-in duration-200'
      leaveFrom='opacity-100 translate-y-0 scale-100'
      leaveTo='opacity-0 translate-y-2 scale-95'
    >
      <div className='flex items-center justify-between mb-4 sm:mb-5'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-white/5 text-white ring-1 ring-white/10'>
            <MdFilterList className='w-4 h-4' />
          </div>
          <div>
            <span className='font-bold text-sm text-white block'>
              Filter Columns
            </span>
            <span className='text-[10px] text-zinc-500 font-medium'>
              Customize your view
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsFilterOpen(false)}
          className='p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all'
        >
          <MdClose className='w-4 h-4' />
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
                <ListboxButton className='relative w-full cursor-pointer rounded-lg bg-white/5 hover:bg-white/10 py-2 pl-3 pr-8 text-left text-xs text-white border border-white/5 hover:border-white/10 ring-1 ring-white/5 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 transition-all duration-200'>
                  <span className='block truncate font-bold tracking-wide'>
                    {
                      table
                        .getAllColumns()
                        .find((col) => col.id === activeFilterColumn)?.columnDef
                        .header as string
                    }
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2'>
                    <MdKeyboardArrowDown
                      className='h-3 w-3 sm:h-4 sm:w-4 text-white/50'
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
                    className='absolute mt-2 sm:mt-1 max-h-60 w-full overflow-auto custom-scrollbar rounded-xl bg-black/90 border border-white/10 ring-1 ring-white/5 py-1 text-xs shadow-popover focus:outline-none z-50'
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
                              {column.columnDef.header as string}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2 text-brand-violet'>
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
                <ListboxButton className='relative w-full cursor-pointer rounded-lg bg-white/5 hover:bg-white/10 py-2 pl-3 pr-8 text-left text-xs text-white border border-white/5 hover:border-white/10 ring-1 ring-white/5 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 transition-all duration-200'>
                  <span className='block truncate font-bold tracking-wide'>
                    {activeOperator}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2'>
                    <MdKeyboardArrowDown
                      className='h-3 w-3 sm:h-4 sm:w-4 text-white/50'
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
                    className='absolute mt-2 sm:mt-1 max-h-60 w-full overflow-auto custom-scrollbar rounded-xl bg-black/90 border border-white/10 ring-1 ring-white/5 py-1 text-xs shadow-popover focus:outline-none z-50'
                  >
                    {getOperatorsForColumn(activeFilterColumn).map((op) => (
                      <ListboxOption
                        key={op}
                        className={({ focus }) =>
                          `relative cursor-pointer select-none py-2 sm:py-1.5 pl-6 sm:pl-7 pr-3 sm:pr-3 transition-all duration-200 ${
                            focus ? 'bg-white/10 text-white' : 'text-zinc-400'
                          }`
                        }
                        value={op}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate font-bold tracking-wide ${
                                selected ? 'text-white' : ''
                              }`}
                            >
                              {op}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2 text-brand-violet'>
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
              autoComplete='off'
              value={activeValue}
              onChange={(e) => setActiveValue(e.target.value)}
              placeholder='Enter value...'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFilterSave();
                }
              }}
              className='w-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 ring-1 ring-white/5 rounded-xl py-2 px-3 text-xs text-white font-medium placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 transition-all duration-200'
            />
          </div>
        )}
      </div>

      <div className='flex justify-end gap-2 sm:gap-2 mt-4 sm:mt-4 pt-3 sm:pt-3 border-t border-white/5'>
        <button
          onClick={handleFilterClear}
          className='px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium'
        >
          Reset
        </button>
        <button
          onClick={handleFilterSave}
          className='px-4 py-2 text-xs font-bold text-white bg-brand-violet hover:bg-brand-violet/90 rounded-xl shadow-glow-primary ring-1 ring-white/10 transition-all duration-200'
        >
          Apply Filter
        </button>
      </div>
    </Transition>,
    document.body
  );
}
