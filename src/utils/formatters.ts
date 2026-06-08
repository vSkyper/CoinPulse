import BigNumber from 'bignumber.js';

/**
 * Formatting utilities for consistent data display across the application
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
  style: 'currency',
  currency: 'USD',
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
});

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

const percentageFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'percent',
});

const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Format a number as currency with full precision or compact notation
 */
export const formatCurrency = (
  value: number | null | undefined,
  compact = false
): string => {
  if (value == null) return 'N/A';
  if (compact) return compactCurrencyFormatter.format(value);
  if (value > 0 && value < 0.01) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  }
  return currencyFormatter.format(value);
};

/**
 * Format a number as percentage (expects value as number, not decimal)
 * Example: 5.5 -> "5.50%"
 */
export const formatPercentage = (value: number | null | undefined): string => {
  if (value == null) return 'N/A';
  return percentageFormatter.format(value / 100);
};

const numberFormattersCache = new Map<number, Intl.NumberFormat>();
function getNumberFormatter(digits: number) {
  if (!numberFormattersCache.has(digits)) {
    numberFormattersCache.set(
      digits,
      new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }),
    );
  }
  return numberFormattersCache.get(digits)!;
}

/**
 * Format a number with standard or compact notation
 */
export const formatNumber = (
  value: number | null | undefined,
  options?: { compact?: boolean; maximumFractionDigits?: number }
): string => {
  if (value == null) return 'N/A';
  if (options?.compact) return compactNumberFormatter.format(value);
  if (options?.maximumFractionDigits !== undefined) {
    return getNumberFormatter(options.maximumFractionDigits).format(value);
  }
  return numberFormatter.format(value);
};

const currencySymbolsCache = new Map<string, string>();
function getCurrencySymbol(currency: string) {
  const upper = currency.toUpperCase();
  if (!currencySymbolsCache.has(upper)) {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: upper,
    }).formatToParts(0);
    const symbol = parts.find((p) => p.type === 'currency')?.value || upper;
    currencySymbolsCache.set(upper, symbol);
  }
  return currencySymbolsCache.get(upper)!;
}

const rateNumberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
});

/**
 * Format a number as currency with specific currency and options
 */
export const formatRateWithSuffix = (rate: number, currency: string) => {
  const formattedVal = rateNumberFormatter.format(rate);
  const symbol = getCurrencySymbol(currency);
  return `${formattedVal} ${symbol}`;
};

/**
 * Format a number to its full string representation without scientific notation
 * Uses toLocaleString with useGrouping: false to avoid commas and ensure full digits are shown
 */
export const formatToFullPrecision = (
  value: number | string | BigNumber | null | undefined,
): string => {
  if (value == null || value === '') return '';
  const bn = new BigNumber(value);
  if (bn.isNaN()) return '';
  return bn.toFixed();
};
