export default function HeaderSkeleton() {
  return (
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
  );
}
