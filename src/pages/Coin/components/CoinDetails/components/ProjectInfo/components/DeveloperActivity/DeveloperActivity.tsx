import { MdCode, MdMergeType, MdHistory } from 'react-icons/md';
import {
  FaGithub,
  FaCodeBranch,
  FaUsers,
  FaEye,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { formatNumber } from 'utils/formatters';
import { Tooltip } from 'components';
import { StatCard } from '..';
import type { DeveloperActivityProps } from './interface';

export default function DeveloperActivity({
  developerData,
}: DeveloperActivityProps) {
  return (
    <div className='flex flex-col gap-3 sm:gap-4'>
      <div className='bg-white/2 border border-white/5 rounded-3xl p-5 sm:p-6 shadow-highlight-neutral flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4 sm:mb-5'>
          <h3 className='text-[0.65rem] sm:text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2'>
            <span className='w-1.5 h-1.5 rounded-full bg-brand-accent/80' />
            Developer Activity
          </h3>
          <div className='p-1.5 rounded-lg bg-brand-accent/10 text-brand-accent'>
            <MdCode size={16} className='sm:w-4 sm:h-4' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2 sm:gap-3'>
          {/* Row 1 */}
          <StatCard
            icon={FaGithub}
            label='GitHub Stars'
            value={developerData.stars}
            fullValue={developerData.stars?.toLocaleString('en-US')}
            color='text-brand-github'
            bg='bg-brand-github/10'
          />
          <StatCard
            icon={FaCodeBranch}
            label='Forks'
            value={developerData.forks}
            fullValue={developerData.forks?.toLocaleString('en-US')}
            color='text-brand-github/70'
            bg='bg-brand-github/5'
          />
          <StatCard
            icon={FaUsers}
            label='Contributors'
            value={developerData.pull_request_contributors}
            fullValue={developerData.pull_request_contributors?.toLocaleString(
              'en-US',
            )}
            color='text-brand-github/70'
            bg='bg-brand-github/5'
          />

          {/* Row 2 - New Stats */}
          <StatCard
            icon={FaEye}
            label='Subscribers'
            value={developerData.subscribers}
            fullValue={developerData.subscribers?.toLocaleString('en-US')}
            color='text-brand-github/70'
            bg='bg-brand-github/5'
          />
          <StatCard
            icon={FaExclamationCircle}
            label='Total Issues'
            value={developerData.total_issues}
            fullValue={developerData.total_issues?.toLocaleString('en-US')}
            color='text-brand-github/70'
            bg='bg-brand-github/5'
          />
          <StatCard
            icon={FaCheckCircle}
            label='Closed Issues'
            value={developerData.closed_issues}
            fullValue={developerData.closed_issues?.toLocaleString('en-US')}
            color='text-brand-positive'
            bg='bg-brand-positive/10'
          />

          {/* Row 3 */}
          <StatCard
            icon={MdCode}
            label='4w Commits'
            value={developerData.commit_count_4_weeks}
            fullValue={developerData.commit_count_4_weeks?.toLocaleString(
              'en-US',
            )}
            color='text-brand-accent'
            bg='bg-brand-accent/10'
          />
          <StatCard
            icon={MdMergeType}
            label='PRs Merged'
            value={developerData.pull_requests_merged}
            fullValue={developerData.pull_requests_merged?.toLocaleString(
              'en-US',
            )}
            color='text-brand-accent'
            bg='bg-brand-accent/10'
          />
          <StatCard
            icon={MdHistory}
            label='4w Changes'
            customValue={
              developerData.code_additions_deletions_4_weeks ? (
                <div className='flex flex-col sm:flex-row sm:items-baseline justify-start sm:gap-1 font-mono text-xs sm:text-xs'>
                  <span className='text-brand-positive font-bold text-xs sm:text-xs min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%] sm:max-w-[40%]'>
                    <Tooltip
                      className='w-auto'
                      content={`+${formatNumber(
                        developerData.code_additions_deletions_4_weeks
                          .additions,
                      )}`}
                    >
                      <span className='cursor-pointer active:opacity-80 transition-opacity'>
                        +
                        {formatNumber(
                          developerData.code_additions_deletions_4_weeks
                            .additions,
                        )}
                      </span>
                    </Tooltip>
                  </span>
                  <span className='hidden sm:inline text-white/20 text-xs shrink-0'>
                    /
                  </span>
                  <span className='text-brand-negative font-bold text-xs sm:text-xs min-w-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%] sm:max-w-[40%]'>
                    <Tooltip
                      className='w-auto'
                      content={`${formatNumber(
                        developerData.code_additions_deletions_4_weeks
                          .deletions,
                      )}`}
                    >
                      <span className='cursor-pointer active:opacity-80 transition-opacity'>
                        {formatNumber(
                          developerData.code_additions_deletions_4_weeks
                            .deletions,
                        )}
                      </span>
                    </Tooltip>
                  </span>
                </div>
              ) : (
                'N/A'
              )
            }
            color='text-brand-github'
            bg='bg-brand-github/5'
            disableTooltip
          />
        </div>
      </div>
    </div>
  );
}
