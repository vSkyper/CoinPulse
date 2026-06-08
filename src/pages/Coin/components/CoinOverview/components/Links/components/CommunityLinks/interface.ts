import type { CoinResponse } from 'interfaces';

export interface CommunityLinksProps {
  links: CoinResponse['links'];
  socialLinks: Record<
    string,
    { label: string; getUrl?: (username: string) => string }
  >;
}
