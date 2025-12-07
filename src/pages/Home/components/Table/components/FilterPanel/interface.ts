import { Table } from '@tanstack/react-table';

export interface FilterPanelProps {
  isFilterOpen: boolean;
  filterRef: React.RefObject<HTMLDivElement | null>;
  setIsFilterOpen: (value: boolean) => void;
  activeFilterColumn: string;
  handleColumnChange: (newCol: string) => void;
  table: Table<any>;
  activeOperator: string;
  setActiveOperator: (value: string) => void;
  activeValue: string;
  setActiveValue: (value: string) => void;
  handleFilterClear: () => void;
  handleFilterSave: () => void;
  anchorEl: HTMLElement | null;
  isAnchoring?: boolean;
}
