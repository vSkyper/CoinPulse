import { useState, useEffect } from 'react';
import {
  MdTrendingUp as TrendingUpIcon,
  MdTrendingDown as TrendingDownIcon,
} from 'react-icons/md';
import { StatCardProps } from './interface';

export default function StatCard({
  config,
  toggle,
  className = '',
}: Omit<StatCardProps, 'isMobile'>) {
  const [show, setShow] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toggle) {
      setIsExiting(false);
      const timer = setTimeout(() => setShow(true), config.timeout);
      return () => clearTimeout(timer);
    } else {
      setIsExiting(true);
      const reverseDelay = 400 - config.timeout;
      const timer = setTimeout(() => setShow(false), reverseDelay);
      return () => clearTimeout(timer);
    }
  }, [toggle, config.timeout]);

  const hasPercentage = !!config.percentage;
  const isNegative = config.percentage ? config.percentage.change < 0 : false;

  const animationClasses = show
    ? 'opacity-100 scale-100 translate-y-0 blur-0'
    : isExiting
    ? 'opacity-0 scale-95 translate-y-4 blur-[2px]'
    : 'opacity-0 scale-90 -translate-y-8 blur-[4px]';

  const TrendIcon = isNegative ? TrendingDownIcon : TrendingUpIcon;

  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${animationClasses} ${className}`}
      style={{
        transitionDelay: show ? `${config.timeout}ms` : '0ms',
      }}
    >
      <div className='flex flex-col justify-center items-center relative overflow-hidden transition-all duration-300 bg-white/2 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-3 sm:p-4 border border-white/5 shadow-dropdown group'>
        <div className='flex flex-col gap-2 sm:gap-1.5 w-full items-center relative z-10'>
          <div className='flex items-center justify-center gap-2 sm:gap-2'>
            {/* Mobile value - shorter */}
            {config.mobileValue && (
              <h3 className='block sm:hidden text-lg font-bold text-white text-center wrap-break-word'>
                {config.mobileValue}
              </h3>
            )}
            {/* Desktop value - full */}
            <h3
              className={
                config.mobileValue
                  ? 'hidden sm:block text-lg font-bold text-white text-center wrap-break-word tracking-tight drop-shadow-sm'
                  : 'text-lg font-bold text-white text-center wrap-break-word tracking-tight drop-shadow-sm'
              }
            >
              {config.value}
            </h3>

            {hasPercentage && config.percentage && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold ${
                  config.percentage.change >= 0
                    ? 'text-brand-positive'
                    : 'text-brand-negative'
                }`}
              >
                {config.percentage.change >= 0 && '+'}
                {config.percentage.value}
                <TrendIcon size={12} />
              </span>
            )}
          </div>
        </div>

        <p className='mt-1 text-[0.6rem] sm:text-[0.6rem] text-white/40 font-bold text-center uppercase tracking-widest transition-colors'>
          {config.label}
        </p>
      </div>
    </div>
  );
}
