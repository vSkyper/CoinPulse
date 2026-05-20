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
    <div className="bg-brand-dark/90 border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs min-w-35">
      <p className="text-white/60 mb-2 font-medium border-b border-white/10 pb-2">
        {label || ''}
      </p>
      <div className="flex flex-col gap-1 font-mono">
        <div className="flex justify-between gap-4 items-center">
          <span className="text-white/50">Price:</span>
          <span className="text-brand-violet text-sm font-bold">
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
