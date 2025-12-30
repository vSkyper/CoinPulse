import { HighlightProps } from './interface';

export default function Highlight({ children, className }: HighlightProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 mx-0.5 rounded-lg sm:rounded-lg bg-brand-violet/10 border border-white/10 ring-1 ring-white/5 font-bold text-[0.7rem] sm:text-xs shadow-sm backdrop-blur-md align-baseline ${className}`}
    >
      {children}
    </span>
  );
}
