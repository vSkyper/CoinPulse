import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type { CoinsListResponse, CoinsResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { useDebounce } from 'hooks/useDebounce';
import { API_ENDPOINTS } from 'config/api';

interface NavbarContextType {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCoins: (CoinsResponse | CoinsListResponse)[];
  isLoading: boolean;
  isSearchLoading: boolean;
  error?: Error;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch full list for search
  const { data: allCoins, error: listError, isLoading: isAllCoinsLoading } = useFetch<CoinsListResponse[]>(
    API_ENDPOINTS.coinsList(),
  );

  // Fetch top 7 for "Popular" section default
  const { data: popularCoins, error: marketError, isLoading: isPopularLoading } = useFetch<CoinsResponse[]>(
    API_ENDPOINTS.coinsMarkets({ per_page: 7 }),
  );

  // Derive fast basic search results synchronously so UI updates instantly
  const basicSearchResults = useMemo(() => {
    if (!searchQuery || !allCoins) return [];
    const queryLower = searchQuery.toLowerCase();
    return allCoins
      .filter(
        (coin) =>
          coin.name.toLowerCase().startsWith(queryLower) ||
          coin.symbol.toLowerCase().startsWith(queryLower),
      )
      .slice(0, 50);
  }, [searchQuery, allCoins]);

  // Debounce the list of IDs needing rich data
  const targetIds = useMemo(
    () => basicSearchResults.map((c) => c.id).join(','),
    [basicSearchResults],
  );
  const debouncedIds = useDebounce(targetIds, 400);

  // Only fetch rich data for debounced IDs
  const { data: richSearchData, error: richError, isLoading: isRichLoading } = useFetch<CoinsResponse[]>(
    debouncedIds
      ? API_ENDPOINTS.coinsMarkets({ ids: debouncedIds })
      : undefined,
  );

  // Map everything together
  const filteredCoins = useMemo(() => {
    if (!searchQuery) return popularCoins || [];

    const richMap = new Map<string, CoinsResponse>();
    (popularCoins || []).forEach((c) => richMap.set(c.id, c));
    (richSearchData || []).forEach((c) => richMap.set(c.id, c));

    return basicSearchResults.map((basic) => richMap.get(basic.id) || basic);
  }, [searchQuery, basicSearchResults, richSearchData, popularCoins]);

  const isLoading = isAllCoinsLoading || isPopularLoading;
  const isSearchLoading =
    searchQuery.length > 0 &&
    (debouncedIds !== targetIds || isRichLoading);
  const combinedError = listError || marketError || richError;

  return (
    <NavbarContext.Provider
      value={{
        isHeaderVisible,
        setIsHeaderVisible,
        isConnected,
        setIsConnected,
        searchQuery,
        setSearchQuery,
        filteredCoins,
        isLoading,
        isSearchLoading,
        error: combinedError,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
