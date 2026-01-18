import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { TooltipProps } from './interface';

export default function Tooltip({ value, className = '' }: TooltipProps) {
  return (
    <Popover className='relative w-full min-w-0'>
      <PopoverButton
        className={`w-full truncate text-left focus:outline-none cursor-pointer active:opacity-80 transition-opacity ${className}`}
      >
        {value}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor={{ to: 'bottom start', gap: 4, offset: -24 }}
        className='z-50 bg-glass/80 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 shadow-glow-sm sm:shadow-popover transition duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0 max-w-[min(90vw,300px)] break-all'
      >
        <div className='font-mono font-bold text-white text-xs sm:text-xs'>
          {value}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
