import { useState, useEffect } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');

    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handler(mq);

    if ('addEventListener' in mq) {
      mq.addEventListener('change', handler);
    } else {
      // @ts-ignore
      mq.addListener(handler);
    }

    return () => {
      if ('removeEventListener' in mq) {
        mq.removeEventListener('change', handler);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
      }
    };
  }, []);

  return { isMobile };
};
