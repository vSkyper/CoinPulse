import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  TooltipContentProps,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ChartProps } from './interface';
import { formatCurrency } from 'utils/formatters';

const getTickFormat = (days: string, value: string): string => {
  switch (days) {
    case '1':
      return format(new Date(value), 'hh:mm a');
    case 'max':
      return format(new Date(value), 'yyyy');
    default:
      return format(new Date(value), 'MMM d');
  }
};

export default function ChartComponent({ sparkline, days }: ChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');

    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handler(mq);

    if ('addEventListener' in mq) {
      mq.addEventListener('change', handler);
    } else {
      // @ts-ignore
      mq.addListener(handler);
    }

    return () => {
      if ('removeEventListener' in mq) {
        mq.removeEventListener('change', handler);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
      }
    };
  }, []);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className='bg-black/80 border border-white/10 rounded-xl px-4 py-3 shadow-glass-lg backdrop-blur-xl'>
        <div className='text-[0.6rem] text-white/40 mb-1 font-bold uppercase tracking-wider'>
          {format(new Date(label ?? 0), 'MMM d, yyyy, hh:mm a')}
        </div>
        <div className='font-mono font-bold text-white text-base'>
          {formatCurrency(Number(payload[0].value))}
        </div>
      </div>
    );
  };

  const handleTickFormatterXAxis = (value: string) =>
    getTickFormat(days, value);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <AreaChart
          data={sparkline}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorViolet' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#8b5cf6' stopOpacity={0.4} />
              <stop offset='100%' stopColor='#8b5cf6' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            opacity={0.1}
            vertical={false}
            strokeDasharray='3 3'
            stroke='#ffffff'
          />

          <XAxis
            dataKey='date'
            axisLine={false}
            tickLine={false}
            tickFormatter={handleTickFormatterXAxis}
            hide={isMobile}
            minTickGap={30}
            tick={{
              fill: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
              fontWeight: 500,
            }}
            dy={10}
          />

          <YAxis
            dataKey='value'
            domain={['auto', 'auto']}
            axisLine={false}
            tickLine={false}
            tickCount={6}
            tickFormatter={(val) => `$${val.toLocaleString()}`}
            hide={isMobile}
            width={60}
            tick={{
              fill: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
              fontWeight: 500,
            }}
            dx={-10}
          />

          <Tooltip
            content={CustomTooltip}
            cursor={{
              stroke: 'rgba(255, 255, 255, 0.1)',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
          />

          <Area
            type='monotone'
            dataKey='value'
            stroke='#8b5cf6'
            strokeWidth={3}
            fill='url(#colorViolet)'
            activeDot={{
              r: 6,
              stroke: '#8b5cf6',
              strokeWidth: 0,
              fill: '#fff',
            }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
