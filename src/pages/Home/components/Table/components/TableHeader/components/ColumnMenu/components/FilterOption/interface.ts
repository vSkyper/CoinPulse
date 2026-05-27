import type { Header } from '@tanstack/react-table';
import type { RefObject } from 'react';
import type { CoinsResponse } from 'interfaces';

export interface FilterOptionProps {
  header: Header<CoinsResponse, unknown>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  handleFilterOpenFromMenu: (columnId: string, anchorEl: HTMLElement) => void;
}
