import type { DeveloperActivityProps } from './interface';
import { FaGithub, FaLaptopCode, FaCodeBranch, FaUsers, FaExclamationCircle, FaCheckCircle, FaEye } from 'react-icons/fa';
import { MdCode, MdMergeType, MdHistory } from 'react-icons/md';
import StatCard from '../ProjectInfo/components/StatCard/StatCard';
import { Tooltip } from 'components';
import { formatNumber } from 'utils/formatters';
import sadCatImg from 'assets/images/sad_cat.png';

export default function DeveloperActivity({
  developerData,
}: DeveloperActivityProps) {
  const hasStars = typeof developerData?.stars === 'number' && developerData!.stars > 0;
  const hasForks = typeof developerData?.forks === 'number' && developerData!.forks > 0;
  const hasContributors = typeof developerData?.pull_request_contributors === 'number' && developerData!.pull_request_contributors > 0;
  const hasSubscribers = typeof developerData?.subscribers === 'number' && developerData!.subscribers > 0;
  const hasTotalIssues = typeof developerData?.total_issues === 'number' && developerData!.total_issues > 0;
  const hasClosedIssues = typeof developerData?.closed_issues === 'number' && developerData!.closed_issues > 0;
  const hasCommits = typeof developerData?.commit_count_4_weeks === 'number' && developerData!.commit_count_4_weeks > 0;
  const hasPRs = typeof developerData?.pull_requests_merged === 'number' && developerData!.pull_requests_merged > 0;
  const hasChanges =
    typeof developerData?.code_additions_deletions_4_weeks?.additions === 'number' &&
    typeof developerData?.code_additions_deletions_4_weeks?.deletions === 'number' &&
    (developerData!.code_additions_deletions_4_weeks!.additions > 0 || developerData!.code_additions_deletions_4_weeks!.deletions > 0);

  const hasAnyData =
    hasStars ||
    hasForks ||
    hasContributors ||
    hasSubscribers ||
    hasTotalIssues ||
    hasClosedIssues ||
    hasCommits ||
    hasPRs ||
    hasChanges;

  if (!developerData) return null;

  return (
    <div className="relative flex flex-col bg-white/2 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4 shadow-highlight-neutral h-full overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <div className="p-1 sm:p-1.5 rounded-lg bg-linear-to-br from-brand-violet/20 to-brand-accent/20 border border-brand-violet/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0">
          <FaLaptopCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-violet drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
        </div>
        <h3 className="text-[10px] sm:text-xs font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-wider uppercase">
          Developer Activity
        </h3>
      </div>

      {!hasAnyData ? (
        <div className="flex flex-col items-center justify-center flex-1 py-6 px-4 text-center">
          <img
            src={sadCatImg}
            alt="Sad Cat"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-80 mb-3 drop-shadow-[0_0_15px_rgba(139,92,246,0.2)] animate-float"
          />
          <h4 className="text-white/80 font-black text-xs sm:text-sm tracking-wide uppercase mb-1">
            Wow, much empty...
          </h4>
          <p className="text-white/40 text-[10px] sm:text-xs font-medium">
            We couldn't find any developer metrics for this coin.
          </p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 flex-1 content-start">
          {/* Developer Stats */}
          {hasStars ? (
            <StatCard
              icon={FaGithub}
              label="GitHub Stars"
              value={developerData!.stars}
              fullValue={developerData!.stars!.toLocaleString('en-US')}
              color="text-brand-github"
              bg="bg-brand-github/10"
            />
          ) : null}

          {hasForks ? (
            <StatCard
              icon={FaCodeBranch}
              label="Forks"
              value={developerData!.forks}
              fullValue={developerData!.forks!.toLocaleString('en-US')}
              color="text-brand-github/70"
              bg="bg-brand-github/5"
            />
          ) : null}

          {hasContributors ? (
            <StatCard
              icon={FaUsers}
              label="Contributors"
              value={developerData!.pull_request_contributors}
              fullValue={developerData!.pull_request_contributors!.toLocaleString('en-US')}
              color="text-brand-github/70"
              bg="bg-brand-github/5"
            />
          ) : null}

          {hasSubscribers ? (
            <StatCard
              icon={FaEye}
              label="Subscribers"
              value={developerData!.subscribers}
              fullValue={developerData!.subscribers!.toLocaleString('en-US')}
              color="text-brand-github/70"
              bg="bg-brand-github/5"
            />
          ) : null}

          {hasTotalIssues ? (
            <StatCard
              icon={FaExclamationCircle}
              label="Total Issues"
              value={developerData!.total_issues}
              fullValue={developerData!.total_issues!.toLocaleString('en-US')}
              color="text-brand-github/70"
              bg="bg-brand-github/5"
            />
          ) : null}

          {hasClosedIssues ? (
            <StatCard
              icon={FaCheckCircle}
              label="Closed Issues"
              value={developerData!.closed_issues}
              fullValue={developerData!.closed_issues!.toLocaleString('en-US')}
              color="text-brand-positive"
              bg="bg-brand-positive/10"
            />
          ) : null}

          {hasCommits ? (
            <StatCard
              icon={MdCode}
              label="4w Commits"
              value={developerData!.commit_count_4_weeks}
              fullValue={developerData!.commit_count_4_weeks!.toLocaleString('en-US')}
              color="text-brand-accent"
              bg="bg-brand-accent/10"
            />
          ) : null}

        {hasPRs ? (
          <StatCard
            icon={MdMergeType}
            label="PRs Merged"
            value={developerData!.pull_requests_merged}
            fullValue={developerData!.pull_requests_merged!.toLocaleString('en-US')}
            color="text-brand-accent"
            bg="bg-brand-accent/10"
          />
        ) : null}

        {hasChanges ? (
          <StatCard
            icon={MdHistory}
            label="4w Changes"
            customValue={
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-start sm:gap-1 font-mono text-xs sm:text-xs">
                <span className="text-brand-positive font-bold text-xs sm:text-xs min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%] sm:max-w-[40%]">
                  <Tooltip
                    className="w-auto"
                    content={`+${formatNumber(
                      developerData!.code_additions_deletions_4_weeks!.additions,
                    )}`}
                  >
                    <span className="cursor-pointer active:opacity-80 transition-opacity">
                      +{formatNumber(developerData!.code_additions_deletions_4_weeks!.additions)}
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
                      developerData!.code_additions_deletions_4_weeks!.deletions,
                    )}`}
                  >
                    <span className="cursor-pointer active:opacity-80 transition-opacity">
                      {formatNumber(developerData!.code_additions_deletions_4_weeks!.deletions)}
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
      )}
    </div>
  );
}
