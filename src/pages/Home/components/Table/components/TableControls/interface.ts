import type { MouseEvent, RefObject, ReactNode } from 'react';

export interface TableControlsProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  handleFilterClick: (e: MouseEvent) => void;
  isFilterOpen: boolean;
  filterButtonRef: RefObject<HTMLButtonElement | null>;
  children?: ReactNode;
}
