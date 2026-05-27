import type { RefObject } from 'react';
import type { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface StickyHeaderProps {
  table: Table<CoinsResponse>;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  handleMenuOpen: () => void;
}
