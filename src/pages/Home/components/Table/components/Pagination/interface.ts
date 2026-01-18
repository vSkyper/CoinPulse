import { PaginationState, Table } from '@tanstack/react-table';

export interface PaginationProps {
  table: Table<any>;
  pagination: PaginationState;
  totalRows: number;
}
