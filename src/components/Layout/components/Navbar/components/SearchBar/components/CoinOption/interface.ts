import { CoinsResponse, CoinsListResponse } from 'interfaces';

export interface CoinOptionProps {
  coin: CoinsResponse | CoinsListResponse;
  isFocused: boolean;
}
