import { IconType } from 'react-icons';

export interface ExtremeValueRowProps {
  label: string;
  price: number;
  percentage: number;
  date: string | number | Date;
  icon?: IconType;
}
