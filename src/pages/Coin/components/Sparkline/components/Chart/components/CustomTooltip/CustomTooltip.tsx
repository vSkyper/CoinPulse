import { format } from 'date-fns';
import { TooltipContentProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { formatCurrency } from 'utils/formatters';

export default function CustomTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className='bg-glass/80 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-3 shadow-glow-sm sm:shadow-popover transition-all duration-300'>
      <div className='text-[0.5rem] sm:text-[0.6rem] text-white/40 mb-0.5 sm:mb-1 font-bold uppercase tracking-wider'>
        {label ? format(new Date(label), 'MMM d, hh:mm a') : ''}
      </div>
      <div className='font-mono font-bold text-white text-xs sm:text-base'>
        {formatCurrency(Number(payload[0].value))}
      </div>
    </div>
  );
}
