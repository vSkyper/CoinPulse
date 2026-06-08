import type { SwitchProps } from './interface';
import {
  MdKeyboardArrowDown as ChevronDown,
  MdKeyboardArrowUp as ChevronUp,
} from 'react-icons/md';

export default function Switch({ toggle, setToggle }: SwitchProps) {
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const stateClasses = toggle
    ? 'bg-brand-violet/10 text-brand-violet hover:bg-brand-violet/20 shadow-glow-primary ring-1 ring-brand-violet/20 border border-brand-violet/20'
    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 ring-1 ring-white/5 border border-white/5';

  const buttonClasses = `flex items-center justify-center gap-1.5 sm:gap-2 font-bold rounded-full transition-all duration-300 px-3 sm:px-5 py-1.5 sm:py-2.5 text-[10px] sm:text-sm group backdrop-blur-md ${stateClasses}`;

  const Icon = toggle ? ChevronUp : ChevronDown;

  return (
    <div className="flex w-full sm:w-auto">
      <button
        onClick={handleToggle}
        className={buttonClasses}
        aria-pressed={toggle}
        aria-label="Toggle statistics display"
      >
        <span className="grid">
          <span className={`col-start-1 row-start-1 transition-opacity duration-300 ${toggle ? 'opacity-0' : 'opacity-100'}`}>Show Global Stats</span>
          <span className={`col-start-1 row-start-1 transition-opacity duration-300 ${toggle ? 'opacity-100' : 'opacity-0'}`}>Hide Global Stats</span>
        </span>
        <Icon
          className={`transition-transform duration-300 w-3.5 h-3.5 sm:w-5 sm:h-5 ${toggle ? '' : 'group-hover:translate-y-0.5'}`}
        />
      </button>
    </div>
  );
}
