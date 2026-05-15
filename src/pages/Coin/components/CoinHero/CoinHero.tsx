import type { CoinHeroProps } from './interface';
import { CoinHeader, Sparkline, PriceCard } from './components';
import AnimatedSection from '../AnimatedSection';

export default function CoinHero({ id, data, animations }: CoinHeroProps) {
  return (
    <>
      <CoinHeader
        id={id}
        name={data.name}
        symbol={data.symbol}
        image={data.image?.large}
        marketCapRank={data.market_cap_rank}
      />

      {/* Chart & Price Card Row */}
      <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-4'>
        <div className='sm:col-span-8'>
          <AnimatedSection show={animations.chart} className='mb-4 sm:mb-3'>
            <Sparkline id={id} />
          </AnimatedSection>
        </div>

        <div className='sm:col-span-4'>
          <AnimatedSection show={animations.priceCard}>
            <PriceCard data={data} />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
