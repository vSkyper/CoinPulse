import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ErrorModalProps } from './interface';

export default function ErrorModal({
  message = 'An unexpected error occurred.',
}: ErrorModalProps) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  const modal = (
    <div className='fixed inset-0 z-9999 flex items-center justify-center p-4 min-h-screen animate-in fade-in duration-300'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity'
        onClick={() => setOpen(false)}
      />

      {/* Modal Card */}
      <div className='relative w-full max-w-sm transform overflow-hidden rounded-3xl bg-[#09090b] border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.15)] transition-all animate-in zoom-in-95 duration-300'>
        {/* Glow effect */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent opacity-50' />

        <div className='p-6 sm:p-8 flex flex-col items-center text-center'>
          {/* Icon Container */}
          <div className='w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/20 shadow-glow-negative animate-pulse'>
            <svg
              className='w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h3 className='text-xl sm:text-2xl font-black text-white tracking-tight mb-2'>
            Error Occurred
          </h3>

          <p className='text-sm text-white/50 leading-relaxed mb-8 font-medium'>
            {message}
          </p>

          <button
            onClick={() => setOpen(false)}
            className='w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-red-500/10 to-red-500/5 hover:from-red-500/20 hover:to-red-500/10 border border-red-500/20 text-red-500 font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-glow-negative'
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
