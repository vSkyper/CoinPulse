import { useState, type ChangeEvent } from 'react';
import useFetch from 'hooks/useFetch';
import type { CryptoPriceResponse } from 'interfaces';
import { API_ENDPOINTS } from 'config/api';
import { formatToFullPrecision } from 'utils/formatters';
import BigNumber from 'bignumber.js';

export const useCurrencyConverter = (id: string, currencyOption: string) => {
  const [amount, setAmount] = useState<string>('');
  const [amountType, setAmountType] = useState<'crypto' | 'currency'>('crypto');

  const { data: currencies, error: currenciesError } = useFetch<string[]>(
    API_ENDPOINTS.supportedCurrencies(),
  );
  
  const {
    data: exchangeRate,
    error: exchangeRateError,
    refetch: refetchExchangeRate,
    isLoading: isLoadingRate,
  } = useFetch<CryptoPriceResponse>(
    API_ENDPOINTS.exchangeRate(id, currencyOption),
  );

  const currentRate = exchangeRate?.[id]?.[currencyOption];
  const lastUpdated = exchangeRate?.[id]?.last_updated_at;
  const change24h = exchangeRate?.[id]?.[`${currencyOption}_24h_change`];

  let cryptoAmount = '';
  let currencyAmount = '';

  if (amount) {
    if (amountType === 'crypto') {
      cryptoAmount = amount;
      if (currentRate && exchangeRate) {
        const rateBn = new BigNumber(currentRate);
        const cryptoBn = new BigNumber(amount);
        const currencyValue = cryptoBn.multipliedBy(rateBn);
        currencyAmount = !currencyValue.isNaN() ? formatToFullPrecision(currencyValue) : '';
      }
    } else {
      currencyAmount = amount;
      if (currentRate && exchangeRate) {
        const rateBn = new BigNumber(currentRate);
        const currencyBn = new BigNumber(amount);
        const cryptoValue = currencyBn.dividedBy(rateBn);
        cryptoAmount = !cryptoValue.isNaN() ? formatToFullPrecision(cryptoValue) : '';
      }
    }
  }

  const handleCryptoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setAmountType('crypto');
  };

  const handleCurrencyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setAmountType('currency');
  };

  const handleRefresh = () => {
    refetchExchangeRate();
  };

  return {
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
  };
};
