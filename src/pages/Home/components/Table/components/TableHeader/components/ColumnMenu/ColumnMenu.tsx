import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { createPortal } from 'react-dom';
import { useNavbar } from 'context/NavbarContext';
import type { ColumnMenuProps } from './interface';
import { useMenuPosition } from './hooks';
import { SortOptions, FilterOption } from './components';

export default function ColumnMenu({
  header,
  handleFilterOpenFromMenu,
  handleMenuOpen,
  context,
}: ColumnMenuProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Determine alignment based on column meta or default to right
  const align =
    header.column.columnDef.meta?.align === 'right' ? 'left' : 'right';

  const { isHeaderVisible } = useNavbar();

  const strategy = context === 'sticky' ? 'fixed' : 'absolute';

  const position = useMenuPosition(
    isOpen,
    menuButtonRef,
    menuRef,
    align,
    strategy,
  );

  return (
    <Menu
      key={`menu-${isHeaderVisible}`}
      as='div'
      className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        header.column.columnDef.meta?.align === 'right'
          ? 'left-1 sm:left-2'
          : 'right-1 sm:right-2'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {({ open }) => {
        // Sync local state with menu state to trigger position calculation
        if (open !== isOpen) {
          setIsOpen(open);
        }

        return (
          <>
            <MenuButton
              ref={menuButtonRef}
              id={`${context}-menu-${header.column.id}`}
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                handleMenuOpen();
              }}
              className={`p-2 sm:p-1 rounded sm:hover:bg-white/10 text-white/40 hover:text-white focus:outline-none transition-opacity duration-200 ${
                open
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100 group-active:opacity-100 focus-visible:opacity-100'
              }`}
            >
              <MdMoreVert className='w-4 h-4 sm:w-4 sm:h-4' />
            </MenuButton>
            {open &&
              createPortal(
                <MenuItems
                  ref={menuRef}
                  static
                  modal={false}
                  style={{
                    position: position?.strategy || 'fixed',
                    top: position?.top ?? 0,
                    left: position?.left ?? 0,
                    opacity: position ? 1 : 0,
                  }}
                  className='absolute w-36 sm:w-36 origin-top-right divide-y divide-white/5 rounded-xl bg-black/90 py-1 text-xs shadow-popover focus:outline-none border border-white/10 ring-1 ring-white/5 z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0'
                >
                  <SortOptions header={header} />
                  <FilterOption
                    header={header}
                    menuButtonRef={menuButtonRef}
                    handleFilterOpenFromMenu={handleFilterOpenFromMenu}
                  />
                </MenuItems>,
                document.body,
              )}
          </>
        );
      }}
    </Menu>
  );
}
