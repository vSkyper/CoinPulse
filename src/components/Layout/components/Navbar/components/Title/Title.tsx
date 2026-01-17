import { Link } from 'react-router-dom';
import { MdTrendingUp as TrendingUpIcon } from 'react-icons/md';

export default function Title() {
  return (
    <div className='flex items-center justify-center gap-2 sm:gap-2'>
      {/* Logo Button */}
      <Link
        to='/'
        title='Go to Homepage'
        className='flex items-center justify-center rounded-lg sm:rounded-lg transition-all duration-300 ease-out relative overflow-hidden group bg-linear-to-br from-brand-violet to-brand-violet-light border border-white/10 hover:-translate-y-0.5 hover:scale-105 active:-translate-y-px active:scale-[1.02] p-1 sm:p-1.5 text-white shadow-glow-primary'
      >
        <span className='absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover:left-full' />
        <TrendingUpIcon className='text-[1rem]! sm:text-[1rem]! drop-shadow-text' />
      </Link>

      {/* Desktop Title */}
      <h1 className='hidden sm:block'>
        <Link
          to='/'
          className='relative flex items-center gap-0.5 font-black tracking-tighter text-xl sm:text-lg transition-all duration-300 hover:opacity-90'
        >
          <span className='text-white'>COIN</span>
          <span className='text-brand-violet'>PULSE</span>
        </Link>
      </h1>

      {/* Mobile Title */}
      <h1 className='block sm:hidden'>
        <Link
          to='/'
          className='relative flex items-center gap-0.5 font-black tracking-tighter text-base transition-all duration-300 hover:opacity-90'
        >
          <span className='text-white'>COIN</span>
          <span className='text-brand-violet'>PULSE</span>
        </Link>
      </h1>
    </div>
  );
}
