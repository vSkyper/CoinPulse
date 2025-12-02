import { SearchIconContainerProps } from './interface';
import { MdSearch as SearchIcon } from 'react-icons/md';

export default function SearchIconContainer({
  isLoading,
}: SearchIconContainerProps) {
  return (
    <div className='absolute inset-y-0 left-0 flex items-center justify-center pl-3 sm:pl-5 pointer-events-none z-10 text-(--brand-violet)'>
      {isLoading ? (
        <div className='animate-spin h-[18px] w-[18px] border-2 border-white/10 border-t-(--brand-violet) rounded-full' />
      ) : (
        <SearchIcon className='text-(--brand-violet) text-[1rem]! sm:text-[1.5rem]!' />
      )}
    </div>
  );
}
