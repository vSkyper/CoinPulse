import { InlineLoader } from 'components';

export default function StatsAndLinksSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-6'>
      {/* Stats Grid */}
      <div className='sm:col-span-8 flex flex-col gap-4 sm:gap-4'>
        {/* Row 1: Hero Stats (3 cols) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-[90px] rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral'
            />
          ))}
        </div>

        {/* Row 2: Secondary Stats (4 cols) */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='h-[72px] rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral'
            />
          ))}
        </div>

        {/* Row 3: Range & Extreme Stats (3 cols) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-[72px] rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral'
            />
          ))}
        </div>
      </div>

      {/* Currency Converter & Links */}
      <div className='sm:col-span-4 flex flex-col gap-6 sm:gap-3'>
        {/* Currency Converter */}
        <div className='h-75 sm:h-64 rounded-3xl sm:rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral flex items-center justify-center'>
          <InlineLoader text='Loading currency converter...' />
        </div>

        {/* Links */}
        <div className='mt-4 sm:mt-2 p-4 sm:p-5 rounded-3xl bg-white/2 border border-white/5 shadow-highlight-neutral space-y-6 sm:space-y-6'>
          {/* Official Links */}
          <div className='space-y-3 sm:space-y-4'>
            <div className='h-3 sm:h-3 w-24 sm:w-24 bg-white/5 rounded animate-pulse' />
            <div className='flex flex-wrap gap-2.5 sm:gap-3'>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className='h-8 sm:h-8 w-24 sm:w-28 rounded-lg bg-white/5 animate-pulse border border-white/5'
                />
              ))}
            </div>
          </div>

          {/* Community */}
          <div className='space-y-3 sm:space-y-4'>
            <div className='h-3 sm:h-3 w-20 sm:w-20 bg-white/5 rounded animate-pulse' />
            <div className='flex flex-wrap gap-2.5 sm:gap-3'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='h-8 sm:h-8 w-24 sm:w-28 rounded-lg bg-white/5 animate-pulse border border-white/5'
                />
              ))}
            </div>
          </div>

          {/* Explorers */}
          <div className='space-y-3 sm:space-y-4'>
            <div className='h-3 sm:h-3 w-20 sm:w-20 bg-white/5 rounded animate-pulse' />
            <div className='flex flex-wrap gap-2.5 sm:gap-3'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-8 sm:h-8 w-32 sm:w-36 rounded-lg bg-white/5 animate-pulse border border-white/5'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
