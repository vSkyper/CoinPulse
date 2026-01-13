import {
  MdTrendingUp as TrendingUpIcon,
  MdTrendingDown as TrendingDownIcon,
} from 'react-icons/md';
import { PriceProps } from './interface';
import { formatCurrency, formatPercentage } from 'utils/formatters';

export default function Price({ marketData }: PriceProps) {
  const currentPrice = marketData.current_price?.usd || 0;
  const priceChange = marketData.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const colorClass = isPositive ? 'text-brand-positive' : 'text-brand-negative';
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div className='flex items-center justify-start mt-5 sm:mt-0'>
      <h3 className='text-2xl sm:text-3xl font-black tracking-tighter text-white drop-shadow-glow-white'>
        {formatCurrency(currentPrice)}
      </h3>

      <span
        className={`ml-3 sm:ml-3 inline-flex items-center font-bold text-lg sm:text-xl px-0 py-0 tracking-wide ${colorClass}`}
      >
        {isPositive && '+'}
        {formatPercentage(priceChange)}
        <TrendIcon size='1rem' className='ml-1' />
      </span>
    </div>
  );
}
