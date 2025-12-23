import { StatRowProps } from './interface';

export default function StatRow({
  label,
  value,
  className = '',
}: StatRowProps) {
  return (
    <>
      <div
        className={`flex flex-col justify-between min-h-20 sm:min-h-22.5 p-4 sm:p-4 rounded-2xl bg-glass/60 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-dropdown transition-all duration-300 ${className}`}
      >
        <div className='text-[0.6rem] sm:text-[0.65rem] font-bold text-white/40 uppercase tracking-wider mb-1 sm:mb-1.5'>
          {label}
        </div>
        {typeof value === 'string' || typeof value === 'number' ? (
          <div className='text-sm sm:text-base font-bold text-white tracking-tight'>
            {value}
          </div>
        ) : (
          value
        )}
      </div>
      <div className='hidden' />
    </>
  );
}
