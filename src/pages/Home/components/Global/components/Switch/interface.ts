import type { Dispatch, SetStateAction } from 'react';

export interface SwitchProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  mobile: boolean;
}
