import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import { CoinsListResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { ErrorModal } from 'components';
import { CoinOption, EmptyState, SearchIconContainer } from './components';
import { API_ENDPOINTS } from 'config/api';

const MAX_RESULTS = 8;
const BLUR_DELAY = 100;

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<CoinsListResponse | null>(
    null
  );

  const navigate = useNavigate();
  const { data, error } = useFetch<CoinsListResponse[]>(
    API_ENDPOINTS.coinsList()
  );

  const filteredCoins =
    query === ''
      ? []
      : (data || [])
          .filter((coin) =>
            coin.name.toLowerCase().startsWith(query.toLowerCase())
          )
          .slice(0, MAX_RESULTS);

  const handleChange = (coin: CoinsListResponse | null) => {
    if (!coin) return;
    setSelectedCoin(null);
    setQuery('');
    navigate(`/coins/${coin.id}`);
  };

  const handleBlur = () => {
    setTimeout(() => setQuery(''), BLUR_DELAY);
  };

  const displayValue = (coin: CoinsListResponse | null) =>
    coin ? `${coin.name} (${coin.symbol?.toUpperCase()})` : '';

  if (error) return <ErrorModal />;

  const hasQuery = query.length > 0;
  const placeholder = data ? 'Search coins...' : 'Loading coins...';

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
      <div className='relative w-full group'>
        <div className='relative transform transition-transform duration-300'>
          <SearchIconContainer isLoading={!data} />

          <ComboboxInput
            className='w-full bg-glass/20 backdrop-blur-md text-white rounded-xl py-2 pl-10 pr-4 text-sm font-medium tracking-wide placeholder:text-zinc-500 transition-all duration-300 outline-none focus:outline-none focus:bg-glass/40 focus:ring-1 focus:ring-brand-violet/40 hover:bg-glass/40 border border-white/10 hover:border-white/20 ring-1 ring-white/5 shadow-lg shadow-black/20'
            placeholder={placeholder}
            displayValue={displayValue}
            enterKeyHint='go'
            onChange={(event) => setQuery(event.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDownInput}
          />
        </div>

        <Transition
          as={Fragment}
          show={hasQuery}
          enter='transition duration-200 ease-out'
          enterFrom='transform scale-95 opacity-0 translate-y-2'
          enterTo='transform scale-100 opacity-100 translate-y-0'
          leave='transition duration-150 ease-in'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-2'
        >
          <ComboboxOptions
            modal={false}
            className='absolute mt-3 w-full overflow-hidden rounded-2xl bg-glass/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 p-1.5'
          >
            {filteredCoins.length === 0 ? (
              <EmptyState />
            ) : (
              filteredCoins.map((coin) => (
                <ComboboxOption
                  key={coin.id}
                  value={coin}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none rounded-xl transition-all duration-200 ${
                      focus ? 'bg-brand-violet/10' : 'bg-transparent'
                    }`
                  }
                >
                  {({ focus }) => <CoinOption coin={coin} isFocused={focus} />}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
}
