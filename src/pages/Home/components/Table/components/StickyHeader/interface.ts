import { RefObject } from 'react';
import { SortingState, ColumnFiltersState } from '@tanstack/react-table';

export interface StickyHeaderProps {
  table: any;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  handleMenuOpen: () => void;
}
