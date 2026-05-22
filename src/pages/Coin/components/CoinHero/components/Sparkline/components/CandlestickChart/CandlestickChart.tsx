import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Brush,
  ResponsiveContainer,
} from 'recharts';
import type { CandlestickChartProps } from './interface';
import { CustomCandlestick, CandlestickTooltip, CustomTraveller } from './components';
import { useMobile } from '../hooks';
import { getTickFormat } from '../utils';



export default function CandlestickChart({
  data,
  days,
}: CandlestickChartProps) {
  const { isMobile } = useMobile();

  const handleTickFormatterXAxis = (value: string) =>
    getTickFormat(days, value);

  // Map the data so Recharts can scale the Bar to cover the [low, high] range.
  const chartData = data.map((item) => ({
    ...item,
    range: [item.low, item.high],
  }));

  // Calculate domain min/max with a small 5% padding
  const minValue = Math.min(...data.map((d) => d.low));
  const maxValue = Math.max(...data.map((d) => d.high));
  const padding = (maxValue - minValue) * 0.05 || maxValue * 0.01 || 0.01;

  return (
    <div className="w-full h-full touch-pan-y">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            opacity={0.1}
            vertical={false}
            strokeDasharray="3 3"
            stroke="#ffffff"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={handleTickFormatterXAxis}
            hide={false}
            minTickGap={30}
            tick={{
              fill: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
              fontWeight: 500,
            }}
            dy={10}
          />

          <YAxis
            domain={[minValue - padding, maxValue + padding]}
            axisLine={false}
            tickLine={false}
            tickCount={6}
            tickFormatter={(val) => `$${val.toLocaleString()}`}
            hide={isMobile}
            width={80}
            tick={{
              fill: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
              fontWeight: 500,
            }}
            dx={-10}
          />

          <Tooltip
            content={CandlestickTooltip}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />

          <Bar
            dataKey="range"
            shape={<CustomCandlestick />}
            isAnimationActive={false}
          />

          <Brush
            dataKey="date"
            height={24}
            stroke="rgba(255,255,255,0.1)"
            fill="rgba(255, 255, 255, 0.02)"
            tickFormatter={handleTickFormatterXAxis}
            travellerWidth={16}
            traveller={<CustomTraveller />}
            className="text-[9px] sm:text-[10px] font-medium opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
