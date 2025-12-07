export interface ColumnMenuProps {
  header: any;
  handleFilterOpenFromMenu: (columnId: string, target: HTMLElement) => void;
  handleMenuOpen: () => void;
  context: string;
}
