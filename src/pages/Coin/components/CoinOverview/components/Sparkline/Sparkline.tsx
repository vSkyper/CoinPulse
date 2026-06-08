import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { MdShowChart, MdCandlestickChart } from 'react-icons/md';
import { Button, LineChart, CandlestickChart } from './components';
import { InlineLoader } from 'components';
import type { SparklineResponse, OhlcResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { buttons } from 'constants/coin';
import type { SparklineProps } from './interface';
import { API_ENDPOINTS } from 'config/api';

const DEFAULT_DAYS = '7';

const formatSparklineData = (prices: number[][]) => {
  return prices.map((priceData) => ({
    date: format(new Date(priceData[0]), 'MMM d y, hh:mm:ss a'),
    value: priceData[1],
  }));
};

const formatCandlestickData = (ohlc: OhlcResponse) => {
  return ohlc.map((item) => ({
    date: format(new Date(item[0]), 'MMM d y, hh:mm:ss a'),
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
  }));
};

export default function Sparkline({ id }: SparklineProps) {
  const [days, setDays] = useState<string>(DEFAULT_DAYS);
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');

  const { data: lineData, error: lineError, isLoading: lineLoading } = useFetch<SparklineResponse>(
    chartType === 'line' ? API_ENDPOINTS.coinMarketChart(id, days) : undefined,
  );

  const { data: ohlcData, error: ohlcError, isLoading: ohlcLoading } = useFetch<OhlcResponse>(
    chartType === 'candlestick' ? API_ENDPOINTS.coinOhlc(id, days) : undefined,
  );

  const sparkline = lineData?.prices
    ? formatSparklineData(lineData.prices)
    : undefined;
  const candlestickData = ohlcData
    ? formatCandlestickData(ohlcData)
    : undefined;

  const isLoading =
    (chartType === 'line' && lineLoading) ||
    (chartType === 'candlestick' && ohlcLoading);

  const error = chartType === 'line' ? lineError : ohlcError;

  return (
    <>
      {/* Controls Container */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 w-full">
        {/* Chart Type Toggle */}
        <div className="flex w-full sm:w-auto gap-1 p-1 bg-white/2 rounded-xl border border-white/5 shadow-highlight-neutral">
          <button
            onClick={() => setChartType('line')}
            className={`group relative flex-1 sm:flex-none flex items-center justify-center font-bold select-none transition-colors duration-300 ease-out px-2 py-1.5 sm:px-3 sm:py-1.5 text-[0.65rem] sm:text-[0.65rem] tracking-wide rounded-lg sm:rounded-lg ${
              chartType === 'line'
                ? 'text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {chartType === 'line' && (
              <motion.div
                layoutId="chart-type-pill"
                className="absolute inset-0 bg-brand-violet shadow-glow-primary border border-white/20 rounded-lg sm:rounded-lg overflow-hidden"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="absolute inset-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_infinite]" />
              </motion.div>
            )}
            {chartType !== 'line' && (
              <div className="absolute inset-0 rounded-lg sm:rounded-lg bg-linear-to-b from-white/15 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/0 group-hover:border-white/10 shadow-glass-button group-hover:shadow-glass-button-hover" />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <MdShowChart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Line
            </span>
          </button>

          <button
            onClick={() => setChartType('candlestick')}
            className={`group relative flex-1 sm:flex-none flex items-center justify-center font-bold select-none transition-colors duration-300 ease-out px-2 py-1.5 sm:px-3 sm:py-1.5 text-[0.65rem] sm:text-[0.65rem] tracking-wide rounded-lg sm:rounded-lg ${
              chartType === 'candlestick'
                ? 'text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {chartType === 'candlestick' && (
              <motion.div
                layoutId="chart-type-pill"
                className="absolute inset-0 bg-brand-violet shadow-glow-primary border border-white/20 rounded-lg sm:rounded-lg overflow-hidden"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="absolute inset-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_infinite]" />
              </motion.div>
            )}
            {chartType !== 'candlestick' && (
              <div className="absolute inset-0 rounded-lg sm:rounded-lg bg-linear-to-b from-white/15 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/0 group-hover:border-white/10 shadow-glass-button group-hover:shadow-glass-button-hover" />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <MdCandlestickChart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Candlestick
            </span>
          </button>
        </div>

        {/* Time Period Buttons */}
        <div className="flex w-full sm:w-auto gap-1 sm:gap-1.5 p-1 sm:p-1 bg-white/2 rounded-xl sm:rounded-xl border border-white/5 shadow-highlight-neutral justify-between sm:justify-start">
          {buttons.map((button) => (
            <Button
              key={button.days}
              {...button}
              setDays={setDays}
              actualDays={days}
              layoutId="sparkline-pill"
            />
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full overflow-hidden sm:p-0 bg-transparent h-62.5 sm:h-112.5 transition-all duration-500 mt-4">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-transparent">
            <InlineLoader text="Loading chart..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent text-slate-400 gap-2">
            <p>Chart data unavailable</p>
          </div>
        )}

        {chartType === 'line' && sparkline && !error && (
          <LineChart sparkline={sparkline} days={days} />
        )}

        {chartType === 'candlestick' && candlestickData && !error && (
          <CandlestickChart data={candlestickData} days={days} />
        )}
      </div>
    </>
  );
}
