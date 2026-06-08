import type { CandlestickData } from 'interfaces';

export interface CustomCandlestickProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: CandlestickData;
}
