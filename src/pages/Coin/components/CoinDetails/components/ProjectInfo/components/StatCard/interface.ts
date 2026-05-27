import type { ReactNode, ElementType } from 'react';

export interface StatCardProps {
  icon: ElementType;
  label: string;
  value?: number;
  customValue?: ReactNode;
  color: string;
  bg: string;
  disableTooltip?: boolean;
}
