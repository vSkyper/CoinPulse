import { PercentageBadge } from './components';
import { ExtremeValueRowProps } from './interface';
import { format, formatDistance } from 'date-fns';
import { formatCurrency } from 'utils/formatters';

const formatDateWithDistance = (date: string | number | Date) => {
  const dateObj = new Date(date);
  return `${format(dateObj, 'MMM d, y')} (${formatDistance(
    Date.now(),
    dateObj
  )} ago)`;
};

export default function ExtremeValueRow({
  label,
  price,
  percentage,
  date,
  icon: Icon,
}: ExtremeValueRowProps) {
  return (
    <>
      <div className='relative overflow-hidden flex flex-col justify-between min-h-20 sm:min-h-[96px] p-4 sm:p-3 rounded-2xl bg-glass/40 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-dropdown transition-all duration-300'>
        {/* Decorative Watermark */}
        {Icon && (
          <div className='absolute -right-3 -bottom-3 text-white/5 rotate-[-15deg] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]'>
            <Icon size={80} />
          </div>
        )}

        <div className='relative z-10 text-[0.6rem] sm:text-[0.65rem] font-bold text-white/40 uppercase tracking-wider mb-1 sm:mb-1'>
          {label}
        </div>
        <div className='relative z-10 flex flex-col items-end w-full mt-auto'>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 justify-end w-full'>
            <div className='font-bold text-white text-sm sm:text-base text-right truncate max-w-full'>
              {formatCurrency(price)}
            </div>
            <PercentageBadge value={percentage} />
          </div>
          <div className='text-[0.55rem] sm:text-[0.6rem] font-medium text-white/40 text-right mt-1.5 leading-tight'>
            {formatDateWithDistance(date)}
          </div>
        </div>
      </div>
      <div className='hidden' />
    </>
  );
}
