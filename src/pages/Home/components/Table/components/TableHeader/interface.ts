import { SortingState, Table } from '@tanstack/react-table';

export interface TableHeaderProps {
  table: Table<any>;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  handleMenuOpen: () => void;
  className?: string;
  context?: string;
  sorting?: SortingState;
}
