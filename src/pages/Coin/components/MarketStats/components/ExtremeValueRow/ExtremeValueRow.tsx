import { PercentageBadge } from './components';
import { ExtremeValueRowProps } from './interface';
import { format } from 'date-fns';
import { formatCurrency } from 'utils/formatters';

export default function ExtremeValueRow({
  label,
  price,
  percentage,
  date,
  icon: Icon,
}: ExtremeValueRowProps) {
  return (
    <div className='flex flex-col h-full bg-white/2 backdrop-blur-2xl backdrop-saturate-150 border border-white/5 rounded-2xl p-3.5 overflow-hidden relative shadow-lg'>
      {/* Header */}
      <div className='flex justify-between items-start w-full mb-1'>
        <span className='text-[0.6rem] uppercase tracking-widest font-bold text-white/50'>
          {label}
        </span>
        {Icon && (
          <div className='text-white/20 p-1'>
            <Icon size={18} />
          </div>
        )}
      </div>

      {/* Main Content: Price & Badge Grouped */}
      <div className='flex flex-row items-center gap-2 mb-4'>
        <div className='font-bold text-lg sm:text-xl text-white tracking-tight'>
          {formatCurrency(price)}
        </div>
        <PercentageBadge value={percentage} />
      </div>

      {/* Footer: Date */}
      <div className='mt-auto pt-2 border-t border-white/5 flex items-center gap-1.5'>
        <div className='h-1.5 w-1.5 rounded-full bg-white/20' />
        <span className='text-[0.65rem] font-medium text-white/40'>
          Recorded {format(new Date(date), 'MMM d, y')}
        </span>
      </div>
    </div>
  );
}
