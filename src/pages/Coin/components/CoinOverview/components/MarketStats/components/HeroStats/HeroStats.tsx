import { MdEmojiEvents, MdAttachMoney, MdBarChart } from 'react-icons/md';
import { formatCurrency } from 'utils/formatters';
import type { HeroStatsProps } from './interface';
import StatRow from '../StatRow';

export default function HeroStats({ marketData }: HeroStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'>
      <StatRow
        label='Market Cap Rank'
        value={
          <div className='flex items-center gap-2'>
            <span className='font-bold text-base sm:text-xl text-brand-violet drop-shadow-text'>
              {marketData.market_cap_rank
                ? `#${marketData.market_cap_rank}`
                : 'N/A'}
            </span>
          </div>
        }
        icon={MdEmojiEvents}
        variant='hero'
        className='sm:min-h-20'
      />
      <StatRow
        label='Market Capitalization'
        value={formatCurrency(marketData.market_cap?.usd || 0)}
        fullValue={marketData.market_cap?.usd?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        icon={MdAttachMoney}
        variant='hero'
        className='sm:min-h-20'
      />
      <StatRow
        label='24h Trading Volume'
        value={formatCurrency(marketData.total_volume?.usd || 0)}
        fullValue={marketData.total_volume?.usd?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        icon={MdBarChart}
        variant='hero'
        className='sm:min-h-20'
      />
    </div>
  );
}
