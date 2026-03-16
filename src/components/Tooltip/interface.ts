import { ReactNode } from 'react';

export interface TooltipProps {
  value?: ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  className?: string;
}
