import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CoinsListResponse, CoinsResponse } from 'interfaces';
import { useNavbar } from 'context/NavbarContext';

const BLUR_DELAY = 100;

export const useSearchBar = () => {
  const [selectedCoin, setSelectedCoin] = useState<
    CoinsResponse | CoinsListResponse | null
  >(null);

  const navigate = useNavigate();
  const {
    searchQuery: query,
    setSearchQuery: setQuery,
    filteredCoins,
    isLoading,
    error,
  } = useNavbar();

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

  const handleKeyDownInput = (event: KeyboardEvent<HTMLInputElement>) => {
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

  return {
    selectedCoin,
    query,
    setQuery,
    filteredCoins,
    isLoading,
    error,
    handleChange,
    handleBlur,
    displayValue,
    handleKeyDownInput,
  };
};
