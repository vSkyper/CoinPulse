import React from 'react';
import { SearchBar, Title } from './components';
import { useNavbar } from 'context/NavbarContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const { isHeaderVisible } = useNavbar();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='grow'>
      <nav
        className={`fixed top-2 sm:top-4 left-0 right-0 mx-auto z-110 pointer-events-none transition-all duration-300 ${
          isHeaderVisible
            ? 'container px-4 sm:px-8'
            : 'w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl'
        }`}
      >
        <div className='pointer-events-auto'>
          <AnimatePresence>
            {!isHeaderVisible && (
              <motion.div
                key='navbar-default'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0, position: 'absolute' }}
                transition={{ duration: 0.3 }}
                className='mx-auto w-full z-10 relative'
              >
                <div
                  className={`flex items-center justify-between px-4 sm:px-6 py-2 transition-all duration-300 ${
                    isScrolled
                      ? 'bg-glass/60 backdrop-blur-md border border-white/5 rounded-2xl shadow-lg'
                      : 'bg-transparent border-transparent'
                  }`}
                >
                  {/* Left Section: Logo */}
                  <div className='flex items-center gap-4 sm:gap-8'>
                    <Title />
                  </div>

                  {/* Right Section: Search Bar */}
                  <div className='flex-1 max-w-2xl ml-6 sm:mx-4'>
                    <SearchBar />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key='navbar-header'
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: isHeaderVisible ? 0 : -20,
              opacity: isHeaderVisible ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`mx-auto w-full bg-glass/60 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-popover rounded-xl sm:rounded-2xl ${
              isHeaderVisible ? 'relative z-20' : 'absolute top-0 left-0 -z-10'
            }`}
            style={{ pointerEvents: isHeaderVisible ? 'auto' : 'none' }}
          >
            <div id='sticky-header-portal' />
          </motion.div>
        </div>
      </nav>

      {/* Spacer */}
      <div className='h-24 sm:h-32' />
    </div>
  );
}
