import type { CoinResponse } from 'interfaces';

export interface CoinHeroProps {
  id: string;
  data: CoinResponse;
  animations: Record<string, boolean>;
}
