import { StatRowProps } from './interface';

export default function StatRow({
  label,
  value,
  className = '',
  icon: Icon,
}: StatRowProps) {
  return (
    <>
      <div
        className={`relative overflow-hidden flex flex-col justify-between min-h-16 sm:min-h-[72px] p-4 sm:p-3 rounded-2xl bg-glass/40 backdrop-blur-xl backdrop-saturate-150 border border-white/10 ring-1 ring-white/5 shadow-dropdown transition-all duration-300 ${className}`}
      >
        {/* Decorative Watermark */}
        {Icon && (
          <div className='absolute -right-3 -bottom-3 text-white/5 rotate-[-15deg] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]'>
            <Icon size={80} />
          </div>
        )}

        <div className='relative z-10 text-[0.6rem] sm:text-[0.65rem] font-bold text-white/40 uppercase tracking-wider mb-1 sm:mb-1'>
          {label}
        </div>
        {typeof value === 'string' || typeof value === 'number' ? (
          <div className='relative z-10 text-sm sm:text-base font-bold text-white tracking-tight truncate w-full'>
            {value}
          </div>
        ) : (
          <div className='relative z-10'>{value}</div>
        )}
      </div>
      <div className='hidden' />
    </>
  );
}
