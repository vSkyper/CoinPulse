import type { MarketDataResponse } from 'interfaces';

export interface PriceChangeProps {
  marketData: MarketDataResponse;
  days: string;
}
