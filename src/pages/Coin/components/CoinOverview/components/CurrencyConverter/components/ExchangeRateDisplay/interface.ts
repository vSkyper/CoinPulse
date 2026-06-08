export interface ExchangeRateDisplayProps {
  isLoadingRate: boolean;
  currentRate: number | undefined;
  symbol: string;
  currencyOption: string;
  change24h: number | null | undefined;
  lastUpdated: number | undefined;
}
