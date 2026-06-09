import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { RoiCalculatorProps } from './interface';
import { formatCurrency, formatPercentage } from 'utils/formatters';
import { MdTrendingUp } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import API_ENDPOINTS from 'config/api';

type Period = '30d' | '6m' | '1y' | 'max' | 'custom';

export default function RoiCalculator({ id, marketData }: RoiCalculatorProps) {
  const [investment, setInvestment] = useState<number | string>(1000);
  const [period, setPeriod] = useState<Period>('1y');
  const [customDate, setCustomDate] = useState<string>('');
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentPrice = marketData?.current_price?.usd;

  // Fetch custom date price
  useEffect(() => {
    if (period !== 'custom' || !customDate) return;

    // Convert YYYY-MM-DD to DD-MM-YYYY for CoinGecko API
    const parts = customDate.split('-');
    if (parts.length !== 3) return;
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    let isMounted = true;
    const fetchHistoricalPrice = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          API_ENDPOINTS.coinHistory(id, formattedDate),
        );
        const data = await response.json();
        if (isMounted) {
          if (data?.market_data?.current_price?.usd) {
            setCustomPrice(data.market_data.current_price.usd);
          } else {
            setCustomPrice(null); // No data for that date
          }
        }
      } catch (error) {
        console.error('Failed to fetch historical price', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchHistoricalPrice();

    return () => {
      isMounted = false;
    };
  }, [customDate, period, id]);

  if (!currentPrice) return null;

  let priceChangePercentage = 0;
  let pastPrice = 0;

  if (period === 'custom') {
    if (customPrice) {
      pastPrice = customPrice;
      priceChangePercentage = ((currentPrice - pastPrice) / pastPrice) * 100;
    }
  } else {
    switch (period) {
      case '30d':
        priceChangePercentage = marketData.price_change_percentage_30d || 0;
        break;
      case '6m':
        priceChangePercentage = marketData.price_change_percentage_200d || 0;
        break;
      case '1y':
        priceChangePercentage = marketData.price_change_percentage_1y || 0;
        break;
      case 'max':
        priceChangePercentage =
          marketData.atl_change_percentage?.usd ||
          marketData.price_change_percentage_1y ||
          0;
        break;
    }
    pastPrice = currentPrice / (1 + priceChangePercentage / 100);
  }

  const numericInvestment =
    typeof investment === 'number' ? investment : Number(investment) || 0;

  let currentValue = 0;
  let profitLoss = 0;
  let isPositive = true;

  if (pastPrice > 0) {
    const coinsBought = numericInvestment / pastPrice;
    currentValue = coinsBought * currentPrice;
    profitLoss = currentValue - numericInvestment;
    isPositive = profitLoss >= 0;
  }

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setInvestment('');
      return;
    }
    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      setInvestment(num);
    }
  };

  const periods: { id: Period; label: string }[] = [
    { id: '30d', label: '1M' },
    { id: '6m', label: '6M' },
    { id: '1y', label: '1Y' },
    { id: 'max', label: 'LAUNCH' },
    { id: 'custom', label: 'CUSTOM' },
  ];

  const getResultLabel = () => {
    switch (period) {
      case '30d':
        return '1 MONTH AGO, IT WOULD BE WORTH';
      case '6m':
        return '6 MONTHS AGO, IT WOULD BE WORTH';
      case '1y':
        return '1 YEAR AGO, IT WOULD BE WORTH';
      case 'max':
        return 'AT LAUNCH, IT WOULD BE WORTH';
      case 'custom':
        return customDate
          ? `ON ${customDate.split('-').reverse().join('/')}, IT WOULD BE WORTH`
          : 'IT WOULD BE WORTH TODAY';
      default:
        return 'IT WOULD BE WORTH TODAY';
    }
  };

  return (
    <div className="flex flex-col bg-white/2 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4 shadow-highlight-neutral h-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 mb-5 sm:mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-start sm:self-auto">
          <div className="p-1 sm:p-1.5 rounded-lg bg-linear-to-br from-brand-violet/20 to-brand-accent/20 border border-brand-violet/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <MdTrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-violet drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
          </div>
          <h3 className="text-[10px] sm:text-xs font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-wider uppercase">
            ROI Calculator
          </h3>
        </div>
        <div className="flex w-full sm:w-auto gap-1 sm:gap-1.5 p-1 sm:p-1 bg-white/2 rounded-xl sm:rounded-xl border border-white/5 shadow-highlight-neutral justify-between sm:justify-start">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`group relative min-w-10 sm:min-w-10 flex items-center justify-center font-bold select-none transition-colors duration-300 ease-out px-2.5 sm:px-2.5 py-1 sm:py-1 text-[0.65rem] sm:text-[0.65rem] tracking-wide rounded-lg sm:rounded-lg ${
                period === p.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {period === p.id && (
                <motion.div
                  layoutId="roi-period-pill"
                  className="absolute inset-0 bg-brand-violet shadow-glow-primary border border-white/20 rounded-lg overflow-hidden"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <span className="absolute inset-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_infinite]" />
                </motion.div>
              )}
              {period !== p.id && (
                <div className="absolute inset-0 rounded-lg sm:rounded-lg bg-linear-to-b from-white/15 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/0 group-hover:border-white/10 shadow-glass-button group-hover:shadow-glass-button-hover" />
              )}
              <span className="relative z-10 uppercase">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:gap-4 justify-center">
        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 sm:w-1/2 max-w-full sm:max-w-60">
            <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
              If you invested
            </label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 font-bold text-sm group-focus-within:text-brand-violet transition-colors">
                $
              </span>
              <input
                type="number"
                min="0"
                value={investment}
                onChange={handleInvestmentChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-7 pr-3 text-sm font-bold text-white placeholder-white/20 focus:outline-none focus:border-brand-violet/40 focus:bg-brand-violet/5 focus:ring-1 focus:ring-brand-violet/40 transition-all"
                placeholder="1000"
              />
            </div>
          </div>

          {period === 'custom' && (
            <div className="flex flex-col gap-1.5 sm:w-1/2 max-w-full sm:max-w-60 animate-fade-in relative">
              <label className="text-[10px] font-semibold text-brand-violet uppercase tracking-wider flex items-center gap-1.5">
                <FaCalendarAlt /> Select Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={customDate ? new Date(customDate) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      // Adjust for timezone offset to prevent picking the day before
                      const offset = date.getTimezoneOffset();
                      const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000,
                      );
                      setCustomDate(adjustedDate.toISOString().split('T')[0]);
                    } else {
                      setCustomDate('');
                    }
                  }}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date..."
                  className="w-full bg-white/5 border border-brand-violet/30 rounded-xl py-2 px-4 text-sm font-bold text-white focus:outline-hidden focus:border-brand-violet focus:bg-white/10 transition-all shadow-inner-dark"
                  wrapperClassName="w-full"
                  calendarClassName="crypto-datepicker"
                  portalId="root-portal"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                  <FaCalendarAlt className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="flex flex-col gap-0.5 sm:gap-1 mt-3 sm:mt-2">
          <label className="text-[9px] sm:text-[10px] font-semibold text-white/50 uppercase tracking-wider">
            {getResultLabel()}
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-3 min-h-12 sm:min-h-8 justify-center sm:justify-start">
            {isLoading ? (
              <span className="text-xs sm:text-sm font-bold text-white/50 animate-pulse">
                Calculating...
              </span>
            ) : pastPrice > 0 ? (
              <>
                <span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-linear-to-br from-white to-white/70">
                  {formatCurrency(currentValue)}
                </span>
                <span
                  className={`flex items-center gap-1 sm:gap-1 font-bold text-xs sm:text-sm ${
                    isPositive ? 'text-brand-positive' : 'text-brand-negative'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {formatCurrency(profitLoss)} ({isPositive ? '+' : ''}
                  {formatPercentage(priceChangePercentage)})
                </span>
              </>
            ) : period === 'custom' && customDate ? (
              <span className="text-xs sm:text-sm font-bold text-brand-negative">
                No price data available for this date.
              </span>
            ) : period === 'custom' && !customDate ? (
              <span className="text-xs sm:text-sm font-bold text-white/50">
                Please select a date above.
              </span>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-white/50">
                No data available.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
