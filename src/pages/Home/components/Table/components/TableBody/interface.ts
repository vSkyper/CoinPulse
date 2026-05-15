import type { Table } from '@tanstack/react-table';

export interface TableBodyProps {
  table: Table<any>;
  onRowClick: (id: string) => void;
  onClearFilters: () => void;
}
