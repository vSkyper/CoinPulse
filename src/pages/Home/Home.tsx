import { Global, Table, Skeleton, MarketHighlights, TrendingMarquee } from './components';
import useFetch from 'hooks/useFetch';
import type { CoinsResponse, GlobalDataResponse } from 'interfaces';
import { ErrorModal } from 'components';
import { API_ENDPOINTS } from 'config/api';

export default function Home() {
  const { data: globalData, error: globalDataError, isLoading: globalDataLoading } =
    useFetch<GlobalDataResponse>(API_ENDPOINTS.global());
  const { data: coins, error: coinsError, isLoading: coinsLoading } = useFetch<CoinsResponse[]>(
    API_ENDPOINTS.coinsMarkets({
      sparkline: true,
      price_change_percentage: '1h,24h,7d',
    }),
  );

  const hasError = globalDataError || coinsError;
  const isLoading = globalDataLoading || coinsLoading;

  if (hasError) return <ErrorModal />;

  if (isLoading || !globalData || !coins) return <Skeleton />;

  return (
    <main className="relative w-full min-h-screen flex flex-col">
      <TrendingMarquee />
      <div className="relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1">
        <Global globalData={globalData} />
        <MarketHighlights coins={coins} />
        <Table coins={coins} />
      </div>
    </main>
  );
}
