import { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useFavorites } from 'context/FavoritesContext';
import useFetch from 'hooks/useFetch';
import { CoinsResponse } from 'interfaces';
import { API_ENDPOINTS } from 'config/api';
import { formatPercentage } from 'utils/formatters';

export default function FavoritesDropdown() {
  const { favorites } = useFavorites();

  // We only fetch when the dropdown might be opened or favorites change
  const queryUrl =
    favorites.length > 0
      ? API_ENDPOINTS.coinsMarkets({
          ids: favorites.join(','),
          price_change_percentage: '7d',
        })
      : undefined;

  const { data: coins, error } = useFetch<CoinsResponse[]>(queryUrl);

  return (
    <Menu as='div' className='relative inline-block text-left'>
      {({ open }) => {
        return (
          <>
            <div>
              <MenuButton
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 focus:outline-none ${
                  open || favorites.length > 0
                    ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/30'
                    : 'bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 border border-white/10'
                }`}
                title='Favorites'
              >
                <MdStar className='text-xl' />
              </MenuButton>
            </div>
            <Transition
              as={Fragment}
              show={open}
              enter='transition ease-out duration-200'
              enterFrom='transform opacity-0 scale-95 translate-y-2'
              enterTo='transform opacity-100 scale-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='transform opacity-100 scale-100 translate-y-0'
              leaveTo='transform opacity-0 scale-95 translate-y-2'
            >
              <MenuItems className='absolute right-0 mt-2 w-72 sm:w-80 origin-top-right rounded-2xl bg-glass/95 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 shadow-popover z-50 p-2 focus:outline-none max-h-96 overflow-y-auto custom-scrollbar'>
                <div className='px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-zinc-500'>
                  Your Favorites
                </div>

                {favorites.length === 0 ? (
                  <div className='px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-zinc-500'>
                    You haven't added any favorites yet.
                  </div>
                ) : !coins && !error ? (
                  <div className='px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-zinc-500'>
                    Loading favorites...
                  </div>
                ) : error ? (
                  <div className='px-3 py-6 sm:py-8 text-center text-[12px] sm:text-[13px] text-brand-negative'>
                    Failed to load favorites.
                  </div>
                ) : (
                  coins?.map((coin) => {
                    const change7d =
                      coin.price_change_percentage_7d_in_currency || 0;
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
                            <div className='flex items-center gap-2 sm:gap-2.5 min-w-0'>
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className='w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full object-cover bg-white/10'
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className='flex flex-col min-w-0'>
                                <span className='font-semibold text-[11px] sm:text-[13px] truncate text-white'>
                                  {coin.name}
                                </span>
                                <span className='text-[9px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-tight'>
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
                  })
                )}
              </MenuItems>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
}
