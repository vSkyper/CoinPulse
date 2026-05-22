import type { TooltipContentProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export default function LineTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-brand-dark/90 border border-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-xl backdrop-blur-md text-[10px] sm:text-xs min-w-28 sm:min-w-35">
      <p className="text-white/60 mb-1.5 sm:mb-2 font-medium border-b border-white/10 pb-1.5 sm:pb-2">
        {label || ''}
      </p>
      <div className="flex flex-col gap-0.5 sm:gap-1 font-mono">
        <div className="flex justify-between gap-3 sm:gap-4 items-center">
          <span className="text-white/50">Price:</span>
          <span className="text-brand-violet text-xs sm:text-sm font-bold">
            $
            {Number(payload[0].value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
