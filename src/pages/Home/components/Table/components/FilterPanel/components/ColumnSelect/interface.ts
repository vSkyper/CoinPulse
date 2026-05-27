import type { Table } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface ColumnSelectProps {
  activeFilterColumn: string;
  handleColumnChange: (newCol: string) => void;
  table: Table<CoinsResponse>;
}
