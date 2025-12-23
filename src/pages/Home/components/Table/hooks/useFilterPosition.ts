import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

export function useFilterPosition(
  isFilterOpen: boolean,
  anchorEl: HTMLElement | null,
  filterRef: React.RefObject<HTMLDivElement | null>,
  isHeaderVisible: boolean
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
    ): { top: number; left: number; strategy: 'fixed' | 'absolute' } | null => {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 640;

      const anchorRect = anchor.getBoundingClientRect();
      // Use offsetWidth/Height to get dimensions ignoring transforms (like scale-95)
      const panelWidth = panel.offsetWidth;
      const panelHeight = panel.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Detect strategy based on anchor position
      // If anchor is fixed/sticky (header visible), use fixed positioning for panel
      // Otherwise use absolute positioning so it scrolls with the page
      const strategy = isHeaderVisible ? 'fixed' : 'absolute';

      // Gap calculation
      let gap = 8;
      if (strategy === 'fixed') {
        gap = isMobile ? 8 : 16;
      } else {
        gap = isMobile ? 12 : 12;
      }

      let top = anchorRect.bottom + gap;
      let left = 0;

      // Mobile: Center horizontally
      if (isMobile) {
        left = (viewportWidth - panelWidth) / 2;
        // Ensure minimum margin
        if (left < 16) left = 16;
      } else {
        // Desktop: Align right edge of panel with right edge of anchor
        left = anchorRect.right - panelWidth;

        // Boundary checks for desktop
        if (left < 16) {
          left = 16;
        }

        if (left + panelWidth > viewportWidth - 16) {
          left = viewportWidth - panelWidth - 16;
        }
      }

      // Add padding from top (navbar)
      let minTop = 0;
      if (strategy === 'fixed') {
        minTop = isMobile ? 60 : 16; // Desktop sticky header padding
      }

      if (top < minTop) {
        top = minTop;
      }

      // Check if panel goes off screen vertically
      if (top + panelHeight > viewportHeight) {
        // Only flip if there is enough space above
        if (anchorRect.top > panelHeight + 16) {
          top = anchorRect.top - panelHeight - 8;
        }
      }

      // If absolute, add scroll offset
      if (strategy === 'absolute') {
        top += window.scrollY;
        left += window.scrollX;
      }

      return { top, left, strategy };
    },
    [isHeaderVisible]
  );

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Update parent ref
      if (filterRef) {
        if (typeof filterRef === 'function') {
          (filterRef as any)(node);
        } else {
          (filterRef as React.RefObject<HTMLDivElement | null>).current = node;
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

  // Track position for a short duration when anchor changes (to handle animations)
  useEffect(() => {
    if (!isFilterOpen || !anchorEl || !filterRef.current) return;

    // Skip animation loop on mobile to improve performance
    if (window.innerWidth < 640) return;

    let startTime = performance.now();
    let frameId: number;

    const update = () => {
      const now = performance.now();
      if (now - startTime > 600) return; // Stop after 600ms

      if (anchorEl && filterRef.current) {
        const newPos = calculatePosition(anchorEl, filterRef.current);
        setPosition((prev) => {
          if (
            prev &&
            newPos &&
            prev.top === newPos.top &&
            prev.left === newPos.left &&
            prev.strategy === newPos.strategy
          ) {
            return prev;
          }
          return newPos;
        });
      }
      frameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(frameId);
  }, [isFilterOpen, anchorEl, calculatePosition]);

  useEffect(() => {
    const handleUpdate = () => {
      if (isFilterOpen && anchorEl && filterRef.current) {
        const newPos = calculatePosition(anchorEl, filterRef.current);
        setPosition((prev) => {
          if (
            prev &&
            newPos &&
            prev.top === newPos.top &&
            prev.left === newPos.left &&
            prev.strategy === newPos.strategy
          ) {
            return prev;
          }
          return newPos;
        });
      }
    };

    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isFilterOpen, anchorEl, calculatePosition]);

  return { position, setRefs };
}
