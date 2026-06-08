import { MdToken, MdPieChart, MdDataSaverOff } from 'react-icons/md';
import { formatCurrency, formatNumber } from 'utils/formatters';
import type { SecondaryStatsProps } from './interface';
import StatRow from '../StatRow';

export default function SecondaryStats({ marketData }: SecondaryStatsProps) {
  const volumeToMarketCap =
    (marketData.total_volume?.usd || 0) / (marketData.market_cap?.usd || 1);

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
      <StatRow
        label={
          <>
            <span className='sm:hidden'>FDV</span>
            <span className='hidden sm:inline'>Fully Diluted Valuation</span>
          </>
        }
        value={formatCurrency(
          (marketData.fully_diluted_valuation as { usd: number })?.usd || 0,
        )}
        fullValue={(
          marketData.fully_diluted_valuation as { usd: number }
        )?.usd?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        icon={MdToken}
      />
      <StatRow
        label='Volume / Market Cap'
        value={formatNumber(volumeToMarketCap, 4)}
        fullValue={volumeToMarketCap}
        icon={MdPieChart}
      />
      <StatRow
        label='Circulating Supply'
        value={formatNumber(marketData.circulating_supply || 0)}
        fullValue={marketData.circulating_supply?.toLocaleString('en-US')}
        icon={MdToken}
      />
      <StatRow
        label='Total Supply'
        value={formatNumber(marketData.total_supply || 0)}
        fullValue={marketData.total_supply?.toLocaleString('en-US')}
        icon={MdDataSaverOff}
      />
    </div>
  );
}
