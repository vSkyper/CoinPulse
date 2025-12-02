const COINGECKO_URL = 'https://www.coingecko.com';

export default function PoweredBySection() {
  return (
    <div className='flex flex-col items-center sm:items-end gap-0 sm:gap-0.5'>
      <span className='text-[0.65rem] sm:text-sm font-medium text-white/50 tracking-wide'>
        Data provided by{' '}
        <a
          href={COINGECKO_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-white/90 font-bold hover:text-brand-violet transition-colors duration-300'
        >
          CoinGecko
        </a>
      </span>
      <div className='flex items-center gap-1.5'>
        <span className='relative flex h-1.5 w-1.5'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500'></span>
        </span>
        <span className='text-[0.55rem] sm:text-[0.65rem] text-white/30 uppercase tracking-widest font-bold'>
          Real-time API
        </span>
      </div>
    </div>
  );
}
