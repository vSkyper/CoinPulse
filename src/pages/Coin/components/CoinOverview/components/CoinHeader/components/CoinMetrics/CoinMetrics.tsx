import { priceChange } from 'constants/coin';
import type { CoinMetricsProps } from './interface';
import { PriceChange } from './components';

export default function CoinMetrics({ marketData }: CoinMetricsProps) {
  if (!marketData) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
      {priceChange.map((days) => (
        <div key={days} className="shrink-0">
          <PriceChange marketData={marketData} days={days} />
        </div>
      ))}
    </div>
  );
}
