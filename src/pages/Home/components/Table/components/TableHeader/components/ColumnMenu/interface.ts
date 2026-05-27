import type { Header } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface ColumnMenuProps {
  header: Header<CoinsResponse, unknown>;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  handleMenuOpen: () => void;
  context: string;
}
