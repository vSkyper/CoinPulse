import { SwitchProps } from './interface';
import {
  MdBarChart as BarChartIcon,
  MdOutlineBarChart as BarChartOutlinedIcon,
} from 'react-icons/md';

export default function Switch({ toggle, setToggle, mobile }: SwitchProps) {
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const iconSize = mobile ? '1rem' : '1rem';

  const sizeClasses = mobile ? 'px-4 py-2 text-xs' : 'px-5 py-2 text-sm';

  const stateClasses = toggle
    ? 'bg-brand-violet border-brand-violet text-black shadow-glow-cyan hover:bg-brand-violet-light'
    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20';

  const buttonClasses = `flex items-center justify-center gap-2 font-bold rounded-full backdrop-blur-md border transition-all duration-300 ease-out relative overflow-hidden group active:translate-y-0 ${sizeClasses} ${stateClasses}`;

  const Icon = toggle ? BarChartIcon : BarChartOutlinedIcon;

  return (
    <div className={mobile ? 'flex justify-center' : ''}>
      <button
        onClick={handleToggle}
        className={buttonClasses}
        aria-pressed={toggle}
        aria-label='Toggle statistics display'
      >
        {/* Shine effect */}
        <span
          className='absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-full'
          aria-hidden='true'
        />

        <span className='relative z-10 flex items-center gap-2 transition-all duration-200'>
          <Icon
            size={iconSize}
            style={{
              transition: 'all 200ms ease',
            }}
          />
          <span>Show Stats</span>
        </span>
      </button>
    </div>
  );
}
