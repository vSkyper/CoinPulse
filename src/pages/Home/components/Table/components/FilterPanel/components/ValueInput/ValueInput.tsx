import type { ValueInputProps } from './interface';

export default function ValueInput({
  activeOperator,
  activeValue,
  setActiveValue,
  handleFilterSave,
}: ValueInputProps) {
  if (['up', 'down', 'added', 'not added'].includes(activeOperator)) {
    return null;
  }

  return (
    <div className='flex flex-col gap-1 sm:gap-1'>
      <span className='text-[10px] sm:text-[10px] font-semibold text-white/40 uppercase tracking-wider ml-1'>
        Value
      </span>
      <input
        autoComplete='off'
        value={activeValue}
        onChange={(e) => setActiveValue(e.target.value)}
        placeholder='Enter value...'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFilterSave();
          }
        }}
        className='w-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 ring-1 ring-white/5 rounded-xl py-2 px-3 text-xs text-white font-medium placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 transition-all duration-200'
      />
    </div>
  );
}
