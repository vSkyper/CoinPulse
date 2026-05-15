import type { FilterActionsProps } from './interface';

export default function FilterActions({ onClear, onSave }: FilterActionsProps) {
  return (
    <div className="flex justify-end gap-2 sm:gap-2 mt-4 sm:mt-4 pt-3 sm:pt-3 border-t border-white/5">
      <button
        onClick={onClear}
        className="px-3 py-2 text-xs font-medium text-brand-negative/80 hover:text-brand-negative hover:bg-brand-negative/10 rounded-xl transition-all"
      >
        Reset
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-xs font-bold text-white bg-brand-violet hover:bg-brand-violet/90 rounded-xl shadow-glow-primary ring-1 ring-white/10 transition-all duration-200"
      >
        Apply Filter
      </button>
    </div>
  );
}
