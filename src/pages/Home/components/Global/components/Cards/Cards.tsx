import { StatCard, type CardConfig } from './components';
import type { CardsProps } from './interface';
import {
  formatPercentage,
  formatNumber,
  formatCurrency,
} from 'utils/formatters';

export default function Cards({ toggle, globalData }: CardsProps) {
  const { data } = globalData;

  const cardConfigs: CardConfig[] = [
    {
      key: 'marketCap',
      value: formatCurrency(data.total_market_cap.usd, true),
      fullValue: formatCurrency(data.total_market_cap.usd),
      mobileValue: formatNumber(data.total_market_cap.usd, { compact: true }),
      label: 'Market Cap',
      color: 'var(--color-brand-violet)',
      percentage: {
        value: formatPercentage(data.market_cap_change_percentage_24h_usd),
        change: data.market_cap_change_percentage_24h_usd,
      },
      timeout: 0,
    },
    {
      key: 'totalVolume',
      value: formatCurrency(data.total_volume.usd, true),
      fullValue: formatCurrency(data.total_volume.usd),
      mobileValue: formatNumber(data.total_volume.usd, { compact: true }),
      label: '24h Volume',
      color: 'var(--color-brand-violet-light)',
      timeout: 100,
    },
    {
      key: 'btcDominance',
      value: formatPercentage(data.market_cap_percentage.btc),
      fullValue: `${data.market_cap_percentage.btc}%`,
      label: 'BTC Dominance',
      color: 'var(--color-brand-bitcoin)',
      timeout: 200,
    },
    {
      key: 'ethDominance',
      value: formatPercentage(data.market_cap_percentage.eth),
      fullValue: `${data.market_cap_percentage.eth}%`,
      label: 'ETH Dominance',
      color: 'var(--color-brand-ethereum)',
      timeout: 300,
    },
    {
      key: 'activeCryptos',
      value: formatNumber(data.active_cryptocurrencies),
      fullValue: data.active_cryptocurrencies?.toLocaleString('en-US'),
      label: 'Cryptos',
      color: 'white',
      timeout: 400,
    },
    {
      key: 'markets',
      value: formatNumber(data.markets),
      fullValue: data.markets?.toLocaleString('en-US'),
      label: 'Markets',
      color: 'white',
      timeout: 500,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-4">
      {cardConfigs.map((config) => (
        <StatCard key={config.key} config={config} toggle={toggle} />
      ))}
    </div>
  );
}
