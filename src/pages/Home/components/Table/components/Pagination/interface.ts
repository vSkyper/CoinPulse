import type { PaginationState, Table } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface PaginationProps {
  table: Table<CoinsResponse>;
  pagination: PaginationState;
  totalRows: number;
}
