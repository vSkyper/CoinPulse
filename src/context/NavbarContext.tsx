import { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        isHeaderVisible,
        setIsHeaderVisible,
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
