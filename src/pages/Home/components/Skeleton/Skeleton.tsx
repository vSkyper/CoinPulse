import { HeaderSkeleton, TableSkeleton } from './components';

export default function Skeleton() {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <div className='relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1'>
        {/* Global Header Skeleton */}
        <HeaderSkeleton />

        {/* Table Skeleton */}
        <TableSkeleton />
      </div>
    </main>
  );
}
