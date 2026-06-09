import { Link } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { API_ENDPOINTS } from 'config/api';
import type { TrendingResponse } from 'interfaces';
import { formatPercentage } from 'utils/formatters';
import { MdTrendingUp } from 'react-icons/md';

export default function TrendingMarquee() {
  const { data, isLoading, error } = useFetch<TrendingResponse>(
    API_ENDPOINTS.trending()
  );

  if (isLoading || error || !data || data.coins.length === 0) {
    return null; // Don't show anything if it fails or is loading to avoid layout shift
  }

  // Duplicate for seamless infinite scrolling
  const trendingCoins = [...data.coins, ...data.coins];

  return (
    <div className="w-full bg-white/2 border-y border-white/5 py-2 sm:py-2.5 overflow-hidden flex items-center mb-6 sm:mb-8 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-8 flex items-center gap-4 relative">
        <div className="flex items-center gap-2 shrink-0 bg-brand-violet/10 px-2 sm:px-3 py-1 rounded-full border border-brand-violet/20 shadow-glow-primary z-20">
          <MdTrendingUp className="text-brand-violet w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-[10px] sm:text-xs font-bold text-brand-violet uppercase tracking-wider">
            Trending
          </span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative mask-fade-edges">
          <div className="flex animate-[marquee_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
            {trendingCoins.map((coin, index) => {
              const { item } = coin;
              const priceChange = item.data?.price_change_percentage_24h?.usd;
              const isPositive = priceChange ? priceChange >= 0 : false;
              const colorClass = priceChange
                ? isPositive
                  ? 'text-brand-positive'
                  : 'text-brand-negative'
                : 'text-white/50';

              return (
                <Link
                  key={`${item.id}-${index}`}
                  to={`/coins/${item.id}`}
                  className="flex items-center gap-2 sm:gap-3 mx-4 sm:mx-6 group transition-all"
                >
                  <img
                    src={item.small}
                    alt={item.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/5"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-white/30 uppercase">
                    {item.symbol}
                  </span>
                  {priceChange !== undefined && (
                    <span
                      className={`text-[10px] sm:text-xs font-bold ${colorClass}`}
                    >
                      {isPositive ? '+' : ''}
                      {formatPercentage(priceChange)}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
