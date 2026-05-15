import type { Header } from '@tanstack/react-table';
import type { RefObject } from 'react';

export interface FilterOptionProps {
  header: Header<any, unknown>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  handleFilterOpenFromMenu: (columnId: string, anchorEl: HTMLElement) => void;
}
