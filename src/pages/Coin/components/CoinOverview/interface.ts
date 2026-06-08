import type { CoinResponse } from 'interfaces';

export interface CoinOverviewProps {
  id: string;
  data: CoinResponse;
  animations: Record<string, boolean>;
}
