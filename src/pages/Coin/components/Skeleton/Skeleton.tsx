import { InlineLoader } from 'components';

export default function Skeleton() {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <div className='relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1'>
        {/* Header skeleton */}
        <div className='mb-6 sm:mb-8 flex items-center gap-4 sm:gap-4'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral' />
          <div className='flex flex-col gap-2 sm:gap-1.5'>
            <div className='h-8 sm:h-8 w-32 sm:w-40 bg-white/5 rounded-lg animate-pulse' />
            <div className='flex gap-2 sm:gap-2'>
              <div className='h-5 sm:h-5 w-12 sm:w-14 bg-white/5 rounded-md animate-pulse' />
              <div className='h-5 sm:h-5 w-12 sm:w-14 bg-white/5 rounded-md animate-pulse' />
            </div>
          </div>
        </div>

        {/* Chart & Price Card placeholders */}
        <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-4'>
          {/* Chart Section */}
          <div className='sm:col-span-8'>
            {/* Time buttons skeleton - Single pill container */}
            <div className='flex justify-end mb-4 sm:mb-3'>
              <div className='h-8 w-64 bg-white/5 rounded-lg animate-pulse border border-white/5' />
            </div>
            {/* Chart area - Transparent container */}
            <div className='h-62.5 sm:h-112.5 flex items-center justify-center'>
              <InlineLoader text='Loading chart...' />
            </div>
          </div>

          {/* Price Card Section */}
          <div className='sm:col-span-4 space-y-6 sm:space-y-4'>
            {/* Price */}
            <div className='h-10 sm:h-10 w-48 sm:w-40 bg-white/5 rounded-xl animate-pulse' />

            {/* Range Bar */}
            <div className='h-24 sm:h-20 rounded-2xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral' />

            {/* Price Change Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className='h-20 sm:h-16 rounded-xl bg-white/2 animate-pulse border border-white/5 shadow-highlight-neutral'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats, Currency Converter & Links placeholders */}
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
      </div>
    </main>
  );
}
