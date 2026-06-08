import type { StatRowProps } from './interface';
import { Tooltip } from 'components';

export default function StatRow({
  label,
  value,
  className = '',
  icon: Icon,
  variant = 'default',
  fullValue,
}: StatRowProps & { fullValue?: string | number }) {
  const isHero = variant === 'hero';

  return (
    <div
      className={`relative overflow-hidden flex flex-col ${
        isHero ? 'justify-center' : 'justify-start'
      } gap-1 px-2.5 py-1.5 sm:px-3 sm:py-3.5 rounded-xl sm:rounded-2xl border ${
        isHero
          ? 'bg-linear-to-br from-brand-violet/10 via-brand-violet/5 to-transparent border-brand-violet/30 shadow-highlight-violet'
          : 'bg-linear-to-b from-white/3 to-transparent border-white/5 shadow-highlight-neutral'
      } ${className}`}
    >
      <div className="relative z-10 flex justify-between items-center w-full">
        <span
          className={`uppercase tracking-widest font-bold truncate pr-2 ${
            isHero
              ? 'text-[0.55rem] sm:text-[0.6rem] text-brand-violet-light/80'
              : 'text-[0.5rem] sm:text-[0.55rem] text-white/50'
          }`}
        >
          {label}
        </span>

        {Icon && (
          <div
            className={`p-1 rounded-md sm:rounded-lg ${
              isHero
                ? 'text-brand-violet-light bg-brand-violet/20 shadow-glow-primary'
                : 'text-white/30 bg-white/5'
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-0.5 sm:mt-1 pt-0">
        {typeof value === 'string' || typeof value === 'number' ? (
          <Tooltip
            value={value}
            content={fullValue !== undefined ? fullValue : value}
            className={`font-black tracking-tight truncate text-left focus:outline-none cursor-pointer ${
              isHero
                ? 'text-[15px] sm:text-xl text-brand-violet-light drop-shadow-glow-sm'
                : 'text-sm sm:text-lg text-white/90 drop-shadow-text-md'
            }`}
          />
        ) : (
          <div className="relative z-10">{value}</div>
        )}
      </div>
    </div>
  );
}
