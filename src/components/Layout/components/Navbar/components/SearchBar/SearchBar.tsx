import { Fragment } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Transition,
} from '@headlessui/react';
import { ErrorModal } from 'components';
import { CoinOption, EmptyState, SearchIconContainer } from './components';
import { useSearchBar } from './hooks';

export default function SearchBar() {
  const {
    selectedCoin,
    query,
    setQuery,
    filteredCoins,
    isLoading,
    isSearchLoading,
    error,
    handleChange,
    handleBlur,
    displayValue,
    handleKeyDownInput,
  } = useSearchBar();

  if (error) return <ErrorModal />;

  const placeholder = !isLoading ? 'Search coins...' : 'Loading coins...';

  return (
    <Combobox value={selectedCoin} onChange={handleChange}>
      {({ open }) => (
        <div className='relative w-full group'>
          <ComboboxButton
            as='div'
            className='relative transform transition-transform duration-300 w-full'
          >
            <SearchIconContainer isLoading={isLoading} />

            <ComboboxInput
              className='w-full bg-white/7 backdrop-blur-xl border border-white/8 text-white rounded-xl sm:rounded-2xl py-1.5 sm:py-2 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-[15px] font-medium tracking-wide placeholder:text-zinc-500 transition-all duration-300 outline-none focus:outline-none focus:bg-white/12 focus:border-white/20 focus:ring-1 focus:ring-white/20 hover:bg-white/12 hover:border-white/20'
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
            show={open && (filteredCoins.length > 0 || query !== '')}
            enter='transition duration-200 ease-out'
            enterFrom='transform scale-95 opacity-0 translate-y-2'
            enterTo='transform scale-100 opacity-100 translate-y-0'
            leave='transition duration-150 ease-in'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-2'
          >
            <ComboboxOptions
              modal={false}
              className={`absolute mt-2 w-full overflow-hidden rounded-2xl bg-glass/95 border border-white/10 ring-1 ring-white/5 shadow-popover z-50 p-2 ${
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
                      <CoinOption
                        coin={coin}
                        isFocused={focus}
                        isSearchLoading={isSearchLoading}
                      />
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
