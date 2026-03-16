import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  icon?: IconType;
  variant?: 'default' | 'hero';
}
