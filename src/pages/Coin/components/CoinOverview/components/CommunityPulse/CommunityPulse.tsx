import type { CommunityPulseProps } from './interface';
import { FaTwitter, FaRedditAlien, FaGithub, FaHeartbeat, FaCodeBranch, FaUsers, FaExclamationCircle, FaCheckCircle, FaTelegramPlane, FaEye } from 'react-icons/fa';
import { MdCode, MdMergeType, MdHistory } from 'react-icons/md';
import StatCard from '../ProjectInfo/components/StatCard/StatCard';
import { Tooltip } from 'components';
import { formatNumber } from 'utils/formatters';

export default function CommunityPulse({
  communityData,
  developerData,
}: CommunityPulseProps) {
  if (!communityData && !developerData) return null;

  return (
    <div className="relative flex flex-col bg-white/2 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4 shadow-highlight-neutral h-full overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <div className="p-1 sm:p-1.5 rounded-lg bg-linear-to-br from-brand-violet/20 to-brand-accent/20 border border-brand-violet/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0">
          <FaHeartbeat className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-violet animate-pulse drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
        </div>
        <h3 className="text-[10px] sm:text-xs font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-wider uppercase">
          Community & Pulse
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 flex-1 content-start">
        {/* Community Stats */}
        {communityData?.twitter_followers ? (
          <StatCard
            icon={FaTwitter}
            label="Twitter"
            value={communityData.twitter_followers}
            fullValue={communityData.twitter_followers.toLocaleString('en-US')}
            color="text-[#1DA1F2]"
            bg="bg-[#1DA1F2]/10"
          />
        ) : null}

        {communityData?.reddit_subscribers ? (
          <StatCard
            icon={FaRedditAlien}
            label="Reddit"
            value={communityData.reddit_subscribers}
            fullValue={communityData.reddit_subscribers.toLocaleString('en-US')}
            color="text-[#FF4500]"
            bg="bg-[#FF4500]/10"
          />
        ) : null}

        {communityData?.telegram_channel_user_count ? (
          <StatCard
            icon={FaTelegramPlane}
            label="Telegram"
            value={communityData.telegram_channel_user_count}
            fullValue={communityData.telegram_channel_user_count.toLocaleString('en-US')}
            color="text-[#0088cc]"
            bg="bg-[#0088cc]/10"
          />
        ) : null}

        {/* Developer Stats */}
        {developerData?.stars ? (
          <StatCard
            icon={FaGithub}
            label="GitHub Stars"
            value={developerData.stars}
            fullValue={developerData.stars.toLocaleString('en-US')}
            color="text-brand-github"
            bg="bg-brand-github/10"
          />
        ) : null}

        {developerData?.forks ? (
          <StatCard
            icon={FaCodeBranch}
            label="Forks"
            value={developerData.forks}
            fullValue={developerData.forks.toLocaleString('en-US')}
            color="text-brand-github/70"
            bg="bg-brand-github/5"
          />
        ) : null}

        {developerData?.pull_request_contributors ? (
          <StatCard
            icon={FaUsers}
            label="Contributors"
            value={developerData.pull_request_contributors}
            fullValue={developerData.pull_request_contributors.toLocaleString('en-US')}
            color="text-brand-github/70"
            bg="bg-brand-github/5"
          />
        ) : null}

        {developerData?.subscribers ? (
          <StatCard
            icon={FaEye}
            label="Subscribers"
            value={developerData.subscribers}
            fullValue={developerData.subscribers.toLocaleString('en-US')}
            color="text-brand-github/70"
            bg="bg-brand-github/5"
          />
        ) : null}

        {developerData?.total_issues ? (
          <StatCard
            icon={FaExclamationCircle}
            label="Total Issues"
            value={developerData.total_issues}
            fullValue={developerData.total_issues.toLocaleString('en-US')}
            color="text-brand-github/70"
            bg="bg-brand-github/5"
          />
        ) : null}

        {developerData?.closed_issues ? (
          <StatCard
            icon={FaCheckCircle}
            label="Closed Issues"
            value={developerData.closed_issues}
            fullValue={developerData.closed_issues.toLocaleString('en-US')}
            color="text-brand-positive"
            bg="bg-brand-positive/10"
          />
        ) : null}

        {developerData?.commit_count_4_weeks !== undefined ? (
          <StatCard
            icon={MdCode}
            label="4w Commits"
            value={developerData.commit_count_4_weeks}
            fullValue={developerData.commit_count_4_weeks.toLocaleString('en-US')}
            color="text-brand-accent"
            bg="bg-brand-accent/10"
          />
        ) : null}

        {developerData?.pull_requests_merged ? (
          <StatCard
            icon={MdMergeType}
            label="PRs Merged"
            value={developerData.pull_requests_merged}
            fullValue={developerData.pull_requests_merged.toLocaleString('en-US')}
            color="text-brand-accent"
            bg="bg-brand-accent/10"
          />
        ) : null}

        {developerData?.code_additions_deletions_4_weeks ? (
          <StatCard
            icon={MdHistory}
            label="4w Changes"
            customValue={
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-start sm:gap-1 font-mono text-xs sm:text-xs">
                <span className="text-brand-positive font-bold text-xs sm:text-xs min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%] sm:max-w-[40%]">
                  <Tooltip
                    className="w-auto"
                    content={`+${formatNumber(
                      developerData.code_additions_deletions_4_weeks.additions,
                    )}`}
                  >
                    <span className="cursor-pointer active:opacity-80 transition-opacity">
                      +{formatNumber(developerData.code_additions_deletions_4_weeks.additions)}
                    </span>
                  </Tooltip>
                </span>
                <span className="hidden sm:inline text-white/20 text-xs shrink-0">
                  /
                </span>
                <span className="text-brand-negative font-bold text-xs sm:text-xs min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%] sm:max-w-[40%]">
                  <Tooltip
                    className="w-auto"
                    content={`${formatNumber(
                      developerData.code_additions_deletions_4_weeks.deletions,
                    )}`}
                  >
                    <span className="cursor-pointer active:opacity-80 transition-opacity">
                      {formatNumber(developerData.code_additions_deletions_4_weeks.deletions)}
                    </span>
                  </Tooltip>
                </span>
              </div>
            }
            color="text-brand-github"
            bg="bg-brand-github/5"
            disableTooltip
          />
        ) : null}
      </div>
    </div>
  );
}
