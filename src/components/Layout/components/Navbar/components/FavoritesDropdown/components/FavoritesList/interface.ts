import type { CoinsResponse } from 'interfaces';

export interface FavoritesListProps {
  favorites: string[];
  coins: CoinsResponse[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
}
