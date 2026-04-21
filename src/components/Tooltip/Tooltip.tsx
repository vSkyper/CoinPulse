import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import type { TooltipProps } from './interface';

export default function Tooltip({
  value,
  content,
  children,
  className = '',
}: TooltipProps) {
  const displayContent = content ?? value;
  const triggerContent = children ?? value;

  let align: 'bottom' | 'bottom start' | 'bottom end' = 'bottom start';
  let textAlignClass = 'text-left';

  if (className.includes('text-center')) {
    align = 'bottom';
    textAlignClass = '';
  } else if (className.includes('text-right')) {
    align = 'bottom end';
    textAlignClass = '';
  }

  return (
    <Popover
      className={`relative min-w-0 ${className.includes('w-') ? '' : 'w-full'}`}
    >
      <PopoverButton
        className={`${className.includes('w-') ? '' : 'w-full'} ${!children ? 'truncate' : ''} ${textAlignClass} focus:outline-none cursor-pointer active:opacity-80 transition-opacity ${className}`}
      >
        {triggerContent}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor={{ to: align, gap: 6 }}
        className="z-50 bg-glass/95 backdrop-blur-2xl border border-white/10 rounded-md sm:rounded-lg px-2 py-1 sm:px-2 sm:py-1 shadow-xl shadow-black/50 transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 max-w-[min(90vw,300px)] break-all"
      >
        <div className="font-mono font-medium text-white/90 text-[0.65rem] sm:text-xs tracking-wide">
          {displayContent}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
