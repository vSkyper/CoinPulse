import { useState, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Transition,
} from '@headlessui/react';
import { CoinsListResponse, CoinsResponse } from 'interfaces';
import { ErrorModal } from 'components';
import { CoinOption, EmptyState, SearchIconContainer } from './components';
import { useNavbar } from 'context/NavbarContext';

const BLUR_DELAY = 100;

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<
    CoinsResponse | CoinsListResponse | null
  >(null);

  const navigate = useNavigate();
  const { allCoins, popularCoins, error } = useNavbar();

  const filteredCoins = useMemo(() => {
    if (query === '') {
      return (popularCoins || []).slice(0, 7);
    }

    const searchResults = (allCoins || [])
      .filter(
        (coin) =>
          coin.name.toLowerCase().startsWith(query.toLowerCase()) ||
          coin.symbol.toLowerCase().startsWith(query.toLowerCase()),
      )
      .slice(0, 50);

    const marketMap = new Map<string, CoinsResponse>();
    (popularCoins || []).forEach((coin) => marketMap.set(coin.id, coin));

    return searchResults.map((coin) => {
      const richData = marketMap.get(coin.id);
      return richData || coin;
    });
  }, [query, allCoins, popularCoins]);

  const handleChange = (coin: CoinsResponse | CoinsListResponse | null) => {
    if (!coin) return;
    setSelectedCoin(null);
    setQuery('');
    navigate(`/coins/${coin.id}`);
  };

  const handleBlur = () => {
    setTimeout(() => setQuery(''), BLUR_DELAY);
  };

  const displayValue = (coin: CoinsResponse | CoinsListResponse | null) =>
    coin ? `${coin.name} (${coin.symbol?.toUpperCase()})` : '';

  if (error) return <ErrorModal />;

  const placeholder = allCoins ? 'Search coins...' : 'Loading coins...';

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('');
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredCoins.length > 0) {
        const firstResult = filteredCoins[0];
        handleChange(firstResult);
        event.currentTarget.blur();
      }
    }
  };

  return (
    <Combobox value={selectedCoin} onChange={handleChange}>
      {({ open }) => (
        <div className='relative w-full group'>
          <ComboboxButton
            as='div'
            className='relative transform transition-transform duration-300 w-full'
          >
            <SearchIconContainer isLoading={!allCoins && !popularCoins} />

            <ComboboxInput
              className='w-full bg-white/7 backdrop-blur-xl border border-white/8 text-white rounded-2xl py-2 pl-12 pr-4 text-[15px] font-medium tracking-wide placeholder:text-zinc-500 transition-all duration-300 outline-none focus:outline-none focus:bg-white/12 focus:border-white/20 focus:ring-1 focus:ring-white/20 hover:bg-white/12 hover:border-white/20'
              placeholder={placeholder}
              displayValue={displayValue}
              enterKeyHint='go'
              onChange={(event) => setQuery(event.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDownInput}
            />
          </ComboboxButton>

          <Transition
            as={Fragment}
            show={open && filteredCoins.length > 0}
            enter='transition duration-200 ease-out'
            enterFrom='transform scale-95 opacity-0 translate-y-2'
            enterTo='transform scale-100 opacity-100 translate-y-0'
            leave='transition duration-150 ease-in'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-2'
          >
            <ComboboxOptions
              modal={false}
              className={`absolute mt-2 w-full overflow-hidden rounded-2xl bg-glass/95 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 shadow-popover z-50 p-2 ${
                query === '' ? '' : 'max-h-80 overflow-y-auto custom-scrollbar'
              }`}
            >
              <div className='px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-zinc-500'>
                {query === '' ? 'Popular tokens' : 'Search results'}
              </div>

              {filteredCoins.length === 0 && query !== '' ? (
                <EmptyState />
              ) : (
                filteredCoins.map((coin) => (
                  <ComboboxOption
                    key={coin.id}
                    value={coin}
                    className='relative cursor-pointer select-none rounded-xl transition-all duration-200 bg-transparent'
                  >
                    {({ focus }) => (
                      <CoinOption coin={coin} isFocused={focus} />
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
