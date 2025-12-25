import { IconType } from 'react-icons';

export interface StatRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  icon?: IconType;
}
