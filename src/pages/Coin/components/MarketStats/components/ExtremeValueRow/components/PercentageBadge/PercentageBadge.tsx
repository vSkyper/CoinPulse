import { PercentageBadgeProps } from './interface';
import { formatPercentage } from 'utils/formatters';

export default function PercentageBadge({ value }: PercentageBadgeProps) {
  const isNegative = value < 0;

  // Simple text styling to match CurrencyConverter
  const colorClass = isNegative ? 'text-brand-negative' : 'text-brand-positive';

  return (
    <span className={`font-bold text-sm ${colorClass}`}>
      {value > 0 && '+'}
      {formatPercentage(value)}
    </span>
  );
}
