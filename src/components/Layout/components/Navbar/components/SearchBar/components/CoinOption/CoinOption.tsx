import { MdArrowForwardIos } from 'react-icons/md';
import { CoinOptionProps } from './interface';

export default function CoinOption({ coin, isFocused }: CoinOptionProps) {
  return (
    <div className='flex items-center justify-between px-3 py-2'>
      <div className='flex flex-col gap-0.5 min-w-0'>
        <span
          className={`font-medium text-xs sm:text-sm truncate transition-colors duration-200 ${
            isFocused ? 'text-white' : 'text-zinc-300'
          }`}
        >
          {coin.name}
        </span>
        <span className='text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500'>
          {coin.symbol}
        </span>
      </div>

      <MdArrowForwardIos
        size={14}
        className={`transition-all duration-300 shrink-0 ${
          isFocused
            ? 'text-brand-violet translate-x-0 opacity-100'
            : 'text-white/5 -translate-x-2 opacity-0'
        }`}
      />
    </div>
  );
}
