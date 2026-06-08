import { useState } from 'react';
import { Cards, Description, Switch } from './components';
import type { GlobalProps } from './interface';

export default function Global({ globalData }: GlobalProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  const cardsTransitionClasses = toggle
    ? 'max-h-[1000px] opacity-100'
    : 'max-h-0 opacity-0 overflow-hidden';

  return (
    <>
      <div className="relative mb-6 sm:mb-8 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-4xl bg-linear-to-b from-white/3 to-transparent border border-white/5 overflow-hidden">
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-violet/20 rounded-full blur-[120px] -translate-y-1/2 opacity-60 mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-bitcoin/10 rounded-full blur-[120px] translate-y-1/2 opacity-50 mix-blend-screen pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          {/* Header and Description */}
          <div className="flex-1">
            <h1 className="text-lg sm:text-2xl font-black mb-2 sm:mb-2 tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-white/90 to-white/40 drop-shadow-sm">
              Global Cryptocurrency Market
            </h1>
            <div className="max-w-3xl">
              <Description globalData={globalData} />
            </div>
          </div>

          {/* Unified Switch */}
          <div className="shrink-0 relative z-10 mt-2 sm:mt-0">
            <Switch toggle={toggle} setToggle={setToggle} />
          </div>
        </div>
      </div>

      {/* Stats Cards with Animation */}
      <div
        className={`transition-all duration-700 ease-out ${cardsTransitionClasses}`}
        style={{
          transitionDelay: toggle ? '0ms' : '500ms',
          marginBottom: toggle ? '3rem' : '0',
          transition: toggle
            ? 'max-height 700ms ease-out, opacity 700ms ease-out, margin-bottom 0ms'
            : 'max-height 700ms ease-out, opacity 700ms ease-out, margin-bottom 0ms 700ms',
        }}
      >
        <Cards toggle={toggle} globalData={globalData} />
      </div>
    </>
  );
}
