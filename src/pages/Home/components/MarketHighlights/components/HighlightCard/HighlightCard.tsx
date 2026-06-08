import { Link } from 'react-router-dom';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatPercentage } from 'utils/formatters';
import type { HighlightCardProps } from './interface';

export default function HighlightCard({ coin, type }: HighlightCardProps) {
  const isGainer = type === 'gainer';
  const priceChange = coin.price_change_percentage_24h_in_currency || 0;

  const Icon = isGainer ? MdTrendingUp : MdTrendingDown;
  const colorClass = isGainer ? 'text-brand-positive' : 'text-brand-negative';
  const bgColorClass = isGainer
    ? 'bg-brand-positive/10'
    : 'bg-brand-negative/10';
  const borderColorClass = isGainer
    ? 'border-brand-positive/20'
    : 'border-brand-negative/20';
  const chartColor = isGainer
    ? 'var(--color-brand-positive)'
    : 'var(--color-brand-negative)';
  const gradientId = `highlightColor${coin.id}`;

  const prices = coin.sparkline_in_7d?.price || [];
  // Sample data to make chart lighter
  const sampledData = prices.filter(
    (_: number, index: number) => index % 2 === 0,
  );

  return (
    <Link
      to={`/coins/${coin.id}`}
      className="group relative flex flex-col p-3 sm:p-5 rounded-xl sm:rounded-3xl bg-white/2 hover:bg-white/5 border border-white/5 transition-all duration-300 overflow-hidden"
    >
      {/* Background Chart */}
      <div className="absolute right-0 bottom-0 w-2/3 sm:w-full h-12 sm:h-16 opacity-30 group-hover:opacity-60 transition-all duration-300 pointer-events-none overflow-hidden flex items-end [-webkit-mask-image:linear-gradient(to_right,transparent,black_30%)] mask-[linear-gradient(to_right,transparent,black_30%)] sm:[-webkit-mask-image:none] sm:mask-none">
        {sampledData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampledData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={(val) => val}
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
              <YAxis domain={['dataMin', 'dataMax']} hide />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-20 sm:max-w-30">
              {coin.name}
            </span>
            <span className="text-[8px] sm:text-[10px] font-medium text-white/50 uppercase tracking-widest">
              {coin.symbol}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${bgColorClass} ${borderColorClass} border shrink-0`}
        >
          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${colorClass}`} />
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between mt-auto">
        <span className="text-xs sm:text-base font-bold text-white">
          {formatCurrency(coin.current_price, true)}
        </span>
        <span className={`text-[10px] sm:text-sm font-bold ${colorClass}`}>
          {isGainer ? '+' : ''}
          {formatPercentage(Math.abs(priceChange))}
        </span>
      </div>
    </Link>
  );
}
