import type { CoinResponse } from 'interfaces';

export interface ExplorerLinksProps {
  links: CoinResponse['links'];
  hasBlockchainSites: boolean | 0 | undefined;
}
