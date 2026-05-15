import { InlineLoader } from 'components';

export default function ChartAndPriceSkeleton() {
  return (
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
  );
}
