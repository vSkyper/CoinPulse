import { ReactNode } from 'react';

export interface AnimatedSectionProps {
  show: boolean;
  children: ReactNode;
  className?: string;
}
