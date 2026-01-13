import { useState, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import useFetch from 'hooks/useFetch';
import { CryptoPriceResponse } from 'interfaces';
import { ErrorModal } from 'components';
import { CurrencyConverterProps } from './interface';
import { CurrencyInput } from './components';
import { API_ENDPOINTS } from 'config/api';
import { formatRateWithSuffix } from 'utils/formatters';

const MAX_DROPDOWN_ITEMS = 5;

export default function CurrencyConverter({
  id,
  symbol,
  image,
}: CurrencyConverterProps) {
  const [currencyOption, setCurrencyOption] = useState<string>('usd');
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [lastEditedField, setLastEditedField] = useState<'crypto' | 'currency'>(
    'crypto'
  );
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const { data: currencies, error: currenciesError } = useFetch<string[]>(
    API_ENDPOINTS.supportedCurrencies()
  );
  const { data: exchangeRate, error: exchangeRateError } =
    useFetch<CryptoPriceResponse>(
      API_ENDPOINTS.exchangeRate(id, currencyOption)
    );

  const currentRate = exchangeRate?.[id]?.[currencyOption];
  const lastUpdated = exchangeRate?.[id]?.last_updated_at;
  const change24h = exchangeRate?.[id]?.[`${currencyOption}_24h_change`];

  const formattedRate = currentRate
    ? formatRateWithSuffix(currentRate, currencyOption)
    : '';

  const [rateValue, rateSymbol] = formattedRate
    ? formattedRate.split(' ')
    : ['', ''];

  const filteredCurrencies = (currencies ?? [])
    .filter((c) => c.startsWith((query ?? currencyOption ?? '').toLowerCase()))
    .slice(0, MAX_DROPDOWN_ITEMS);

  // Handle loading state
  useEffect(() => {
    setIsLoadingRate(true);
  }, [currencyOption]);

  useEffect(() => {
    if (exchangeRate && exchangeRate[id]?.[currencyOption]) {
      setIsLoadingRate(false);
    }
  }, [exchangeRate, id, currencyOption]);

  // Sync calculations when exchange rate changes
  useEffect(() => {
    if (!exchangeRate || (!cryptoAmount && !currencyAmount)) return;

    const rate = exchangeRate[id]?.[currencyOption];
    if (!rate) return;

    if (lastEditedField === 'crypto' && cryptoAmount) {
      const currencyValue = Number(cryptoAmount) * rate;
      setCurrencyAmount(
        isFinite(currencyValue) ? currencyValue.toString() : ''
      );
    } else if (lastEditedField === 'currency' && currencyAmount) {
      const cryptoValue = Number(currencyAmount) / rate;
      setCryptoAmount(isFinite(cryptoValue) ? cryptoValue.toString() : '');
    }
  }, [
    exchangeRate,
    currencyOption,
    id,
    lastEditedField,
    cryptoAmount,
    currencyAmount,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredCurrencies.length > 0) {
        handleChangeAutocomplete(filteredCurrencies[0]);
      }

      // Dispatch Escape to ensure Combobox closes
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
        view: window,
      });
      event.currentTarget.dispatchEvent(escapeEvent);

      event.currentTarget.blur();
    }
  };

  useEffect(() => {
    setQuery('');
  }, [currencyOption]);

  const handleChangeAutocomplete = (value: string | null) => {
    if (value) setCurrencyOption(value);
  };

  const handleCryptoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCryptoAmount(value);
    setLastEditedField('crypto');

    if (value && exchangeRate) {
      const rate = exchangeRate[id]?.[currencyOption];
      if (rate) {
        const currencyValue = Number(value) * rate;
        setCurrencyAmount(
          isFinite(currencyValue) ? currencyValue.toString() : ''
        );
      }
    } else {
      setCurrencyAmount('');
    }
  };

  const handleCurrencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCurrencyAmount(value);
    setLastEditedField('currency');

    if (value && exchangeRate) {
      const rate = exchangeRate[id]?.[currencyOption];
      if (rate) {
        const cryptoValue = Number(value) / rate;
        setCryptoAmount(isFinite(cryptoValue) ? cryptoValue.toString() : '');
      }
    } else {
      setCryptoAmount('');
    }
  };

  if (currenciesError || exchangeRateError) return <ErrorModal />;

  return (
    <div className='relative z-10 p-5 rounded-3xl bg-white/2 backdrop-blur-2xl backdrop-saturate-150 border border-white/5 shadow-xl transition-all duration-300 overflow-hidden'>
      <div className='relative'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4 relative z-10'>
          <h3 className='text-[0.6rem] uppercase tracking-widest font-bold text-white/50'>
            Converter
          </h3>
        </div>

        {/* Currency Input Grid */}
        <div className='flex flex-col gap-3 relative z-20'>
          {/* Crypto Input */}
          <CurrencyInput
            label={symbol.toUpperCase()}
            symbol={symbol}
            value={cryptoAmount}
            image={image}
            onChange={handleCryptoInputChange}
          />

          {/* Fiat Currency Input with Combobox */}
          <CurrencyInput
            label={currencyOption.toUpperCase()}
            symbol={currencyOption}
            value={currencyAmount}
            onChange={handleCurrencyInputChange}
          >
            <div className='w-18 sm:w-19'>
              <Combobox
                value={currencyOption}
                onChange={handleChangeAutocomplete}
              >
                <div className='relative'>
                  <div className='relative flex items-center justify-between gap-1 group bg-white/2 hover:bg-white/4 px-2 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200 w-full focus-within:border-violet-500/30'>
                    <ComboboxInput
                      autoComplete='off'
                      className='w-full bg-transparent text-xs sm:text-sm font-bold uppercase focus:outline-none text-white tracking-wide cursor-pointer placeholder-white/20 selection:bg-violet-500/30'
                      displayValue={() => currencyOption.toUpperCase()}
                      enterKeyHint='done'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                    />
                    <ComboboxButton className='cursor-pointer p-0.5 rounded-md hover:bg-white/10 active:scale-95 transition-all duration-200'>
                      <HiChevronDown className='w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors duration-200 shrink-0' />
                    </ComboboxButton>
                  </div>

                  <Transition
                    as='div'
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    afterLeave={() => setQuery('')}
                  >
                    {filteredCurrencies.length > 0 && (
                      <ComboboxOptions
                        modal={false}
                        className='absolute top-full left-0 z-50 mt-1 max-h-40 w-24 overflow-auto rounded-xl bg-black/90 backdrop-blur-xl py-1 text-xs shadow-glass-lg focus:outline-none border border-white/10'
                      >
                        {filteredCurrencies.map((option) => (
                          <ComboboxOption
                            key={option}
                            value={option}
                            className={({ focus }) =>
                              `relative cursor-pointer select-none py-2 px-3 transition-all duration-200 ${
                                focus
                                  ? 'bg-white/10 text-white'
                                  : 'text-zinc-400'
                              }`
                            }
                          >
                            <span className='block truncate font-bold tracking-wide'>
                              {option.toUpperCase()}
                            </span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </Transition>
                </div>
              </Combobox>
            </div>
          </CurrencyInput>
        </div>

        {/* Exchange Rate Display */}
        <div className='flex items-center justify-between mt-4 px-1'>
          {/* Rate */}
          <div className='flex items-center gap-2'>
            <div className='text-[0.65rem] font-bold text-white/40 uppercase tracking-widest'>
              Rate
            </div>
            {isLoadingRate ? (
              <div className='animate-pulse h-3 w-12 bg-white/10 rounded' />
            ) : (
              currentRate && (
                <div className='flex items-center gap-1.5'>
                  <div className='font-medium text-xs text-white/80 flex items-center gap-1'>
                    <span>1 {symbol.toUpperCase()}</span>
                    <span className='text-white/30'>≈</span>
                    <span>
                      {rateValue} {rateSymbol}
                    </span>
                  </div>
                  {change24h !== undefined && change24h !== null && (
                    <span
                      className={`text-[0.6rem] font-bold ${
                        change24h >= 0
                          ? 'text-brand-positive'
                          : 'text-brand-negative'
                      }`}
                    >
                      {change24h >= 0 ? '+' : ''}
                      {change24h.toFixed(2)}%
                    </span>
                  )}
                </div>
              )
            )}
          </div>

          {/* Last Update */}
          <div className='text-[0.6rem] font-medium text-white/20'>
            {lastUpdated
              ? `Updated ${new Date(lastUpdated * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
