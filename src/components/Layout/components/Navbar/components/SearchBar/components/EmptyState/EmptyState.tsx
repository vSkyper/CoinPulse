import { MdSearchOff } from 'react-icons/md';

export default function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-6 px-4 text-center select-none'>
      {/* Icon Circle */}
      <div className='bg-white/5 rounded-full p-3 mb-3 border border-white/5 ring-1 ring-white/5'>
        <MdSearchOff className='w-5 h-5 text-zinc-500' />
      </div>

      {/* Main Text */}
      <p className='text-sm font-medium text-zinc-300 mb-1'>No results found</p>

      {/* Helper Text */}
      <p className='text-xs text-zinc-500'>
        We couldn't find any coin matching your search query.
      </p>
    </div>
  );
}
