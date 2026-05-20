import parse from 'html-react-parser';
import { useState } from 'react';
import { MdDescription } from 'react-icons/md';
import type { ProjectDescriptionProps } from './interface';
import ProjectDescriptionModal from './components/ProjectDescriptionModal';

export default function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 h-full">
      <div className="bg-white/2 border border-white/5 rounded-3xl p-5 sm:p-6 shadow-highlight-neutral h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h3 className="text-[0.65rem] sm:text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shadow-glow-primary" />
            About Project
          </h3>
          <div className="p-1.5 rounded-lg bg-brand-violet/10 text-brand-violet">
            <MdDescription size={16} className="sm:w-4 sm:h-4" />
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden max-h-48 mask-fade-bottom">
          <div className="flex flex-col gap-3 sm:gap-4">
            {description
              .split(/\r?\n\r?\n/)
              .filter((p) => p.trim().length > 0)
              .map((paragraph, index) => (
                <div
                  key={index}
                  className={`prose prose-invert max-w-none prose-a:text-brand-accent prose-a:font-medium hover:prose-a:text-brand-accent/80 prose-strong:text-white prose-strong:font-semibold leading-relaxed tracking-wide ${
                    index === 0
                      ? 'text-white/90 text-[13px] sm:text-[14px] font-normal'
                      : 'text-white/60 text-[12px] sm:text-[13px] font-normal'
                  }`}
                >
                  {parse(paragraph)}
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="relative mt-3 flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-500 border focus:outline-none focus:ring-0 group shrink-0 overflow-hidden bg-white/5 hover:bg-brand-violet/10 text-white/60 hover:text-white border-white/10 hover:border-brand-violet/40 shadow-sm hover:shadow-[0_0_20px_-3px_rgba(139,92,246,0.2)] backdrop-blur-md"
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

          <span className="relative z-10 transition-colors duration-300">
            Read Full Description
          </span>
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg]">
            <MdDescription
              size={18}
              className="transition-colors duration-500 text-white/40 group-hover:text-brand-violet/90"
            />
          </div>
        </button>
      </div>

      <ProjectDescriptionModal
        description={description}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
