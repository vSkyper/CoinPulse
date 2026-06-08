import { HighlightCard } from './components';
import type { MarketHighlightsProps } from './interface';

export default function MarketHighlights({ coins }: MarketHighlightsProps) {
  if (!coins || coins.length === 0) return null;

  // Filter coins with valid data and sort them by 24h percentage change
  const sortedCoins = [...coins]
    .filter((c) => c.price_change_percentage_24h_in_currency != null)
    .sort(
      (a, b) =>
        b.price_change_percentage_24h_in_currency! - a.price_change_percentage_24h_in_currency!
    );

  // Top Gainers (highest positive change)
  const topGainers = sortedCoins.filter((c) => c.price_change_percentage_24h_in_currency! > 0).slice(0, 3);
  
  // Top Losers (lowest negative change)
  const topLosers = sortedCoins.filter((c) => c.price_change_percentage_24h_in_currency! < 0).slice(-3).reverse();

  // If we don't have enough data, don't render the section
  if (topGainers.length === 0 && topLosers.length === 0) return null;

  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        
        {/* Gainers Section */}
        {topGainers.length > 0 && (
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-positive shadow-glow-positive" />
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                Top Gainers (24H)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              {topGainers.map((coin) => (
                <HighlightCard key={coin.id} coin={coin} type="gainer" />
              ))}
            </div>
          </div>
        )}

        {/* Losers Section */}
        {topLosers.length > 0 && (
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-negative shadow-glow-negative" />
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                Top Losers (24H)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              {topLosers.map((coin) => (
                <HighlightCard key={coin.id} coin={coin} type="loser" />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
