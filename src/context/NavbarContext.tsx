import { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  headerContent: ReactNode | null;
  setHeaderContent: (content: ReactNode | null) => void;
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeaderContent] = useState<ReactNode | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        headerContent,
        setHeaderContent,
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
