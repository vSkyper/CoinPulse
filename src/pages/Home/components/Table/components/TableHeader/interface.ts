import type { SortingState, Table } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface TableHeaderProps {
  table: Table<CoinsResponse>;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  handleMenuOpen: () => void;
  className?: string;
  context?: string;
  sorting?: SortingState;
}
