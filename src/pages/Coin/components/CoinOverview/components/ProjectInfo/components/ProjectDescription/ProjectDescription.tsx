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
      <div className="group bg-linear-to-b from-white/3 to-transparent border border-white/5 hover:border-white/10 rounded-3xl p-5 sm:p-6 shadow-highlight-neutral transition-all duration-500 h-full flex flex-col relative overflow-hidden">
        {/* Subtle decorative glow in corner */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-violet/10 rounded-full blur-3xl group-hover:bg-brand-violet/20 transition-colors duration-1000" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-5">
          <h3 className="text-[0.65rem] sm:text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shadow-glow-primary" />
            About Project
          </h3>
          <div className="p-1.5 rounded-xl bg-white/5 text-white/40 group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-colors duration-500">
            <MdDescription size={16} className="sm:w-4 sm:h-4" />
          </div>
        </div>

        <div className="relative z-10 flex-1 overflow-hidden max-h-48 mask-fade-bottom">
          <div className="flex flex-col gap-3 sm:gap-4">
            {description
              .split(/\r?\n\r?\n/)
              .filter((p) => p.trim().length > 0)
              .map((paragraph, index) => (
                <div
                  key={index}
                  className={`prose prose-invert max-w-none prose-a:text-brand-violet-light prose-a:font-semibold hover:prose-a:text-white prose-strong:text-white prose-strong:font-bold leading-relaxed tracking-wide ${
                    index === 0
                      ? 'text-white/80 text-[13px] sm:text-[14px]'
                      : 'text-white/50 text-[12px] sm:text-[13px]'
                  }`}
                >
                  {parse(paragraph)}
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 mt-3 flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-500 border focus:outline-none group/btn shrink-0 overflow-hidden bg-white/2 hover:bg-brand-violet/10 text-white/50 hover:text-white border-white/5 hover:border-brand-violet/30 hover:shadow-glow-primary"
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

          <span className="relative z-10 transition-colors duration-300">
            Read Full Description
          </span>
          <div className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-[8deg] group-hover/btn:translate-x-1">
            <MdDescription
              size={18}
              className="transition-colors duration-500 text-white/40 group-hover/btn:text-brand-violet-light"
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
