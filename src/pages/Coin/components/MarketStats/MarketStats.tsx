import { MarketStatsProps } from './interface';
import { ExtremeValueRow, StatRow } from './components';
import { formatCurrency, formatNumber } from 'utils/formatters';
import {
  MdEmojiEvents,
  MdAttachMoney,
  MdBarChart,
  MdPieChart,
  MdTimeline,
  MdToken,
  MdDataSaverOff,
  MdTrendingUp,
  MdTrendingDown,
} from 'react-icons/md';

export default function MarketStats({ marketData }: MarketStatsProps) {
  const volumeToMarketCap =
    (marketData.total_volume?.usd || 0) / (marketData.market_cap?.usd || 1);

  return (
    <div className='flex flex-col gap-4 mb-8'>
      {/* Heavy Hero Stats - Row 1 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
        <StatRow
          label='Market Capitalization'
          value={formatCurrency(marketData.market_cap?.usd || 0)}
          icon={MdAttachMoney}
          variant='hero'
          className='min-h-[90px]'
        />
        <StatRow
          label='24h Trading Volume'
          value={formatCurrency(marketData.total_volume?.usd || 0)}
          icon={MdBarChart}
          variant='hero'
          className='min-h-[90px]'
        />
      </div>

      {/* Secondary Stats - Row 2 */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
        <StatRow
          label='Market Cap Rank'
          value={
            <div className='flex items-center gap-2'>
              <span className='font-bold text-lg text-amber-400 drop-shadow-text'>
                {marketData.market_cap_rank
                  ? `#${marketData.market_cap_rank}`
                  : 'N/A'}
              </span>
            </div>
          }
          icon={MdEmojiEvents}
        />
        <StatRow
          label='Volume / Market Cap'
          value={formatNumber(volumeToMarketCap, 4)}
          icon={MdPieChart}
        />
        <StatRow
          label='Circulating Supply'
          value={formatNumber(marketData.circulating_supply || 0)}
          icon={MdToken}
        />
        <StatRow
          label='Total Supply'
          value={formatNumber(marketData.total_supply || 0)}
          icon={MdDataSaverOff}
        />
      </div>

      {/* Performance & Range - Row 3 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <StatRow
          label='24h Range'
          value={
            <div className='flex items-baseline gap-2 mt-1'>
              <span className='text-brand-negative font-bold text-lg'>
                {formatCurrency(marketData.low_24h?.usd || 0)}
              </span>
              <span className='text-white/20 text-xs'>/</span>
              <span className='text-brand-positive font-bold text-lg'>
                {formatCurrency(marketData.high_24h?.usd || 0)}
              </span>
            </div>
          }
          icon={MdTimeline}
        />

        <ExtremeValueRow
          label='All-Time High'
          price={marketData.ath?.usd || 0}
          percentage={marketData.ath_change_percentage?.usd || 0}
          date={marketData.ath_date?.usd || 0}
          icon={MdTrendingUp}
        />

        <ExtremeValueRow
          label='All-Time Low'
          price={marketData.atl?.usd || 0}
          percentage={marketData.atl_change_percentage?.usd || 0}
          date={marketData.atl_date?.usd || 0}
          icon={MdTrendingDown}
        />
      </div>
    </div>
  );
}
