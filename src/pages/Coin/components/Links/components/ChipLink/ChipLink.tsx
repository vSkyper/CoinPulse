import { ChipLinkProps } from './interface';

export default function ChipLink({
  href,
  children,
  left,
  className = '',
}: ChipLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-2 py-1 sm:py-0.5 rounded-lg sm:rounded-md text-[0.6rem] sm:text-[0.55rem] font-bold transition-all duration-300 ease-out relative overflow-hidden backdrop-blur-xl backdrop-saturate-150 group border border-white/10 bg-glass/60 shadow-dropdown hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 ${className}`}
    >
      {/* Enhanced shine effect */}
      <span className='absolute inset-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover:left-full pointer-events-none' />

      {/* Left icon */}
      <span className='flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white/70 group-hover:text-white'>
        {left}
      </span>

      {/* Text */}
      <span className='leading-none font-bold tracking-wide text-white/70 group-hover:text-white transition-colors'>
        {children}
      </span>
    </a>
  );
}
