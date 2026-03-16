import { ReactNode } from 'react';

export interface StatCardProps {
  icon: any;
  label: string;
  value?: number;
  customValue?: ReactNode;
  color: string;
  bg: string;
  disableTooltip?: boolean;
}
