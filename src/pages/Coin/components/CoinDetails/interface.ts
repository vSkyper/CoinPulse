import type { CoinResponse } from 'interfaces';

export interface CoinDetailsProps {
  id: string;
  data: CoinResponse;
  animations: Record<string, boolean>;
}
