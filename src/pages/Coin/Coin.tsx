import { useParams } from 'react-router-dom';
import {
  CurrencyConverter,
  Links,
  PriceCard,
  Sparkline,
  MarketStats,
  CoinHeader,
  AnimatedSection,
  Skeleton,
  ProjectInfo,
} from './components';
import { ErrorModal } from 'components';
import { CoinResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { API_ENDPOINTS } from 'config/api';
import { useStaggeredAnimation } from './hooks';

const ANIMATION_DELAYS = {
  chart: 100,
  priceCard: 200,
  marketStats: 300,
  projectInfo: 400,
  currencyConverter: 500,
  links: 600,
};

export default function Coin() {
  const { id } = useParams();
  const { data, error } = useFetch<CoinResponse>(
    id ? API_ENDPOINTS.coin(id) : undefined,
  );

  const animations = useStaggeredAnimation(ANIMATION_DELAYS, !!data);

  if (!id || error) return <ErrorModal />;

  if (!data) return <Skeleton />;

  return (
    <main className='relative w-full min-h-screen flex flex-col'>
      <div className='relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1'>
        <CoinHeader
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

        {/* Stats, Currency Converter & Links Row */}
        <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-6'>
          <div className='contents sm:col-span-8 sm:block'>
            <AnimatedSection
              show={animations.marketStats}
              className='order-2 sm:order-0 mb-8'
            >
              <MarketStats marketData={data.market_data} />
            </AnimatedSection>

            <AnimatedSection
              show={animations.projectInfo}
              className='order-3 sm:order-0 sm:mt-8 mb-8'
            >
              <ProjectInfo
                description={data.description?.en}
                developerData={data.developer_data}
              />
            </AnimatedSection>
          </div>

          <div className='contents sm:col-span-4 sm:flex sm:flex-col sm:gap-3'>
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
      </div>
    </main>
  );
}
