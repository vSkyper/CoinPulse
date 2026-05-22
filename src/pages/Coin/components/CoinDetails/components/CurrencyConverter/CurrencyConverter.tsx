import { useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import { ErrorModal } from 'components';
import type { CurrencyConverterProps } from './interface';
import { CurrencyInput, CurrencyDropdown, ExchangeRateDisplay } from './components';
import { useCurrencyConverter } from './hooks';

export default function CurrencyConverter({
  id,
  symbol,
  image,
}: CurrencyConverterProps) {
  const [currencyOption, setCurrencyOption] = useState<string>('usd');

  const {
    currencies,
    currenciesError,
    exchangeRateError,
    cryptoAmount,
    currencyAmount,
    isLoadingRate,
    currentRate,
    lastUpdated,
    change24h,
    handleCryptoInputChange,
    handleCurrencyInputChange,
    handleRefresh,
  } = useCurrencyConverter(id, currencyOption);

  const handleChangeAutocomplete = (value: string | null) => {
    if (value) setCurrencyOption(value);
  };

  if (currenciesError || exchangeRateError) return <ErrorModal />;

  return (
    <div className="relative z-10 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/2 border border-white/5 shadow-highlight-neutral transition-all duration-300">
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
          <h3 className="text-[0.6rem] uppercase tracking-widest font-bold text-white/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shadow-glow-primary" />
            Converter
          </h3>
          <button
            onClick={handleRefresh}
            disabled={isLoadingRate}
            className="p-1.5 sm:p-2 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Refresh exchange rate"
          >
            <MdRefresh
              size={18}
              className={`transition-all duration-500 ${isLoadingRate ? 'animate-spin text-brand-violet' : 'group-hover:rotate-180'}`}
            />
          </button>
        </div>

        {/* Currency Input Grid */}
        <div className="flex flex-col gap-2 sm:gap-3 relative z-20">
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
            <CurrencyDropdown
              currencyOption={currencyOption}
              currencies={currencies}
              onChange={(value) => handleChangeAutocomplete(value)}
            />
          </CurrencyInput>
        </div>

        {/* Exchange Rate Display */}
        <ExchangeRateDisplay
          isLoadingRate={isLoadingRate}
          currentRate={currentRate}
          symbol={symbol}
          currencyOption={currencyOption}
          change24h={change24h}
          lastUpdated={lastUpdated}
        />
      </div>
    </div>
  );
}

