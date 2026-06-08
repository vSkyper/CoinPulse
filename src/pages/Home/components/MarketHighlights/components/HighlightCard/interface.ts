import type { CoinsResponse } from 'interfaces';

export interface HighlightCardProps {
  coin: CoinsResponse;
  type: 'gainer' | 'loser';
}
