import type { DescriptionProps } from './interface';
import { Highlight } from './components';
import {
  formatCurrency,
  formatPercentage,
  formatNumber,
} from 'utils/formatters';

export default function Description({ globalData }: DescriptionProps) {
  const { data } = globalData;

  const stats = () => {
    const marketCapChange = data.market_cap_change_percentage_24h_usd;

    return {
      marketCap: formatCurrency(data.total_market_cap.usd, true),
      marketCapChange: `${marketCapChange >= 0 ? '+' : ''}${formatPercentage(
        marketCapChange,
      )}`,
      totalVolume: formatCurrency(data.total_volume.usd, true),
      btcDominance: formatPercentage(data.market_cap_percentage.btc),
      ethDominance: formatPercentage(data.market_cap_percentage.eth),
      cryptocurrencies: formatNumber(data.active_cryptocurrencies),
      isNegative: marketCapChange < 0,
    };
  };

  const changeColorClass = stats().isNegative
    ? 'text-brand-negative'
    : 'text-brand-positive';

  return (
    <p className="text-[11px] sm:text-sm text-white/70 leading-relaxed max-w-3xl font-medium tracking-wide">
      The global cryptocurrency market cap today is{' '}
      <Highlight className="text-white font-black tracking-tight">
        {stats().marketCap}
      </Highlight>
      , a{' '}
      <Highlight className={changeColorClass}>
        {stats().marketCapChange}
      </Highlight>{' '}
      change in the last 24 hours. Total cryptocurrency trading volume in the
      last day is at{' '}
      <Highlight className="text-white font-black tracking-tight">
        {stats().totalVolume}
      </Highlight>
      . Bitcoin dominance is at{' '}
      <Highlight className="text-brand-bitcoin">
        {stats().btcDominance}
      </Highlight>{' '}
      and Ethereum dominance is at{' '}
      <Highlight className="text-brand-ethereum">
        {stats().ethDominance}
      </Highlight>
      . CoinGecko API is now tracking{' '}
      <Highlight className="text-white font-black tracking-tight">
        {stats().cryptocurrencies}
      </Highlight>{' '}
      cryptocurrencies.
    </p>
  );
}
