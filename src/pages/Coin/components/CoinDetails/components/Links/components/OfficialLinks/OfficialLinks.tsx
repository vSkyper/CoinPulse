import { MdForum as ForumIcon } from 'react-icons/md';
import type { OfficialLinksProps } from './interface';
import ChipLink from '../ChipLink';

export default function OfficialLinks({ links, image }: OfficialLinksProps) {
  return (
    <>
      <h3 className='text-[0.65rem] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-3 sm:mb-4'>
        Official Links
      </h3>
      <div className='flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-6'>
        {links?.homepage?.[0] && (
          <ChipLink
            href={links.homepage[0]}
            left={
              <img
                src={image?.large}
                alt='logo'
                className='w-5 h-5 rounded-full object-cover shadow-badge'
              />
            }
          >
            Website
          </ChipLink>
        )}

        {links?.official_forum_url?.[0] && (
          <ChipLink
            href={links.official_forum_url[0]}
            left={<ForumIcon size={16} className='text-brand-violet' />}
          >
            Forum
          </ChipLink>
        )}
      </div>
    </>
  );
}
