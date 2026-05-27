import { useState, type ChangeEvent } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import type { CurrencyDropdownProps } from './interface';

const MAX_DROPDOWN_ITEMS = 5;

export default function CurrencyDropdown({
  currencyOption,
  currencies,
  onChange,
}: CurrencyDropdownProps) {
  const [query, setQuery] = useState<string>('');

  const filteredCurrencies = (currencies ?? [])
    .filter((c) => c.startsWith((query || currencyOption || '').toLowerCase()))
    .slice(0, MAX_DROPDOWN_ITEMS);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredCurrencies.length > 0) {
        onChange(filteredCurrencies[0]);
      }

      // Dispatch Escape to ensure Combobox closes
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
        view: window,
      });
      event.currentTarget.dispatchEvent(escapeEvent);

      event.currentTarget.blur();
    }
  };

  const handleChange = (value: string | null) => {
    if (value) {
      onChange(value);
      setQuery('');
    }
  };

  return (
    <div className="w-18 sm:w-19">
      <Combobox value={currencyOption} onChange={handleChange}>
        <div className="relative">
          <div className="relative flex items-center justify-between gap-1 group bg-white/2 hover:bg-white/4 px-2 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200 w-full focus-within:border-brand-violet/50 focus-within:shadow-glow-primary">
            <ComboboxInput
              autoComplete="off"
              className="w-full bg-transparent text-xs sm:text-sm font-bold uppercase focus:outline-none text-white tracking-wide cursor-pointer placeholder-white/20 selection:bg-brand-violet/30"
              displayValue={() => currencyOption.toUpperCase()}
              enterKeyHint="done"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />
            <ComboboxButton className="cursor-pointer p-0.5 rounded-md hover:bg-white/10 active:scale-95 transition-all duration-200">
              <HiChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors duration-200 shrink-0" />
            </ComboboxButton>
          </div>

          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            {filteredCurrencies.length > 0 && (
              <ComboboxOptions
                modal={false}
                className="absolute top-full left-0 z-50 mt-1 w-24 overflow-auto custom-scrollbar rounded-2xl bg-brand-dark/95 py-2 px-1 text-xs shadow-popover focus:outline-none border border-white/5"
              >
                {filteredCurrencies.map((option) => (
                  <ComboboxOption
                    key={option}
                    value={option}
                    className={({ focus }) =>
                      `relative cursor-pointer select-none py-2 px-3 transition-all duration-200 ${
                        focus ? 'bg-white/10 text-white' : 'text-zinc-400'
                      }`
                    }
                  >
                    <span className="block truncate font-bold tracking-wide">
                      {option.toUpperCase()}
                    </span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
