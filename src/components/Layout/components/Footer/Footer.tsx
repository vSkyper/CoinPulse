import { CoinGeckoBadge, PoweredBySection } from './components';

export default function Footer() {
  return (
    <footer className='w-full bg-bg-primary relative z-10 mt-auto'>
      {/* Gradient Top Border */}
      <div className='absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-violet/30 to-transparent' />

      <div className='px-4 py-3 sm:py-6 flex items-center justify-center'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 w-full max-w-7xl mx-auto'>
          {/* Branding & Copyright */}
          <div className='flex flex-col items-center md:items-start gap-0.5'>
            <h3 className='text-sm sm:text-lg font-black tracking-tighter text-white'>
              COIN<span className='text-brand-violet'>PULSE</span>
            </h3>
            <p className='text-[0.55rem] sm:text-[0.65rem] text-white/30 font-medium uppercase tracking-wider'>
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Data Source & Badge */}
          <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-6'>
            <PoweredBySection />
            <div className='hidden sm:block w-px h-6 bg-white/5' />
            <CoinGeckoBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}
