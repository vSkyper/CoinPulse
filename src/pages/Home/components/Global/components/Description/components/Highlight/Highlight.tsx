import { HighlightProps } from './interface';

export default function Highlight({ children, className }: HighlightProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 mx-0.5 rounded-lg sm:rounded-lg bg-white/5 border border-white/5 font-bold text-[0.7rem] sm:text-xs backdrop-blur-md align-baseline ${className}`}
    >
      {children}
    </span>
  );
}
