import { MdArrowForwardIos } from 'react-icons/md';
import { CoinOptionProps } from './interface';

export default function CoinOption({ coin, isFocused }: CoinOptionProps) {
  return (
    <div className='flex items-center justify-between gap-4 sm:gap-3'>
      <div className='flex flex-col flex-1 min-w-0'>
        <span
          className={`font-semibold text-xs sm:text-xs leading-tight truncate ${
            isFocused ? 'text-white' : 'text-white/90'
          }`}
        >
          {coin.name}
        </span>
        <div className='flex items-center justify-center gap-2 sm:gap-1.5 mt-2.5 sm:mt-1.5'>
          <span className='inline-flex items-center justify-center text-[0.6rem] sm:text-[0.55rem] px-1.5 sm:px-1.5 h-4 sm:h-4 font-semibold rounded-full backdrop-blur-sm bg-white/5 border border-white/10 text-brand-violet'>
            {coin.symbol?.toUpperCase()}
          </span>
          <span className='text-[0.65rem] sm:text-[0.6rem] text-white/40 truncate flex-1'>
            {coin.id}
          </span>
        </div>
      </div>
      <MdArrowForwardIos
        size='0.7rem'
        className={`transition-all duration-200 shrink-0 ${
          isFocused
            ? 'text-brand-violet translate-x-1'
            : 'text-white/20 translate-x-0'
        }`}
      />
    </div>
  );
}
