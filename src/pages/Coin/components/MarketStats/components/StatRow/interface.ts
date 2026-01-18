import { IconType } from 'react-icons';

export interface StatRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
  icon?: IconType;
  variant?: 'default' | 'hero';
}
