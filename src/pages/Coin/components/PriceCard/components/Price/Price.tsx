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

  const badgeColorClass = isPositive
    ? 'border-brand-positive/30 bg-brand-positive/10 text-brand-positive shadow-glow-positive'
    : 'border-brand-negative/30 bg-brand-negative/10 text-brand-negative shadow-glow-negative-sm';
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div className='flex items-center justify-start mt-5 sm:mt-0'>
      <h3 className='text-2xl sm:text-3xl font-black tracking-tighter text-white drop-shadow-glow-white'>
        {formatCurrency(currentPrice)}
      </h3>

      <span
        className={`ml-3 sm:ml-3 inline-flex items-center font-bold text-xs sm:text-xs px-3 sm:px-2 py-1.5 sm:py-1 rounded-xl sm:rounded-lg border backdrop-blur-md transition-all duration-300 tracking-wide ${badgeColorClass}`}
      >
        {isPositive && '+'}
        {formatPercentage(priceChange)}
        <TrendIcon size='1rem' className='ml-1' />
      </span>
    </div>
  );
}
