import { CoinGeckoBadge, PoweredBySection, GithubBadge } from './components';

export default function Footer() {
  return (
    <footer className='w-full relative z-10 mt-auto border-t border-white/5 bg-black/40'>
      <div className='px-4 py-4 sm:py-6 flex items-center justify-center'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-7xl mx-auto'>
          {/* Branding & Copyright */}
          {/* Branding & Copyright */}
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <div className='flex items-center gap-2'>
              <h3 className='flex items-center gap-0.5 text-lg font-black tracking-tighter text-white'>
                <span>COIN</span>
                <span className='text-brand-violet'>PULSE</span>
              </h3>
              <span className='px-1.5 py-0.5 rounded text-[0.5rem] bg-white/5 text-white/40 font-bold border border-white/5 uppercase tracking-wider'>
                Beta
              </span>
            </div>
            <p className='text-[0.6rem] sm:text-[0.65rem] text-white/30 font-medium uppercase tracking-wide'>
              © {new Date().getFullYear()} CoinPulse. All rights reserved.
            </p>
          </div>

          {/* Data Source & Badge */}
          <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300'>
            <PoweredBySection />
            <div className='hidden sm:block w-px h-4 bg-white/10' />
            <div className='flex items-center gap-4'>
              <CoinGeckoBadge />
              <GithubBadge />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
