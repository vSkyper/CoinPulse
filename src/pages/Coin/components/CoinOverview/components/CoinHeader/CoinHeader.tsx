import type { CoinHeaderProps } from './interface';
import { CoinInfo, FavoriteButton, CoinMetrics, Price } from './components';

export default function CoinHeader({
  id,
  name,
  symbol,
  image,
  marketCapRank,
  marketData,
}: CoinHeaderProps) {
  return (
    <div className="mb-4 sm:mb-8 relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
        <CoinInfo
          name={name}
          symbol={symbol}
          image={image}
          marketCapRank={marketCapRank}
        />

        {/* Right container for Price and Favorite Button */}
        <div className="flex items-center gap-4">
          {/* Main Price */}
          {marketData && (
            <div className="hidden sm:flex flex-col items-end">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none">
                <Price marketData={marketData} />
              </div>
            </div>
          )}

          <FavoriteButton id={id} />
        </div>
      </div>

      {/* Mobile Price */}
      {marketData && (
        <div className="sm:hidden text-3xl font-black text-white tracking-tighter">
          <Price marketData={marketData} />
        </div>
      )}

      {/* Sleek Horizontal Pills for Change Metrics */}
      <CoinMetrics marketData={marketData} />
    </div>
  );
}
