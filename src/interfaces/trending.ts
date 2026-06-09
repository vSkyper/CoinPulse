export interface TrendingCoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data?: {
    price?: number;
    price_change_percentage_24h?: Record<string, number>;
  };
}

export interface TrendingCoin {
  item: TrendingCoinItem;
}

export interface TrendingResponse {
  coins: TrendingCoin[];
  exchanges: unknown[];
}
