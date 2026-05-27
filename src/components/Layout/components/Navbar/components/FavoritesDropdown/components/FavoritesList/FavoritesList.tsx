import { MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { formatPercentage } from 'utils/formatters';
import type { FavoritesListProps } from './interface';

export default function FavoritesList({ favorites, coins, error, isLoading }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-zinc-500">
        You haven't added any favorites yet.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-zinc-500">
        Loading favorites...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-brand-negative">
        Failed to load favorites.
      </div>
    );
  }

  return (
    <>
      {coins?.map((coin) => {
        const change7d = coin.price_change_percentage_7d_in_currency || 0;
        const isPositive = change7d >= 0;

        return (
          <MenuItem key={coin.id}>
            {({ focus }) => (
              <Link
                to={`/coins/${coin.id}`}
                className={`flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl transition-colors ${
                  focus ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full object-cover bg-white/10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[11px] sm:text-[13px] truncate text-white">
                      {coin.name}
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-tight">
                      {coin.symbol}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-[9px] sm:text-[11px] font-medium ${isPositive ? 'text-brand-positive' : 'text-brand-negative'}`}
                >
                  {isPositive ? '+' : ''}
                  {formatPercentage(Math.abs(change7d))}
                </div>
              </Link>
            )}
          </MenuItem>
        );
      })}
    </>
  );
}
