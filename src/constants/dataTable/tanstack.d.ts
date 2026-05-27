import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    align?: 'left' | 'center' | 'right';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    favorites?: string[];
  }
}
