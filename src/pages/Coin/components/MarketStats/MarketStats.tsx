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
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3 mb-6 sm:mb-6'>
      <div className='hidden font-bold text-base sm:text-xl bg-clip-text text-transparent bg-linear-to-r from-white via-brand-violet-light to-brand-violet'>
        Market Statistics
      </div>

      <StatRow
        label='Market Capitalization'
        value={formatCurrency(marketData.market_cap?.usd || 0)}
        icon={MdAttachMoney}
      />

      <StatRow
        label='24h Trading Volume'
        value={formatCurrency(marketData.total_volume?.usd || 0)}
        icon={MdBarChart}
      />

      <StatRow
        label='Volume / Market Cap'
        value={formatNumber(volumeToMarketCap, 8)}
        icon={MdPieChart}
      />

      <StatRow
        label='24h Low / 24h High'
        value={
          <div className='flex flex-col items-end justify-center h-full sm:flex-row sm:items-center sm:justify-end sm:gap-1.5'>
            <span className='font-bold text-brand-negative text-sm sm:text-base leading-tight'>
              {formatCurrency(marketData.low_24h?.usd || 0)}
            </span>
            <span className='hidden sm:inline text-white/40'>/</span>
            <span className='font-bold text-brand-positive text-sm sm:text-base leading-tight'>
              {formatCurrency(marketData.high_24h?.usd || 0)}
            </span>
          </div>
        }
        icon={MdTimeline}
      />

      <StatRow
        label='Market Cap Rank'
        value={
          <div className='flex items-center gap-1.5'>
            <div className='flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-tr from-amber-400/20 to-amber-600/20 border border-amber-400/30 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)]'>
              <MdEmojiEvents size={14} className='sm:hidden' />
              <MdEmojiEvents size={16} className='hidden sm:block' />
            </div>
            <span className='font-black text-sm sm:text-lg text-white tracking-tight drop-shadow-sm'>
              {marketData.market_cap_rank
                ? `#${marketData.market_cap_rank}`
                : 'N/A'}
            </span>
          </div>
        }
        icon={MdEmojiEvents}
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
  );
}
