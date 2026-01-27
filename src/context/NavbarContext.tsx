import { createContext, useContext, useState, ReactNode } from 'react';
import { CoinsListResponse, CoinsResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { API_ENDPOINTS } from 'config/api';

interface NavbarContextType {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  allCoins?: CoinsListResponse[];
  popularCoins?: CoinsResponse[];
  isLoading: boolean;
  error?: Error;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch full list for search
  const { data: allCoins, error: listError } = useFetch<CoinsListResponse[]>(
    API_ENDPOINTS.coinsList(),
  );

  // Fetch top 250 for "Popular" section and rich data lookup
  const { data: popularCoins, error: marketError } = useFetch<CoinsResponse[]>(
    API_ENDPOINTS.coinsMarkets({ per_page: 250 }),
  );

  const listLoading = !allCoins && !listError;
  const marketLoading = !popularCoins && !marketError;

  return (
    <NavbarContext.Provider
      value={{
        isHeaderVisible,
        setIsHeaderVisible,
        isConnected,
        setIsConnected,
        allCoins,
        popularCoins,
        isLoading: listLoading || marketLoading,
        error: listError || marketError,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
