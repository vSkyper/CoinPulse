import type { SearchIconContainerProps } from './interface';
import { MdSearch as SearchIcon } from 'react-icons/md';

export default function SearchIconContainer({
  isLoading,
}: SearchIconContainerProps) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none z-10 text-brand-violet">
      {isLoading ? (
        <div className="animate-spin h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 border-2 border-white/10 border-t-brand-violet rounded-full" />
      ) : (
        <SearchIcon className="text-brand-violet text-[1.1rem]! sm:text-[1.25rem]!" />
      )}
    </div>
  );
}
