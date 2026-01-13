import { StatRowProps } from './interface';

export default function StatRow({
  label,
  value,
  className = '',
  icon: Icon,
  variant = 'default',
}: StatRowProps) {
  const isHero = variant === 'hero';

  return (
    <div
      className={`relative overflow-hidden flex flex-col ${
        isHero ? 'justify-center' : 'justify-start'
      } gap-1 p-3.5 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 border ${
        isHero
          ? 'bg-linear-to-br from-violet-500/10 via-purple-500/5 to-white/5 border-violet-500/20 shadow-[0_8px_32px_rgba(124,58,237,0.1)]'
          : 'bg-white/2 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
      } ${className}`}
    >
      <div className='relative z-10 flex justify-between items-start w-full'>
        <div className='flex flex-col gap-1'>
          <span
            className={`uppercase tracking-widest font-bold ${
              isHero
                ? 'text-[0.6rem] text-violet-200/70'
                : 'text-[0.55rem] text-white/40'
            }`}
          >
            {label}
          </span>
        </div>

        {Icon && (
          <div
            className={`transition-colors duration-300 ${
              isHero ? 'text-violet-200/50' : 'text-white/20'
            }`}
          >
            <Icon size={isHero ? 20 : 16} />
          </div>
        )}
      </div>

      <div className='relative z-10 mt-1 pt-0'>
        {typeof value === 'string' || typeof value === 'number' ? (
          <div
            className={`font-bold tracking-tight text-white w-full truncate ${
              isHero ? 'text-lg sm:text-xl' : 'text-lg'
            }`}
          >
            {value}
          </div>
        ) : (
          <div className='relative z-10'>{value}</div>
        )}
      </div>
    </div>
  );
}
