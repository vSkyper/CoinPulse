import { MdStar, MdStarBorder } from 'react-icons/md';
import { useFavorites } from 'context/FavoritesContext';
import type { FavoriteButtonProps } from './interface';

export default function FavoriteButton({ id }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!id) return null;
  
  const active = isFavorite(id);

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className={`flex items-center justify-center p-1.5 sm:p-2 focus:outline-none rounded-lg sm:rounded-xl transition-all duration-300 border ${
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
  );
}
