import parse from 'html-react-parser';
import { useState } from 'react';
import {
  MdDescription,
  MdCode,
  MdExpandMore,
  MdExpandLess,
  MdMergeType,
  MdHistory,
} from 'react-icons/md';
import {
  FaGithub,
  FaCodeBranch,
  FaUsers,
  FaEye,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { formatNumber } from 'utils/formatters';
import { ProjectInfoProps } from './interface';
import { StatCard, PropsTooltip } from './components';

export default function ProjectInfo({
  description,
  developerData,
}: ProjectInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If no data, return null to avoid empty section
  if (!description && !developerData) return null;

  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8'>
      {/* Description Column */}
      {description && (
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='flex items-center gap-1.5 sm:gap-2 mb-1'>
            <div className='p-1 sm:p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary'>
              <MdDescription size={16} className='sm:w-[18px] sm:h-[18px]' />
            </div>
            <h3 className='text-sm sm:text-base font-bold text-white tracking-wide'>
              About Project
            </h3>
          </div>

          <div className='bg-white/2 border border-white/5 rounded-3xl p-4 sm:p-5 shadow-highlight-neutral'>
            <div
              className={`prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed font-light text-xs ${
                !isExpanded ? 'line-clamp-6 mask-fade-bottom' : ''
              }`}
            >
              {parse(description)}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='mt-3 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer'
            >
              {isExpanded ? (
                <>
                  Read Less <MdExpandLess size={16} />
                </>
              ) : (
                <>
                  Read More <MdExpandMore size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Stats Column - Now dedicated to Developer Stats */}
      <div className='flex flex-col gap-4 sm:gap-6'>
        {developerData && (
          <div className='flex flex-col gap-3 sm:gap-4'>
            <div className='flex items-center gap-1.5 sm:gap-2 mb-1'>
              <div className='p-1 sm:p-1.5 rounded-lg bg-brand-accent/10 text-brand-accent'>
                <MdCode size={16} className='sm:w-[18px] sm:h-[18px]' />
              </div>
              <h3 className='text-sm sm:text-base font-bold text-white tracking-wide'>
                Developer Activity
              </h3>
            </div>

            <div className='grid grid-cols-3 gap-2 sm:gap-3'>
              {/* Row 1 */}
              <StatCard
                icon={FaGithub}
                label='GitHub Stars'
                value={developerData.stars}
                color='text-brand-github'
                bg='bg-brand-github/10'
              />
              <StatCard
                icon={FaCodeBranch}
                label='Forks'
                value={developerData.forks}
                color='text-brand-github/70'
                bg='bg-brand-github/5'
              />
              <StatCard
                icon={FaUsers}
                label='Contributors'
                value={developerData.pull_request_contributors}
                color='text-brand-github/70'
                bg='bg-brand-github/5'
              />

              {/* Row 2 - New Stats */}
              <StatCard
                icon={FaEye}
                label='Subscribers'
                value={developerData.subscribers}
                color='text-brand-github/70'
                bg='bg-brand-github/5'
              />
              <StatCard
                icon={FaExclamationCircle}
                label='Total Issues'
                value={developerData.total_issues}
                color='text-brand-github/70'
                bg='bg-brand-github/5'
              />
              <StatCard
                icon={FaCheckCircle}
                label='Closed Issues'
                value={developerData.closed_issues}
                color='text-brand-positive'
                bg='bg-brand-positive/10'
              />

              {/* Row 3 */}
              <StatCard
                icon={MdCode}
                label='4w Commits'
                value={developerData.commit_count_4_weeks}
                color='text-brand-accent'
                bg='bg-brand-accent/10'
              />
              <StatCard
                icon={MdMergeType}
                label='PRs Merged'
                value={developerData.pull_requests_merged}
                color='text-brand-accent'
                bg='bg-brand-accent/10'
              />
              <StatCard
                icon={MdHistory}
                label='4w Changes'
                customValue={
                  developerData.code_additions_deletions_4_weeks ? (
                    <div className='flex items-center gap-0.5 font-mono text-xs sm:text-xs'>
                      <PropsTooltip
                        className='w-auto'
                        content={`+${formatNumber(
                          developerData.code_additions_deletions_4_weeks
                            .additions,
                        )}`}
                      >
                        <span className='text-brand-positive cursor-pointer active:opacity-80 transition-opacity'>
                          +
                          {formatNumber(
                            developerData.code_additions_deletions_4_weeks
                              .additions,
                          )}
                        </span>
                      </PropsTooltip>
                      <span className='text-white/20 text-xs'>/</span>
                      <PropsTooltip
                        className='w-auto'
                        content={`${formatNumber(
                          developerData.code_additions_deletions_4_weeks
                            .deletions,
                        )}`}
                      >
                        <span className='text-brand-negative cursor-pointer active:opacity-80 transition-opacity'>
                          {formatNumber(
                            developerData.code_additions_deletions_4_weeks
                              .deletions,
                          )}
                        </span>
                      </PropsTooltip>
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
        )}
      </div>
    </section>
  );
}
