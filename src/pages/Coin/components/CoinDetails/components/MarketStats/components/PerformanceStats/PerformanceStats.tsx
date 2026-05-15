import { MdTimeline, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { Tooltip } from 'components';
import { formatCurrency } from 'utils/formatters';
import type { PerformanceStatsProps } from './interface';
import StatRow from '../StatRow';
import { ExtremeValueRow } from './components';

export default function PerformanceStats({
  marketData,
}: PerformanceStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
      <StatRow
        label='24h Range'
        value={
          <div className='flex items-baseline gap-2 mt-1'>
            <span className='text-brand-negative font-bold text-base sm:text-lg min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[40%]'>
              <Tooltip
                value={formatCurrency(marketData.low_24h?.usd || 0)}
                content={marketData.low_24h?.usd?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              />
            </span>
            <span className='text-white/20 text-sm'>/</span>
            <span className='text-brand-positive font-bold text-base sm:text-lg min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[40%]'>
              <Tooltip
                value={formatCurrency(marketData.high_24h?.usd || 0)}
                content={marketData.high_24h?.usd?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              />
            </span>
          </div>
        }
        icon={MdTimeline}
      />

      <ExtremeValueRow
        label='All-Time High'
        price={marketData.ath?.usd || 0}
        fullValue={marketData.ath?.usd?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        percentage={marketData.ath_change_percentage?.usd || 0}
        date={marketData.ath_date?.usd || 0}
        icon={MdTrendingUp}
      />

      <ExtremeValueRow
        label='All-Time Low'
        price={marketData.atl?.usd || 0}
        fullValue={marketData.atl?.usd?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        percentage={marketData.atl_change_percentage?.usd || 0}
        date={marketData.atl_date?.usd || 0}
        icon={MdTrendingDown}
      />
    </div>
  );
}
