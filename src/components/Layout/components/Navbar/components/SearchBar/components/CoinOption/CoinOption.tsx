import { MdArrowForwardIos } from 'react-icons/md';
import { CoinOptionProps } from './interface';

export default function CoinOption({ coin, isFocused }: CoinOptionProps) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
        isFocused ? 'bg-white/5' : 'bg-transparent'
      }`}
    >
      <div className='flex flex-col gap-0.5 min-w-0'>
        <span
          className={`font-semibold text-sm truncate transition-colors duration-200 ${
            isFocused ? 'text-white' : 'text-zinc-400'
          }`}
        >
          {coin.name}
        </span>
        <span
          className={`text-[0.65rem] font-bold uppercase tracking-wider transition-colors duration-200 ${
            isFocused ? 'text-brand-violet' : 'text-zinc-600'
          }`}
        >
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
