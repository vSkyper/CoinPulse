import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { SortIconProps } from './interface';

export default function SortIcon({ align, isSorted }: SortIconProps) {
  const isLeft = align === 'left';

  // For left aligned (Name), icon is on the left (controlled by flex-row-reverse in parent)
  // For others, icon is absolute to the left of the text

  const iconClass = isLeft
    ? ''
    : 'absolute right-full mr-1 top-1/2 -translate-y-1/2';

  if (!isSorted) {
    return (
      <span className={`flex items-center ${iconClass}`}>
        <MdArrowUpward
          size='1.2rem'
          className='text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        />
      </span>
    );
  }

  return (
    <span className={`flex items-center ${iconClass}`}>
      {isSorted === 'asc' ? (
        <MdArrowUpward size='1.2rem' className='text-white/60' />
      ) : (
        <MdArrowDownward size='1.2rem' className='text-white/60' />
      )}
    </span>
  );
}
