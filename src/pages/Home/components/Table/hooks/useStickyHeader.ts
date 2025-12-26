import { useEffect, useRef } from 'react';
import { useNavbar } from 'context/NavbarContext';

export function useStickyHeader() {
  const { isHeaderVisible, setIsHeaderVisible } = useNavbar();
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;
      const rect = tableRef.current.getBoundingClientRect();
      setIsHeaderVisible(rect.top < 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsHeaderVisible(false);
    };
  }, [setIsHeaderVisible]);

  return {
    isHeaderVisible,
    tableRef,
    scrollContainerRef,
  };
}
