import type { MarketDataResponse } from 'interfaces';

export interface CoinHeaderProps {
  id?: string;
  name?: string;
  symbol?: string;
  image?: string;
  marketCapRank?: number;
  marketData?: MarketDataResponse;
}
