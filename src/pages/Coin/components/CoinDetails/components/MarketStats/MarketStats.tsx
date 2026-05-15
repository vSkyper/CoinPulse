import { HeroStats, PerformanceStats, SecondaryStats } from './components';
import type { MarketStatsProps } from './interface';

export default function MarketStats({ marketData }: MarketStatsProps) {
  return (
    <div className='flex flex-col gap-4'>
      {/* Heavy Hero Stats - Row 1 */}
      <HeroStats marketData={marketData} />

      {/* Secondary Stats - Row 2 */}
      <SecondaryStats marketData={marketData} />

      {/* Performance & Range - Row 3 */}
      <PerformanceStats marketData={marketData} />
    </div>
  );
}
