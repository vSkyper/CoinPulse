export interface TableControlsProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  handleFilterClick: (e: React.MouseEvent) => void;
  isFilterOpen: boolean;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  children?: React.ReactNode;
}
