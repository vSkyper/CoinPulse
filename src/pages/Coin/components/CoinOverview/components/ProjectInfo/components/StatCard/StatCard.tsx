import { formatNumber } from 'utils/formatters';
import type { StatCardProps } from './interface';
import { Tooltip } from 'components';

export default function StatCard({
  icon: Icon,
  label,
  value,
  customValue,
  color,
  bg,
  disableTooltip,
  fullValue,
}: StatCardProps & { fullValue?: string | number }) {
  const displayValue = customValue
    ? customValue
    : value
      ? formatNumber(value)
      : 'N/A';

  const content = (
    <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
      {displayValue}
    </div>
  );

  return (
    <div className="bg-white/2 border border-white/5 rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-highlight-neutral flex flex-col gap-0.5 sm:gap-1 min-w-0">
      <div className="flex items-center justify-between opacity-80 gap-1.5 sm:gap-2">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 truncate pr-1">
          {label}
        </span>
        <div className={`p-0.5 sm:p-1 rounded-md ${bg} ${color} shrink-0`}>
          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </div>
      </div>
      {disableTooltip ? (
        content
      ) : (
        <Tooltip content={fullValue !== undefined ? fullValue : displayValue}>
          {content}
        </Tooltip>
      )}
    </div>
  );
}
