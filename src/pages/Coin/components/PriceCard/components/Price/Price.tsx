import { PriceProps } from './interface';
import { formatCurrency, formatPercentage } from 'utils/formatters';

export default function Price({ marketData }: PriceProps) {
  const currentPrice = marketData.current_price?.usd || 0;
  const priceChange = marketData.price_change_percentage_24h || 0;

  const isPositive = priceChange >= 0;

  return (
    <div className='flex items-center justify-start mt-5 sm:mt-0'>
      <h3 className='text-2xl sm:text-3xl font-black tracking-tighter text-white drop-shadow-(--shadow-glow-neutral)'>
        {formatCurrency(currentPrice)}
      </h3>

      <span
        className={`ml-3 sm:ml-3 inline-flex items-center font-bold text-xs px-2 py-1 rounded-lg tracking-wide ${
          isPositive
            ? 'bg-brand-positive/10 text-brand-positive shadow-glow-positive-sm'
            : 'bg-brand-negative/10 text-brand-negative shadow-glow-negative-sm'
        }`}
      >
        {isPositive && '+'}
        {formatPercentage(priceChange)}
      </span>
    </div>
  );
}
