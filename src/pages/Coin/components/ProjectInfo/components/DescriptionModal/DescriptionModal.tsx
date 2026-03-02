import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import parse from 'html-react-parser';
import { MdClose } from 'react-icons/md';
import { DescriptionModalProps } from './interface';

export default function DescriptionModal({
  isOpen,
  onClose,
  description,
  name,
  image,
}: DescriptionModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4 pt-20 sm:p-6 min-h-screen animate-in fade-in duration-300'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className='relative w-full max-w-xl sm:max-w-3xl lg:max-w-4xl max-h-[85vh] sm:max-h-[80vh] flex flex-col transform overflow-hidden rounded-2xl sm:rounded-3xl bg-[#09090b]/40 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all animate-in zoom-in-95 duration-300'>
        {/* Header */}
        <div className='flex items-center justify-between p-3 sm:p-4 border-b border-white/5 shrink-0 bg-white/5'>
          <div className='flex items-center gap-2 sm:gap-3'>
            {image && (
              <img
                src={image}
                alt={`${name} icon`}
                className='w-5 h-5 sm:w-6 sm:h-6 rounded-full'
              />
            )}
            <h3 className='text-sm sm:text-base font-semibold text-white tracking-wide'>
              About {name || 'Project'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className='p-1.5 -mr-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors active:scale-95'
            aria-label='Close modal'
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className='p-4 sm:p-7 overflow-y-auto custom-scrollbar overscroll-contain relative'>
          <div className='prose prose-invert prose-sm sm:prose-base max-w-none text-white/80 leading-relaxed font-light tracking-wide prose-p:mb-3 sm:prose-p:mb-4 prose-p:text-[13px] sm:prose-p:text-[15px] prose-p:leading-relaxed text-[13px] sm:text-[15px] prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-strong:text-white prose-headings:text-white sm:prose-headings:text-base prose-headings:text-sm prose-ul:list-disc prose-ol:list-decimal prose-li:text-[13px] sm:prose-li:text-[15px]'>
            {parse(description)}
          </div>
        </div>

        {/* Bottom gradient fade for scroll indicator */}
        <div className='absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-[#09090b]/80 to-transparent pointer-events-none' />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
