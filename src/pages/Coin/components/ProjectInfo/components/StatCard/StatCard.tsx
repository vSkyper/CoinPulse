import { formatNumber } from 'utils/formatters';
import { StatCardProps } from './interface';
import PropsTooltip from '../PropsTooltip';

export default function StatCard({
  icon: Icon,
  label,
  value,
  customValue,
  color,
  bg,
  disableTooltip,
}: StatCardProps) {
  const displayValue = customValue
    ? customValue
    : value
      ? formatNumber(value)
      : 'N/A';

  const content = (
    <div className='text-sm sm:text-sm font-bold text-white tracking-tight truncate'>
      {displayValue}
    </div>
  );

  return (
    <div className='bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-2.5 sm:p-2.5 shadow-highlight-neutral flex flex-col gap-0.5 sm:gap-1'>
      <div className='flex items-center justify-between opacity-80'>
        <span className='text-[0.55rem] sm:text-[0.5rem] font-bold uppercase tracking-widest text-white/40 truncate pr-1'>
          {label}
        </span>
        <div className={`p-0.5 sm:p-1 rounded-md ${bg} ${color}`}>
          <Icon className='w-3 h-3 sm:w-2.5 sm:h-2.5' />
        </div>
      </div>
      {disableTooltip ? (
        content
      ) : (
        <PropsTooltip content={displayValue}>{content}</PropsTooltip>
      )}
    </div>
  );
}
