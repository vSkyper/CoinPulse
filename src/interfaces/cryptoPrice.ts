interface CurrencyData {
  last_updated_at?: number;
  // Index signature allows for any currency key (usd, eur, jpy)
  // or change key (usd_24h_change)
  [currencyOrMetric: string]: number | undefined;
}

// The root response object where keys are coin IDs (bitcoin, ethereum, etc.)
export interface CryptoPriceResponse {
  [coinId: string]: CurrencyData;
}
