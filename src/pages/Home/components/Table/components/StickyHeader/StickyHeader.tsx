import { useEffect, useRef } from 'react';
import { StickyHeaderProps } from './interface';
import TableHeader from '../TableHeader';

export default function StickyHeader({
  table,
  handleFilterOpenFromMenu,
  scrollContainerRef,
  sorting,
  handleMenuOpen,
}: StickyHeaderProps) {
  const headerScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const headerContainer = headerScrollRef.current;

    if (!scrollContainer || !headerContainer) return;

    const handleSync = () => {
      headerContainer.scrollLeft = scrollContainer.scrollLeft;
    };

    scrollContainer.addEventListener('scroll', handleSync);
    // Sync immediately
    handleSync();

    return () => scrollContainer.removeEventListener('scroll', handleSync);
  }, [scrollContainerRef]);

  return (
    <div ref={headerScrollRef} className='w-full overflow-hidden'>
      <table className='w-full border-collapse border-spacing-0 table-fixed'>
        <TableHeader
          table={table}
          handleFilterOpenFromMenu={handleFilterOpenFromMenu}
          handleMenuOpen={handleMenuOpen}
          context='sticky'
          sorting={sorting}
        />
      </table>
    </div>
  );
}
