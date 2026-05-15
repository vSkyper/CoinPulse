import { useState, useEffect, type ChangeEvent } from 'react';
import useFetch from 'hooks/useFetch';
import type { CryptoPriceResponse } from 'interfaces';
import { API_ENDPOINTS } from 'config/api';
import { formatToFullPrecision } from 'utils/formatters';
import BigNumber from 'bignumber.js';

export const useCurrencyConverter = (id: string, currencyOption: string) => {
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [lastEditedField, setLastEditedField] = useState<'crypto' | 'currency'>(
    'crypto',
  );
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  const { data: currencies, error: currenciesError } = useFetch<string[]>(
    API_ENDPOINTS.supportedCurrencies(),
  );
  const {
    data: exchangeRate,
    error: exchangeRateError,
    refetch: refetchExchangeRate,
  } = useFetch<CryptoPriceResponse>(
    API_ENDPOINTS.exchangeRate(id, currencyOption),
  );

  const currentRate = exchangeRate?.[id]?.[currencyOption];
  const lastUpdated = exchangeRate?.[id]?.last_updated_at;
  const change24h = exchangeRate?.[id]?.[`${currencyOption}_24h_change`];

  useEffect(() => {
    setIsLoadingRate(true);
  }, [currencyOption]);

  useEffect(() => {
    if (exchangeRate && exchangeRate[id]?.[currencyOption]) {
      setIsLoadingRate(false);
    }
  }, [exchangeRate, id, currencyOption]);

  useEffect(() => {
    if (!exchangeRate || (!cryptoAmount && !currencyAmount)) return;

    const rate = exchangeRate[id]?.[currencyOption];
    if (!rate) return;

    if (lastEditedField === 'crypto' && cryptoAmount) {
      const rateBn = new BigNumber(rate);
      const cryptoBn = new BigNumber(cryptoAmount);
      const currencyValue = cryptoBn.multipliedBy(rateBn);
      setCurrencyAmount(
        !currencyValue.isNaN() ? formatToFullPrecision(currencyValue) : '',
      );
    } else if (lastEditedField === 'currency' && currencyAmount) {
      const rateBn = new BigNumber(rate);
      const currencyBn = new BigNumber(currencyAmount);
      const cryptoValue = currencyBn.dividedBy(rateBn);
      setCryptoAmount(
        !cryptoValue.isNaN() ? formatToFullPrecision(cryptoValue) : '',
      );
    }
  }, [
    exchangeRate,
    currencyOption,
    id,
    lastEditedField,
    cryptoAmount,
    currencyAmount,
  ]);

  const handleCryptoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCryptoAmount(value);
    setLastEditedField('crypto');

    if (value && value !== '.' && exchangeRate) {
      const rate = exchangeRate[id]?.[currencyOption];
      if (rate) {
        const rateBn = new BigNumber(rate);
        const valueBn = new BigNumber(value);
        const currencyValue = valueBn.multipliedBy(rateBn);
        setCurrencyAmount(
          !currencyValue.isNaN() ? formatToFullPrecision(currencyValue) : '',
        );
      }
    } else {
      setCurrencyAmount('');
    }
  };

  const handleCurrencyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrencyAmount(value);
    setLastEditedField('currency');

    if (value && value !== '.' && exchangeRate) {
      const rate = exchangeRate[id]?.[currencyOption];
      if (rate) {
        const rateBn = new BigNumber(rate);
        const valueBn = new BigNumber(value);
        const cryptoValue = valueBn.dividedBy(rateBn);
        setCryptoAmount(
          !cryptoValue.isNaN() ? formatToFullPrecision(cryptoValue) : '',
        );
      }
    } else {
      setCryptoAmount('');
    }
  };

  const handleRefresh = () => {
    setIsLoadingRate(true);
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
