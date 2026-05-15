import { type ReactNode } from 'react';
import type { IconType } from 'react-icons';

export interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  icon?: IconType;
  variant?: 'default' | 'hero';
}
