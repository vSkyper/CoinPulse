import { SortingState, ColumnFiltersState } from '@tanstack/react-table';

export interface StickyHeaderProps {
  table: any;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  handleMenuOpen: () => void;
}
