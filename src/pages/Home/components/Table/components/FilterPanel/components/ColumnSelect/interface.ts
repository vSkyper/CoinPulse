import type { Table } from '@tanstack/react-table';

export interface ColumnSelectProps {
  activeFilterColumn: string;
  handleColumnChange: (value: string) => void;
  table: Table<any>;
}
