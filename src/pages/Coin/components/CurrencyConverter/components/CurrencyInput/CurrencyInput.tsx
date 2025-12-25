import { CurrencyInputProps } from './interface';

export default function CurrencyInput({
  symbol,
  value,
  image,
  onChange,
  children,
}: CurrencyInputProps) {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 sm:gap-2 px-2 py-1 sm:p-2 min-h-14 sm:min-h-16 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 w-full focus-within:bg-white/10 focus-within:border-brand-violet/30 focus-within:shadow-glow-violet-focus group'>
        {/* Left Side: Avatar/Icon & Symbol */}
        <div className='flex items-center gap-2 sm:gap-2 min-w-fit'>
          {image ? (
            <img
              src={image}
              alt={symbol}
              className='w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shadow-glow-cyan-sm group-focus-within:scale-110 transition-transform duration-300'
            />
          ) : (
            <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black bg-linear-to-br from-brand-violet to-brand-violet-light text-black shadow-glow-cyan text-xs sm:text-sm'>
              {symbol.charAt(0).toUpperCase()}
            </div>
          )}

          <div className='flex flex-col items-start'>
            {children ? (
              <div className='font-bold text-xs sm:text-sm text-white leading-none tracking-tight'>
                {children}
              </div>
            ) : (
              <span className='font-bold text-xs sm:text-sm text-white leading-none tracking-tight'>
                {symbol.toUpperCase()}
              </span>
            )}

            <div className='flex items-center gap-1.5'>
              <span className='text-[0.65rem] font-bold text-white/40 uppercase tracking-wider mt-0.5'>
                {children ? 'Currency' : 'Asset'}
              </span>
              {children && (
                <div className='bg-white/10 px-1 py-0.5 rounded text-[0.5rem] font-bold text-white/60 uppercase tracking-wide mt-0.5'>
                  Select
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Input */}
        <div className='flex-1 flex flex-col items-end'>
          <input
            className='w-full bg-transparent focus:outline-none text-white font-mono text-right text-base sm:text-lg font-bold tracking-tight outline-none placeholder-white/10 group-focus-within:placeholder-white/20'
            type='number'
            value={value}
            onChange={onChange}
            placeholder='0'
          />
        </div>
      </div>
    </div>
  );
}
