import type { MarketDataResponse } from 'interfaces';
import type { PriceChangeProps } from './interface';
import { formatPercentage } from 'utils/formatters';

export default function PriceChange({ marketData, days }: PriceChangeProps) {
  const key = `price_change_percentage_${days}` as keyof MarketDataResponse;
  const priceChange = (marketData[key] as number) || 0;
  const isPositive = priceChange >= 0;

  const colorClass = isPositive ? 'text-brand-positive' : 'text-brand-negative';

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/2 border border-white/5 transition-all duration-300">
      <div className="text-[0.65rem] sm:text-[0.7rem] text-white/50 font-bold uppercase tracking-wider">
        {days}
      </div>
      <div
        className={`font-bold text-xs sm:text-sm tracking-tight ${colorClass}`}
      >
        {isPositive && '+'}
        {formatPercentage(priceChange)}
      </div>
    </div>
  );
}
