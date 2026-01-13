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
      className={`inline-flex items-center gap-1.5 sm:gap-1.5 px-3 sm:px-2.5 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-[11px] font-bold transition-all duration-300 ease-out relative overflow-hidden backdrop-blur-xl backdrop-saturate-150 group border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 ${className}`}
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
