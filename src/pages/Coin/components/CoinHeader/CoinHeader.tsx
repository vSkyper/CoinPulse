import { CoinHeaderProps } from './interface';

export default function CoinHeader({
  name,
  symbol,
  image,
  marketCapRank,
}: CoinHeaderProps) {
  return (
    <div className='mb-6 sm:mb-8 relative z-10'>
      <div className='flex items-center gap-4 sm:gap-4'>
        {/* Coin Image */}
        <div className='relative w-12! h-12! sm:w-14! sm:h-14! rounded-2xl shadow-dropdown border border-white/5 bg-white/2 p-1.5 sm:p-2 backdrop-blur-xl backdrop-saturate-150'>
          {image ? (
            <img
              src={image}
              alt={name}
              className='w-full h-full rounded-2xl object-cover'
            />
          ) : (
            <div className='w-full h-full rounded-2xl bg-white/5' />
          )}
        </div>

        {/* Coin Info */}
        <div className='flex flex-col gap-1 sm:gap-1'>
          <h1 className='text-2xl sm:text-2xl font-black text-white tracking-tighter leading-none drop-shadow-lg'>
            {name}
          </h1>

          <div className='flex items-center gap-2 sm:gap-2'>
            <span className='text-[0.65rem] sm:text-[0.65rem] font-bold text-white/60 uppercase tracking-widest bg-white/2 px-2 sm:px-2 py-0.5 sm:py-0.5 rounded-lg sm:rounded-md border border-white/5 transition-colors'>
              {symbol}
            </span>

            {marketCapRank && (
              <span className='text-[0.65rem] sm:text-[0.65rem] font-bold rounded-full sm:rounded-md px-2.5 sm:px-2 py-1 sm:py-0.5 backdrop-blur-md bg-brand-violet/10 border border-brand-violet/20 text-brand-violet tracking-wide shadow-glow-cyan-sm'>
                #{marketCapRank}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
