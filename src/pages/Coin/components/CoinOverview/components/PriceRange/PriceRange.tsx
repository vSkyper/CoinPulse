import { formatCurrency } from 'utils/formatters';
import type { PriceRangeProps } from './interface';

export default function PriceRange({ marketData }: PriceRangeProps) {
  if (!marketData) return null;

  return (
    <div className="bg-white/2 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-highlight-neutral flex flex-col justify-center">
      <h3 className="text-[0.6rem] sm:text-[0.7rem] font-bold text-white/50 uppercase tracking-widest mb-2 sm:mb-3">
        24H Price Range
      </h3>

      <div className="flex flex-col w-full">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#8B5CF6] to-[#2DD4BF] rounded-full"
            style={{
              width: `${Math.max(
                0,
                Math.min(
                  100,
                  100 *
                    (((marketData.current_price?.usd || 0) -
                      (marketData.low_24h?.usd || 0)) /
                      ((marketData.high_24h?.usd || 1) -
                        (marketData.low_24h?.usd || 0) || 1)),
                ),
              )}%`,
            }}
          />
        </div>

        <div className="flex items-baseline justify-between mt-1.5 sm:mt-2.5">
          <span className="text-white/60 font-mono text-[0.65rem] sm:text-xs font-medium">
            {formatCurrency(marketData.low_24h?.usd || 0)}
          </span>
          <span className="text-white/60 font-mono text-[0.65rem] sm:text-xs font-medium">
            {formatCurrency(marketData.high_24h?.usd || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
