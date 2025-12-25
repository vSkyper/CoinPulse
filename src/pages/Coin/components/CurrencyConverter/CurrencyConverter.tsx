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
    <div className='relative z-10 p-5 sm:p-5 rounded-3xl bg-linear-to-br from-glass/80 via-glass/60 to-glass/40 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-dropdown'>
      {/* Background Decor */}
      <div className='absolute inset-0 overflow-hidden rounded-3xl pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-48 h-48 bg-brand-violet/20 blur-[80px] rounded-full pointer-events-none opacity-50' />
        <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-brand-violet-light/10 blur-[80px] rounded-full pointer-events-none opacity-50' />
      </div>

      <div className='relative'>
        {/* Header */}
        <div className='flex items-center justify-between mb-5 sm:mb-5 relative z-10'>
          <h3 className='text-lg sm:text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/60 tracking-tighter'>
            Converter
          </h3>
        </div>

        {/* Currency Input Grid */}
        <div className='flex flex-col gap-2 relative z-20'>
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
                  <div className='relative flex items-center justify-between gap-1 sm:gap-1 group bg-white/5 hover:bg-white/10 px-2 sm:px-2 py-1.5 sm:py-1 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 w-full focus-within:border-brand-violet/40'>
                    <ComboboxInput
                      autoComplete='off'
                      className='w-full bg-transparent text-xs sm:text-sm font-black uppercase focus:outline-none text-white tracking-wide cursor-pointer placeholder-white/30 selection:bg-brand-violet/40'
                      displayValue={() => currencyOption.toUpperCase()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(e.target.value)
                      }
                    />
                    <ComboboxButton className='cursor-pointer p-0.5 sm:p-0.5 rounded-md sm:rounded-lg hover:bg-white/10 active:scale-95 transition-all duration-200'>
                      <HiChevronDown className='w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 text-white/50 group-hover:text-white/80 transition-colors duration-200 shrink-0' />
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
                        className='absolute top-full left-0 z-50 mt-1 max-h-40 sm:max-h-48 w-18 sm:w-19 overflow-auto rounded-xl bg-surface-elevated/95 backdrop-blur-xl py-1 text-[0.65rem] sm:text-xs shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] focus:outline-none border border-white/5'
                      >
                        {filteredCurrencies.map((option) => (
                          <ComboboxOption
                            key={option}
                            value={option}
                            className={({ focus }) =>
                              `relative cursor-pointer select-none py-2 sm:py-1.5 px-3 transition-all duration-200 ${
                                focus
                                  ? 'bg-brand-violet/10 text-white'
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
        <div className='flex flex-col gap-1.5 mt-2.5 sm:mt-3 relative z-10'>
          <div className='flex items-center justify-between px-1 sm:px-1 py-0 min-h-[36px] sm:min-h-[40px]'>
            <div className='text-[0.6rem] sm:text-[0.65rem] font-bold text-white/50 uppercase tracking-wider'>
              Exchange Rate
            </div>

            {isLoadingRate ? (
              <div className='flex items-center gap-2'>
                <div className='animate-spin h-3 w-3 border-2 border-white/10 border-t-brand-violet rounded-full' />
              </div>
            ) : (
              currentRate && (
                <div className='flex items-center gap-1.5 sm:gap-2'>
                  <div className='font-bold text-[0.65rem] sm:text-xs text-white flex items-center gap-1'>
                    <span>1</span>
                    <span className='text-brand-violet font-black'>
                      {symbol.toUpperCase()}
                    </span>
                    <span className='text-white/40'>≈</span>
                    <span>{rateValue}</span>
                    <span className='text-brand-violet font-black'>
                      {rateSymbol}
                    </span>
                  </div>
                  {change24h !== undefined && change24h !== null && (
                    <div
                      className={`px-1 py-0.5 rounded text-[0.55rem] sm:text-[0.6rem] font-black border backdrop-blur-md ${
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

          <div className='text-right text-[9px] sm:text-[9px] text-white/30 font-medium min-h-[14px]'>
            {lastUpdated
              ? `Updated: ${new Date(lastUpdated * 1000).toLocaleString()}`
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
