import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import type { PerformanceStatsProps } from './interface';
import { ExtremeValueRow } from './components';

export default function PerformanceStats({
  marketData,
}: PerformanceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ExtremeValueRow
        label="All-Time High"
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
        label="All-Time Low"
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
