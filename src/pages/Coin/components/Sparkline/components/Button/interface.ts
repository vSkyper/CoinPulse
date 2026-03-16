import { Dispatch, SetStateAction } from 'react';

export interface ButtonProps {
  setDays: Dispatch<SetStateAction<string>>;
  actualDays: string;
  days: string;
  daysFormatted: string;
  mobileDisappear: boolean;
  layoutId: string;
}
