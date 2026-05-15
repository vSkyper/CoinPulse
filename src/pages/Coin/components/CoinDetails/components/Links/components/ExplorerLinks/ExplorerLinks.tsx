import { MdLanguage as WebsiteIcon } from 'react-icons/md';
import type { ExplorerLinksProps } from './interface';
import ChipLink from '../ChipLink';

export default function ExplorerLinks({
  links,
  hasBlockchainSites,
}: ExplorerLinksProps) {
  const extractHostname = (url: string) =>
    new URL(url).hostname.replace('www.', '');

  if (!hasBlockchainSites) return null;

  return (
    <>
      <h3 className='text-[0.65rem] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-3 sm:mb-4'>
        Explorers
      </h3>
      <div className='flex flex-wrap gap-2.5 sm:gap-3'>
        {links?.blockchain_site?.slice(0, 3).map(
          (blockchain: string | null) =>
            blockchain && (
              <ChipLink
                key={blockchain}
                href={blockchain}
                left={<WebsiteIcon size={16} className='text-white/60' />}
              >
                {extractHostname(blockchain)}
              </ChipLink>
            ),
        )}
      </div>
    </>
  );
}
