import { SearchBar, Title } from './components';
import { useNavbar } from 'context/NavbarContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const { isHeaderVisible } = useNavbar();

  return (
    <div className='grow'>
      <nav
        className={`fixed top-2 sm:top-4 left-0 right-0 mx-auto z-110 pointer-events-none transition-all duration-300 ${
          isHeaderVisible
            ? 'container px-4 sm:px-8'
            : 'w-[calc(100%-1rem)] sm:w-[calc(100%-3rem)] max-w-7xl'
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
                className='mx-auto w-full bg-glass/60 backdrop-blur-md backdrop-saturate-150 border border-white/10 shadow-popover rounded-xl sm:rounded-2xl z-10 relative'
              >
                <div className='container mx-auto px-1 sm:px-2'>
                  <div className='flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-2.5 relative z-10'>
                    {/* Left Section */}
                    <div className='flex items-center justify-center sm:justify-start shrink-0 sm:flex-1 min-w-auto gap-1 sm:gap-4'>
                      <Title />
                    </div>

                    {/* Search Section */}
                    <div className='grow sm:grow-0 min-w-0 mx-1.5 sm:mx-6 w-full max-w-125'>
                      <SearchBar />
                    </div>

                    {/* Spacer for centering */}
                    <div className='hidden sm:block sm:flex-1' />
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
