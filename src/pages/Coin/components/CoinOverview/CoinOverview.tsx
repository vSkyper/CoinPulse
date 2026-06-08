import type { CoinOverviewProps } from './interface';
import {
  CoinHeader,
  CurrencyConverter,
  Links,
  Sparkline,
  PriceRange,
  MarketStats,
  ProjectInfo,
} from './components';
import AnimatedSection from '../AnimatedSection';

export default function CoinOverview({
  id,
  data,
  animations,
}: CoinOverviewProps) {
  return (
    <>
      <CoinHeader
        id={id}
        name={data.name}
        symbol={data.symbol}
        image={data.image?.large}
        marketCapRank={data.market_cap_rank}
        marketData={data.market_data}
      />

      {/* Row 1: Chart & Converter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-4">
        <div className="sm:col-span-8 flex flex-col gap-6 sm:gap-8">
          {/* Mobile-only Price Range (above chart) */}
          <div className="block sm:hidden">
            <AnimatedSection show={animations.priceCard} className="relative z-20">
              <PriceRange marketData={data.market_data} />
            </AnimatedSection>
          </div>

          <AnimatedSection show={animations.chart} className="mb-4 sm:mb-3">
            <Sparkline id={id} />
          </AnimatedSection>
        </div>

        <div className="sm:col-span-4 flex flex-col gap-6 sm:gap-8">
          {/* Desktop-only Price Range (right column) */}
          <div className="hidden sm:block">
            <AnimatedSection
              show={animations.priceCard}
              className="relative z-20"
            >
              <PriceRange marketData={data.market_data} />
            </AnimatedSection>
          </div>
          <AnimatedSection
            show={animations.priceCard}
            className="relative z-20"
          >
            <CurrencyConverter
              id={id}
              symbol={data.symbol}
              image={data.image?.large}
            />
          </AnimatedSection>
        </div>
      </div>

      {/* Row 2: Market Stats (Full Width) */}
      <div className="mt-8 sm:mt-10">
        <AnimatedSection show={animations.marketStats} className="w-full">
          <MarketStats marketData={data.market_data} />
        </AnimatedSection>
      </div>

      {/* Row 3: Project Info & Links */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-10">
        <div className="sm:col-span-8 flex flex-col gap-6 sm:gap-8">
          <AnimatedSection show={animations.projectInfo} className="w-full">
            <ProjectInfo
              description={data.description?.en}
              developerData={data.developer_data}
            />
          </AnimatedSection>
        </div>

        <div className="sm:col-span-4 flex flex-col gap-6 sm:gap-8">
          <AnimatedSection show={animations.links}>
            <Links data={data} />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
