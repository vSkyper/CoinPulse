import parse from 'html-react-parser';
import { useState } from 'react';
import { MdDescription } from 'react-icons/md';
import type { ProjectDescriptionProps } from './interface';

export default function ProjectDescription({ description }: ProjectDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

        <div
          className={`relative flex-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? '' : 'max-h-48 mask-fade-bottom'}`}
        >
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
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-3 flex items-center justify-center gap-2 w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 border focus:outline-none focus:ring-0 group shrink-0 ${
            isExpanded
              ? 'bg-brand-violet/10 hover:bg-brand-violet/20 text-brand-violet border-brand-violet/20 hover:border-brand-violet/40'
              : 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 border-white/10 hover:border-white/20'
          }`}
        >
          <span>{isExpanded ? 'Show Less' : 'Read Full Description'}</span>
          <div className="transition-transform duration-300">
            <MdDescription
              size={16}
              className={`transition-colors duration-300 ${
                isExpanded
                  ? 'text-brand-violet/70 group-hover:text-brand-violet'
                  : 'text-white/30 group-hover:text-white/70'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
