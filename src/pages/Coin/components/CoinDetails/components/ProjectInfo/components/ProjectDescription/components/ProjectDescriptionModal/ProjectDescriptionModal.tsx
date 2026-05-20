import { useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { MdDescription, MdClose } from 'react-icons/md';
import type { ProjectDescriptionModalProps } from './interface';

export default function ProjectDescriptionModal({
  description,
  isOpen,
  onClose,
}: ProjectDescriptionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle native escape key close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (isOpen) onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="backdrop:bg-black/60 backdrop:backdrop-blur-md bg-transparent p-4 sm:p-6 w-full max-w-3xl m-auto shadow-none fixed inset-0 z-50 text-white"
      style={{ colorScheme: 'dark' }}
    >
      <div className="relative w-full flex flex-col bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(139,92,246,0.25)] overflow-hidden max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/5 shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-violet/20 text-brand-violet">
              <MdDescription size={20} />
            </div>
            About Project
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 overscroll-contain pb-12">
          <div className="flex flex-col gap-4 sm:gap-6">
            {description
              .split(/\r?\n\r?\n/)
              .filter((p) => p.trim().length > 0)
              .map((paragraph, index) => (
                <div
                  key={index}
                  className={`prose prose-invert max-w-none prose-a:text-brand-accent prose-a:font-medium hover:prose-a:text-brand-accent/80 prose-strong:text-white prose-strong:font-semibold leading-relaxed tracking-wide ${
                    index === 0
                      ? 'text-white/90 text-[14px] sm:text-[15px] font-normal'
                      : 'text-white/70 text-[13px] sm:text-[14px] font-normal'
                  }`}
                >
                  {parse(paragraph)}
                </div>
              ))}
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-black/80 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    </dialog>
  );
}
