import { motion } from 'framer-motion';
import { ButtonProps } from './interface';

export default function Button({
  days,
  daysFormatted,
  setDays,
  actualDays,
  mobileDisappear,
  layoutId,
}: ButtonProps) {
  const handleClick = () => {
    setDays(days);
  };

  const isActive = actualDays === days;

  const visibilityClass = mobileDisappear
    ? 'hidden sm:inline-flex'
    : 'inline-flex';

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`group relative min-w-10 sm:min-w-10 flex items-center justify-center font-bold select-none transition-colors duration-300 ease-out px-3 sm:px-2.5 py-1.5 sm:py-1 text-[0.65rem] sm:text-[0.65rem] tracking-wide rounded-lg sm:rounded-lg ${visibilityClass} ${
        isActive ? 'text-white' : 'text-white/50 hover:text-white'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className='absolute inset-0 bg-brand-violet shadow-glow-primary border border-white/20 rounded-lg sm:rounded-lg overflow-hidden'
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Shine effect */}
          <span className='absolute inset-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_infinite]' />
        </motion.div>
      )}

      {/* Hover background for inactive state */}
      {!isActive && (
        <div className='absolute inset-0 rounded-lg sm:rounded-lg bg-linear-to-b from-white/15 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/0 group-hover:border-white/10 shadow-glass-button group-hover:shadow-glass-button-hover' />
      )}

      <span className='relative z-10'>{daysFormatted}</span>
    </button>
  );
}
