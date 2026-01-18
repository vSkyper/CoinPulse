import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { PropsTooltipProps } from './interface';

export default function PropsTooltip({
  children,
  content,
  className = '',
}: PropsTooltipProps) {
  return (
    <Popover
      className={`relative min-w-0 ${className.includes('w-') ? '' : 'w-full'}`}
    >
      <PopoverButton
        className={`w-full text-left focus:outline-none cursor-pointer active:opacity-80 transition-opacity ${className}`}
      >
        {children}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor={{ to: 'bottom start', gap: 4, offset: -24 }}
        className='z-50 bg-glass/80 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-1 shadow-glow-sm sm:shadow-popover transition duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0 max-w-[min(90vw,300px)] break-all'
      >
        <div className='font-mono font-bold text-white text-[0.65rem] sm:text-[0.65rem]'>
          {content}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
