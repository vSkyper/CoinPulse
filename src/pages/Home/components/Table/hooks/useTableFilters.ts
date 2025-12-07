import { useState, useCallback, useRef, useEffect } from 'react';
import { Table, ColumnFiltersState } from '@tanstack/react-table';
import { getOperatorsForColumn } from 'utils/table';

interface UseTableFiltersProps {
  table: Table<any>;
  columnFilters: ColumnFiltersState;
  isHeaderVisible: boolean;
}

export function useTableFilters({
  table,
  columnFilters,
  isHeaderVisible,
}: UseTableFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string>('');
  const [activeOperator, setActiveOperator] = useState<string>('contains');
  const [activeValue, setActiveValue] = useState<string>('');
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Update anchor when switching between sticky and main header
  useEffect(() => {
    if (isFilterOpen && activeFilterColumn) {
      if (!isHeaderVisible) {
        // When switching to main view, anchor to the main Filters button
        if (filterButtonRef.current) {
          setFilterAnchor(filterButtonRef.current);
        }
        return;
      }

      const timer = setTimeout(() => {
        const elementId = `sticky-menu-${activeFilterColumn}`;
        const newAnchor = document.getElementById(elementId);

        if (newAnchor) {
          setFilterAnchor(newAnchor);
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isHeaderVisible, isFilterOpen]);

  const updateFilterStateForColumn = useCallback(
    (columnId: string) => {
      const existingFilter = columnFilters.find((f) => f.id === columnId)
        ?.value as any;
      const validOperators = getOperatorsForColumn(columnId);

      if (existingFilter) {
        setActiveOperator(existingFilter.operator);
        setActiveValue(existingFilter.value);
      } else {
        setActiveOperator(validOperators[0]);
        setActiveValue('');
      }
    },
    [columnFilters]
  );

  const handleFilterClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isFilterOpen) {
        setFilterAnchor(e.currentTarget as HTMLElement);
        if (!activeFilterColumn) {
          const firstCol = table.getAllColumns()[0]?.id;
          if (firstCol) {
            setActiveFilterColumn(firstCol);
            updateFilterStateForColumn(firstCol);
          }
        } else {
          updateFilterStateForColumn(activeFilterColumn);
        }
      }
      setIsFilterOpen(!isFilterOpen);
    },
    [isFilterOpen, activeFilterColumn, table, updateFilterStateForColumn]
  );

  const handleFilterOpenFromMenu = useCallback(
    (columnId: string, target: HTMLElement) => {
      if (activeFilterColumn && activeFilterColumn !== columnId) {
        table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
      }

      if (!isHeaderVisible && filterButtonRef.current) {
        setFilterAnchor(filterButtonRef.current);
      } else {
        setFilterAnchor(target);
      }

      setActiveFilterColumn(columnId);
      updateFilterStateForColumn(columnId);
      setIsFilterOpen(true);
    },
    [activeFilterColumn, table, updateFilterStateForColumn, isHeaderVisible]
  );

  const handleFilterSave = useCallback(() => {
    if (activeFilterColumn) {
      table.getColumn(activeFilterColumn)?.setFilterValue({
        operator: activeOperator,
        value: activeValue,
      });
    }
  }, [activeFilterColumn, table, activeOperator, activeValue]);

  const handleFilterClear = useCallback(() => {
    if (activeFilterColumn) {
      table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
      setActiveValue('');
      const validOperators = getOperatorsForColumn(activeFilterColumn);
      setActiveOperator(validOperators[0]);
    }
  }, [activeFilterColumn, table]);

  const handleColumnChange = useCallback(
    (newCol: string) => {
      if (activeFilterColumn && activeFilterColumn !== newCol) {
        table.getColumn(activeFilterColumn)?.setFilterValue(undefined);
      }
      setActiveFilterColumn(newCol);
      updateFilterStateForColumn(newCol);
    },
    [activeFilterColumn, table, updateFilterStateForColumn]
  );

  const handleMenuOpen = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return {
    isFilterOpen,
    setIsFilterOpen,
    activeFilterColumn,
    activeOperator,
    setActiveOperator,
    activeValue,
    setActiveValue,
    filterAnchor,
    filterRef,
    filterButtonRef,
    handleFilterClick,
    handleFilterOpenFromMenu,
    handleFilterSave,
    handleFilterClear,
    handleColumnChange,
    handleMenuOpen,
  };
}
