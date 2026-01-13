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
      <div className='flex items-center gap-3 px-3 py-2 min-h-[56px] rounded-xl bg-white/2 border border-white/5 transition-all duration-300 w-full focus-within:bg-white/4 focus-within:border-white/10 focus-within:ring-1 focus-within:ring-white/5 group'>
        {/* Left Side: Avatar/Icon & Symbol */}
        <div className='flex items-center gap-2 min-w-fit'>
          {image ? (
            <img
              src={image}
              alt={symbol}
              className='w-6 h-6 rounded-full object-cover opacity-80 group-focus-within:opacity-100 transition-opacity duration-300'
            />
          ) : (
            <div className='w-6 h-6 rounded-full flex items-center justify-center font-bold bg-white/10 text-white/60 text-[0.6rem]'>
              {symbol.charAt(0).toUpperCase()}
            </div>
          )}

          <div className='flex flex-col items-start'>
            {children ? (
              <div className='font-bold text-sm text-white leading-none tracking-tight'>
                {children}
              </div>
            ) : (
              <span className='font-bold text-sm text-white leading-none tracking-tight'>
                {symbol.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Input */}
        <div className='flex-1 flex flex-col items-end'>
          <input
            autoComplete='off'
            className='w-full bg-transparent focus:outline-none text-white font-mono text-right text-lg font-bold tracking-tight outline-none placeholder-white/10 hover:placeholder-white/20 transition-colors'
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
