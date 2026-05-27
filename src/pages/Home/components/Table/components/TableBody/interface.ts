import type { Table } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface TableBodyProps {
  table: Table<CoinsResponse>;
  onRowClick: (id: string) => void;
  onClearFilters: () => void;
}
