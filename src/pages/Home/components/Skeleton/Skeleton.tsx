import { HeaderSkeleton, TableSkeleton, MarketHighlightsSkeleton } from './components';

export default function Skeleton() {
  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <div className='relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1'>
        {/* Global Header Skeleton */}
        <HeaderSkeleton />

        {/* Market Highlights Skeleton */}
        <MarketHighlightsSkeleton />

        {/* Table Skeleton */}
        <TableSkeleton />
      </div>
    </main>
  );
}
