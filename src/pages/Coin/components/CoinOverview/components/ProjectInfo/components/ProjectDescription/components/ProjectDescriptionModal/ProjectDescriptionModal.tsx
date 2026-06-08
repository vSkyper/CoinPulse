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
            <div className="relative flex items-start justify-between p-5 sm:p-8 shrink-0 overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute inset-0 bg-linear-to-b from-brand-violet/10 to-transparent opacity-50" />
              {/* Refined gradient separator */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative flex items-center gap-4 sm:gap-5">
                {/* Circular Icon Badge */}
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                  <MdDescription className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base sm:text-xl font-black text-white tracking-tight drop-shadow-sm">
                    About Project
                  </h3>
                  <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shadow-glow-primary" />
                    <p className="text-[9px] sm:text-[11px] text-white/50 uppercase tracking-[0.2em] font-medium">
                      Detailed Overview
                    </p>
                  </div>
                </div>
              </div>

              {/* Elegant Close Button */}
              <button
                onClick={onClose}
                className="relative group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/3 hover:bg-white/8 text-white/40 hover:text-white transition-all duration-300 ring-1 ring-white/5 hover:ring-white/20 focus:outline-none"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                <MdClose className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
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
