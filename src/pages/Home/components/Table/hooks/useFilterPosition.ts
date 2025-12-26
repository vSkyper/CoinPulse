import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

interface Position {
  top: number;
  left: number;
  strategy: 'fixed' | 'absolute';
}

function calculatePosition(
  anchor: HTMLElement,
  panel: HTMLElement,
  isHeaderVisible: boolean
): Position {
  const viewportWidth = window.innerWidth;
  const isMobile = viewportWidth < 640;

  const anchorRect = anchor.getBoundingClientRect();
  const panelWidth = panel.offsetWidth;
  const panelHeight = panel.offsetHeight;
  const viewportHeight = window.innerHeight;

  const strategy = isHeaderVisible ? 'fixed' : 'absolute';

  // Gap calculation
  const gap = strategy === 'fixed' ? (isMobile ? 8 : 16) : isMobile ? 12 : 12;

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
    if (left < 16) left = 16;
    if (left + panelWidth > viewportWidth - 16) {
      left = viewportWidth - panelWidth - 16;
    }
  }

  // Add padding from top (navbar)
  const minTop = strategy === 'fixed' ? (isMobile ? 60 : 16) : 0;

  if (top < minTop) top = minTop;

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
}

export function useFilterPosition(
  isFilterOpen: boolean,
  anchorEl: HTMLElement | null,
  filterRef: React.RefObject<HTMLDivElement | null>,
  isHeaderVisible: boolean
) {
  const [position, setPosition] = useState<Position | null>(null);

  const updatePosition = useCallback(() => {
    if (isFilterOpen && anchorEl && filterRef.current) {
      const newPos = calculatePosition(
        anchorEl,
        filterRef.current,
        isHeaderVisible
      );
      setPosition((prev) => {
        if (
          prev &&
          prev.top === newPos.top &&
          prev.left === newPos.left &&
          prev.strategy === newPos.strategy
        ) {
          return prev;
        }
        return newPos;
      });
    }
  }, [isFilterOpen, anchorEl, filterRef, isHeaderVisible]);

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
      // Calculate initial position
      if (node) updatePosition();
    },
    [filterRef, updatePosition]
  );

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition]);

  // Track position for a short duration when anchor changes (to handle animations)
  useEffect(() => {
    if (!isFilterOpen || !anchorEl || !filterRef.current) return;
    // Skip animation loop on mobile to improve performance
    if (window.innerWidth < 640) return;

    let startTime = performance.now();
    let frameId: number;

    const loop = () => {
      const now = performance.now();
      if (now - startTime > 600) return;
      updatePosition();
      frameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frameId);
  }, [isFilterOpen, anchorEl, filterRef, updatePosition]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);

  return { position, setRefs };
}
