import { PercentageBadgeProps } from './interface';
import { formatPercentage } from 'utils/formatters';

export default function PercentageBadge({ value }: PercentageBadgeProps) {
  const isNegative = value < 0;
  const badgeClasses = isNegative
    ? 'border-brand-negative/30 bg-brand-negative/10 text-brand-negative shadow-glow-negative-sm'
    : 'border-brand-positive/30 bg-brand-positive/10 text-brand-positive shadow-glow-positive';

  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[0.6rem] sm:px-2 sm:py-0.5 sm:text-[0.65rem] font-bold rounded-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 border shadow-sm ${badgeClasses}`}
    >
      {value > 0 && '+'}
      {formatPercentage(value)}
    </span>
  );
}
