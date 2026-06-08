import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import parse from 'html-react-parser';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDescription, MdClose } from 'react-icons/md';
import type { ProjectDescriptionModalProps } from './interface';

export default function ProjectDescriptionModal({
  description,
  isOpen,
  onClose,
}: ProjectDescriptionModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle native escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-999 flex justify-end"
          style={{ colorScheme: 'dark' }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full sm:w-125 h-full bg-[#0B0B0F]/95 backdrop-blur-2xl border-l border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MdDescription className="w-5 h-5 sm:w-6 sm:h-6 text-brand-violet" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                    About Project
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/40 font-medium tracking-wide">
                    Detailed Overview
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/10 focus:outline-none"
              >
                <MdClose className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 pb-12 sm:pb-12">
              <div className="flex flex-col gap-4 sm:gap-6">
                {description
                  .split(/\r?\n\r?\n/)
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, index) => (
                    <div
                      key={index}
                      className={`prose prose-invert max-w-none prose-a:text-brand-violet-light prose-a:font-semibold hover:prose-a:text-white prose-strong:text-white prose-strong:font-bold leading-relaxed tracking-wide ${
                        index === 0
                          ? 'text-white/90 text-sm sm:text-base font-medium'
                          : 'text-white/60 text-xs sm:text-sm font-normal'
                      }`}
                    >
                      {parse(paragraph)}
                    </div>
                  ))}
              </div>
            </div>

            {/* Subtle bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-[#0B0B0F] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
