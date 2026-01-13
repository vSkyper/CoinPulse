import { InlineLoader } from 'components';

export default function Skeleton() {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <div className='relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1'>
        {/* Header skeleton */}
        <div className='mb-6 sm:mb-8 flex items-center gap-4 sm:gap-5'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/5 animate-pulse border border-white/5 ring-1 ring-white/5' />
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
            <div className='h-24 sm:h-20 rounded-2xl bg-white/5 animate-pulse border border-white/5' />

            {/* Price Change Grid */}
            <div className='grid grid-cols-3 gap-2 sm:gap-2'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className='h-20 sm:h-16 rounded-xl bg-white/5 animate-pulse border border-white/5'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats, Currency Converter & Links placeholders */}
        <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-6'>
          {/* Stats Grid */}
          <div className='sm:col-span-8'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3'>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className='h-24 sm:h-[72px] rounded-2xl bg-white/5 animate-pulse border border-white/5'
                />
              ))}
            </div>
          </div>

          {/* Currency Converter & Links */}
          <div className='sm:col-span-4 flex flex-col gap-6 sm:gap-3'>
            {/* Currency Converter */}
            <div className='h-75 sm:h-64 rounded-3xl sm:rounded-2xl bg-white/5 animate-pulse border border-white/5 flex items-center justify-center'>
              <InlineLoader text='Loading currency converter...' />
            </div>

            {/* Links */}
            <div className='space-y-4 sm:space-y-3 mt-4 sm:mt-2'>
              {/* Header with lines simulation */}
              <div className='flex items-center gap-4 sm:gap-3'>
                <div className='h-px flex-1 bg-white/5' />
                <div className='h-3 sm:h-2.5 w-24 sm:w-20 bg-white/5 rounded animate-pulse' />
                <div className='h-px flex-1 bg-white/5' />
              </div>

              <div className='flex flex-wrap gap-1.5 sm:gap-1.5'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className='h-8 sm:h-6 w-20 sm:w-16 rounded-lg bg-white/5 animate-pulse border border-white/5'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
