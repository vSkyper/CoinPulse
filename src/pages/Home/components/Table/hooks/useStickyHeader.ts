import { useEffect, useRef, useCallback } from 'react';
import { useNavbar } from 'context/NavbarContext';

export function useStickyHeader() {
  const { isHeaderVisible, setIsHeaderVisible } = useNavbar();
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    // Show sticky header when table top is near or past top of screen
    setIsHeaderVisible(rect.top < 30);
  }, [setIsHeaderVisible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsHeaderVisible(false);
    };
  }, [handleScroll, setIsHeaderVisible]);

  return {
    isHeaderVisible,
    tableRef,
    scrollContainerRef,
  };
}
