import {
  FaReddit as RedditIcon,
  FaFacebook as FacebookIcon,
  FaTwitter as TwitterIcon,
  FaGithub as GitHubIcon,
} from 'react-icons/fa';
import type { CommunityLinksProps } from './interface';
import ChipLink from '../ChipLink';

export default function CommunityLinks({
  links,
  socialLinks,
}: CommunityLinksProps) {
  return (
    <>
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
            {socialLinks.reddit.label}
          </ChipLink>
        )}

        {links?.twitter_screen_name && socialLinks.twitter.getUrl && (
          <ChipLink
            href={socialLinks.twitter.getUrl(links.twitter_screen_name)}
            left={<TwitterIcon size={16} />}
            className='hover:border-brand-twitter/30 hover:bg-brand-twitter/10 hover:text-brand-twitter'
          >
            {socialLinks.twitter.label}
          </ChipLink>
        )}

        {links?.facebook_username && socialLinks.facebook.getUrl && (
          <ChipLink
            href={socialLinks.facebook.getUrl(links.facebook_username)}
            left={<FacebookIcon size={16} />}
            className='hover:border-brand-facebook/30 hover:bg-brand-facebook/10 hover:text-brand-facebook'
          >
            {socialLinks.facebook.label}
          </ChipLink>
        )}

        {links?.repos_url?.github?.[0] && (
          <ChipLink
            href={links.repos_url.github[0]}
            left={<GitHubIcon size={16} />}
            className='hover:border-brand-github/30 hover:bg-brand-github/10 hover:text-brand-github'
          >
            {socialLinks.github.label}
          </ChipLink>
        )}
      </div>
    </>
  );
}
