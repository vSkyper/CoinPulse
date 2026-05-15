import type { CoinResponse } from 'interfaces';

export interface OfficialLinksProps {
  links: CoinResponse['links'];
  image: CoinResponse['image'];
}
