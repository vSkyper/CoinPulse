import { useState, useEffect } from 'react';
import { MdArrowDownward, MdOutlineKeyboardArrowDown } from 'react-icons/md';
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

  // Reset query when currency changes
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
    <div className='relative z-10 p-4 sm:p-5 rounded-3xl bg-bg-glass/60 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-dropdown'>
      <div>
        {/* Header */}
        <div className='flex items-center justify-between mb-3 sm:mb-5'>
          <h3 className='text-lg sm:text-xl font-black text-white tracking-tighter'>
            Currency Converter
          </h3>
        </div>

        {/* Currency Input Grid */}
        <div className='flex flex-col items-center justify-center'>
          {/* Crypto Input */}
          <CurrencyInput
            label={symbol.toUpperCase()}
            symbol={symbol}
            value={cryptoAmount}
            image={image}
            onChange={handleCryptoInputChange}
          />

          {/* Swap Icon */}
          <div className='flex items-center justify-center text-white/20 mx-auto my-1 sm:my-2'>
            <MdArrowDownward size={25} />
          </div>

          {/* Fiat Currency Input with Combobox */}
          <CurrencyInput
            label={currencyOption.toUpperCase()}
            symbol={currencyOption}
            value={currencyAmount}
            onChange={handleCurrencyInputChange}
          >
            <div className='w-14 sm:w-16'>
              <Combobox
                value={currencyOption}
                onChange={handleChangeAutocomplete}
              >
                <div className='relative flex items-center'>
                  <ComboboxInput
                    className='w-full bg-transparent text-xs sm:text-sm font-bold uppercase focus:outline-none pr-6 text-white/95 tracking-wide'
                    displayValue={() => currencyOption.toUpperCase()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.target.value)
                    }
                  />
                  <ComboboxButton className='absolute right-0 p-1'>
                    <MdOutlineKeyboardArrowDown />
                  </ComboboxButton>

                  <Transition
                    as='div'
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    {filteredCurrencies.length > 0 && (
                      <ComboboxOptions
                        modal={false}
                        anchor='bottom start'
                        className='z-20 mt-2 max-h-48 sm:max-h-60 w-18 sm:w-20 overflow-auto rounded-xl bg-bg-surface py-1 text-xs sm:text-sm shadow-xl ring-1 ring-black/5 focus:outline-none border border-white/10 backdrop-blur-xl'
                      >
                        {filteredCurrencies.map((option) => (
                          <ComboboxOption
                            key={option}
                            value={option}
                            className={({ focus }) =>
                              `relative cursor-default select-none py-1.5 sm:py-2.5 px-3 sm:px-4 transition-colors ${
                                focus
                                  ? 'bg-white/10 text-white'
                                  : 'text-white/70'
                              }`
                            }
                          >
                            <span className='block truncate font-bold'>
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
        <div className='flex flex-col gap-2 mt-3 sm:mt-5'>
          <div className='flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 bg-black/20 text-white/60 font-mono text-[0.6rem] sm:text-[0.65rem] font-bold tracking-wide uppercase'>
            {isLoadingRate ? (
              <div className='animate-spin h-[18px] w-[18px] border-2 border-white/10 border-t-brand-violet rounded-full' />
            ) : (
              currentRate && (
                <div className='flex items-center gap-2'>
                  <div className='font-semibold text-xs sm:text-sm'>
                    1{' '}
                    <span className='text-brand-violet'>
                      {symbol.toUpperCase()}
                    </span>{' '}
                    ≈ {rateValue}{' '}
                    <span className='text-brand-violet'>{rateSymbol}</span>
                  </div>
                  {change24h !== undefined && change24h !== null && (
                    <div
                      className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold border ${
                        change24h >= 0
                          ? 'bg-brand-positive/10 text-brand-positive border-brand-positive/20'
                          : 'bg-brand-negative/10 text-brand-negative border-brand-negative/20'
                      }`}
                    >
                      {change24h >= 0 && '+'}
                      {change24h.toFixed(2)}%
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className='text-center text-[10px] sm:text-xs text-white/40 font-medium min-h-5 flex items-center justify-center'>
            {lastUpdated ? (
              `Last updated: ${new Date(lastUpdated * 1000).toLocaleString()}`
            ) : isLoadingRate ? (
              <span className='animate-pulse'>Updating...</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
