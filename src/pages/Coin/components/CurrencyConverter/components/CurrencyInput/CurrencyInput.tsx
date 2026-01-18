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
      <div className='flex items-center gap-3 px-3 py-2 min-h-14 rounded-xl bg-white/2 border border-white/5 transition-all duration-300 w-full focus-within:bg-white/4 focus-within:border-white/10 focus-within:ring-1 focus-within:ring-white/5 group'>
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
            type='text'
            inputMode='decimal'
            value={value}
            onChange={(e) => {
              const start = e.target.selectionStart || 0;
              const originalVal = e.target.value;
              let val = originalVal;

              // 1. Replace commas with dots
              val = val.replace(/,/g, '.');

              // 2. Remove anything that is not a digit or a dot
              let cleanVal = val.replace(/[^0-9.]/g, '');

              // 3. Handle multiple dots
              // If we have more than one dot, we revert to the previous valid value (prop value)
              // This effectively blocks the second dot
              const dotCount = (cleanVal.match(/\./g) || []).length;
              if (dotCount > 1) {
                cleanVal = value; // Revert to prop value
              }

              // Calculate new cursor position
              // Default: keep cursor where it is
              let newCursor = start;

              // Adjust cursor based on length difference
              const diff = originalVal.length - cleanVal.length;
              if (diff > 0) {
                newCursor = Math.max(0, start - diff);
              }

              // If the value changed from what was typed (either sanitized or reverted), update DOM immediately
              if (originalVal !== cleanVal) {
                e.target.value = cleanVal;
                e.target.setSelectionRange(newCursor, newCursor);
              }

              // Pass the clean value to parent
              // We modify the event's target value so parent receives clean data
              e.target.value = cleanVal;
              onChange(e);
            }}
            placeholder='0'
          />
        </div>
      </div>
    </div>
  );
}
