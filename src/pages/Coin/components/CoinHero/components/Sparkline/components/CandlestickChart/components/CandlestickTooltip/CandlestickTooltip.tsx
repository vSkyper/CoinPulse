import type { CandlestickData } from 'interfaces';
import type { TooltipContentProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export default function CandlestickTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    // payload[0].payload contains the original data object
    const data = payload[0].payload as CandlestickData;
    const isBullish = data.close > data.open;
    const colorClass = isBullish ? 'text-[var(--color-brand-positive)]' : 'text-[var(--color-brand-negative)]';

    return (
      <div className="bg-brand-dark/90 border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs min-w-35">
        <p className="text-white/60 mb-2 font-medium border-b border-white/10 pb-2">
          {label || ''}
        </p>
        <div className="flex flex-col gap-1 font-mono">
          <div className="flex justify-between gap-4">
            <span className="text-white/50">O:</span>
            <span className={colorClass}>
              $
              {data.open.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">H:</span>
            <span className="text-white/90">
              $
              {data.high.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">L:</span>
            <span className="text-white/90">
              $
              {data.low.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">C:</span>
            <span className={colorClass}>
              $
              {data.close.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
