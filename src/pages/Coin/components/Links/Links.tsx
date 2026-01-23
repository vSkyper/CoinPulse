import {
  FaReddit as RedditIcon,
  FaFacebook as FacebookIcon,
  FaTwitter as TwitterIcon,
  FaGithub as GitHubIcon,
} from 'react-icons/fa';
import {
  MdLanguage as WebsiteIcon,
  MdForum as ForumIcon,
} from 'react-icons/md';
import { LinksProps } from './interface';
import { ChipLink } from './components';

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

  const extractHostname = (url: string) =>
    new URL(url).hostname.replace('www.', '');

  return (
    <div className='p-4 sm:p-5 rounded-3xl bg-white/2 border border-white/5 shadow-highlight-neutral'>
      {/* Official Links */}
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

      {/* Social Media */}
      <h3 className='text-[0.65rem] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-3 sm:mb-4'>
        Community
      </h3>
      <div className='flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-6'>
        {links?.subreddit_url && (
          <ChipLink
            href={links.subreddit_url}
            left={<RedditIcon size={16} />}
            className='hover:border-brand-reddit/30 hover:bg-brand-reddit/10 hover:text-brand-reddit'
          >
            {SOCIAL_LINKS.reddit.label}
          </ChipLink>
        )}

        {links?.twitter_screen_name && (
          <ChipLink
            href={SOCIAL_LINKS.twitter.getUrl(links.twitter_screen_name)}
            left={<TwitterIcon size={16} />}
            className='hover:border-brand-twitter/30 hover:bg-brand-twitter/10 hover:text-brand-twitter'
          >
            {SOCIAL_LINKS.twitter.label}
          </ChipLink>
        )}

        {links?.facebook_username && (
          <ChipLink
            href={SOCIAL_LINKS.facebook.getUrl(links.facebook_username)}
            left={<FacebookIcon size={16} />}
            className='hover:border-brand-facebook/30 hover:bg-brand-facebook/10 hover:text-brand-facebook'
          >
            {SOCIAL_LINKS.facebook.label}
          </ChipLink>
        )}

        {links?.repos_url?.github?.[0] && (
          <ChipLink
            href={links.repos_url.github[0]}
            left={<GitHubIcon size={16} />}
            className='hover:border-brand-github/30 hover:bg-brand-github/10 hover:text-brand-github'
          >
            {SOCIAL_LINKS.github.label}
          </ChipLink>
        )}
      </div>

      {/* Blockchain Explorers */}
      {hasBlockchainSites && (
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
      )}
    </div>
  );
}
