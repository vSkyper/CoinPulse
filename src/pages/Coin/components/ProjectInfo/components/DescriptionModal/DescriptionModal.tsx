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
      <div className='relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[80vh] flex flex-col transform overflow-hidden rounded-2xl sm:rounded-3xl bg-glass/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 transition-all animate-in zoom-in-95 duration-300'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-2.5 sm:p-5 border-b border-white/5 shrink-0 bg-white/2 shadow-highlight-neutral'>
          <div className='flex items-center gap-2.5 sm:gap-4'>
            {image && (
              <img
                src={image}
                alt={`${name} icon`}
                className='w-5 h-5 sm:w-7 sm:h-7 rounded-full shadow-badge'
              />
            )}
            <h3 className='text-[0.6rem] sm:text-[0.8rem] mt-0.5 font-bold text-white/40 uppercase tracking-widest flex items-center'>
              <span className='w-1.5 h-1.5 rounded-full bg-brand-primary shadow-glow-primary' />
              About {name || 'Project'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className='p-1 sm:p-1.5 -mr-1 sm:-mr-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors active:scale-95'
            aria-label='Close modal'
          >
            <MdClose className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className='p-4 pb-10 sm:p-10 overflow-y-auto custom-scrollbar overscroll-contain relative'>
          <div className='text-xs sm:text-[1rem] prose prose-invert max-w-none text-white/80 font-normal tracking-wide prose-p:text-[0.7rem] sm:prose-p:text-[0.95rem] prose-p:leading-relaxed sm:prose-p:leading-loose prose-p:mb-4 sm:prose-p:mb-6 prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-strong:text-white/90'>
            {parse(description.replace(/\r?\n\r?\n/g, '<br /><br />'))}
          </div>
        </div>

        {/* Bottom gradient fade for scroll indicator */}
        <div className='absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-glass to-transparent pointer-events-none' />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
