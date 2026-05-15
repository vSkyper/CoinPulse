import type { ExchangeRateDisplayProps } from './interface';
import { formatRateWithSuffix } from 'utils/formatters';

export default function ExchangeRateDisplay({
  isLoadingRate,
  currentRate,
  symbol,
  currencyOption,
  change24h,
  lastUpdated,
}: ExchangeRateDisplayProps) {
  const formattedRate = currentRate
    ? formatRateWithSuffix(currentRate, currencyOption)
    : '';

  const [rateValue, rateSymbol] = formattedRate
    ? formattedRate.split(' ')
    : ['', ''];

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      {/* Rate */}
      <div className="flex items-center gap-2">
        <div className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest">
          Rate
        </div>
        {isLoadingRate ? (
          <div className="animate-pulse h-3 w-12 bg-white/10 rounded" />
        ) : (
          currentRate && (
            <div className="flex items-center gap-1.5">
              <div className="font-medium text-xs text-white/90 flex items-center gap-1">
                <span>
                  1{' '}
                  <span className="text-white/50">{symbol.toUpperCase()}</span>
                </span>
                <span className="text-white/30">≈</span>
                <span className="tracking-wide">
                  {rateValue} <span className="text-white/50">{rateSymbol}</span>
                </span>
              </div>
              {change24h !== undefined && change24h !== null && (
                <span
                  className={`text-[0.6rem] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                    change24h >= 0
                      ? 'bg-brand-positive/10 text-brand-positive shadow-glow-positive-sm'
                      : 'bg-brand-negative/10 text-brand-negative shadow-glow-negative-sm'
                  }`}
                >
                  {change24h >= 0 ? '+' : ''}
                  {change24h.toFixed(2)}%
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* Last Update */}
      <div className="text-[0.6rem] font-medium text-white/30">
        {lastUpdated
          ? `${new Date(lastUpdated * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : null}
      </div>
    </div>
  );
}
