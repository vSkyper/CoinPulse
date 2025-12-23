import { FaGithub as GitHubIcon } from 'react-icons/fa';

const GITHUB_URL = 'https://github.com/vSkyper/CoinPulse';

export default function Tooltips() {
  return (
    <a
      href={GITHUB_URL}
      target='_blank'
      rel='noopener noreferrer'
      title='View GitHub Repository'
      className='flex items-center justify-center backdrop-blur-md rounded-lg sm:rounded-lg transition-all duration-300 ease-out p-1.5 sm:p-1.5 relative overflow-hidden group bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 hover:scale-105 hover:shadow-glow-cyan-sm hover:border-brand-violet/30 active:-translate-y-px active:scale-[1.02] text-brand-violet'
    >
      <span className='absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:left-full' />
      <GitHubIcon className='text-[0.9rem]! sm:text-[0.9rem]! transition-all duration-300 group-hover:-rotate-[5deg] group-hover:scale-110 group-hover:text-brand-violet' />
    </a>
  );
}
