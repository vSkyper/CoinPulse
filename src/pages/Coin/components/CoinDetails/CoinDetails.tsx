import type { CoinDetailsProps } from './interface';
import {
  MarketStats,
  ProjectInfo,
  CurrencyConverter,
  Links,
} from './components';
import AnimatedSection from '../AnimatedSection';

export default function CoinDetails({
  id,
  data,
  animations,
}: CoinDetailsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-10 mt-8 sm:mt-6'>
      <div className='contents sm:col-span-8 sm:block'>
        <AnimatedSection
          show={animations.marketStats}
          className='order-2 sm:order-0 mb-8'
        >
          <MarketStats marketData={data.market_data} />
        </AnimatedSection>

        <AnimatedSection
          show={animations.projectInfo}
          className='order-3 sm:order-0 sm:mt-12 mb-8'
        >
          <ProjectInfo
            description={data.description?.en}
            developerData={data.developer_data}
            name={data.name}
            image={data.image?.large || data.image?.small}
          />
        </AnimatedSection>
      </div>

      <div className='contents sm:col-span-4 sm:flex sm:flex-col sm:gap-8'>
        <AnimatedSection
          show={animations.currencyConverter}
          className='relative z-20 order-1 sm:order-0 mb-6 sm:mb-0'
        >
          <CurrencyConverter
            id={id}
            symbol={data.symbol}
            image={data.image?.large}
          />
        </AnimatedSection>

        <AnimatedSection
          show={animations.links}
          className='order-4 sm:order-0 mt-0 sm:mt-4'
        >
          <Links data={data} />
        </AnimatedSection>
      </div>
    </div>
  );
}
