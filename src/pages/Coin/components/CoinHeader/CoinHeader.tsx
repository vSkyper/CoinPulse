import type { CoinHeaderProps } from './interface';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { useFavorites } from 'context/FavoritesContext';

export default function CoinHeader({
  id,
  name,
  symbol,
  image,
  marketCapRank,
}: CoinHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = id ? isFavorite(id) : false;

  return (
    <div className="mb-6 sm:mb-8 relative z-10">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Left container for Image and Info */}
        <div className="flex items-center gap-4 sm:gap-4">
          {/* Coin Image */}
          <div className="relative w-12! h-12! sm:w-14! sm:h-14! rounded-2xl shadow-highlight-neutral border border-white/5 bg-white/2 p-1.5 sm:p-2">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-white/5" />
            )}
          </div>

          {/* Coin Info */}
          <div className="flex flex-col gap-1 sm:gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-2xl font-black text-white tracking-tighter leading-none drop-shadow-text-lg">
                {name}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-2">
              <span className="text-[0.65rem] sm:text-[0.65rem] font-bold text-white/60 uppercase tracking-widest bg-white/2 px-2 sm:px-2 py-0.5 sm:py-0.5 rounded-lg sm:rounded-md border border-white/5 transition-colors">
                {symbol}
              </span>

              {marketCapRank && (
                <span className="text-[0.65rem] sm:text-[0.65rem] font-bold rounded-full sm:rounded-md px-2.5 sm:px-2 py-1 sm:py-0.5 bg-brand-violet/10 border border-brand-violet/20 text-brand-violet tracking-wide shadow-glow-primary">
                  #{marketCapRank}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right container for Favorite Button */}
        {id && (
          <button
            onClick={() => toggleFavorite(id)}
            className={`flex items-center justify-center p-1.5 sm:p-2 focus:outline-none rounded-lg sm:rounded-xl transition-all duration-300 border -translate-y-2 sm:translate-y-0 ${
              active
                ? 'bg-brand-violet/10 border-brand-violet/20 hover:bg-brand-violet/20 hover:scale-105 shadow-glow-primary'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'
            }`}
            title={active ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle Favorite"
          >
            {active ? (
              <MdStar className="text-brand-violet text-[1.2rem] sm:text-[1.5rem]" />
            ) : (
              <MdStarBorder className="text-white/60 hover:text-white/90 text-[1.2rem] sm:text-[1.5rem] transition-colors" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
