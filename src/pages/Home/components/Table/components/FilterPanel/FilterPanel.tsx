import { createPortal } from 'react-dom';
import { Transition } from '@headlessui/react';
import {
  FilterHeader,
  ColumnSelect,
  OperatorSelect,
  ValueInput,
  FilterActions,
} from './components';
import { useFilterPosition } from './hooks';
import type { FilterPanelProps } from './interface';

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
    align,
  );

  return createPortal(
    <Transition
      show={isFilterOpen}
      as="div"
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
      }}
      className={
        position
          ? `w-[90vw] sm:w-80 h-fit bg-white/2 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-2xl shadow-popover p-3 sm:p-5`
          : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-[90vw] sm:w-80 h-fit bg-white/2 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-2xl shadow-popover p-3 sm:p-5'
      }
      onMouseDown={(e) => e.stopPropagation()}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-2 scale-95"
    >
      <FilterHeader onClose={() => setIsFilterOpen(false)} />

      <div className="space-y-3 sm:space-y-3">
        <div className="grid grid-cols-2 gap-2 sm:gap-2">
          {/* Column Select */}
          <ColumnSelect
            activeFilterColumn={activeFilterColumn}
            handleColumnChange={handleColumnChange}
            table={table}
          />

          {/* Operator Select */}
          <OperatorSelect
            activeOperator={activeOperator}
            setActiveOperator={setActiveOperator}
            activeFilterColumn={activeFilterColumn}
          />
        </div>

        {/* Value Input */}
        <ValueInput
          activeOperator={activeOperator}
          activeValue={activeValue}
          setActiveValue={setActiveValue}
          handleFilterSave={handleFilterSave}
        />
      </div>

      <FilterActions onClear={handleFilterClear} onSave={handleFilterSave} />
    </Transition>,
    document.body,
  );
}
