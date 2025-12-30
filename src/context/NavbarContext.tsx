import { createContext, useContext, useState, ReactNode } from 'react';
import { CoinsListResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { API_ENDPOINTS } from 'config/api';

interface NavbarContextType {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
  coinsData?: CoinsListResponse[];
  coinsError?: Error;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const { data, error } = useFetch<CoinsListResponse[]>(
    API_ENDPOINTS.coinsList()
  );

  return (
    <NavbarContext.Provider
      value={{
        isHeaderVisible,
        setIsHeaderVisible,
        coinsData: data,
        coinsError: error,
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
