import { useState } from 'react';
import { Cards, Description, Switch } from './components';
import { GlobalProps } from './interface';

export default function Global({ globalData }: GlobalProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  const cardsTransitionClasses = toggle
    ? 'max-h-[1000px] opacity-100'
    : 'max-h-0 opacity-0 overflow-hidden';

  return (
    <>
      <div className='mb-8 sm:mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3'>
          {/* Header and Description */}
          <div className='flex-1'>
            <h1 className='text-2xl sm:text-2xl font-black mb-4 sm:mb-1.5 tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40 drop-shadow-text'>
              Global Cryptocurrency Market
            </h1>
            <Description globalData={globalData} />
          </div>

          {/* Desktop Switch */}
          <div className='hidden sm:flex sm:justify-end'>
            <Switch toggle={toggle} setToggle={setToggle} mobile={false} />
          </div>
        </div>

        {/* Mobile Switch */}
        <div className='sm:hidden pt-6'>
          <Switch toggle={toggle} setToggle={setToggle} mobile />
        </div>
      </div>

      {/* Stats Cards with Animation */}
      <div
        className={`transition-all duration-700 ease-out ${cardsTransitionClasses}`}
        style={{
          transitionDelay: toggle ? '0ms' : '500ms',
          marginBottom: toggle ? '1.5rem' : '0',
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
