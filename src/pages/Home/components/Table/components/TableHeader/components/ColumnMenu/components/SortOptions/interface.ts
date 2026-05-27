import type { Header } from '@tanstack/react-table';
import type { CoinsResponse } from 'interfaces';

export interface SortOptionsProps {
  header: Header<CoinsResponse, unknown>;
}
