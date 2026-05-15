import { MdFilterList, MdClose } from 'react-icons/md';
import type { FilterHeaderProps } from './interface';

export default function FilterHeader({ onClose }: FilterHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 text-white ring-1 ring-white/10">
            <MdFilterList className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white block">
              Filter Columns
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              Customize your view
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
      >
        <MdClose className="w-4 h-4" />
      </button>
    </>
  );
}
