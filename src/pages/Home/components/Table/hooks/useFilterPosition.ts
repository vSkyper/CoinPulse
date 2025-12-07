import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

// Helper to check if element is in a fixed container
const isFixed = (element: HTMLElement | null): boolean => {
  let current = element;
  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    if (style.position === 'fixed' || style.position === 'sticky') {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};

export function useFilterPosition(
  isFilterOpen: boolean,
  anchorEl: HTMLElement | null,
  filterRef: React.RefObject<HTMLDivElement | null>
) {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    strategy: 'fixed' | 'absolute';
  } | null>(null);

  const calculatePosition = useCallback(
    (
      anchor: HTMLElement,
      panel: HTMLElement
    ): { top: number; left: number; strategy: 'fixed' | 'absolute' } => {
      const anchorRect = anchor.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const strategy = isFixed(anchor) ? 'fixed' : 'absolute';

      let top = anchorRect.bottom + 8;
      let left = 0;

      // Mobile: Center horizontally
      if (viewportWidth < 640) {
        left = (viewportWidth - panelRect.width) / 2;
      } else {
        // Desktop: Align right edge of panel with right edge of anchor
        left = anchorRect.right - panelRect.width;
      }

      // Add padding from top (navbar)
      let minTop = 0;
      if (viewportWidth < 640) {
        minTop = 60; // Mobile padding
      } else if (strategy === 'fixed') {
        minTop = 80; // Desktop sticky header padding
      }

      if (top < minTop) {
        top = minTop;
      }

      // Boundary checks
      if (left < 16) {
        left = 16;
      }

      if (left + panelRect.width > viewportWidth - 16) {
        left = viewportWidth - panelRect.width - 16;
      }

      // Check if panel goes off screen vertically
      if (top + panelRect.height > viewportHeight) {
        // Only flip if there is enough space above
        if (anchorRect.top > panelRect.height + 16) {
          top = anchorRect.top - panelRect.height - 8;
        }
      }

      // If absolute, add scroll offset
      if (strategy === 'absolute') {
        top += window.scrollY;
        left += window.scrollX;
      }

      return { top, left, strategy };
    },
    []
  );

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Update parent ref
      if (filterRef) {
        if (typeof filterRef === 'function') {
          (filterRef as any)(node);
        } else {
          (filterRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
        }
      }

      // Calculate position on mount/ref attach
      if (node && isFilterOpen && anchorEl) {
        setPosition(calculatePosition(anchorEl, node));
      }
    },
    [isFilterOpen, anchorEl, filterRef, calculatePosition]
  );

  useLayoutEffect(() => {
    if (isFilterOpen && anchorEl && filterRef.current) {
      setPosition(calculatePosition(anchorEl, filterRef.current));
    }
  }, [isFilterOpen, anchorEl, calculatePosition]);

  useEffect(() => {
    const handleResize = () => {
      if (isFilterOpen && anchorEl && filterRef.current) {
        setPosition(calculatePosition(anchorEl, filterRef.current));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFilterOpen, anchorEl, calculatePosition]);

  return { position, setRefs };
}
