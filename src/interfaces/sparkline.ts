export interface SparklineResponse {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

// [timestamp, open, high, low, close]
export type OhlcResponse = [number, number, number, number, number][];

export interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

