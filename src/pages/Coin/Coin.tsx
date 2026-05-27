import { useParams } from 'react-router-dom';
import {
  Skeleton,
  CoinHero,
  CoinDetails,
} from './components';
import { NotFound } from 'pages';
import type { CoinResponse } from 'interfaces';
import useFetch from 'hooks/useFetch';
import { API_ENDPOINTS } from 'config/api';
import { useStaggeredAnimation } from './hooks';
import { ANIMATION_DELAYS } from './constants';

export default function Coin() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<CoinResponse>(
    id ? API_ENDPOINTS.coin(id) : undefined,
  );

  const animations = useStaggeredAnimation(ANIMATION_DELAYS, !!data);

  if (!id || error) return <NotFound />;

  if (isLoading || !data) return <Skeleton />;

  return (
    <main className="relative w-full min-h-screen flex flex-col">
      <div className="relative z-1 container mx-auto px-4 sm:px-8 pb-12 flex-1">
        <CoinHero id={id} data={data} animations={animations} />
        <CoinDetails id={id} data={data} animations={animations} />
      </div>
    </main>
  );
}

