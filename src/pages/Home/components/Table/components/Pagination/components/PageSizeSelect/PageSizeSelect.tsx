import { Fragment } from 'react';
import { MdKeyboardArrowDown, MdCheck } from 'react-icons/md';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import type { PageSizeSelectProps } from './interface';

export default function PageSizeSelect({
  pageSize,
  setPageSize,
}: PageSizeSelectProps) {
  return (
    <div className='flex items-center gap-2 sm:gap-3'>
      <span className='font-medium text-white/40'>Rows per page:</span>
      <Listbox
        value={pageSize}
        onChange={(value) => setPageSize(Number(value))}
      >
        <div className='relative'>
          <ListboxButton className='relative w-full cursor-default rounded-lg bg-white/2 py-1 sm:py-1.5 pl-2.5 sm:pl-2.5 pr-7 sm:pr-7 text-left text-[10px] sm:text-xs text-white border border-white/5 hover:border-white/10 ring-1 ring-white/5 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-brand-violet/40 hover:bg-white/4 transition-all'>
            <span className='block truncate font-bold tracking-wide'>
              {pageSize}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2'>
              <MdKeyboardArrowDown
                className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/40'
                aria-hidden='true'
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className='absolute bottom-full mb-2 max-h-60 w-full overflow-auto rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 py-1 text-[10px] sm:text-xs shadow-popover ring-1 ring-white/5 focus:outline-none z-50 min-w-15 sm:min-w-20'>
              {[50, 100].map((size) => (
                <ListboxOption
                  key={size}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-1.5 sm:py-1.5 pl-6 sm:pl-8 pr-3 sm:pr-4 transition-colors ${
                      focus ? 'bg-white/10 text-white' : 'text-white/70'
                    }`
                  }
                  value={size}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-bold text-white' : 'font-normal'
                        }`}
                      >
                        {size}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-1.5 sm:pl-2 text-white'>
                          <MdCheck
                            className='h-3 w-3 sm:h-4 sm:w-4'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
