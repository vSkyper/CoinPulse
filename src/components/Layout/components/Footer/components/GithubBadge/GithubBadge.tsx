import { FaGithub } from 'react-icons/fa';

export default function GithubBadge() {
  return (
    <a
      href='https://github.com/vSkyper/CoinPulse'
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 group'
    >
      <FaGithub className='text-white/60 group-hover:text-white transition-colors' />
      <span className='text-[0.65rem] font-bold text-white/60 group-hover:text-white uppercase tracking-wider transition-colors'>
        Source Code
      </span>
    </a>
  );
}
