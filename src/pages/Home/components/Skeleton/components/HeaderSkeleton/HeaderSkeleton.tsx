export default function HeaderSkeleton() {
  return (
    <div className='mb-8 sm:mb-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-3'>
        <div className='flex-1 space-y-4 sm:space-y-2'>
          {/* Title */}
          <div className='h-8 sm:h-7 w-64 sm:w-72 bg-white/5 rounded-lg animate-pulse' />
          {/* Description */}
          <div className='space-y-2 sm:space-y-1.5'>
            <div className='h-4 sm:h-3.5 w-full max-w-2xl bg-white/5 rounded animate-pulse' />
            <div className='h-4 sm:h-3.5 w-full max-w-xl bg-white/5 rounded animate-pulse' />
          </div>
        </div>
        {/* Switch Button */}
        <div className='hidden sm:block'>
          <div className='h-10 sm:h-8 w-32 sm:w-28 bg-white/5 rounded-full animate-pulse' />
        </div>
      </div>
    </div>
  );
}
