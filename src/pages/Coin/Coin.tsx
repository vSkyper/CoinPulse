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
  currencyConverter: 400,
  links: 500,
};

export default function Coin() {
  const { id } = useParams();
  const { data, error } = useFetch<CoinResponse>(
    id ? API_ENDPOINTS.coin(id) : undefined
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
            <AnimatedSection show={animations.chart}>
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
          <div className='sm:col-span-8'>
            <AnimatedSection show={animations.marketStats}>
              <MarketStats marketData={data.market_data} />
            </AnimatedSection>
          </div>

          <div className='sm:col-span-4 flex flex-col gap-1.5 sm:gap-3'>
            <AnimatedSection
              show={animations.currencyConverter}
              className='relative z-20'
            >
              <CurrencyConverter
                id={id}
                symbol={data.symbol}
                image={data.image?.large}
              />
            </AnimatedSection>

            <AnimatedSection show={animations.links}>
              <Links data={data} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}
