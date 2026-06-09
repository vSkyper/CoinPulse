import type { MarketDataResponse } from 'interfaces/coin';

export interface RoiCalculatorProps {
  id: string;
  marketData?: MarketDataResponse;
}
