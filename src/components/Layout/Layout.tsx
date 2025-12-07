import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { NavbarProvider } from 'context/NavbarContext';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <NavbarProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </NavbarProvider>
  );
}
