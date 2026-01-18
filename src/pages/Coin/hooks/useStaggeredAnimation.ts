import { useEffect, useState } from 'react';

interface AnimationState {
  [key: string]: boolean;
}

interface AnimationConfig {
  [key: string]: number;
}

export const useStaggeredAnimation = (
  config: AnimationConfig,
  shouldAnimate: boolean = true
): AnimationState => {
  const initialState = Object.keys(config).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as AnimationState);

  const [animations, setAnimations] = useState<AnimationState>(initialState);

  useEffect(() => {
    if (!shouldAnimate) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    Object.entries(config).forEach(([key, delay]) => {
      const timer = setTimeout(() => {
        setAnimations((prev) => ({ ...prev, [key]: true }));
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [shouldAnimate, config]);

  return animations;
};

export default useStaggeredAnimation;
