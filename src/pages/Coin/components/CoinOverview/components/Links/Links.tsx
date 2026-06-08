import type { LinksProps } from './interface';
import { OfficialLinks, CommunityLinks, ExplorerLinks } from './components';

const SOCIAL_LINKS = {
  reddit: {
    label: 'Reddit',
  },
  twitter: {
    label: 'Twitter',
    getUrl: (username: string) => `https://twitter.com/${username}/`,
  },
  facebook: {
    label: 'Facebook',
    getUrl: (username: string) => `https://www.facebook.com/${username}/`,
  },
  github: {
    label: 'GitHub',
  },
};

export default function Links({ data }: LinksProps) {
  const { links, image } = data;

  const hasBlockchainSites =
    links?.blockchain_site && links.blockchain_site.filter(Boolean).length > 0;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white/2 border border-white/5 shadow-highlight-neutral">
      <OfficialLinks links={links} image={image} />
      <CommunityLinks links={links} socialLinks={SOCIAL_LINKS} />
      <ExplorerLinks links={links} hasBlockchainSites={hasBlockchainSites} />
    </div>
  );
}
