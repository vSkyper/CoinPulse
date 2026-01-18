import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

interface Position {
  top: number;
  left: number;
  strategy: 'fixed' | 'absolute';
}

function calculatePosition(
  anchor: HTMLElement,
  menu: HTMLElement,
  align: 'left' | 'right' = 'right',
  strategy: 'fixed' | 'absolute' = 'fixed',
): Position {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const anchorRect = anchor.getBoundingClientRect();
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;

  const isMobile = viewportWidth < 640;

  const gap = isMobile ? 14 : 16;

  let top = anchorRect.bottom + gap;
  let left = 0;

  if (align === 'right') {
    left = anchorRect.right - menuWidth;
  } else {
    left = anchorRect.left;
  }

  // Boundary checks
  // Right edge
  if (left + menuWidth > viewportWidth - 8) {
    left = viewportWidth - menuWidth - 8;
  }
  // Left edge
  if (left < 8) {
    left = 8;
  }

  // Bottom edge
  if (top + menuHeight > viewportHeight - 8) {
    // Flip up if space allows
    if (anchorRect.top > menuHeight + gap) {
      top = anchorRect.top - menuHeight - gap;
    } else {
      // Otherwise keep at bottom but cap it
      top = viewportHeight - menuHeight - 8;
    }
  }

  // If absolute, add scroll offset
  if (strategy === 'absolute') {
    top += window.scrollY;
    left += window.scrollX;
  }

  return { top, left, strategy };
}

export function useMenuPosition(
  isOpen: boolean,
  anchorEl: HTMLElement | null,
  menuRef: React.RefObject<HTMLDivElement | null>,
  align: 'left' | 'right' = 'right',
  strategy: 'fixed' | 'absolute' = 'fixed',
) {
  const [position, setPosition] = useState<Position | null>(null);

  const updatePosition = useCallback(() => {
    if (isOpen && anchorEl && menuRef.current) {
      const newPos = calculatePosition(
        anchorEl,
        menuRef.current,
        align,
        strategy,
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
  }, [isOpen, anchorEl, menuRef, align, strategy]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('resize', updatePosition);
    // Only listen to scroll for fixed strategy (to handle offsets)
    // For absolute, the element scrolls with the page naturally
    if (strategy === 'fixed') {
      window.addEventListener('scroll', updatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      if (strategy === 'fixed') {
        window.removeEventListener('scroll', updatePosition, true);
      }
    };
  }, [isOpen, updatePosition, strategy]);

  // Animation frame loop for smoother following during scroll/resize if needed
  // similar to useFilterPosition but maybe lighter
  useEffect(() => {
    if (!isOpen || !anchorEl || !menuRef.current) return;

    let frameId: number;
    const loop = () => {
      updatePosition();
      frameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, anchorEl, menuRef, updatePosition]);

  return position;
}
